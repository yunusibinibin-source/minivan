# Performans ve SEO düzeltmeleri — 16 Ekim 2026

Paket mevcut 10 sayfanın tamamını içerir: ana sayfa, mevcut panelvan sayfası ve 8 ambar nakliye sayfası. Görünen hizmet metinleri, güzergâhlar ve telefon numarası korunmuştur.

| Ekran görüntüsündeki konu | Yapılan düzeltme |
| --- | --- |
| Büyük görseller / resim yayınlama | Kullanılan 9 görsel kaynağı orantılı WebP sürümleriyle sunuluyor. Ekrana uygun dosya seçimi için srcset ve sizes eklendi. |
| 16 saniyelik LCP | Ana araç görseli küçültüldü; HTML içindeki gerçek img korunup preload ve yüksek indirme önceliği tanımlandı. Bu görsel lazy yapılmadı. Yeni LCP henüz canlıda ölçülmedi. |
| Görsellerde width ve height eksikliği | Tüm img öğelerine dosyanın gerçek ölçüleri eklendi. Sayfa altındaki görseller lazy, decoding async ve düşük önceliklidir. |
| Oluşturmayı engelleyen istekler | Font Awesome ve Google Fonts istekleri kaldırıldı. İlk ekran stilleri HTML içinde, kalan CSS preload ile yüklenir; JavaScript kapalıysa noscript stil bağlantısı devreye girer. |
| Yazı tipi görüntüleme / kullanılmayan ikon CSS’i | Harici ikon fontunun yerine yerel, küçük SVG maskeleri kullanıldı. Sistem yazı tipi yığını korundu. Simge fontu veya CDN indirmesi yoktur. |
| Kullanılmayan JavaScript / üçüncü taraflar | Google Ads ölçümü silinmedi. Standart gtag kuyruğu ve AW-17874354293 yapılandırması korunarak yükleme ilk boyama/boş zaman aşamasına alındı. Gerçek kullanıcı etkileşimi etiketi hemen başlatır; yedek zamanlayıcı da vardır. Google’ın kendi dosyası sitede kullanıldığı sürece üçüncü taraf JavaScript uyarısı tamamen kaybolmayabilir. |
| Zorunlu yeniden düzenleme | Görsel alanları sabitlendi, geç web fontu değişimi kaldırıldı, kapalı menüde her kaydırmada tekrar tekrar sınıf yazılması önlendi. Şehir filtresi yalnızca değişen görünürlük durumlarını yazar. |
| Meta keywords | İki eski sayfadaki meta keywords kaldırıldı. Başlıklar, açıklamalar, H1’ler ve görünür içerik korundu. |
| Dış bağlantı güvenliği | Yeni sekme bağlantılarında açıkça noopener ve noreferrer bulunur. WhatsApp iletişim bağlantılarında ayrıca nofollow vardır; iç hizmet bağlantıları takip edilebilir kalır. |
| Link title eksikleri | Tüm bağlantılara anlaşılır hedef açıklamaları eklendi. title, mevcut görünen metnin veya erişilebilir adın yerine geçmez. |
| Favicon / Apple / manifest | Kökte çok boyutlu favicon.ico, 96 piksel PNG, Apple touch icon, 192/512 piksel uygulama simgeleri ve site.webmanifest eklendi. Dosya türleri ve ölçüleri head içinde açıkça tanımlıdır. Marka simgesi mevcut logodaki kamyon işaretinden türetildi. |
| Erişilebilirlik | Koyu zemindeki soluk metin ve placeholder kontrastları yükseltildi; panelvan sayfasındaki mavi/yeşil buton metinleri düzeltildi. Eksik şehir arama adı, klavyeyle içeriğe geçiş, menü kontrol ilişkisi ve dekoratif ikon işaretlemeleri tamamlandı. Ana sayfada üst menü ve altbilgi ana içerik alanının dışına alındı. |
| Şehir araması | Filtreyle gizlenen şehir kartlarının CSS tarafından tekrar görünür hâle gelmesi önlendi. Türkçe karakterli arama ve sonuçların yeniden gösterilmesi doğrulandı. |
| Eski önbellekten dosya karışması | Kullanılan CSS, JavaScript ve optimize görseller içerik sürümü taşıyan dosya adlarıyla bağlanır. |

## Boyut karşılaştırması

