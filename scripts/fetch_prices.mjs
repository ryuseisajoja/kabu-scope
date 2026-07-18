// 株価スナップショット生成
// 通常モード:  node scripts/fetch_prices.mjs        → main.jsの人気銘柄 → prices.json
// 全銘柄モード: node scripts/fetch_prices.mjs --all  → master.jsonの全銘柄 → prices_all.json
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const ALL_MODE = process.argv.includes('--all');

let codes;
if (ALL_MODE) {
    const masterPath = new URL('../master.json', import.meta.url);
    if (!existsSync(masterPath)) {
        console.error('master.json がありません。先に fetch_master.mjs を実行してください');
        process.exit(1);
    }
    const master = JSON.parse(readFileSync(masterPath, 'utf8'));
    codes = Object.keys(master.stocks);
} else {
    const mainJs = readFileSync(new URL('../main.js', import.meta.url), 'utf8');
    codes = [...new Set([...mainJs.matchAll(/'(\d{4})':\s*\{\s*name:/g)].map(m => m[1]))];
}
console.log(`対象銘柄: ${codes.length}件 (${ALL_MODE ? '全銘柄' : '人気銘柄'}モード)`);

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchQuote(code, attempt = 1) {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${code}.T?range=1d&interval=1d`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (kabu-scope price updater)' } });
    if ((res.status === 429 || res.status >= 500) && attempt <= 3) {
        await sleep(2500 * attempt);
        return fetchQuote(code, attempt + 1);
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const meta = json?.chart?.result?.[0]?.meta;
    if (!meta || typeof meta.regularMarketPrice !== 'number') throw new Error('no price data');
    const prev = meta.chartPreviousClose || meta.previousClose || meta.regularMarketPrice;
    return {
        price: meta.regularMarketPrice,
        previousClose: prev,
        changePercent: prev ? +(((meta.regularMarketPrice - prev) / prev) * 100).toFixed(4) : 0
    };
}

const prices = {};
let ok = 0, fail = 0;
const DELAY = ALL_MODE ? 80 : 150;

for (const code of codes) {
    try {
        prices[code] = await fetchQuote(code);
        ok++;
    } catch (e) {
        fail++;
        if (!ALL_MODE) console.error(`  ${code}: ${e.message}`);
    }
    if (ok % 500 === 0 && ok > 0 && ALL_MODE) console.log(`  進捗: ${ok}/${codes.length}`);
    await sleep(DELAY);
}

const out = { updated: new Date().toISOString(), count: ok, prices };
const outFile = ALL_MODE ? '../prices_all.json' : '../prices.json';
writeFileSync(new URL(outFile, import.meta.url), JSON.stringify(out));
console.log(`完了: 成功 ${ok} / 失敗 ${fail} → ${outFile.replace('../', '')}`);

if (ok === 0 || (ALL_MODE && ok < codes.length * 0.7)) {
    console.error('取得成功率が低すぎます');
    process.exit(1);
}
