# SEO Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Google + Naver SEO 완전 최적화 — 메타 태그, OG, JSON-LD, sitemap, robots.txt 적용

**Architecture:** 단일 HTML 파일 + 정적 파일 추가. index.html의 `<head>`에 SEO 태그를 추가하고, robots.txt / sitemap.xml / og-image.svg 파일을 루트에 생성한다.

**Tech Stack:** HTML, SVG, XML — 빌드 도구 없음, 정적 파일 직접 수정

---

### Task 1: 기본 메타 태그 추가 (title, description, keywords, robots, canonical, hreflang)

**Files:**
- Modify: `index.html` (head 섹션, line 6 전후)

**Step 1: 현재 `<head>` 확인**

```bash
head -15 index.html
```
예상 출력: `<title>Dinner Decider</title>` 가 6번째 줄에 있음

**Step 2: title + 기본 메타 태그 교체**

`index.html` line 6의 `<title>Dinner Decider</title>` 을 아래로 교체:

```html
    <title>Dinner Decider | AI 저녁 메뉴 추천 &amp; Fun Tools</title>
    <meta name="description" content="AI로 오늘 저녁 메뉴를 추천받고, 저녁 캘린더와 Pet Face Test를 즐겨보세요. Get AI-powered dinner menu recommendations, a dinner calendar, and a fun pet face test.">
    <meta name="keywords" content="저녁 메뉴 추천, 오늘 뭐 먹지, AI 음식 추천, dinner recommendation, AI food, pet face test, dinner calendar">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://product-builder-algo.workers.dev">
    <link rel="alternate" hreflang="ko" href="https://product-builder-algo.workers.dev">
    <link rel="alternate" hreflang="en" href="https://product-builder-algo.workers.dev">
    <link rel="alternate" hreflang="x-default" href="https://product-builder-algo.workers.dev">
    <!-- Google Search Console 인증: 발급 후 content 값 교체 -->
    <meta name="google-site-verification" content="REPLACE_WITH_GOOGLE_VERIFICATION_CODE">
    <!-- 네이버 서치어드바이저 인증: 발급 후 content 값 교체 -->
    <meta name="naver-site-verification" content="REPLACE_WITH_NAVER_VERIFICATION_CODE">
```

**Step 3: 커밋**

```bash
git add index.html
git commit -m "seo: add title, meta description, keywords, canonical, hreflang"
```

---

### Task 2: Open Graph + Twitter Card 태그 추가

**Files:**
- Modify: `index.html` (Task 1에서 추가한 블록 바로 아래)

**Step 1: OG + Twitter 태그 삽입**

네이버 인증 태그 바로 아래에 추가:

```html
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://product-builder-algo.workers.dev">
    <meta property="og:title" content="Dinner Decider | AI 저녁 메뉴 추천">
    <meta property="og:description" content="AI로 오늘 저녁 메뉴를 추천받아보세요! Get AI-powered dinner recommendations.">
    <meta property="og:image" content="https://product-builder-algo.workers.dev/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="ko_KR">
    <meta property="og:locale:alternate" content="en_US">
    <meta property="og:site_name" content="Dinner Decider">
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Dinner Decider | AI 저녁 메뉴 추천">
    <meta name="twitter:description" content="AI로 오늘 저녁 메뉴를 추천받아보세요!">
    <meta name="twitter:image" content="https://product-builder-algo.workers.dev/og-image.png">
```

**Step 2: 커밋**

```bash
git add index.html
git commit -m "seo: add Open Graph and Twitter Card meta tags"
```

---

### Task 3: JSON-LD 구조화 데이터 추가

**Files:**
- Modify: `index.html` (`</head>` 바로 앞)

**Step 1: JSON-LD 3개 스키마 삽입**

`</head>` 바로 앞에 추가:

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://product-builder-algo.workers.dev/#website",
          "url": "https://product-builder-algo.workers.dev",
          "name": "Dinner Decider",
          "description": "AI-powered dinner menu recommendations and fun tools",
          "inLanguage": ["ko", "en"],
          "publisher": {
            "@id": "https://product-builder-algo.workers.dev/#organization"
          }
        },
        {
          "@type": "Organization",
          "@id": "https://product-builder-algo.workers.dev/#organization",
          "name": "Dinner Decider",
          "url": "https://product-builder-algo.workers.dev",
          "logo": {
            "@type": "ImageObject",
            "url": "https://product-builder-algo.workers.dev/favicon.svg"
          }
        },
        {
          "@type": "WebApplication",
          "@id": "https://product-builder-algo.workers.dev/#app",
          "name": "AI 저녁 메뉴 추천 (Dinner Recommender)",
          "url": "https://product-builder-algo.workers.dev/#menu-recommendation",
          "applicationCategory": "LifestyleApplication",
          "operatingSystem": "Any",
          "description": "AI가 오늘 저녁 메뉴를 추천해드립니다. AI-powered dinner menu recommendation tool.",
          "inLanguage": ["ko", "en"],
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "KRW"
          },
          "isPartOf": {
            "@id": "https://product-builder-algo.workers.dev/#website"
          }
        }
      ]
    }
    </script>