Ana araç görselinin kaynak PNG dosyası 2.190.888 bayttır. Yeni 640 piksel WebP sürümü 43.318 bayttır: yaklaşık %98 küçülme. Tarayıcı ekran genişliği ve piksel yoğunluğuna göre başka bir responsive sürümü seçebilir.

Kullanılan 9 benzersiz görsel kaynağının eski dosya boyutları toplamı 3.216.299 bayttır. Yeni varsayılan sürümlerin toplamı 375.754 bayttır: yaklaşık %88,3 küçülme. Bu rakamlar dosya karşılaştırmasıdır; gerçek sayfa ağ trafiği, cihazın seçtiği sürümlere, lazy yüklemeye ve Google Ads isteklerine bağlıdır.

## Sunucu önbelleği

Yayındaki alan adının yanıtında `Server: GitHub.com` ve `Cache-Control: max-age=600` gözlemlendi. Bu HTTP başlığı barındırma katmanından gelir; HTML/CSS/JavaScript dosyası içine bir ayar eklemek sunucu başlığını değiştirmez. Paket, yeni dosya sürümlerinin karışmaması için içerik sürümü taşıyan adlar kullanır ve indirilen dosyaları küçültür.

Daha uzun bir statik dosya önbelleği istenirse bunu barındırma veya CDN katmanında ayarlamak gerekir. Kullanılan bir CDN üzerinde yalnızca sürümlü `/assets/` dosyalarına uzun tarayıcı önbelleği uygulanabilir. HTML güncellemelerinin eski kalmaması için HTML dosyalarına aynı uzun süre uygulanmamalıdır. GitHub Pages’e bir .htaccess dosyası koymanın bu başlığı düzelttiği iddia edilmemiştir; DNS veya CDN hesabında değişiklik yapılmamıştır.

## Testler ve ölçüm sınırı

- 10 sayfanın erişilebilir dosya yolları, sayfa içi bağlantıları, canonical adresleri, tek H1 ve benzersiz başlık/açıklamaları doğrulandı.
- Sitemap 10 gerçek adresle eşleşir. JSON-LD ve manifest ayrıştırıldı; tüm simge ve responsive görsel dosyaları mevcut.
- Yeni sekme bağlantılarının güvenlik öznitelikleri ve tüm form alanlarının etiketleri kontrol edildi.
- Yerel JavaScript sözdizimi, 9 teklif formunun WhatsApp mesajları, 9 menü/telefon/WhatsApp olay akışı, Türkçe şehir aramaları ve 10 sayfadaki tek seferlik Google etiketi yükleyicisi test edildi.
- Düzeltilen metin/zemin renk çiftlerinde en düşük hesaplanan oran 5,29:1’dir. Bu, sayfanın tamamında otomatik bir erişilebilirlik taraması yapıldığı anlamına gelmez.
- Kullanılan SVG simgeleri ayrı görseller olarak render edilip incelendi. Ana araç görseli ve favicon görsel olarak incelendi.
- Gerçek tarayıcı önizlemesi ortam hatası nedeniyle çalışmadı. Masaüstü/mobil ekran görüntüsüyle sayfa kontrolü ve yeni bir Lighthouse/PageSpeed ölçümü yapılamadı.
- Canlı site dosyaları değiştirilmedi. Gerçek Google Ads hesabında dönüşüm tanımı oluşturulmadı veya değiştirilmedi; yeni puan ancak paket yayına alındıktan sonra ölçülür.

## Yayınlama

ZIP içindeki site dosyalarını mevcut sitenin köküne birlikte yükleyin. Sadece index.html yüklemek yeterli değildir; yeni CSS/JS adları, optimize görseller, simgeler ve manifest de yüklenmelidir. `teslim-notlari` klasörü size yöneliktir ve yayına yüklenmesi gerekmez.

Ana sayfayı yenileyip mobilde menüyü, şehir aramasını ve teklif formunu deneyin. Ardından PageSpeed Insights’ta yeni analiz başlatın. Önceki rapor bağlantısı kendiliğinden yeni kodu ölçmüş sayılmaz.

## Kaynaklar

- LCP görseli, öncelik ve kaynak keşfi: https://web.dev/articles/optimize-lcp
- Responsive görseller: https://web.dev/learn/design/responsive-images
- Google’ın desteklediği meta etiketler: https://developers.google.com/search/docs/crawling-indexing/special-tags
- Site simgesi kuralları: https://developers.google.com/search/docs/appearance/favicon-in-search
- Bağlantı uygulamaları: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Kontrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
