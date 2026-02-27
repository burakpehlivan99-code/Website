// =============================================================
//  posts/vsan-troubleshoot.js
//  vSAN Distributed Switch Üzerinde Sorun Giderme ve Performans İzleme
//
//  Bu dosya articles['vsan-troubleshoot'] objesini tanımlar.
//  Makaleyi düzenlemek için sadece content içindeki HTML'i değiştir.
//  tag, date, readTime bilgileri data/posts.js'te de tutulur.
// =============================================================

articles['vsan-troubleshoot'] = {
    tag: 'vSAN / Troubleshoot',
    date: '',
    readTime: '',
    content: `
<span class="article-tag">vSAN · Sorun Giderme</span>
                <h1>vSAN Distributed Switch Üzerinde Sorun Giderme ve Performans İzleme</h1>
                <div class="article-meta-row">
                    <span>📅 20 Ocak 2026</span><span>⏱ 13 dk okuma</span><span>✍️ Burak Pehlivanoğlu</span>
                </div>
                <p>vSAN cluster'ında yaşanan performans sorunlarının büyük çoğunluğunun köküne inildiğinde, ağ katmanında bir yapılandırma hatası ya da bant genişliği yetersizliği bulunur. MTU uyumsuzluğu, yanlış teaming politikası veya uplink saturasyonu gibi sorunlar vSAN'ın tamamen durmasına bile yol açabilir.</p>

                <h2>vSAN Health Check: İlk Durağınız</h2>
                <p><strong>Cluster → Monitor → vSAN → Health</strong> yolundan ulaşılan bu servis kritik kontroller çalıştırır:</p>
                <ul>
                    <li><strong>vSAN Network Health:</strong> Tüm host'ların vSAN VMkernel üzerinden birbirleriyle iletişim kurabildiğini doğrular</li>
                    <li><strong>MTU Check:</strong> Jumbo Frame konfigüre edilmişse tüm zincirde 9000 byte paketlerin iletilebildiğini test eder</li>
                    <li><strong>Network Latency:</strong> Host'lar arası round-trip time'ı ölçer; vSAN için 1ms altında olması önerilir</li>
                    <li><strong>Network Bandwidth:</strong> Mevcut throughput kapasitesini test eder</li>
                </ul>

                <div class="callout">
                    <strong>💡 MTU Uyumsuzluğu:</strong> En sık karşılaşılan vSAN ağ sorunu MTU uyumsuzluğudur. VMkernel port MTU'su 9000 olarak ayarlanmış ancak fiziksel switch'te jumbo frame aktif edilmemişse, Health Check "MTU Mismatch" hatası verir ve paket kayıpları başlar.
                </div>

                <h2>Port Mirroring ve NetFlow ile Analiz</h2>
                <p><strong>Port Mirroring:</strong> VDS → Configure → Port Mirroring → Add yoluyla bir session oluşturun. vSAN VMkernel portuna karşılık gelen VDS port'unu kaynak olarak seçin, Wireshark çalıştıran bir analiz VM'ini hedef gösterin. Geneve tünel başlıklarını, MTU değerlerini ve yeniden iletim oranlarını analiz edin.</p>
                <p><strong>NetFlow:</strong> VDS → Configure → NetFlow ekranından collector IP ve portunu girin (standart: UDP/2055). İzlemek istediğiniz port group'ları NetFlow için aktif edin. Hangi VM'in en çok bant genişliği tükettiğini görselleştirebilirsiniz.</p>

                <h2>Yaygın Sorunlar ve Çözümleri</h2>
                <table class="compare-table">
                    <tr><th>Sorun</th><th>Olası Neden</th><th>Çözüm</th></tr>
                    <tr><td>Network Connectivity Failed</td><td>VMkernel IP veya VLAN yanlış</td><td>VMkernel konfigürasyonunu ve fiziksel switch VLAN'ını doğrula</td></tr>
                    <tr><td>MTU Mismatch</td><td>Fiziksel switch'te Jumbo Frame aktif değil</td><td>Switch port ve trunk konfigürasyonunu güncelle</td></tr>
                    <tr><td>Yüksek vSAN Latency</td><td>Bant genişliği doygunluğu veya yanlış teaming</td><td>NIOC yapılandır, LBT algoritmasına geç</td></tr>
                    <tr><td>Düzensiz vMotion Hataları</td><td>NIOC'ta vMotion limiti çok düşük</td><td>vMotion Shares değerini artır</td></tr>
                    <tr><td>Tek Uplink Üzerinde Tüm Trafik</td><td>Yanlış teaming politikası</td><td>LBT veya LACP konfigürasyonunu gözden geçir</td></tr>
                </table>

                <h2>ESXtop ile Gerçek Zamanlı Ağ Metrikleri</h2>
                <p>ESXi host'una SSH bağlantısıyla <code>esxtop</code> çalıştırın, ağ istatistikleri için <kbd>n</kbd> tuşuna basın. Kritik metrikler: <strong>%DRPTX / %DRPRX</strong> (paket kayıp oranları — sıfır olmalı), <strong>MbTX/s ve MbRX/s</strong> (anlık throughput), <strong>PKTTX/s ve PKTRX/s</strong> (paket hızları).</p>

                <div class="callout">
                    <strong>💡 Pro Tip:</strong> vSAN ağ sorunlarını proaktif olarak önlemek için Aria Operations üzerinde şu alarmları konfigüre edin: vSAN network latency &gt; 1ms, vSAN bandwidth utilization &gt; 80%, ve vSAN health check failure.
                </div>
    `
};
