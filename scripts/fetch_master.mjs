// JPX公式の上場銘柄一覧(data_j.xls)から全銘柄マスター(master.json)を生成
// 使い方: npm install xlsx --no-save && node scripts/fetch_master.mjs
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const JPX_URL = 'https://www.jpx.co.jp/markets/statistics-equities/misc/tvdivq0000001vg2-att/data_j.xls';

// JPX 33業種分類 → アプリのセクター名
const SECTOR_MAP = {
    '水産・農林業': '食品', '食料品': '食品',
    '鉱業': 'エネルギー', '石油・石炭製品': 'エネルギー',
    '建設業': '建設',
    '繊維製品': '化学', 'パルプ・紙': '化学', '化学': '化学', 'ゴム製品': '化学', 'ガラス・土石製品': '化学',
    '医薬品': '医薬',
    '鉄鋼': '鉄鋼', '非鉄金属': '鉄鋼', '金属製品': '鉄鋼',
    '機械': '機械',
    '電気機器': '電機',
    '輸送用機器': '自動車',
    '精密機器': '精密',
    'その他製品': 'その他',
    '電気・ガス業': 'インフラ',
    '陸運業': '運輸', '海運業': '運輸', '空運業': '運輸', '倉庫・運輸関連業': '運輸',
    '情報・通信業': 'IT',
    '卸売業': '商社',
    '小売業': '小売',
    '銀行業': '金融', '証券、商品先物取引業': '金融', '保険業': '金融', 'その他金融業': '金融',
    '不動産業': '不動産',
    'サービス業': 'サービス'
};

console.log('JPX上場銘柄一覧をダウンロード中...');
const res = await fetch(JPX_URL, { headers: { 'User-Agent': 'Mozilla/5.0 (kabu-scope master updater)' } });
if (!res.ok) {
    console.error(`ダウンロード失敗: HTTP ${res.status}`);
    process.exit(1);
}
const buf = Buffer.from(await res.arrayBuffer());

const wb = XLSX.read(buf, { type: 'buffer' });
const sheet = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

// ヘッダー行: [日付, コード, 銘柄名, 市場・商品区分, 33業種コード, 33業種区分, ...]
const header = rows[0].map(String);
const codeIdx = header.findIndex(h => h.includes('コード'));
const nameIdx = header.findIndex(h => h.includes('銘柄名'));
const marketIdx = header.findIndex(h => h.includes('市場'));
const sector33Idx = header.findIndex(h => h.includes('33業種区分'));

if (codeIdx < 0 || nameIdx < 0) {
    console.error('ヘッダー形式が想定と異なります: ' + header.join(','));
    process.exit(1);
}

const stocks = {};
let count = 0, etf = 0, reit = 0, skipped = 0;

for (const row of rows.slice(1)) {
    const code = String(row[codeIdx] ?? '').trim();
    const name = String(row[nameIdx] ?? '').trim();
    const market = String(row[marketIdx] ?? '');
    const sector33 = String(row[sector33Idx] ?? '').trim();

    // 4文字コード対象（数字4桁 + 新形式の英字入り「130A」等）
    if (!/^\d[\dA-Z]{3}$/.test(code) || !name) { skipped++; continue; }

    let sector;
    if (market.includes('ETF') || market.includes('ETN')) { sector = 'ETF'; etf++; }
    else if (market.includes('REIT') || market.includes('リート')) { sector = 'REIT'; reit++; }
    else if (market.includes('出資証券') || market.includes('インフラファンド')) { sector = 'その他'; }
    else { sector = SECTOR_MAP[sector33] || 'その他'; }

    stocks[code] = [name, sector];
    count++;
}

const out = { updated: new Date().toISOString(), count, stocks };
writeFileSync(new URL('../master.json', import.meta.url), JSON.stringify(out));
console.log(`完了: ${count}銘柄 (うちETF ${etf} / REIT ${reit}) → master.json / スキップ ${skipped}行`);

if (count < 3000) {
    console.error('銘柄数が少なすぎます。フォーマット変更の可能性');
    process.exit(1);
}
