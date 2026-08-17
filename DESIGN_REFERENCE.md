# Sylvaventis — Design & Architecture Reference

> **Projekt**: Nowoczesna konwersja sklepu kopfnote.at (Shopify) → Next.js + WooCommerce Headless PWA
> **Marka**: Sylvaventis (nowa nazwa serwisu)
> **Oryginał (inspiracja)**: kopfnote.at (Shopify) — Räucherwerk & Kräuterpädagogik
> **API (WooCommerce/GraphQL)**: http://api.sylvaventis.com/graphql
> **Repozytorium**: github.com/krzysztofpiesio89/sylvaventis

---

## 1. Analiza oryginału — kopfnote.at (Shopify)

### 1.1 Tożsamość marki
- **Nazwa**: Kopfnote — Räucherwerk & Kräuterpädagogik
- **Branża**: Kadzidła, surowce roślinne, herbaty, grzyby witalne, minerały, kosmetyka naturalna
- **Rynek**: Austria / DACH / Europa
- **Hasło przewodnie**: „Schätze der Natur aus Österreich & Weltweit" (Skarby natury z Austrii i świata)
- **USP**: Tradycyjne + nowoczesne podejście do botaniki, zrównoważony rozwój, edukacja ziołowa

### 1.2 Paleta kolorów oryginału
| Element | Kolor | Hex (przybliżony) |
|---|---|---|
| Tło nagłówka/strony | Ciepły beż / kremowy | `#F5E6C8` |
| Nawigacja (tekst) | Ciemny oliwkowy / brąz | `#3D3929` |
| Pasek anonsów | Ciemna oliwka | `#4A4528` |
| Tekst anonsów | Biały + pomarańczowy accent | `#FFFFFF` + `#E67E22` |
| Akcenty / ikony | Ciepły pomarańcz | `#D4772C` |
| Tło sekcji hero | Fotografia natury (zielone łąki, kadzidła) | — |
| Sekcja eco-stats | Las panoramiczny, ikony pomarańczowe | `#D4772C` |
| Tekst główny | Ciemny brąz/czarny | `#1A1612` |

### 1.3 Nawigacja / Kategorie Shopify
1. **Rohstoffe & Räucherwerk** (Surowce i kadzidła) ▾
2. **Gewürze und Tees** (Przyprawy i herbaty) ▾
3. **Vitalpilze** (Grzyby witalne)
4. **Spezialitäten** (Specjały) ▾
5. **Mineralien & Natursalze** (Minerały i sole naturalne) ▾
6. **Haushalt & Reinigung** (Dom i czyszczenie)
7. **Naturkosmetik** (Kosmetyka naturalna) ▾
8. **Zubehör** (Akcesoria) ▾

### 1.4 Kluczowe sekcje strony głównej
1. **Announcement bar** — „VERSANDKOSTENFREI ab 80€ in Österreich"
2. **Logo + Mega-menu** — rozbudowana nawigacja z dropdown
3. **Hero** — full-width fotografia natury, tekst overlay z misją marki, CTA „JETZT ENTDECKEN"
4. **Eco-stats** — panel z osiągnięciami klimatycznymi (29 mies. climate-positive, 6943 drzewa, itd.)
5. **Produkty polecane** — siatka produktów
6. **Zaufanie** — widget Google Reviews (4.9★, 159 recenzji)
7. **Footer** — kontakt, linki, informacje prawne

### 1.5 Problemy obecnego Shopify
- Powolne ładowanie (ciężkie Shopify theme + liczne apki)
- Brak PWA / offline support
- Ograniczona personalizacja designu
- Brak headless architecture = brak kontroli nad frontendem
- Przestarzały look & feel (generyczny Shopify template)
- Brak nowoczesnych animacji i micro-interakcji

---

## 2. Analiza bazy kodowej (Selvantis → Sylvaventis)

### 2.1 Tech Stack
- **Frontend**: Next.js 14+ (App Router), React, TypeScript
- **Backend**: WordPress + WooCommerce (GraphQL via WPGraphQL)
- **API Endpoint**: `http://api.sylvaventis.com/graphql`
- **State**: Zustand (cartStore)
- **Search**: Algolia
- **Styling**: Tailwind CSS + custom CSS variables
- **Deployment**: PWA-ready

