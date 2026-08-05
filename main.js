// ===== カブスコープ - 株チェックAI =====
// v3: 全銘柄対応 + クリーンUI

// ===== 銘柄マスターデータ =====
// dividend: 1株あたり年間配当（円・目安）, dividend_yield: 配当利回り（%・目安）
// ※ 配当データは目安です。最新値は証券会社等でご確認ください。
// マスターにない銘柄もコード入力で追加可能（名称・株価はYahoo Financeから自動取得）
const STOCK_MASTER_DATA = {
    // ===== 自動車・輸送機器 =====
    '7203': { name: 'トヨタ自動車', sector: '自動車', dividend: 90, dividend_yield: 3.0 },
    '7267': { name: 'ホンダ', sector: '自動車', dividend: 68, dividend_yield: 4.0 },
    '7201': { name: '日産自動車', sector: '自動車', dividend: 0, dividend_yield: 0.0 },
    '7269': { name: 'スズキ', sector: '自動車', dividend: 40, dividend_yield: 2.2 },
    '7270': { name: 'SUBARU', sector: '自動車', dividend: 96, dividend_yield: 3.5 },
    '7272': { name: 'ヤマハ発動機', sector: '自動車', dividend: 50, dividend_yield: 3.5 },
    '7211': { name: '三菱自動車', sector: '自動車', dividend: 15, dividend_yield: 3.3 },
    '6902': { name: 'デンソー', sector: '自動車', dividend: 62, dividend_yield: 2.8 },
    '7259': { name: 'アイシン', sector: '自動車', dividend: 90, dividend_yield: 4.5 },
    '5108': { name: 'ブリヂストン', sector: '自動車', dividend: 230, dividend_yield: 3.7 },
    '3116': { name: 'トヨタ紡織', sector: '自動車', dividend: 100, dividend_yield: 4.0 },
    // ===== 電機・精密・半導体 =====
    '6758': { name: 'ソニーグループ', sector: '電機', dividend: 25, dividend_yield: 0.7 },
    '6501': { name: '日立製作所', sector: '電機', dividend: 42, dividend_yield: 1.0 },
    '6503': { name: '三菱電機', sector: '電機', dividend: 60, dividend_yield: 2.0 },
    '6752': { name: 'パナソニックHD', sector: '電機', dividend: 40, dividend_yield: 2.5 },
    '6702': { name: '富士通', sector: '電機', dividend: 28, dividend_yield: 1.0 },
    '6701': { name: 'NEC', sector: '電機', dividend: 40, dividend_yield: 1.0 },
    '6971': { name: '京セラ', sector: '電機', dividend: 50, dividend_yield: 2.5 },
    '6981': { name: '村田製作所', sector: '電機', dividend: 60, dividend_yield: 2.0 },
    '6861': { name: 'キーエンス', sector: '電機', dividend: 300, dividend_yield: 0.5 },
    '6954': { name: 'ファナック', sector: '機械', dividend: 96, dividend_yield: 2.2 },
    '6857': { name: 'アドバンテスト', sector: '電機', dividend: 40, dividend_yield: 0.4 },
    '8035': { name: '東京エレクトロン', sector: '電機', dividend: 500, dividend_yield: 1.7 },
    '6920': { name: 'レーザーテック', sector: '電機', dividend: 150, dividend_yield: 1.0 },
    '6146': { name: 'ディスコ', sector: '電機', dividend: 300, dividend_yield: 0.7 },
    '7735': { name: 'SCREENホールディングス', sector: '電機', dividend: 220, dividend_yield: 2.0 },
    '6723': { name: 'ルネサスエレクトロニクス', sector: '電機', dividend: 28, dividend_yield: 1.5 },
    '3436': { name: 'SUMCO', sector: '電機', dividend: 40, dividend_yield: 3.3 },
    '6645': { name: 'オムロン', sector: '電機', dividend: 104, dividend_yield: 2.2 },
    '7751': { name: 'キヤノン', sector: '電機', dividend: 150, dividend_yield: 3.0 },
    '7741': { name: 'HOYA', sector: '精密', dividend: 130, dividend_yield: 0.7 },
    '7733': { name: 'オリンパス', sector: '精密', dividend: 36, dividend_yield: 1.6 },
    '4543': { name: 'テルモ', sector: '精密', dividend: 12, dividend_yield: 0.8 },
    '7731': { name: 'ニコン', sector: '精密', dividend: 50, dividend_yield: 3.0 },
    '7762': { name: 'シチズン時計', sector: '精密', dividend: 40, dividend_yield: 4.0 },
    '6762': { name: 'TDK', sector: '電機', dividend: 28, dividend_yield: 1.4 },
    '6963': { name: 'ローム', sector: '電機', dividend: 50, dividend_yield: 2.5 },
    '6976': { name: '太陽誘電', sector: '電機', dividend: 90, dividend_yield: 3.0 },
    '6479': { name: 'ミネベアミツミ', sector: '電機', dividend: 40, dividend_yield: 1.3 },
    '7752': { name: 'リコー', sector: '電機', dividend: 54, dividend_yield: 3.5 },
    '6724': { name: 'セイコーエプソン', sector: '電機', dividend: 74, dividend_yield: 3.0 },
    '4902': { name: 'コニカミノルタ', sector: '電機', dividend: 20, dividend_yield: 2.0 },
    // ===== 通信・IT・ネット =====
    '9432': { name: '日本電信電話 (NTT)', sector: '通信', dividend: 5.2, dividend_yield: 3.5 },
    '9433': { name: 'KDDI', sector: '通信', dividend: 145, dividend_yield: 3.0 },
    '9434': { name: 'ソフトバンク', sector: '通信', dividend: 8.6, dividend_yield: 4.3 },
    '9984': { name: 'ソフトバンクグループ', sector: 'IT', dividend: 44, dividend_yield: 0.5 },
    '4689': { name: 'LINEヤフー', sector: 'IT', dividend: 5.6, dividend_yield: 1.1 },
    '6098': { name: 'リクルートホールディングス', sector: 'IT', dividend: 25, dividend_yield: 0.3 },
    '4755': { name: '楽天グループ', sector: 'IT', dividend: 0, dividend_yield: 0.0 },
    '4307': { name: '野村総合研究所', sector: 'IT', dividend: 60, dividend_yield: 1.3 },
    '2413': { name: 'エムスリー', sector: 'IT', dividend: 12, dividend_yield: 0.8 },
    '7974': { name: '任天堂', sector: 'IT', dividend: 120, dividend_yield: 1.2 },
    '9766': { name: 'コナミグループ', sector: 'IT', dividend: 60, dividend_yield: 0.4 },
    '7832': { name: 'バンダイナムコHD', sector: 'IT', dividend: 100, dividend_yield: 1.7 },
    '3659': { name: 'ネクソン', sector: 'IT', dividend: 15, dividend_yield: 0.5 },
    '2432': { name: 'ディー・エヌ・エー', sector: 'IT', dividend: 20, dividend_yield: 0.7 },
    '4661': { name: 'オリエンタルランド', sector: 'サービス', dividend: 12, dividend_yield: 0.3 },
    '4324': { name: '電通グループ', sector: 'サービス', dividend: 140, dividend_yield: 4.0 },
    '9735': { name: 'セコム', sector: 'サービス', dividend: 105, dividend_yield: 2.0 },
    '6178': { name: '日本郵政', sector: 'サービス', dividend: 50, dividend_yield: 3.3 },
    // ===== 金融 =====
    '8306': { name: '三菱UFJフィナンシャルG', sector: '金融', dividend: 60, dividend_yield: 2.8 },
    '8316': { name: '三井住友フィナンシャルG', sector: '金融', dividend: 120, dividend_yield: 3.0 },
    '8411': { name: 'みずほフィナンシャルG', sector: '金融', dividend: 130, dividend_yield: 3.2 },
    '8308': { name: 'りそなホールディングス', sector: '金融', dividend: 24, dividend_yield: 1.8 },
    '8309': { name: '三井住友トラストG', sector: '金融', dividend: 145, dividend_yield: 3.7 },
    '8604': { name: '野村ホールディングス', sector: '金融', dividend: 23, dividend_yield: 2.4 },
    '8601': { name: '大和証券グループ本社', sector: '金融', dividend: 44, dividend_yield: 4.0 },
    '8591': { name: 'オリックス', sector: '金融', dividend: 98, dividend_yield: 2.8 },
    '8766': { name: '東京海上ホールディングス', sector: '金融', dividend: 159, dividend_yield: 2.7 },
    '8725': { name: 'MS&ADインシュアランスG', sector: '金融', dividend: 145, dividend_yield: 4.0 },
    '8630': { name: 'SOMPOホールディングス', sector: '金融', dividend: 60, dividend_yield: 1.8 },
    '8750': { name: '第一生命ホールディングス', sector: '金融', dividend: 113, dividend_yield: 2.4 },
    '8795': { name: 'T&Dホールディングス', sector: '金融', dividend: 116, dividend_yield: 3.5 },
    '7181': { name: 'かんぽ生命保険', sector: '金融', dividend: 104, dividend_yield: 3.3 },
    '8697': { name: '日本取引所グループ', sector: '金融', dividend: 62, dividend_yield: 3.0 },
    '8473': { name: 'SBIホールディングス', sector: '金融', dividend: 160, dividend_yield: 3.9 },
    // ===== 商社 =====
    '8058': { name: '三菱商事', sector: '商社', dividend: 100, dividend_yield: 3.5 },
    '8031': { name: '三井物産', sector: '商社', dividend: 100, dividend_yield: 3.0 },
    '8001': { name: '伊藤忠商事', sector: '商社', dividend: 200, dividend_yield: 2.5 },
    '8002': { name: '丸紅', sector: '商社', dividend: 90, dividend_yield: 3.7 },
    '8053': { name: '住友商事', sector: '商社', dividend: 130, dividend_yield: 3.5 },
    '2768': { name: '双日', sector: '商社', dividend: 150, dividend_yield: 4.5 },
    '8015': { name: '豊田通商', sector: '商社', dividend: 100, dividend_yield: 3.2 },
    // ===== 運輸（海運・空運・陸運） =====
    '9101': { name: '日本郵船', sector: '運輸', dividend: 260, dividend_yield: 5.0 },
    '9104': { name: '商船三井', sector: '運輸', dividend: 180, dividend_yield: 3.5 },
    '9107': { name: '川崎汽船', sector: '運輸', dividend: 100, dividend_yield: 4.5 },
    '9202': { name: 'ANAホールディングス', sector: '運輸', dividend: 40, dividend_yield: 1.3 },
    '9201': { name: '日本航空 (JAL)', sector: '運輸', dividend: 86, dividend_yield: 3.0 },
    '9020': { name: 'JR東日本', sector: '運輸', dividend: 52, dividend_yield: 1.7 },
    '9022': { name: 'JR東海', sector: '運輸', dividend: 16, dividend_yield: 0.9 },
    '9021': { name: 'JR西日本', sector: '運輸', dividend: 72, dividend_yield: 2.5 },
    '9064': { name: 'ヤマトホールディングス', sector: '運輸', dividend: 46, dividend_yield: 2.5 },
    '9147': { name: 'NIPPON EXPRESSホールディングス', sector: '運輸', dividend: 100, dividend_yield: 3.5 },
    '9005': { name: '東急', sector: '運輸', dividend: 25, dividend_yield: 1.4 },
    '9007': { name: '小田急電鉄', sector: '運輸', dividend: 30, dividend_yield: 2.0 },
    '9008': { name: '京王電鉄', sector: '運輸', dividend: 55, dividend_yield: 1.3 },
    '9041': { name: '近鉄グループHD', sector: '運輸', dividend: 25, dividend_yield: 0.8 },
    '9048': { name: '名古屋鉄道', sector: '運輸', dividend: 25, dividend_yield: 1.3 },
    // ===== 食品・生活必需品 =====
    '2914': { name: 'JT (日本たばこ産業)', sector: '食品', dividend: 194, dividend_yield: 4.5 },
    '2802': { name: '味の素', sector: '食品', dividend: 84, dividend_yield: 1.4 },
    '2801': { name: 'キッコーマン', sector: '食品', dividend: 20, dividend_yield: 1.3 },
    '2502': { name: 'アサヒグループHD', sector: '食品', dividend: 130, dividend_yield: 2.3 },
    '2503': { name: 'キリンホールディングス', sector: '食品', dividend: 74, dividend_yield: 3.4 },
    '2501': { name: 'サッポロホールディングス', sector: '食品', dividend: 47, dividend_yield: 0.6 },
    '2269': { name: '明治ホールディングス', sector: '食品', dividend: 100, dividend_yield: 2.9 },
    '2282': { name: '日本ハム', sector: '食品', dividend: 120, dividend_yield: 2.4 },
    '2871': { name: 'ニチレイ', sector: '食品', dividend: 42, dividend_yield: 2.2 },
    '2002': { name: '日清製粉グループ本社', sector: '食品', dividend: 40, dividend_yield: 2.2 },
    '2897': { name: '日清食品ホールディングス', sector: '食品', dividend: 140, dividend_yield: 3.5 },
    '2267': { name: 'ヤクルト本社', sector: '食品', dividend: 60, dividend_yield: 2.1 },
    '2587': { name: 'サントリー食品インターナショナル', sector: '食品', dividend: 90, dividend_yield: 1.8 },
    '4452': { name: '花王', sector: '食品', dividend: 152, dividend_yield: 2.5 },
    '4911': { name: '資生堂', sector: '食品', dividend: 60, dividend_yield: 2.4 },
    '4922': { name: 'コーセー', sector: '食品', dividend: 100, dividend_yield: 1.5 },
    '8113': { name: 'ユニ・チャーム', sector: '食品', dividend: 44, dividend_yield: 0.9 },
    // ===== 医薬 =====
    '4502': { name: '武田薬品工業', sector: '医薬', dividend: 196, dividend_yield: 4.6 },
    '4503': { name: 'アステラス製薬', sector: '医薬', dividend: 74, dividend_yield: 5.0 },
    '4568': { name: '第一三共', sector: '医薬', dividend: 60, dividend_yield: 1.7 },
    '4519': { name: '中外製薬', sector: '医薬', dividend: 90, dividend_yield: 1.3 },
    '4523': { name: 'エーザイ', sector: '医薬', dividend: 160, dividend_yield: 3.7 },
    '4507': { name: '塩野義製薬', sector: '医薬', dividend: 160, dividend_yield: 2.3 },
    '4151': { name: '協和キリン', sector: '医薬', dividend: 56, dividend_yield: 2.4 },
    '4528': { name: '小野薬品工業', sector: '医薬', dividend: 80, dividend_yield: 4.0 },
    '4578': { name: '大塚ホールディングス', sector: '医薬', dividend: 120, dividend_yield: 1.3 },
    // ===== 素材・化学 =====
    '4063': { name: '信越化学工業', sector: '化学', dividend: 106, dividend_yield: 2.2 },
    '4188': { name: '三菱ケミカルグループ', sector: '化学', dividend: 32, dividend_yield: 4.0 },
    '4005': { name: '住友化学', sector: '化学', dividend: 9, dividend_yield: 2.5 },
    '4183': { name: '三井化学', sector: '化学', dividend: 160, dividend_yield: 3.7 },
    '4021': { name: '日産化学', sector: '化学', dividend: 170, dividend_yield: 3.4 },
    '4901': { name: '富士フイルムHD', sector: '化学', dividend: 60, dividend_yield: 1.7 },
    '3407': { name: '旭化成', sector: '化学', dividend: 36, dividend_yield: 3.3 },
    '4042': { name: '東ソー', sector: '化学', dividend: 90, dividend_yield: 4.2 },
    '4061': { name: 'デンカ', sector: '化学', dividend: 100, dividend_yield: 4.0 },
    '3402': { name: '東レ', sector: '化学', dividend: 18, dividend_yield: 2.3 },
    '3401': { name: '帝人', sector: '化学', dividend: 40, dividend_yield: 2.9 },
    '4204': { name: '積水化学工業', sector: '化学', dividend: 78, dividend_yield: 3.1 },
    '4612': { name: '日本ペイントHD', sector: '化学', dividend: 15, dividend_yield: 1.4 },
    // ===== 鉄鋼・非鉄・金属 =====
    '5401': { name: '日本製鉄', sector: '鉄鋼', dividend: 160, dividend_yield: 5.0 },
    '5411': { name: 'JFEホールディングス', sector: '鉄鋼', dividend: 100, dividend_yield: 5.5 },
    '5406': { name: '神戸製鋼所', sector: '鉄鋼', dividend: 90, dividend_yield: 5.0 },
    '5713': { name: '住友金属鉱山', sector: '鉄鋼', dividend: 122, dividend_yield: 3.0 },
    '5711': { name: '三菱マテリアル', sector: '鉄鋼', dividend: 100, dividend_yield: 3.7 },
    '5801': { name: '古河電気工業', sector: '鉄鋼', dividend: 100, dividend_yield: 1.5 },
    '5802': { name: '住友電気工業', sector: '鉄鋼', dividend: 78, dividend_yield: 2.6 },
    '5803': { name: 'フジクラ', sector: '鉄鋼', dividend: 90, dividend_yield: 1.4 },
    // ===== エネルギー =====
    '1605': { name: 'INPEX', sector: 'エネルギー', dividend: 90, dividend_yield: 4.3 },
    '5020': { name: 'ENEOSホールディングス', sector: 'エネルギー', dividend: 26, dividend_yield: 3.2 },
    '5019': { name: '出光興産', sector: 'エネルギー', dividend: 36, dividend_yield: 3.5 },
    // ===== 機械・重工 =====
    '6301': { name: 'コマツ', sector: '機械', dividend: 167, dividend_yield: 3.7 },
    '6326': { name: 'クボタ', sector: '機械', dividend: 50, dividend_yield: 2.7 },
    '6367': { name: 'ダイキン工業', sector: '機械', dividend: 260, dividend_yield: 1.4 },
    '7011': { name: '三菱重工業', sector: '機械', dividend: 22, dividend_yield: 1.0 },
    '7012': { name: '川崎重工業', sector: '機械', dividend: 130, dividend_yield: 2.0 },
    '7013': { name: 'IHI', sector: '機械', dividend: 120, dividend_yield: 1.2 },
    '6113': { name: 'アマダ', sector: '機械', dividend: 56, dividend_yield: 3.4 },
    '6103': { name: 'オークマ', sector: '機械', dividend: 200, dividend_yield: 4.0 },
    '6273': { name: 'SMC', sector: '機械', dividend: 1000, dividend_yield: 1.5 },
    '6383': { name: 'ダイフク', sector: '機械', dividend: 40, dividend_yield: 1.2 },
    '6305': { name: '日立建機', sector: '機械', dividend: 170, dividend_yield: 3.5 },
    '6471': { name: '日本精工', sector: '機械', dividend: 30, dividend_yield: 3.8 },
    '6361': { name: '荏原製作所', sector: '機械', dividend: 62, dividend_yield: 2.4 },
    // ===== 建設・住宅 =====
    '1801': { name: '大成建設', sector: '建設', dividend: 130, dividend_yield: 2.0 },
    '1802': { name: '大林組', sector: '建設', dividend: 79, dividend_yield: 3.5 },
    '1803': { name: '清水建設', sector: '建設', dividend: 23, dividend_yield: 1.5 },
    '1812': { name: '鹿島建設', sector: '建設', dividend: 100, dividend_yield: 2.7 },
    '1925': { name: '大和ハウス工業', sector: '建設', dividend: 145, dividend_yield: 2.8 },
    '1928': { name: '積水ハウス', sector: '建設', dividend: 129, dividend_yield: 3.4 },
    '1808': { name: '長谷工コーポレーション', sector: '建設', dividend: 90, dividend_yield: 4.5 },
    '5938': { name: 'LIXIL', sector: '建設', dividend: 90, dividend_yield: 5.0 },
    '1963': { name: '日揮ホールディングス', sector: '建設', dividend: 42, dividend_yield: 3.0 },
    // ===== 不動産 =====
    '8801': { name: '三井不動産', sector: '不動産', dividend: 30, dividend_yield: 2.0 },
    '8802': { name: '三菱地所', sector: '不動産', dividend: 43, dividend_yield: 1.5 },
    '8830': { name: '住友不動産', sector: '不動産', dividend: 71, dividend_yield: 1.2 },
    '3289': { name: '東急不動産HD', sector: '不動産', dividend: 36, dividend_yield: 3.0 },
    '8804': { name: '東京建物', sector: '不動産', dividend: 83, dividend_yield: 3.0 },
    // ===== 小売・外食 =====
    '9983': { name: 'ファーストリテイリング', sector: '小売', dividend: 145, dividend_yield: 0.9 },
    '3382': { name: 'セブン&アイHD', sector: '小売', dividend: 40, dividend_yield: 1.8 },
    '8267': { name: 'イオン', sector: '小売', dividend: 40, dividend_yield: 1.1 },
    '9843': { name: 'ニトリホールディングス', sector: '小売', dividend: 152, dividend_yield: 0.9 },
    '8252': { name: '丸井グループ', sector: '小売', dividend: 105, dividend_yield: 4.0 },
    '3086': { name: 'J.フロント リテイリング', sector: '小売', dividend: 45, dividend_yield: 2.3 },
    '3099': { name: '三越伊勢丹HD', sector: '小売', dividend: 30, dividend_yield: 1.3 },
    '7453': { name: '良品計画', sector: '小売', dividend: 44, dividend_yield: 1.3 },
    '9831': { name: 'ヤマダホールディングス', sector: '小売', dividend: 13, dividend_yield: 2.9 },
    '3092': { name: 'ZOZO', sector: '小売', dividend: 50, dividend_yield: 1.0 },
    '3197': { name: 'すかいらーくHD', sector: '外食', dividend: 9, dividend_yield: 0.4 },
    '7550': { name: 'ゼンショーHD', sector: '外食', dividend: 30, dividend_yield: 0.5 },
    '2702': { name: '日本マクドナルドHD', sector: '外食', dividend: 42, dividend_yield: 0.7 },
    '3563': { name: 'FOOD & LIFE COMPANIES (スシロー)', sector: '外食', dividend: 22.5, dividend_yield: 0.7 },
    '9861': { name: '吉野家ホールディングス', sector: '外食', dividend: 20, dividend_yield: 0.6 },
    '7581': { name: 'サイゼリヤ', sector: '外食', dividend: 18, dividend_yield: 0.4 },
    '8200': { name: 'リンガーハット', sector: '外食', dividend: 10, dividend_yield: 0.4 },
    // ===== 電力・ガス（インフラ） =====
    '9501': { name: '東京電力HD', sector: 'インフラ', dividend: 0, dividend_yield: 0.0 },
    '9502': { name: '中部電力', sector: 'インフラ', dividend: 60, dividend_yield: 3.3 },
    '9503': { name: '関西電力', sector: 'インフラ', dividend: 60, dividend_yield: 3.0 },
    '9506': { name: '東北電力', sector: 'インフラ', dividend: 40, dividend_yield: 3.3 },
    '9508': { name: '九州電力', sector: 'インフラ', dividend: 50, dividend_yield: 3.5 },
    '9531': { name: '東京ガス', sector: 'インフラ', dividend: 70, dividend_yield: 1.6 },
    '9532': { name: '大阪ガス', sector: 'インフラ', dividend: 78, dividend_yield: 2.2 },
    // ===== 印刷・その他 =====
    '7911': { name: 'TOPPANホールディングス', sector: 'その他', dividend: 46, dividend_yield: 1.0 },
    '7912': { name: '大日本印刷', sector: 'その他', dividend: 76, dividend_yield: 1.6 },
    '3861': { name: '王子ホールディングス', sector: '化学', dividend: 16, dividend_yield: 2.5 },
    // ===== 追加: 自動車・部品 =====
    '6201': { name: '豊田自動織機', sector: '自動車', dividend: 250, dividend_yield: 2.0 },
    '6473': { name: 'ジェイテクト', sector: '自動車', dividend: 60, dividend_yield: 3.7 },
    '7240': { name: 'NOK', sector: '自動車', dividend: 40, dividend_yield: 2.0 },
    // ===== 追加: 電機・電子・半導体 =====
    '6526': { name: 'ソシオネクスト', sector: '電機', dividend: 0, dividend_yield: 0.0 },
    '4062': { name: 'イビデン', sector: '電機', dividend: 50, dividend_yield: 1.0 },
    '6323': { name: 'ローツェ', sector: '機械', dividend: 30, dividend_yield: 0.5 },
    '6525': { name: 'KOKUSAI ELECTRIC', sector: '電機', dividend: 100, dividend_yield: 1.5 },
    '6841': { name: '横河電機', sector: '電機', dividend: 40, dividend_yield: 1.2 },
    '6869': { name: 'シスメックス', sector: '精密', dividend: 46, dividend_yield: 1.5 },
    '7701': { name: '島津製作所', sector: '精密', dividend: 56, dividend_yield: 1.3 },
    '8086': { name: 'ニプロ', sector: '精密', dividend: 12, dividend_yield: 1.5 },
    '4186': { name: '東京応化工業', sector: '化学', dividend: 150, dividend_yield: 1.2 },
    // ===== 追加: 化学・素材 =====
    '4004': { name: 'レゾナック・ホールディングス', sector: '化学', dividend: 90, dividend_yield: 2.5 },
    '3405': { name: 'クラレ', sector: '化学', dividend: 52, dividend_yield: 3.0 },
    '4118': { name: 'カネカ', sector: '化学', dividend: 60, dividend_yield: 2.0 },
    '4114': { name: '日本触媒', sector: '化学', dividend: 220, dividend_yield: 3.5 },
    '4091': { name: '日本酸素ホールディングス', sector: '化学', dividend: 50, dividend_yield: 1.2 },
    // ===== 追加: 鉄鋼・非鉄・エネルギー =====
    '5471': { name: '大同特殊鋼', sector: '鉄鋼', dividend: 90, dividend_yield: 2.5 },
    '5706': { name: '三井金属', sector: '鉄鋼', dividend: 130, dividend_yield: 3.0 },
    '5714': { name: 'DOWAホールディングス', sector: '鉄鋼', dividend: 130, dividend_yield: 2.5 },
    '5021': { name: 'コスモエネルギーHD', sector: 'エネルギー', dividend: 250, dividend_yield: 4.0 },
    // ===== 追加: 機械 =====
    '6268': { name: 'ナブテスコ', sector: '機械', dividend: 80, dividend_yield: 2.5 },
    '6481': { name: 'THK', sector: '機械', dividend: 60, dividend_yield: 2.5 },
    '6370': { name: '栗田工業', sector: '機械', dividend: 76, dividend_yield: 1.3 },
    '6141': { name: 'DMG森精機', sector: '機械', dividend: 60, dividend_yield: 2.5 },
    // ===== 追加: 医薬・ヘルスケア =====
    '4506': { name: '住友ファーマ', sector: '医薬', dividend: 0, dividend_yield: 0.0 },
    '4536': { name: '参天製薬', sector: '医薬', dividend: 28, dividend_yield: 1.8 },
    '4527': { name: 'ロート製薬', sector: '医薬', dividend: 24, dividend_yield: 0.8 },
    '4967': { name: '小林製薬', sector: '医薬', dividend: 100, dividend_yield: 1.5 },
    // ===== 追加: 食品・生活必需品 =====
    '2593': { name: '伊藤園', sector: '食品', dividend: 40, dividend_yield: 1.5 },
    '2270': { name: '雪印メグミルク', sector: '食品', dividend: 60, dividend_yield: 2.5 },
    '2809': { name: 'キユーピー', sector: '食品', dividend: 44, dividend_yield: 1.7 },
    '2875': { name: '東洋水産', sector: '食品', dividend: 110, dividend_yield: 1.5 },
    '4912': { name: 'ライオン', sector: '食品', dividend: 26, dividend_yield: 2.0 },
    '4927': { name: 'ポーラ・オルビスHD', sector: '食品', dividend: 56, dividend_yield: 3.0 },
    // ===== 追加: 金融 =====
    '8354': { name: 'ふくおかフィナンシャルG', sector: '金融', dividend: 130, dividend_yield: 3.5 },
    '8331': { name: '千葉銀行', sector: '金融', dividend: 24, dividend_yield: 2.5 },
    '7186': { name: 'コンコルディアFG', sector: '金融', dividend: 30, dividend_yield: 3.5 },
    '5831': { name: '静岡フィナンシャルG', sector: '金融', dividend: 50, dividend_yield: 3.5 },
    '8698': { name: 'マネックスグループ', sector: '金融', dividend: 20, dividend_yield: 2.5 },
    '8628': { name: '松井証券', sector: '金融', dividend: 50, dividend_yield: 5.0 },
    '8593': { name: '三菱HCキャピタル', sector: '金融', dividend: 40, dividend_yield: 3.7 },
    // ===== 追加: IT・ネット・ゲーム =====
    '4385': { name: 'メルカリ', sector: 'IT', dividend: 0, dividend_yield: 0.0 },
    '4751': { name: 'サイバーエージェント', sector: 'IT', dividend: 20, dividend_yield: 1.7 },
    '3769': { name: 'GMOペイメントゲートウェイ', sector: 'IT', dividend: 60, dividend_yield: 0.4 },
    '3994': { name: 'マネーフォワード', sector: 'IT', dividend: 0, dividend_yield: 0.0 },
    '4478': { name: 'freee', sector: 'IT', dividend: 0, dividend_yield: 0.0 },
    '2371': { name: 'カカクコム', sector: 'IT', dividend: 15, dividend_yield: 1.5 },
    '3765': { name: 'ガンホー・オンライン', sector: 'IT', dividend: 26, dividend_yield: 3.5 },
    '9697': { name: 'カプコン', sector: 'IT', dividend: 90, dividend_yield: 1.5 },
    '9684': { name: 'スクウェア・エニックスHD', sector: 'IT', dividend: 60, dividend_yield: 1.2 },
    '3635': { name: 'コーエーテクモHD', sector: 'IT', dividend: 80, dividend_yield: 1.0 },
    // ===== 追加: サービス・エンタメ =====
    '4816': { name: '東映アニメーション', sector: 'サービス', dividend: 100, dividend_yield: 0.6 },
    '9602': { name: '東宝', sector: 'サービス', dividend: 60, dividend_yield: 1.2 },
    '8136': { name: 'サンリオ', sector: 'サービス', dividend: 36, dividend_yield: 0.8 },
    '2181': { name: 'パーソルホールディングス', sector: 'サービス', dividend: 50, dividend_yield: 2.5 },
    '4732': { name: 'ユー・エス・エス', sector: 'サービス', dividend: 70, dividend_yield: 2.5 },
    '2124': { name: 'JACリクルートメント', sector: 'サービス', dividend: 100, dividend_yield: 4.0 },
    // ===== 追加: 小売・優待人気 =====
    '3088': { name: 'マツキヨココカラ&カンパニー', sector: '小売', dividend: 80, dividend_yield: 1.5 },
    '7564': { name: 'ワークマン', sector: '小売', dividend: 64, dividend_yield: 1.3 },
    '7532': { name: 'パン・パシフィック(ドンキ)', sector: '小売', dividend: 25, dividend_yield: 0.6 },
    '3038': { name: '神戸物産(業務スーパー)', sector: '小売', dividend: 17, dividend_yield: 0.5 },
    '3349': { name: 'コスモス薬品', sector: '小売', dividend: 90, dividend_yield: 1.0 },
    '8227': { name: 'しまむら', sector: '小売', dividend: 260, dividend_yield: 2.6 },
    '7545': { name: '西松屋チェーン', sector: '小売', dividend: 25, dividend_yield: 1.5 },
    '2792': { name: 'ハニーズホールディングス', sector: '小売', dividend: 60, dividend_yield: 3.0 },
    '2685': { name: 'アダストリア', sector: '小売', dividend: 65, dividend_yield: 1.8 },
    '7606': { name: 'ユナイテッドアローズ', sector: '小売', dividend: 55, dividend_yield: 2.5 },
    // ===== 追加: 外食・優待人気 =====
    '2695': { name: 'くら寿司', sector: '外食', dividend: 0, dividend_yield: 0.0 },
    '9936': { name: '王将フードサービス', sector: '外食', dividend: 66, dividend_yield: 1.0 },
    '7616': { name: 'コロワイド', sector: '外食', dividend: 0, dividend_yield: 0.0 },
    '3397': { name: 'トリドールHD(丸亀製麺)', sector: '外食', dividend: 10, dividend_yield: 0.3 },
    '3387': { name: 'クリエイト・レストランツHD', sector: '外食', dividend: 0, dividend_yield: 0.0 },
    '3097': { name: '物語コーポレーション', sector: '外食', dividend: 40, dividend_yield: 0.5 },
    '9887': { name: '松屋フーズホールディングス', sector: '外食', dividend: 30, dividend_yield: 1.0 },
    '7412': { name: 'アトム', sector: '外食', dividend: 0, dividend_yield: 0.0 },
    // ===== 追加: 建設・不動産 =====
    '1911': { name: '住友林業', sector: '建設', dividend: 130, dividend_yield: 2.5 },
    '1878': { name: '大東建託', sector: '建設', dividend: 500, dividend_yield: 4.0 },
    '3291': { name: '飯田グループHD', sector: '建設', dividend: 100, dividend_yield: 3.5 },
    '3288': { name: 'オープンハウスグループ', sector: '建設', dividend: 100, dividend_yield: 1.7 },
    '3231': { name: '野村不動産ホールディングス', sector: '不動産', dividend: 130, dividend_yield: 3.5 },
    // ===== 追加: 運輸・インフラ =====
    '9042': { name: '阪急阪神ホールディングス', sector: '運輸', dividend: 50, dividend_yield: 1.0 },
    '9142': { name: 'JR九州', sector: '運輸', dividend: 100, dividend_yield: 2.5 },
    '9143': { name: 'SGホールディングス(佐川)', sector: '運輸', dividend: 45, dividend_yield: 2.0 },
    '9009': { name: '京成電鉄', sector: '運輸', dividend: 6, dividend_yield: 0.2 },
    '9513': { name: '電源開発(Jパワー)', sector: 'インフラ', dividend: 100, dividend_yield: 4.0 },
    // ===== 国内ETF（インデックス） =====
    '1306': { name: 'NF・TOPIX連動型上場投信', sector: 'ETF', dividend: 55, dividend_yield: 2.0, isETF: true },
    '1321': { name: 'NF・日経225連動型上場投信', sector: 'ETF', dividend: 620, dividend_yield: 1.6, isETF: true },
    '1330': { name: '上場インデックスファンド225', sector: 'ETF', dividend: 600, dividend_yield: 1.6, isETF: true },
    '1348': { name: 'MAXIS トピックス上場投信', sector: 'ETF', dividend: 52, dividend_yield: 2.0, isETF: true },
    '1591': { name: 'NF・JPX日経400連動型上場投信', sector: 'ETF', dividend: 400, dividend_yield: 1.7, isETF: true },
    '1489': { name: 'NF・日経高配当株50 ETF', sector: 'ETF', dividend: 90, dividend_yield: 3.4, isETF: true },
    '1478': { name: 'iシェアーズ MSCI ジャパン高配当利回り ETF', sector: 'ETF', dividend: 80, dividend_yield: 2.8, isETF: true },
    '1577': { name: 'NF・野村日本株高配当70 ETF', sector: 'ETF', dividend: 1100, dividend_yield: 3.0, isETF: true },
    '1651': { name: '大和 iFreeETF TOPIX高配当40指数', sector: 'ETF', dividend: 55, dividend_yield: 2.8, isETF: true },
    '2564': { name: 'GX スーパーディビィデンド日本株式 ETF', sector: 'ETF', dividend: 130, dividend_yield: 4.5, isETF: true },
    '1343': { name: 'NF・東証REIT指数連動型上場投信', sector: 'ETF', dividend: 76, dividend_yield: 4.0, isETF: true },
    '1476': { name: 'iシェアーズ・コア Jリート ETF', sector: 'ETF', dividend: 72, dividend_yield: 4.0, isETF: true },
    '1570': { name: 'NF・日経レバレッジ・インデックス', sector: 'ETF', dividend: 0, dividend_yield: 0.0, isETF: true },
    '1357': { name: 'NF・日経ダブルインバース', sector: 'ETF', dividend: 0, dividend_yield: 0.0, isETF: true },
    '2558': { name: 'MAXIS 米国株式(S&P500)上場投信', sector: 'ETF', dividend: 250, dividend_yield: 1.2, isETF: true },
    '2559': { name: 'MAXIS 全世界株式(オール・カントリー)上場投信', sector: 'ETF', dividend: 280, dividend_yield: 1.5, isETF: true },
    '1655': { name: 'iシェアーズ S&P500 米国株 ETF', sector: 'ETF', dividend: 6, dividend_yield: 1.0, isETF: true },
    '2621': { name: 'iシェアーズ 米国債20年超 ETF(H有)', sector: 'ETF', dividend: 38, dividend_yield: 3.0, isETF: true }
};

