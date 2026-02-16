# SNS Sharing Feature Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Facebook·X·Instagram·TikTok 공유 버튼을 메뉴 추천과 Pet Face Test 결과에 추가해 바이럴 유도

**Architecture:** `main.js`에 `createShareButtons(text)` 유틸 함수를 만들고, 각 결과 렌더링 시 호출해 버튼 블록을 DOM에 삽입한다. Facebook·X는 URL 팝업, Instagram·TikTok은 클립보드 복사 + 툴팁.

**Tech Stack:** Vanilla JS (Clipboard API), CSS (플랫폼 컬러, 툴팁 애니메이션) — 외부 라이브러리 없음

---

### Task 1: CSS — 공유 버튼 스타일 추가

**Files:**
- Modify: `style.css`

**Step 1: 파일 끝에 아래 CSS 추가**

```css
/* ── SNS Share Buttons ── */
.share-section {
    margin-top: 16px;
    text-align: center;
}

.share-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-bottom: 8px;
}

.share-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
}

.share-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border: none;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
    position: relative;
}

.share-btn:hover  { opacity: 0.85; transform: translateY(-1px); }
.share-btn:active { transform: scale(0.97); }

.share-btn.facebook  { background: #1877F2; }
.share-btn.x-twitter { background: #000; }
.share-btn.instagram {
    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}
.share-btn.tiktok    { background: #010101; border: 1px solid #333; }

.share-btn .copied-tip {
    display: none;
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.75);
    color: #fff;
    font-size: 0.75rem;
    padding: 4px 10px;
    border-radius: 8px;
    white-space: nowrap;
    pointer-events: none;
}

.share-btn .copied-tip.show { display: block; }
```

**Step 2: 확인**

```bash
grep -n "share-btn\|share-section\|instagram\|tiktok" /home/user/product-algo/style.css | tail -20
```

**Step 3: 커밋**

```bash
git -C /home/user/product-algo add style.css && git -C /home/user/product-algo commit -m "feat: add SNS share button styles"
```

---

### Task 2: JS — createShareButtons 유틸 함수 추가

**Files:**
- Modify: `main.js`

**Step 1: `main.js` 의 `document.addEventListener('DOMContentLoaded', () => {` 바로 위에 아래 함수 추가**

```js
/**
 * SNS 공유 버튼 섹션 생성
 * @param {string} shareText - 공유할 텍스트 (URL 포함)
 * @returns {HTMLElement}
 */
function createShareButtons(shareText) {
    const siteUrl = 'https://product-builder-algo.workers.dev';
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl  = encodeURIComponent(siteUrl);

    const section = document.createElement('div');
    section.className = 'share-section';
    section.innerHTML = `<p class="share-label">공유하기</p><div class="share-buttons"></div>`;
    const btns = section.querySelector('.share-buttons');

    // Facebook
    const fb = document.createElement('button');
    fb.className = 'share-btn facebook';
    fb.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg> Facebook`;
    fb.addEventListener('click', () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`, '_blank', 'width=600,height=400');
    });

    // X (Twitter)
    const tw = document.createElement('button');
    tw.className = 'share-btn x-twitter';
    tw.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> X`;
    tw.addEventListener('click', () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank', 'width=600,height=400');
    });

    // Instagram (clipboard)
    const ig = document.createElement('button');
    ig.className = 'share-btn instagram';
    ig.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> Instagram`;
    const igTip = document.createElement('span');
    igTip.className = 'copied-tip';
    igTip.textContent = '📋 복사됐어요! 인스타그램 앱에 붙여넣기 하세요';
    ig.appendChild(igTip);
    ig.addEventListener('click', () => {
        navigator.clipboard.writeText(shareText).then(() => {
            igTip.classList.add('show');
            setTimeout(() => igTip.classList.remove('show'), 2500);
        });
    });

    // TikTok (clipboard)
    const tt = document.createElement('button');
    tt.className = 'share-btn tiktok';
    tt.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/></svg> TikTok`;
    const ttTip = document.createElement('span');
    ttTip.className = 'copied-tip';
    ttTip.textContent = '📋 복사됐어요! 틱톡 앱에 붙여넣기 하세요';
    tt.appendChild(ttTip);
    tt.addEventListener('click', () => {
        navigator.clipboard.writeText(shareText).then(() => {
            ttTip.classList.add('show');
            setTimeout(() => ttTip.classList.remove('show'), 2500);
        });
    });

    btns.append(fb, tw, ig, tt);
    return section;
}
```

**Step 2: 확인**

```bash
grep -n "createShareButtons\|share-btn\|clipboard" /home/user/product-algo/main.js | head -10
```

**Step 3: 커밋**

```bash
git -C /home/user/product-algo add main.js && git -C /home/user/product-algo commit -m "feat: add createShareButtons utility function"
```

---

### Task 3: 메뉴 추천 결과에 공유 버튼 연결

**Files:**
- Modify: `main.js` — `recommendMenu` 함수 내부

**Step 1: `recommendMenu` 함수의 결과 렌더링 부분 수정**

현재 코드 (main.js ~line 52):
```js
menuRecommendationContainer.innerHTML = `<p class="fade-in">How about ${randomMenu} for dinner tonight?</p>`;
recommendMenuBtn.disabled = false;
```

교체:
```js
menuRecommendationContainer.innerHTML = '';
const resultP = document.createElement('p');
resultP.className = 'fade-in';
resultP.textContent = `How about ${randomMenu} for dinner tonight?`;
menuRecommendationContainer.appendChild(resultP);

const shareText = `오늘 저녁은 ${randomMenu}! 🍽️\nAI가 추천해준 오늘의 메뉴\n👉 https://product-builder-algo.workers.dev`;
menuRecommendationContainer.appendChild(createShareButtons(shareText));
recommendMenuBtn.disabled = false;
```

**Step 2: 브라우저에서 수동 확인**

`http://localhost` 에서 "Recommend Menu" 클릭 → 결과 아래 공유 버튼 4개 표시 확인

**Step 3: 커밋**

```bash
git -C /home/user/product-algo add main.js && git -C /home/user/product-algo commit -m "feat: add share buttons to menu recommendation result"
```

---

### Task 4: Pet Face Test 결과에 공유 버튼 연결

**Files:**
- Modify: `main.js` — `initPetTest` 함수 내부

**Step 1: `initPetTest` 함수의 결과 렌더링 부분 수정**

현재 코드 (main.js ~line 73):
```js
labelContainer.innerHTML = `<p class="fade-in">${randomResult}</p>`;
```

교체:
```js
labelContainer.innerHTML = '';
const resultP = document.createElement('p');
resultP.className = 'fade-in';
resultP.textContent = randomResult;
labelContainer.appendChild(resultP);

const shareText = `${randomResult} 🐾\nAI 동물상 테스트 해봐!\n👉 https://product-builder-algo.workers.dev`;
labelContainer.appendChild(createShareButtons(shareText));
```

**Step 2: 브라우저에서 수동 확인**

이미지 업로드 → 결과 아래 공유 버튼 4개 표시 확인

**Step 3: 커밋**

```bash
git -C /home/user/product-algo add main.js && git -C /home/user/product-algo commit -m "feat: add share buttons to pet face test result"
```

---

### Task 5: 최종 확인 및 push

**Step 1: 전체 확인**

```bash
grep -n "createShareButtons\|share-section\|share-btn" /home/user/product-algo/main.js
grep -n "share-btn\|instagram\|tiktok" /home/user/product-algo/style.css | wc -l
```

**Step 2: push**

```bash
git -C /home/user/product-algo push
```
