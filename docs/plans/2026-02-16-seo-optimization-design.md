# SEO Optimization Design — Dinner Decider

**Date:** 2026-02-16
**URL:** https://product-builder-algo.workers.dev
**Approach:** Full SEO (B) — meta tags + OG + JSON-LD + robots.txt + sitemap + technical fixes

---

## Goals

- Google & Naver 양쪽 검색엔진 최적화
- 한국어 + 영어 동시 타겟 (hreflang)
- 소셜 공유 미리보기 (OG + Twitter Card)
- 구조화 데이터로 Rich Results 대응

---

## Changes

### 1. `index.html`

**Meta tags to add:**
- `<title>` 업데이트: "Dinner Decider | AI 저녁 메뉴 추천 & Fun Tools"
- `<meta name="description">`: 한/영 혼용 160자 이내
- `<meta name="keywords">`: 네이버용 키워드
- `<meta name="robots" content="index, follow">`
- `<link rel="canonical" href="https://product-builder-algo.workers.dev">`
- hreflang: ko, en, x-default (동일 URL)
- Google Search Console 인증 태그 (placeholder)
- 네이버 서치어드바이저 인증 태그 (placeholder)

**Open Graph:**
- og:type, og:url, og:title, og:description, og:image, og:locale, og:locale:alternate, og:site_name

**Twitter Card:**
- twitter:card, twitter:title, twitter:description, twitter:image

**JSON-LD (3 schemas):**
- WebSite — 사이트 전체 정보
- WebApplication — AI 메뉴 추천 도구
- Organization — 브랜드 정보

**Technical fixes:**
- Disqus `page.url`: `localhost:8080` → `https://product-builder-algo.workers.dev`

### 2. `robots.txt` (new)

```
User-agent: *
Allow: /
Sitemap: https://product-builder-algo.workers.dev/sitemap.xml
```

### 3. `sitemap.xml` (new)

Single URL entry for the homepage with weekly changefreq.

### 4. `og-image.svg` (new)

1200×630 SVG OG 이미지 — 공유 시 미리보기용.

---

## Out of Scope

- Google Search Console / 네이버 서치어드바이저 인증 코드 발급 (사용자가 직접 발급 후 교체 필요)
- 다국어 별도 페이지 분리 (현재 단일 페이지 유지)