// 株主優待のある主な銘柄（詳細表示用・目安）
const BENEFIT_DATA = {
    '9202': '国内線搭乗優待割引券（100株～）',
    '9201': '国内線50%割引券（100株～）',
    '9433': 'カタログギフト（100株・1年以上保有）',
    '3086': '百貨店買物10%割引カード（100株～）',
    '3099': '百貨店買物10%割引カード（100株～）',
    '8267': 'オーナーズカード（買物3%キャッシュバック・100株～）',
    '8252': 'エポスカード優待・買物券（100株～）',
    '3197': '食事券 年4,000円分～（100株～）',
    '7550': '食事券 年2,000円分～（100株～）',
    '2702': '食事優待券（100株～）',
    '3563': '食事割引券（100株～）',
    '9861': '食事券 年4,000円分（100株～）',
    '7581': '食事券（100株～）',
    '8200': '食事券 年3,100円分～（100株～）',
    '9020': '運賃4割引券（100株～）',
    '9021': '運賃5割引券（100株～）',
    '9022': '運賃1割引券（100株～）',
    '4661': '1デーパスポート（500株～・長期保有）',
    '9041': '乗車券・あべのハルカス優待（100株～）',
    '9048': '乗車券優待（100株～）',
    '8591': '（優待は廃止済・配当重視へ移行）',
    '2914': '（優待は廃止済・高配当銘柄）',
    '7453': 'シェアホルダーカード 5%割引（100株～）',
    '9831': '買物優待券 年1,500円分～（100株～）',
    // 追加分
    '2695': '食事優待券（100株～）',
    '9936': '食事券 年4,000円分～（100株～）',
    '7616': '食事ポイント 年20,000円分～（500株～）',
    '3397': '食事優待券 年4,000円分～（100株～）',
    '3387': '食事優待券 年4,000円分～（100株～）',
    '3097': '食事優待券 年3,500円分～（100株～）',
    '9887': '食事券 年2,000円分～（100株～）',
    '7412': '優待ポイント（コロワイドG・100株～）',
    '8227': '買物優待券（100株～）',
    '7545': '買物カード（100株～）',
    '2792': '買物券 年1,000円分～（100株～）',
    '2685': '買物優待券（100株～）',
    '7606': '買物優待 15%割引（100株～）',
    '7532': 'majica買物ポイント（100株～）',
    '8136': 'ピューロランド等入場券＋優待（100株～）',
    '9602': '映画鑑賞券（100株～）',
    '9042': '乗車証・レジャー優待（100株～）',
    '9142': '鉄道割引券・優待（100株～）',
    '9009': '乗車証・優待（100株～）',
    '4816': '図書カード・オリジナルグッズ（100株～）',
    '4732': 'QUOカード（100株～）',
    '6201': 'トヨタ関連優待（品質・記念品等）',
    '3088': '買物優待割引（100株～）'
};

// ===== セクター分類（厳選データ・全銘柄マスター・診断で共通利用） =====
// 表示順は診断のディフェンシブ判定やドーナツ配色の安定化にも使う。
const CANONICAL_SECTORS = [
    '自動車', '電機', '精密', '機械', '化学', '鉄鋼', '医薬', '食品',
    '小売', '外食', 'サービス', '商社', '金融', '不動産', '建設',
    '運輸', 'インフラ', 'エネルギー', '通信', 'IT', 'その他', 'ETF', 'REIT'
];

// データ源による表記ゆれを正規化（全銘柄マスターのJPX由来表記 → アプリの正規名）
const SECTOR_ALIASES = {
    '情報通信': 'IT', '情報・通信業': 'IT', '情報・通信': 'IT', 'テクノロジー': 'IT',
    '飲食': '外食', '飲食店': '外食',
    '輸送用機器': '自動車', '電気機器': '電機', '精密機器': '精密',
    '電気・ガス業': 'インフラ', '石油・石炭製品': 'エネルギー', '鉱業': 'エネルギー',
    '卸売業': '商社', '小売業': '小売', '銀行業': '金融', '不動産業': '不動産',
    '建設業': '建設', 'サービス業': 'サービス'
};

function normalizeSector(sector) {
    if (!sector) return 'その他';
    const s = String(sector).trim();
    if (CANONICAL_SECTORS.includes(s)) return s;
    return SECTOR_ALIASES[s] || s;
}

// セクター固定色（保有内容が変わっても同じセクターは同じ色になるようにする）
const SECTOR_COLORS = {
    '自動車': '#1E7A4E', '電機': '#3D9970', '精密': '#63B995', '機械': '#8FD0B2',
    '化学': '#2C6E8F', '鉄鋼': '#5B8DB8', '医薬': '#C9A76A', '食品': '#7FA650',
    '小売': '#D6A5A5', '外食': '#D98E5A', 'サービス': '#9AA5B1', '商社': '#B08968',
    '金融': '#4C6EA5', '不動産': '#A56EA5', '建設': '#8A8D5B', '運輸': '#5AA3A3',
    'インフラ': '#6B8E9E', 'エネルギー': '#C4894A', '通信': '#5B7DB1', 'IT': '#4A9D8E',
    'その他': '#C4CBC7', 'ETF': '#9AA5B1', 'REIT': '#B8A57A'
};
const SECTOR_FALLBACK_PALETTE = ['#1E7A4E', '#3D9970', '#63B995', '#8FD0B2', '#2C6E8F', '#5B8DB8', '#C9A76A', '#D6A5A5', '#9AA5B1', '#C4CBC7'];

function sectorColor(sector, index = 0) {
    return SECTOR_COLORS[normalizeSector(sector)] || SECTOR_FALLBACK_PALETTE[index % SECTOR_FALLBACK_PALETTE.length];
}

// ===== ユーティリティ =====
function getPortfolio() {
    return JSON.parse(localStorage.getItem('portfolio') || '[]');
}

