// =============================================================
//  data/posts.js — Makale Metadata & Kategori Tanımları
//
//  YENİ MAKALE EKLEMEK İÇİN:
//  1. Bu dosyadaki allPosts dizisine bir obje ekle
//  2. posts/<id>.js dosyası oluştur (posts/_TEMPLATE.js'e bak)
//  3. index.html'deki posts-grid'e bir kart ekle
//
//  ALAN AÇIKLAMALARI:
//    id        → posts/<id>.js ile eşleşmeli
//    category  → categoryMeta anahtarlarından biriyle eşleşmeli
//    tag       → Kart üstünde görünen küçük etiket
//    date      → "DD Ay YYYY" formatı
//    readTime  → "X dk" formatı
//    icon      → Emoji (kart arka planı)
//    bg        → post-img-1 ... post-img-6 (renk tonu CSS class'ı)
//    title     → Makale başlığı
//    excerpt   → Kart üstündeki kısa açıklama (~200 karakter)
// =============================================================

const allPosts = [
    { id: 'sanal-platform', category: 'Sanallaştırma', tag: 'Sanallaştırma', date: '24 Şubat 2026', readTime: '14 dk', icon: '🖥️', bg: 'post-img-1', title: 'Sanallaştırma Platformları: Broadcom VMware, Huawei FusionSphere & Açık Kaynak Alternatifleri', excerpt: 'Broadcom\'un VMware\'i satın almasının ardından lisans politikasında yapılan köklü değişiklikler kurumsal dünyayı sarstı. Huawei FusionSphere, Proxmox ve diğer alternatiflerin detaylı karşılaştırması.' },
    { id: 'vcenter-kurulum', category: 'Sanallaştırma', tag: 'VMware', date: '20 Şubat 2026', readTime: '11 dk', icon: '⚙️', bg: 'post-img-2', title: 'vCenter Server Kurulum Adımları: Sıfırdan Üretime', excerpt: 'VCSA (vCenter Server Appliance) kurulumunu pre-check\'ten post-deployment konfigürasyonuna kadar tüm adımlarıyla anlatan kapsamlı bir rehber.' },
    { id: 'horizon-vdi', category: 'VDI', tag: 'VDI', date: '16 Şubat 2026', readTime: '13 dk', icon: '🖱️', bg: 'post-img-3', title: 'Omnissa Horizon VDI: Connection Server Kurulum ve Yapılandırma Rehberi', excerpt: 'Horizon Connection Server\'ı adım adım kuruyoruz; lisanslama, Composer entegrasyonu ve ilk desktop pool\'a kadar her şey burada.' },
    { id: 'vcenter-ha', category: 'Sanallaştırma', tag: 'HA & Güvenilirlik', date: '12 Şubat 2026', readTime: '10 dk', icon: '🛡️', bg: 'post-img-4', title: 'vCenter High Availability (HA): Best Practice Konfigürasyon Rehberi', excerpt: 'Active-Passive-Witness mimarisi, ağ gereksinimleri ve failover senaryoları ile vCenter HA yapılandırması.' },
    { id: 'vds-mimari', category: 'VMware', tag: 'VCF / Ağ', date: '8 Şubat 2026', readTime: '11 dk', icon: '🔀', bg: 'post-img-5', title: 'VCF Ortamlarında vSphere Distributed Switch (VDS) Mimarisi ve Tasarım İlkeleri', excerpt: 'VCF kurulumunda ağ konfigürasyonunun temelini oluşturan VDS\'in konumlanması ve Management/Workload Domain\'lerdeki switch yapısı.' },
    { id: 'vds-loadbalancing', category: 'VMware', tag: 'vSAN / Ağ', date: '5 Şubat 2026', readTime: '9 dk', icon: '⚖️', bg: 'post-img-6', title: 'vSAN Trafik Optimizasyonu için VDS Uplink ve Load Balancing Stratejileri', excerpt: 'Route Based on Physical NIC Load kullanımı, LACP konfigürasyonları ve vSAN trafiği için en iyi performansı veren uplink eşleştirmeleri.' },
    { id: 'sddc-network-pool', category: 'VMware', tag: 'VCF / SDDC', date: '1 Şubat 2026', readTime: '10 dk', icon: '🏗️', bg: 'post-img-1', title: 'VCF SDDC Manager ile Network Pool Yönetimi ve VDS Entegrasyonu', excerpt: 'VCF bring-up öncesi Network Pool oluşturma, VLAN atamaları ve SDDC Manager\'ın VDS üzerindeki Port Group\'ları nasıl otomatik yapılandırdığı.' },
    { id: 'nioc-yapilandirma', category: 'VMware', tag: 'vSAN / NIOC', date: '28 Ocak 2026', readTime: '8 dk', icon: '📡', bg: 'post-img-2', title: 'vSAN ve vMotion Trafiği için NIOC (Network I/O Control) Yapılandırması', excerpt: 'Shares ve Limits mekanizmaları ile vSAN trafiğine öncelik verme, trafik çakışmalarını önleme ve sistem kararlılığını artırma.' },
    { id: 'nsxt-vds', category: 'VMware', tag: 'NSX-T / VCF', date: '24 Ocak 2026', readTime: '12 dk', icon: '🔗', bg: 'post-img-3', title: 'NSX-T ile VDS 7.0/8.0 Yakınsaması: Yakınsak Sanal Switch (CVS) Yapısı', excerpt: 'NSX-T\'nin artık ayrı bir N-VDS yerine doğrudan VDS üzerinde çalışması ve transport node konfigürasyonlarının yönetimsel avantajları.' },
    { id: 'vsan-troubleshoot', category: 'VMware', tag: 'vSAN / Troubleshoot', date: '20 Ocak 2026', readTime: '13 dk', icon: '🔧', bg: 'post-img-4', title: 'vSAN Distributed Switch Üzerinde Sorun Giderme ve Performans İzleme', excerpt: 'Port Mirroring, NetFlow kullanımı ve Health Check özellikleriyle vSAN ağ hatalarını (MTU uyumsuzlukları vb.) tespit etme.' },
    { id: 'ad-gpo-hardening', category: 'Microsoft', tag: 'Microsoft / AD', date: '27 Şubat 2026', readTime: '16 dk', icon: '🪟', bg: 'post-img-5', title: 'Active Directory\'de GPO Yönetimi: Oluşturma, Security Filtering ve Hardening Best Practice\'leri', excerpt: 'GPO oluşturma adımları, Authenticated Users mekanizması, Security Filtering ile granüler hedefleme ve kurumsal ortamlar için GPO hardening stratejileri.' },
    { id: 'sanallastirma-teknolojileri', category: 'Sanallaştırma', tag: 'Hypervisor', date: '25 Şubat 2026', readTime: '12 dk', icon: '🔄', bg: 'post-img-6', title: 'Sanallaştırma Teknolojileri: VMware, Hyper-V, XenServer ve Alternatiflerin Kapsamlı Karşılaştırması', excerpt: 'VMware vSphere\'den Microsoft Hyper-V\'e, Citrix XenServer\'dan VirtualBox\'a — kurumsal ve kişisel kullanım için en yaygın hypervisor platformlarının derinlemesine karşılaştırması.' },
    { id: 'mssql-server-kurulum', category: 'Microsoft', tag: 'SQL Server', date: '23 Şubat 2026', readTime: '15 dk', icon: '🗄️', bg: 'post-img-1', title: 'MSSQL Server Kurulum Rehberi: Disk Yapılandırmasından Güvenlik Sertleştirmesine', excerpt: 'SQL Server kurulumunda disk gereksinimleri, TempDB yapılandırması, kullanıcı yönetimi ve Server Audit ile güvenlik sertleştirme adımları.' },
    { id: 'db-disk-dolulugu', category: 'Microsoft', tag: 'SQL / Oracle', date: '21 Şubat 2026', readTime: '12 dk', icon: '💿', bg: 'post-img-2', title: 'SQL Server ve Oracle Disk Doluluğu Yönetimi: Adım Adım Müdahale Rehberi', excerpt: '.BAK, .LDF, MDF/NDF, TempDB ve Oracle ARCHIVE, ADUMP, BDUMP dosyalarında disk doluluğuna nasıl müdahale edilir? Hangi dosyalar silinebilir, hangisi asla?' },
    { id: 'oracle-tablespace', category: 'Linux', tag: 'Oracle / DB', date: '19 Şubat 2026', readTime: '10 dk', icon: '🗃️', bg: 'post-img-3', title: 'Oracle Tablespace Doluluk Yönetimi: UNIX ve Windows Ortamında Adım Adım Rehber', excerpt: 'sqlplus bağlantısından tablespace doluluk sorgusuna, datafile eklemeye ve vektör sunucu standartlarına kadar Oracle alan yönetiminin tüm adımları.' },
    { id: 'linux-temel-komutlar', category: 'Linux', tag: 'Linux / Unix', date: '17 Şubat 2026', readTime: '11 dk', icon: '🐧', bg: 'post-img-4', title: 'Linux Sistem Yöneticisi Komut Rehberi: Günlük Operasyonlarda Kullandığım Her Şey', excerpt: 'Dizin gezintisinden servis yönetimine, kullanıcı işlemlerinden dosya sistemi yapılarına kadar sistemci gözünden kapsamlı Linux komut referansı.' },
    { id: 'ubuntu-server-kurulum', category: 'Linux', tag: 'Ubuntu Server', date: '13 Şubat 2026', readTime: '13 dk', icon: '🟠', bg: 'post-img-5', title: 'Ubuntu Server Kurulum ve Kurulum Sonrası Konfigürasyon Rehberi', excerpt: 'LVM partition yapısı, netplan route tanımları, SSH yapılandırması, KS kullanıcı yönetimi ve paket kurulumuna kadar enterprise Ubuntu Server kurulum rehberi.' },
    { id: 'rhel-centos-kurulum', category: 'Linux', tag: 'RHEL / CentOS', date: '11 Şubat 2026', readTime: '14 dk', icon: '🔴', bg: 'post-img-6', title: 'RHEL / CentOS 7 Kurulum ve Kurulum Sonrası Konfigürasyon Rehberi', excerpt: 'RHEL, CentOS ve Oracle Linux kurulumunda disk yapılandırması, ağ konfigürasyonu, SELinux, yum repo tanımları ve servis yönetiminin tüm adımları.' },
    { id: 'lvm-disk-ekleme', category: 'Linux', tag: 'LVM / Storage', date: '15 Şubat 2026', readTime: '8 dk', icon: '💾', bg: 'post-img-1', title: 'Linux\'ta LVM ile Disk Ekleme: pvcreate\'den fstab\'a Adım Adım Rehber', excerpt: 'pvcreate, vgcreate, lvcreate, mkfs.xfs ve fstab adımlarıyla Linux\'ta yeni disk ekleme. Hata durumları, UUID kullanımı ve LV yeniden adlandırma örnekleriyle.' },
    { id: 'netbackup-vm-restore', category: 'VMware', tag: 'Backup / VMware', date: '9 Şubat 2026', readTime: '9 dk', icon: '🔄', bg: 'post-img-2', title: 'Symantec NetBackup ile VMware VM Restore: Adım Adım Rehber', excerpt: 'NetBackup 7.7.3 üzerinden VMware VM restore işlemi; transport mode seçimi, Alternate Location yapılandırması, Pre-Recovery Check ve kritik uyarılar.' },
];

// =============================================================
//  Kategori tanımları
//  Yeni kategori eklemek için buraya bir satır ekle,
//  ardından index.html'deki kategoriler bölümüne de kart ekle.
// =============================================================

const categoryMeta = {
    'Sanallaştırma': { icon: '🖥️', label: 'Sanallaştırma Platformları' },
    'VMware': { icon: '⚙️', label: 'VMware / vSphere' },
    'VDI': { icon: '🖱️', label: 'VDI & Horizon' },
    'HA': { icon: '🛡️', label: 'HA & Güvenilirlik' },
    'Linux': { icon: '🐧', label: 'Linux & Unix' },
    'Cloud': { icon: '☁️', label: 'Cloud & Altyapı' },
    'Storage': { icon: '💾', label: 'Depolama & SAN' },
    'Microsoft': { icon: '🪟', label: 'Microsoft / Windows' },
};
