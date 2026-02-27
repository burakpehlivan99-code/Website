// =============================================================
//  posts/_TEMPLATE.js — Yeni Makale Şablonu
//
//  KULLANIM:
//  1. Bu dosyayı kopyala: cp _TEMPLATE.js makale-adim.js
//  2. articles['makale-adim'] key'ini değiştir
//  3. tag, date, readTime bilgilerini doldur
//  4. content içine HTML yaz
//  5. data/posts.js'teki allPosts dizisine metadata ekle:
//     {
//         id: 'makale-adim',
//         category: 'VMware',        ← categoryMeta'dan bir key
//         tag: 'vSphere',
//         date: '1 Mart 2026',
//         readTime: '8 dk',
//         icon: '⚙️',
//         bg: 'post-img-2',          ← post-img-1 ... post-img-6
//         title: 'Makale Başlığı',
//         excerpt: 'Kısa açıklama...'
//     }
//  6. index.html'deki posts-grid'e kart ekle (diğer kartları örnek al)
//  7. index.html'deki <head> içine <script src="posts/makale-adim.js"> ekle
// =============================================================

articles['makale-adim'] = {
    tag: 'Kategori',
    date: '1 Mart 2026',
    readTime: '8 dk okuma',
    content: `
    <span class="article-tag">Kategori · Alt Başlık</span>
    <h1>Makale Başlığı</h1>
    <div class="article-meta-row">
        <span>📅 1 Mart 2026</span>
        <span>⏱ 8 dk okuma</span>
        <span>✍️ Burak Pehlivanoğlu</span>
    </div>

    <p>Giriş paragrafı...</p>

    <h2>Başlık</h2>
    <p>İçerik...</p>

    <!-- Bilgi kutusu -->
    <div class="callout">
        <strong>💡 İpucu:</strong> Açıklama metni.
    </div>

    <!-- Uyarı kutusu -->
    <div class="warning">
        <strong>⚠️ Dikkat:</strong> Uyarı metni.
    </div>

    <!-- Adım adım liste -->
    <div class="step-grid">
        <div class="step-item">
            <div class="step-num">1</div>
            <div class="step-body">
                <strong>Adım Başlığı</strong>
                <span>Adım açıklaması.</span>
            </div>
        </div>
    </div>

    <!-- Karşılaştırma tablosu -->
    <table class="compare-table">
        <tr><th>Özellik</th><th>Seçenek A</th><th>Seçenek B</th></tr>
        <tr>
            <td>Örnek</td>
            <td class="tag-green">İyi</td>
            <td class="tag-red">Kötü</td>
        </tr>
    </table>

    <!-- Madde listesi -->
    <ul>
        <li><strong>Önemli nokta:</strong> Açıklama</li>
    </ul>
    `
};