function setPortfolio(portfolio) {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

function formatYen(value) {
    return '¥' + Math.round(value).toLocaleString();
}

// 1株あたりの単価表示。株価には小数があるため（152.5円など）、整数に丸めると
// 「取得単価と現在値の差×株数」が画面の評価損益と合わなくなる。小数はそのまま出す
function formatPrice(value) {
    if (typeof value !== 'number' || !isFinite(value)) return '¥0';
    const v = Math.round(value * 100) / 100;
    return '¥' + (Number.isInteger(v)
        ? v.toLocaleString('ja-JP')
        : v.toLocaleString('ja-JP', { minimumFractionDigits: 1, maximumFractionDigits: 2 }));
}

// ===== リアルタイム株価（Yahoo Finance） =====
const PRICE_CACHE_KEY = 'price_cache_v1';
const PRICE_CACHE_TTL = 5 * 60 * 1000; // 5分

function getPriceCache() {
    return JSON.parse(localStorage.getItem(PRICE_CACHE_KEY) || '{}');
}

// ===== 株価の取得元 =====
// 株価データをまとめてリポジトリに置いて配信するのをやめ、この中継サーバー経由で
// 保有銘柄の分だけその都度取得する（中継サーバーのコードは worker/price-proxy.js）。
// ブラウザから株価APIを直接呼ぶとCORSで拒否されるため、中継が必要。
const DEFAULT_PRICE_PROXY = 'https://kabu-scope.ryusei30saku.workers.dev';
const PROXY_STORAGE_KEY = 'priceProxyBase';

// 利用者が設定した取得元（未設定なら空文字）
function getPriceProxyBase() {
    const v = localStorage.getItem(PROXY_STORAGE_KEY) || '';
    return v.replace(/\/+$/, '');
}

// 実際に使う取得元。端末ごとに設定しなくても動くよう既定値を持たせる
function priceApiBase() {
    return getPriceProxyBase() || DEFAULT_PRICE_PROXY;
}

async function fetchQuote(code) {
    const url = `${priceApiBase()}/v8/finance/chart/${code}.T?range=1d&interval=1d`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    const meta = json && json.chart && json.chart.result && json.chart.result[0] && json.chart.result[0].meta;
    if (!meta || typeof meta.regularMarketPrice !== 'number') throw new Error('no price data');
    const prev = meta.chartPreviousClose || meta.previousClose || meta.regularMarketPrice;
    return {
        code,
        price: meta.regularMarketPrice,
        previousClose: prev,
        changePercent: prev ? ((meta.regularMarketPrice - prev) / prev * 100) : 0,
        name: meta.longName || meta.shortName || null,
        time: Date.now()
    };
}

// 全上場銘柄マスター（JPX公式リストから生成、GitHub Actionsが週次更新）
// 形式: { "7203": ["トヨタ自動車", "自動車"], ... }
let FULL_MASTER = null;
async function loadFullMaster() {
    if (FULL_MASTER !== null) return FULL_MASTER;
    try {
        const res = await fetch('master.json');
        FULL_MASTER = res.ok ? (await res.json()).stocks : false;
    } catch (e) {
        FULL_MASTER = false;
    }
    return FULL_MASTER;
}

// コードから銘柄情報を取得（キュレーション済みマスター優先 → 全銘柄マスター）
function getMasterInfo(code) {
    const m = STOCK_MASTER_DATA[code];
    if (m) return { name: m.name, sector: normalizeSector(m.sector), curated: true };
    if (FULL_MASTER && FULL_MASTER[code]) {
        return { name: FULL_MASTER[code][0], sector: normalizeSector(FULL_MASTER[code][1]), curated: false };
    }
    return null;
}

// 配当データ。全銘柄分をまとめて配信するのはやめ、保有銘柄の分だけ
// 中継サーバー経由で取得して端末にキャッシュする（ensureDividendData が埋める）
// 形式: { "7203": { d: 1株配当, y: 利回り% }, ... }
let FULL_DIVIDENDS = null;
async function loadDividends() {
    if (FULL_DIVIDENDS !== null) return FULL_DIVIDENDS;
    // 端末に残っているキャッシュを起動時に読み込む
    const cache = getDividendCache();
    FULL_DIVIDENDS = {};
    for (const [code, v] of Object.entries(cache)) {
        if (v && v.d > 0) FULL_DIVIDENDS[code] = { d: v.d, y: v.y };
    }
    return FULL_DIVIDENDS;
}

// 株主優待データ（手動キュレーション・benefits.json）
// 形式: { "9202": { c: 優待内容, s: 必要株数, m: [権利確定月], k: 種類 }, ... }
let FULL_BENEFITS = null;
async function loadBenefits() {
    if (FULL_BENEFITS !== null) return FULL_BENEFITS;
    try {
        const res = await fetch('benefits.json?t=' + Math.floor(Date.now() / 3600000));
        FULL_BENEFITS = res.ok ? (await res.json()).benefits : false;
    } catch (e) {
        FULL_BENEFITS = false;
    }
    return FULL_BENEFITS;
}

// コードから優待情報を取得（構造化データ優先 → 旧インラインデータ）
// 戻り値: { content, minShares, months:[], kind } または null（優待なし）
function getBenefitInfo(code) {
    if (FULL_BENEFITS && FULL_BENEFITS[code]) {
        const b = FULL_BENEFITS[code];
        return { content: b.c, minShares: b.s || null, months: b.m || [], kind: b.k || '' };
    }
    // フォールバック: 旧来の文字列データ（benefits.json 未読込やカバー外向け）
    if (typeof BENEFIT_DATA !== 'undefined' && BENEFIT_DATA[code]) {
        const text = BENEFIT_DATA[code];
        // 「優待は廃止済」のような注記は優待ではないので、対象として扱わない
        if (/廃止|中止|終了|優待なし|優待は無し/.test(text)) return null;
        return { content: text, minShares: null, months: [], kind: '' };
    }
    return null;
}

// ===== 配当データのオンデマンド取得 =====
// 中継サーバーを設定している場合は、全銘柄の配当データ(dividends.json)を配信せず、
// 保有銘柄の分だけその都度取得してこの端末にキャッシュする
const DIVIDEND_CACHE_KEY = 'dividendCache';
const DIVIDEND_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 配当は頻繁に変わらないため1週間

function getDividendCache() {
    try {
        return JSON.parse(localStorage.getItem(DIVIDEND_CACHE_KEY) || '{}');
    } catch (e) {
        return {};
    }
}

// 直近の配当支払いから年間の1株配当を推定する（scripts/fetch_dividends.mjs と同じ考え方）。
// 特別配当や株式分割の未調整値で利回りが膨らむのを防ぐため、中央値ベースの推定と比較する
function annualizeDividends(payments, price) {
    if (!payments || payments.length === 0) return null;
    const cutoff = Date.now() - 365 * 24 * 60 * 60 * 1000;
    const trailing = payments.filter(p => p.date * 1000 >= cutoff).map(p => p.amount);
    const trailingSum = trailing.reduce((s, v) => s + v, 0);

    const freq = trailing.length || 2;
    const sample = payments.slice(-Math.max(4, freq * 2)).map(p => p.amount).sort((a, b) => a - b);
    const mid = Math.floor(sample.length / 2);
    const median = sample.length % 2 ? sample[mid] : (sample[mid - 1] + sample[mid]) / 2;
    const medianBased = median * freq;

    let annual = trailingSum;
    if (medianBased > 0 && trailingSum > medianBased * 1.6) annual = medianBased;
    if (annual <= 0) annual = medianBased;
    if (annual <= 0) return null;

    const perShare = +annual.toFixed(2);
    const y = price > 0 ? +((perShare / price) * 100).toFixed(2) : 0;
    if (y > MAX_PLAUSIBLE_YIELD) return null;
    return { d: perShare, y };
}

async function fetchDividendFromApi(code) {
    const url = `${priceApiBase()}/v8/finance/chart/${code}.T?range=2y&interval=1mo&events=div`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    const result = json && json.chart && json.chart.result && json.chart.result[0];
    const price = result && result.meta && result.meta.regularMarketPrice;
    if (typeof price !== 'number') throw new Error('no price data');
    const events = (result.events && result.events.dividends) || {};
    const payments = Object.values(events)
        .filter(ev => ev && typeof ev.amount === 'number' && ev.amount > 0)
        .sort((a, b) => a.date - b.date);
    return annualizeDividends(payments, price); // 無配なら null
}

async function ensureDividendData(codes) {
    const cache = getDividendCache();
    const now = Date.now();
    const targets = [...new Set(codes)].filter(c => !cache[c] || now - (cache[c].t || 0) > DIVIDEND_TTL_MS);

    for (const code of targets) {
        try {
            const info = await fetchDividendFromApi(code);
            cache[code] = info ? { d: info.d, y: info.y, t: now } : { d: 0, y: 0, t: now };
        } catch (e) {
            // 取得できなかった銘柄は次回に再挑戦する（キャッシュに入れない）
        }
    }
    try {
        localStorage.setItem(DIVIDEND_CACHE_KEY, JSON.stringify(cache));
    } catch (e) {
        // 保存領域が満杯でも表示は続ける
    }

    // getDividendInfo が参照する配当データへ反映する
    if (!FULL_DIVIDENDS) FULL_DIVIDENDS = {};
    for (const code of new Set(codes)) {
        const c = cache[code];
        if (c && c.d > 0) FULL_DIVIDENDS[code] = { d: c.d, y: c.y };
    }
}

// 日本株の配当利回りは実質的にこの水準を超えないため、超える値はデータ不整合とみなす
// （株式分割前の1株配当が残っていると利回りが数倍に膨らむ）
const MAX_PLAUSIBLE_YIELD = 15;

// コードから配当情報を取得（週次更新の全銘柄データ優先 → 手入力の厳選データ）
// 手入力側は株式分割に追随できず古い1株配当が残るため、自動更新データを優先する
// 戻り値: { perShare: 1株配当(円), yield: 利回り(%), source: 'auto'|'curated'|'none' }
function getDividendInfo(code, currentPrice) {
    const calcYield = (perShare, storedYield) => {
        const y = currentPrice > 0 ? (perShare / currentPrice * 100) : (storedYield || 0);
        return y > MAX_PLAUSIBLE_YIELD ? 0 : y;
    };

    const auto = FULL_DIVIDENDS && FULL_DIVIDENDS[code];
    if (auto) {
        const y = calcYield(auto.d, auto.y);
        if (y > 0) return { perShare: auto.d, yield: y, source: 'auto' };
    }
    const curated = STOCK_MASTER_DATA[code];
    if (curated && curated.dividend !== undefined) {
        const y = calcYield(curated.dividend, curated.dividend_yield);
        // 分割前の配当額が残っていると利回りが実態から乖離するので、その場合は無配扱いにせず0を返す
        if (y > 0) return { perShare: curated.dividend, yield: y, source: 'curated' };
        return { perShare: 0, yield: 0, source: 'none' };
    }
    if (auto) return { perShare: auto.d, yield: 0, source: 'auto' };
    return { perShare: 0, yield: 0, source: 'none' };
}

// 複数銘柄の株価を取得（5分キャッシュ → Yahoo直接 → スナップショットの順）
async function fetchRealTimePrices(codes, force = false) {
    const cache = getPriceCache();
    const now = Date.now();
    const result = {};
    const toFetch = [];

    for (const code of codes) {
        if (!force && cache[code] && (now - cache[code].time) < PRICE_CACHE_TTL) {
            result[code] = cache[code];
        } else {
            toFetch.push(code);
        }
    }

    if (toFetch.length > 0) {
        // 中継サーバー経由で保有銘柄の株価を取得する。
        // 株価をまとめたファイルは配信しないため、取得できなかった銘柄は
        // 前回取得できた値（キャッシュ）をそのまま使う
        const settled = await Promise.allSettled(toFetch.map(fetchQuote));
        settled.forEach((s, i) => {
            if (s.status === 'fulfilled') {
                result[toFetch[i]] = s.value;
                cache[toFetch[i]] = s.value;
            } else if (cache[toFetch[i]]) {
                result[toFetch[i]] = { ...cache[toFetch[i]], stale: true };
            }
        });

        localStorage.setItem(PRICE_CACHE_KEY, JSON.stringify(cache));
    }

    return result;
}

// ポートフォリオ全銘柄の現在値を更新
function setRefreshBtnLabel(text) {
    const label = document.getElementById('refreshPricesLabel');
    if (label) label.textContent = text;
}

let PRICE_REFRESHING = false;
async function refreshPrices(force = false) {
    if (PRICE_REFRESHING) return;
    const portfolio = getPortfolio();
    if (portfolio.length === 0) return;

    PRICE_REFRESHING = true;
    const btn = document.getElementById('refreshPricesBtn');
    const statusEl = document.getElementById('priceUpdatedAt');
    if (btn) { btn.disabled = true; setRefreshBtnLabel('更新中...'); }

    try {
        const prices = await fetchRealTimePrices(portfolio.map(s => s.code), force);
        // 中継サーバー設定時は、配当も保有銘柄の分だけその都度取得する
        await ensureDividendData(portfolio.map(s => s.code));
        let updated = 0;
        let snapshotTime = null;

        portfolio.forEach(stock => {
            const q = prices[stock.code];
            if (q) {
                stock.currentPrice = q.price;
                stock.changePercent = q.changePercent;
                stock.priceTime = q.time;
                if (q.snapshot) snapshotTime = q.time;
                updated++;
            }
        });

        setPortfolio(portfolio);
        updateDashboard();
        if (document.getElementById('portfolio').classList.contains('active')) updatePortfolioPage(portfolio);

        if (statusEl) {
            if (updated === 0) {
                statusEl.textContent = '株価を取得できませんでした（オフラインの可能性があります）';
            } else if (snapshotTime) {
                statusEl.textContent = `株価更新（${new Date(snapshotTime).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}時点のデータ・${updated}/${portfolio.length}銘柄）`;
            } else {
                statusEl.textContent = `株価更新: ${new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}（${updated}/${portfolio.length}銘柄）`;
            }
        }
    } catch (e) {
        console.error('price refresh error:', e);
        if (statusEl) statusEl.textContent = '株価の取得に失敗しました';
    } finally {
        PRICE_REFRESHING = false;
        if (btn) { btn.disabled = false; setRefreshBtnLabel('株価を更新'); }
    }
}

// ===== ページ切り替え =====
// ===== スマホ用メニュー =====
function openMobileMenu() {
    document.getElementById('mobileMenuBackdrop').classList.add('open');
    document.getElementById('mobileMenuSheet').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    document.getElementById('mobileMenuBackdrop').classList.remove('open');
    document.getElementById('mobileMenuSheet').classList.remove('open');
    document.body.style.overflow = '';
}

function goToPage(pageId) {
    closeMobileMenu();
    switchPage(pageId);
}

function switchPage(pageId) {
    document.querySelectorAll('.page-section').forEach(section => section.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const navIndex = { 'dashboard': 0, 'portfolio': 1, 'history': 2, 'ai-analysis': 3, 'unit-plan': 4, 'recommend': 5, 'dividend': 6, 'ai-chat': 7, 'guide': 8 };
    if (navIndex[pageId] !== undefined) {
        const items = document.querySelectorAll('.nav-item');
        if (items[navIndex[pageId]]) items[navIndex[pageId]].classList.add('active');
    }

    document.querySelectorAll('.bottom-nav-item').forEach(item => item.classList.remove('active'));
    const bottomNavIndex = { 'dashboard': 0, 'ai-analysis': 1, 'ai-chat': 2, 'dividend': 3 };
    const items = document.querySelectorAll('.bottom-nav-item');
    if (bottomNavIndex[pageId] !== undefined && items[bottomNavIndex[pageId]]) {
        items[bottomNavIndex[pageId]].classList.add('active');
    } else if (items.length) {
        // 下部ナビに無いページ（ポートフォリオ・資産推移など）は「メニュー」を選択状態にする
        items[items.length - 1].classList.add('active');
    }

    if (pageId === 'dashboard') updateDashboard();
    if (pageId === 'portfolio') updatePortfolioPage(getPortfolio());
    if (pageId === 'history') renderHistoryPage();
    if (pageId === 'ai-analysis') updateAIAnalysis();
    if (pageId === 'recommend') updateRecommendationsDisplay();
    if (pageId === 'dividend') renderDividendPage();
    if (pageId === 'unit-plan') renderUnitPlan();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== ダッシュボード =====
function updateDashboard() {
    const portfolio = getPortfolio();
    const set = (id, text, color) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = text;
        if (color) el.style.color = color;
    };

    if (portfolio.length === 0) {
        set('kpiValue', '¥0');
        set('kpiGain', '¥0', 'var(--text-main)');
        set('kpiGainSub', '');
        set('kpiDividend', '¥0');
        set('kpiDividendSub', '');
        set('kpiConcentration', '- %');
        set('kpiConcentrationSub', '');
        updateStockTable(portfolio);
        renderAlerts();
        return;
    }

    const cost = portfolio.reduce((sum, s) => sum + s.acquisitionPrice * s.shares, 0);
    const currentValue = portfolio.reduce((sum, s) => sum + s.currentPrice * s.shares, 0);
    const gain = currentValue - cost;
    const gainPct = cost > 0 ? (gain / cost) * 100 : 0;
    const top = [...portfolio].sort((a, b) => (b.currentPrice * b.shares) - (a.currentPrice * a.shares))[0];
    const maxConcentration = currentValue > 0 ? (top.currentPrice * top.shares) / currentValue * 100 : 0;
    const div = simulateDividendIncome(1);
    const divYield = currentValue > 0 ? (div.annual / currentValue) * 100 : 0;

    set('kpiValue', formatYen(currentValue));
    set('kpiGain', (gain >= 0 ? '+' : '-') + formatYen(Math.abs(gain)), gain >= 0 ? 'var(--gain)' : 'var(--loss)');
    set('kpiGainSub', `${gain >= 0 ? '+' : ''}${gainPct.toFixed(1)}% ・ 取得 ${formatYen(cost)}`);
    set('kpiDividend', formatYen(div.annual));
    set('kpiDividendSub', `月あたり約${formatYen(div.monthly)} ・ 利回り${divYield.toFixed(2)}%`);
    set('kpiConcentration', maxConcentration.toFixed(1) + ' %');
    set('kpiConcentrationSub', `${top.name} ・ 全${portfolio.length}銘柄`);

    updateStockTable(portfolio);
    updateDataSettingsUI();
    savePortfolioSnapshot();
    checkAlerts();
    renderAlerts();
}

function updateStockTable(portfolio) {
    const tbody = document.querySelector('#dashboard .stock-table tbody');
    if (!tbody) return;

    if (portfolio.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-sub); padding: 32px;">
            まだ銘柄が登録されていません。<br>「スクショで追加」か「手動で追加」から始めましょう！
        </td></tr>`;
        return;
    }

    tbody.innerHTML = portfolio.map(stock => {
        const gain = (stock.currentPrice - stock.acquisitionPrice) * stock.shares;
        const gainColor = gain >= 0 ? '#1E7A4E' : '#D64545';
        const gainSign = gain >= 0 ? '+' : '-';
        const changeHtml = (typeof stock.changePercent === 'number')
            ? `<span style="color: ${stock.changePercent >= 0 ? '#1E7A4E' : '#D64545'}; font-size: 12px;">${stock.changePercent >= 0 ? '▲' : '▼'}${Math.abs(stock.changePercent).toFixed(2)}%</span>`
            : '';
        const benefitBadge = getBenefitInfo(stock.code)
            ? `<span class="benefit-badge" title="株主優待あり"><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>優待</span>`
            : '';
        return `
        <tr>
            <td><strong>${escapeHtml(stock.name)} (${escapeHtml(stock.code)})</strong>${benefitBadge}</td>
            <td>${stock.shares.toLocaleString()} 株</td>
            <td>${formatPrice(stock.acquisitionPrice)}</td>
            <td>${formatPrice(stock.currentPrice)} ${changeHtml}</td>
            <td style="color: ${gainColor}; font-weight: bold;">${gainSign}${formatYen(Math.abs(gain))}</td>
            <td style="text-align: center; white-space: nowrap;">
                <button style="background: none; border: none; cursor: pointer; color: var(--text-sub); display: inline-flex; align-items: center; margin-right: 6px;" onclick="openEditHolding('${escapeHtml(stock.code)}')" title="株数・取得単価を修正"><svg class="icon" style="width: 15px; height: 15px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg></button>
                <button style="background: none; border: none; cursor: pointer; color: var(--text-sub); display: inline-flex; align-items: center;" onclick="removeStockFromPortfolio('${escapeHtml(stock.code)}')" title="削除"><svg class="icon" style="width: 15px; height: 15px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
            </td>
        </tr>`;
    }).join('');

    renderHoldingCards(portfolio);
}

// ===== 保有内容の修正（スクショの読み取り違いを直せるようにする） =====
let EDITING_CODE = null;

function openEditHolding(code) {
    const stock = getPortfolio().find(s => s.code === code);
    if (!stock) return;
    EDITING_CODE = code;
    document.getElementById('editHoldingName').textContent = `${stock.name}（${stock.code}）`;
    document.getElementById('editShares').value = stock.shares;
    document.getElementById('editPrice').value = stock.acquisitionPrice;
    updateEditPreview();
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('editHoldingModal').style.display = 'block';
}

function closeEditHolding() {
    EDITING_CODE = null;
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('editHoldingModal').style.display = 'none';
}

function updateEditPreview() {
    const preview = document.getElementById('editHoldingPreview');
    if (!preview || !EDITING_CODE) return;
    const stock = getPortfolio().find(s => s.code === EDITING_CODE);
    const shares = parseFloat(document.getElementById('editShares').value);
    const price = parseFloat(document.getElementById('editPrice').value);
    if (!stock || !(shares > 0) || !(price > 0)) { preview.textContent = ''; return; }
    const cost = shares * price;
    const value = shares * stock.currentPrice;
    const gain = value - cost;
    preview.innerHTML = `取得総額 ${formatYen(cost)} ・ 現在値 ${formatPrice(stock.currentPrice)} で評価額 ${formatYen(value)}<br>
        評価損益 <span style="color: ${gain >= 0 ? 'var(--gain)' : 'var(--loss)'}; font-weight: 700;">${gain >= 0 ? '+' : '-'}${formatYen(Math.abs(gain))}</span>`;
}

function saveEditHolding() {
    if (!EDITING_CODE) return;
    const shares = parseInt(document.getElementById('editShares').value, 10);
    const price = parseFloat(document.getElementById('editPrice').value);
    if (!shares || shares <= 0) { alert('株数を入力してください'); return; }
    if (!price || price <= 0) { alert('取得単価を入力してください'); return; }

    const portfolio = getPortfolio();
    const stock = portfolio.find(s => s.code === EDITING_CODE);
    if (!stock) { closeEditHolding(); return; }
    stock.shares = shares;
    stock.acquisitionPrice = price;
    localStorage.setItem('portfolio', JSON.stringify(portfolio));

    closeEditHolding();
    updateDashboard();
    if (document.getElementById('portfolio').classList.contains('active')) updatePortfolioPage(getPortfolio());
}

// スマホ用の保有銘柄カード（表は列が潰れて読めないため、同じ情報をカードで出す）
function renderHoldingCards(portfolio) {
    const wrap = document.getElementById('holdingCards');
    if (!wrap) return;

    if (portfolio.length === 0) {
        wrap.innerHTML = `<p style="color: var(--text-sub); font-size: 14px; text-align: center; padding: 24px 8px; line-height: 1.7;">
            まだ銘柄が登録されていません。<br>「スクショで追加」から始められます。
        </p>`;
        return;
    }

    const total = portfolio.reduce((s, v) => s + v.currentPrice * v.shares, 0);

    wrap.innerHTML = portfolio.map(stock => {
        const value = stock.currentPrice * stock.shares;
        const cost = stock.acquisitionPrice * stock.shares;
        const gain = value - cost;
        const gainPct = cost > 0 ? (gain / cost) * 100 : 0;
        const up = gain >= 0;
        const color = up ? 'var(--gain)' : 'var(--loss)';
        const ratio = total > 0 ? (value / total) * 100 : 0;
        const benefit = getBenefitInfo(stock.code)
            ? '<span class="benefit-tag" style="margin-left: 6px;">優待</span>' : '';

        return `
        <div class="holding-card" onclick="openStockDetail('${escapeHtml(stock.code)}')">
            <div class="holding-card-top">
                <div class="holding-card-name">
                    ${escapeHtml(stock.name)}${benefit}
                    <span class="holding-card-code">${escapeHtml(stock.code)} ・ 全体の${ratio.toFixed(1)}%</span>
                </div>
                <div class="holding-card-gain" style="color: ${color};">
                    <strong>${up ? '+' : '-'}${formatYen(Math.abs(gain))}</strong>
                    <small>${up ? '+' : ''}${gainPct.toFixed(1)}%</small>
                </div>
            </div>
            <div class="holding-card-grid">
                <div><dt>株数</dt><dd>${stock.shares.toLocaleString()}株</dd></div>
                <div><dt>取得単価</dt><dd>${formatPrice(stock.acquisitionPrice)}</dd></div>
                <div><dt>現在値</dt><dd>${formatPrice(stock.currentPrice)}</dd></div>
            </div>
            <div class="holding-card-actions">
                <button onclick="event.stopPropagation(); openEditHolding('${escapeHtml(stock.code)}')">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>
                    修正
                </button>
                <button onclick="event.stopPropagation(); removeStockFromPortfolio('${escapeHtml(stock.code)}')">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    削除
                </button>
            </div>
        </div>`;
    }).join('');
}

// ===== ポートフォリオ詳細 =====
function updatePortfolioPage(portfolio) {
    const gainSection = document.querySelector('.portfolio-gain-section');
    const portfolioSector = document.querySelector('.portfolio-sector');
    const portfolioTbody = document.querySelector('.portfolio-layout .stock-table tbody');

    if (portfolio.length === 0) {
        if (gainSection) gainSection.innerHTML = `<div style="padding: 24px; background-color: var(--card-bg); border-radius: 8px; border: 1px solid var(--border-color); text-align: center; color: var(--text-sub);">銘柄を追加するとポートフォリオ分析が表示されます</div>`;
        if (portfolioSector) portfolioSector.innerHTML = '<p style="color: var(--text-sub);">データがありません</p>';
        if (portfolioTbody) portfolioTbody.innerHTML = '<tr><td colspan="2" style="color: var(--text-sub);">データがありません</td></tr>';
        return;
    }

    const totalAcquisition = portfolio.reduce((sum, s) => sum + s.acquisitionPrice * s.shares, 0);
    const totalCurrent = portfolio.reduce((sum, s) => sum + s.currentPrice * s.shares, 0);
    const totalGain = totalCurrent - totalAcquisition;
    const gainPercent = totalAcquisition > 0 ? (totalGain / totalAcquisition) * 100 : 0;

    if (gainSection) {
        const gainColor = totalGain >= 0 ? '#1E7A4E' : '#D64545';
        const gainSign = totalGain >= 0 ? '+' : '-';
        gainSection.innerHTML = `
            <div style="padding: 16px; background-color: ${gainColor}15; border-radius: 8px; border-left: 4px solid ${gainColor};">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div>
                        <p style="color: var(--text-sub); margin: 0; font-size: 12px;">評価損益</p>
                        <p style="color: ${gainColor}; margin: 8px 0 0 0; font-size: 24px; font-weight: bold;">${gainSign}${formatYen(Math.abs(totalGain))}</p>
                        <p style="color: ${gainColor}; margin: 4px 0 0 0; font-size: 14px;">(${gainSign}${Math.abs(gainPercent).toFixed(2)}%)</p>
                    </div>
                    <div>
                        <p style="color: var(--text-sub); margin: 0; font-size: 12px;">評価額合計</p>
                        <p style="color: #333; margin: 8px 0 0 0; font-size: 18px; font-weight: bold;">${formatYen(totalCurrent)}</p>
                        <p style="color: var(--text-sub); margin: 4px 0 0 0; font-size: 12px;">取得総額: ${formatYen(totalAcquisition)}</p>
                    </div>
                </div>
            </div>
        `;
    }

    const sectors = {};
    portfolio.forEach(stock => {
        const sector = normalizeSector(stock.sector || '不明');
        if (!sectors[sector]) sectors[sector] = { value: 0, count: 0 };
        sectors[sector].value += stock.currentPrice * stock.shares;
        sectors[sector].count += 1;
    });

    if (portfolioSector) {
        // ドーナツチャート + 凡例（セクター固定色で保有変化に影響されない配色）
        const entries = Object.entries(sectors).sort((a, b) => b[1].value - a[1].value);
        const R = 15.9155; // 円周がちょうど100になる半径
        let offset = 25;   // 12時の位置から開始
        const segs = entries.map(([sector, data], i) => {
            const pct = data.value / totalCurrent * 100;
            const seg = `<circle r="${R}" cx="21" cy="21" fill="transparent" stroke="${sectorColor(sector, i)}" stroke-width="6.5" stroke-dasharray="${pct.toFixed(3)} ${(100 - pct).toFixed(3)}" stroke-dashoffset="${offset.toFixed(3)}"></circle>`;
            offset -= pct;
            return seg;
        }).join('');
        const legend = entries.map(([sector, data], i) => {
            const pct = (data.value / totalCurrent * 100).toFixed(1);
            return `<div class="donut-legend-row">
                <span class="donut-dot" style="background:${sectorColor(sector, i)}"></span>
                <span class="donut-name">${escapeHtml(sector)}<span style="color: var(--text-sub); font-size: 11.5px;">（${data.count}銘柄）</span></span>
                <span class="donut-pct">${pct}%</span>
            </div>`;
        }).join('');
        portfolioSector.innerHTML = `
            <div class="donut-wrap">
                <div class="donut-chart">
                    <svg viewBox="0 0 42 42">${segs}</svg>
                    <div class="donut-center"><span>評価額合計</span><strong>${formatYen(totalCurrent)}</strong></div>
                </div>
                <div class="donut-legend">${legend}</div>
            </div>`;
    }

    // 構成比率は数字だけだと大小が掴みにくいので棒で示す
    const composition = document.getElementById('topComposition');
    if (composition) {
        const ranked = [...portfolio]
            .sort((a, b) => (b.currentPrice * b.shares) - (a.currentPrice * a.shares))
            .slice(0, 8);
        const maxPct = ranked.length ? (ranked[0].currentPrice * ranked[0].shares) / totalCurrent * 100 : 0;
        composition.innerHTML = ranked.map((stock, i) => {
            const value = stock.currentPrice * stock.shares;
            const pct = totalCurrent > 0 ? value / totalCurrent * 100 : 0;
            const gain = value - stock.acquisitionPrice * stock.shares;
            const color = pct >= 30 ? 'var(--warn)' : 'var(--primary-color)';
            return `
            <div class="compo-row" onclick="openStockDetail('${escapeHtml(stock.code)}')">
                <div class="compo-head">
                    <span class="compo-name">${i + 1}. ${escapeHtml(stock.name)}</span>
                    <span class="compo-pct">${pct.toFixed(1)}%</span>
                </div>
                <div class="compo-bar"><span style="width: ${maxPct > 0 ? (pct / maxPct * 100).toFixed(1) : 0}%; background-color: ${color};"></span></div>
                <p class="compo-note">${formatYen(value)}
                    <span style="color: ${gain >= 0 ? 'var(--gain)' : 'var(--loss)'};">（${gain >= 0 ? '+' : '-'}${formatYen(Math.abs(gain))}）</span>
                    ${pct >= 30 ? '<span style="color: var(--warn);">・比率が高め</span>' : ''}
                </p>
            </div>`;
        }).join('');
    }
}

// ===== 資産推移 =====
function renderHistoryPage() {
    const container = document.getElementById('historyChart');
    const tableBody = document.getElementById('historyTableBody');
    if (!container) return;

    const history = JSON.parse(localStorage.getItem('portfolio_history') || '[]')
        .slice()
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    if (history.length === 0) {
        container.innerHTML = `<p style="color: var(--text-sub); text-align: center; padding: 40px;">まだ履歴がありません。銘柄を追加すると、日ごとの評価額が自動記録されます。</p>`;
        if (tableBody) tableBody.innerHTML = '';
        return;
    }

    // SVG折れ線グラフ
    const W = 720, H = 280, P = { l: 84, r: 20, t: 20, b: 40 };
    const currentVals = history.map(h => h.currentValue);
    const costVals = history.map(h => h.totalValue);
    const allVals = currentVals.concat(costVals);
    let min = Math.min(...allVals), max = Math.max(...allVals);
    if (min === max) { min = min * 0.95; max = max * 1.05 || 100; }
    const pad = (max - min) * 0.1;
    min -= pad; max += pad;

    const n = history.length;
    const x = i => P.l + (n === 1 ? (W - P.l - P.r) / 2 : i * (W - P.l - P.r) / (n - 1));
    const y = v => P.t + (H - P.t - P.b) * (1 - (v - min) / (max - min));

    // Y軸グリッド線（3本）
    let grid = '';
    for (let g = 0; g <= 2; g++) {
        const v = min + (max - min) * g / 2;
        const gy = y(v);
        grid += `<line x1="${P.l}" y1="${gy}" x2="${W - P.r}" y2="${gy}" stroke="#E5E9E6" stroke-width="1"/>`;
        grid += `<text x="${P.l - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#6B7280">${(v / 10000).toFixed(0)}万</text>`;
    }

    // X軸ラベル（最初・中間・最後）
    let xLabels = '';
    const labelIdx = n <= 2 ? [...Array(n).keys()] : [0, Math.floor((n - 1) / 2), n - 1];
    [...new Set(labelIdx)].forEach(i => {
        xLabels += `<text x="${x(i)}" y="${H - 12}" text-anchor="middle" font-size="11" fill="#6B7280">${escapeHtml(history[i].date)}</text>`;
    });

    const currentPoints = history.map((h, i) => `${x(i)},${y(h.currentValue)}`).join(' ');
    const costPoints = history.map((h, i) => `${x(i)},${y(h.totalValue)}`).join(' ');
    const dots = history.map((h, i) => `<circle cx="${x(i)}" cy="${y(h.currentValue)}" r="4" fill="#1E7A4E"><title>${escapeHtml(h.date)}: ${formatYen(h.currentValue)}</title></circle>`).join('');

    container.innerHTML = `
        <svg viewBox="0 0 ${W} ${H}" style="width: 100%; height: auto;">
            ${grid}
            <polyline points="${costPoints}" fill="none" stroke="#2C6E8F" stroke-width="2" stroke-dasharray="6 4"/>
            <polyline points="${currentPoints}" fill="none" stroke="#1E7A4E" stroke-width="2.5"/>
            ${dots}
            ${xLabels}
        </svg>
        <div style="display: flex; gap: 20px; justify-content: center; margin-top: 8px; font-size: 13px; color: var(--text-sub);">
            <span><span style="display: inline-block; width: 20px; height: 3px; background: #1E7A4E; vertical-align: middle; margin-right: 6px;"></span>評価額</span>
            <span><span style="display: inline-block; width: 20px; height: 3px; background: #2C6E8F; vertical-align: middle; margin-right: 6px; border-bottom: 1px dashed;"></span>取得総額</span>
        </div>
    `;

    // 履歴テーブル（新しい順・最大30件）
    if (tableBody) {
        tableBody.innerHTML = [...history].reverse().slice(0, 30).map(h => {
            const gainColor = h.gainLoss >= 0 ? '#1E7A4E' : '#D64545';
            const sign = h.gainLoss >= 0 ? '+' : '-';
            return `<tr>
                <td>${escapeHtml(h.date)}</td>
                <td>${formatYen(h.currentValue)}</td>
                <td style="color: ${gainColor}; font-weight: bold;">${sign}${formatYen(Math.abs(h.gainLoss))} (${sign}${Math.abs(parseFloat(h.gainLossPercent)).toFixed(2)}%)</td>
                <td>${h.holdings} 銘柄</td>
            </tr>`;
        }).join('');
    }

    renderHistoryCards(history);
}

// スマホ用の日次履歴カード（前日との差も出して変化が分かるようにする）
function renderHistoryCards(history) {
    const wrap = document.getElementById('historyCards');
    if (!wrap) return;
    if (!history || history.length === 0) { wrap.innerHTML = ''; return; }

    const desc = [...history].reverse();
    wrap.innerHTML = desc.map((h, i) => {
        const gain = h.gainLoss;
        const up = gain >= 0;
        const prev = desc[i + 1];
        const dayDiff = prev ? h.currentValue - prev.currentValue : null;
        const dayHtml = dayDiff === null ? ''
            : `<div><dt>前日比</dt><dd style="color: ${dayDiff >= 0 ? 'var(--gain)' : 'var(--loss)'};">${dayDiff >= 0 ? '+' : '-'}${formatYen(Math.abs(dayDiff))}</dd></div>`;
        return `
        <div class="holding-card">
            <div class="holding-card-top">
                <div class="holding-card-name">${escapeHtml(h.date)}
                    <span class="holding-card-code">${h.holdings}銘柄を保有</span>
                </div>
                <div class="holding-card-gain" style="color: ${up ? 'var(--gain)' : 'var(--loss)'};">
                    <strong>${up ? '+' : '-'}${formatYen(Math.abs(gain))}</strong>
                    <small>${up ? '+' : '-'}${Math.abs(parseFloat(h.gainLossPercent)).toFixed(2)}%</small>
                </div>
            </div>
            <div class="holding-card-grid">
                <div><dt>評価額</dt><dd>${formatYen(h.currentValue)}</dd></div>
                <div><dt>取得総額</dt><dd>${formatYen(h.totalValue)}</dd></div>
                ${dayHtml}
            </div>
        </div>`;
    }).join('');
}

// ===== AI診断 =====
function updateAIAnalysis() {
    const portfolio = getPortfolio();
    const scoreBadge = document.getElementById('scoreBadge');
    const scoreTitle = document.getElementById('scoreTitle');
    const scoreDate = document.getElementById('scoreDate');
    const diagnosticList = document.getElementById('diagnosticList');
    if (!scoreBadge || !diagnosticList) return;

    if (scoreDate) scoreDate.textContent = '診断日時: ' + new Date().toLocaleDateString('ja-JP');

    if (portfolio.length === 0) {
        scoreBadge.textContent = '-';
        if (scoreTitle) scoreTitle.textContent = '銘柄を追加すると診断が始まります';
        diagnosticList.innerHTML = `<div class="diagnostic-item"><div class="diagnostic-title">データ不足</div><p style="color: var(--text-sub); font-size: 14px;">ダッシュボードから保有銘柄を追加してください。スクショからの自動読み取りにも対応しています。</p></div>`;
        return;
    }

    const totalValue = portfolio.reduce((sum, s) => sum + s.currentPrice * s.shares, 0);
    const findings = [];
    let score = 100;

    // 1. 集中度チェック
    const sorted = [...portfolio].sort((a, b) => (b.currentPrice * b.shares) - (a.currentPrice * a.shares));
    const topStock = sorted[0];
    const topConcentration = (topStock.currentPrice * topStock.shares) / totalValue * 100;
    if (topConcentration > 50) {
        score -= 30;
        findings.push({ tone: 'alert', title: '高い集中リスク', text: `${topStock.name}が全体の${topConcentration.toFixed(1)}%を占めています。1銘柄の急落が資産全体に大きく影響します。分散を強くおすすめします。` });
    } else if (topConcentration > 30) {
        score -= 15;
        findings.push({ tone: 'warn', title: '集中リスク', text: `${topStock.name}への投資比率が${topConcentration.toFixed(1)}%とやや高めです。1銘柄への集中はリスクを高めます。` });
    } else {
        findings.push({ tone: 'ok', title: '集中度は良好', text: `最大銘柄の比率は${topConcentration.toFixed(1)}%。1銘柄への過度な集中はありません。` });
    }

    // 2. 銘柄数チェック
    if (portfolio.length < 3) {
        score -= 15;
        findings.push({ tone: 'info', title: '銘柄数が少なめ', text: `現在${portfolio.length}銘柄です。5銘柄以上に分散すると、個別企業のリスクを抑えられます。` });
    } else if (portfolio.length < 5) {
        score -= 5;
        findings.push({ tone: 'info', title: 'もう少し分散の余地あり', text: `現在${portfolio.length}銘柄。5〜10銘柄程度が初心者にも管理しやすい分散の目安です。` });
    }

    // 3. セクター分散チェック
    const sectors = {};
    portfolio.forEach(s => {
        const sec = normalizeSector(s.sector || '不明');
        sectors[sec] = (sectors[sec] || 0) + s.currentPrice * s.shares;
    });
    const sectorEntries = Object.entries(sectors).sort((a, b) => b[1] - a[1]);
    const topSectorPercent = sectorEntries[0][1] / totalValue * 100;
    if (topSectorPercent > 60 && sectorEntries[0][0] !== 'ETF') {
        score -= 20;
        findings.push({ tone: 'warn', title: 'セクターの偏り', text: `${sectorEntries[0][0]}セクターが${topSectorPercent.toFixed(1)}%を占めています。業界全体の不況に弱いポートフォリオです。` });
    } else if (Object.keys(sectors).length < 3 && portfolio.length >= 3) {
        score -= 10;
        findings.push({ tone: 'info', title: 'セクター数が少なめ', text: `現在${Object.keys(sectors).length}セクターのみ。異なる業種を組み合わせると景気変動に強くなります。` });
    }

    // 4. ディフェンシブ銘柄チェック
    const defensiveSectors = ['食品', '医薬', 'インフラ', '通信'];
    const hasDefensive = portfolio.some(s => defensiveSectors.includes(normalizeSector(s.sector)));
    const hasETF = portfolio.some(s => normalizeSector(s.sector) === 'ETF');
    if (!hasDefensive && !hasETF) {
        score -= 10;
        findings.push({ tone: 'info', title: '足りない視点', text: '食品・医薬・通信・インフラなどディフェンシブ性の高いセクターがありません。景気後退時の下支えになります。' });
    }

    // 5. 配当チェック
    const div = simulateDividendIncome(1);
    const portfolioYield = totalValue > 0 ? (div.annual / totalValue * 100) : 0;
    if (div.annual > 0) {
        findings.push({ tone: 'ok', title: '配当収入の見込み', text: `年間配当見込みは約${formatYen(div.annual)}（月あたり約${formatYen(div.monthly)}）、ポートフォリオ利回りは約${portfolioYield.toFixed(2)}%です。詳しくは「配当予測」ページへ。` });
    }

    // 6. 配当利回りの水準チェック（全銘柄の配当データを活用）
    // 東証プライムの平均配当利回りはおおむね2%前後。それを基準に評価する。
    const noDivCount = portfolio.filter(s => getDividendInfo(s.code, s.currentPrice).perShare <= 0 && normalizeSector(s.sector) !== 'ETF').length;
    if (div.annual === 0 && portfolio.length > 0) {
        findings.push({ tone: 'info', title: '配当を受け取れる銘柄がありません', text: '保有銘柄はいずれも配当が確認できません。成長重視の構成ですが、配当のある銘柄を加えると定期的な収入源になります。' });
    } else if (portfolioYield >= 3.5) {
        findings.push({ tone: 'ok', title: '高めの配当利回り', text: `ポートフォリオ利回り約${portfolioYield.toFixed(2)}%は市場平均（約2%）を上回ります。インカム重視の良い構成です。ただし利回りが極端に高い銘柄は減配リスクにも注意しましょう。` });
    } else if (portfolioYield > 0 && portfolioYield < 1.5) {
        findings.push({ tone: 'info', title: '配当利回りは控えめ', text: `ポートフォリオ利回りは約${portfolioYield.toFixed(2)}%で市場平均（約2%）を下回ります。成長株中心の構成です。配当収入も重視するなら高配当銘柄の追加を検討できます。` });
    }
    if (noDivCount > 0 && div.annual > 0) {
        findings.push({ tone: 'info', title: `無配の銘柄が${noDivCount}件`, text: '配当が確認できない銘柄があります。成長期待で保有する分には問題ありませんが、配当目的なら見直しの余地があります。' });
    }

    // 7. 含み損の状況
    const losers = portfolio.filter(s => s.currentPrice < s.acquisitionPrice);
    const worst = [...portfolio].map(s => ({
        s, pct: s.acquisitionPrice > 0 ? (s.currentPrice - s.acquisitionPrice) / s.acquisitionPrice * 100 : 0
    })).sort((a, b) => a.pct - b.pct)[0];
    if (worst && worst.pct <= -20) {
        findings.push({
            tone: 'warn', title: `${worst.s.name}が${Math.abs(worst.pct).toFixed(1)}%の含み損`,
            text: `保有${portfolio.length}銘柄のうち${losers.length}銘柄が取得価格を下回っています。下落理由が業績悪化なのか市場全体の動きなのかを確認し、値下がりした銘柄を買い増して平均取得単価を下げるかどうかは慎重に判断してください。`
        });
    } else if (losers.length > 0) {
        findings.push({
            tone: 'info', title: `含み損の銘柄が${losers.length}件`,
            text: `${portfolio.length}銘柄中${losers.length}銘柄が取得価格を下回っています。短期の値動きで慌てて売る必要はありませんが、保有理由が変わっていないかは定期的に確認しましょう。`
        });
    }

    // 8. 株主優待の活用状況（あと何株で優待がもらえるかまで示す）
    const benefitHeld = [];
    const benefitShort = [];
    portfolio.forEach(s => {
        const b = getBenefitInfo(s.code);
        if (!b) return;
        const need = b.minShares || 100;
        if (s.shares >= need) benefitHeld.push({ s, b, need });
        else benefitShort.push({ s, b, need, gap: need - s.shares });
    });
    if (benefitHeld.length > 0) {
        findings.push({
            tone: 'ok', title: `株主優待が受けられる銘柄が${benefitHeld.length}件`,
            text: benefitHeld.slice(0, 3).map(x => `${x.s.name}（${x.b.content || '優待あり'}）`).join('、') + '。権利確定月の前営業日までに保有しておく必要があります。'
        });
    }
    if (benefitShort.length > 0) {
        const x = benefitShort.sort((a, b) => a.gap - b.gap)[0];
        findings.push({
            tone: 'info', title: `あと${x.gap}株で${x.s.name}の優待対象`,
            text: `${x.s.name}は${x.need}株から優待（${x.b.content || '内容は企業ページを確認'}）が受けられます。現在${x.s.shares}株なので、あと${x.gap}株で対象になります。追加費用は約${formatYen(x.gap * x.s.currentPrice)}です。`
        });
    }

    // 9. 単元未満株（100株未満）の指摘
    const oddLots = portfolio.filter(s => s.shares > 0 && s.shares < 100 && normalizeSector(s.sector) !== 'ETF');
    if (oddLots.length > 0) {
        findings.push({
            tone: 'info', title: `単元未満株が${oddLots.length}件`,
            text: `${oddLots.slice(0, 3).map(s => `${s.name}（${s.shares}株）`).join('、')}は100株未満です。配当は株数に応じて受け取れますが、株主優待や議決権は原則100株からです。`
        });
    }

    // 項目別スコア（何が足りないのかを分けて見せる）
    const clamp = v => Math.max(0, Math.min(100, Math.round(v)));
    const axes = [
        {
            label: '銘柄の分散', value: clamp(100 - Math.max(0, topConcentration - 20) * 2),
            note: `最大銘柄${topConcentration.toFixed(1)}% ・ ${portfolio.length}銘柄`
        },
        {
            label: 'セクターの分散', value: clamp(100 - Math.max(0, topSectorPercent - 30) * 1.6),
            note: `${sectorEntries[0][0]}が${topSectorPercent.toFixed(1)}% ・ ${sectorEntries.length}業種`
        },
        {
            label: '配当の充実度', value: clamp(portfolioYield / 3.5 * 100),
            note: div.annual > 0 ? `利回り${portfolioYield.toFixed(2)}% ・ 年間${formatYen(div.annual)}` : '配当のある銘柄がありません'
        },
        {
            label: '守りの強さ', value: clamp((hasDefensive || hasETF ? 70 : 30) + (sectorEntries.length >= 4 ? 30 : sectorEntries.length * 7)),
            note: hasDefensive || hasETF ? 'ディフェンシブ銘柄あり' : '食品・医薬・通信・インフラが未保有'
        }
    ];

    // 次にやること（効果の大きい順に最大3つ）
    const actions = [];
    if (topConcentration > 30) {
        actions.push(`<strong>${escapeHtml(topStock.name)}の比率を下げる</strong>：全体の${topConcentration.toFixed(1)}%を占めています。他の銘柄を買い増すか、一部を利益確定して比率を30%以下に近づけると1銘柄の急落に強くなります。`);
    }
    if (topSectorPercent > 50 && sectorEntries[0][0] !== 'ETF') {
        actions.push(`<strong>${escapeHtml(sectorEntries[0][0])}以外の業種を足す</strong>：この業種で${topSectorPercent.toFixed(1)}%です。「推奨銘柄」ページに未保有セクターの候補が出ています。`);
    }
    if (!hasDefensive && !hasETF) {
        actions.push('<strong>景気に左右されにくい銘柄を1つ加える</strong>：食品・医薬・通信・インフラは値動きが穏やかで、下落局面の下支えになります。');
    }
    if (worst && worst.pct <= -20) {
        actions.push(`<strong>${escapeHtml(worst.s.name)}の下落理由を確認する</strong>：${Math.abs(worst.pct).toFixed(1)}%の含み損です。業績の悪化か一時的な地合いかで対応が変わります。保有理由が崩れていないかを見直しましょう。`);
    }
    // 優待の買い増しは追加費用が現実的な範囲のときだけ勧める
    const affordable = benefitShort
        .filter(x => x.gap * x.s.currentPrice <= 150000)
        .sort((a, b) => (a.gap * a.s.currentPrice) - (b.gap * b.s.currentPrice))[0];
    if (affordable) {
        actions.push(`<strong>${escapeHtml(affordable.s.name)}をあと${affordable.gap}株買うと優待対象</strong>：追加費用は約${formatYen(affordable.gap * affordable.s.currentPrice)}です。`);
    }
    if (oddLots.length >= 3) {
        actions.push(`<strong>単元未満株の扱いを決める</strong>：100株未満が${oddLots.length}件あります。優待や議決権は原則100株からなので、買い増して100株に揃えるか、配当目的として割り切るかを決めておくと管理が楽になります。`);
    }
    if (portfolio.length < 5) {
        actions.push(`<strong>銘柄数を5つ以上にする</strong>：現在${portfolio.length}銘柄です。1社の不調が全体に響きにくくなります。`);
    }
    if (portfolioYield > 0 && portfolioYield < 1.5) {
        actions.push(`<strong>配当のある銘柄の比率を上げる</strong>：現在の利回りは約${portfolioYield.toFixed(2)}%で市場平均（約2%）を下回ります。`);
    }
    if (actions.length === 0) {
        actions.push('<strong>今の構成を維持して積み立てを続ける</strong>：大きな偏りは見つかりませんでした。定期的に比率を確認し、増えすぎた銘柄を調整していきましょう。');
    }

    renderScoreAxes(axes);
    renderNextActions(actions.slice(0, 3));

    let grade, title;
    if (score >= 90) { grade = 'A'; title = '素晴らしいバランスのポートフォリオです'; }
    else if (score >= 75) { grade = 'B+'; title = 'バランスは良好ですが、さらに伸ばせる余地があります'; }
    else if (score >= 60) { grade = 'B'; title = 'まずまずですが、改善ポイントがいくつかあります'; }
    else if (score >= 45) { grade = 'C'; title = 'リスクの偏りが見られます。分散を検討しましょう'; }
    else { grade = 'D'; title = 'リスクが高い構成です。早めの見直しをおすすめします'; }

    scoreBadge.textContent = grade;
    if (scoreTitle) scoreTitle.textContent = title;

    const toneLabels = { alert: '警告', warn: '注意', ok: '良好', info: 'ヒント' };
    diagnosticList.innerHTML = findings.map(f => `
        <div class="diagnostic-item">
            <div class="diagnostic-title"><span class="diag-chip diag-${f.tone}">${toneLabels[f.tone] || ''}</span>${escapeHtml(f.title)}</div>
            <p style="color: var(--text-sub); font-size: 14px;">${escapeHtml(f.text)}</p>
        </div>
    `).join('');
}

// 項目別スコアをバーで表示（どこが弱いのかが一目で分かるようにする）
function renderScoreAxes(axes) {
    const card = document.getElementById('scoreAxesCard');
    const wrap = document.getElementById('scoreAxes');
    if (!wrap || !card) return;
    card.style.display = 'block';
    wrap.innerHTML = axes.map(a => {
        const color = a.value >= 70 ? 'var(--gain)' : a.value >= 45 ? 'var(--warn)' : 'var(--loss)';
        return `
        <div class="axis-row">
            <div class="axis-head">
                <span class="axis-label">${escapeHtml(a.label)}</span>
                <span class="axis-value" style="color: ${color};">${a.value}</span>
            </div>
            <div class="axis-bar"><span style="width: ${a.value}%; background-color: ${color};"></span></div>
            <p class="axis-note">${escapeHtml(a.note)}</p>
        </div>`;
    }).join('');
}

function renderNextActions(actions) {
    const card = document.getElementById('nextActionsCard');
    const list = document.getElementById('nextActions');
    if (!list || !card) return;
    card.style.display = 'block';
    list.innerHTML = actions.map(a => `<li>${a}</li>`).join('');
}

// ===== 単元達成プランナー =====
// 日本株の売買単位は原則100株。1株単位で買えるサービスが増えた一方、
// 株主優待や議決権は1単元（100株）からのものが多く、そこまでの距離が見えづらい。
const TRADING_UNIT = 100;

// 保有銘柄ごとに「単元まであと何株・いくら・達成すると何が得られるか」を計算する
function buildUnitPlan() {
    return getPortfolio()
        .filter(s => normalizeSector(s.sector) !== 'ETF')
        .map(stock => {
            const shortage = Math.max(0, TRADING_UNIT - stock.shares);
            const cost = Math.round(shortage * stock.currentPrice);
            const benefit = getBenefitInfo(stock.code);
            const div = getDividendInfo(stock.code);
            // 優待は100株以外（200株など）が条件のこともある
            const benefitNeed = benefit ? (benefit.minShares || TRADING_UNIT) : null;
            const benefitShortage = benefitNeed ? Math.max(0, benefitNeed - stock.shares) : null;
            return {
                stock,
                shortage,
                cost,
                achieved: shortage === 0,
                progress: Math.min(100, stock.shares / TRADING_UNIT * 100),
                benefit,
                benefitNeed,
                benefitShortage,
                benefitCost: benefitShortage ? Math.round(benefitShortage * stock.currentPrice) : 0,
                dividendGain: div.perShare > 0 ? Math.round(div.perShare * shortage) : 0
            };
        })
        .sort((a, b) => {
            if (a.achieved !== b.achieved) return a.achieved ? 1 : -1; // 未達成を上に
            return a.cost - b.cost;                                    // 少ない金額で届く順
        });
}

function renderUnitPlan() {
    const summary = document.getElementById('unitSummary');
    const list = document.getElementById('unitList');
    if (!summary || !list) return;

    const rows = buildUnitPlan();
    const pending = rows.filter(r => !r.achieved);
    const totalCost = pending.reduce((s, r) => s + r.cost, 0);

    if (rows.length === 0) {
        summary.innerHTML = '<p style="color: var(--text-sub); font-size: 14px; line-height: 1.8;">保有銘柄がありません。ダッシュボードから追加すると、単元までの距離を表示します。</p>';
        list.innerHTML = '';
        document.getElementById('unitBudgetResult').innerHTML = '';
        return;
    }

    if (pending.length === 0) {
        summary.innerHTML = `<p style="font-size: 14px; line-height: 1.8;"><strong>保有${rows.length}銘柄すべてが1単元（100株）以上です。</strong><br>
            <span style="color: var(--text-sub);">株主優待や議決権の条件を満たしています。</span></p>`;
    } else {
        const withBenefit = pending.filter(r => r.benefit).length;
        summary.innerHTML = `<p style="font-size: 14px; line-height: 1.9; margin: 0;">
            単元未満は<strong>${pending.length}銘柄</strong>（保有${rows.length}銘柄中）。
            すべてを100株にするには<strong>約${formatYen(totalCost)}</strong>が必要です。<br>
            <span style="color: var(--text-sub);">${withBenefit > 0
                ? `うち${withBenefit}銘柄は単元化すると株主優待の対象になります。`
                : '単元化すると議決権が得られます。'}</span></p>`;
    }

    list.innerHTML = rows.map(r => {
        const s = r.stock;
        const color = r.achieved ? 'var(--gain)' : r.progress >= 50 ? 'var(--warn)' : 'var(--primary-color)';
        const rewards = [];
        if (r.benefit && r.benefitShortage === 0) rewards.push(`優待: ${escapeHtml(r.benefit.content || '対象')}`);
        else if (r.benefit) rewards.push(`あと${r.benefitShortage}株で優待（${escapeHtml(r.benefit.content || '内容は要確認')}）`);
        if (!r.achieved) rewards.push('100株で議決権');
        if (r.dividendGain > 0) rewards.push(`配当が年${formatYen(r.dividendGain)}増える見込み`);

        return `
        <div class="unit-row">
            <div class="unit-head">
                <span class="unit-name">${escapeHtml(s.name)}<span class="unit-code">${escapeHtml(s.code)}</span></span>
                <span class="unit-count" style="color: ${color};">${s.shares.toLocaleString()}<span>/100株</span></span>
            </div>
            <div class="unit-bar"><span style="width: ${r.progress}%; background-color: ${color};"></span></div>
            ${r.achieved
                ? '<p class="unit-note" style="color: var(--gain);">1単元を達成しています</p>'
                : `<p class="unit-note"><strong>あと${r.shortage}株・約${formatYen(r.cost)}</strong>（現在値 ${formatPrice(s.currentPrice)}）</p>`}
            ${rewards.length ? `<p class="unit-reward">${rewards.join(' ・ ')}</p>` : ''}
            ${r.achieved ? '' : `<button class="unit-sim-btn" onclick="openPurchaseSim('${escapeHtml(s.code)}', ${r.shortage})">買った場合の影響を見る</button>`}
        </div>`;
    }).join('');

    renderUnitBudget(pending);
}

// 予算内で単元化できる組み合わせを提案する（必要額が少なく、優待が付く銘柄を優先）
function renderUnitBudget(pending) {
    const box = document.getElementById('unitBudgetResult');
    if (!box) return;
    const budget = parseFloat((document.getElementById('unitBudget') || {}).value);
    if (!budget || budget <= 0) { box.innerHTML = ''; return; }
    if (pending.length === 0) {
        box.innerHTML = '<p style="font-size: 13px; color: var(--text-sub);">単元未満の銘柄はありません。</p>';
        return;
    }

    // 優待が付く銘柄を先に、その中で必要金額が少ない順に詰めていく
    const ranked = [...pending].sort((a, b) => {
        const ab = a.benefit ? 0 : 1, bb = b.benefit ? 0 : 1;
        if (ab !== bb) return ab - bb;
        return a.cost - b.cost;
    });

    const picked = [];
    let rest = budget;
    for (const r of ranked) {
        if (r.cost > 0 && r.cost <= rest) { picked.push(r); rest -= r.cost; }
    }

    if (picked.length === 0) {
        const cheapest = [...pending].sort((a, b) => a.cost - b.cost)[0];
        box.innerHTML = `<p style="font-size: 13px; line-height: 1.8; color: var(--text-sub);">
            ${formatYen(budget)}では単元化できる銘柄がありませんでした。<br>
            一番少ない金額で届くのは<strong>${escapeHtml(cheapest.stock.name)}</strong>で、約${formatYen(cheapest.cost)}（あと${cheapest.shortage}株）です。</p>`;
        return;
    }

    const used = budget - rest;
    box.innerHTML = `
        <p style="font-size: 13px; line-height: 1.8; margin: 0 0 10px 0;">
            ${formatYen(budget)}なら<strong>${picked.length}銘柄</strong>を単元化できます（合計 約${formatYen(used)}・残り ${formatYen(rest)}）。
        </p>
        <ol class="next-actions">
            ${picked.map(r => `<li><strong>${escapeHtml(r.stock.name)}</strong>をあと${r.shortage}株（約${formatYen(r.cost)}）${r.benefit ? `<br><span style="color: var(--text-sub); font-size: 13px;">優待: ${escapeHtml(r.benefit.content || '対象になります')}</span>` : ''}</li>`).join('')}
        </ol>`;
}

// ===== 「もし買ったら」シミュレーター =====
// 買う前に、集中度・セクター分散・配当がどう変わるかを見られるようにする
function computePortfolioMetrics(portfolio) {
    const total = portfolio.reduce((s, v) => s + v.currentPrice * v.shares, 0);
    if (total <= 0) return { total: 0, topPct: 0, topName: '—', sectors: 0, topSectorPct: 0, topSector: '—', annualDividend: 0, yieldPct: 0, count: portfolio.length };

    const top = [...portfolio].sort((a, b) => (b.currentPrice * b.shares) - (a.currentPrice * a.shares))[0];
    const sectorMap = {};
    portfolio.forEach(s => {
        const sec = normalizeSector(s.sector || '不明');
        sectorMap[sec] = (sectorMap[sec] || 0) + s.currentPrice * s.shares;
    });
    const sectorTop = Object.entries(sectorMap).sort((a, b) => b[1] - a[1])[0];
    const annualDividend = portfolio.reduce((sum, s) => {
        const d = getDividendInfo(s.code);
        return sum + (d.perShare > 0 ? d.perShare * s.shares : 0);
    }, 0);

    return {
        total,
        topPct: (top.currentPrice * top.shares) / total * 100,
        topName: top.name,
        sectors: Object.keys(sectorMap).length,
        topSectorPct: sectorTop[1] / total * 100,
        topSector: sectorTop[0],
        annualDividend: Math.round(annualDividend),
        yieldPct: annualDividend / total * 100,
        count: portfolio.length
    };
}

let SIM_CODE = null;

function openPurchaseSim(code, shares) {
    SIM_CODE = code;
    const info = getMasterInfo(code);
    const held = getPortfolio().find(s => s.code === code);
    document.getElementById('simName').textContent = info ? `${info.name}（${code}）` : code;
    const input = document.getElementById('simShares');
    input.value = shares || TRADING_UNIT;
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('purchaseSimModal').style.display = 'block';
    document.getElementById('simHeldNote').textContent = held
        ? `現在 ${held.shares.toLocaleString()}株を保有中（現在値 ${formatPrice(held.currentPrice)}）`
        : 'まだ保有していない銘柄です';
    runPurchaseSim();
}

function closePurchaseSim() {
    SIM_CODE = null;
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('purchaseSimModal').style.display = 'none';
}

async function runPurchaseSim() {
    if (!SIM_CODE) return;
    const box = document.getElementById('simResult');
    const shares = parseInt(document.getElementById('simShares').value, 10);
    if (!shares || shares <= 0) { box.innerHTML = '<p style="color: var(--text-sub); font-size: 13px;">株数を入力してください。</p>'; return; }

    const portfolio = getPortfolio();
    const held = portfolio.find(s => s.code === SIM_CODE);
    let price = held ? held.currentPrice : 0;
    if (!price) {
        box.innerHTML = '<p style="color: var(--text-sub); font-size: 13px;">株価を取得しています...</p>';
        try {
            const q = await fetchQuote(SIM_CODE);
            price = q.price;
        } catch (e) {
            box.innerHTML = '<p style="color: var(--loss); font-size: 13px;">株価を取得できませんでした。時間をおいてお試しください。</p>';
            return;
        }
        await ensureDividendData([SIM_CODE]);
    }

    const info = getMasterInfo(SIM_CODE);
    const before = computePortfolioMetrics(portfolio);
    const after = computePortfolioMetrics([
        ...portfolio.filter(s => s.code !== SIM_CODE),
        {
            code: SIM_CODE,
            name: info ? info.name : SIM_CODE,
            sector: info ? info.sector : '不明',
            shares: (held ? held.shares : 0) + shares,
            currentPrice: price,
            acquisitionPrice: held ? held.acquisitionPrice : price
        }
    ]);

    const cost = Math.round(shares * price);
    const row = (label, b, a, fmt, betterWhenLower) => {
        const diff = a - b;
        const same = Math.abs(diff) < 0.05;
        const good = betterWhenLower ? diff < 0 : diff > 0;
        const color = same ? 'var(--text-sub)' : good ? 'var(--gain)' : 'var(--loss)';
        return `<div class="sim-row">
            <span class="sim-label">${label}</span>
            <span class="sim-values"><span class="sim-before">${fmt(b)}</span>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            <strong style="color: ${color};">${fmt(a)}</strong></span>
        </div>`;
    };

    const pct = v => v.toFixed(1) + '%';
    const yen = v => formatYen(v);
    const num = v => String(v);

    box.innerHTML = `
        <p class="sim-cost">必要な資金 <strong>約${formatYen(cost)}</strong>（${shares.toLocaleString()}株 × ${formatPrice(price)}）</p>
        ${row('最大銘柄の比率', before.topPct, after.topPct, pct, true)}
        ${row('保有銘柄数', before.count, after.count, num, false)}
        ${row('セクター数', before.sectors, after.sectors, num, false)}
        ${row(`最大セクター（${escapeHtml(after.topSector)}）`, before.topSectorPct, after.topSectorPct, pct, true)}
        ${row('年間配当', before.annualDividend, after.annualDividend, yen, false)}
        ${row('配当利回り', before.yieldPct, after.yieldPct, pct, false)}
        <p class="sim-note">${buildSimComment(before, after, shares)}</p>`;
}

function buildSimComment(before, after, shares) {
    const notes = [];
    if (after.topPct < before.topPct - 0.5) notes.push('特定銘柄への集中が下がり、分散が改善します。');
    if (after.topPct > before.topPct + 3) notes.push(`購入後は最大銘柄の比率が${after.topPct.toFixed(1)}%になります。30%を超えると1銘柄の値動きの影響が大きくなります。`);
    if (after.sectors > before.sectors) notes.push('新しい業種が加わり、景気変動に対する耐性が上がります。');
    if (after.annualDividend > before.annualDividend) notes.push(`年間配当が${formatYen(after.annualDividend - before.annualDividend)}増える見込みです。`);
    if (shares >= TRADING_UNIT) notes.push('100株以上になるため、議決権と（対象銘柄なら）株主優待の条件を満たします。');
    return notes.length ? notes.join(' ') : '大きな変化はありません。';
}

// ===== 推奨銘柄 =====
function generateDynamicRecommendations() {
    const portfolio = getPortfolio();

    if (portfolio.length === 0) return getDefaultRecommendations();

    const heldCodes = new Set(portfolio.map(s => s.code));
    const heldSectors = new Set(portfolio.map(s => normalizeSector(s.sector)));
    const recommendations = [];

    const targetSectors = ['食品', '医薬', '通信', 'インフラ', '小売', '金融', '運輸', '商社'];
    for (const sector of targetSectors) {
        if (recommendations.length >= 3) break;
        if (heldSectors.has(sector)) continue;
        const candidates = Object.entries(STOCK_MASTER_DATA)
            .filter(([code, d]) => normalizeSector(d.sector) === sector && !heldCodes.has(code) && !d.isETF)
            .sort((a, b) => b[1].dividend_yield - a[1].dividend_yield);
        if (candidates.length > 0) {
            const [code, data] = candidates[0];
            recommendations.push({
                code, name: data.name,
                reason: `保有していない「${sector}」セクターの中で配当利回りが高い銘柄です。ポートフォリオの分散に役立ちます。`,
                dividend: data.dividend, dividend_yield: data.dividend_yield
            });
        }
    }

    if (recommendations.length < 3) {
        const recCodes = new Set(recommendations.map(r => r.code));
        const highDividends = Object.entries(STOCK_MASTER_DATA)
            .filter(([code, d]) => !heldCodes.has(code) && !recCodes.has(code) && !d.isETF)
            .sort((a, b) => b[1].dividend_yield - a[1].dividend_yield)
            .slice(0, 3 - recommendations.length);
        for (const [code, data] of highDividends) {
            recommendations.push({
                code, name: data.name,
                reason: `高配当利回り（${data.dividend_yield}%）で、保有するだけで配当収入が期待できます。`,
                dividend: data.dividend, dividend_yield: data.dividend_yield
            });
        }
    }

    return recommendations.slice(0, 3);
}

function getDefaultRecommendations() {
    return [
        { code: '9433', name: 'KDDI', reason: '通信大手で業績が安定。配当と株主優待（カタログギフト）の両方が楽しめる、初心者の定番銘柄です。', dividend: 145, dividend_yield: 3.0 },
        { code: '8058', name: '三菱商事', reason: '累進配当（減配しない方針）を掲げる総合商社。長期保有で配当が増える楽しみがあります。', dividend: 100, dividend_yield: 3.5 },
        { code: '1489', name: 'NF・日経高配当株50 ETF', reason: '1本で高配当株50銘柄に分散投資できるETF。個別株を選ぶ自信がないうちはこれが手堅い選択です。', dividend: 90, dividend_yield: 3.4 }
    ];
}

function updateRecommendationsDisplay() {
    const recommendations = generateDynamicRecommendations();
    const grid = document.querySelector('.recommendations-grid');
    if (!grid) return;

    const banner = document.querySelector('.recommendation-banner p');
    const portfolio = getPortfolio();
    if (banner) {
        if (portfolio.length === 0) {
            banner.textContent = 'まずは「安定配当」や「株主優待」のある大型銘柄から始めるのがおすすめです。以下は初心者に人気の定番銘柄です。';
        } else {
            const sectors = [...new Set(portfolio.map(s => s.sector || '不明'))];
            banner.textContent = `現在のポートフォリオは ${sectors.join('・')} セクターで構成されています。ここに足りないセクターの安定銘柄を加えると、より堅牢になります。`;
        }
    }

    grid.innerHTML = recommendations.map(rec => {
        const benefit = BENEFIT_DATA[rec.code] || 'なし（配当重視）';
        return `
        <div class="recommendation-card">
            <div class="recommendation-header">
                <div class="stock-code-badge">${rec.code}</div>
                <div class="recommendation-rating">初心者向け</div>
            </div>
            <h4>${escapeHtml(rec.name)}</h4>
            <div class="recommendation-tag">配当利回り ${rec.dividend_yield}%</div>
            <p class="recommendation-reason">${escapeHtml(rec.reason)}</p>
            <div class="recommendation-details">
                <div class="detail-row"><span>配当利回り</span><span style="color: #1E7A4E;">${rec.dividend_yield}%</span></div>
                <div class="detail-row"><span>1株配当</span><span>¥${rec.dividend}/年</span></div>
                <div class="detail-row"><span>株主優待</span><span>${escapeHtml(benefit)}</span></div>
            </div>
            <div class="recommendation-action">
                <button class="btn btn-primary" style="width: 100%;" onclick="openStockDetail('${rec.code}')">詳しく見る</button>
            </div>
        </div>`;
    }).join('');
}

// ===== 配当シミュレーター =====
function simulateDividendIncome(years = 1) {
    const portfolio = getPortfolio();
    if (portfolio.length === 0) {
        return { annual: 0, monthly: 0, breakdown: {}, projection: [] };
    }

    let totalAnnualDividend = 0;
    const breakdown = {};
    const projection = [];

    portfolio.forEach(stock => {
        const info = getDividendInfo(stock.code, stock.currentPrice);
        const perShare = info.perShare || stock.dividend || 0;
        const annualDiv = stock.shares * perShare;
        totalAnnualDividend += annualDiv;

        breakdown[stock.code] = {
            name: stock.name,
            shares: stock.shares,
            annual: annualDiv,
            monthly: Math.floor(annualDiv / 12),
            perShare: perShare,
            yield: info.yield,
            source: info.source
        };
    });

    let projectedValue = totalAnnualDividend;
    let cumulative = 0;
    const dividendGrowthRate = 0.03; // 年3%の増配を仮定

    for (let i = 1; i <= years; i++) {
        cumulative += projectedValue;
        projection.push({ year: i, annual: Math.floor(projectedValue), cumulative: Math.floor(cumulative) });
        projectedValue *= (1 + dividendGrowthRate);
    }

    return {
        annual: totalAnnualDividend,
        monthly: Math.floor(totalAnnualDividend / 12),
        breakdown,
        projection
    };
}

function renderDividendPage() {
    const statsEl = document.getElementById('dividendStats');
    const breakdownBody = document.getElementById('dividendBreakdownBody');
    const projectionEl = document.getElementById('dividendProjection');
    if (!statsEl) return;

    const portfolio = getPortfolio();
    if (portfolio.length === 0) {
        statsEl.innerHTML = `<div style="grid-column: 1 / -1; padding: 24px; background-color: var(--card-bg); border-radius: 12px; border: 1px solid var(--border-color); text-align: center; color: var(--text-sub);">銘柄を追加すると配当シミュレーションが表示されます</div>`;
        if (breakdownBody) breakdownBody.innerHTML = '';
        if (projectionEl) projectionEl.innerHTML = '';
        return;
    }

    const sim = simulateDividendIncome(10);
    const totalCurrent = portfolio.reduce((sum, s) => sum + s.currentPrice * s.shares, 0);
    const avgYield = totalCurrent > 0 ? (sim.annual / totalCurrent * 100) : 0;

    statsEl.innerHTML = `
        <div class="stat-card"><div><p class="stat-label">年間配当見込み（税引前）</p><p class="stat-value" style="color: #1E7A4E;">${formatYen(sim.annual)}</p></div><div class="stat-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg></div></div>
        <div class="stat-card"><div><p class="stat-label">月あたり平均</p><p class="stat-value">${formatYen(sim.monthly)}</p></div><div class="stat-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div></div>
        <div class="stat-card"><div><p class="stat-label">ポートフォリオ利回り</p><p class="stat-value" style="color: #1E7A4E;">${avgYield.toFixed(2)} %</p></div><div class="stat-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg></div></div>
    `;

    if (breakdownBody) {
        breakdownBody.innerHTML = Object.values(sim.breakdown)
            .sort((a, b) => b.annual - a.annual)
            .map(b => {
                const tag = b.source === 'auto'
                    ? ' <span style="font-size: 10px; color: var(--text-sub); border: 1px solid var(--border-color); border-radius: 4px; padding: 1px 4px; vertical-align: middle;">自動取得</span>'
                    : b.source === 'none'
                        ? ' <span style="font-size: 10px; color: var(--text-sub);">データなし</span>'
                        : '';
                return `<tr>
                <td><strong>${escapeHtml(b.name)}</strong>${tag}</td>
                <td>${b.shares.toLocaleString()} 株</td>
                <td>¥${b.perShare}/株</td>
                <td style="color: #1E7A4E;">${b.yield.toFixed(2)}%</td>
                <td style="font-weight: bold; color: #1E7A4E;">${formatYen(b.annual)}</td>
            </tr>`;
            }).join('');
    }

    if (projectionEl) {
        const maxAnnual = Math.max(...sim.projection.map(p => p.annual));
        projectionEl.innerHTML = sim.projection.map(p => {
            const width = maxAnnual > 0 ? (p.annual / maxAnnual * 100) : 0;
            return `<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <span style="width: 48px; font-size: 13px; color: var(--text-sub); text-align: right;">${p.year}年目</span>
                <div style="flex: 1; background-color: #EEF1EF; height: 24px; border-radius: 6px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #1E7A4E, #63B995); height: 100%; width: ${width}%; display: flex; align-items: center; padding-left: 8px;">
                        <span style="font-size: 12px; color: white; font-weight: bold; white-space: nowrap;">${formatYen(p.annual)}</span>
                    </div>
                </div>
                <span style="width: 110px; font-size: 12px; color: var(--text-sub);">累計 ${formatYen(p.cumulative)}</span>
            </div>`;
        }).join('') + `<p style="font-size: 12px; color: var(--text-sub); margin-top: 12px;">※ 年3%の増配を仮定した概算（税引前）。配当は企業業績により増減します。</p>`;
    }
}

// ===== 銘柄詳細モーダル =====
function openStockDetail(code) {
    const data = STOCK_MASTER_DATA[code];
    if (!data) return;

    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('stockDetailModal').style.display = 'block';
    document.getElementById('modalStockName').textContent = data.name;
    document.getElementById('modalCode').textContent = code;
    document.getElementById('modalPrice').textContent = data.sector;
    document.getElementById('modalDividend').textContent = data.dividend_yield + '%';
    renderModalBenefit(code);
    document.getElementById('modalAdvice').innerHTML = `<p style="line-height: 1.6;">${escapeHtml(`${data.name}は${data.sector}セクターの銘柄です。購入前に証券会社のサイトで最新の株価・業績・配当情報を確認しましょう。`)}</p>`;

    // リアルタイム株価を取得して表示に反映
    fetchRealTimePrices([code]).then(prices => {
        const q = prices[code];
        if (q && document.getElementById('modalCode').textContent === code) {
            const yieldNow = q.price > 0 ? (data.dividend / q.price * 100).toFixed(2) : data.dividend_yield;
            document.getElementById('modalPrice').textContent = `${data.sector} / ${formatPrice(q.price)}`;
            document.getElementById('modalDividend').textContent = yieldNow + '%';
        }
    }).catch(() => {});
}

// 優待情報を銘柄詳細モーダルに構造化表示
function renderModalBenefit(code) {
    const el = document.getElementById('modalBenefit');
    if (!el) return;
    const b = getBenefitInfo(code);
    if (!b) {
        el.innerHTML = '<span style="color: var(--text-sub);">株主優待はありません（配当重視の銘柄です）</span>';
        return;
    }
    const metas = [];
    if (b.kind) metas.push(`<span class="benefit-tag">${escapeHtml(b.kind)}</span>`);
    if (b.minShares) metas.push(`必要株数の目安: ${b.minShares.toLocaleString()}株〜`);
    if (b.months && b.months.length) metas.push(`権利確定月: ${b.months.map(m => m + '月').join('・')}`);
    el.innerHTML = `
        <p style="margin: 0 0 ${metas.length ? '8px' : '0'} 0; font-weight: 700;">${escapeHtml(b.content)}</p>
        ${metas.length ? `<p style="margin: 0; font-size: 12.5px; color: var(--text-sub); display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">${metas.join('<span style="color:var(--border-color);">/</span>')}</p>` : ''}
    `;
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('stockDetailModal').style.display = 'none';
}

// ===== 手動追加モーダル（全銘柄検索・複数まとめて追加） =====
let MANUAL_SELECTED_CODE = null;
let PENDING_STOCKS = []; // { code, name, sector, shares, price }

function openManualAdd() {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('manualAddModal').style.display = 'block';
    MANUAL_SELECTED_CODE = null;
    PENDING_STOCKS = [];
    renderPendingList();
    const input = document.getElementById('stockSearchInput');
    if (input) { input.value = ''; input.focus(); }
    const results = document.getElementById('stockSearchResults');
    if (results) results.innerHTML = '';
    const label = document.getElementById('selectedStockLabel');
    if (label) label.style.display = 'none';
    const shares = document.getElementById('manualShares');
    const price = document.getElementById('manualPrice');
    if (shares) shares.value = '';
    if (price) price.value = '';

    // 全銘柄マスターを読み込み（初回のみ）、対応銘柄数を表示
    loadFullMaster().then(full => {
        const countEl = document.getElementById('searchCoverageNote');
        if (countEl) {
            countEl.textContent = full
                ? `全上場銘柄 ${Object.keys(full).length.toLocaleString()}件 に対応（データ: JPX公式リスト）`
                : `${Object.keys(STOCK_MASTER_DATA).length}銘柄に対応（全銘柄リストは取得できませんでした）`;
        }
    });
}

function closeManualAddModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('manualAddModal').style.display = 'none';
}

// 検索: コード前方一致 or 銘柄名部分一致（キュレーション銘柄を優先表示）
function searchStocks(query) {
    const q = query.trim();
    if (!q) return [];
    const qUpper = q.toUpperCase();
    const results = [];
    const seen = new Set();

    const matches = (code, name) =>
        code.startsWith(qUpper) || name.includes(q) || name.toUpperCase().includes(qUpper);

    // 1) キュレーション済み銘柄（配当データあり）
    for (const [code, d] of Object.entries(STOCK_MASTER_DATA)) {
        if (matches(code, d.name)) {
            results.push({ code, name: d.name, sector: d.sector, curated: true });
            seen.add(code);
            if (results.length >= 30) return results;
        }
    }
    // 2) 全銘柄マスター
    if (FULL_MASTER) {
        for (const [code, arr] of Object.entries(FULL_MASTER)) {
            if (seen.has(code)) continue;
            if (matches(code, arr[0])) {
                results.push({ code, name: arr[0], sector: arr[1], curated: false });
                if (results.length >= 30) break;
            }
        }
    }
    return results;
}

function renderStockSearch() {
    const input = document.getElementById('stockSearchInput');
    const container = document.getElementById('stockSearchResults');
    if (!input || !container) return;

    MANUAL_SELECTED_CODE = null;
    const label = document.getElementById('selectedStockLabel');
    if (label) label.style.display = 'none';

    const results = searchStocks(input.value);
    if (input.value.trim() === '') { container.innerHTML = ''; return; }

    if (results.length === 0) {
        container.innerHTML = '<p style="padding: 10px; color: var(--text-sub); font-size: 13px;">該当する銘柄が見つかりません</p>';
        return;
    }

    container.innerHTML = results.map(r => `
        <div class="stock-search-item" onclick="selectSearchStock('${escapeHtml(r.code)}')">
            <span class="stock-search-code">${escapeHtml(r.code)}</span>
            <span class="stock-search-name">${escapeHtml(r.name)}</span>
            <span class="stock-search-sector">${escapeHtml(r.sector)}${r.curated ? ' ・配当データあり' : ''}</span>
        </div>
    `).join('');
}

function selectSearchStock(code) {
    MANUAL_SELECTED_CODE = code;
    const info = getMasterInfo(code);
    const label = document.getElementById('selectedStockLabel');
    if (label && info) {
        label.innerHTML = `<strong>${escapeHtml(code)} ${escapeHtml(info.name)}</strong>（${escapeHtml(info.sector)}）を選択中`;
        label.style.display = 'block';
    }
    const container = document.getElementById('stockSearchResults');
    if (container) container.innerHTML = '';
    const input = document.getElementById('stockSearchInput');
    if (input && info) input.value = `${code} ${info.name}`;
    const shares = document.getElementById('manualShares');
    if (shares) shares.focus();
}

// 現在の入力欄の銘柄コード・株数・単価を検証して返す（未入力時は null）
async function readManualEntry(silent = false) {
    const rawQuery = (document.getElementById('stockSearchInput')?.value || '').trim().toUpperCase();
    const shares = parseInt(document.getElementById('manualShares').value, 10);
    const price = parseFloat(document.getElementById('manualPrice').value);

    let code = MANUAL_SELECTED_CODE;
    if (!code && /^\d[\dA-Z]{3}$/.test(rawQuery)) code = rawQuery;
    if (!code) { if (!silent) alert('検索結果から銘柄を選択してください'); return null; }
    if (!shares || shares <= 0) { if (!silent) alert('株数を入力してください'); return null; }
    if (!price || price <= 0) { if (!silent) alert('取得単価を入力してください'); return null; }
    if (PENDING_STOCKS.some(p => p.code === code)) {
        if (!silent) alert('その銘柄はすでにリストにあります');
        return null;
    }

    let info = getMasterInfo(code);
    let name = info ? info.name : null;
    let sector = info ? info.sector : '不明';
    if (!info) {
        // どのマスターにもない銘柄：Yahoo Financeから名称を取得（ローカルのみ動作）
        try {
            const quote = await fetchQuote(code);
            name = quote.name || `銘柄${code}`;
        } catch (e) {
            if (!silent && !confirm(`銘柄コード ${code} の情報を取得できませんでした。\nこのまま追加しますか？（名称は「銘柄${code}」になります）`)) return null;
            name = `銘柄${code}`;
        }
    }
    return { code, name, sector, shares, price };
}

// 入力欄をクリアして次の銘柄を入力できる状態に戻す
function resetManualEntry() {
    MANUAL_SELECTED_CODE = null;
    const input = document.getElementById('stockSearchInput');
    if (input) { input.value = ''; input.focus(); }
    document.getElementById('manualShares').value = '';
    document.getElementById('manualPrice').value = '';
    const label = document.getElementById('selectedStockLabel');
    if (label) label.style.display = 'none';
    const results = document.getElementById('stockSearchResults');
    if (results) results.innerHTML = '';
}

// 現在の入力をリストに追加（複数まとめて追加用）
async function stageManualStock() {
    const entry = await readManualEntry(false);
    if (!entry) return;
    PENDING_STOCKS.push(entry);
    renderPendingList();
    resetManualEntry();
}

function removePendingStock(code) {
    PENDING_STOCKS = PENDING_STOCKS.filter(p => p.code !== code);
    renderPendingList();
}

function renderPendingList() {
    const section = document.getElementById('pendingSection');
    const list = document.getElementById('pendingList');
    const count = document.getElementById('pendingCount');
    const submitLabel = document.getElementById('manualSubmitLabel');
    if (!section || !list) return;

    if (PENDING_STOCKS.length === 0) {
        section.style.display = 'none';
        if (submitLabel) submitLabel.textContent = '追加する';
        return;
    }
    section.style.display = 'block';
    if (count) count.textContent = `（${PENDING_STOCKS.length}件）`;
    if (submitLabel) submitLabel.textContent = `まとめて追加（${PENDING_STOCKS.length}件）`;
    list.innerHTML = PENDING_STOCKS.map(p => `
        <div class="pending-item">
            <div class="pending-info">
                <strong>${escapeHtml(p.code)} ${escapeHtml(p.name)}</strong>
                <span>${p.shares.toLocaleString()}株 / 取得単価 ¥${p.price.toLocaleString()}</span>
            </div>
            <button class="pending-remove" onclick="removePendingStock('${escapeHtml(p.code)}')" title="リストから外す"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        </div>
    `).join('');
}

async function submitManualAdd() {
    // 入力欄に未確定の銘柄があればリストに加える（1銘柄だけの追加もこれで成立）
    const current = await readManualEntry(true);
    if (current && !PENDING_STOCKS.some(p => p.code === current.code)) {
        PENDING_STOCKS.push(current);
    }
    if (PENDING_STOCKS.length === 0) {
        alert('追加する銘柄がありません。銘柄を選び、株数・取得単価を入力してください');
        return;
    }

    const toAdd = [...PENDING_STOCKS];
    for (const p of toAdd) {
        const info = getMasterInfo(p.code);
        addStockToPortfolio(p.code, p.shares, p.price, info ? null : p.name);
    }
    const n = toAdd.length;
    PENDING_STOCKS = [];
    closeManualAddModal();
    document.getElementById('manualShares').value = '';
    document.getElementById('manualPrice').value = '';
    switchPage('dashboard');
    refreshPrices(true);
    if (n > 1) alert(`${n}銘柄をポートフォリオに追加しました`);
}

// ===== ポートフォリオ操作 =====
function addStockToPortfolio(code, shares, price, nameOverride = null) {
    const master = STOCK_MASTER_DATA[code] || {};
    const info = getMasterInfo(code); // キュレーション → 全銘柄マスターの順で名称・セクター解決
    const portfolio = getPortfolio();

    const existing = portfolio.find(s => s.code === code);
    if (existing) {
        const totalCost = existing.acquisitionPrice * existing.shares + price * shares;
        existing.shares += shares;
        existing.acquisitionPrice = Math.round(totalCost / existing.shares);
    } else {
        portfolio.push({
            code,
            name: nameOverride || (info && info.name) || `銘柄${code}`,
            sector: (info && info.sector) || 'その他',
            shares,
            acquisitionPrice: price,
            currentPrice: price,
            dividend: master.dividend || 0,
            dividend_yield: master.dividend_yield || 0,
            addedDate: new Date().toISOString()
        });
    }

    setPortfolio(portfolio);
}

function removeStockFromPortfolio(code) {
    if (!confirm('この銘柄を削除してもよろしいですか？')) return;

    const portfolio = getPortfolio().filter(s => s.code !== code);
    setPortfolio(portfolio);

    updateDashboard();
    if (document.getElementById('portfolio').classList.contains('active')) {
        updatePortfolioPage(portfolio);
    }
}

// ===== AI相談チャット（Claude API連携） =====
const CLAUDE_KEY_STORAGE = 'claude_api_key';
let CHAT_HISTORY = []; // Claude API用の会話履歴（このセッション中のみ）

function getClaudeApiKey() {
    return localStorage.getItem(CLAUDE_KEY_STORAGE) || '';
}

function saveClaudeApiKey() {
    const input = document.getElementById('claudeApiKeyInput');
    const key = input.value.trim();
    if (!key) { alert('APIキーを入力してください'); return; }
    if (!key.startsWith('sk-ant-')) {
        if (!confirm('入力された値はAnthropicのAPIキー（sk-ant-で始まる）の形式ではないようです。このまま保存しますか？')) return;
    }
    localStorage.setItem(CLAUDE_KEY_STORAGE, key);
    input.value = '';
    updateChatSettingsUI();
}

function clearClaudeApiKey() {
    if (!confirm('保存されたAPIキーを削除しますか？（定型応答モードに戻ります）')) return;
    localStorage.removeItem(CLAUDE_KEY_STORAGE);
    CHAT_HISTORY = [];
    updateChatSettingsUI();
}

function updateChatSettingsUI() {
    const status = document.getElementById('claudeKeyStatus');
    const form = document.getElementById('claudeKeyForm');
    const clearBtn = document.getElementById('claudeKeyClearBtn');
    if (!status) return;
    const hasKey = !!getClaudeApiKey();
    status.innerHTML = hasKey
        ? '<strong>Claude AI モード</strong>（APIキー設定済み・このブラウザにのみ保存されています）'
        : '定型応答モード — Claude APIキーを設定すると、AIがポートフォリオを踏まえて回答します';
    if (form) form.style.display = hasKey ? 'none' : 'flex';
    if (clearBtn) clearBtn.style.display = hasKey ? 'inline-flex' : 'none';
}

function toggleChatSettings() {
    const panel = document.getElementById('chatSettingsPanel');
    if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// ポートフォリオの現状をAIに渡すコンテキストとして構築
function buildPortfolioContext() {
    const portfolio = getPortfolio();
    if (portfolio.length === 0) return '現在、ユーザーはまだ銘柄を登録していません。';

    const totalCurrent = portfolio.reduce((sum, s) => sum + s.currentPrice * s.shares, 0);
    const totalAcq = portfolio.reduce((sum, s) => sum + s.acquisitionPrice * s.shares, 0);
    const div = simulateDividendIncome(1);
    const portfolioYield = totalCurrent > 0 ? (div.annual / totalCurrent * 100) : 0;

    const lines = portfolio.map(s => {
        const val = s.currentPrice * s.shares;
        const pct = (val / totalCurrent * 100).toFixed(1);
        const dinfo = getDividendInfo(s.code, s.currentPrice);
        const divStr = dinfo.perShare > 0 ? ` 配当¥${dinfo.perShare}/株(利回り${dinfo.yield.toFixed(1)}%)` : ' 無配';
        return `- ${s.name}(${s.code}) ${normalizeSector(s.sector)}: ${s.shares}株 取得単価¥${s.acquisitionPrice} 現在値¥${s.currentPrice} 構成比${pct}%${divStr}`;
    });

    // セクター内訳
    const sectors = {};
    portfolio.forEach(s => {
        const sec = normalizeSector(s.sector);
        sectors[sec] = (sectors[sec] || 0) + s.currentPrice * s.shares;
    });
    const sectorBreakdown = Object.entries(sectors)
        .sort((a, b) => b[1] - a[1])
        .map(([sec, val]) => `${sec} ${(val / totalCurrent * 100).toFixed(0)}%`)
        .join(' / ');

    return `ユーザーの現在のポートフォリオ:
${lines.join('\n')}
評価額合計: ¥${Math.round(totalCurrent).toLocaleString()} / 取得総額: ¥${Math.round(totalAcq).toLocaleString()} / 評価損益: ${totalCurrent >= totalAcq ? '+' : ''}¥${Math.round(totalCurrent - totalAcq).toLocaleString()}
セクター内訳: ${sectorBreakdown}
年間配当見込み(税引前・概算): ¥${Math.round(div.annual).toLocaleString()} / ポートフォリオ利回り: ${portfolioYield.toFixed(2)}%
（配当は直近実績ベースの概算。将来を保証するものではない）`;
}

async function callClaudeAPI(userMessage) {
    const apiKey = getClaudeApiKey();

    CHAT_HISTORY.push({ role: 'user', content: userMessage });
    // 履歴は直近12往復分のみ送信
    if (CHAT_HISTORY.length > 24) CHAT_HISTORY = CHAT_HISTORY.slice(-24);

    const systemPrompt = `あなたは「カブスコープ」という日本株ポートフォリオ管理アプリのAIアドバイザーです。投資初心者向けに、日本株・配当・株主優待・NISA・分散投資について、親しみやすく分かりやすい日本語で回答してください。

ルール:
- 回答は簡潔に（長くても300字程度）。専門用語には短い補足を付ける。過度な絵文字や煽り表現は使わず、落ち着いた実務的なトーンで話す。
- 特定銘柄の売買を断定的に推奨しない。「〜という考え方があります」「最終判断はご自身で」というスタンスを保つ。
- 税制や制度の話は「詳細は証券会社や税理士にご確認ください」と添える。
- ユーザーのポートフォリオ情報（保有銘柄・セクター内訳・配当利回り）が下記にあるので、質問に関係する場合は具体的な数値に触れて答える。集中度やセクターの偏り、利回りの水準など、データから読み取れる点を優先して指摘する。
- 配当データは直近実績ベースの概算である点を踏まえ、将来の配当を断定しない。

${buildPortfolioContext()}`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
            model: 'claude-opus-4-8',
            max_tokens: 1024,
            system: systemPrompt,
            messages: CHAT_HISTORY
        })
    });

    if (!res.ok) {
        CHAT_HISTORY.pop(); // 失敗したユーザーメッセージを履歴から除去
        if (res.status === 401) throw new Error('APIキーが無効です。設定を確認してください。');
        if (res.status === 429) throw new Error('リクエストが多すぎます。少し待ってからお試しください。');
        if (res.status === 400) {
            const body = await res.json().catch(() => null);
            throw new Error('リクエストエラー: ' + (body && body.error && body.error.message ? body.error.message : res.status));
        }
        throw new Error('APIエラー (' + res.status + ')。しばらくしてからお試しください。');
    }

    const data = await res.json();

    if (data.stop_reason === 'refusal') {
        CHAT_HISTORY.pop();
        return 'その質問にはお答えできませんでした。別の聞き方でお試しください。';
    }

    const text = (data.content || [])
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('\n');

    CHAT_HISTORY.push({ role: 'assistant', content: text });
    return text || '（応答が空でした）';
}

function appendChatMessage(role, html) {
    const chatHistoryEl = document.querySelector('.chat-history');
    const msg = document.createElement('div');
    msg.className = 'chat-message ' + (role === 'user' ? 'user-message' : 'ai-message');
    const aiAvatar = '<div class="message-avatar avatar-ai"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 14 15 20 8"/><polyline points="15 8 20 8 20 13"/></svg></div>';
    const userAvatar = '<div class="message-avatar avatar-user"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>';
    msg.innerHTML = `${role === 'user' ? userAvatar : aiAvatar}<div class="message-content">${html}</div>`;
    chatHistoryEl.appendChild(msg);
    chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
    return msg;
}

function sendQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendChat();
}

let CHAT_SENDING = false;

async function sendChat() {
    if (CHAT_SENDING) return;
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;

    appendChatMessage('user', `<p>${escapeHtml(message)}</p>`);
    input.value = '';

    if (!getClaudeApiKey()) {
        // 定型応答モード
        setTimeout(() => {
            appendChatMessage('ai', `<p>${getAIResponse(message)}</p>`);
        }, 600);
        return;
    }

    // Claude APIモード
    CHAT_SENDING = true;
    const thinkingMsg = appendChatMessage('ai', '<p style="color: var(--text-sub);">考え中<span class="thinking-dots">...</span></p>');

    try {
        const reply = await callClaudeAPI(message);
        thinkingMsg.querySelector('.message-content').innerHTML = `<p>${escapeHtml(reply).replace(/\n/g, '<br>')}</p>`;
    } catch (e) {
        thinkingMsg.querySelector('.message-content').innerHTML = `<p style="color: var(--loss);">${escapeHtml(e.message)}</p><p style="color: var(--text-sub); font-size: 13px; margin-top: 8px;">${getAIResponse(message)}</p>`;
    } finally {
        CHAT_SENDING = false;
        const el = document.querySelector('.chat-history');
        if (el) el.scrollTop = el.scrollHeight;
    }
}

function getAIResponse(question) {
    const portfolio = getPortfolio();

    if (question.includes('診断') || question.includes('ポートフォリオ') || question.includes('私の')) {
        if (portfolio.length === 0) {
            return 'まだ銘柄が登録されていません。ダッシュボードの「スクショで追加」か「手動で追加」から保有銘柄を登録すると、あなた専用の診断ができます！';
        }
        const div = simulateDividendIncome(1);
        return `現在${portfolio.length}銘柄を保有中ですね。年間配当見込みは約${formatYen(div.annual)}です。詳しい分析は「AI診断」ページ、配当の内訳は「配当予測」ページをご覧ください！`;
    }

    if (question.includes('配当')) {
        if (portfolio.length > 0) {
            const div = simulateDividendIncome(1);
            return `配当金は企業が利益の一部を株主に還元するお金です。あなたのポートフォリオの年間配当見込みは約${formatYen(div.annual)}（月あたり約${formatYen(div.monthly)}）。「配当予測」ページで銘柄別の内訳と10年シミュレーションが見られます！`;
        }
        return '配当金は企業の利益を株主に還元するお金です。年1〜2回もらえることが多く、高配当株なら年3〜5%程度の利回りが期待できます。銘柄を登録すると、あなたの配当見込みも計算できますよ！';
    }
    if (question.includes('優待')) {
        return '株主優待は企業から株主へのプレゼント。食事券、割引券、カタログギフトなど多種多様です。配当金とは別にもらえるのでダブルで嬉しい。初心者は「自分が実際に使う優待」がある企業を選ぶのがコツです。';
    }
    if (question.includes('NISA')) {
        return '新NISAなら年間360万円（成長投資枠240万円＋つみたて枠120万円）まで非課税投資できます。配当金も売却益も税金ゼロ。個別株の配当をしっかり受け取りたいなら、NISA成長投資枠で高配当銘柄を保有するのが定番戦略です。';
    }
    if (question.includes('初心者') || question.includes('いくら')) {
        return '初心者は「配当が安定している」「株主優待がある」「企業規模が大きい」の3つが揃った銘柄から始めるのがおすすめ。金額は無理のない範囲で、まずは10〜30万円程度で1〜2銘柄からスタートし、慣れてきたら分散を増やしましょう。';
    }
    if (question.includes('インデックス') || question.includes('ETF')) {
        return 'インデックス投資は手間いらずで分散も効きます。当アプリはETF（1321日経225連動、1306TOPIX連動、1489高配当50など）にも対応しているので、個別株とETFを組み合わせたポートフォリオ管理ができますよ。';
    }
    if (question.includes('リスク') || question.includes('損')) {
        return '株式投資のリスクを抑える基本は「分散」です。①銘柄の分散（5銘柄以上）②セクターの分散（違う業種を組み合わせる）③時間の分散（一度に買わず数回に分ける）。AI診断ページであなたの分散状況をチェックできます！';
    }
    if (question.includes('株価') || question.includes('推移')) {
        return 'ダッシュボードの「株価を更新」ボタンでリアルタイム株価（Yahoo Finance）を取得できます。「資産推移」ページでは日ごとの評価額の変化をグラフで確認できます。';
    }
    if (question.includes('おすすめ') || question.includes('推奨') || question.includes('銘柄')) {
        return '「推奨銘柄」ページで、あなたのポートフォリオに足りないセクターを補える銘柄を提案しています。ぜひチェックしてみてください！';
    }

    return `「${escapeHtml(question)}」についてですね。配当・優待・NISA・リスク分散・株価などのキーワードで質問いただくと詳しくお答えできます。「買い方ガイド」ページも参考にしてください！`;
}

// ===== ガイドタブ =====
function switchGuideTab(tabIndex) {
    document.querySelectorAll('.guide-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.guide-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('guide-tab-' + tabIndex).classList.add('active');
    document.querySelectorAll('.guide-tab')[tabIndex].classList.add('active');
}

// ===== スクショOCR =====
function openScreenshotUpload() {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('screenshotModal').style.display = 'block';
}

function closeScreenshotModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('screenshotModal').style.display = 'none';
    document.getElementById('screenshotInput').value = '';
    document.getElementById('previewImg').style.display = 'none';
    document.getElementById('ocrStatus').style.display = 'none';
    document.getElementById('extractedStocks').innerHTML = '';
    const thumbs = document.getElementById('previewThumbs');
    if (thumbs) thumbs.innerHTML = '';
    OCR_RESULTS = [];
}

let OCR_RESULTS = [];

// 画像を拡大・グレースケール化してOCR精度を上げる（スマホのスクショは文字が小さく誤認識しやすい）
function preprocessImageForOCR(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('画像の読み込みに失敗しました'));
        reader.onload = e => {
            const img = new Image();
            img.onerror = () => reject(new Error('画像を解釈できませんでした'));
            img.onload = () => {
                // 長辺2000px程度まで拡大（小さすぎる文字を補う。大きい画像はそのまま）
                const scale = Math.min(3, Math.max(1, 2000 / Math.max(img.width, img.height)));
                const canvas = document.createElement('canvas');
                canvas.width = Math.round(img.width * scale);
                canvas.height = Math.round(img.height * scale);
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // グレースケール＋コントラスト強調。
                // ダークモードのスクショ（黒背景・白文字）はOCRがほぼ読めないため白黒反転する
                try {
                    const d = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const px = d.data;
                    let sum = 0;
                    for (let i = 0; i < px.length; i += 4) {
                        const g = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
                        px[i] = g;
                        sum += g;
                    }
                    const mean = sum / (px.length / 4);
                    const invert = mean < 115; // 全体が暗い＝ダークモード
                    for (let i = 0; i < px.length; i += 4) {
                        let v = invert ? 255 - px[i] : px[i];
                        v = Math.max(0, Math.min(255, (v - 128) * 1.35 + 128));
                        px[i] = px[i + 1] = px[i + 2] = v;
                    }
                    ctx.putImageData(d, 0, 0);
                } catch (err) {
                    // getImageDataが使えない環境ではそのまま使う
                }
                resolve(canvas);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// 画像をAPI送信用にリサイズしてbase64化（長辺1568pxが上限の目安）
function fileToVisionPart(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('画像の読み込みに失敗しました'));
        reader.onload = e => {
            const img = new Image();
            img.onerror = () => reject(new Error('画像を解釈できませんでした'));
            img.onload = () => {
                const scale = Math.min(1, 1568 / Math.max(img.width, img.height));
                const canvas = document.createElement('canvas');
                canvas.width = Math.round(img.width * scale);
                canvas.height = Math.round(img.height * scale);
                canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                resolve({
                    type: 'image',
                    source: { type: 'base64', media_type: 'image/jpeg', data: dataUrl.split(',')[1] }
                });
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// APIキーがある場合はClaudeの画像認識で読み取る（日本語の証券アプリ画面はこちらが高精度）
async function extractStocksWithClaude(files, statusEl) {
    const apiKey = getClaudeApiKey();
    if (!apiKey) return null;

    statusEl.textContent = '画像を準備中...';
    const parts = [];
    for (const f of files.slice(0, 8)) parts.push(await fileToVisionPart(f));

    statusEl.textContent = `画像を解析中...（${parts.length}枚）`;
    const instruction = `これは日本の証券会社アプリのスクリーンショットです。写っている保有銘柄の情報を抽出してください。

出力は次の形式のJSONのみ。説明文やコードブロックは不要です。
{"stocks":[{"code":"9501","name":"東京電力ホールディングス","shares":200,"price":456}]}

ルール:
- code: 4桁の証券コード（例 9501）。画面に無ければ null。
- name: 画面に表示されている銘柄名。
- shares: 保有数量（株数）。画面に書かれていなければ null。推測は禁止。
- price: 取得単価（平均取得価額）。画面に書かれていなければ null。推測は禁止。
- 「現在値」「株価」「評価額」「前日比」「執行中」は取得単価ではありません。取得単価として使わないこと。
- 取得単価が無く「取得金額（総額）」がある場合は price を null にし、totalCost にその金額を入れてください。
- 表形式で1銘柄が2行に分かれている画面（1行目に銘柄名・保有数量・平均取得価額、2行目に銘柄コード・執行中・現在値）では、price には「平均取得価額」の列の値を入れ、「現在値」や「執行中」の0は使わないこと。
- 銘柄名が「日本Ｍ＆Ａセ…」のように省略されていても、銘柄コードから正式名称を判断してください。
- 保有数量が1株や7株のような少ない株数でもそのまま出力してください（100株単位に丸めない）。
- お気に入りや株価一覧など保有情報が無い画面では、code と name だけ埋めて shares と price は null にしてください。
- 画面に写っている銘柄すべてを、上から順に出力してください。`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
            model: 'claude-opus-4-8',
            max_tokens: 4096,
            messages: [{ role: 'user', content: [...parts, { type: 'text', text: instruction }] }]
        })
    });
    if (!res.ok) throw new Error(`画像解析APIエラー (${res.status})`);

    const data = await res.json();
    const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n');
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) throw new Error('解析結果を読み取れませんでした');
    const parsed = JSON.parse(m[0]);
    if (!parsed.stocks || !Array.isArray(parsed.stocks)) throw new Error('解析結果の形式が想定と異なります');

    const out = [];
    for (const s of parsed.stocks) {
        // コードが無い/マスターに無い場合は銘柄名から特定する
        let code = s.code ? String(s.code).trim().toUpperCase() : null;
        if (!code || !getMasterInfo(code)) code = s.name ? findCodeByName(String(s.name)) : null;
        const info = code ? getMasterInfo(code) : null;
        if (!info) continue;

        let shares = Number(s.shares) > 0 ? Math.round(Number(s.shares)) : 0;
        let price = Number(s.price) > 0 ? Number(s.price) : 0;
        if (!price && shares && Number(s.totalCost) > 0) price = Math.round(Number(s.totalCost) / shares);

        const div = getDividendInfo(code); // 利回りは市場価格基準
        out.push({
            code, name: info.name, sector: info.sector, shares, price,
            confidence: (shares && price) ? 'high' : (shares || price) ? 'middle' : 'low',
            dividend: div.perShare, dividend_yield: div.yield
        });
    }
    return out;
}

async function performOCR() {
    const input = document.getElementById('screenshotInput');
    const files = input && input.files ? Array.from(input.files) : [];
    if (files.length === 0) {
        alert('スクショを選択してください（複数選択できます）');
        return;
    }
    const useVision = !!getClaudeApiKey();
    if (!useVision && typeof Tesseract === 'undefined') {
        alert('OCRライブラリの読み込み中です。少し待ってからもう一度お試しください。');
        return;
    }

    document.getElementById('ocrStatus').style.display = 'block';
    document.getElementById('analyzeBtn').disabled = true;
    document.getElementById('extractedStocks').innerHTML = '';
    const statusEl = document.getElementById('statusText');

    // 全銘柄マスターと配当データを先に読み込む（東京電力など厳選200銘柄以外も認識するため）
    statusEl.textContent = '銘柄マスターを準備中...';
    await Promise.all([loadFullMaster(), loadDividends()]);

    const merged = new Map(); // code -> stock（複数画像・複数行の結果を統合）
    let failures = 0;
    let visionNote = null;

    // 画像認識（APIキー設定時）を優先。失敗したら端末内OCRにフォールバック
    if (useVision) {
        try {
            const visionStocks = await extractStocksWithClaude(files, statusEl);
            if (visionStocks && visionStocks.length > 0) {
                visionStocks.forEach(s => mergeOCRStock(merged, s, 0));
                document.getElementById('ocrStatus').style.display = 'none';
                document.getElementById('analyzeBtn').disabled = false;
                OCR_RESULTS = Array.from(merged.values());
                displayOCRResults(OCR_RESULTS, {
                    total: files.length,
                    failures: 0,
                    vision: true,
                    note: files.length > 8 ? `一度に読み取れるのは8枚までです。${files.length}枚のうち最初の8枚を読み取りました` : null
                });
                return;
            }
            visionNote = '画像認識では銘柄が見つからなかったため、端末内のOCRでも読み取りました';
        } catch (e) {
            console.error('Vision error:', e);
            visionNote = `画像認識に失敗したため端末内OCRで読み取りました（${e.message}）`;
        }
        if (typeof Tesseract === 'undefined') {
            document.getElementById('ocrStatus').style.display = 'none';
            document.getElementById('analyzeBtn').disabled = false;
            displayOCRResults([], { total: files.length, failures: files.length, note: visionNote });
            return;
        }
    }

    for (let i = 0; i < files.length; i++) {
        const label = files.length > 1 ? `${i + 1}枚目 / ${files.length}枚：` : '';
        try {
            statusEl.textContent = `${label}画像を処理中...`;
            const source = await preprocessImageForOCR(files[i]).catch(() => files[i]);
            const { data } = await Tesseract.recognize(source, 'jpn+eng', {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        statusEl.textContent = `${label}読み取り中... ${(m.progress * 100).toFixed(0)}%`;
                    }
                }
            }, { blocks: true, text: true });
            // 単語座標から行を組み直したものを優先（表形式で列が分断されるのを防ぐ）
            const text = wordsToLines(collectOcrWords(data)) || data.text;
            for (const s of parseStockInfoFromText(text)) {
                mergeOCRStock(merged, s, i + 1);
            }
        } catch (error) {
            console.error('OCR Error:', error);
            failures++;
        }
    }

    document.getElementById('ocrStatus').style.display = 'none';
    document.getElementById('analyzeBtn').disabled = false;

    OCR_RESULTS = Array.from(merged.values());
    displayOCRResults(OCR_RESULTS, { total: files.length, failures, note: visionNote });
}

// 同じ銘柄が複数画像・複数行で見つかった場合、情報量の多い方を残す
function mergeOCRStock(map, stock, imageIndex) {
    stock.image = imageIndex;
    const prev = map.get(stock.code);
    if (!prev) { map.set(stock.code, stock); return; }
    if (!prev.shares && stock.shares) prev.shares = stock.shares;
    if (!prev.price && stock.price) prev.price = stock.price;
    prev.confidence = (prev.shares && prev.price) ? 'high' : (prev.shares || prev.price) ? 'middle' : 'low';
}

// OCRのゆらぎを吸収（全角→半角、桁区切りスペースなど）
function normalizeOcrText(text) {
    return text
        .replace(/[０-９]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
        .replace(/[Ａ-Ｚａ-ｚ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
        .replace(/[，、]/g, ',')
        .replace(/[．]/g, '.')
        .replace(/[￥]/g, '¥');
    // 桁区切りの空白補正はしない：改行や「2127 100株」のような並びを壊し、
    // 銘柄コードと金額が連結してしまうため（コードの取りこぼしの原因になる）
}

// 銘柄名 → コードの逆引き索引（コードが読めなくても名前で特定できるようにする）
let NAME_INDEX = null;
function buildNameIndex() {
    if (NAME_INDEX) return NAME_INDEX;
    // マスターの銘柄名は全角英数（ＫＯＺＯ等）を含むため半角に揃えてから比較する。
    // 長音符とハイフンはOCRが混同しやすいので同じ記号に寄せる（「センター」「センタ-」を同一視）
    const base = s => s
        .replace(/[０-９Ａ-Ｚａ-ｚ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
        .replace(/＆/g, '&')
        .replace(/株式会社/g, '')
        // 一覧画面の省略記号（日本Ｍ＆Ａセ… など）も取り除く
        .replace(/[\s・･,，.。()（）「」…‥⋯]/g, '')
        .toUpperCase();
    const dashes = s => s.replace(/[ー－―‐]/g, '-');
    // 「ホールディングス」等の表記ゆれを畳んだ形（照合用）
    const norm = s => dashes(base(s).replace(/ホールディングス|ホールディング|グループ本社|グループ/g, 'HD'));
    // 畳まないそのままの形（切り詰められた名前の前方一致用）
    const normRaw = s => dashes(base(s));

    NAME_INDEX = [];
    const add = (code, name) => {
        const n = norm(name);
        if (n.length >= 3) NAME_INDEX.push([n, normRaw(name), code]);
    };
    // 厳選マスターは通称（「ホンダ」「JT」）のことがあるため、
    // 全銘柄マスターの正式名称（「本田技研工業」「日本たばこ産業」）も別名として登録する
    for (const [code, d] of Object.entries(STOCK_MASTER_DATA)) add(code, d.name);
    if (FULL_MASTER) {
        for (const [code, arr] of Object.entries(FULL_MASTER)) add(code, arr[0]);
    }
    // 長い名前を優先（「三菱UFJ」より「三菱UFJフィナンシャルHD」を先に当てる）
    NAME_INDEX.sort((a, b) => b[0].length - a[0].length);
    NAME_INDEX.normalize = norm;
    NAME_INDEX.normalizeRaw = normRaw;
    return NAME_INDEX;
}

function findCodeByName(line) {
    const idx = buildNameIndex();
    const target = idx.normalize(line);
    if (target.length >= 3) {
        for (const [name, , code] of idx) {
            if (target.includes(name)) return code;
        }
    }
    // 一覧画面では銘柄名が「日本Ｍ＆Ａセ…」のように途中で切れ、右に数量や株価が続く。
    // 先頭の数字より前だけを取り出して前方一致で照合する
    const head = idx.normalizeRaw(String(line).split(/\d/)[0]);
    if (head.length >= 4) {
        for (const [, rawName, code] of idx) {
            if (rawName.startsWith(head)) return code;
        }
    }
    return null;
}

// 数値の取り出し（ラベル付きを優先。ラベルは行をまたぐことがあるので窓テキストで探す）
function pickNumber(windowText, patterns) {
    for (const re of patterns) {
        const m = windowText.match(re);
        if (m) {
            const v = parseFloat(m[1].replace(/,/g, ''));
            if (!isNaN(v) && v > 0) return v;
        }
    }
    return 0;
}

// Tesseractのバージョンによって単語データの位置が違うため、どの形でも取り出せるようにする
function collectOcrWords(data) {
    if (!data) return [];
    if (Array.isArray(data.words) && data.words.length) return data.words;
    const out = [];
    const walk = node => {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node.words)) out.push(...node.words);
        for (const key of ['blocks', 'paragraphs', 'lines']) {
            if (Array.isArray(node[key])) node[key].forEach(walk);
        }
    };
    walk(data);
    return out;
}

// OCRの単語座標から行を組み直す。
// 縦長のスクショで列の間隔が広いと、Tesseractは列ごとに別ブロックとして出力してしまい
// 「銘柄名」と「数量・取得単価」が別の行に分かれてしまうため、Y座標で行をまとめ直す
function wordsToLines(words) {
    const items = [];
    for (const w of words || []) {
        const t = (w.text || '').trim();
        if (!t || !w.bbox) continue;
        items.push({
            text: t,
            x: w.bbox.x0,
            yc: (w.bbox.y0 + w.bbox.y1) / 2,
            h: Math.max(1, w.bbox.y1 - w.bbox.y0)
        });
    }
    if (items.length === 0) return null;

    const heights = items.map(i => i.h).sort((a, b) => a - b);
    const medianH = heights[Math.floor(heights.length / 2)];
    const tol = Math.max(6, medianH * 0.6); // 同じ行と見なす縦のズレ

    items.sort((a, b) => a.yc - b.yc);
    const rows = [];
    for (const it of items) {
        const row = rows[rows.length - 1];
        if (row && Math.abs(it.yc - row.yc) <= tol) {
            row.items.push(it);
            row.yc = row.items.reduce((s, v) => s + v.yc, 0) / row.items.length;
        } else {
            rows.push({ yc: it.yc, items: [it] });
        }
    }
    return rows.map(r => r.items.sort((a, b) => a.x - b.x).map(i => i.text).join(' ')).join('\n');
}

// OCRは「保有 数 量」「平均 取得 価額」のように単語内へ空白を入れてくる。
// 項目名を照合できるよう空白を詰めるが、「1 636.00」のような数字と数字の間は残す
function squeezeLabelSpaces(text) {
    return text.replace(/(\D)[ \t]+/g, '$1').replace(/[ \t]+(\D)/g, '$1');
}

// 数値トークンの解釈。OCRはカンマとピリオドを混同するため（「1,371.57」→「1.371.57」）、
// 末尾の1〜2桁だけを小数部と見なし、それ以外の区切りは桁区切りとして扱う
function parseNumericToken(raw) {
    const parts = raw.split(/[.,]/);
    if (parts.length === 1) return { value: parseInt(raw, 10), hasDecimal: false };
    const last = parts[parts.length - 1];
    const head = parts.slice(0, -1).join('');
    if (head.length > 0 && last.length >= 1 && last.length <= 2) {
        return { value: parseFloat(head + '.' + last), hasDecimal: true };
    }
    return { value: parseInt(parts.join(''), 10), hasDecimal: false };
}

// 行に含まれる数値トークンを取り出す。
// 符号付き（前日比・評価損益の「+96」「-1,142」）と率（%）は保有情報ではないので区別する
function numberTokens(line) {
    const out = [];
    const re = /([+\-−▲△])?\s*(\d[\d.,]*\d|\d)\s*([%％])?/g;
    let m;
    while ((m = re.exec(line)) !== null) {
        const raw = m[2];
        const parsed = parseNumericToken(raw);
        if (isNaN(parsed.value)) continue;
        out.push({
            raw,
            value: parsed.value,
            hasDecimal: parsed.hasDecimal,
            signed: !!m[1],
            percent: !!m[3]
        });
    }
    return out;
}

// 保有情報として使える数値だけ（符号付き・率・銘柄コード自身を除く）
function holdingTokens(line, code) {
    return numberTokens(line).filter(n => !n.signed && !n.percent && n.raw !== code);
}

function parseStockInfoFromText(rawText) {
    const text = normalizeOcrText(rawText);
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const stocks = [];
    const processedCodes = new Set();

    // 「保有数量」「平均取得価額」が列見出しになっている表形式の画面か
    // （行ごとに単位が付かず数字だけ並ぶため、位置で読む必要がある）。
    // 見出しは小さいグレー文字でOCRに失敗しやすいので、明細行の並びからも判定する
    const headerHint = /保有数量|平均取得価額|平均取得単価|取得単価|保有株数|取得価額/.test(squeezeLabelSpaces(text));
    const rowLike = lines.filter((l, i) => {
        if (/[円%％]/.test(l)) return false;
        const toks = holdingTokens(l, null);
        if (toks.length < 2) return false;
        if (isRowStartLine(l)) return true;
        // 銘柄名と数値がOCRで別々の行になることがある。
        // 直前が数字を含まない行（＝銘柄名の行）なら、この数値だけの行も明細とみなす
        return i > 0 && !/\d/.test(lines[i - 1]) && toks.some(t => t.hasDecimal);
    }).length;
    const tableMode = headerHint || rowLike >= 2;

    const pushStock = (code, windowText) => {
        if (!code || processedCodes.has(code)) return;
        const info = getMasterInfo(code); // 厳選マスター → 全銘柄マスター（4,400銘柄超）
        if (!info) return;
        processedCodes.add(code);

        // 項目名の照合はOCRが入れた空白を詰めたテキストで行う
        const labelText = squeezeLabelSpaces(windowText);

        // 株数：「保有数量 100」「100株」などラベル付きを優先
        let shares = pickNumber(labelText, [
            /(?:保有)?(?:数量|株数|口数|保有株数)[^\d\n]{0,8}([\d,]+)/,
            /([\d,]{1,9})\s*(?:株|口)(?![式数])/
        ]);
        // 取得単価：「取得単価」「平均取得価額」を優先。現在値・評価額は取得単価ではないので使わない
        let price = pickNumber(labelText, [
            /(?:平均)?取得(?:単価|価額|価格)[^\d\n]{0,10}¥?\s*([\d,]+(?:\.\d+)?)/,
            /(?:平均)?(?:買付|買付け)?(?:単価|コスト)[^\d\n]{0,8}¥?\s*([\d,]+(?:\.\d+)?)/
        ]);
        // 取得単価がなく「取得金額（総額）」がある場合は割り戻す
        if (!price && shares) {
            const total = pickNumber(labelText, [/取得(?:金額|額|総額)[^\d\n]{0,10}¥?\s*([\d,]+)/]);
            if (total) price = Math.round(total / shares);
        }

        // ラベルが行に付かない表形式（例：「日本Ｍ＆Ａセ… 1 636.00」）は位置で読む。
        // 平均取得価額は小数付き（636.00）で表示されるため、それを手がかりに数量と単価を決める
        if (tableMode && (!shares || !price)) {
            for (const l of windowText.split('\n')) {
                if (/[円%％]/.test(l)) continue; // 「+96円」「(+1.68%)」など単位付きの行は対象外
                const nums = holdingTokens(l, code);
                if (nums.length < 2) continue;
                let dec = nums.find(n => n.hasDecimal);
                let qty = dec ? nums.find(n => !n.hasDecimal && n.value > 0 && n !== dec) : null;

                // 取得単価を小数で表示しない証券会社向け：
                // 銘柄名で始まる行に数値が2つだけなら「数量・取得単価」の並びとして扱う
                if (!dec && isRowStartLine(l) && nums.length === 2 && nums[0].value > 0) {
                    qty = nums[0];
                    dec = nums[1];
                }

                // 数量と単価が揃っている行だけを採用する。
                // 「9432 0 151.3」のようなコード行を拾って現在値を取得単価と誤認しないため
                if (!dec || !qty) continue;
                if (!shares) shares = qty.value;
                if (!price) price = dec.value;
                break;
            }
        }

        // 明らかにあり得ない値は読み取り失敗として扱い、入力を促す
        if (!(shares > 0 && shares <= 10000000)) shares = 0;
        if (!(price >= 1)) price = 0;

        // 利回りは市場価格基準の値を表示する（取得単価を渡すと利回りが実態とずれる）
        const div = getDividendInfo(code);
        stocks.push({
            code,
            name: info.name,
            sector: info.sector,
            shares: shares || 0,
            price: price || 0,
            confidence: (shares && price) ? 'high' : (shares || price) ? 'middle' : 'low',
            dividend: div.perShare,
            dividend_yield: div.yield
        });
    };

    // 1) 各行がどの銘柄の行かを先に判定する（コード優先、無ければ銘柄名から）
    const codeAt = lines.map(line => {
        const byCode = findCodeInLine(line);
        if (byCode) return byCode;
        // 銘柄名の行（日本語だけでなく「ＮＴＴ」のような英字表記もある）
        if (/[ぁ-んァ-ヶ一-龠]/.test(line) || /[A-Za-zＡ-Ｚａ-ｚ]{3}/.test(line)) return findCodeByName(line);
        return null;
    });

    // 2) 銘柄ごとに、次の銘柄の行が現れる前までを窓として数値を拾う
    //    （窓がはみ出すと隣の銘柄の株数・単価を取り違えるため境界を厳しく取る）
    let consumedUntil = 0;
    for (let i = 0; i < lines.length; i++) {
        const code = codeAt[i];
        if (!code || processedCodes.has(code)) continue;

        let end = Math.min(lines.length, i + 5);
        for (let j = i + 1; j < end; j++) {
            if (codeAt[j] && codeAt[j] !== code) { end = j; break; } // 次の銘柄
            if (isRowStartLine(lines[j])) { end = j; break; }        // 次の行（銘柄名＋数値）
        }

        // 表形式では数値が銘柄コードの1行上に並ぶ（「本田技研 7 1,371.57」→「7267 0 1,536」）。
        // 直前の行がまだどの銘柄にも使われていなければ窓に含める
        let start = i;
        if (tableMode && i - 1 >= consumedUntil && !codeAt[i - 1]) start = i - 1;

        pushStock(code, lines.slice(start, end).join('\n'));
        consumedUntil = end;
    }

    return stocks;
}

// 「日本製鉄 10 570.00」のような“銘柄1行分”の始まりか（項目名で始まる行は除く）
function isRowStartLine(line) {
    if (!/\d/.test(line)) return false;
    const head = squeezeLabelSpaces(line.split(/\d/)[0]).trim();
    if (head.length < 2) return false;
    return !/数量|株数|単価|価額|金額|現在値|評価|損益|前日|口数|預り|合計|時価|利回り|配当|取得/.test(head);
}

// 行の中から銘柄コードらしい文字列（4桁数字 or 3桁数字+英字の新形式）を探す。
// lookbehind は古いiOS Safariで構文エラーになり全スクリプトが停止するため使わない
function findCodeInLine(line) {
    const re = /\d{3}[0-9A-Z]/g;
    let m;
    while ((m = re.exec(line)) !== null) {
        const before = m.index > 0 ? line[m.index - 1] : '';
        const after = line.slice(m.index + 4, m.index + 6);
        // 金額・率の一部（¥1,234 / 5,796円 / 8.61%）はコードではない
        if (/[\d,.¥+\-]/.test(before)) continue;
        if (/^\s*(?:円|%|％|株|口|,|\.)/.test(after)) continue;
        if (/^\d/.test(after)) continue; // 5桁以上の数字はコードではない
        if (getMasterInfo(m[0])) return m[0];
    }
    return null;
}

function displayOCRResults(stocks, meta = {}) {
    const container = document.getElementById('extractedStocks');
    const shotCount = meta.total || 1;

    const noteHtml = meta.note ? `<p style="color: var(--text-sub); font-size: 12px; margin-top: 8px;">${escapeHtml(meta.note)}</p>` : '';

    if (stocks.length === 0) {
        container.innerHTML = `
            <div style="background-color: var(--accent-blue-light); padding: 16px; border-radius: 8px; text-align: left;">
                <p style="color: var(--accent-blue); margin: 0; font-weight: 700;">銘柄情報が見つかりませんでした</p>
                <p style="color: var(--text-sub); font-size: 13px; margin-top: 8px; line-height: 1.7;">
                    次のどれかに当てはまらないか確認してください。<br>
                    ・文字が小さすぎる／画像がぼやけている（画面を拡大してから撮ると精度が上がります）<br>
                    ・銘柄コードと銘柄名が写っていない（名前だけでも認識を試みます）<br>
                    ・撮った画面が<strong>お気に入り・ランキング</strong>など保有情報のない画面<br>
                    ${getClaudeApiKey() ? '' : '読み取り精度を上げたい場合は「相談」ページでAPIキーを設定すると、画像認識で読み取れるようになります。<br>'}
                    うまくいかない場合は「手動で追加」から検索して登録できます（こちらは全銘柄対応で確実です）。
                </p>
                ${noteHtml}
            </div>
        `;
        return;
    }

    const needInput = stocks.filter(s => !s.shares || !s.price).length;
    let html = `<div class="ocr-summary">
        <strong>${stocks.length}銘柄</strong>を認識しました${shotCount > 1 ? `（${shotCount}枚のスクショから）` : ''}${meta.failures ? `<br><span style="color: var(--loss);">${meta.failures}枚は読み取りに失敗しました</span>` : ''}
        ${needInput ? `<br><span style="color: #E09112;">うち${needInput}銘柄は株数または取得単価が画面に写っていないため入力が必要です</span>` : '<br><span style="color: var(--gain);">株数・取得単価もすべて読み取れました。そのまま追加できます</span>'}
        ${noteHtml}
    </div>
    <div class="ocr-bulk-bar">
        <label class="ocr-check-all"><input type="checkbox" id="ocrCheckAll" checked onchange="toggleAllOCR(this.checked)"> すべて選択</label>
        <button class="btn btn-primary" style="padding: 8px 14px; font-size: 14px;" onclick="addSelectedOCRStocks()">選択した銘柄を追加</button>
    </div>`;

    stocks.forEach((stock, index) => {
        const confidenceText = { high: '自動入力済み', middle: '一部のみ読取', low: '要入力' }[stock.confidence] || '不明';
        const confidenceColor = { high: '#1E7A4E', middle: '#E09112', low: '#D64545' }[stock.confidence] || '#999';
        const yieldText = stock.dividend_yield ? `${stock.dividend_yield.toFixed(2)}%` : '—';

        html += `
            <div class="ocr-result-item" style="text-align: left;">
                <div class="ocr-result-header">
                    <div style="display: flex; align-items: flex-start; gap: 10px; min-width: 0;">
                        <input type="checkbox" class="ocr-select" id="pick_${index}" data-index="${index}" checked style="margin-top: 4px; width: 18px; height: 18px; flex-shrink: 0;">
                        <div style="min-width: 0;">
                            <h4 style="margin: 0;">${escapeHtml(stock.name)} (${escapeHtml(stock.code)})</h4>
                            <p style="color: var(--text-sub); font-size: 12px; margin: 4px 0 0 0;">${escapeHtml(stock.sector)} • 配当利回り: ${yieldText}${shotCount > 1 && stock.image ? ` • ${stock.image}枚目` : ''}</p>
                        </div>
                    </div>
                    <span style="background-color: ${confidenceColor}; color: white; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; flex-shrink: 0;">${confidenceText}</span>
                </div>
                <div style="margin: 12px 0 0 0; border-top: 1px solid var(--border-color); padding-top: 12px;">
                    <div class="ocr-field">
                        <label>株数 (株)</label>
                        <input type="number" id="shares_${index}" value="${stock.shares || ''}" min="1" placeholder="要入力">
                    </div>
                    <div class="ocr-field">
                        <label>取得単価 (¥)</label>
                        <input type="number" id="price_${index}" value="${stock.price || ''}" min="1" placeholder="要入力">
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function toggleAllOCR(checked) {
    document.querySelectorAll('.ocr-select').forEach(cb => { cb.checked = checked; });
}

// 選択された銘柄をまとめてポートフォリオへ
function addSelectedOCRStocks() {
    const picked = Array.from(document.querySelectorAll('.ocr-select')).filter(cb => cb.checked);
    if (picked.length === 0) { alert('追加する銘柄を選択してください'); return; }

    const entries = [];
    for (const cb of picked) {
        const index = parseInt(cb.dataset.index, 10);
        const stock = OCR_RESULTS[index];
        if (!stock) continue;
        const shares = parseInt(document.getElementById(`shares_${index}`).value, 10);
        const price = parseFloat(document.getElementById(`price_${index}`).value);
        if (!shares || shares <= 0 || !price || price <= 0) {
            alert(`${stock.name}(${stock.code}) の株数と取得単価を入力してください`);
            document.getElementById(!shares ? `shares_${index}` : `price_${index}`).focus();
            return;
        }
        entries.push({ stock, shares, price });
    }

    for (const e of entries) {
        const info = getMasterInfo(e.stock.code);
        addStockToPortfolio(e.stock.code, e.shares, e.price, info ? null : e.stock.name);
    }
    const n = entries.length;
    closeScreenshotModal();
    switchPage('dashboard');
    refreshPrices(true);
    alert(n > 1 ? `${n}銘柄をポートフォリオに追加しました` : `${entries[0].stock.name}を追加しました`);
}

// 単体追加（後方互換）
function addExtractedStock(code, index) {
    const shares = parseInt(document.getElementById(`shares_${index}`).value, 10);
    const price = parseFloat(document.getElementById(`price_${index}`).value);

    if (!shares || shares <= 0 || !price || price <= 0) {
        alert('株数と取得単価を入力してください');
        return;
    }

    const info = getMasterInfo(code);
    addStockToPortfolio(code, shares, price, info ? null : `銘柄${code}`);
    const name = info ? info.name : code;
    alert(`${name}(${code})を追加しました\n株数: ${shares}株\n取得単価: ¥${price.toLocaleString()}`);
    closeScreenshotModal();
    switchPage('dashboard');
    refreshPrices(true);
}

// ===== ポートフォリオ履歴（日次スナップショット） =====
function savePortfolioSnapshot() {
    const portfolio = getPortfolio();
    if (portfolio.length === 0) return;

    const totalValue = portfolio.reduce((sum, s) => sum + s.acquisitionPrice * s.shares, 0);
    const currentValue = portfolio.reduce((sum, s) => sum + s.currentPrice * s.shares, 0);

    const snapshot = {
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('ja-JP'),
        totalValue,
        currentValue,
        gainLoss: currentValue - totalValue,
        gainLossPercent: totalValue > 0 ? ((currentValue - totalValue) / totalValue * 100).toFixed(2) : '0.00',
        holdings: portfolio.length
    };

    let history = JSON.parse(localStorage.getItem('portfolio_history') || '[]');
    const todayIndex = history.findIndex(h => h.date === snapshot.date);

    if (todayIndex >= 0) history[todayIndex] = snapshot;
    else history.push(snapshot);

    const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    history = history.filter(h => new Date(h.timestamp) > oneYearAgo);

    localStorage.setItem('portfolio_history', JSON.stringify(history));
    return snapshot;
}

// ===== アラート機能 =====
let ALERTS = JSON.parse(localStorage.getItem('alerts') || '[]');

function addAlert(type, message, code = null) {
    const alert = {
        id: Date.now() + Math.random(),
        type,
        message,
        code,
        created: new Date().toISOString(),
        read: false
    };
    ALERTS.push(alert);
    localStorage.setItem('alerts', JSON.stringify(ALERTS));
    return alert;
}

function checkAlerts() {
    const portfolio = getPortfolio();
    if (portfolio.length === 0) return;

    const now = new Date();
    const month = now.getMonth() + 1;
    const todayStr = now.toLocaleDateString();

    // 1. 権利確定月アラート（3月・9月：多くの日本企業の権利確定月）
    if ([3, 9].includes(month)) {
        const hasAlert = ALERTS.some(a => a.type === 'kenri' && new Date(a.created).getMonth() === now.getMonth() && new Date(a.created).getFullYear() === now.getFullYear());
        if (!hasAlert) {
            addAlert('kenri', `${month}月は多くの企業の配当権利確定月です。権利付き最終日までの保有で配当・優待の権利が得られます。`);
        }
    }

    // 2. 配当支払シーズンアラート（6月・12月）
    if ([6, 12].includes(month) && now.getDate() <= 15) {
        const hasAlert = ALERTS.some(a => a.type === 'dividend' && new Date(a.created).getMonth() === now.getMonth() && new Date(a.created).getFullYear() === now.getFullYear());
        if (!hasAlert) {
            const divIncome = simulateDividendIncome(1);
            addAlert('dividend', `${month}月は配当支払いシーズンです。あなたの年間配当見込み: ${formatYen(divIncome.annual)}`);
        }
    }

    // 3. 集中度アラート（単一銘柄30%超）
    const totalValue = portfolio.reduce((sum, s) => sum + s.currentPrice * s.shares, 0);
    portfolio.forEach(stock => {
        const concentration = (stock.currentPrice * stock.shares) / totalValue;
        if (concentration > 0.3 && portfolio.length > 1) {
            const hasAlert = ALERTS.some(a =>
                a.type === 'concentration' && a.code === stock.code && !a.read &&
                new Date(a.created).toLocaleDateString() === todayStr
            );
            if (!hasAlert) {
                addAlert('concentration', `${stock.name}の集中度が${(concentration * 100).toFixed(1)}%です。分散を検討しましょう。`, stock.code);
            }
        }
    });

    // 4. セクター偏りアラート（単一セクター50%超）
    const sectors = {};
    portfolio.forEach(stock => {
        const sector = stock.sector || '不明';
        sectors[sector] = (sectors[sector] || 0) + stock.currentPrice * stock.shares;
    });
    Object.entries(sectors).forEach(([sector, value]) => {
        if (sector === 'ETF') return;
        const sectorPercent = value / totalValue;
        if (sectorPercent > 0.5 && Object.keys(sectors).length > 1) {
            const hasAlert = ALERTS.some(a =>
                a.type === 'sector' && a.message.includes(sector) && !a.read &&
                new Date(a.created).toLocaleDateString() === todayStr
            );
            if (!hasAlert) {
                addAlert('sector', `${sector}セクターが${(sectorPercent * 100).toFixed(1)}%を占めています。分散を検討してください。`);
            }
        }
    });

    // 5. 大きな値動きアラート（前日比±5%以上）
    portfolio.forEach(stock => {
        if (typeof stock.changePercent === 'number' && Math.abs(stock.changePercent) >= 5) {
            const hasAlert = ALERTS.some(a =>
                a.type === 'price' && a.code === stock.code &&
                new Date(a.created).toLocaleDateString() === todayStr
            );
            if (!hasAlert) {
                const dir = stock.changePercent > 0 ? '急騰' : '急落';
                addAlert('price', `${dir}: ${stock.name}が前日比${stock.changePercent > 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%`, stock.code);
            }
        }
    });

    clearOldAlerts();
}

function renderAlerts() {
    const card = document.getElementById('alertsCard');
    const list = document.getElementById('alertsList');
    if (!card || !list) return;

    const unread = ALERTS.filter(a => !a.read).sort((a, b) => new Date(b.created) - new Date(a.created));

    if (unread.length === 0) {
        card.style.display = 'none';
        return;
    }

    card.style.display = 'block';
    list.innerHTML = unread.slice(0, 5).map(a => `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px; background-color: var(--primary-light); border-radius: 8px; margin-bottom: 8px;">
            <div>
                <p style="margin: 0; font-size: 14px;">${escapeHtml(a.message)}</p>
                <p style="margin: 4px 0 0 0; font-size: 11px; color: var(--text-sub);">${new Date(a.created).toLocaleString('ja-JP')}</p>
            </div>
            <button style="background: none; border: none; cursor: pointer; color: var(--text-sub); font-size: 16px; flex-shrink: 0;" onclick="markAlertAsRead(${JSON.stringify(a.id)})" title="既読にする">✕</button>
        </div>
    `).join('');
}

function markAlertAsRead(alertId) {
    const alert = ALERTS.find(a => a.id === alertId);
    if (alert) {
        alert.read = true;
        localStorage.setItem('alerts', JSON.stringify(ALERTS));
        renderAlerts();
    }
}

function clearOldAlerts() {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    ALERTS = ALERTS.filter(a => new Date(a.created) > thirtyDaysAgo);
    localStorage.setItem('alerts', JSON.stringify(ALERTS));
}

// ===== データのバックアップ（この端末のブラウザ内にしか保存されないため） =====
const BACKUP_KEYS = ['portfolio', 'portfolio_history', 'alerts'];

function updateDataSettingsUI() {
    const status = document.getElementById('dataStatus');
    if (status) {
        const portfolio = getPortfolio();
        let history = [];
        try { history = JSON.parse(localStorage.getItem('portfolio_history') || '[]'); } catch (e) { history = []; }
        const last = portfolio.length > 0 ? portfolio.reduce((m, s) => Math.max(m, s.addedAt ? new Date(s.addedAt).getTime() : 0), 0) : 0;
        status.textContent = portfolio.length === 0
            ? '保存されている銘柄はまだありません。'
            : `保存中: ${portfolio.length}銘柄 ・ 資産推移の記録 ${history.length}日分${last ? ` ・ 最終更新 ${new Date(last).toLocaleDateString('ja-JP')}` : ''}`;
    }

    const input = document.getElementById('proxyBaseInput');
    const proxyStatus = document.getElementById('proxyStatus');
    const base = getPriceProxyBase();
    if (input && document.activeElement !== input) input.value = base;
    if (proxyStatus) {
        proxyStatus.textContent = base
            ? `現在の取得元: ${base}（自分で設定したもの）`
            : `現在の取得元: ${DEFAULT_PRICE_PROXY}（標準）`;
    }
}

function exportAppData() {
    const data = { app: 'kabu-scope', version: 1, exported: new Date().toISOString() };
    for (const key of BACKUP_KEYS) {
        const raw = localStorage.getItem(key);
        if (raw === null) continue;
        try { data[key] = JSON.parse(raw); } catch (e) { data[key] = raw; }
    }
    // APIキーは意図的に含めない（ファイルが流出したときに悪用されるため）
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const d = new Date();
    const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    a.href = url;
    a.download = `kabuscope-backup-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function importAppData(input) {
    const file = input && input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onerror = () => { alert('ファイルを読み込めませんでした'); input.value = ''; };
    reader.onload = e => {
        input.value = '';
        let data;
        try {
            data = JSON.parse(e.target.result);
        } catch (err) {
            alert('このファイルは読み込めません（JSON形式ではありません）');
            return;
        }
        if (!data || data.app !== 'kabu-scope' || !Array.isArray(data.portfolio)) {
            alert('カブスコープのバックアップファイルではないようです');
            return;
        }
        const current = getPortfolio();
        const msg = current.length > 0
            ? `現在の${current.length}銘柄を、バックアップの${data.portfolio.length}銘柄で置き換えます。\n（書き出した日時: ${data.exported ? new Date(data.exported).toLocaleString('ja-JP') : '不明'}）\n続けますか？`
            : `バックアップから${data.portfolio.length}銘柄を復元します。続けますか？`;
        if (!confirm(msg)) return;

        for (const key of BACKUP_KEYS) {
            if (data[key] === undefined) continue;
            localStorage.setItem(key, JSON.stringify(data[key]));
        }
        alert(`${data.portfolio.length}銘柄を復元しました`);
        switchPage('dashboard');
        updateDashboard();
        updateDataSettingsUI();
        refreshPrices(true);
    };
    reader.readAsText(file);
}

async function savePriceProxy() {
    const input = document.getElementById('proxyBaseInput');
    if (!input) return;
    const raw = input.value.trim().replace(/\/+$/, '');
    if (!raw) { alert('URLを入力してください'); return; }
    if (!/^https:\/\/[^\s]+$/.test(raw)) { alert('httpsで始まるURLを入力してください'); return; }

    const status = document.getElementById('proxyStatus');
    if (status) status.textContent = '接続を確認しています...';
    try {
        const res = await fetch(`${raw}/v8/finance/chart/7203.T?range=1d&interval=1d`);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();
        const price = json && json.chart && json.chart.result && json.chart.result[0] &&
            json.chart.result[0].meta && json.chart.result[0].meta.regularMarketPrice;
        if (typeof price !== 'number') throw new Error('株価を取得できませんでした');
        localStorage.setItem(PROXY_STORAGE_KEY, raw);
        updateDataSettingsUI();
        alert(`接続できました（トヨタ自動車の株価: ¥${price.toLocaleString()}）\n今後は保有銘柄の株価をこのURL経由で取得します。`);
        refreshPrices(true);
    } catch (e) {
        if (status) status.textContent = `接続できませんでした: ${e.message}`;
        alert(`接続できませんでした（${e.message}）\nURLとCORS設定を確認してください。設定は保存していません。`);
    }
}

function clearPriceProxy() {
    if (!confirm('株価の取得元の設定を消して、標準のスナップショットに戻しますか？')) return;
    localStorage.removeItem(PROXY_STORAGE_KEY);
    const input = document.getElementById('proxyBaseInput');
    if (input) input.value = '';
    updateDataSettingsUI();
}

// ===== 初期化 =====
document.addEventListener('DOMContentLoaded', function () {
    updateDataSettingsUI();
    const screenshotInput = document.getElementById('screenshotInput');
    if (screenshotInput) {
        screenshotInput.addEventListener('change', function (e) {
            const files = Array.from(e.target.files || []);
            const single = document.getElementById('previewImg');
            const thumbs = document.getElementById('previewThumbs');
            single.style.display = 'none';
            if (thumbs) thumbs.innerHTML = '';
            document.getElementById('extractedStocks').innerHTML = '';

            if (files.length === 1) {
                const reader = new FileReader();
                reader.onload = ev => { single.src = ev.target.result; single.style.display = 'block'; };
                reader.readAsDataURL(files[0]);
            } else if (files.length > 1 && thumbs) {
                // 複数枚はサムネイル一覧で表示
                files.forEach((file, i) => {
                    const reader = new FileReader();
                    reader.onload = ev => {
                        const wrap = document.createElement('div');
                        wrap.className = 'preview-thumb';
                        wrap.innerHTML = `<img src="${ev.target.result}" alt=""><span>${i + 1}</span>`;
                        thumbs.appendChild(wrap);
                    };
                    reader.readAsDataURL(file);
                });
            }
        });
    }

    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') sendChat();
        });
    }

    updateChatSettingsUI();
    updateDashboard();
    refreshPrices(); // 起動時に株価を自動取得（5分キャッシュ）
    loadFullMaster(); // 全銘柄マスターを先読み（検索用・非同期）
    // 株主優待データを先読み。読み込めたらダッシュボードの優待バッジを反映
    loadBenefits().then(b => {
        if (b && document.getElementById('dashboard').classList.contains('active')) updateDashboard();
    });
    // 全銘柄配当データを先読み。読み込めたら配当・診断ページを再描画
    loadDividends().then(d => {
        if (!d) return;
        if (document.getElementById('dividend').classList.contains('active')) renderDividendPage();
        if (document.getElementById('ai-analysis').classList.contains('active')) updateAIAnalysis();
    });
});
