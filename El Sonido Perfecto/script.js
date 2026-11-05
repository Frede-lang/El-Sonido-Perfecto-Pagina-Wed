const products = [
      {name:'Guitarra acústica Luna',category:'Cuerdas',price:389000,rating:'4.9',tag:'Favorito',image:'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=700&q=80',alt:'Guitarra acústica de madera'},
      {name:'Teclado digital Nova 61',category:'Teclas',price:749000,rating:'4.8',tag:'Para empezar',image:'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=700&q=80',alt:'Teclado musical de 61 teclas'},
      {name:'Ukelele soprano Sol',category:'Cuerdas',price:219000,rating:'4.9',tag:'Más vendido',image:'https://images.unsplash.com/photo-1588449668365-d15e397f6787?auto=format&fit=crop&w=700&q=80',alt:'Ukelele soprano'},
      {name:'Cajón peruano Raíz',category:'Percusión',price:329000,rating:'4.7',tag:'Artesanal',image:'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=700&q=80',alt:'Instrumentos de percusión'},
      {name:'Audífonos de estudio Mix',category:'Accesorios',price:279000,rating:'4.8',tag:'Estudio',image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',alt:'Audífonos para producción musical'},
      {name:'Guitarra eléctrica Prisma',category:'Cuerdas',price:899000,rating:'4.9',tag:'Nuevo',image:'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=700&q=80',alt:'Guitarra eléctrica de cuerpo sólido'},
      {name:'Batería electrónica Beat',category:'Percusión',price:1299000,rating:'4.8',tag:'En casa',image:'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=700&q=80',alt:'Set de batería'},
      {name:'Pedal de efectos Echo',category:'Accesorios',price:349000,rating:'4.7',tag:'Sonido pro',image:'https://images.unsplash.com/photo-1558098329-a11cff621064?auto=format&fit=crop&w=700&q=80',alt:'Pedal de efectos para guitarra'}
    ];
    const formatPrice = value => '$' + value.toLocaleString('es-CO');
    const grid = document.getElementById('productGrid');
    const search = document.getElementById('search');
    const categories = document.getElementById('categories');
    let selectedCategory = 'Todos';
    let cart = 0;
    let toastTimer;
    function renderProducts(){
      const query = search.value.trim().toLocaleLowerCase('es');
      const visible = products.filter(p => (selectedCategory === 'Todos' || p.category === selectedCategory) && `${p.name} ${p.category}`.toLocaleLowerCase('es').includes(query));
      grid.innerHTML = visible.length ? visible.map((p) => `<article class="product-card"><div class="product-photo"><img src="${p.image}" alt="${p.alt}" loading="lazy"><span class="tag">${p.tag}</span></div><div class="product-info"><div class="product-category">${p.category}</div><h3>${p.name}</h3><div class="rating"><span>?????</span> &nbsp;${p.rating} · 12 reseñas</div><div class="product-bottom"><span class="price">${formatPrice(p.price)}</span><button class="add-button" data-add="${p.name}" aria-label="Añadir ${p.name} al carrito">+</button></div></div></article>`).join('') : '<div class="empty-state">No encontramos instrumentos con esa búsqueda. Prueba otra palabra.</div>';
    }
    categories.addEventListener('click', event => { const button = event.target.closest('[data-category]'); if(!button) return; selectedCategory = button.dataset.category; categories.querySelectorAll('.category').forEach(item => item.classList.toggle('active', item === button)); renderProducts(); });
    search.addEventListener('input', renderProducts);
    grid.addEventListener('click', event => { const button = event.target.closest('[data-add]'); if(!button) return; cart++; document.getElementById('cartCount').textContent = cart; document.getElementById('cartCount').classList.add('has-items'); document.getElementById('cartButton').setAttribute('aria-label', `Carrito, ${cart} ${cart === 1 ? 'artículo' : 'artículos'}`); showToast(`${button.dataset.add} añadido al carrito`); });
    document.getElementById('cartButton').addEventListener('click', () => showToast(cart ? `Tienes ${cart} ${cart === 1 ? 'artículo' : 'artículos'} en tu carrito` : 'Tu carrito está vacío por ahora'));
    document.getElementById('subscribeForm').addEventListener('submit', event => { event.preventDefault(); const email = document.getElementById('email'); if(!email.checkValidity()) return email.reportValidity(); showToast('¡Listo! Te avisaremos cuando haya novedades.'); event.target.reset(); });
    function showToast(message){ const toast = document.getElementById('toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600); }
    renderProducts();
