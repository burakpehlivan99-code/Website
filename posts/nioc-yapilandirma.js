// =============================================================
//  posts/nioc-yapilandirma.js
//  vSAN ve vMotion Trafiği için NIOC (Network I/O Control) Yapılandırması
//
//  Bu dosya articles['nioc-yapilandirma'] objesini tanımlar.
//  Makaleyi düzenlemek için sadece content içindeki HTML'i değiştir.
//  tag, date, readTime bilgileri data/posts.js'te de tutulur.
// =============================================================

articles['nioc-yapilandirma'] = {
    tag: 'vSAN / NIOC',
    date: '',
    readTime: '',
    content: `
<span class="article-tag">vSAN · Network I/O Control</span>
                <h1>vSAN ve vMotion Trafiği için NIOC (Network I/O Control) Yapılandırması</h1>
                <div class="article-meta-row">
                    <span>📅 28 Ocak 2026</span><span>⏱ 8 dk okuma</span><span>✍️ Burak Pehlivanoğlu</span>
                </div>
                <p>Kurumsal sanallaştırma ortamlarında tek bir fiziksel ağ bağlantısı üzerinden farklı trafik türleri eş zamanlı akar. Özellikle 10GbE ortamlarda yoğun bir vMotion operasyonu vSAN I/O'sunu tamamen engelleyebilir. Network I/O Control (NIOC), bu sorunu trafik sınıfları bazında bant genişliği önceliklendirmesi yaparak çözer.</p>

                <h2>Önerilen NIOC Konfigürasyonu</h2>
                <table class="compare-table">
                    <tr><th>Trafik Sınıfı</th><th>Shares (Önerilen)</th><th>Limit</th><th>Açıklama</th></tr>
                    <tr><td>vSAN</td><td class="tag-green">100 (En Yüksek)</td><td>Sınırsız</td><td>Her zaman öncelikli</td></tr>
                    <tr><td>vMotion</td><td>50</td><td>4–6 Gbps</td><td>Burst'i sınırla</td></tr>
                    <tr><td>Management</td><td>20</td><td>Sınırsız</td><td>Düşük, ama garantili</td></tr>
                    <tr><td>Virtual Machine</td><td>30</td><td>Sınırsız</td><td>Genel VM trafiği</td></tr>
                    <tr><td>iSCSI / NFS</td><td>50</td><td>Sınırsız</td><td>Varsa yüksek tut</td></tr>
                </table>

                <h2>NIOC Aktif Etme</h2>
                <div class="step-grid">
                    <div class="step-item"><div class="step-num">1</div><div class="step-body"><strong>VDS Ayarlarından NIOC'u Etkinleştir</strong><span>VDS → <strong>Edit Settings → Advanced</strong> sekmesi → "Network I/O Control" seçeneğini <strong>Enabled</strong> yapın.</span></div></div>
                    <div class="step-item"><div class="step-num">2</div><div class="step-body"><strong>Resource Allocation'a Girin</strong><span>VDS → <strong>Configure → Resource Allocation</strong>. Trafik sınıflarının listelendiği ekran açılır.</span></div></div>
                    <div class="step-item"><div class="step-num">3</div><div class="step-body"><strong>vSAN Sınıfını Düzenleyin</strong><span>vSAN satırını seçin, Shares değerini <strong>High (100)</strong> yapın, Limit'i boş bırakın (unlimited).</span></div></div>
                    <div class="step-item"><div class="step-num">4</div><div class="step-body"><strong>vMotion Sınıfını Limitli Yapılandırın</strong><span>Shares: Normal (50). Limit: Toplam bant genişliğinin %50'si (10GbE için ~5 Gbps). Bu, yoğun migration dönemlerinde vSAN'ı korur.</span></div></div>
                </div>

                <div class="callout">
                    <strong>💡 10GbE Ortamlar için Kritik Tavsiye:</strong> vSAN ve vMotion aynı 10GbE uplink'i paylaşıyorsa, vMotion Limit'ini maksimum 4-5 Gbps ile sınırlandırın. Aksi halde yoğun bir migration operasyonu vSAN'ı I/O timeout'a sürükleyebilir ve VM'lerin disk erişimini geçici olarak engelleyebilir.
                </div>
    `
};
