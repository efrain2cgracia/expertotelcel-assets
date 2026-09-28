import puppeteer from '/Users/efrain2cgracia/.npm/_npx/4b4c857f6efdfb61/node_modules/puppeteer/lib/puppeteer/puppeteer.js';
import fs from 'node:fs';
import crypto from 'node:crypto';

const base = process.env.QA_BASE || 'http://127.0.0.1:8765';
const axeSource = fs.readFileSync('/Users/efrain2cgracia/Downloads/axe.min.js', 'utf8');
const routes = [
  '/',
  '/series-18/',
  '/iphone-duo/',
  '/series-17/',
  '/series-16/',
  '/modelos/18-pro-max/512gb/',
  '/modelos/18-pro-max/256gb/',
  '/modelos/18-pro/512gb/',
  '/promociones/',
  '/promociones/pospago/',
  '/promociones/prepago/',
  '/buscador-de-promociones/',
];
const widths = [390, 320];
const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const browser = await puppeteer.launch({headless:'new', args:['--no-sandbox','--disable-gpu']});
const results = [];
for (const route of routes) {
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setUserAgent(userAgent);
    await page.setViewport({width, height:844, deviceScaleFactor:1, isMobile:true, hasTouch:true});
    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];
    const badResponses = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', err => pageErrors.push(err.message));
    page.on('requestfailed', req => failedRequests.push({url:req.url(), error:req.failure()?.errorText || ''}));
    page.on('response', res => { if (res.status() >= 400) badResponses.push({url:res.url(), status:res.status()}); });
    const url = `${base}${route}?qa=${Date.now()}`;
    let response;
    let navError = null;
    try {
      response = await page.goto(url, {waitUntil:'networkidle2', timeout:90000});
      await new Promise(resolve => setTimeout(resolve, 1200));
    } catch (error) {
      navError = error.message;
    }
    let dom = null;
    if (!navError) {
      await page.addScriptTag({content:axeSource});
      dom = await page.evaluate(async () => {
        const axeResult = await window.axe.run(document, {
          runOnly:{type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa']},
        });
        const visible = element => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
        };
        const targets = [...document.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]')]
          .filter(visible)
          .map(element => {
            const rect = element.getBoundingClientRect();
            return {tag:element.tagName, text:(element.innerText || element.value || element.getAttribute('aria-label') || '').trim().slice(0,100), width:Math.round(rect.width), height:Math.round(rect.height)};
          });
        return {
          title:document.title,
          h1:[...document.querySelectorAll('h1')].map(node => node.textContent.trim()),
          canonical:document.querySelector('link[rel="canonical"]')?.href || null,
          robots:[...document.querySelectorAll('meta[name="robots"],meta[name="googlebot"]')].map(node => node.content),
          exactChat:(document.body.innerText.match(/chat\.eXpertoTelceL\.com/g) || []).length,
          chatLinks:[...document.querySelectorAll('a[href]')].filter(node => node.href === 'https://chat.expertotelcel.com/').length,
          forbidden:[...document.querySelectorAll('a[href]')].map(node => node.getAttribute('href') || '').filter(href => /(?:wa\.me|whatsapp|^tel:|^sms:)/i.test(href)),
          appDeployOverlay:document.querySelectorAll('appdeploy-overlay,script[src*="appdeploy.ai/shared/js/overlay.js"],[data-appdeploy-overlay-bootstrap]').length,
          nativeShare:document.querySelectorAll('#et-native-share').length,
          overflow:document.documentElement.scrollWidth > document.documentElement.clientWidth,
          clientWidth:document.documentElement.clientWidth,
          scrollWidth:document.documentElement.scrollWidth,
          smallTargets:targets.filter(target => target.width < 44 || target.height < 44),
          axeViolations:axeResult.violations.map(v => ({id:v.id, impact:v.impact, nodes:v.nodes.length, help:v.help})),
        };
      });
    }
    const ownFailures = failedRequests.filter(item => item.url.startsWith(base));
    const ownBad = badResponses.filter(item => item.url.startsWith(base));
    const status = response?.status() ?? null;
    const pass = !navError && status === 200 && dom && dom.h1.length === 1 && dom.robots.some(value => value.includes('noindex')) && dom.exactChat > 0 && dom.chatLinks > 0 && dom.forbidden.length === 0 && dom.appDeployOverlay === 0 && dom.nativeShare === 1 && !dom.overflow && dom.smallTargets.length === 0 && dom.axeViolations.length === 0 && consoleErrors.length === 0 && pageErrors.length === 0 && ownFailures.length === 0 && ownBad.length === 0;
    results.push({
      route,
      width,
      url,
      status,
      navError,
      ...dom,
      consoleErrors:[...new Set(consoleErrors)],
      pageErrors:[...new Set(pageErrors)],
      ownFailures,
      ownBad,
      pass,
    });
    console.log(JSON.stringify({route,width,status,pass}));
    if (route === '/' && width === 390) {
      await page.screenshot({path:'/Users/efrain2cgracia/Downloads/IPHONE_V38_FAILOVER_CANARY_LOCAL_390.png', fullPage:true});
    }
    await page.close();
  }
}
await browser.close();

const summary = {
  base,
  checks:results.length,
  passed:results.filter(result => result.pass).length,
  failed:results.filter(result => !result.pass).length,
  failures:results.filter(result => !result.pass),
};
const outputPath = process.env.QA_OUTPUT || '/Users/efrain2cgracia/Downloads/IPHONE_V38_FAILOVER_LOCAL_QA_20260927.json';
const payload = JSON.stringify({generatedAt:new Date().toISOString(), summary, results}, null, 2) + '\n';
fs.writeFileSync(outputPath, payload);
const sha256 = crypto.createHash('sha256').update(payload).digest('hex');
fs.writeFileSync(`${outputPath}.sha256`, `${sha256}  ${outputPath.split('/').pop()}\n`);
console.log(JSON.stringify(summary, null, 2));
console.log(`SHA256=${sha256}`);
if (summary.failed) process.exitCode = 2;
