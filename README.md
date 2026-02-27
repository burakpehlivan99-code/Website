# burakpehlivanoglu.pages.dev

Kişisel teknoloji blogu — Cloudflare Pages üzerinde çalışır.

## Dosya Yapısı

```
/
├── index.html              ← Ana sayfa (HTML yapısı ve kart listesi)
│
├── assets/
│   ├── css/
│   │   └── main.css        ← Tüm site stilleri
│   └── js/
│       └── app.js          ← Tüm site fonksiyonları (modal, arama, menü vb.)
│
├── data/
│   └── posts.js            ← Makale metadata listesi + kategori tanımları
│
└── posts/
    ├── _TEMPLATE.js        ← Yeni makale şablonu (buradan kopyala)
    ├── sanal-platform.js
    ├── vcenter-kurulum.js
    ├── horizon-vdi.js
    ├── vcenter-ha.js
    ├── vds-mimari.js
    ├── vds-loadbalancing.js
    ├── sddc-network-pool.js
    ├── nioc-yapilandirma.js
    ├── nsxt-vds.js
    └── vsan-troubleshoot.js
```

---

## Yeni Makale Eklemek

### Adım 1 — Makale dosyasını oluştur

```bash
cp posts/_TEMPLATE.js posts/yeni-makale-id.js
```

`posts/yeni-makale-id.js` dosyasını aç ve düzenle:

```js
articles['yeni-makale-id'] = {
    tag: 'VMware',
    date: '1 Mart 2026',
    readTime: '8 dk okuma',
    content: `
    <h1>Makale Başlığı</h1>
    ...
    `
};
```

### Adım 2 — Metadata ekle

`data/posts.js` dosyasındaki `allPosts` dizisine bir obje ekle:

```js
{
    id: 'yeni-makale-id',
    category: 'VMware',        // categoryMeta'dan bir key
    tag: 'vSphere',
    date: '1 Mart 2026',
    readTime: '8 dk',
    icon: '⚙️',
    bg: 'post-img-2',          // post-img-1 ... post-img-6
    title: 'Makale Başlığı',
    excerpt: 'Kısa açıklama (kart üstünde görünür)'
},
```

### Adım 3 — index.html'e script tag ekle

`index.html` dosyasının altındaki makale listesine bir satır ekle:

```html
<script src="posts/yeni-makale-id.js"></script>
```

### Adım 4 — index.html'e kart ekle

`index.html` içindeki `<div id="postsGrid">` bölümüne bir kart ekle:

```html
<article class="post-card reveal" data-category="VMware" tabindex="0" role="article"
    onclick="openArticle('yeni-makale-id')" onkeydown="if(event.key==='Enter')this.click()">
    <div class="post-img">
        <div class="post-img-inner post-img-2" aria-hidden="true">⚙️</div>
    </div>
    <div class="post-body">
        <div class="post-meta">
            <span class="post-tag">vSphere</span>
            <span class="post-date">1 Mart 2026</span>
        </div>
        <h3 class="post-title">Makale Başlığı</h3>
        <p class="post-excerpt">Kısa açıklama...</p>
        <div class="post-footer">
            <span class="post-read-time">8 dk okuma</span>
            <div class="post-arrow" aria-hidden="true">→</div>
        </div>
    </div>
</article>
```

### Adım 5 — Deploy

```bash
git add .
git commit -m "yeni makale: makale başlığı"
git push
```

Cloudflare Pages otomatik olarak deploy eder.

---

## Makale HTML Bileşenleri

### Callout (Bilgi Kutusu)
```html
<div class="callout">
    <strong>💡 İpucu:</strong> Açıklama metni.
</div>
```

### Warning (Uyarı Kutusu)
```html
<div class="warning">
    <strong>⚠️ Dikkat:</strong> Uyarı metni.
</div>
```

### Adım Adım Liste
```html
<div class="step-grid">
    <div class="step-item">
        <div class="step-num">1</div>
        <div class="step-body">
            <strong>Adım Başlığı</strong>
            <span>Açıklama</span>
        </div>
    </div>
</div>
```

### Karşılaştırma Tablosu
```html
<table class="compare-table">
    <tr><th>Özellik</th><th>A</th><th>B</th></tr>
    <tr>
        <td>Örnek</td>
        <td class="tag-green">İyi</td>   <!-- yeşil -->
        <td class="tag-red">Kötü</td>    <!-- kırmızı -->
        <!-- tag-yellow = sarı -->
    </tr>
</table>
```

---

## Yeni Kategori Eklemek

`data/posts.js` içindeki `categoryMeta` objesine ekle:

```js
'YeniKategori': { icon: '🔧', label: 'Yeni Kategori Başlığı' },
```

`index.html` içindeki kategoriler bölümüne kart ekle:

```html
<div class="cat-card reveal" role="listitem button" tabindex="0"
    onclick="filterByCategory(this, 'YeniKategori')"
    onkeydown="if(event.key==='Enter')this.click()">
    <div class="cat-icon">🔧</div>
    <div class="cat-name">Yeni Kategori</div>
    <div class="cat-count">0 yazı</div>
</div>
```
