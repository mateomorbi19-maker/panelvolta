/* ============================================================
   Panel VoltUY — demo state + interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- DATA ---------------- */

  // Catálogo (voltbike.uy)
  const PRODUCTS = [
    { id: 'muche',         name: 'Muche',                       price: 1890, cat: 'Bicicleta eléctrica' },
    { id: 'plegable-r20',  name: 'Plegable R20',                price: 1290, cat: 'Bicicleta plegable' },
    { id: 'supercross',    name: 'SuperCross',                  price: 2390, cat: 'Bicicleta eléctrica' },
    { id: 'supervolt',     name: 'SuperVolt',                   price: 1690, cat: 'Bicicleta eléctrica' },
    { id: 'foldy',         name: 'Foldy',                       price: 1890, cat: 'Bicicleta plegable' },
    { id: 'grace',         name: 'Grace',                       price: 1490, cat: 'Bicicleta eléctrica' },
    { id: 'pedales',       name: 'Pedales De Metal',            price: 22,   cat: 'Accesorio' },
    { id: 'llanta-fat-26', name: 'Llanta FAT 26',               price: 85,   cat: 'Accesorio' },
    { id: 'amort-moto',    name: 'Amortiguador De Motopatín',   price: 50,   cat: 'Accesorio' },
    { id: 'bateria-48v',   name: 'Batería De Litio 48V 10Ah',   price: 380,  cat: 'Accesorio' },
  ];

  // Leads (demo)
  const LEADS = [
    { name: 'Lucía Pérez',     phone: '+598 99 412 380', status: 'activo',   product: 'SuperVolt',              last: 'Hace 3 min'  },
    { name: 'Javier Méndez',   phone: '+598 91 207 145', status: 'activo',   product: 'SuperCross',             last: 'Hace 1 h'    },
    { name: 'Camila Suárez',   phone: '+598 99 854 902', status: 'activo',   product: 'Foldy',                  last: 'Hace 2 h'    },
    { name: 'Martín Olivera',  phone: '+598 99 311 028', status: 'reactivado', product: 'Grace',                last: 'Hace 3 h'    },
    { name: 'Sofía Ramos',     phone: '+598 92 188 654', status: 'activo',   product: 'Plegable R20',           last: 'Hace 5 h'    },
    { name: 'Diego Vázquez',   phone: '+598 99 776 130', status: 'venta',    product: 'Muche',                  last: 'Ayer'        },
    { name: 'Ana Torres',      phone: '+598 91 552 480', status: 'seguimiento', product: 'SuperVolt + Batería', last: 'Ayer'        },
    { name: 'Federico Acosta', phone: '+598 99 145 902', status: 'seguimiento', product: 'SuperCross',          last: 'Hace 2 días' },
    { name: 'Valeria Núñez',   phone: '+598 92 088 421', status: 'frío',     product: 'Plegable R20',           last: 'Hace 18 días'},
    { name: 'Rodrigo Pérez',   phone: '+598 99 920 188', status: 'frío',     product: 'Grace',                  last: 'Hace 34 días'},
    { name: 'Inés Méndez',     phone: '+598 91 488 730', status: 'activo',   product: 'Foldy',                  last: 'Hoy 09:12'   },
    { name: 'Mauricio Silva',  phone: '+598 99 144 521', status: 'venta',    product: 'SuperVolt',              last: 'Hace 4 días' },
  ];

  const STATUS_LABELS = {
    activo:       { label: 'En conversación', cls: 'tag--ok',   action: 'Abrir chat'   },
    seguimiento:  { label: 'En seguimiento',  cls: 'tag--warm', action: 'Reactivar'    },
    reactivado:   { label: 'Reactivado',      cls: 'tag--warm', action: 'Abrir chat'   },
    'frío':       { label: 'Enfriado',        cls: 'tag--cold', action: 'Reactivar'    },
    venta:        { label: 'Cliente',         cls: 'tag--sold', action: 'Posventa'     },
  };

  /* ---------------- USERNAME ---------------- */
  try {
    const u = localStorage.getItem('voltUser');
    if (u) {
      const elName = document.getElementById('userName');
      const elGreet = document.getElementById('greetName');
      if (elName)  elName.textContent  = u;
      if (elGreet) elGreet.textContent = u;
    }
  } catch (e) {}

  /* ---------------- VIEW SWITCHING ---------------- */
  const navItems = document.querySelectorAll('.nav__item');
  const views    = document.querySelectorAll('.view');

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.view;
      navItems.forEach((b) => b.classList.toggle('is-active', b === btn));
      views.forEach((v) => v.classList.toggle('is-active', v.dataset.view === target));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* ---------------- LEADS TABLE ---------------- */
  const leadsBody = document.getElementById('leadsBody');
  function renderLeads(filter) {
    if (!leadsBody) return;
    const q = (filter || '').trim().toLowerCase();
    const rows = LEADS.filter((l) =>
      !q ||
      l.name.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      l.product.toLowerCase().includes(q)
    );

    leadsBody.innerHTML = rows.map((l) => {
      const initials = l.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
      const meta = STATUS_LABELS[l.status] || { label: l.status, cls: 'tag--cold', action: 'Acción' };
      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="chat__avatar" style="width:38px;height:38px;background:#EEF0F5;color:#1A2030;font-size:0.85rem;">${initials}</div>
              <div>
                <div class="lead-name">${escapeHtml(l.name)}</div>
                <div class="lead-sub">${escapeHtml(l.last)}</div>
              </div>
            </div>
          </td>
          <td>${escapeHtml(l.phone)}</td>
          <td><span class="tag ${meta.cls}">${meta.label}</span></td>
          <td>${escapeHtml(l.product)}</td>
          <td>${escapeHtml(l.last)}</td>
          <td class="ta-right">
            <button type="button" class="btn btn--ghost btn--sm" data-lead-action="${escapeHtml(l.name)}">${meta.action}</button>
          </td>
        </tr>
      `;
    }).join('');

    // bind actions
    leadsBody.querySelectorAll('[data-lead-action]').forEach((b) => {
      b.addEventListener('click', () => {
        const name = b.dataset.leadAction;
        showToast(`Mensaje enviado a ${name}`);
      });
    });
  }
  renderLeads();

  const leadsSearch = document.getElementById('leadsSearch');
  if (leadsSearch) {
    leadsSearch.addEventListener('input', (e) => renderLeads(e.target.value));
  }

  /* ---------------- PRODUCTS PICKER + TOTAL ---------------- */
  const productsEl = document.getElementById('products');
  const totalEl    = document.getElementById('vTotal');
  const ventaForm  = document.getElementById('ventaForm');

  if (productsEl) {
    productsEl.innerHTML = PRODUCTS.map((p) => `
      <label class="product" data-product-id="${p.id}">
        <input type="checkbox" name="prod" value="${p.id}" data-price="${p.price}" />
        <div class="product__body">
          <span class="product__cat">${escapeHtml(p.cat)}</span>
          <span class="product__name">${escapeHtml(p.name)}</span>
          <span class="product__price">USD ${formatPrice(p.price)}</span>
        </div>
      </label>
    `).join('');

    productsEl.addEventListener('change', () => {
      let total = 0;
      productsEl.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        const wrap = cb.closest('.product');
        if (cb.checked) {
          total += parseFloat(cb.dataset.price || 0);
          wrap.classList.add('is-selected');
        } else {
          wrap.classList.remove('is-selected');
        }
      });
      totalEl.textContent = formatPrice(total);
    });
  }

  if (ventaForm) {
    ventaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre  = ventaForm.nombre.value.trim();
      const tel     = ventaForm.telefono.value.trim();
      const checked = ventaForm.querySelectorAll('input[name="prod"]:checked');

      if (!nombre || !tel) {
        showToast('Completá nombre y teléfono');
        return;
      }
      if (checked.length === 0) {
        showToast('Seleccioná al menos un producto');
        return;
      }

      showToast(`Venta registrada para ${nombre} · ${checked.length} producto(s)`);

      // reset
      ventaForm.reset();
      productsEl.querySelectorAll('.product').forEach((p) => p.classList.remove('is-selected'));
      totalEl.textContent = '0';
    });
  }

  /* ---------------- AGENT TOGGLE ---------------- */
  const agentToggle = document.getElementById('agentToggle');
  const toggleLabel = document.getElementById('toggleLabel');
  const agentSub    = document.getElementById('agentSub');
  if (agentToggle) {
    agentToggle.addEventListener('change', () => {
      const active = agentToggle.checked;
      toggleLabel.textContent = active ? 'Activo' : 'Pausado';
      agentSub.textContent = active
        ? 'El agente está atendiendo el 100% de las conversaciones entrantes.'
        : 'Pausado. Las conversaciones entrantes quedan en cola y vos las contestás manualmente.';
      showToast(active ? 'Agente activado' : 'Agente pausado');
    });
  }

  /* ---------------- LOGOUT ---------------- */
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      try { localStorage.removeItem('voltUser'); } catch (e) {}
      window.location.href = 'index.html';
    });
  }

  /* ---------------- HELPERS ---------------- */
  const toast = document.getElementById('toast');
  let toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  function formatPrice(n) {
    return Number(n).toLocaleString('es-UY', { maximumFractionDigits: 0 });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }
})();
