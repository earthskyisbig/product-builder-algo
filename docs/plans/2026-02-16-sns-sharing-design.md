# SNS 공유 기능 Design — Dinner Decider

**Date:** 2026-02-16
**Platforms:** Facebook, X(Twitter), Instagram, TikTok

---

## Goals

- 메뉴 추천·Pet Face Test 결과를 SNS에 쉽게 공유해 바이럴 유도
- 인스타·틱톡은 클립보드 복사 방식 (공식 웹 공유 미지원)

---

## Share Triggers

결과가 렌더링될 때 공유 버튼 블록 동적 추가:
1. `#menu-recommendation-container` — 메뉴 추천 결과 아래
2. `#label-container` — Pet Face Test 결과 아래

---

## Platform Behavior

| Platform | Method | Color |
|----------|--------|-------|
| Facebook | `facebook.com/sharer` 팝업 | `#1877F2` |
| X | `twitter.com/intent/tweet` 팝업 | `#000000` |
| Instagram | 클립보드 복사 + 툴팁 | gradient `#f09433→#e6683c→#dc2743→#cc2366→#bc1888` |
| TikTok | 클립보드 복사 + 툴팁 | `#010101` |

---

## Share Text Templates

**메뉴 추천:**
```
오늘 저녁은 {MENU}! 🍽️
AI가 추천해준 오늘의 메뉴
👉 https://product-builder-algo.workers.dev
```

**Pet Face Test:**
```
{RESULT} 🐾
AI 동물상 테스트 해봐!
👉 https://product-builder-algo.workers.dev
```

---

## UI Spec

- 공유 버튼 4개 가로 배열
- 아이콘(SVG 인라인 or 이모지) + 플랫폼명 라벨
- 클립보드 복사 시: 버튼 텍스트 → "✓ 복사됨!" (2초 후 원복)
- 툴팁: "앱에서 붙여넣기 하세요 📋"

---

## Files to Modify

- `index.html` — 공유 버튼 HTML (결과 컨테이너 내 동적 삽입용 템플릿 불필요, JS로 생성)
- `main.js` — `createShareButtons(text)` 함수 + 각 플랫폼 핸들러
- `style.css` — `.share-buttons`, `.share-btn`, 플랫폼별 색상, 툴팁 스타일
