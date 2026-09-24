(() => {
  'use strict';
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
    const data = {
      title: document.title,
      text: 'Especial iPhone de EXPERTO TELCEL',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      announce('Enlace copiado');
    } catch (error) {
      if (error && error.name === 'AbortError') return;
      try {
        await navigator.clipboard.writeText(window.location.href);
        announce('Enlace copiado');
      } catch (_) {
        announce('No se pudo compartir');
      }
    }
  });
  const mountShare = () => {
    if (!document.body) return;
    const existing = document.getElementById(button.id);
    if (existing && existing !== button) existing.remove();
    if (!button.isConnected) document.body.appendChild(button);
    if (!status.isConnected) document.body.appendChild(status);
  };
  const isVisible = element => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
  };
  const hardenMobile = () => {
    if (!window.matchMedia('(max-width: 620px)').matches) return;
    const selector = 'a[href],button,input,select,textarea,summary,[tabindex]';
    document.querySelectorAll(selector).forEach(element => {
      if (element === button || !isVisible(element)) return;
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) element.classList.add('et-touch-target');
    });
    const candidates = document.querySelectorAll('div,section,main,nav,aside,article');
    candidates.forEach(element => {
      if (!isVisible(element) || element.clientWidth <= 0) return;
      const style = getComputedStyle(element);
      const scrollable = element.scrollWidth > element.clientWidth + 1 &&
        (style.overflowX === 'auto' || style.overflowX === 'scroll');
      if (!scrollable) return;
      if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '0');
      if (!element.hasAttribute('aria-label')) element.setAttribute('aria-label', 'Contenido desplazable');
      element.classList.add('et-scrollable-region');
    });
  };
  let scheduled = false;
  const reconcile = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      mountShare();
      hardenMobile();
    });
  };
  const start = () => {
    reconcile();
    const observer = new MutationObserver(reconcile);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    [250, 800, 1600, 3200].forEach(delay => window.setTimeout(reconcile, delay));
    window.addEventListener('load', reconcile, { once: true });
    window.matchMedia('(max-width: 620px)').addEventListener?.('change', reconcile);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
