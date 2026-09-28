(() => {
  const raw = [
    ['IP18-P256-SOLO', 'iPhone 18 Pro 256 GB', 'solo', 29999, 1250, 1115, 1714, 26753],
    ['IP18-P256-AIR', 'iPhone 18 Pro 256 GB + AirPods 4 BES', 'airpods', 32998, 1375, 1265, 1864, 30353],
    ['IP18-P256-W40', 'iPhone 18 Pro 256 GB + Apple Watch SE 3 40 mm', 'watch', 35498, 1479, 1390, 1989, 33353],
    ['IP18-P256-W44', 'iPhone 18 Pro 256 GB + Apple Watch SE 3 44 mm', 'watch', 36248, 1510, 1427, 2026, 34253],
    ['IP18-P512-SOLO', 'iPhone 18 Pro 512 GB', 'solo', 34999, 1458, 1316, 1915, 31573],
    ['IP18-P512-AIR', 'iPhone 18 Pro 512 GB + AirPods 4 BES', 'airpods', 37998, 1583, 1441, 2040, 34572],
    ['IP18-P512-W40', 'iPhone 18 Pro 512 GB + Apple Watch SE 3 40 mm', 'watch', 40498, 1687, 1545, 2144, 37073],
    ['IP18-P512-W44', 'iPhone 18 Pro 512 GB + Apple Watch SE 3 44 mm', 'watch', 41248, 1719, 1576, 2175, 37823],
    ['IP18-P1T-SOLO', 'iPhone 18 Pro 1 TB', 'solo', 44999, 1875, 1717, 2316, 41213],
    ['IP18-P1T-AIR', 'iPhone 18 Pro 1 TB + AirPods 4 BES', 'airpods', 47998, 2000, 1842, 2441, 44213],
    ['IP18-P1T-W40', 'iPhone 18 Pro 1 TB + Apple Watch SE 3 40 mm', 'watch', 50498, 2104, 1946, 2545, 46713],
    ['IP18-P1T-W44', 'iPhone 18 Pro 1 TB + Apple Watch SE 3 44 mm', 'watch', 51248, 2135, 1978, 2577, 47463],
    ['IP18-P2T-SOLO', 'iPhone 18 Pro 2 TB', 'solo', 59999, 2500, 2319, 2918, 55663],
    ['IP18-P2T-AIR', 'iPhone 18 Pro 2 TB + AirPods 4 BES', 'airpods', 62998, 2625, 2444, 3043, 58663],
    ['IP18-P2T-W40', 'iPhone 18 Pro 2 TB + Apple Watch SE 3 40 mm', 'watch', 65498, 2729, 2548, 3147, 61163],
    ['IP18-P2T-W44', 'iPhone 18 Pro 2 TB + Apple Watch SE 3 44 mm', 'watch', 66248, 2760, 2580, 3179, 61913],
    ['IP18-PM256-SOLO', 'iPhone 18 Pro Max 256 GB', 'solo', 31999, 1333, 1195, 1794, 28683],
    ['IP18-PM256-AIR', 'iPhone 18 Pro Max 256 GB + AirPods 4 BES', 'airpods', 34998, 1458, 1345, 1944, 32283],
    ['IP18-PM256-W40', 'iPhone 18 Pro Max 256 GB + Apple Watch SE 3 40 mm', 'watch', 37498, 1562, 1470, 2069, 35283],
    ['IP18-PM256-W44', 'iPhone 18 Pro Max 256 GB + Apple Watch SE 3 44 mm', 'watch', 38248, 1594, 1508, 2107, 36183],
    ['IP18-PM512-SOLO', 'iPhone 18 Pro Max 512 GB', 'solo', 36999, 1542, 1396, 1995, 33503],
    ['IP18-PM512-AIR', 'iPhone 18 Pro Max 512 GB + AirPods 4 BES', 'airpods', 39998, 1667, 1521, 2120, 36503],
    ['IP18-PM512-W40', 'iPhone 18 Pro Max 512 GB + Apple Watch SE 3 40 mm', 'watch', 42498, 1771, 1625, 2224, 39003],
    ['IP18-PM512-W44', 'iPhone 18 Pro Max 512 GB + Apple Watch SE 3 44 mm', 'watch', 43248, 1802, 1656, 2255, 39753],
    ['IP18-PM1T-SOLO', 'iPhone 18 Pro Max 1 TB', 'solo', 46999, 1958, 1798, 2397, 43143],
    ['IP18-PM1T-AIR', 'iPhone 18 Pro Max 1 TB + AirPods 4 BES', 'airpods', 49998, 2083, 1923, 2522, 46143],
    ['IP18-PM1T-W40', 'iPhone 18 Pro Max 1 TB + Apple Watch SE 3 40 mm', 'watch', 52498, 2187, 2027, 2626, 48642],
    ['IP18-PM1T-W44', 'iPhone 18 Pro Max 1 TB + Apple Watch SE 3 44 mm', 'watch', 53248, 2219, 2058, 2657, 49393],
    ['IP18-PM2T-SOLO', 'iPhone 18 Pro Max 2 TB', 'solo', 61999, 2583, 2400, 2999, 57593],
    ['IP18-PM2T-AIR', 'iPhone 18 Pro Max 2 TB + AirPods 4 BES', 'airpods', 64998, 2708, 2525, 3124, 60593],
    ['IP18-PM2T-W40', 'iPhone 18 Pro Max 2 TB + Apple Watch SE 3 40 mm', 'watch', 67498, 2812, 2629, 3228, 63093],
    ['IP18-PM2T-W44', 'iPhone 18 Pro Max 2 TB + Apple Watch SE 3 44 mm', 'watch', 68248, 2844, 2660, 3259, 63843]
  ];
  const promotions = raw.map(([id, name, type, reference, equivalent, equipment, monthly, equipmentTotal]) => ({
    id, name, type, reference, equivalent, equipment, monthly, equipmentTotal, rent: 599, plan: 'Libre 5'
  }));
  const body = document.body;
  const view = body.dataset.catalogView || 'hub';
  const results = document.querySelector('#promotion-results');
  const summary = document.querySelector('#result-summary');
  const search = document.querySelector('#promotion-search');
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  let activeFilter = 'all';
  const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
  const typeLabel = { solo: 'Equipo', airpods: 'Equipo + audífonos', watch: 'Equipo + reloj' };
  const pageType = view.includes('airpods') ? 'airpods' : view.includes('watch') ? 'watch' : 'all';
  const isPrepago = view.startsWith('prepago');
  const isCardView = view === 'hub' || view === 'search';
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const priceType = (item) => item.type === 'solo' ? 'Precio prepago oficial con IVA' : 'Referencia calculada por componentes con IVA';

  function getVisiblePromotions() {
    const term = (search?.value || '').trim().toLocaleLowerCase('es-MX');
    return promotions.filter((item) => {
      const pageMatch = pageType === 'all' || item.type === pageType;
      const filterMatch = activeFilter === 'all' || item.type === activeFilter;
      const searchMatch = !term || `${item.id} ${item.name} ${typeLabel[item.type]}`.toLocaleLowerCase('es-MX').includes(term);
      return pageMatch && filterMatch && searchMatch;
    });
  }

  function cardMarkup(item) {
    return `<article class="promotion-card" data-promotion-id="${escapeHtml(item.id)}">
      <span class="badge">${escapeHtml(typeLabel[item.type])}</span>
      <h3>${escapeHtml(item.name)}</h3>
      <div class="price-row">
        <div class="price-box"><span>${item.type === 'solo' ? 'Precio prepago con IVA' : 'Referencia con IVA'}</span><strong>${money.format(item.reference)}</strong></div>
        <div class="price-box"><span>Total mensual desde ${escapeHtml(item.plan)}</span><strong>${money.format(item.monthly)}</strong></div>
      </div>
      <p class="card-note">${escapeHtml(priceType(item))}. Financiamiento del equipo sin intereses desde Plan Telcel ${escapeHtml(item.plan)}: ${money.format(item.equipment)} al mes durante 24 meses. Renta del plan: ${money.format(item.rent)}. Publicada 19 sep 2026 · Vence 25 sep 2026 · Versión Telcel V9.6. Disponibilidad probable, sujeta a confirmación al cotizar.</p>
    </article>`;
  }

  function pospagoTable(items) {
    const rows = items.map((item) => `<tr>
      <td><span class="badge">${escapeHtml(typeLabel[item.type])}</span><br><strong>${escapeHtml(item.name)}</strong><br><small>Publicada 19 sep 2026 · Vence 25 sep 2026 · V9.6</small></td>
      <td>${escapeHtml(item.plan)}</td>
      <td class="number">${money.format(item.rent)}</td>
      <td class="number">${money.format(item.equipment)}</td>
      <td class="number"><strong>${money.format(item.monthly)}</strong></td>
      <td class="number">${money.format(item.equipmentTotal)}</td>
      <td class="number">${money.format(item.reference)}</td>
    </tr>`).join('');
    return `<div class="table-wrap"><table class="promotion-table"><thead><tr><th>Promoción</th><th>Primer plan sin sobreprecio</th><th class="number">Renta</th><th class="number">Financiamiento del equipo sin intereses</th><th class="number">Total mensual</th><th class="number">Total equipo 24 meses</th><th class="number">Precio / referencia con IVA</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function prepagoTable(items) {
    const rows = items.map((item) => `<tr>
      <td><span class="badge">${escapeHtml(typeLabel[item.type])}</span><br><strong>${escapeHtml(item.name)}</strong><br><small>Publicada 19 sep 2026 · Vence 25 sep 2026 · V9.6</small></td>
      <td>${escapeHtml(priceType(item))}</td>
      <td class="number"><strong>${money.format(item.reference)}</strong></td>
      <td class="number">${money.format(item.equivalent)}</td>
    </tr>`).join('');
    return `<div class="table-wrap"><table class="promotion-table"><thead><tr><th>Promoción</th><th>Origen del importe</th><th class="number">Precio / referencia con IVA</th><th class="number">Equivalente ÷ 24*</th></tr></thead><tbody>${rows}</tbody></table></div><p class="card-note">* Equivalente matemático interno para comparar. No representa mensualidad ni financiamiento prepago.</p>`;
  }

  function render() {
    if (!results || !summary) return;
    const items = getVisiblePromotions();
    summary.textContent = `${items.length} ${items.length === 1 ? 'promoción encontrada' : 'promociones encontradas'}`;
    if (!items.length) {
      results.innerHTML = '<div class="empty-state"><strong>No encontramos coincidencias.</strong><br>Prueba con Pro, Pro Max, 256 GB, 512 GB, 1 TB, 2 TB, AirPods o Watch.</div>';
      return;
    }
    if (isCardView) {
      results.innerHTML = `<div class="promotion-grid">${items.map(cardMarkup).join('')}</div>`;
      return;
    }
    results.innerHTML = isPrepago ? prepagoTable(items) : pospagoTable(items);
  }

  search?.addEventListener('input', render);
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    render();
  }));
  const query = new URLSearchParams(window.location.search).get('q');
  if (query && search) search.value = query;
  render();
})();
