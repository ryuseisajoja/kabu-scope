// 開発用の簡易静的サーバー: node scripts/dev_server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const PORT = 8123;
const MIME = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
    '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon'
};

createServer(async (req, res) => {
    try {
        let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
        if (path === '/') path = '/index.html';
        const file = normalize(join(ROOT, path));
        if (!file.startsWith(normalize(ROOT))) { res.writeHead(403); res.end(); return; }
        const data = await readFile(file);
        res.writeHead(200, {
            'Content-Type': MIME[extname(file)] || 'application/octet-stream',
            'Cache-Control': 'no-store'
        });
        res.end(data);
    } catch (e) {
        res.writeHead(404); res.end('not found');
    }
}).listen(PORT, () => console.log(`http://localhost:${PORT}/`));
