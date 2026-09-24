from pathlib import Path
from urllib.request import Request, urlopen
import re, shutil, json, hashlib, tarfile

BASE = 'https://iphone.expertotelcel.com/'
OUT = Path(__file__).resolve().parent / 'out'
PUBLIC = OUT
if OUT.exists():
    shutil.rmtree(OUT)
PUBLIC.mkdir(parents=True)

paths = [
    '404.html', 'a5bd56b8bf995b435dea6f839cd81784.txt',
    'app-interface-v1.js', 'app.js', 'buscador-de-promociones/index.html',
    'favicon.svg', 'interface-v1.css', 'interfaz-v1.html',
    'iphone-duo/index.html', 'llms-full.txt', 'llms.txt',
    'model-page.css', 'model-page.js',
    'modelos/18-pro-max/1tb/index.html',
    'modelos/18-pro-max/256gb/index.html',
    'modelos/18-pro-max/2tb/index.html',
    'modelos/18-pro-max/512gb/index.html',
]
paths += [
    'modelos/18-pro/1tb/index.html',
    'modelos/18-pro/256gb/index.html',
    'modelos/18-pro/2tb/index.html',
    'modelos/18-pro/512gb/index.html',
    'preview-interface-v1.js', 'promociones/index.html',
    'promociones/pospago/celular-mas-audifonos/index.html',
    'promociones/pospago/celular-mas-reloj/index.html',
    'promociones/pospago/index.html',
    'promociones/prepago/celular-mas-audifonos/index.html',
    'promociones/prepago/celular-mas-reloj/index.html',
    'promociones/prepago/index.html',
    'promotions-data.js', 'promotions.css', 'robots.txt',
    'series-16/index.html', 'series-17/index.html',
    'series-18/index.html', 'series-pages.css', 'series-pages.js',
    'sitemap.xml', 'styles.css',
]

UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'

def fetch(url: str) -> bytes:
    req = Request(url, headers={'User-Agent': UA, 'Cache-Control': 'no-cache'})
    with urlopen(req, timeout=45) as response:
        return response.read()
PWA_BLOCK = re.compile(
    r'<!--pwa-meta-->.*?<script>if\(\'serviceWorker\'.*?</script>\s*',
    re.S,
)
SOURCE_ID = re.compile(r'\sdata-appdeploy-source-id="[^"]*"')

def clean_html(raw: bytes, *, noindex: bool = True) -> str:
    text = raw.decode('utf-8', errors='replace')
    start = text.lower().find('<!doctype html')
    if start < 0:
        start = text.lower().find('<html')
    if start >= 0:
        text = text[start:]
    text = PWA_BLOCK.sub('', text)
    text = SOURCE_ID.sub('', text)
    text = re.sub(r'<script>window\.__APPDEPLOY_APP_ID=.*?</script>', '', text, flags=re.S)
    text = text.replace('<!--appdeploy-meta-->', '')
    text = re.sub(r'<[^>]+data-appdeploy="true"[^>]*>', '', text, flags=re.I)
    text = re.sub(r'<link[^>]+rel="preconnect"[^>]+iphone-experto-telcel-zvrqk3\.v2\.appdeploy\.ai[^>]*>', '', text, flags=re.I)
    text = re.sub(r'<link[^>]+href="https://appdeploy\.ai/assets/[^"]+"[^>]*>', '', text, flags=re.I)
    text = text.replace(
        'https://iphone-experto-telcel-zvrqk3.v2.appdeploy.ai/',
        '/',
    )
    text = re.sub(
        r'<script[^>]+(?:v2\.appdeploy\.ai/shared/js/overlay\.js|data-appdeploy-overlay-bootstrap)[\s\S]*?</script>',
        '',
        text,
        flags=re.I,
    )
    if noindex:
        text = re.sub(r'<meta\s+name="(?:robots|googlebot)"[^>]*>', '', text, flags=re.I)
        text = text.replace(
            '<head>',
            '<head>\n<meta name="robots" content="noindex,nofollow">\n<meta name="googlebot" content="noindex,nofollow">',
            1,
        )
    inject = '<link rel="stylesheet" href="/share-only.css">\n<script src="/share-only.js" defer></script>'
    if '/share-only.js' not in text:
        text = text.replace('</head>', inject + '\n</head>', 1)
    return text
downloads = []
root_html = clean_html(fetch(BASE), noindex=True)
(PUBLIC / 'index.html').write_text(root_html, encoding='utf-8')
downloads.append('index.html')

for rel in paths:
    target = PUBLIC / rel
    target.parent.mkdir(parents=True, exist_ok=True)
    raw = fetch(BASE + rel)
    if rel.endswith('.html'):
        target.write_text(clean_html(raw, noindex=True), encoding='utf-8')
    else:
        target.write_bytes(raw)
    downloads.append(rel)

