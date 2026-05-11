# PlanIt 🗓️

Kişisel görev ve plan takip uygulaması — React + Vite + Tailwind CSS ile geliştirilmiştir.

## Özellikler

- 📋 **Görev Yönetimi** — Ekle, düzenle, sil, tamamlandı olarak işaretle
- 🎯 **Yıllık Hedefler** — Hedef ekle ve ilerlemeyi takip et
- 🎬 **Film Listesi** — İzlenecek filmleri listele ve puanla
- ✈️ **Seyahat Listesi** — Gidilecek şehirleri planla
- 💾 **Kalıcı Veri** — Tüm veriler `localStorage` ile tarayıcıda saklanır

## Kullanılan Teknolojiler

- **ReactJS** (v19) — UI framework
- **Vite** — Build tool
- **Tailwind CSS** (v4) — Stil kütüphanesi
- **Lucide React** — İkon kütüphanesi

## Proje Yapısı

```
src/
├── Components/     # Tekrar kullanılabilir bileşenler
│   ├── Sidebar.jsx
│   ├── TaskCard.jsx
│   └── TaskModal.jsx
├── Pages/          # Sayfa bileşenleri
│   ├── HomePage.jsx
│   ├── GoalsPage.jsx
│   ├── MoviesPage.jsx
│   └── TravelPage.jsx
├── Interfaces/     # Veri modelleri ve yardımcı fonksiyonlar
│   └── index.js
├── App.jsx
└── main.jsx
```

## CRUD İşlemleri

| İşlem | Açıklama |
|-------|----------|
| ➕ Ekle | Görev, hedef, film veya şehir ekle |
| 📋 Listele | Filtreleme ve arama ile listele |
| ✏️ Güncelle | Mevcut kayıtı düzenle |
| 🗑️ Sil | Kaydı kalıcı olarak sil |

## Kurulum

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
# dist/ klasörü Netlify'a sürükle-bırak ile yayınla
```
