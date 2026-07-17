// GitHub Actions用: マスターデータ全銘柄の株価をYahoo Financeから取得してprices.jsonに保存
// 使い方: node scripts/fetch_prices.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const mainJs = readFileSync(new URL('../main.js', import.meta.url), 'utf8');
const codes = [...new Set([...mainJs.matchAll(/'(\d{4})':\s*\{\s*name:/g)].map(m => m[1]))];
console.log(`対象銘柄: ${codes.length}件`);

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchQuote(code, attempt = 1) {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${code}.T?range=1d&interval=1d`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (kabu-scope price updater)' } });
    if (res.status === 429 && attempt <= 3) {
        await sleep(2000 * attempt);
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

for (const code of codes) {
    try {
        prices[code] = await fetchQuote(code);
        ok++;
    } catch (e) {
        fail++;
        console.error(`  ${code}: ${e.message}`);
    }
    await sleep(150); // レート制限対策
}

const out = {
    updated: new Date().toISOString(),
    count: ok,
    prices
};

writeFileSync(new URL('../prices.json', import.meta.url), JSON.stringify(out));
console.log(`完了: 成功 ${ok} / 失敗 ${fail} → prices.json`);

if (ok === 0) {
    console.error('全銘柄の取得に失敗しました');
    process.exit(1);
}
