(async () => {
  'use strict';
  const status = document.getElementById('preview-status');
  try {
    const response = await fetch('./', { cache: 'no-store', credentials: 'omit' });
    if (!response.ok) throw new Error('No se pudo recuperar la portada base.');
    const html = await response.text();
    const source = new DOMParser().parseFromString(html, 'text/html');
    const hero = source.querySelector('section.hero');
    if (!hero || !source.querySelector('#contenido') || !source.querySelector('#preguntas')) {
      throw new Error('La portada base no coincide con la versión esperada.');
    }
    source.querySelectorAll('script').forEach(element => element.remove());
    hero.outerHTML = `<section class="hero et-hero" aria-labelledby="et-home-title">
      <div class="shell et-hero-layout">
        <div class="et-hero-intro">
          <p class="ey et-eyebrow">Asesoría personalizada</p>
          <h1 id="et-home-title">Elige tu iPhone. Te orientamos con tu plan TELCEL.</h1>
          <p class="lead">Compara opciones y recibe asesoría para contratación, renovación o portabilidad.</p>
        </div>
        <figure class="hero-visual">
          <img class="product-image hero-product" src="https://www.apple.com/newsroom/images/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/article/Apple-iPhone-18-Pro-2up-260909_inline.jpg.large.jpg" data-fallback="https://images.apple.com/newsroom/images/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/article/Apple-iPhone-18-Pro-2up-260909_inline.jpg.large.jpg" alt="iPhone 18 Pro de frente e iPhone 18 Pro Max por detrás, ambos en color Borgoña" width="653" height="915" loading="eager" fetchpriority="high" decoding="async">
          <p class="hero-fallback">Fotografía del producto por validar</p>
          <figcaption><strong>iPhone 18 Pro + Pro Max</strong><span>Borgoña · frente y reverso</span></figcaption>
        </figure>
        <div class="actions et-hero-actions">
          <a class="button primary" href="https://chat.expertotelcel.com/">Cotizar en mi chat <span aria-hidden="true">→</span></a>
          <a class="button ghost" href="#colores">Ver colores</a>
        </div>
        <div class="et-hero-services">
          <ul class="trust" aria-label="Asesoría y alcance"><li>Contratación</li><li>Renovación</li><li>Portabilidad</li><li>Todo México</li></ul>
          <p class="value-proposition">Acompañamiento y gestión 100% en línea, sin filas y con atención personalizada de un experto. Aprobación, documentación, disponibilidad y activación sujetas a requisitos vigentes de Telcel.</p>
        </div>
      </div>
    </section>`;
    document.body.innerHTML = source.body.innerHTML;
    document.body.className = 'et-interface-v1';
    document.body.dataset.interfaceVersion = 'E17092613-v1-candidate';
    const runtime = document.createElement('script');
    runtime.src = './app-interface-v1.js?v=E17092613-v1';
    runtime.onload = () => { document.body.dataset.previewReady = 'true'; };
    runtime.onerror = () => { document.body.dataset.previewError = 'runtime'; };
    document.body.appendChild(runtime);
  } catch (error) {
    status.textContent = 'No se pudo mostrar esta comprobación. La portada principal permanece disponible.';
    document.body.dataset.previewError = 'source';
  }
})();
