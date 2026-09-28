(() => {
  'use strict';

  const page = window.MODEL_PAGE;
  if (!page) return;

  const money = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  });
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[char]));

  const capacityMount = document.querySelector('#capacity-nav');
  if (capacityMount) {
    capacityMount.innerHTML = page.capacities.map((capacity) => {
      const current = capacity.slug === page.capacitySlug ? ' aria-current="page"' : '';
      return `<a href="../${escapeHtml(capacity.slug)}/"${current}>${escapeHtml(capacity.label)}</a>`;
    }).join('');
  }

  const promotionMount = document.querySelector('#model-promotions');
  if (promotionMount) {
    promotionMount.innerHTML = `<div class="promotion-grid">${page.promotions.map((promotion) => `
      <article class="promotion-card">
        <span class="badge">${escapeHtml(promotion.kind)}</span>
        <h3>${escapeHtml(promotion.name)}</h3>
        <dl>
          <dt>Financiamiento del equipo sin intereses desde ${escapeHtml(page.plan)}</dt><dd>${money.format(promotion.equipment)}/mes</dd>
          <dt>Renta del plan</dt><dd>${money.format(page.rent)}/mes</dd>
          <dt>Total mensual</dt><dd>${money.format(promotion.monthly)}</dd>
          <dt>Total del equipo en 24 meses</dt><dd>${money.format(promotion.equipmentTotal)}</dd>
          <dt>${escapeHtml(promotion.referenceLabel)}</dt><dd>${money.format(promotion.reference)}</dd>
        </dl>
        <p class="meta">Publicada 19 sep 2026 · Vence 25 sep 2026 · Versión Telcel V9.6.</p>
        <a href="https://chat.expertotelcel.com/">Cotizar esta promoción con Efraín →</a>
      </article>`).join('')}</div>`;
  }
})();