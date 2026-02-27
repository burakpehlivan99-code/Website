// =============================================================
//  posts/sddc-network-pool.js
//  VCF SDDC Manager ile Network Pool Yönetimi ve VDS Entegrasyonu
//
//  Bu dosya articles['sddc-network-pool'] objesini tanımlar.
//  Makaleyi düzenlemek için sadece content içindeki HTML'i değiştir.
//  tag, date, readTime bilgileri data/posts.js'te de tutulur.
// =============================================================

articles['sddc-network-pool'] = {
    tag: 'VCF / SDDC',
    date: '',
    readTime: '',
    content: `
<span class="article-tag">VCF · SDDC Manager</span>
                <h1>VCF SDDC Manager ile Network Pool Yönetimi ve VDS Entegrasyonu</h1>
                <div class="article-meta-row">
                    <span>📅 1 Şubat 2026</span><span>⏱ 10 dk okuma</span><span>✍️ Burak Pehlivanoğlu</span>
                </div>
                <p>VMware Cloud Foundation'ın en güçlü özelliklerinden biri, ağ konfigürasyonunu insan müdahalesi gerektirmeden otomatik olarak yönetebilmesidir. Bu otomasyonun temel yapı taşı olan Network Pool, SDDC Manager'ın yeni host'lar eklendiğinde ağ kaynaklarını nasıl tahsis edeceğini önceden belirleyen bir şablondur.</p>

                <div class="callout">
                    <strong>ℹ️ Kritik Nokta:</strong> Network Pool konfigürasyonu, VCF bring-up işleminden önce tamamlanmalıdır. Management Domain'in ağ ayarları bring-up JSON dosyasında yer alırken, Workload Domain'ler için Network Pool'lar SDDC Manager UI üzerinden oluşturulur.
                </div>

                <h2>Network Pool Oluşturma Adımları</h2>
                <div class="step-grid">
                    <div class="step-item"><div class="step-num">1</div><div class="step-body"><strong>SDDC Manager'a Giriş</strong><span>Sol menüden <strong>Network Settings → Network Pools → Add Network Pool</strong> yolunu izleyin.</span></div></div>
                    <div class="step-item"><div class="step-num">2</div><div class="step-body"><strong>vMotion Ağ Konfigürasyonu</strong><span>vMotion VLAN ID'sini, MTU değerini, IP aralığını, subnet mask ve gateway bilgilerini girin. Bu VLAN'ın fiziksel switch'te trunk olarak geçirildiğinden emin olun.</span></div></div>
                    <div class="step-item"><div class="step-num">3</div><div class="step-body"><strong>vSAN Ağ Konfigürasyonu</strong><span>vSAN VLAN ID'sini girin, MTU değerini 9000 (Jumbo Frame) olarak ayarlayın. vSAN için mutlaka ayrı bir VLAN ve IP subnet kullanın.</span></div></div>
                    <div class="step-item"><div class="step-num">4</div><div class="step-body"><strong>IP Aralığı Doğrulaması</strong><span>Tanımladığınız IP aralığının, domain'e eklemek istediğiniz maksimum host sayısını karşıladığından emin olun. Her host için bir vMotion ve bir vSAN VMkernel IP'si gerekir.</span></div></div>
                </div>

                <h2>SDDC Manager'ın VDS Port Group Otomasyonu</h2>
                <p>Network Pool tanımlandıktan sonra, bir Workload Domain oluşturulduğunda veya mevcut domain'e host eklendiğinde SDDC Manager şunları otomatik gerçekleştirir: VDS oluşturulur, vMotion ve vSAN VLAN'larına karşılık gelen Port Group'lar oluşturulur, her host için Pool'dan IP adresi çekilir, VMkernel portları oluşturulur ve ilgili port group'lara bağlanır, MTU ve teaming politikaları uygulanır.</p>

                <div class="warning">
                    <strong>⚠️ Manuel Müdahaleden Kaçının:</strong> SDDC Manager tarafından otomatik oluşturulan port group'ları veya VMkernel portlarını vSphere Client üzerinden manuel olarak değiştirmek, SDDC Manager'ın tutarlılık kontrollerinin başarısız olmasına ve sonraki otomasyon işlemlerinin bloke olmasına yol açabilir.
                </div>
    `
};
