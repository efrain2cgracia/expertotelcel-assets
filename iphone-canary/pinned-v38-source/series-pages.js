(() => {
  'use strict';

  const catalog = {
    '18': {
      theme: 'theme-18',
      badge: 'Generación protagonista',
      title: 'Series iPhone 18',
      lead: 'Una experiencia visual para comparar iPhone 18 Pro, iPhone 18 Pro Max e iPhone Duo antes de solicitar orientación para tu Plan Telcel.',
      image: 'https://www.apple.com/newsroom/images/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/article/Apple-iPhone-18-Pro-color-lineup-260909_big.jpg.large.jpg',
      fallback: 'https://images.apple.com/newsroom/images/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/article/Apple-iPhone-18-Pro-color-lineup-260909_big.jpg.large.jpg',
      alt: 'Series iPhone 18 Pro en Negro, Plata, Glaciar y Borgoña',
      caption: 'Fotografía oficial Apple · acabados Pro',
      hub: '../promociones/',
      note: 'Las fotografías de Series iPhone 18 provienen de Apple. Modelos, capacidades, inventario y condiciones Telcel se confirman al cotizar.',
      models: [
        { name: 'iPhone 18 Pro', note: 'Formato Pro equilibrado.', url: '../modelos/18-pro/256gb/', capacities: ['256GB', '512GB', '1TB', '2TB'] },
        { name: 'iPhone 18 Pro Max', note: 'La alternativa Pro de mayor formato.', url: '../modelos/18-pro-max/256gb/', capacities: ['256GB', '512GB', '1TB', '2TB'] },
        { name: 'iPhone Duo', note: 'Formato plegable dentro de la generación.', url: '../iphone-duo/', capacities: ['256GB', '512GB', '1TB', '2TB'] },
      ],
    },
    duo: {
      theme: 'theme-duo',
      badge: 'Formato plegable',
      title: 'iPhone Duo',
      lead: 'Conoce la ruta visual de iPhone Duo, compara sus acabados y define modelo, capacidad y trámite antes de pedir una cotización.',
      image: 'https://www.apple.com/newsroom/images/2026/09/apple-unveils-iphone-duo/article/Apple-iPhone-Duo-colors-260909_big.jpg.large.jpg',
      fallback: 'https://images.apple.com/newsroom/images/2026/09/apple-unveils-iphone-duo/article/Apple-iPhone-Duo-colors-260909_big.jpg.large.jpg',
      alt: 'iPhone Duo en Blanco estrella y Cielo nocturno',
      caption: 'Fotografía oficial Apple · dos acabados',
      hub: 'https://expertotelcel.com/apple/iphone/duo/',
      note: 'iPhone Duo identifica el modelo de Apple. No debe confundirse con promociones DÚO Telcel que combinan equipos o accesorios.',
      models: [
        { name: 'iPhone Duo', note: 'Experiencia plegable con ruta propia de orientación.', url: 'https://expertotelcel.com/apple/iphone/duo/', capacities: ['256GB', '512GB', '1TB', '2TB'] },
      ],
    },
    '17': {
      theme: 'theme-17',
      badge: 'Familia amplia',
      title: 'Series iPhone 17',
      lead: 'Compara iPhone 17, iPhone 17e, iPhone Air, iPhone 17 Pro y iPhone 17 Pro Max sin mezclar información histórica con una oferta vigente.',
      image: 'https://i0.wp.com/expertotelcel.com/wp-content/uploads/iphone-17-serie-completa-composite-12-variantes.png?fit=1000%2C750&ssl=1',
      fallback: 'https://expertotelcel.com/wp-content/uploads/iphone-17-serie-completa-composite-12-variantes.png',
      alt: 'Series iPhone 17 con iPhone 17, iPhone Air, iPhone 17 Pro y iPhone 17 Pro Max',
      caption: 'Biblioteca EXPERTO TELCEL · optimizada por Jetpack',
      hub: 'https://expertotelcel.com/marcas/apple/iphone/series/17-2/',
      note: 'Esta experiencia conserva las URLs actuales mientras se prepara una migración canónica separada. No crea redirecciones ni sustituye el hub SEO de WordPress.',
      models: [
        { name: 'iPhone 17', note: 'Modelo base de la generación.', url: 'https://expertotelcel.com/marcas/apple/iphone/series/17-2/17-modelo/', capacities: ['256GB', '512GB'] },
        { name: 'iPhone 17e', note: 'Ruta diferenciada dentro de Series 17.', url: 'https://expertotelcel.com/marcas/apple/iphone/series/17-2/17-e/', capacities: ['256GB', '512GB'] },
        { name: 'iPhone Air', note: 'Formato Air de la familia.', url: 'https://expertotelcel.com/marcas/apple/iphone/series/17-2/air/', capacities: ['256GB', '512GB', '1TB'] },
        { name: 'iPhone 17 Pro', note: 'Modelo Pro de la generación.', url: 'https://expertotelcel.com/marcas/apple/iphone/series/17-2/17-pro/', capacities: ['256GB', '512GB', '1TB'] },
        { name: 'iPhone 17 Pro Max', note: 'Modelo Pro Max de la generación.', url: 'https://expertotelcel.com/marcas/apple/iphone/series/17-2/17-pro-max/', capacities: ['256GB', '512GB', '1TB', '2TB'] },
      ],
    },
    '16': {
      theme: 'theme-16',
      badge: 'Generación de referencia',
      title: 'Series iPhone 16',
      lead: 'Explora la familia iPhone 16 y confirma qué modelos, capacidades y condiciones continúan disponibles antes de iniciar contratación, renovación o portabilidad.',
      image: 'https://i0.wp.com/expertotelcel.com/wp-content/uploads/IPHONE-16-colores.webp?fit=1000%2C675&ssl=1',
      fallback: 'https://expertotelcel.com/wp-content/uploads/IPHONE-16-colores.webp',
      alt: 'Series iPhone 16 en varios acabados',
      caption: 'Biblioteca EXPERTO TELCEL · optimizada por Jetpack',
      hub: 'https://expertotelcel.com/marcas/apple/iphone/series/16-2/',
      note: 'Esta página sirve como experiencia visual. Disponibilidad, precios, mensualidades y promociones sólo se muestran con evidencia comercial vigente.',
      models: [
        { name: 'iPhone 16', note: 'Modelo base de la generación.', url: 'https://expertotelcel.com/marcas/apple/16-2/', capacities: ['128GB', '256GB', '512GB'] },
        { name: 'iPhone 16e', note: 'Ruta 16e de la familia.', url: 'https://expertotelcel.com/marcas/apple/16e-2/', capacities: ['128GB', '256GB', '512GB'] },
        { name: 'iPhone 16 Plus', note: 'Formato Plus de la generación.', url: 'https://expertotelcel.com/marcas/apple/16-plus/', capacities: ['128GB', '256GB', '512GB'] },
        { name: 'iPhone 16 Pro', note: 'Modelo Pro de la generación.', url: 'https://expertotelcel.com/marcas/apple/16-pro/', capacities: ['128GB', '256GB', '512GB', '1TB'] },
        { name: 'iPhone 16 Pro Max', note: 'Modelo Pro Max de la generación.', url: 'https://expertotelcel.com/marcas/apple/16-pro-max/', capacities: ['256GB', '512GB', '1TB'] },
      ],
    },
  };

  const routes = [
    { key: '18', label: 'Series 18', href: '../series-18/' },
    { key: 'duo', label: 'iPhone Duo', href: '../iphone-duo/' },
    { key: '17', label: 'Series 17', href: '../series-17/' },
    { key: '16', label: 'Series 16', href: '../series-16/' },
  ];

  const key = document.body.dataset.series;
  const page = catalog[key];
  const mount = document.querySelector('#series-shell');
  if (!page || !mount) return;

  document.body.classList.add(page.theme);

  const routeLinks = routes.map(route => `<a class="series-route" href="${route.href}"${route.key === key ? ' aria-current="page"' : ''}>${route.label}</a>`).join('');
  const modelCards = page.models.map((model, index) => `
    <article class="model-card">
      <span class="model-index">${String(index + 1).padStart(2, '0')}</span>
      <h3>${model.name}</h3>
      <p>${model.note}</p>
      <div class="capacity-list" aria-label="Capacidades de ${model.name}">${model.capacities.map(capacity => `<span>${capacity}</span>`).join('')}</div>
      <a href="${model.url}">Ver modelo y promociones →</a>
    </article>`).join('');

  mount.innerHTML = `
    <header class="series-top">
      <div class="shell series-nav">
        <a class="brand" href="../" aria-label="EXPERTO TELCEL, inicio del micrositio">
          <span class="brand-mark">ET</span>
          <b class="brand-copy">EXPERTO TELCEL<small>Especial iPhone</small></b>
        </a>
        <button class="menu" type="button" aria-expanded="false" aria-controls="nav">☰<span class="sr">Abrir menú</span></button>
        <nav id="nav" aria-label="Series iPhone y acciones principales">
          ${routeLinks}
          <a class="nav-plain" href="../#comparar">Comparar</a>
          <a class="nav-plain" href="../#plan">Plan Telcel</a>
          <a class="chat-pill" href="https://chat.expertotelcel.com/">Cotizar en mi chat</a>
        </nav>
      </div>
    </header>
    <main id="contenido">
      <section class="series-hero">
        <div class="shell hero-grid">
          <div>
            <p class="kicker">${page.badge}</p>
            <h1>${page.title}</h1>
            <p class="hero-lead">${page.lead}</p>
            <div class="hero-actions">
              <a class="button primary" href="https://chat.expertotelcel.com/">Cotizar en mi chat →</a>
              <a class="button secondary" href="${page.hub}">Ver promociones y precios</a>
            </div>
            <ul class="hero-trust">
              <li>Contratación</li>
              <li>Renovación</li>
              <li>Portabilidad</li>
              <li>Todo México</li>
            </ul>
          </div>
          <figure class="hero-visual">
            <img src="${page.image}" data-fallback="${page.fallback}" alt="${page.alt}" loading="eager" fetchpriority="high" decoding="async" />
            <figcaption>${page.caption}</figcaption>
          </figure>
        </div>
      </section>
      <nav class="route-strip" aria-label="Cambiar de serie"><div class="shell">${routeLinks}</div></nav>
      <section class="series-section">
        <div class="shell">
          <div class="section-heading">
            <div><p class="kicker" style="color:var(--accent)">Modelos y capacidades</p><h2>Elige primero la ruta correcta.</h2></div>
            <p>Estas capacidades sirven para orientar la búsqueda. La existencia regional, el trámite, la mensualidad, el pago inicial y la promoción aplicable se confirman en una cotización vigente.</p>
          </div>
          <div class="model-grid" data-count="${page.models.length}">${modelCards}</div>
          <p class="source-note">${page.note}</p>
        </div>
      </section>
      <section class="series-section decision">
        <div class="shell">
          <div class="section-heading">
            <div><p class="kicker">Antes de cotizar</p><h2>Cuatro datos aceleran tu asesoría.</h2></div>
            <p>Comparte esta información en el Chat de EXPERTO TELCEL para recibir una orientación más precisa sin inventar condiciones comerciales.</p>
          </div>
          <div class="decision-grid">
            <article class="decision-card"><b>1</b><h3>Trámite</h3><p>Contratación, renovación o portabilidad.</p></article>
            <article class="decision-card"><b>2</b><h3>Modelo</h3><p>Equipo y capacidad que estás considerando.</p></article>
            <article class="decision-card"><b>3</b><h3>Región</h3><p>Ciudad o estado para validar disponibilidad.</p></article>
            <article class="decision-card"><b>4</b><h3>Objetivo</h3><p>Mensualidad aproximada y prioridades de uso.</p></article>
          </div>
        </div>
      </section>
      <section class="series-cta">
        <div class="shell cta-grid">
          <div><p class="kicker">Atención personalizada</p><h2>Convierte la comparación en una cotización real.</h2><p>Las condiciones finales dependen de requisitos, inventario, región y evidencia comercial vigente de Telcel.</p></div>
          <a class="button primary" href="https://chat.expertotelcel.com/">Abrir mi Chat →</a>
        </div>
      </section>
    </main>
    <footer class="series-footer">
      <div class="shell footer-grid">
        <div><b>EXPERTO TELCEL</b><p>Asesoría nacional para nuevas contrataciones, renovaciones y portabilidad Telcel.</p></div>
        <div class="footer-links"><a href="../">Especial iPhone</a><a href="https://expertotelcel.com/">Sitio principal</a><a href="https://expertotelcel.com/aviso-de-privacidad/">Aviso de privacidad</a></div>
      </div>
    </footer>
    <a class="mobile-cta" href="https://chat.expertotelcel.com/">Cotizar en mi chat →</a>`;

  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', event => {
      if (!event.target.closest('a')) return;
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.focus();
    });
  }

  document.querySelectorAll('img[data-fallback]').forEach(image => {
    const reveal = () => {
      if (image.complete && image.naturalWidth > 0) image.classList.add('is-ready');
    };
    image.addEventListener('load', reveal, { passive: true });
    image.addEventListener('error', () => {
      if (image.dataset.fallback && image.dataset.fallbackTried !== 'true') {
        image.dataset.fallbackTried = 'true';
        image.src = image.dataset.fallback;
      }
    });
    reveal();
    requestAnimationFrame(reveal);
    window.setTimeout(reveal, 500);
  });
})();
