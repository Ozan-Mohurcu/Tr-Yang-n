# 🔥 Yangın Tweet Analizi | Fire Tweet Analysis

Türkçe yangın tweet'leri üzerinde NLP ve sentiment analizi projesi.

## 📁 Proje Yapısı

```
Yangin-Tr-tweet/
├── 📊 yangin_tweets.csv          # Ana veri seti (1,842 tweet)
├── 🔧 yangin_scraper.js          # Twitter scraping scripti
├── 📓 analysis.ipynb             # Ana analiz notebook'u
├── 📦 package.json               # Node.js dependencies
├── 🔒 package-lock.json          # Dependency lock file
└── 📂 node_modules/              # Node.js modülleri
```

## 🎯 Proje Özeti

1,842 yangın tweet'i üzerinde kapsamlı NLP analizi:
- **Sentiment Analizi**: 6 kategori (Nötr, Bilgi/Haber, Suçlama/Eleştiri, vb.)
- **Lokasyon Çıkarımı**: 55 farklı şehir/bölge tespiti (%16.4 başarı)
- **Tweet Uzunluğu**: Kategori bazlı sentiment dağılımı
- **Profesyonel Görselleştirme**: 4 interaktif chart

## 📊 Ana Bulgular

| Metrik | Değer |
|--------|-------|
| **Toplam Tweet** | 1,842 |
| **Nötr Sentiment** | %59.2 |
| **Lokasyon Tespiti** | %16.4 |
| **En Aktif Bölge** | Bursa (103 tweet) |
| **Ortalama Uzunluk** | 160 karakter |

## 🛠️ Teknoloji Stack

- **Python**: Pandas, NumPy, Matplotlib, Seaborn
- **NLP**: RegEx, Text Processing, Sentiment Classification
- **Node.js**: Twitter API scraping
- **Data Viz**: Professional dark-theme charts

## 🚀 Kurulum & Çalıştırma

```bash
# Repository'yi klonla
git clone https://github.com/username/yangin-tweet-analizi-nlp.git
cd yangin-tweet-analizi-nlp

# Node.js dependencies
npm install

# Python requirements (analysis.ipynb için)
pip install pandas numpy matplotlib seaborn

# Jupyter notebook'u çalıştır
jupyter notebook analysis.ipynb
```

## 📈 Görselleştirmeler

1. **Sentiment Donut Chart** - Infographic tarzı dağılım
2. **Lokasyon Bar Chart** - En aktif bölgeler
3. **Bubble Chart** - Lokasyon-Sentiment kombinasyonları
4. **Stacked Chart** - Tweet uzunluğu kategorileri

## 💡 Kullanım Alanları

- 🚨 **Afet Yönetimi**: Gerçek zamanlı durum tespiti
- 📍 **Coğrafi Analiz**: Hotspot belirleme
- 📊 **Sosyal Medya İzleme**: Halk algısı tracking
- 🤖 **ML Pipeline**: Otomatik sınıflandırma altyapısı

## 📝 Veri Seti

**yangin_tweets.csv** - 7 kolon:
- `Author`: Tweet sahibi
- `Date`: Paylaşım tarihi
- `Text`: Tweet içeriği
- `Likes`: Beğeni sayısı
- `Replies`: Yanıt sayısı
- `Reposts`: Retweet sayısı
- `Hashtag`: Kullanılan hashtag

## 🔍 Metodoloji

1. **Veri Toplama**: Twitter API + Node.js scraper
2. **Veri Temizleme**: RegEx pattern matching
3. **Sentiment Sınıflandırma**: Kural tabanlı NLP
4. **Lokasyon Çıkarımı**: Türkiye şehir/ilçe dictionary
5. **Görselleştirme**: Professional dark-theme charts

## 📄 Lisans

MIT License - Eğitim amaçlı kullanım için açık kaynak.

## 👤 Geliştirici

**Ozan M.** - Data Scientist  
💼 LinkedIn: [https://www.linkedin.com/in/ozanmhrc/](https://www.linkedin.com/in/ozanmhrc/)

---

⭐ **Projeyi beğendiyseniz star vermeyi unutmayın!**

> Bu tür analizlerin bir daha gerekli olmamasını dileriz. 🙏