```

**Step 2: 커밋**

```bash
git add index.html
git commit -m "seo: add JSON-LD structured data (WebSite, Organization, WebApplication)"
```

---

### Task 4: Disqus URL 버그 수정

**Files:**
- Modify: `index.html` (Disqus 설정 스크립트)

**Step 1: 현재 Disqus URL 확인**

```bash
grep -n "page.url\|localhost" index.html
```
예상 출력: `this.page.url = "http://localhost:8080";`

**Step 2: URL 교체**

`this.page.url = "http://localhost:8080";` →

```javascript
        this.page.url = "https://product-builder-algo.workers.dev";
```

**Step 3: 커밋**

```bash
git add index.html
git commit -m "fix: update Disqus page URL from localhost to production URL"
```

---

### Task 5: `robots.txt` 생성

**Files:**
- Create: `robots.txt`

**Step 1: 파일 생성**

```
User-agent: *
Allow: /

Sitemap: https://product-builder-algo.workers.dev/sitemap.xml
```

**Step 2: 커밋**

```bash
git add robots.txt
git commit -m "seo: add robots.txt"
```

---

### Task 6: `sitemap.xml` 생성

**Files:**
- Create: `sitemap.xml`

**Step 1: 파일 생성**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://product-builder-algo.workers.dev</loc>
    <lastmod>2026-02-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ko" href="https://product-builder-algo.workers.dev"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://product-builder-algo.workers.dev"/>
  </url>
</urlset>
```

**Step 2: 커밋**

```bash
git add sitemap.xml
git commit -m "seo: add sitemap.xml with hreflang entries"
```

---

### Task 7: OG 이미지(`og-image.png`) 생성

**Files:**
- Create: `og-image.svg` (PNG 대용 — Workers에서 SVG도 제공 가능)

**Note:** og:image은 PNG가 이상적(1200×630)이나, 이 프로젝트는 빌드 도구가 없으므로 SVG로 제공한다. 추후 Squoosh 등으로 PNG 변환 권장.

**Step 1: SVG 생성**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- 배경 그라디언트 -->
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#81c7f5"/>
      <stop offset="100%" style="stop-color:#6a82fb"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- 포크+나이프 아이콘 (대형) -->
  <g transform="translate(480, 165) scale(7.5)" fill="white" opacity="0.15">
    <rect x="8.5" y="3" width="1.5" height="10" rx="0.75"/>
    <rect x="10.75" y="3" width="1.5" height="10" rx="0.75"/>
    <rect x="13" y="3" width="1.5" height="10" rx="0.75"/>
    <rect x="10.25" y="12" width="2.5" height="17" rx="1.25"/>
    <rect x="20.5" y="3" width="2" height="10" rx="1"/>
    <rect x="19.5" y="13" width="4" height="16" rx="2"/>
  </g>
  <!-- 사이트명 -->
  <text x="600" y="270" font-family="Arial, sans-serif" font-size="80" font-weight="bold"
        fill="white" text-anchor="middle">Dinner Decider</text>
  <!-- 한국어 설명 -->
  <text x="600" y="360" font-family="Arial, sans-serif" font-size="36"
        fill="white" opacity="0.9" text-anchor="middle">AI 저녁 메뉴 추천 &amp; Fun Tools</text>
  <!-- 영어 설명 -->
  <text x="600" y="420" font-family="Arial, sans-serif" font-size="28"
        fill="white" opacity="0.75" text-anchor="middle">AI-powered dinner recommendations · Pet Face Test · Calendar</text>
  <!-- URL -->
  <text x="600" y="520" font-family="Arial, sans-serif" font-size="22"
        fill="white" opacity="0.6" text-anchor="middle">product-builder-algo.workers.dev</text>
</svg>
```

**Step 2: og:image 태그 경로 업데이트**

`index.html`의 og:image URL을 `.png` → `.svg` 로 업데이트:
```
https://product-builder-algo.workers.dev/og-image.svg
```
(twitter:image도 동일하게)

**Step 3: 커밋**

```bash
git add og-image.svg index.html
git commit -m "seo: add OG image SVG for social sharing previews"
```

---

### Task 8: 최종 검증 & push

**Step 1: 전체 SEO 태그 확인**

```bash
grep -n "og:\|twitter:\|canonical\|hreflang\|robots\|description\|ld+json" index.html | head -40
```

**Step 2: 파일 존재 확인**

```bash
ls robots.txt sitemap.xml og-image.svg
```

**Step 3: git push**

```bash
git push
```

**Step 4: 검색엔진 등록 (수동)**

배포 후 직접 수행:
- Google Search Console: https://search.google.com/search-console → URL 등록 → 인증 코드 발급 → `index.html`의 `REPLACE_WITH_GOOGLE_VERIFICATION_CODE` 교체
- 네이버 서치어드바이저: https://searchadvisor.naver.com → 사이트 등록 → 인증 코드 발급 → `REPLACE_WITH_NAVER_VERIFICATION_CODE` 교체
- 사이트맵 제출: 양쪽 콘솔에서 `https://product-builder-algo.workers.dev/sitemap.xml` 제출
