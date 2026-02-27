// =============================================================
//  posts/nsxt-vds.js
//  NSX-T ile VDS 7.0/8.0 Yakınsaması: Yakınsak Sanal Switch (CVS) Yapısı
//
//  Bu dosya articles['nsxt-vds'] objesini tanımlar.
//  Makaleyi düzenlemek için sadece content içindeki HTML'i değiştir.
//  tag, date, readTime bilgileri data/posts.js'te de tutulur.
// =============================================================

articles['nsxt-vds'] = {
    tag: 'NSX-T / VCF',
    date: '',
    readTime: '',
    content: `
<span class="article-tag">NSX-T · VDS Yakınsaması</span>
                <h1>NSX-T ile VDS 7.0/8.0 Yakınsaması: Yakınsak Sanal Switch (CVS) Yapısı</h1>
                <div class="article-meta-row">
                    <span>📅 24 Ocak 2026</span><span>⏱ 12 dk okuma</span><span>✍️ Burak Pehlivanoğlu</span>
                </div>
                <p>NSX-T'nin ilk sürümlerinde overlay ağ trafiğini taşımak için N-VDS adı verilen ayrı bir sanal switch kullanılıyordu. Bu yaklaşım, her ESXi host'ta hem VDS hem de N-VDS'in paralel olarak yönetilmesini gerektiriyor; konfigürasyon karmaşıklığını artırıyor ve bakım yükünü ikiye katlıyordu. NSX-T 3.0 ve vSphere 7.0 ile birlikte tanıtılan yakınsak mimari, bu iki yapıyı tek bir VDS çatısı altında birleştirdi.</p>

                <h2>Eski Mimari: Paralel N-VDS Sorunları</h2>
                <ul>
                    <li>Her iki switch'in uplink, port group ve politikalarının bağımsız olarak yönetilmesi</li>
                    <li>Fiziksel NIC'lerin iki switch arasında bölünmesi (NIC başına daha az bant genişliği)</li>
                    <li>Transport node konfigürasyonlarının ayrı bir iş akışıyla yönetilmesi</li>
                    <li>Sorun gidermede iki switch katmanının eş zamanlı incelenmesi gerekliliği</li>
                </ul>

                <h2>Yeni Mimari: Yakınsak Sanal Switch (CVS)</h2>
                <table class="compare-table">
                    <tr><th>Özellik</th><th>Eski Mimari (N-VDS)</th><th>Yeni Mimari (CVS)</th></tr>
                    <tr><td>Switch Sayısı</td><td class="tag-red">2 (VDS + N-VDS)</td><td class="tag-green">1 (VDS)</td></tr>
                    <tr><td>NIC Kullanımı</td><td class="tag-red">Bölünmüş</td><td class="tag-green">Birleşik / Daha verimli</td></tr>
                    <tr><td>NIOC Kapsamı</td><td class="tag-red">Yalnızca VDS trafiği</td><td class="tag-green">Tüm trafik (NSX dahil)</td></tr>
                    <tr><td>Yönetim Karmaşıklığı</td><td class="tag-red">Yüksek</td><td class="tag-green">Düşük</td></tr>
                    <tr><td>vSphere 7+ Desteği</td><td class="tag-yellow">Destekleniyor (legacy)</td><td class="tag-green">Önerilen yol</td></tr>
                </table>

                <h2>CVS'de Transport Node Konfigürasyonu</h2>
                <div class="step-grid">
                    <div class="step-item"><div class="step-num">1</div><div class="step-body"><strong>Mevcut VDS'i Tanır</strong><span>NSX Manager, host üzerindeki VDS'i keşfeder ve NSX transport işlevleri için kullanılmak üzere seçer. Yeni bir switch oluşturmaz.</span></div></div>
                    <div class="step-item"><div class="step-num">2</div><div class="step-body"><strong>TEP VMkernel Portu Oluşturur</strong><span>VDS üzerinde Tunnel Endpoint (TEP) VMkernel port'u otomatik oluşturulur. Bu port, Geneve tünellerinin başlangıç/bitiş noktasıdır.</span></div></div>
                    <div class="step-item"><div class="step-num">3</div><div class="step-body"><strong>NSX-T Segment'lerini VDS'e Bağlar</strong><span>NSX-T Segment'leri doğrudan VDS port group'larına eşlenir. VM'ler bu port group'lara bağlanarak NSX politikalarından yararlanır.</span></div></div>
                </div>

                <div class="callout">
                    <strong>💡 VCF'te CVS:</strong> VCF 4.0 ve sonrasında oluşturulan tüm ortamlar CVS mimarisini kullanır. SDDC Manager, Workload Domain oluşturulurken transport node profilini otomatik olarak CVS yapısıyla konfigüre eder.
                </div>
    `
};