### 2.2 Istniejące komponenty
| Komponent | Opis | Status adaptacji |
|---|---|---|
| `HeroApp` | Full-screen hero z tłem + efekt iskier | 🔄 Wymaga rebrandingu |
| `Navbar` | Glass morphism, floating nav, search | 🔄 Wymaga nowej nawigacji |
| `Footer` | 4-kolumnowy z social media | 🔄 Wymaga rebrandingu |
| `ProductCard` | Karta produktu z ceną | 🔄 Wymaga nowego stylu |
| `ProductList` | Siatka produktów z filtrami | ✅ Logika OK |
| `CartDrawer` | Drawer koszyka (slide-in) | ✅ Logika OK |
| `Checkout` | Pełny checkout z animacją | ✅ Logika OK |
| `LoginForm` | Auth + konto użytkownika | ✅ Logika OK |
| `AlgoliaSearch` | Wyszukiwarka Algolia | ✅ Logika OK |
| `Categories` | Strona kategorii | 🔄 Wymaga stylu |

### 2.3 GraphQL Queries (gotowe)
- `FETCH_ALL_PRODUCTS_QUERY` — pobieranie produktów (Simple + Variable)
- `GET_SINGLE_PRODUCT` — szczegóły produktu
- `GET_PRODUCTS_FROM_CATEGORY` — produkty z kategorii
- `FETCH_ALL_CATEGORIES_QUERY` — lista kategorii
- `GET_CART` / `GET_CURRENT_USER` / `GET_CUSTOMER_ORDERS` — koszyk, user, zamówienia

---

## 3. Wizja designu — Sylvaventis

### 3.1 Filozofia designu

> **„Sylvaventis — Natura w najczystszej formie, bez sztuczności, bez AI slop”**
>
> Nazwa „Sylvaventis” (z łaciny: *silva* = las, *ventis* = wiatry) — wiatry lasu.

Serwis ma oddawać:
- **Autentyczność** — prawdziwe zdjęcia natury, lasu, ziół, produktów
- **Ciepło natury** — paleta ziemista, drewno, mech, piaskowiec
- **Nowoczesność** — czysta typografia, subtelne animacje, szybkie ładowanie
- **Zaufanie** — certyfikaty, recenzje, transparentność
- **Austriacki charakter** — alpejska elegancja, jakość rzemieślnicza
- **Tożsamość Sylvaventis** — marka niezależna, premium, z duchem lasu

### 3.2 Nowa paleta kolorów

```
NATURE PALETTE — „Waldgeist" (Duch Lasu)
═══════════════════════════════════════════

Tła (backgrounds):
  --kn-cream:       #FAF6F0    ← główne tło strony (ciepły krem)
  --kn-cream-warm:  #F3EDE2    ← tło kart, sekcji alternatywnych
  --kn-parchment:   #E8DFD0    ← tło footera, pasków

Zieleń (greens — główny kolor marki):
  --kn-forest:      #2D4A2E    ← ciemna zieleń leśna (nawigacja, CTA)
  --kn-moss:        #4A6741    ← mech (hovery, sekcje)
  --kn-sage:        #7A8B6F    ← szałwia (tekst wtórny, bordery)
  --kn-mint:        #C5D4BC    ← mięta (subtelne tła, highlights)

Ziemia (earths — ciepłe akcenty):
  --kn-bark:        #5C3D2E    ← kora (nagłówki, tekst główny)
  --kn-amber:       #B8863A    ← bursztyn (akcenty, ceny, CTA hover)
  --kn-terracotta:  #A65D3F    ← terakota (sale badges, alerts)
  --kn-sand:        #C9B896    ← piasek (bordery, dividers)

Neutralne (neutrals):
  --kn-charcoal:    #1A1612    ← tekst główny
  --kn-stone:       #6B635A    ← tekst wtórny
  --kn-fog:         #9B9488    ← tekst wyciszony
  --kn-white:       #FFFFFF    ← czysta biel (nagłówek na ciemnym tle)
```

### 3.3 Typografia

```
Headings:    „Playfair Display" (serif, elegancki, naturalny charakter)
Body:        „Source Sans 3" (sans-serif, czytelny, nowoczesny)
Accent/Nav:  „Outfit" (geometric sans, uppercase tracking)
```

- H1: Playfair Display, 48-72px, letter-spacing: -0.02em
- H2: Playfair Display, 36-48px
- Body: Source Sans 3, 16px, line-height: 1.7
- Nav links: Outfit, 11px, uppercase, tracking: 0.15em
- Labels/badges: Outfit, 9px, uppercase, tracking: 0.3em

### 3.4 Kluczowe elementy designu

#### Nawigacja
- **Górny pasek anonsów**: ciemna zieleń `--kn-forest` z tekstem o darmowej dostawie
- **Sticky header**: kremowe tło `--kn-cream` z logo **Sylvaventis** pośrodku, nawigacja po bokach
- **Mega-menu**: dropdown z kategoriami (8 kategorii jak w kopfnote), zdjęcie kategorii po prawej
- **Mobilne**: hamburger → fullscreen drawer z animacją slide-in

