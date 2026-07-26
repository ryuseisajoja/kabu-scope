// 株価取得の中継サーバー（Cloudflare Workers 無料プランで動きます）
//
// 目的:
//   ブラウザから株価APIを直接呼ぶとCORSで拒否されるため、株価データをまとめて
//   リポジトリに保存・公開していました。この中継を挟むと「保有銘柄の分だけ、
//   必要なときに取得する」形になり、データセットを公開・再配布せずに済みます。
//
// 使い方は worker/README.md を参照してください。

const UPSTREAM = 'https://query1.finance.yahoo.com';

// 中継を許可するパスだけを列挙する（何でも中継できる状態にしないため）
const ALLOWED_PATHS = [
    /^\/v8\/finance\/chart\/[0-9A-Za-z.\-]+$/
];

// 呼び出しを許可するサイト。自分のサイトのURLに変更してください
const ALLOWED_ORIGINS = [
    'https://ryuseisajoja.github.io',
    'http://localhost:8123',
    'http://localhost:8124'
];

function corsHeaders(origin) {
    const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
    return {
        'Access-Control-Allow-Origin': allow,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Max-Age': '86400',
        'Vary': 'Origin'
    };
}

export default {
    async fetch(request, env, ctx) {
        const origin = request.headers.get('Origin') || '';
        const cors = corsHeaders(origin);

        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: cors });
        }
        if (request.method !== 'GET') {
            return new Response('Method Not Allowed', { status: 405, headers: cors });
        }

        const url = new URL(request.url);
        if (!ALLOWED_PATHS.some(re => re.test(url.pathname))) {
            return new Response(JSON.stringify({ error: 'path not allowed' }), {
                status: 403, headers: { ...cors, 'content-type': 'application/json' }
            });
        }

        const target = UPSTREAM + url.pathname + url.search;

        // 同じ銘柄への短時間の連続アクセスはキャッシュで返し、上流への負荷を抑える
        const cache = caches.default;
        const cacheKey = new Request(target, { method: 'GET' });
        let upstream = await cache.match(cacheKey);

        if (!upstream) {
            upstream = await fetch(target, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (kabu-scope price proxy)',
                    'Accept': 'application/json'
                }
            });
            if (upstream.ok) {
                const cacheable = new Response(upstream.clone().body, upstream);
                cacheable.headers.set('Cache-Control', 'public, max-age=300');
                ctx.waitUntil(cache.put(cacheKey, cacheable));
            }
        }

        const body = await upstream.text();
        return new Response(body, {
            status: upstream.status,
            headers: {
                ...cors,
                'content-type': 'application/json; charset=utf-8',
                'Cache-Control': 'public, max-age=300'
            }
        });
    }
};
