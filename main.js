
/**
 * SNS 공유 버튼 섹션 생성
 * @param {string} shareText - 공유할 텍스트 (URL 포함)
 * @returns {HTMLElement}
 */
function createShareButtons(shareText) {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl  = encodeURIComponent('https://product-builder-algo.workers.dev');

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

document.addEventListener('DOMContentLoaded', () => {
    // Theme switching logic
    const themeSwitch = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeSwitch.checked = true;
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }

    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // Menu Recommendation Elements
    const recommendMenuBtn = document.getElementById('recommend-menu-btn');
    const menuRecommendationContainer = document.getElementById('menu-recommendation-container');

    // Pet Face Test Elements
    const imageUpload = document.getElementById('image-upload');
    const uploadedImage = document.getElementById('uploaded-image');
    const labelContainer = document.getElementById('label-container');

    // Calendar Elements
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const recommendMenu = async () => {
        menuRecommendationContainer.innerHTML = '<p class="loading-text">Generating menu...</p>';
        recommendMenuBtn.disabled = true;

        // Placeholder for AI model integration
        setTimeout(() => {
            const menus = [
                // 한식
                "김치찌개", "된장찌개", "순두부찌개", "부대찌개", "삼겹살",
                "비빔밥", "돌솥비빔밥", "냉면", "떡볶이", "순대국밥",
                "설렁탕", "갈비탕", "삼계탕", "갈비구이", "불고기",
                "쌈밥", "치킨", "족발", "보쌈", "곱창",
                // 일식
                "Sushi", "Ramen", "Tonkatsu", "Tempura", "Udon",
                // 중식
                "짜장면", "짬뽕", "탕수육", "마라탕", "Dim Sum",
                // 양식·기타
                "Pizza", "Pasta", "Burger", "Steak", "Tacos",
                "Shawarma", "Pho", "Pad Thai", "Tom Yum", "Fish & Chips"
            ];
            const randomMenu = menus[Math.floor(Math.random() * menus.length)];
            menuRecommendationContainer.innerHTML = '';
            const resultP = document.createElement('p');
            resultP.className = 'fade-in';
            resultP.textContent = `How about ${randomMenu} for dinner tonight?`;
            menuRecommendationContainer.appendChild(resultP);

            const shareText = `오늘 저녁은 ${randomMenu}! 🍽️\nAI가 추천해준 오늘의 메뉴\n👉 https://product-builder-algo.workers.dev`;
            menuRecommendationContainer.appendChild(createShareButtons(shareText));
            recommendMenuBtn.disabled = false;
        }, 1000);
    };

    const initPetTest = async () => {
        if (!imageUpload.files || imageUpload.files.length === 0) {
            alert('Please upload an image first!');
            return;
        }

        labelContainer.innerHTML = '<p class="loading-text">Analyzing image...</p>';

        // Placeholder for AI model integration
        setTimeout(() => {
            const results = [
                "🐱 고양이상! 당신은 고양이상이에요. 차갑게 생겼지만 알고 보면 누구보다 따뜻한 사람! 혼자 있는 걸 즐기고, 좋아하는 사람한테만 애교를 부리는 타입이죠. 고양이처럼 우아하게 살고 있는 당신, 오늘도 멋있어요. 🐾",
                "🐶 강아지상! 당신은 강아지상이에요. 보는 것만으로도 기분이 좋아지는 얼굴! 주변 사람들이 당신 곁에 있으면 저절로 미소가 지어진다고 해요. 충성심 강하고 에너지 넘치는 당신, 오늘도 세상을 환하게 밝히고 있어요. 🦴",
                "🐹 햄스터상! 당신은 햄스터상이에요. 두 볼에 간식을 잔뜩 넣고 다니는 귀여운 스타일! 작은 것들에서 행복을 찾고, 포근하고 아늑한 공간을 사랑하죠. 세상에서 제일 귀여운 당신, 누군가 주머니에 쏙 넣어 가고 싶다고 합니다. 🥜",
                "🦊 여우상! 당신은 여우상이에요. 영리하고 신비로운 분위기의 소유자! 첫인상은 도도하게 느껴질 수 있지만, 가까워지면 누구보다 재미있는 사람이에요. 상황 파악이 빠르고 센스 있는 당신, 어딜 가든 시선을 사로잡아요. ✨",
                "🐻 곰상! 당신은 곰상이에요. 듬직하고 포근한 인상! 옆에 있으면 왠지 모르게 안심이 되는 그런 존재예요. 겉으로는 무뚝뚝해 보여도 속은 누구보다 다정하고 따뜻한 사람. 당신 같은 친구 한 명쯤 있으면 인생이 든든해져요. 🍯",
                "🐰 토끼상! 당신은 토끼상이에요. 순하고 귀여운 외모에 청순한 분위기! 하지만 알고 보면 엄청난 에너지와 빠른 두뇌를 가진 숨은 고수예요. 토끼처럼 깡충깡충 뛰어다니며 인생을 즐기는 당신, 오늘도 사랑스럽습니다. 🥕",
                "🦁 사자상! 당신은 사자상이에요. 카리스마 넘치는 눈빛과 당당한 분위기의 소유자! 주변에서 자연스럽게 리더 역할을 맡게 되는 타입이에요. 강한 것 같아도 소중한 사람들은 끝까지 지키는 의리 있는 당신, 정말 멋있어요. 👑",
                "🐼 판다상! 당신은 판다상이에요. 보는 것만으로도 힐링이 되는 특별한 얼굴! 먹고, 자고, 놀고... 삶의 본질을 아는 당신은 행복의 달인이에요. 조금 느긋해 보여도 좋아하는 일에는 누구보다 집중하는 반전 매력의 소유자. 🎋"
            ];
            const randomResult = results[Math.floor(Math.random() * results.length)];
            labelContainer.innerHTML = '';
            const resultP = document.createElement('p');
            resultP.className = 'fade-in';
            resultP.textContent = randomResult;
            labelContainer.appendChild(resultP);

            const shareText = `${randomResult} 🐾\nAI 동물상 테스트 해봐!\n👉 https://product-builder-algo.workers.dev`;
            labelContainer.appendChild(createShareButtons(shareText));
        }, 2000);
    };

    const generateCalendar = (month, year) => {
        calendarGrid.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        currentMonthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            calendarGrid.appendChild(emptyCell);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = i;
            dayCell.classList.add('day-cell');
            dayCell.addEventListener('click', () => {
                const meal = prompt('Enter your dinner plan for this day:');
                if (meal) {
                    const mealElement = document.createElement('div');
                    mealElement.textContent = meal;
                    mealElement.classList.add('meal');
                    dayCell.appendChild(mealElement);
                }
            });
            calendarGrid.appendChild(dayCell);
        }
    };

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImage.src = e.target.result;
                uploadedImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
            initPetTest();
        }
    });

    recommendMenuBtn.addEventListener('click', recommendMenu);

    generateCalendar(currentMonth, currentYear);
});