#### Hero
- **Full-width**: prawdziwa fotografia lasu/natury (inspiracja z kopfnote, pod marką Sylvaventis)
- **Text overlay**: misja marki Sylvaventis po niemiecku, na ciemnym overlay
- **CTA**: przycisk w kolorze `--kn-forest` z tekstem „JETZT ENTDECKEN"
- **Parallax**: subtelny efekt parallax na scroll (nie agresywny)

#### Karty produktów
- **Styl**: zaokrąglone rogi (8px), cień 0 2px 12px rgba(0,0,0,0.06)
- **Hover**: uniesienie karty + cień się powiększa, subtelne scale(1.02)
- **Zdjęcie**: aspect-ratio 1:1, object-fit: cover
- **Info**: nazwa produktu (Playfair), cena (Outfit bold), badge „Sale" w terakocie
- **Brak greyscale** — produkty mają naturalne, ciepłe kolory

#### Sekcja Eco / Zrównoważony rozwój
- **Tło**: panoramiczna fotografia lasu (jak w oryginale)
- **Statystyki**: ikony w pomarańczu + liczby animowane (count-up on scroll)
- **Treść**: miesiące climate-positive, posadzone drzewa, usunięte plastiki

#### Footer
- **Tło**: `--kn-parchment`
- **Struktura**: 4 kolumny (marka, nawigacja, informacje, kontakt)
- **Social**: Instagram, Facebook (konta Sylvaventis)
- **Legal**: Impressum, Datenschutz, AGB, Widerrufsbelehrung (wymogi austriackie)

---

## 4. Architektura stron

### 4.1 Mapa stron

```
/                          → Strona główna
/collections               → Wszystkie kategorie (kafelki)
/collections/[slug]         → Kategoria z produktami + filtry
/products/[slug]            → Strona produktu (galeria, opis, warianty, koszyk)
/cart                       → Koszyk
/checkout                   → Checkout
/checkout/thank-you         → Podziękowanie po zakupie
/about                      → O nas / Über uns
/account                    → Konto klienta
/login                      → Logowanie / Rejestracja
/pages/impressum            → Impressum (wymóg prawny AT)
/pages/datenschutz          → Polityka prywatności
/pages/agb                  → Ogólne warunki handlowe
/pages/widerruf             → Prawo do odstąpienia
/pages/versand              → Informacje o wysyłce
```

### 4.2 Strona główna — sekcje

1. **Announcement Bar** — „Versandkostenfrei ab 80€ in Österreich"
2. **Navbar** — logo + mega-menu (8 kategorii)
3. **Hero** — full-screen, fotografia natury, misja, CTA
4. **Featured Categories** — 4-6 kafelków z najważniejszymi kategoriami
5. **Bestseller Products** — siatka 3-4 topowych produktów
6. **Brand Story** — krótki tekst o filozofii Sylvaventis + zdjęcie produktów
7. **Eco Impact** — statystyki klimatyczne (animowane)
8. **Testimonials / Google Reviews** — integracja lub statyczne cytaty
9. **Newsletter** — zapis do newslettera z rabatem powitalnym
10. **Footer** — pełny footer z linkami i informacjami prawnymi

### 4.3 Strona produktu — layout

```
┌──────────────────────────────────────────┐
│  Breadcrumb: Home > Kategoria > Produkt  │
├──────────────┬───────────────────────────┤
│              │  Nazwa produktu (H1)      │
│  Galeria     │  Cena / Sale price        │
│  (carousel)  │  Krótki opis              │
│              │  Warianty (rozmiar/waga)   │
│              │  Quantity + Add to Cart    │
│              │  Trust badges             │
├──────────────┴───────────────────────────┤
│  Tabs: Opis | Składniki | Wysyłka       │
├──────────────────────────────────────────┤
│  Powiązane produkty                      │
└──────────────────────────────────────────┘
```

---

## 5. Co warto dodać (vs oryginał)

### 5.1 Funkcjonalności nowe
- [ ] **Mega-menu** z podkategoriami i zdjęciami
- [ ] **Breadcrumbs** na stronach kategorii i produktów
- [ ] **Product image gallery** z zoom i carousel (lightbox)
- [ ] **Warianty produktów** (rozmiary/wagi) z dynamiczną ceną
- [ ] **Product tabs** (opis, składniki, informacje o wysyłce)
- [ ] **Related products** na stronie produktu
- [ ] **Wishlist** (lista życzeń)
- [ ] **Newsletter signup** z popup (z opóźnieniem 10s)
- [ ] **Cookie consent** (GDPR/DSGVO — wymóg w AT)
- [ ] **Impressum / AGB / Datenschutz** — strony prawne (obowiązkowe w Austrii)
- [ ] **Multi-language** (DE primary, EN secondary)
- [ ] **Trust badges** (bezpieczna płatność, darmowa dostawa, gwarancja zwrotu)
- [ ] **Animowane statystyki eco** (count-up on scroll)
- [ ] **PWA** — offline mode, install prompt