model_page = PUBLIC / 'modelos/18-pro-max/512gb/index.html'
model = model_page.read_text(encoding='utf-8')
model = model.replace(
    'Diseño premium en color borgoña del iPhone 18 Pro Max 512 GB con equipo a 1,396 pesos al mes, Plan Telcel desde 599 pesos y total mensual de 1,995 pesos.',
    'Ilustración conceptual generada con IA del iPhone 18 Pro Max 512 GB en color borgoña; no es una fotografía oficial.',
)
disclosure = 'Imagen promocional ilustrativa generada con IA; no es fotografía oficial. Colores y acabados reales sujetos a confirmación oficial de Apple y Telcel.'
if 'class="image-disclaimer"' in model:
    model = re.sub(r'<p class="image-disclaimer">.*?</p>', f'<p class="image-disclaimer">{disclosure}</p>', model, flags=re.S)
else:
    model = model.replace('</a></div></section><section class="section intent-bridge">', f'</a><p class="image-disclaimer">{disclosure}</p></div></section><section class="section intent-bridge">')
model_page.write_text(model, encoding='utf-8')
share_js = r"""(() => {
  'use strict';
  if (document.getElementById('et-native-share')) return;
  const button = document.createElement('button');
  button.id = 'et-native-share';
  button.className = 'et-native-share';
  button.type = 'button';
  button.setAttribute('aria-label', 'Compartir esta página');
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="M8.6 10.5 15.4 6.5M8.6 13.5l6.8 4"></path></svg>';
  const status = document.createElement('span');
  status.className = 'et-share-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  const announce = message => {
    status.textContent = message;
    window.setTimeout(() => { status.textContent = ''; }, 2200);
  };
  button.addEventListener('click', async () => {
    const data = { title: document.title, text: 'Especial iPhone de EXPERTO TELCEL', url: window.location.href };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(window.location.href);
      announce('Enlace copiado');
    } catch (error) {
      if (error && error.name === 'AbortError') return;
      try { await navigator.clipboard.writeText(window.location.href); announce('Enlace copiado'); }
      catch { announce('No se pudo compartir'); }
    }
  });
  document.body.append(button, status);
})();
"""
(PUBLIC / 'share-only.js').write_text(share_js, encoding='utf-8')
share_css = r"""
.et-native-share{display:none}
.et-share-status{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
@media (max-width:620px){
  .mobile-cta{right:76px!important}
  .mobile-sticky-cta{position:fixed!important;left:12px!important;right:76px!important;bottom:max(12px,env(safe-area-inset-bottom))!important;top:auto!important;width:auto!important;margin:0!important;z-index:60!important}
  .et-native-share{position:fixed;right:12px;bottom:max(12px,env(safe-area-inset-bottom));z-index:61;display:flex;align-items:center;justify-content:center;width:52px;height:52px;min-width:52px;min-height:52px;padding:0;border:1px solid rgba(255,255,255,.32);border-radius:50%;background:#1e40af;color:#fff;box-shadow:0 16px 40px rgba(7,21,45,.35);cursor:pointer}
  .et-native-share svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .et-native-share:focus-visible{outline:4px solid #00d2ff;outline-offset:3px}
}
"""
(PUBLIC / 'share-only.css').write_text(share_css.strip() + '\n', encoding='utf-8')

manifest = {
    'name': 'EXPERTO TELCEL — Micrositio iPhone',
    'short_name': 'iPhone ET',
    'start_url': '/',
    'display': 'standalone',
    'background_color': '#f5f7fb',
    'theme_color': '#071631',
    'icons': [],
}
(PUBLIC / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False), encoding='utf-8')
(PUBLIC / 'sw.js').write_text("self.addEventListener('fetch',()=>{});\n", encoding='utf-8')
home_path = PUBLIC / 'index.html'
home = home_path.read_text(encoding='utf-8')
home = home.replace(
    '<button class="active" type="button" data-choice="equilibrio">',
    '<button class="active" type="button" role="tab" aria-selected="true" data-choice="equilibrio">',
)
for choice in ('pantalla', 'movilidad', 'multitarea'):
    home = home.replace(
        f'<button type="button" data-choice="{choice}">',
        f'<button type="button" role="tab" aria-selected="false" data-choice="{choice}">',
    )
home = home.replace(
    '<div class="table-wrap">',
    '<div class="table-wrap" tabindex="0" aria-label="Tabla comparativa de modelos iPhone">',
)
home_path.write_text(home, encoding='utf-8')

app_js_path = PUBLIC / 'app-interface-v1.js'
app_js = app_js_path.read_text(encoding='utf-8')
app_js = app_js.replace(
    "item.classList.toggle('active', item === button);",
    "const selected = item === button;\n        item.classList.toggle('active', selected);\n        item.setAttribute('aria-selected', String(selected));",
)
app_js_path.write_text(app_js, encoding='utf-8')
styles_path = PUBLIC / 'styles.css'
styles = styles_path.read_text(encoding='utf-8')
styles += """
/* Canary accessibility hardening. */
@media (max-width:620px){
  .brand,.series-link,.card a,details summary,.footer-grid a{display:inline-flex;align-items:center;min-height:44px}
  .table-wrap:focus-visible{outline:4px solid #00d2ff;outline-offset:3px}
}
"""
styles_path.write_text(styles, encoding='utf-8')

print(json.dumps({'output': str(PUBLIC), 'files': len([p for p in PUBLIC.rglob('*') if p.is_file()])}, indent=2))
