// =============================================================
//  assets/js/app.js — Site fonksiyonları
//
//  YENİ MAKALE EKLEMEK İÇİN (sadece 2 adım):
//    1. posts/<id>.html  → makale içeriği (saf HTML)
//    2. data/posts.js    → allPosts dizisine metadata satırı ekle
//
//  Kartlar otomatik render edilir, script tag eklemeye gerek yok.
//  Tüm kod IIFE içinde — global namespace kirliliği yok.
// =============================================================

(function () {

    // ── iç cache: fetch edilen makaleleri tekrar yüklememek için ──
    const _cache = {};

    // ── scroll reveal observer (renderCards'tan önce tanımlanmalı) ──
    const _observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                _observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    // ================================================================
    //  TARİH YARDIMCISI — Türkçe tarih string'ini Date'e çevirir
    // ================================================================
    const _MONTHS = { 'Ocak':0,'Şubat':1,'Mart':2,'Nisan':3,'Mayıs':4,
                      'Haziran':5,'Temmuz':6,'Ağustos':7,'Eylül':8,
                      'Ekim':9,'Kasım':10,'Aralık':11 };
    function _parseDate(s) {
        const [d, m, y] = s.split(' ');
        return new Date(+y, _MONTHS[m] ?? 0, +d);
    }

    // Sıralanmış allPosts (en yeni önce) — diğer fonksiyonlar da kullanır
    function _sortedPosts() {
        if (typeof allPosts === 'undefined') return [];
        return [...allPosts].sort((a, b) => _parseDate(b.date) - _parseDate(a.date));
    }

    // ================================================================
    //  KART RENDER — allPosts'tan otomatik üret, index.html'e elle
    //  kart HTML'i eklemeye gerek kalmaz.
    //  Ana sayfada en güncel 7 yazı gösterilir.
    //  makaleler.html'de (id="allPostsPage" olan) tümü gösterilir.
    // ================================================================
    function renderCards() {
        const grid = document.getElementById('postsGrid');
        if (!grid || typeof allPosts === 'undefined') return;

        const sorted  = _sortedPosts();
        const isAll   = !!document.getElementById('allPostsPage');
        const posts   = isAll ? sorted : sorted.slice(0, 7);

        // Hero makale sayacını güncelle (sadece index)
        const stat = document.querySelector('.hero-stats .hero-stat:first-child h3');
        if (stat) stat.textContent = allPosts.length;

        // Makaleler sayfasında toplam sayıyı göster
        const counter = document.getElementById('postsTotalCount');
        if (counter) counter.textContent = allPosts.length;

        posts.forEach(p => {
            const card = document.createElement('article');
            card.className = 'post-card reveal';
            card.dataset.category = p.category;
            card.tabIndex = 0;
            card.setAttribute('role', 'article');
            card.setAttribute('aria-label', `${p.title} makalesini oku`);
            card.innerHTML = `
                <div class="post-img">
                    <div class="post-img-inner ${p.bg}" aria-hidden="true">${p.icon}</div>
                </div>
                <div class="post-body">
                    <div class="post-meta">
                        <span class="post-tag">${p.tag}</span>
                        <span class="post-date">${p.date}</span>
                    </div>
                    <h3 class="post-title">${p.title}</h3>
                    <p class="post-excerpt">${p.excerpt}</p>
                    <div class="post-footer">
                        <span class="post-read-time">${p.readTime} okuma</span>
                        <div class="post-arrow" aria-hidden="true">→</div>
                    </div>
                </div>
            `;
            card.onclick = () => openArticle(p.id);
            card.onkeydown = e => { if (e.key === 'Enter') openArticle(p.id); };
            grid.appendChild(card);
            _observer.observe(card);
        });
    }

    // ================================================================
    //  MAKALE MODAL — Fetch ile lazy load, sadece tıklanınca yüklenir
    // ================================================================
    async function openArticle(id) {
        const modal   = document.getElementById('articleModal');
        const content = document.getElementById('articleContent');
        const panel   = document.getElementById('articlePanel');

        // Anında loading göster
        content.innerHTML = `
            <div class="article-loading">
                <div class="loading-spinner"></div>
                <p>Yükleniyor...</p>
            </div>`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        panel.scrollTop = 0;

        // Paylaşılabilir URL — her makale kendi hash'ine sahip
        history.pushState({ articleId: id }, '', `#${id}`);

        // Cache kontrolü
        if (_cache[id]) {
            content.innerHTML = _cache[id];
            _focusClose();
            return;
        }

        // Lazy fetch — sadece tıklanınca indir
        try {
            const res = await fetch(`posts/${id}.html`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const html = await res.text();
            _cache[id] = html;
            content.innerHTML = html;
        } catch {
            content.innerHTML = `
                <div style="text-align:center;padding:3rem;color:var(--text-muted)">
                    <div style="font-size:3rem;margin-bottom:1rem">⚠️</div>
                    <p>İçerik yüklenemedi. Lütfen tekrar deneyin.</p>
                </div>`;
        }

        _focusClose();
    }

    function closeArticle() {
        document.getElementById('articleModal').classList.remove('active');
        document.body.style.overflow = '';
        history.pushState(null, '', location.pathname);
    }

    function _focusClose() {
        setTimeout(() => document.querySelector('.article-modal-close')?.focus(), 100);
    }

    // ================================================================
    //  HASH ROUTING — URL'den makale aç, geri/ileri tuşları çalışır
    // ================================================================
    function _handleHash() {
        const id = location.hash.slice(1);
        if (id && typeof allPosts !== 'undefined' && allPosts.find(p => p.id === id)) {
            openArticle(id);
        } else {
            document.getElementById('articleModal')?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    window.addEventListener('popstate', _handleHash);

    // ================================================================
    //  TEMA
    // ================================================================
    function toggleTheme() {
        const html     = document.documentElement;
        const isDark   = html.getAttribute('data-theme') !== 'light';
        const newTheme = isDark ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        document.querySelectorAll('.theme-toggle-thumb').forEach(t => {
            t.textContent = newTheme === 'light' ? '☀️' : '🌙';
        });
        document.querySelector('meta[name="theme-color"]')
            ?.setAttribute('content', newTheme === 'light' ? '#f5f5f7' : '#0a0a0f');
    }

    (function applyTheme() {
        const saved = localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        if (saved === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            document.querySelectorAll('.theme-toggle-thumb').forEach(t => t.textContent = '☀️');
        }
    })();

    // ================================================================
    //  PROGRESS BAR & NAVBAR
    // ================================================================
    const _progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const scrollTop  = window.scrollY;
        const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
        if (_progressBar) _progressBar.style.width = (scrollTop / docHeight * 100) + '%';
        document.getElementById('navbar')?.classList.toggle('scrolled', scrollTop > 50);
        document.getElementById('scrollTop')?.classList.toggle('visible', scrollTop > 400);
    }, { passive: true });

    // Statik .reveal elemanları (hero, sections vb.)
    document.querySelectorAll('.reveal').forEach(el => _observer.observe(el));

    // ================================================================
    //  TOAST
    // ================================================================
    let _toastTimer;
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.innerHTML = `${type === 'success' ? '✅' : '❌'} ${message}`;
        toast.className = `toast ${type} show`;
        clearTimeout(_toastTimer);
        _toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // ================================================================
    //  NEWSLETTER
    // ================================================================
    function subscribe() {
        const input = document.querySelector('.newsletter-form input');
        const btn   = document.querySelector('.newsletter-form button');
        if (!input || !btn) return;
        const email = input.value.trim();
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            btn.textContent    = '✓ Kayıt Oldu!';
            btn.style.background = '#10b981';
            input.value        = '';
            showToast('Bültene başarıyla kaydoldunuz! 🎉', 'success');
            setTimeout(() => { btn.textContent = 'Abone Ol'; btn.style.background = ''; }, 3000);
        } else {
            input.style.borderColor = '#ef4444';
            input.setAttribute('aria-invalid', 'true');
            showToast('Lütfen geçerli bir e-posta adresi girin.', 'error');
            setTimeout(() => { input.style.borderColor = ''; input.removeAttribute('aria-invalid'); }, 2500);
            input.focus();
        }
    }

    document.querySelector('.newsletter-form input')
        ?.addEventListener('keydown', e => { if (e.key === 'Enter') subscribe(); });

    // ================================================================
    //  MOBİL MENÜ
    // ================================================================
    function openMobileMenu() {
        const menu    = document.getElementById('mobileMenu');
        const overlay = document.getElementById('mobileOverlay');
        if (!menu || !overlay) return;
        overlay.style.display = 'block';
        void overlay.offsetWidth;
        menu.classList.add('active');
        overlay.classList.add('active');
        document.getElementById('mobileMenuBtn')?.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        const menu    = document.getElementById('mobileMenu');
        const overlay = document.getElementById('mobileOverlay');
        if (!menu || !overlay) return;
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.getElementById('mobileMenuBtn')?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        setTimeout(() => { overlay.style.display = 'none'; }, 350);
    }

    document.querySelectorAll('.mobile-menu a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            closeMobileMenu();
            setTimeout(() => {
                document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);
        });
    });

    // ================================================================
    //  ARAMA
    // ================================================================
    function openSearch() {
        document.getElementById('searchOverlay')?.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => document.getElementById('searchInput')?.focus(), 100);
    }

    function closeSearch() {
        document.getElementById('searchOverlay')?.classList.remove('active');
        document.body.style.overflow = '';
        const inp = document.getElementById('searchInput');
        if (inp) inp.value = '';
        const res = document.getElementById('searchResults');
        if (res) res.innerHTML = '';
    }

    document.getElementById('searchInput')?.addEventListener('input', e => {
        const q         = e.target.value.toLowerCase().trim();
        const resultsEl = document.getElementById('searchResults');
        if (!resultsEl) return;
        if (!q) { resultsEl.innerHTML = ''; return; }

        const posts    = typeof allPosts !== 'undefined' ? allPosts : [];
        const filtered = posts.filter(p =>
            p.title.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q)
        );

        if (filtered.length === 0) {
            resultsEl.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted)">Sonuç bulunamadı 🔍</div>';
            return;
        }

        resultsEl.innerHTML = filtered.map(p => `
            <div class="search-result-item"
                onclick="closeSearch();openArticle('${p.id}')"
                tabindex="0"
                onkeydown="if(event.key==='Enter')this.click()">
                <span class="search-result-tag">${p.tag}</span>
                <span class="search-result-title">${p.title}</span>
            </div>
        `).join('');
    });

    document.getElementById('searchOverlay')?.addEventListener('click', e => {
        if (e.target === document.getElementById('searchOverlay')) closeSearch();
    });

    // Escape tuşu
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { closeArticle(); closeSearch(); closeMobileMenu(); closeCatPage(); }
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    });

    // ================================================================
    //  KATEGORİ FİLTRE
    // ================================================================
    function filterByCategory(el, category) {
        document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active-cat'));
        el.classList.add('active-cat');

        const posts   = typeof allPosts !== 'undefined' ? allPosts : [];
        const matched = posts.filter(p =>
            p.category.toLowerCase() === category.toLowerCase() ||
            p.tag.toLowerCase().includes(category.toLowerCase())
        );
        const meta = (typeof categoryMeta !== 'undefined' ? categoryMeta : {})[category]
            || { icon: '📁', label: category };

        document.getElementById('catPageLabel').textContent = `// ${category}`;
        document.getElementById('catPageTitle').textContent = `${meta.label} Yazıları`;
        document.getElementById('catPageIcon').textContent  = meta.icon;

        const grid = document.getElementById('catPageGrid');
        if (!grid) return;

        grid.innerHTML = matched.length === 0
            ? `<div class="cat-page-empty">
                   <span class="empty-icon">🔍</span>
                   <strong>Bu kategoride henüz yazı yok.</strong>
                   <p>Yakında içerik ekleniyor, takipte kal!</p>
               </div>`
            : matched.map(p => `
                <article class="post-card" tabindex="0" role="article"
                    onclick="openArticle('${p.id}')" onkeydown="if(event.key==='Enter')this.click()"
                    style="cursor:pointer;animation:fadeUp 0.5s ease both;">
                    <div class="post-img">
                        <div class="post-img-inner ${p.bg}">${p.icon}</div>
                    </div>
                    <div class="post-body">
                        <div class="post-meta">
                            <span class="post-tag">${p.tag}</span>
                            <span class="post-date">${p.date}</span>
                        </div>
                        <h3 class="post-title">${p.title}</h3>
                        <p class="post-excerpt">${p.excerpt}</p>
                        <div class="post-footer">
                            <span class="post-read-time">${p.readTime} okuma</span>
                            <div class="post-arrow">→</div>
                        </div>
                    </div>
                </article>`).join('');

        const page = document.getElementById('catPage');
        page?.classList.add('active');
        if (page) page.scrollTop = 0;
        document.body.style.overflow = 'hidden';
    }

    function closeCatPage() {
        document.getElementById('catPage')?.classList.remove('active');
        document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active-cat'));
        document.body.style.overflow = '';
    }

    // ================================================================
    //  INIT
    // ================================================================
    document.addEventListener('DOMContentLoaded', () => {
        renderCards();
        if (location.hash) _handleHash();
    });

    // HTML onclick handler'larının erişebilmesi için global'e aç
    window.openArticle      = openArticle;
    window.closeArticle     = closeArticle;
    window.toggleTheme      = toggleTheme;
    window.showToast        = showToast;
    window.subscribe        = subscribe;
    window.openMobileMenu   = openMobileMenu;
    window.closeMobileMenu  = closeMobileMenu;
    window.openSearch       = openSearch;
    window.closeSearch      = closeSearch;
    window.filterByCategory = filterByCategory;
    window.closeCatPage     = closeCatPage;

})();
