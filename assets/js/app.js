// =============================================================
//  assets/js/app.js — Site fonksiyonları
//  Veri dosyaları ayrı tutulur:
//    data/posts.js       → Makale metadata ve kategori tanımları
//    posts/<id>.js       → Her makalenin HTML içeriği
// =============================================================

// articles objesi posts/*.js tarafından doldurulur
const articles = {};



// ===== ARTICLE MODAL =====
        function openArticle(id) {
            const article = articles[id];
            if (!article) return;
            const modal = document.getElementById('articleModal');
            const content = document.getElementById('articleContent');
            content.innerHTML = article.content;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.getElementById('articlePanel').scrollTop = 0;
            // Focus management
            setTimeout(() => document.querySelector('.article-modal-close').focus(), 100);
        }

        function closeArticle() {
            document.getElementById('articleModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeArticle();
                closeSearch();
                closeMobileMenu();
                closeCatPage();
            }
        });
        function toggleTheme() {
            const html = document.documentElement;
            const isDark = html.getAttribute('data-theme') !== 'light';
            const newTheme = isDark ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update thumb emoji
            document.querySelectorAll('.theme-toggle-thumb').forEach(thumb => {
                thumb.textContent = newTheme === 'light' ? '☀️' : '🌙';
            });

            // Update theme-color meta
            document.querySelector('meta[name="theme-color"]').setAttribute('content',
                newTheme === 'light' ? '#f5f5f7' : '#0a0a0f'
            );
        }

        // ===== HERO MAKALE SAYACI =====
        // allPosts.length otomatik okunur; yeni yazi eklenince guncelleme gerekmez
        (function() {
            const statEl = document.querySelector('.hero-stats .hero-stat:first-child h3');
            if (statEl && typeof allPosts !== 'undefined') statEl.textContent = allPosts.length;
        })();

        // Apply saved theme on load
        (function() {
            const saved = localStorage.getItem('theme') ||
                (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
            if (saved === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
                document.querySelectorAll('.theme-toggle-thumb').forEach(thumb => {
                    thumb.textContent = '☀️';
                });
            }
        })();

        // ===== READING PROGRESS BAR =====
        const progressBar = document.getElementById('progressBar');
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = (scrollTop / docHeight * 100) + '%';
        }, { passive: true });

        // ===== NAVBAR SCROLL EFFECT =====
        window.addEventListener('scroll', () => {
            document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
            document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        // ===== SCROLL REVEAL =====
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('visible'), i * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // ===== TOAST NOTIFICATION =====
        let toastTimer;
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const icon = type === 'success' ? '✅' : '❌';
            toast.innerHTML = icon + ' ' + message;
            toast.className = 'toast ' + type + ' show';
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
        }

        // ===== SUBSCRIBE =====
        function subscribe() {
            const input = document.querySelector('.newsletter-form input');
            const btn = document.querySelector('.newsletter-form button');
            const email = input.value.trim();

            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                btn.textContent = '✓ Kayıt Oldu!';
                btn.style.background = '#10b981';
                input.value = '';
                input.style.borderColor = '';
                showToast('Bültene başarıyla kaydoldunuz! 🎉', 'success');
                setTimeout(() => {
                    btn.textContent = 'Abone Ol';
                    btn.style.background = '';
                }, 3000);
            } else {
                input.style.borderColor = '#ef4444';
                input.setAttribute('aria-invalid', 'true');
                showToast('Lütfen geçerli bir e-posta adresi girin.', 'error');
                setTimeout(() => {
                    input.style.borderColor = '';
                    input.removeAttribute('aria-invalid');
                }, 2500);
                input.focus();
            }
        }

        // Allow Enter key in newsletter input
        document.querySelector('.newsletter-form input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') subscribe();
        });

        // ===== MOBILE MENU =====
        function openMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            const overlay = document.getElementById('mobileOverlay');
            const btn = document.getElementById('mobileMenuBtn');
            overlay.style.display = 'block';
            // Force reflow before adding active so transition fires
            void overlay.offsetWidth;
            menu.classList.add('active');
            overlay.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            const overlay = document.getElementById('mobileOverlay');
            const btn = document.getElementById('mobileMenuBtn');
            menu.classList.remove('active');
            overlay.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            setTimeout(() => { overlay.style.display = 'none'; }, 350);
        }

        // Mobile menu link navigation - close menu first, then scroll after short delay
        document.querySelectorAll('.mobile-menu a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('href');
                closeMobileMenu();
                setTimeout(() => {
                    const el = document.querySelector(target);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 400);
            });
        });

        // ===== SEARCH =====
        // allPosts, data/posts.js'ten otomatik gelir — buraya elle ekleme gerekmez

        function openSearch() {
            const overlay = document.getElementById('searchOverlay');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => document.getElementById('searchInput').focus(), 100);
        }

        function closeSearch() {
            document.getElementById('searchOverlay').classList.remove('active');
            document.body.style.overflow = '';
            document.getElementById('searchInput').value = '';
            document.getElementById('searchResults').innerHTML = '';
        }

        document.getElementById('searchInput').addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase().trim();
            const resultsEl = document.getElementById('searchResults');
            if (!q) { resultsEl.innerHTML = ''; return; }

            const filtered = allPosts.filter(p =>
                p.title.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q)
            );

            if (filtered.length === 0) {
                resultsEl.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted)">Sonuç bulunamadı 🔍</div>';
                return;
            }

            resultsEl.innerHTML = filtered.map(p => `
                <div class="search-result-item" onclick="closeSearch();openArticle('${p.id}')" tabindex="0" onkeydown="if(event.key==='Enter')this.click()">
                    <span class="search-result-tag">${p.tag}</span>
                    <span class="search-result-title">${p.title}</span>
                </div>
            `).join('');
        });

        document.getElementById('searchOverlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('searchOverlay')) closeSearch();
        });

        // ===== KEYBOARD SHORTCUTS =====
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openSearch();
            }
        });

        function filterByCategory(el, category) {
            // Remove active from all category cards
            document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active-cat'));
            el.classList.add('active-cat');

            // Build matching posts
            const matched = allPosts.filter(p =>
                p.category.toLowerCase() === category.toLowerCase() ||
                p.tag.toLowerCase().includes(category.toLowerCase())
            );

            const meta = categoryMeta[category] || { icon: '📁', label: category };

            // Populate category page
            document.getElementById('catPageLabel').textContent = '// ' + category;
            document.getElementById('catPageTitle').textContent = meta.label + ' Yazıları';
            document.getElementById('catPageIcon').textContent = meta.icon;

            const grid = document.getElementById('catPageGrid');
            if (matched.length === 0) {
                grid.innerHTML = `
                    <div class="cat-page-empty">
                        <span class="empty-icon">🔍</span>
                        <strong>Bu kategoride henüz yazı yok.</strong>
                        <p>Yakında içerik ekleniyor, takipte kal!</p>
                    </div>`;
            } else {
                grid.innerHTML = matched.map(p => `
                    <article class="post-card" tabindex="0" role="article"
                        onclick="openArticle('${p.id}')" onkeydown="if(event.key==='Enter')this.click()"
                        style="cursor:pointer; animation: fadeUp 0.5s ease both;">
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
                    </article>
                `).join('');
            }

            // Open the category page
            const page = document.getElementById('catPage');
            page.classList.add('active');
            page.scrollTop = 0;
            document.body.style.overflow = 'hidden';
        }

        function closeCatPage() {
            document.getElementById('catPage').classList.remove('active');
            document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active-cat'));
            document.body.style.overflow = '';
        }