### 5.2 Ulepszenia vs Shopify
- [ ] **Szybkość**: < 2s LCP (Shopify miał 4-6s)
- [ ] **SEO**: server-side rendering, structured data (JSON-LD)
- [ ] **Core Web Vitals**: zielone wyniki
- [ ] **Accessibility**: WCAG 2.1 AA
- [ ] **Smooth page transitions** (View Transitions API)
- [ ] **Image optimization**: next/image + WebP/AVIF
- [ ] **Predictive search** (Algolia instant)

---

## 6. Treść do przetłumaczenia / zachowania

### 6.1 Kluczowe copy (DE)
- **Hero**: „Finde zurück zu ganzheitlichem Wohlgefühl mit vergessenen Pflanzengeistern und wohltuendem Räucherwerk"
- **Sub-hero**: „Die Kopfnote hilft Dir, mit traditionellem & modernem Wissen, botanischen Raritäten und nachhaltigen Produkten, zurück zu natürlichem Wohlbefinden und ganzheitlicher Gesundheit."
- **CTA**: „JETZT ENTDECKEN"
- **Shipping**: „VERSANDKOSTENFREI ab 80€ in Österreich"

### 6.2 Eco stats (do zachowania)
- 29 Monate Klima-positiv
- 6.943 Bäume gepflanzt
- 13.814 Plastikflaschen entfernt
- 6.907 Tonnen CO₂ abgebaut
- 3,91 Fußballplätze mit Bäumen bepflanzt

---

## 7. Plan implementacji — fazy

### Faza 1: Fundament (Tydzień 1)
- [x] Inicjalizacja repo, kopiowanie bazy
- [ ] Nowa paleta kolorów i design tokens w `globals.css`
- [ ] Nowa typografia (Google Fonts: Playfair Display, Source Sans 3, Outfit)
- [ ] Rebranding Navbar (logo Sylvaventis, kremowe tło, mega-menu)
- [ ] Rebranding Hero (fotografia natury, niemiecki copy Sylvaventis, CTA)
- [ ] Rebranding Footer (dane Sylvaventis, linki prawne AT)

### Faza 2: Strony produktowe (Tydzień 2)
- [ ] Nowy ProductCard (ciepły styl, bez greyscale)
- [ ] Strona kategorii z filtrami
- [ ] Strona produktu (galeria, warianty, tabs)
- [ ] Related products section
- [ ] Breadcrumbs component

### Faza 3: E-commerce flow (Tydzień 3)
- [ ] Cart drawer rebranding
- [ ] Checkout flow rebranding
- [ ] Trust badges / payment icons
- [ ] Order confirmation page

### Faza 4: Strony dodatkowe (Tydzień 4)
- [ ] About / Über uns
- [ ] Strony prawne (Impressum, AGB, Datenschutz, Widerruf)
- [ ] Newsletter signup
- [ ] Cookie consent (DSGVO)
- [ ] Eco Impact section z animacjami

### Faza 5: Polish & Deploy (Tydzień 5)
- [ ] SEO (meta tags, JSON-LD, sitemap)
- [ ] Performance (Core Web Vitals)
- [ ] PWA manifest + service worker
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Deployment na selvantis.at

---

## 8. Pliki do modyfikacji — priorytet

| Plik | Zmiana | Priorytet |
|---|---|---|
| `globals.css` | Nowa paleta, typografia, design tokens | 🔴 |
| `HeroApp.tsx` | Rebranding na Sylvaventis | 🔴 |
| `Navbar.component.tsx` | Logo Sylvaventis, mega-menu, styl kremowy | 🔴 |
| `Footer.component.tsx` | Dane Sylvaventis, linki AT | 🔴 |
| `page.tsx (home)` | Nowe sekcje, niemiecki copy Sylvaventis | 🔴 |
| `ProductCard.component.tsx` | Ciepły styl, bez greyscale | 🟡 |
| `layout.tsx` | Meta, fonty, lang="de" | 🟡 |
| `GQL_QUERIES.ts` | Dodanie pól (gallery, categories) | 🟢 |

---

> **WAŻNE**: Ten dokument jest żywym dokumentem referencyjnym. Będzie aktualizowany
> w miarę postępu prac. Każda zmiana designu powinna być zgodna z paletą „Waldgeist"
> i filozofią „natura bez sztuczności".
