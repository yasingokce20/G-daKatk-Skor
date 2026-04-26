# Güvenlik ve Veri Koruma Protokolü

## 1. Veri Otoritesi ve Bütünlüğü
* **Salt Okunur Ana Veri:** Kullanıcılar gıda katkı maddelerinin bilimsel verilerini (risk seviyesi, kaynak vb.) değiştiremez. Bu veriler sadece yönetici veya resmi API entegrasyonu (OFF) üzerinden güncellenebilir.
* **EF Core Güvenliği:** Veritabanı sorgularında "SQL Injection" riskine karşı sadece LINQ ve parametreli sorgular kullanılmalıdır.

## 2. Topluluk ve Sohbet Güvenliği
* **XSS Koruması:** Komünite sayfasındaki mesaj alanları "HTML Sanitization" işleminden geçirilmelidir. Kullanıcıdan gelen her türlü metin, veritabanına yazılmadan ve arayüzde gösterilmeden önce encode edilmelidir.
* **Input Validation:** Arama kutusu ve sohbet girişleri için FluentValidation kullanılarak karakter sınırı ve içerik kontrolü yapılmalıdır.

## 3. API ve Dokümantasyon
* **Swagger Güvenliği:** API uç noktaları için Swagger dökümantasyonu eksiksiz tutulmalı, ancak üretim ortamında hassas uç noktalar gizlenmelidir.
* **Hata Yönetimi:** API hata mesajları sunucu yollarını veya veritabanı şemasını sızdırmayacak şekilde "Global Exception Handling" ile yönetilmelidir.