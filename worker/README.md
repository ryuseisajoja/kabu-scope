# 株価の中継サーバー（無料・自分専用）

株価データをまとめてこのリポジトリに保存・公開する代わりに、**保有銘柄の分だけ必要なときに取得する**ための中継サーバーです。Cloudflare Workers の無料プラン（1日10万リクエストまで）で動きます。

## なぜ必要か

ブラウザから株価APIを直接呼ぶと、CORS（別サイトへの直接アクセス制限）で拒否されます。そのため今までは GitHub Actions で株価をまとめて取得し、`prices.json` などをリポジトリに置いて配信していました。この方式はデータの再配布に当たるため、中継サーバーを挟んで「その都度取得」に切り替えます。

## 手順（10分ほど）

1. Cloudflare のアカウントを作る（無料）: https://dash.cloudflare.com/sign-up
2. ダッシュボードで **Workers & Pages → Create application → Create Worker** を選ぶ
3. 名前を決めて **Deploy**（この時点では雛形のコード）
4. **Edit code** を開き、既存のコードを全部消して [`price-proxy.js`](./price-proxy.js) の中身を貼り付ける
5. `ALLOWED_ORIGINS` を自分のサイトのURLに変更する（例: `https://ryuseisajoja.github.io`）
6. **Deploy** を押す。`https://<名前>.<アカウント名>.workers.dev` というURLが発行される
7. カブスコープのダッシュボード下部「株価の取得元（上級者向け）」にそのURLを貼り、**保存して接続テスト**を押す

接続テストが成功すると、以降は保有銘柄の株価をこのURL経由で取得します。

## コマンドで入れる場合（任意）

```bash
npm install -g wrangler && wrangler login && wrangler deploy worker/price-proxy.js --name kabu-scope-proxy --compatibility-date 2024-11-01
```

## 設定後にできること

中継サーバーを設定すると、リポジトリから以下のファイルを削除してもアプリが動きます（＝データの再配布を止められます）。

| ファイル | 内容 | 設定後の代替 |
| --- | --- | --- |
| `prices.json` | 人気銘柄の株価スナップショット | 保有銘柄の株価を都度取得 |
| `prices_all.json` | 全上場銘柄の株価スナップショット | 同上 |
| `dividends.json` | 全上場銘柄の配当データ | 保有銘柄の配当を都度取得し、この端末に1週間キャッシュ |

配当は直近2年の支払い実績から年間配当を推定します（特別配当や株式分割の未調整値で利回りが膨らまないよう、中央値ベースの推定と比較して補正）。サーバー側スクリプトと同じ計算式なので、表示される利回りは変わりません。

削除する手順:

1. 上の手順で中継サーバーを設定し、株価が表示されることを確認する
2. `.github/workflows/update-prices.yml` のコミット対象から該当ファイルを外す
3. `git rm prices.json prices_all.json dividends.json` して push

`master.json`（銘柄コードと名称の一覧）は銘柄検索に必要なので残しますが、[JPXが公表している上場銘柄一覧](https://www.jpx.co.jp/markets/statistics-equities/misc/01.html) をもとに作り直すのが安全です。

## 注意

- 中継サーバーは自分専用にしてください（`ALLOWED_ORIGINS` を自分のサイトに限定）。URLを公開すると他人のアクセスで無料枠を使い切る可能性があります。
- 上流APIの利用規約は引き続き適用されます。この中継は「データをまとめて公開・再配布しない」ための仕組みであり、規約上の問題をすべて解消するものではありません。継続的に安心して使うなら、J-Quants（JPX公式）などの正式なデータ提供サービスの利用を検討してください。
