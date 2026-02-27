// =============================================================
//  posts/vds-loadbalancing.js
//  vSAN Trafik Optimizasyonu için VDS Uplink ve Load Balancing Stratejileri
//
//  Bu dosya articles['vds-loadbalancing'] objesini tanımlar.
//  Makaleyi düzenlemek için sadece content içindeki HTML'i değiştir.
//  tag, date, readTime bilgileri data/posts.js'te de tutulur.
// =============================================================

articles['vds-loadbalancing'] = {
    tag: 'vSAN / Ağ',
    date: '',
    readTime: '',
    content: `
<span class="article-tag">vSAN · Load Balancing</span>
                <h1>vSAN Trafik Optimizasyonu için VDS Uplink ve Load Balancing Stratejileri</h1>
                <div class="article-meta-row">
                    <span>📅 5 Şubat 2026</span><span>⏱ 9 dk okuma</span><span>✍️ Burak Pehlivanoğlu</span>
                </div>
                <p>vSAN, depolama trafiğini doğrudan ESXi kernel ağ yığını üzerinden taşır; bu nedenle ağ katmanındaki her tasarım kararı doğrudan I/O performansını etkiler. Özellikle 10GbE ortamlarda doğru load balancing algoritmasının seçilmesi, vSAN cluster'ının teorik kapasitesine ulaşabilmesi için kritik öneme sahiptir.</p>

                <h2>VDS Load Balancing Algoritmaları</h2>
                <table class="compare-table">
                    <tr><th>Algoritma</th><th>Nasıl Çalışır</th><th>vSAN için</th></tr>
                    <tr><td>Route Based on Originating Port</td><td>VM'nin sanal port ID'sine göre sabit uplink atar</td><td class="tag-yellow">Düşük — uplink başına tek VM</td></tr>
                    <tr><td>Route Based on IP Hash</td><td>Kaynak+hedef IP hash'ine göre yönlendirir</td><td class="tag-yellow">Orta — LACP gerektirir</td></tr>
                    <tr><td>Route Based on Source MAC</td><td>Kaynak MAC adresine göre uplink seçer</td><td class="tag-yellow">Düşük</td></tr>
                    <tr><td><strong>Route Based on Physical NIC Load</strong></td><td>Gerçek zamanlı NIC kullanımına göre dinamik dağılım</td><td class="tag-green">En iyi — önerilir</td></tr>
                    <tr><td>Explicit Failover Order</td><td>Sıralı aktif/yedek yapı</td><td class="tag-red">Uygun değil</td></tr>
                </table>

                <h2>Route Based on Physical NIC Load (LBT)</h2>
                <p>Bu algoritma, uplink kullanım oranını gerçek zamanlı izler (varsayılan eşik: %75). Bir uplink bu eşiği aşarsa, yeni trafik akışları otomatik olarak daha az yüklü uplink'e yönlendirilir. vSAN gibi yüksek I/O yoğunluklu iş yükleri için bu dinamik dengeleme, statik algoritmaların çok ötesinde verim sağlar. LBT için fiziksel switch konfigürasyonunda değişiklik gerekmez ve LACP gerektirmez.</p>

                <h2>Uplink Tasarımı: vSAN Best Practice</h2>
                <ul>
                    <li><strong>Minimum 2 uplink:</strong> Her host için en az iki fiziksel NIC, tercihen farklı fiziksel switch'lere bağlı olmalı</li>
                    <li><strong>Ayrıştırılmış VMkernel:</strong> vSAN trafiği için ayrı VMkernel port'u oluşturun ve aktif/yedek uplink atamasını diğer trafik türlerinden farklı yapın</li>
                    <li><strong>Jumbo Frame (MTU 9000):</strong> Tüm vSAN iletişim yolu boyunca MTU değerinin 9000 byte olduğunu doğrulayın</li>
                    <li><strong>NIOC ile birlikte kullan:</strong> Uplink yönetimini LBT algoritmasıyla, trafik önceliklendirmesini ise NIOC ile yapın</li>
                </ul>

                <div class="callout">
                    <strong>💡 LACP ile IP Hash:</strong> Fiziksel altyapı LACP'yi destekliyorsa VDS üzerinde LAG oluşturup IP Hash kullanabilirsiniz. Ancak LACP yapılandırma hatası vSAN iletişimini tamamen kesebilir — üretim ortamına geçmeden önce mutlaka test ortamında doğrulayın.
                </div>
    `
};
