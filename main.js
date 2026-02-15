
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
            const menus = ["Pizza", "Burger", "Sushi", "Pasta", "Tacos", "Korean BBQ"];
            const randomMenu = menus[Math.floor(Math.random() * menus.length)];
            menuRecommendationContainer.innerHTML = `<p class="fade-in">How about ${randomMenu} for dinner tonight?</p>`;
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
                "Your face resembles a cat's! You must be independent and mysterious.",
                "You have a dog-like face! You are likely friendly and loyal.",
                "You have the face of a hamster! You must be storing snacks in your cheeks.",
                "You resemble a fox! You are probably cunning and clever."
            ];
            const randomResult = results[Math.floor(Math.random() * results.length)];
            labelContainer.innerHTML = `<p class="fade-in">${randomResult}</p>`;
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