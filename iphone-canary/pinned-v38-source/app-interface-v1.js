(() => {
  'use strict';
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#nav');
  const seriesMenu = nav?.querySelector('.nav-series-menu');

  if (menu && nav) {
    const mobile = window.matchMedia('(max-width: 980px)');
    const setMenu = (open, returnFocus = false) => {
      const expanded = mobile.matches && open;
      nav.hidden = mobile.matches && !expanded;
      nav.classList.toggle('open', expanded);
      menu.setAttribute('aria-expanded', String(expanded));
      const label = expanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación';
      menu.setAttribute('aria-label', label);
      const labelText = menu.querySelector('.sr');
      if (labelText) labelText.textContent = label;
      if (!expanded && seriesMenu instanceof HTMLDetailsElement) seriesMenu.open = false;
      if (returnFocus) menu.focus();
    };
    setMenu(false);
    menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', event => {
      if (event.target instanceof Element && event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || menu.getAttribute('aria-expanded') !== 'true') return;
      if (nav.contains(document.activeElement) || menu.contains(document.activeElement)) {
        event.preventDefault();
        setMenu(false, true);
      }
    });
    const resetMenu = () => setMenu(false);
    if (mobile.addEventListener) mobile.addEventListener('change', resetMenu);
    else mobile.addListener(resetMenu);
  }

  const markImageReady = image => {
    image.classList.remove('is-loading');
    image.classList.add('is-ready');
  };
  const settleImage = image => {
    if (!(image instanceof HTMLImageElement)) return;
    const revealWhenDecoded = () => {
      if (!image.complete || image.naturalWidth <= 0) return;
      if (typeof image.decode === 'function') {
        image.decode().catch(() => undefined).finally(() => markImageReady(image));
        return;
      }
      markImageReady(image);
    };
    image.addEventListener('load', () => markImageReady(image), { passive: true });
    image.addEventListener('error', () => {
      const fallback = image.dataset.fallback;
      if (fallback && image.dataset.fallbackTried !== 'true') {
        image.dataset.fallbackTried = 'true';
        image.src = fallback;
        return;
      }
      image.classList.remove('is-loading');
      image.closest('figure, .card-media, .series-media')?.classList.add('image-unavailable');
      image.hidden = true;
    });
    revealWhenDecoded();
    requestAnimationFrame(revealWhenDecoded);
    window.setTimeout(revealWhenDecoded, 400);
    window.setTimeout(revealWhenDecoded, 1400);
  };
  document.querySelectorAll('img.product-image').forEach(settleImage);
  document.querySelectorAll('[data-color-gallery]').forEach(gallery => {
    const image = gallery.querySelector('.gallery-image');
    const title = gallery.querySelector('[id$="-gallery-title"]');
    const caption = gallery.querySelector('[id$="-gallery-caption"]');
    gallery.querySelectorAll('[data-gallery-image]').forEach(button => {
      button.addEventListener('click', () => {
        gallery.querySelectorAll('[data-gallery-image]').forEach(item => {
          const selected = item === button;
          item.classList.toggle('active', selected);
          item.setAttribute('aria-selected', String(selected));
        });
        if (image instanceof HTMLImageElement) {
          image.hidden = false;
          image.classList.add('is-loading');
          image.classList.remove('is-ready');
          image.dataset.fallbackTried = 'false';
          image.dataset.fallback = button.dataset.galleryFallback || '';
          image.alt = button.dataset.galleryAlt || '';
          image.src = button.dataset.galleryImage || image.src;
          settleImage(image);
        }
        if (title) title.textContent = button.dataset.galleryTitle || '';
        if (caption) caption.textContent = button.dataset.galleryCaption || '';
      });
    });
  });
  const recommendations = {
    equilibrio: {
      name: 'iPhone 18 Pro',
      text: 'Una ruta inicial para quien busca una experiencia Pro equilibrada.',
    },
    pantalla: {
      name: 'iPhone 18 Pro Max',
      text: 'La alternativa tradicional para quien prioriza una pantalla amplia.',
    },
    movilidad: {
      name: 'Series iPhone 18',
      text: 'El hub para comparar iPhone 18 Pro, Pro Max, Duo y sus acabados oficiales.',
    },
    multitarea: {
      name: 'iPhone Duo',
      text: 'La opción orientativa para quien busca un formato plegable y multitarea.',
    },
  };
  const output = document.querySelector('#recommendation');
  document.querySelectorAll('.tabs button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tabs button').forEach(item => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-selected', String(selected));
      });
      const recommendation = recommendations[button.dataset.choice];
      if (output && recommendation) {
        output.innerHTML = `<small>Recomendación inicial</small><b>${recommendation.name}</b><p>${recommendation.text}</p>`;
      }
    });
  });
})();
