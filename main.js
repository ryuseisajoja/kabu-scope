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

// ===== リアルタイム株価（Yahoo Finance） =====
const PRICE_CACHE_KEY = 'price_cache_v1';
const PRICE_CACHE_TTL = 5 * 60 * 1000; // 5分

function getPriceCache() {
    return JSON.parse(localStorage.getItem(PRICE_CACHE_KEY) || '{}');
}

async function fetchQuote(code) {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${code}.T?range=1d&interval=1d`;
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

// GitHub Actionsが生成する株価スナップショット
// - prices.json     … 人気銘柄（30分ごと更新）
// - prices_all.json … 全上場銘柄（1日1回更新）
// httpsでホストされている場合、Yahoo Finance直アクセスはCORSでブロックされるため、
// 同一オリジンのスナップショットにフォールバックする
const PRICE_SNAPSHOTS = {};
async function loadSnapshotFile(file) {
    if (PRICE_SNAPSHOTS[file] !== undefined) return PRICE_SNAPSHOTS[file];
    try {
        const res = await fetch(file + '?t=' + Math.floor(Date.now() / 60000));
        PRICE_SNAPSHOTS[file] = res.ok ? await res.json() : false;
    } catch (e) {
        PRICE_SNAPSHOTS[file] = false;
    }
    return PRICE_SNAPSHOTS[file];
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
    if (m) return { name: m.name, sector: m.sector, curated: true };
    if (FULL_MASTER && FULL_MASTER[code]) {
        return { name: FULL_MASTER[code][0], sector: FULL_MASTER[code][1], curated: false };
    }
    return null;
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
        // 1) Yahoo Financeへ直接（file://やlocalhostで動作。httpsではCORSで失敗する）
        const settled = await Promise.allSettled(toFetch.map(fetchQuote));
        const missing = [];
        settled.forEach((s, i) => {
            if (s.status === 'fulfilled') {
                result[toFetch[i]] = s.value;
                cache[toFetch[i]] = s.value;
            } else {
                missing.push(toFetch[i]);
            }
        });

        // 2) 取れなかった銘柄はスナップショット（GitHub Actionsが定期更新）から補完
        //    prices.json（人気銘柄・30分ごと）→ prices_all.json（全銘柄・日次）の順
        let stillMissing = missing;
        for (const file of ['prices.json', 'prices_all.json']) {
            if (stillMissing.length === 0) break;
            const snap = await loadSnapshotFile(file);
            if (!snap || !snap.prices) continue;
            const snapTime = Date.parse(snap.updated) || now;
            const next = [];
            for (const code of stillMissing) {
                const q = snap.prices[code];
                if (q) {
                    result[code] = {
                        code,
                        price: q.price,
                        previousClose: q.previousClose,
                        changePercent: q.changePercent,
                        name: null,
                        time: snapTime,
                        snapshot: true
                    };
                } else {
                    next.push(code);
                }
            }
            stillMissing = next;
        }

        localStorage.setItem(PRICE_CACHE_KEY, JSON.stringify(cache));
    }

    return result;
}

// ポートフォリオ全銘柄の現在値を更新
let PRICE_REFRESHING = false;
async function refreshPrices(force = false) {
    if (PRICE_REFRESHING) return;
    const portfolio = getPortfolio();
    if (portfolio.length === 0) return;

    PRICE_REFRESHING = true;
    const btn = document.getElementById('refreshPricesBtn');
    const statusEl = document.getElementById('priceUpdatedAt');
    if (btn) { btn.disabled = true; btn.textContent = '🔄 更新中...'; }

    try {
        const prices = await fetchRealTimePrices(portfolio.map(s => s.code), force);
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
                statusEl.textContent = '⚠️ 株価を取得できませんでした（オフライン？）';
            } else if (snapshotTime) {
                statusEl.textContent = `📡 株価更新（${new Date(snapshotTime).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}時点のデータ・${updated}/${portfolio.length}銘柄）`;
            } else {
                statusEl.textContent = `📡 株価更新: ${new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}（${updated}/${portfolio.length}銘柄）`;
            }
        }
    } catch (e) {
        console.error('price refresh error:', e);
        if (statusEl) statusEl.textContent = '⚠️ 株価の取得に失敗しました';
    } finally {
        PRICE_REFRESHING = false;
        if (btn) { btn.disabled = false; btn.textContent = '🔄 株価を更新'; }
    }
}

// ===== ページ切り替え =====
function switchPage(pageId) {
    document.querySelectorAll('.page-section').forEach(section => section.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const navIndex = { 'dashboard': 0, 'portfolio': 1, 'history': 2, 'ai-analysis': 3, 'recommend': 4, 'dividend': 5, 'ai-chat': 6, 'guide': 7 };
    if (navIndex[pageId] !== undefined) {
        const items = document.querySelectorAll('.nav-item');
        if (items[navIndex[pageId]]) items[navIndex[pageId]].classList.add('active');
    }

    document.querySelectorAll('.bottom-nav-item').forEach(item => item.classList.remove('active'));
    const bottomNavIndex = { 'dashboard': 0, 'ai-analysis': 1, 'ai-chat': 2, 'guide': 3 };
    if (bottomNavIndex[pageId] !== undefined) {
        document.querySelectorAll('.bottom-nav-item')[bottomNavIndex[pageId]].classList.add('active');
    }

    if (pageId === 'dashboard') updateDashboard();
    if (pageId === 'portfolio') updatePortfolioPage(getPortfolio());
    if (pageId === 'history') renderHistoryPage();
    if (pageId === 'ai-analysis') updateAIAnalysis();
    if (pageId === 'recommend') updateRecommendationsDisplay();
    if (pageId === 'dividend') renderDividendPage();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== ダッシュボード =====
function updateDashboard() {
    const portfolio = getPortfolio();
    const statValues = document.querySelectorAll('#dashboard .stat-value');

    if (portfolio.length === 0) {
        if (statValues[0]) statValues[0].textContent = '0 銘柄';
        if (statValues[1]) statValues[1].textContent = '¥0';
        if (statValues[2]) statValues[2].textContent = '- %';
        updateStockTable(portfolio);
        renderAlerts();
        return;
    }

    const totalValue = portfolio.reduce((sum, s) => sum + s.acquisitionPrice * s.shares, 0);
    const currentValue = portfolio.reduce((sum, s) => sum + s.currentPrice * s.shares, 0);
    const maxConcentration = Math.max(...portfolio.map(s => (s.currentPrice * s.shares) / currentValue)) * 100;

    if (statValues[0]) statValues[0].textContent = portfolio.length + ' 銘柄';
    if (statValues[1]) statValues[1].textContent = formatYen(currentValue);
    if (statValues[2]) statValues[2].textContent = maxConcentration.toFixed(1) + ' %';

    updateStockTable(portfolio);
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
        return `
        <tr>
            <td><strong>${escapeHtml(stock.name)} (${escapeHtml(stock.code)})</strong></td>
            <td>${stock.shares.toLocaleString()} 株</td>
            <td>${formatYen(stock.acquisitionPrice)}</td>
            <td>${formatYen(stock.currentPrice)} ${changeHtml}</td>
            <td style="color: ${gainColor}; font-weight: bold;">${gainSign}${formatYen(Math.abs(gain))}</td>
            <td style="text-align: center;">
                <button style="background: none; border: none; cursor: pointer; color: #D64545; font-size: 16px;" onclick="removeStockFromPortfolio('${escapeHtml(stock.code)}')" title="削除">🗑️</button>
            </td>
        </tr>`;
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
        const sector = stock.sector || '不明';
        if (!sectors[sector]) sectors[sector] = { value: 0, count: 0 };
        sectors[sector].value += stock.currentPrice * stock.shares;
        sectors[sector].count += 1;
    });

    if (portfolioSector) {
        // ドーナツチャート + 凡例
        const entries = Object.entries(sectors).sort((a, b) => b[1].value - a[1].value);
        const palette = ['#1E7A4E', '#3D9970', '#63B995', '#8FD0B2', '#2C6E8F', '#5B8DB8', '#C9A76A', '#D6A5A5', '#9AA5B1', '#C4CBC7'];
        const R = 15.9155; // 円周がちょうど100になる半径
        let offset = 25;   // 12時の位置から開始
        const segs = entries.map(([sector, data], i) => {
            const pct = data.value / totalCurrent * 100;
            const seg = `<circle r="${R}" cx="21" cy="21" fill="transparent" stroke="${palette[i % palette.length]}" stroke-width="6.5" stroke-dasharray="${pct.toFixed(3)} ${(100 - pct).toFixed(3)}" stroke-dashoffset="${offset.toFixed(3)}"></circle>`;
            offset -= pct;
            return seg;
        }).join('');
        const legend = entries.map(([sector, data], i) => {
            const pct = (data.value / totalCurrent * 100).toFixed(1);
            return `<div class="donut-legend-row">
                <span class="donut-dot" style="background:${palette[i % palette.length]}"></span>
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

    if (portfolioTbody) {
        const topStocks = [...portfolio]
            .sort((a, b) => (b.currentPrice * b.shares) - (a.currentPrice * a.shares))
            .slice(0, 5);
        portfolioTbody.innerHTML = topStocks.map(stock => {
            const percentage = ((stock.currentPrice * stock.shares) / totalCurrent * 100).toFixed(1);
            return `<tr><td>${escapeHtml(stock.name)}</td><td><strong>${percentage}%</strong></td></tr>`;
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
        diagnosticList.innerHTML = `<div class="diagnostic-item"><div class="diagnostic-title">📋 データ不足</div><p style="color: var(--text-sub); font-size: 14px;">ダッシュボードから保有銘柄を追加してください。スクショからの自動読み取りにも対応しています。</p></div>`;
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
        findings.push({ icon: '🚨', title: '高い集中リスク', text: `${topStock.name}が全体の${topConcentration.toFixed(1)}%を占めています。1銘柄の急落が資産全体に大きく影響します。分散を強くおすすめします。` });
    } else if (topConcentration > 30) {
        score -= 15;
        findings.push({ icon: '⚠️', title: '集中リスク', text: `${topStock.name}への投資比率が${topConcentration.toFixed(1)}%とやや高めです。1銘柄への集中はリスクを高めます。` });
    } else {
        findings.push({ icon: '✅', title: '集中度は良好', text: `最大銘柄の比率は${topConcentration.toFixed(1)}%。1銘柄への過度な集中はありません。` });
    }

    // 2. 銘柄数チェック
    if (portfolio.length < 3) {
        score -= 15;
        findings.push({ icon: '💡', title: '銘柄数が少なめ', text: `現在${portfolio.length}銘柄です。5銘柄以上に分散すると、個別企業のリスクを抑えられます。` });
    } else if (portfolio.length < 5) {
        score -= 5;
        findings.push({ icon: '💡', title: 'もう少し分散の余地あり', text: `現在${portfolio.length}銘柄。5〜10銘柄程度が初心者にも管理しやすい分散の目安です。` });
    }

    // 3. セクター分散チェック
    const sectors = {};
    portfolio.forEach(s => {
        const sec = s.sector || '不明';
        sectors[sec] = (sectors[sec] || 0) + s.currentPrice * s.shares;
    });
    const sectorEntries = Object.entries(sectors).sort((a, b) => b[1] - a[1]);
    const topSectorPercent = sectorEntries[0][1] / totalValue * 100;
    if (topSectorPercent > 60 && sectorEntries[0][0] !== 'ETF') {
        score -= 20;
        findings.push({ icon: '⚠️', title: 'セクターの偏り', text: `${sectorEntries[0][0]}セクターが${topSectorPercent.toFixed(1)}%を占めています。業界全体の不況に弱いポートフォリオです。` });
    } else if (Object.keys(sectors).length < 3 && portfolio.length >= 3) {
        score -= 10;
        findings.push({ icon: '💡', title: 'セクター数が少なめ', text: `現在${Object.keys(sectors).length}セクターのみ。異なる業種を組み合わせると景気変動に強くなります。` });
    }

    // 4. ディフェンシブ銘柄チェック
    const defensiveSectors = ['食品', '医薬', 'インフラ', '通信'];
    const hasDefensive = portfolio.some(s => defensiveSectors.includes(s.sector));
    const hasETF = portfolio.some(s => s.sector === 'ETF');
    if (!hasDefensive && !hasETF) {
        score -= 10;
        findings.push({ icon: '💡', title: '足りない視点', text: '食品・医薬・通信・インフラなどディフェンシブ性の高いセクターがありません。景気後退時の下支えになります。' });
    }

    // 5. 配当チェック
    const div = simulateDividendIncome(1);
    if (div.annual > 0) {
        findings.push({ icon: '💰', title: '配当収入の見込み', text: `年間配当見込みは約${formatYen(div.annual)}（月あたり約${formatYen(div.monthly)}）です。詳しくは「配当予測」ページへ。` });
    }

    let grade, title;
    if (score >= 90) { grade = 'A'; title = '素晴らしいバランスのポートフォリオです'; }
    else if (score >= 75) { grade = 'B+'; title = 'バランスは良好ですが、さらに伸ばせる余地があります'; }
    else if (score >= 60) { grade = 'B'; title = 'まずまずですが、改善ポイントがいくつかあります'; }
    else if (score >= 45) { grade = 'C'; title = 'リスクの偏りが見られます。分散を検討しましょう'; }
    else { grade = 'D'; title = 'リスクが高い構成です。早めの見直しをおすすめします'; }

    scoreBadge.textContent = grade;
    if (scoreTitle) scoreTitle.textContent = title;

    diagnosticList.innerHTML = findings.map(f => `
        <div class="diagnostic-item">
            <div class="diagnostic-title">${f.icon} ${escapeHtml(f.title)}</div>
            <p style="color: var(--text-sub); font-size: 14px;">${escapeHtml(f.text)}</p>
        </div>
    `).join('');
}

// ===== 推奨銘柄 =====
function generateDynamicRecommendations() {
    const portfolio = getPortfolio();

    if (portfolio.length === 0) return getDefaultRecommendations();

    const heldCodes = new Set(portfolio.map(s => s.code));
    const heldSectors = new Set(portfolio.map(s => s.sector));
    const recommendations = [];

    const targetSectors = ['食品', '医薬', '通信', 'インフラ', '小売', '金融', '運輸', '商社'];
    for (const sector of targetSectors) {
        if (recommendations.length >= 3) break;
        if (heldSectors.has(sector)) continue;
        const candidates = Object.entries(STOCK_MASTER_DATA)
            .filter(([code, d]) => d.sector === sector && !heldCodes.has(code) && !d.isETF)
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
                <div class="recommendation-rating">⭐ 初心者向け</div>
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
        const stockData = STOCK_MASTER_DATA[stock.code] || {};
        const perShare = stockData.dividend !== undefined ? stockData.dividend : (stock.dividend || 0);
        const annualDiv = stock.shares * perShare;
        totalAnnualDividend += annualDiv;

        breakdown[stock.code] = {
            name: stock.name,
            shares: stock.shares,
            annual: annualDiv,
            monthly: Math.floor(annualDiv / 12),
            perShare: perShare,
            yield: stock.currentPrice > 0 ? (perShare / stock.currentPrice * 100) : (stockData.dividend_yield || 0)
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
        <div class="stat-card"><div><p class="stat-label">年間配当見込み（税引前）</p><p class="stat-value" style="color: #1E7A4E;">${formatYen(sim.annual)}</p></div><div class="stat-icon">💰</div></div>
        <div class="stat-card"><div><p class="stat-label">月あたり平均</p><p class="stat-value">${formatYen(sim.monthly)}</p></div><div class="stat-icon">📅</div></div>
        <div class="stat-card"><div><p class="stat-label">ポートフォリオ利回り</p><p class="stat-value" style="color: #1E7A4E;">${avgYield.toFixed(2)} %</p></div><div class="stat-icon">📈</div></div>
    `;

    if (breakdownBody) {
        breakdownBody.innerHTML = Object.values(sim.breakdown)
            .sort((a, b) => b.annual - a.annual)
            .map(b => `<tr>
                <td><strong>${escapeHtml(b.name)}</strong></td>
                <td>${b.shares.toLocaleString()} 株</td>
                <td>¥${b.perShare}/株</td>
                <td style="color: #1E7A4E;">${b.yield.toFixed(2)}%</td>
                <td style="font-weight: bold; color: #1E7A4E;">${formatYen(b.annual)}</td>
            </tr>`).join('');
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
    document.getElementById('modalBenefit').textContent = BENEFIT_DATA[code] || 'なし（配当重視の銘柄です）';
    document.getElementById('modalAdvice').innerHTML = `<p style="line-height: 1.6;">${escapeHtml(`${data.name}は${data.sector}セクターの銘柄です。購入前に証券会社のサイトで最新の株価・業績・配当情報を確認しましょう。`)}</p>`;

    // リアルタイム株価を取得して表示に反映
    fetchRealTimePrices([code]).then(prices => {
        const q = prices[code];
        if (q && document.getElementById('modalCode').textContent === code) {
            const yieldNow = q.price > 0 ? (data.dividend / q.price * 100).toFixed(2) : data.dividend_yield;
            document.getElementById('modalPrice').textContent = `${data.sector} / ${formatYen(q.price)}`;
            document.getElementById('modalDividend').textContent = yieldNow + '%';
        }
    }).catch(() => {});
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('stockDetailModal').style.display = 'none';
}

// ===== 手動追加モーダル（全銘柄検索） =====
let MANUAL_SELECTED_CODE = null;

function openManualAdd() {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('manualAddModal').style.display = 'block';
    MANUAL_SELECTED_CODE = null;
    const input = document.getElementById('stockSearchInput');
    if (input) { input.value = ''; input.focus(); }
    const results = document.getElementById('stockSearchResults');
    if (results) results.innerHTML = '';
    const label = document.getElementById('selectedStockLabel');
    if (label) label.style.display = 'none';

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
        label.innerHTML = `✅ <strong>${escapeHtml(code)} ${escapeHtml(info.name)}</strong>（${escapeHtml(info.sector)}）を選択中`;
        label.style.display = 'block';
    }
    const container = document.getElementById('stockSearchResults');
    if (container) container.innerHTML = '';
    const input = document.getElementById('stockSearchInput');
    if (input && info) input.value = `${code} ${info.name}`;
    const shares = document.getElementById('manualShares');
    if (shares) shares.focus();
}

async function submitManualAdd() {
    const rawQuery = (document.getElementById('stockSearchInput')?.value || '').trim().toUpperCase();
    const shares = parseInt(document.getElementById('manualShares').value, 10);
    const price = parseFloat(document.getElementById('manualPrice').value);

    // 選択済みコード、なければ入力欄が4文字コードそのものならそれを使用
    let code = MANUAL_SELECTED_CODE;
    if (!code && /^\d[\dA-Z]{3}$/.test(rawQuery)) code = rawQuery;
    if (!code) { alert('検索結果から銘柄を選択してください'); return; }
    if (!shares || shares <= 0) { alert('株数を入力してください'); return; }
    if (!price || price <= 0) { alert('取得単価を入力してください'); return; }

    let nameOverride = null;
    if (!getMasterInfo(code)) {
        // どのマスターにもない銘柄：Yahoo Financeから名称を取得（ローカルのみ動作）
        try {
            const quote = await fetchQuote(code);
            nameOverride = quote.name || `銘柄${code}`;
        } catch (e) {
            if (!confirm(`銘柄コード ${code} の情報を取得できませんでした。\nこのまま追加しますか？（名称は「銘柄${code}」になります）`)) return;
            nameOverride = `銘柄${code}`;
        }
    }

    addStockToPortfolio(code, shares, price, nameOverride);
    closeManualAddModal();
    document.getElementById('manualShares').value = '';
    document.getElementById('manualPrice').value = '';
    switchPage('dashboard');
    refreshPrices(true);
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
        ? '🟢 <strong>Claude AI モード</strong>（APIキー設定済み・このブラウザにのみ保存されています）'
        : '⚪ 定型応答モード — Claude APIキーを設定すると、本物のAIがポートフォリオを踏まえて回答します';
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

    const lines = portfolio.map(s => {
        const val = s.currentPrice * s.shares;
        const pct = (val / totalCurrent * 100).toFixed(1);
        return `- ${s.name}(${s.code}) ${s.sector}: ${s.shares}株 取得単価¥${s.acquisitionPrice} 現在値¥${s.currentPrice} 構成比${pct}%`;
    });

    return `ユーザーの現在のポートフォリオ:
${lines.join('\n')}
評価額合計: ¥${Math.round(totalCurrent).toLocaleString()} / 取得総額: ¥${Math.round(totalAcq).toLocaleString()} / 評価損益: ${totalCurrent >= totalAcq ? '+' : ''}¥${Math.round(totalCurrent - totalAcq).toLocaleString()}
年間配当見込み(税引前・概算): ¥${Math.round(div.annual).toLocaleString()}`;
}

async function callClaudeAPI(userMessage) {
    const apiKey = getClaudeApiKey();

    CHAT_HISTORY.push({ role: 'user', content: userMessage });
    // 履歴は直近12往復分のみ送信
    if (CHAT_HISTORY.length > 24) CHAT_HISTORY = CHAT_HISTORY.slice(-24);

    const systemPrompt = `あなたは「カブスコープ」という日本株ポートフォリオ管理アプリのAIアドバイザーです。投資初心者向けに、日本株・配当・株主優待・NISA・分散投資について、親しみやすく分かりやすい日本語で回答してください。

ルール:
- 回答は簡潔に（長くても300字程度）。専門用語には短い補足を付ける。
- 特定銘柄の売買を断定的に推奨しない。「〜という考え方があります」「最終判断はご自身で」というスタンスを保つ。
- 税制や制度の話は「詳細は証券会社や税理士にご確認ください」と添える。
- ユーザーのポートフォリオ情報が下記にあるので、質問に関係する場合は具体的に言及する。

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
    msg.innerHTML = `<div class="message-avatar">${role === 'user' ? '👤' : '🤖'}</div><div class="message-content">${html}</div>`;
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
        thinkingMsg.querySelector('.message-content').innerHTML = `<p style="color: var(--loss);">⚠️ ${escapeHtml(e.message)}</p><p style="color: var(--text-sub); font-size: 13px; margin-top: 8px;">${getAIResponse(message)}</p>`;
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
        return 'ダッシュボードの「🔄 株価を更新」ボタンでリアルタイム株価（Yahoo Finance）を取得できます。「資産推移」ページでは日ごとの評価額の変化をグラフで確認できますよ！';
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
}

async function performOCR() {
    const input = document.getElementById('screenshotInput');
    if (!input.files || !input.files[0]) {
        alert('スクショを選択してください');
        return;
    }
    if (typeof Tesseract === 'undefined') {
        alert('OCRライブラリの読み込み中です。少し待ってからもう一度お試しください。');
        return;
    }

    const file = input.files[0];
    document.getElementById('ocrStatus').style.display = 'block';
    document.getElementById('analyzeBtn').disabled = true;
    document.getElementById('extractedStocks').innerHTML = '';

    try {
        const { data: { text } } = await Tesseract.recognize(file, 'jpn+eng', {
            logger: m => {
                if (m.status === 'recognizing text') {
                    document.getElementById('statusText').textContent = `🔍 OCR処理中... ${(m.progress * 100).toFixed(0)}%`;
                }
            }
        });

        document.getElementById('ocrStatus').style.display = 'none';
        const stocks = parseStockInfoFromText(text);
        displayOCRResults(stocks);
    } catch (error) {
        console.error('OCR Error:', error);
        document.getElementById('ocrStatus').style.display = 'none';
        document.getElementById('extractedStocks').innerHTML = `
            <div style="background-color: #FFE6E6; padding: 16px; border-radius: 8px; color: #C81E1E; text-align: center;">
                <p style="margin: 0;">⚠️ OCR処理に失敗しました</p>
                <p style="font-size: 14px; margin-top: 8px; color: var(--text-sub);">画像の品質を確認してもう一度お試しください</p>
            </div>
        `;
    }

    document.getElementById('analyzeBtn').disabled = false;
}

function parseStockInfoFromText(text) {
    const stocks = [];
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const processedCodes = new Set();

    for (const line of lines) {
        const codeMatches = line.matchAll(/(\d{4})/g);

        for (const match of codeMatches) {
            const code = match[1];
            if (processedCodes.has(code)) continue;

            const masterData = STOCK_MASTER_DATA[code];
            if (!masterData) continue;

            processedCodes.add(code);

            const sharesMatch = line.match(/([\d,]{1,7})\s*(?:株|口)/);
            const priceMatch = line.match(/[¥￥]?\s*([\d,]+(?:\.\d+)?)\s*円/) || line.match(/[¥￥]\s*([\d,]+(?:\.\d+)?)/);

            const shares = sharesMatch ? parseInt(sharesMatch[1].replace(/,/g, ''), 10) : 100;
            const price = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : 0;

            stocks.push({
                code,
                name: masterData.name,
                sector: masterData.sector,
                shares,
                price,
                confidence: (sharesMatch && priceMatch) ? 'high' : (sharesMatch || priceMatch) ? 'middle' : 'low',
                dividend: masterData.dividend,
                dividend_yield: masterData.dividend_yield
            });
        }
    }

    return stocks;
}

function displayOCRResults(stocks) {
    const container = document.getElementById('extractedStocks');

    if (stocks.length === 0) {
        container.innerHTML = `
            <div style="background-color: var(--accent-blue-light); padding: 16px; border-radius: 8px; text-align: center;">
                <p style="color: var(--accent-blue); margin: 0;">📸 銘柄情報が見つかりませんでした</p>
                <p style="color: var(--text-sub); font-size: 14px; margin-top: 8px;">別のスクショを試すか、「手動で追加」をご利用ください</p>
            </div>
        `;
        return;
    }

    let html = '<h4 style="margin-bottom: 16px; text-align: left;">📸 認識された銘柄情報</h4>';

    stocks.forEach((stock, index) => {
        const confidenceText = { high: '高 ✓', middle: '中 △', low: '低 ⚠️' }[stock.confidence] || '不明';
        const confidenceColor = { high: '#1E7A4E', middle: '#E09112', low: '#D64545' }[stock.confidence] || '#999';

        html += `
            <div class="ocr-result-item" style="text-align: left;">
                <div class="ocr-result-header">
                    <div>
                        <h4 style="margin: 0;">${escapeHtml(stock.name)} (${stock.code})</h4>
                        <p style="color: var(--text-sub); font-size: 12px; margin: 4px 0 0 0;">${escapeHtml(stock.sector)} • 配当利回り: ${stock.dividend_yield}%</p>
                    </div>
                    <span style="background-color: ${confidenceColor}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">信頼度: ${confidenceText}</span>
                </div>
                <div style="margin: 12px 0; border-top: 1px solid #ddd; padding-top: 12px;">
                    <p style="color: var(--text-sub); font-size: 12px; margin: 0 0 8px 0;">💡 数値を確認・修正してください</p>
                    <div class="ocr-field">
                        <label>株数 (株)</label>
                        <input type="number" id="shares_${index}" value="${stock.shares}" min="1">
                    </div>
                    <div class="ocr-field">
                        <label>取得単価 (¥)</label>
                        <input type="number" id="price_${index}" value="${stock.price || ''}" min="1" placeholder="要入力">
                    </div>
                </div>
                <button class="btn btn-primary" style="width: 100%;" onclick="addExtractedStock('${stock.code}', ${index})">✓ ポートフォリオに追加</button>
            </div>
        `;
    });

    container.innerHTML = html;
}

function addExtractedStock(code, index) {
    const shares = parseInt(document.getElementById(`shares_${index}`).value, 10);
    const price = parseFloat(document.getElementById(`price_${index}`).value);

    if (!shares || shares <= 0 || !price || price <= 0) {
        alert('株数と取得単価を入力してください');
        return;
    }

    addStockToPortfolio(code, shares, price);
    const name = STOCK_MASTER_DATA[code] ? STOCK_MASTER_DATA[code].name : code;
    alert(`✅ ${name}(${code})を追加しました！\n株数: ${shares}株\n取得単価: ¥${price.toLocaleString()}`);
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
            addAlert('kenri', `📅 ${month}月は多くの企業の配当権利確定月です。権利付き最終日までの保有で配当・優待の権利が得られます。`);
        }
    }

    // 2. 配当支払シーズンアラート（6月・12月）
    if ([6, 12].includes(month) && now.getDate() <= 15) {
        const hasAlert = ALERTS.some(a => a.type === 'dividend' && new Date(a.created).getMonth() === now.getMonth() && new Date(a.created).getFullYear() === now.getFullYear());
        if (!hasAlert) {
            const divIncome = simulateDividendIncome(1);
            addAlert('dividend', `💰 ${month}月は配当支払いシーズンです。あなたの年間配当見込み: ${formatYen(divIncome.annual)}`);
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
                addAlert('concentration', `⚠️ ${stock.name}の集中度が${(concentration * 100).toFixed(1)}%です。分散を検討しましょう。`, stock.code);
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
                addAlert('sector', `⚠️ ${sector}セクターが${(sectorPercent * 100).toFixed(1)}%を占めています。分散を検討してください。`);
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
                const dir = stock.changePercent > 0 ? '📈 急騰' : '📉 急落';
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

// ===== 初期化 =====
document.addEventListener('DOMContentLoaded', function () {
    const screenshotInput = document.getElementById('screenshotInput');
    if (screenshotInput) {
        screenshotInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const img = document.getElementById('previewImg');
                    img.src = event.target.result;
                    img.style.display = 'block';
                };
                reader.readAsDataURL(file);
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
});
