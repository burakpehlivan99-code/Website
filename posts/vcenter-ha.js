// =============================================================
//  posts/vcenter-ha.js
//  vCenter High Availability (HA): Best Practice Konfigürasyon Rehberi
//
//  Bu dosya articles['vcenter-ha'] objesini tanımlar.
//  Makaleyi düzenlemek için sadece content içindeki HTML'i değiştir.
//  tag, date, readTime bilgileri data/posts.js'te de tutulur.
// =============================================================

articles['vcenter-ha'] = {
    tag: 'HA & Güvenilirlik',
    date: '12 Şubat 2026',
    readTime: '10 dk okuma',
    content: `
<span class="article-tag">VMware · High Availability</span>
                <h1>vCenter High Availability (HA): Best Practice Konfigürasyon Rehberi</h1>
                <div class="article-meta-row">
                    <span>📅 12 Şubat 2026</span>
                    <span>⏱ 10 dk okuma</span>
                    <span>✍️ Burak Pehlivanoğlu</span>
                </div>

                <p>vCenter Server, bir sanallaştırma ortamının yönetim omurgasıdır. vCenter'ın çökmesi anlık olarak kritik operasyonları durdurabilir; DRS kararları alınamaz, yeni VM deployment'ı yapılamaz, HA aksiyonları tetiklenemez. Bu nedenle vCenter'ı kendisini de koruyacak şekilde yapılandırmak kritik önem taşır.</p>

                <h2>vCenter HA Nedir?</h2>
                <p>vCenter HA, VCSA'yı üç düğümlü Active-Passive-Witness mimarisinde çalıştırarak tek nokta arızasına (SPOF) karşı koruma sağlar:</p>
                <ul>
                    <li><strong>Active Node:</strong> Tüm yönetim trafiğini karşılayan, gerçek zamanlı çalışan vCenter instance'ı</li>
                    <li><strong>Passive Node:</strong> Active node'un senkronize kopyası. Failover anında anında devreye girer</li>
                    <li><strong>Witness Node:</strong> Split-brain senaryolarını önlemek için quorum sağlayan hafif düğüm (sadece 1 vCPU, 1 GB RAM gerektirir)</li>
                </ul>

                <div class="callout">
                    <strong>ℹ️ Önemli:</strong> vCenter HA, vSphere HA ile karıştırılmamalıdır. vSphere HA ESXi cluster seviyesinde VM'leri korurken, vCenter HA yalnızca VCSA'nın kendisini yüksek erişilebilir kılar.
                </div>

                <h2>Ağ Gereksinimleri</h2>
                <p>vCenter HA'nın düzgün çalışması için ağ tasarımı kritiktir:</p>
                <ul>
                    <li><strong>Management Network:</strong> Mevcut vCenter yönetim ağı — üç node da bu ağda görünür, ancak Active ve Passive'in ayrı IP'leri olur; bir "HA VIP" bu ikisi arasında sallanır</li>
                    <li><strong>HA Network (Dedicated):</strong> Active-Passive replikasyon trafiği için <strong>ayrı, izole bir ağ segmenti kesinlikle önerilir</strong>. Bu network üzerinde diğer trafik bulunmamalıdır</li>
                    <li><strong>Bant Genişliği:</strong> HA ağı için minimum 1 Gbps, büyük ortamlarda 10 Gbps önerilir</li>
                    <li><strong>Latency:</strong> Active-Passive arası RTT ≤ 10ms olmalı</li>
                </ul>

                <h2>Kurulum Adımları</h2>
                <div class="step-grid">
                    <div class="step-item">
                        <div class="step-num">1</div>
                        <div class="step-body">
                            <strong>vCenter HA Network'ü Hazırlayın</strong>
                            <span>vSphere Client üzerinde replikasyon trafiği için ayrı bir distributed port group oluşturun. Bu network'e sadece vCenter node'larının erişmesi gerekir.</span>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-num">2</div>
                        <div class="step-body">
                            <strong>vCenter HA Konfigürasyonunu Başlatın</strong>
                            <span>vSphere Client → Menu → Administration → vCenter HA → Configure yolunu izleyin. "Basic" veya "Advanced" seçeneğini tercih edin. Basic modda sistem otomatik clone yapar.</span>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-num">3</div>
                        <div class="step-body">
                            <strong>Active Node HA IP Ataması</strong>
                            <span>Mevcut VCSA'nın HA network adaptörüne bir IP atanır. Bu IP, HA replikasyon trafiği için kullanılacak.</span>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-num">4</div>
                        <div class="step-body">
                            <strong>Passive ve Witness Node Konfigürasyonu</strong>
                            <span>Sistem, Active VCSA'yı clone ederek Passive ve Witness node'larını otomatik oluşturur. Her ikisine de Management ve HA network'ü için IP ataması yapılır.</span>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-num">5</div>
                        <div class="step-body">
                            <strong>Deployment Tamamlanması ve Doğrulama</strong>
                            <span>İşlem 30–60 dakika sürebilir. Tamamlandığında vCenter HA durumu "Healthy" göstermeli. Active/Passive replikasyon durumunu izleyin.</span>
                        </div>
                    </div>
                </div>

                <h2>Best Practice'ler</h2>
                <ul>
                    <li><strong>Anti-Affinity Rule:</strong> Active, Passive ve Witness node'ların farklı ESXi host'larında çalışması için VM-VM anti-affinity rule oluşturun. Aksi durumda host arızasında tüm vCenter HA kümesi etkilenir</li>
                    <li><strong>Farklı Datastore:</strong> Her node'u mümkünse farklı datastore'lara deploy edin. Storage hatalarının etkisini sınırlar</li>
                    <li><strong>Dedicated HA NIC:</strong> HA replikasyonu için ayrı bir sanal NIC kullanın, management trafiği ile karıştırmayın</li>
                    <li><strong>Düzenli Failover Testi:</strong> 3–6 ayda bir planlı failover testi yapın. "Initiate Failover" butonu ile Passive'i Active'e yükseltebilir, ardından eski Active'i Passive olarak geri alabilirsiniz</li>
                    <li><strong>Monitoring:</strong> vRealize Operations veya Aria Operations üzerinde vCenter HA health için alarm tanımlayın</li>
                    <li><strong>Backup:</strong> HA konfigürasyonu olsa bile VAMI üzerinden file-based backup almayı ihmal etmeyin. HA mantıksal hataları (örneğin yanlış konfigürasyon) karşısında koruma sağlamaz</li>
                </ul>

                <h2>Failover Senaryoları</h2>
                <table class="compare-table">
                    <tr><th>Senaryo</th><th>Beklenen Davranış</th><th>RTO</th></tr>
                    <tr><td>Active host arızası</td><td>Otomatik failover → Passive devreye girer</td><td class="tag-green">~30-60 sn</td></tr>
                    <tr><td>Active VCSA OS crash</td><td>Otomatik failover tetiklenir</td><td class="tag-green">~60 sn</td></tr>
                    <tr><td>Ağ bölünmesi (split-brain)</td><td>Witness quorum belirler, Passive aktif olur</td><td class="tag-yellow">~2-3 dk</td></tr>
                    <tr><td>Witness arızası</td><td>HA degraded mode, failover çalışmaz</td><td class="tag-red">Manuel müdahale</td></tr>
                    <tr><td>Planlı failover</td><td>Manuel "Initiate Failover" ile anlık geçiş</td><td class="tag-green">~30 sn</td></tr>
                </table>

                <div class="warning">
                    <strong>⚠️ Kritik Uyarı:</strong> Witness node'un çalışmaması durumunda otomatik failover devre dışı kalır. Witness node'unuzu mutlaka izleyin ve bakım pencerelerinde dikkatli olun. Witness arızasında her ne kadar mevcut Active çalışmaya devam etse de, ikinci bir arıza anında sisteminiz korumasız kalır.
                </div>

                <div class="callout">
                    <strong>💡 Sonuç:</strong> vCenter HA kurumsal ortamlar için artık bir lüks değil, zorunluluktur. 30.000+ VM barındıran bir ortamda vCenter'ın 10 dakika bile erişilmez olması onlarca kritik süreç üzerinde domino etkisi yaratabilir. Doğru ağ tasarımı ve anti-affinity kurallarına dikkat edildiğinde, vCenter HA mükemmel bir dayanıklılık katmanı sunar.
                </div>
    `
};
