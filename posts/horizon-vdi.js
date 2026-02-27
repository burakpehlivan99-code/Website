// =============================================================
//  posts/horizon-vdi.js
//  Omnissa Horizon VDI: Connection Server Kurulum ve Yapılandırma Rehberi
//
//  Bu dosya articles['horizon-vdi'] objesini tanımlar.
//  Makaleyi düzenlemek için sadece content içindeki HTML'i değiştir.
//  tag, date, readTime bilgileri data/posts.js'te de tutulur.
// =============================================================

articles['horizon-vdi'] = {
    tag: 'VDI',
    date: '16 Şubat 2026',
    readTime: '13 dk okuma',
    content: `
<span class="article-tag">VDI · Omnissa Horizon</span>
                <h1>Omnissa Horizon VDI: Connection Server Kurulum ve Yapılandırma Rehberi</h1>
                <div class="article-meta-row">
                    <span>📅 16 Şubat 2026</span>
                    <span>⏱ 13 dk okuma</span>
                    <span>✍️ Burak Pehlivanoğlu</span>
                </div>

                <p>Omnissa (eski adıyla VMware EUC bölümü), kurumsal masaüstü ve uygulama sanallaştırma alanının en olgun çözümlerinden birine sahip. Horizon Connection Server, tüm VDI altyapısının merkez sinir sistemi olarak görev yapar; kullanıcı kimlik doğrulaması, protokol yönetimi ve desktop pool yönetiminin tamamı bu bileşen üzerinden sağlanır.</p>

                <div class="callout">
                    <strong>ℹ️ Mimari Hatırlatma:</strong> Horizon mimarisi; Connection Server, Replica Server (HA için), UAG (Unified Access Gateway - DMZ), Composer (linked-clone için), App Volumes ve DEM (Dynamic Environment Manager) bileşenlerinden oluşur. Bu rehber temel Connection Server kurulumunu kapsar.
                </div>

                <h2>Ön Gereksinimler</h2>
                <ul>
                    <li><strong>İşletim Sistemi:</strong> Windows Server 2019 veya 2022 (64-bit), domain üyesi olması önerilir</li>
                    <li><strong>Donanım:</strong> Minimum 4 vCPU, 10 GB RAM, 60 GB disk (ilk kurulum için)</li>
                    <li><strong>Ağ:</strong> Statik IP, resolvable FQDN, iç DNS kaydı</li>
                    <li><strong>Servis Hesabı:</strong> Domain'de en az iki servis hesabı oluşturun: Horizon için ve Composer için</li>
                    <li><strong>vCenter Erişimi:</strong> Connection Server'ın vCenter'a erişebilmesi için gerekli izinler tanımlanmış servis hesabı</li>
                    <li><strong>Lisans:</strong> Geçerli Horizon lisans anahtarı (Named User veya Concurrent)</li>
                </ul>

                <h2>Kurulum Adımları</h2>
                <div class="step-grid">
                    <div class="step-item">
                        <div class="step-num">1</div>
                        <div class="step-body">
                            <strong>Installer'ı Çalıştırın</strong>
                            <span>Omnissa portalından indirilen <code>VMware-Horizon-Connection-Server-x64-x.x.x.exe</code> dosyasını yönetici olarak çalıştırın.</span>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-num">2</div>
                        <div class="step-body">
                            <strong>Installation Type: Standard Server</strong>
                            <span>"Horizon Standard Server" seçin. (Replica Server yalnızca mevcut bir pod'a HA eklemek için seçilir.)</span>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-num">3</div>
                        <div class="step-body">
                            <strong>Horizon Administrators Grubu</strong>
                            <span>AD grubunu veya yerel bir grubu Horizon yönetici grubu olarak tanımlayın. Bu grup Horizon Console'a tam erişim yetkisi alır.</span>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-num">4</div>
                        <div class="step-body">
                            <strong>Data Recovery Şifresi</strong>
                            <span>LDAP veritabanının şifrelenmesi için kullanılan bu şifreyi unutmayın. Replica Server eklerken de gerekecek.</span>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-num">5</div>
                        <div class="step-body">
                            <strong>Firewall Kuralları</strong>
                            <span>Installer, Windows Firewall kurallarını otomatik oluşturabilir. Kurumsal firewall kullanıyorsanız 443, 4172 (PCoIP/Blast), 8443 portlarını manuel açmanız gerekebilir.</span>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-num">6</div>
                        <div class="step-body">
                            <strong>Kurulumu Tamamlayın ve Servisleri Doğrulayın</strong>
                            <span>"VMware Horizon View Connection Server" ve "VMware Horizon View Security Gateway" servislerinin çalıştığını kontrol edin.</span>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-num">7</div>
                        <div class="step-body">
                            <strong>Horizon Console'a Giriş</strong>
                            <span><code>https://&lt;connection-server-fqdn&gt;/admin</code> adresine Horizon Administrators grubundaki bir kullanıcıyla giriş yapın.</span>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-num">8</div>
                        <div class="step-body">
                            <strong>Lisans Ekleme</strong>
                            <span>Settings → Product Licensing and Usage menüsünden Horizon lisans anahtarınızı girin.</span>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-num">9</div>
                        <div class="step-body">
                            <strong>vCenter ve Composer Entegrasyonu</strong>
                            <span>Settings → vCenter Servers menüsünden vCenter'ı ekleyin. Servis hesabı bilgilerini girin. Composer'ı ayrı bir VM'e kurduysanız burada da tanımlayın.</span>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-num">10</div>
                        <div class="step-body">
                            <strong>İlk Desktop Pool Oluşturma</strong>
                            <span>Inventory → Desktops → Add menüsünden pool tipini seçin (Automated Full Clone, Linked Clone veya Manual). Template veya golden image'ı belirtin, kullanıcı atamalarını yapın.</span>
                        </div>
                    </div>
                </div>

                <h2>Protokol Seçimi: PCoIP vs Blast Extreme</h2>
                <p>Horizon iki temel display protokolü sunar:</p>
                <table class="compare-table">
                    <tr><th>Kriter</th><th>PCoIP</th><th>Blast Extreme</th></tr>
                    <tr><td>Protokol</td><td>UDP/4172</td><td>TCP/UDP 8443 + WebSocket</td></tr>
                    <tr><td>WAN Performansı</td><td class="tag-yellow">Orta</td><td class="tag-green">Üstün</td></tr>
                    <tr><td>HTML5 Erişim</td><td class="tag-red">Hayır</td><td class="tag-green">Evet</td></tr>
                    <tr><td>Mobil Destek</td><td class="tag-yellow">Sınırlı</td><td class="tag-green">Tam</td></tr>
                    <tr><td>USB Redirection</td><td class="tag-green">Evet</td><td class="tag-green">Evet</td></tr>
                </table>

                <div class="callout">
                    <strong>💡 Best Practice:</strong> Yeni kurulumlar için Blast Extreme protokolünü varsayılan olarak seçin. HTML5 tabanlı erişim, daha düşük bant genişliği tüketimi ve geniş cihaz desteğiyle PCoIP'nin yerini almaktadır. UAG kurulumunu ihmal etmeyin — Connection Server'ı doğrudan internet'e açmak ciddi bir güvenlik riskidir.
                </div>
    `
};
