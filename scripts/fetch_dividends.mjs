// 全上場銘柄の配当データ(dividends.json)を生成
// 使い方: node scripts/fetch_dividends.mjs        → master.jsonの全銘柄
//         node scripts/fetch_dividends.mjs --popular → main.jsの人気銘柄のみ（テスト用）
//
// Yahoo Finance の chart API（認証不要・fetch_prices.mjsと同じエンドポイント）に
// events=div&range=2y を付けると過去2年分の配当支払い履歴が取れる。
// 直近12ヶ月の支払い合計を「1株あたり年間配当」とし、現在値から利回りを算出する。
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const POPULAR_MODE = process.argv.includes('--popular');

let codes;
if (POPULAR_MODE) {
    const mainJs = readFileSync(new URL('../main.js', import.meta.url), 'utf8');
    codes = [...new Set([...mainJs.matchAll(/'(\d{4})':\s*\{\s*name:/g)].map(m => m[1]))];
} else {
    const masterPath = new URL('../master.json', import.meta.url);
    if (!existsSync(masterPath)) {
        console.error('master.json がありません。先に fetch_master.mjs を実行してください');
        process.exit(1);
    }
    const master = JSON.parse(readFileSync(masterPath, 'utf8'));
    // ETF/REITは個別株の配当ロジックと異なるため対象外（分配金は別枠）
    codes = Object.entries(master.stocks)
        .filter(([, v]) => v[1] !== 'ETF' && v[1] !== 'REIT')
        .map(([code]) => code);
}
console.log(`対象銘柄: ${codes.length}件 (${POPULAR_MODE ? '人気銘柄' : '全銘柄'}モード)`);

const sleep = ms => new Promise(r => setTimeout(r, ms));
const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

async function fetchDividend(code, attempt = 1) {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${code}.T?range=2y&interval=1mo&events=div`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (kabu-scope dividend updater)' } });
    if ((res.status === 429 || res.status >= 500) && attempt <= 3) {
        await sleep(2500 * attempt);
        return fetchDividend(code, attempt + 1);
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const result = json?.chart?.result?.[0];
    const meta = result?.meta;
    if (!meta || typeof meta.regularMarketPrice !== 'number') throw new Error('no price data');

    const price = meta.regularMarketPrice;
    const events = result?.events?.dividends || {};
    const cutoff = Date.now() - YEAR_MS;
    // 直近12ヶ月に支払われた1株配当の合計
    let annualPerShare = 0;
    for (const ev of Object.values(events)) {
        if (ev && typeof ev.amount === 'number' && ev.date * 1000 >= cutoff) {
            annualPerShare += ev.amount;
        }
    }
    if (annualPerShare <= 0) return null; // 無配 or データなし

    const perShare = +annualPerShare.toFixed(2);
    const yieldPct = price > 0 ? +((perShare / price) * 100).toFixed(2) : 0;
    return { d: perShare, y: yieldPct };
}

const dividends = {};
let ok = 0, zero = 0, fail = 0;
const DELAY = POPULAR_MODE ? 150 : 90;

for (const code of codes) {
    try {
        const info = await fetchDividend(code);
        if (info) { dividends[code] = info; ok++; }
        else zero++;
    } catch (e) {
        fail++;
        if (POPULAR_MODE) console.error(`  ${code}: ${e.message}`);
    }
    if ((ok + zero + fail) % 500 === 0 && !POPULAR_MODE) {
        console.log(`  進捗: ${ok + zero + fail}/${codes.length}（配当あり ${ok}）`);
    }
    await sleep(DELAY);
}

const out = { updated: new Date().toISOString(), count: ok, dividends };
writeFileSync(new URL('../dividends.json', import.meta.url), JSON.stringify(out));
console.log(`完了: 配当あり ${ok} / 無配 ${zero} / 失敗 ${fail} → dividends.json`);

// 取得できた総数が対象の半分未満なら異常（フォーマット変更やレート制限）とみなす
const processed = ok + zero;
if (processed < codes.length * 0.5) {
    console.error('処理成功率が低すぎます');
    process.exit(1);
}
