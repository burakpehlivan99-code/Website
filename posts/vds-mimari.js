// =============================================================
//  posts/vds-mimari.js
//  VCF Ortamlarında vSphere Distributed Switch (VDS) Mimarisi ve Tasarım İlkeleri
//
//  Bu dosya articles['vds-mimari'] objesini tanımlar.
//  Makaleyi düzenlemek için sadece content içindeki HTML'i değiştir.
//  tag, date, readTime bilgileri data/posts.js'te de tutulur.
// =============================================================

articles['vds-mimari'] = {
    tag: 'VCF / Ağ',
    date: '',
    readTime: '',
    content: `
<span class="article-tag">VCF · Ağ Tasarımı</span>
                <h1>VCF Ortamlarında vSphere Distributed Switch (VDS) Mimarisi ve Tasarım İlkeleri</h1>
                <div class="article-meta-row">
                    <span>📅 8 Şubat 2026</span><span>⏱ 11 dk okuma</span><span>✍️ Burak Pehlivanoğlu</span>
                </div>
                <p>VMware Cloud Foundation (VCF), kurumsal sanallaştırma ve private cloud altyapılarının tam yığın olarak yönetilmesini sağlayan entegre bir platform çözümüdür. Bu platformun ağ katmanının omurgasını oluşturan vSphere Distributed Switch (VDS), standart switch'in çok ötesinde merkezi yönetim, tutarlılık ve otomasyon imkânı sunar. VCF ortamında VDS, yalnızca bir ağ bileşeni değil; tüm domain'lerin birbirine bağlandığı stratejik bir yapı taşıdır.</p>

                <h2>Standart Switch ile Distributed Switch Arasındaki Farklar</h2>
                <p>vSphere Standard Switch (VSS), her ESXi host üzerinde bağımsız olarak yapılandırılan, host-yerel bir sanal switch'tir. Büyük ortamlarda her host'u ayrı ayrı konfigüre etme zorunluluğu tutarsızlıklara ve ciddi yönetim yüküne yol açar. vSphere Distributed Switch (VDS) ise vCenter Server üzerinde merkezi olarak yönetilen, çok sayıda host'u kapsayan sanal bir switch'tir; politika değişiklikleri tüm host'lara otomatik olarak yayılır.</p>

                <table class="compare-table">
                    <tr><th>Özellik</th><th>Standard Switch (VSS)</th><th>Distributed Switch (VDS)</th></tr>
                    <tr><td>Kapsam</td><td>Host-yerel</td><td class="tag-green">Tüm cluster / domain</td></tr>
                    <tr><td>Merkezi Yönetim</td><td class="tag-red">Hayır</td><td class="tag-green">Evet (vCenter)</td></tr>
                    <tr><td>LACP Desteği</td><td class="tag-red">Yok</td><td class="tag-green">Tam destek</td></tr>
                    <tr><td>NetFlow / Port Mirroring</td><td class="tag-red">Yok</td><td class="tag-green">Mevcut</td></tr>
                    <tr><td>NIOC (Network I/O Control)</td><td class="tag-red">Yok</td><td class="tag-green">Mevcut</td></tr>
                    <tr><td>VCF Uyumluluğu</td><td class="tag-red">Desteklenmiyor</td><td class="tag-green">Zorunlu</td></tr>
                    <tr><td>NSX-T Entegrasyonu</td><td class="tag-red">Yok</td><td class="tag-green">Doğrudan entegre</td></tr>
                </table>

                <h2>VCF Neden VDS'i Şart Koşuyor?</h2>
                <p>VCF'in mimarisi, tüm ağ konfigürasyonunun SDDC Manager tarafından otomatik olarak yönetilmesi üzerine kuruludur; yeni host ekleme, workload domain genişletme ve NSX-T transport node konfigürasyonu bu otomasyonun kapsamındadır. SDDC Manager, bu operasyonları yürütebilmek için tüm host'ların tutarlı bir ağ yapısına sahip olmasını gerektirir. VSS'nin host-yerel yapısı bu tutarlılığı garanti edemezken, VDS merkezi politika yönetimiyle bu gereksinimi doğal olarak karşılar.</p>

                <h2>Management ve Workload Domain'lerde VDS Yapısı</h2>
                <h3>Management Domain</h3>
                <p>VCF bring-up sürecinde, Management Domain için iki ayrı VDS otomatik oluşturulur: yönetim/vMotion/vSAN trafiği için VDS-1 ve NSX-T overlay tünellerini taşıyan VDS-2. Bu ayrışma, farklı trafik türleri için izole uplink politikaları uygulanmasını kolaylaştırır.</p>

                <h3>Workload Domain'ler</h3>
                <p>VI Workload Domain'leri oluşturulduğunda, SDDC Manager her domain için bağımsız bir VDS yapısı konuşlandırır. Bu domain'ler arası izolasyon, olası bir ağ sorununu yalnızca ilgili domain ile sınırlar ve farklı iş uygulamalarına özel politika esnekliği tanır.</p>

                <div class="callout">
                    <strong>💡 Tasarım İlkesi:</strong> VCF kurulumuna başlamadan önce ağ tasarımını tam olarak tamamlayın. VLAN'ları, MTU değerlerini (Geneve için 9000 byte önerilir) ve uplink sayısını net olarak belirleyin. Bring-up sonrası VDS yapısını değiştirmek ciddi operasyonel karmaşıklık yaratır.
                </div>
    `
};
