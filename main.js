document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const recommendationContainer = document.getElementById('recommendation-container');
    const dateElement = document.getElementById('current-date');
    const themeSwitch = document.getElementById('checkbox');
    const mealImage = document.getElementById('meal-image'); // Reference to the meal image

    // Calendar Elements
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthYearSpan = document.getElementById('currentMonthYear');
    const calendarGrid = document.getElementById('calendarGrid');

    let currentDisplayedDate = new Date(); // Month and year for calendar display
    let selectedCalendarDay = null; // To store the currently selected day in the calendar
    let currentRecommendation = { category: '', dish: '', imageUrl: '' }; // Stores the last generated recommendation

    // Load recommendations from Local Storage
    const loadDailyRecommendations = () => {
        const storedRecommendations = localStorage.getItem('dailyRecommendations');
        return storedRecommendations ? JSON.parse(storedRecommendations) : {};
    };

    const saveDailyRecommendations = (recommendations) => {
        localStorage.setItem('dailyRecommendations', JSON.stringify(recommendations));
    };

    let dailyRecommendations = loadDailyRecommendations();

    // Theme switching logic
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

    // Set current date on initial load for the main card
    dateElement.textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const dinnerRecommendations = {
        "Korean": [
            { name: "Kimchi Stew", imageUrl: "https://source.unsplash.com/random/400x300/?kimchi-stew" },
            { name: "Bibimbap", imageUrl: "https://source.unsplash.com/random/400x300/?bibimbap" },
            { name: "Bulgogi", imageUrl: "https://source.unsplash.com/random/400x300/?bulgogi" },
            { name: "Japchae", imageUrl: "https://source.unsplash.com/random/400x300/?japchae" },
            { name: "Tteokbokki", imageUrl: "https://source.unsplash.com/random/400x300/?tteokbokki" }
        ],
        "Italian": [
            { name: "Spaghetti Carbonara", imageUrl: "https://source.unsplash.com/random/400x300/?spaghetti-carbonara" },
            { name: "Pizza Margherita", imageUrl: "https://source.unsplash.com/random/400x300/?pizza-margherita" },
            { name: "Lasagna", imageUrl: "https://source.unsplash.com/random/400x300/?lasagna" },
            { name: "Risotto", imageUrl: "https://source.unsplash.com/random/400x300/?risotto" },
            { name: "Fettuccine Alfredo", imageUrl: "https://source.unsplash.com/random/400x300/?fettuccine-alfredo" }
        ],
        "Mexican": [
            { name: "Beef Tacos", imageUrl: "https://source.unsplash.com/random/400x300/?beef-tacos" },
            { name: "Enchiladas", imageUrl: "https://source.unsplash.com/random/400x300/?enchiladas" },
            { name: "Quesadillas", imageUrl: "https://source.unsplash.com/random/400x300/?quesadillas" },
            { name: "Burritos", imageUrl: "https://source.unsplash.com/random/400x300/?burritos" },
            { name: "Chiles Rellenos", imageUrl: "https://source.unsplash.com/random/400x300/?chiles-rellenos" }
        ],
        "Indian": [
            { name: "Chicken Curry", imageUrl: "https://source.unsplash.com/random/400x300/?chicken-curry" },
            { name: "Dal Makhani", imageUrl: "https://source.unsplash.com/random/400x300/?dal-makhani" },
            { name: "Paneer Butter Masala", imageUrl: "https://source.unsplash.com/random/400x300/?paneer-butter-masala" },
            { name: "Biryani", imageUrl: "https://source.unsplash.com/random/400x300/?biryani" },
            { name: "Samosa", imageUrl: "https://source.unsplash.com/random/400x300/?samosa" }
        ],
        "Japanese": [
            { name: "Sushi", imageUrl: "https://source.unsplash.com/random/400x300/?sushi" },
            { name: "Ramen", imageUrl: "https://source.unsplash.com/random/400x300/?ramen" },
            { name: "Tempura", imageUrl: "https://source.unsplash.com/random/400x300/?tempura" },
            { name: "Teriyaki Chicken", imageUrl: "https://source.unsplash.com/random/400x300/?teriyaki-chicken" },
            { name: "Udon", imageUrl: "https://source.unsplash.com/random/400x300/?udon" }
        ],
        "Chinese": [
            { name: "Sweet and Sour Pork", imageUrl: "https://source.unsplash.com/random/400x300/?sweet-sour-pork" },
            { name: "Chow Mein", imageUrl: "https://source.unsplash.com/random/400x300/?chow-mein" },
            { name: "Mapo Tofu", imageUrl: "https://source.unsplash.com/random/400x300/?mapo-tofu" },
            { name: "Kung Pao Chicken", imageUrl: "https://source.unsplash.com/random/400x300/?kung-pao-chicken" },
            { name: "Dumplings", imageUrl: "https://source.unsplash.com/random/400x300/?dumplings" }
        ],
        "American": [
            { name: "Classic Cheeseburger", imageUrl: "https://source.unsplash.com/random/400x300/?cheeseburger" },
            { name: "BBQ Ribs", imageUrl: "https://source.unsplash.com/random/400x300/?bbq-ribs" },
            { name: "Fried Chicken", imageUrl: "https://source.unsplash.com/random/400x300/?fried-chicken" },
            { name: "Mac and Cheese", imageUrl: "https://source.unsplash.com/random/400x300/?mac-cheese" },
            { name: "Hot Dogs", imageUrl: "https://source.unsplash.com/random/400x300/?hot-dogs" }
        ],
        "Mediterranean": [
            { name: "Falafel Wraps", imageUrl: "https://source.unsplash.com/random/400x300/?falafel-wraps" },
            { name: "Hummus and Pita", imageUrl: "https://source.unsplash.com/random/400x300/?hummus-pita" },
            { name: "Greek Salad", imageUrl: "https://source.unsplash.com/random/400x300/?greek-salad" },
            { name: "Moussaka", imageUrl: "https://source.unsplash.com/random/400x300/?moussaka" },
            { name: "Shawarma", imageUrl: "https://source.unsplash.com/random/400x300/?shawarma" }
        ],
        "Thai": [
            { name: "Pad Thai", imageUrl: "https://source.unsplash.com/random/400x300/?pad-thai" },
            { name: "Green Curry", imageUrl: "https://source.unsplash.com/random/400x300/?green-curry" },
            { name: "Tom Yum Soup", imageUrl: "https://source.unsplash.com/random/400x300/?tom-yum-soup" },
            { name: "Massaman Curry", imageUrl: "https://source.unsplash.com/random/400x300/?massaman-curry" },
            { name: "Spring Rolls", imageUrl: "https://source.unsplash.com/random/400x300/?spring-rolls" }
        ],
        "French": [
            { name: "Coq au Vin", imageUrl: "https://source.unsplash.com/random/400x300/?coq-au-vin" },
            { name: "Beef Bourguignon", imageUrl: "https://source.unsplash.com/random/400x300/?beef-bourguignon" },
            { name: "Croque Monsieur", imageUrl: "https://source.unsplash.com/random/400x300/?croque-monsieur" },
            { name: "Ratatouille", imageUrl: "https://source.unsplash.com/random/400x300/?ratatouille" },
            { name: "French Onion Soup", imageUrl: "https://source.unsplash.com/random/400x300/?french-onion-soup" }
        ]
    };

    const generateRecommendation = () => {
        recommendationContainer.innerHTML = ''; // Clear previous text
        mealImage.style.display = 'none'; // Hide image initially
        generateBtn.disabled = true;

        const categories = Object.keys(dinnerRecommendations);
        const randomCategoryIndex = Math.floor(Math.random() * categories.length);
        const selectedCategory = categories[randomCategoryIndex];
        const dishes = dinnerRecommendations[selectedCategory];
        const randomDishIndex = Math.floor(Math.random() * dishes.length);
        const selectedDish = dishes[randomDishIndex]; // Get the full dish object

        const recommendationName = selectedDish.name;
        const imageUrl = selectedDish.imageUrl || `https://source.unsplash.com/random/400x300/?${recommendationName.replace(/\s/g, '-')}`;

        currentRecommendation = { category: selectedCategory, dish: recommendationName, imageUrl: imageUrl };

        const categoryText = document.createElement('p');
        categoryText.textContent = selectedCategory;
        categoryText.classList.add('category-text', 'fade-in');

        const recommendationText = document.createElement('p');
        recommendationText.textContent = recommendationName;
        recommendationText.classList.add('recommendation-text', 'fade-in');

        recommendationContainer.appendChild(categoryText);
        recommendationContainer.appendChild(recommendationText);
        
        // Update and show image
        mealImage.src = imageUrl;
        mealImage.alt = `Image of ${recommendationName}`;
        mealImage.style.display = 'block';

        setTimeout(() => {
            generateBtn.disabled = false;
        }, 500);
    };

    generateBtn.addEventListener('click', generateRecommendation);

    // Initial message for recommendation and hide image
    recommendationContainer.innerHTML = '<p class="initial-message">Click \'Decide\' to find your dinner!</p>';
    mealImage.style.display = 'none';

    // Calendar Logic
    const renderCalendar = () => {
        calendarGrid.innerHTML = ''; // Clear previous days
        currentMonthYearSpan.textContent = currentDisplayedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });

        const year = currentDisplayedDate.getFullYear();
        const month = currentDisplayedDate.getMonth(); // 0-indexed

        // Get the first day of the month and last day of the month
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const numDaysInMonth = lastDayOfMonth.getDate();

        // Calculate starting day of the week (0=Sunday, 6=Saturday)
        const startDayOfWeek = firstDayOfMonth.getDay();

        // Fill in leading empty days
        for (let i = 0; i < startDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'inactive');
            calendarGrid.appendChild(emptyDay);
        }

        // Fill in days of the month
        for (let day = 1; day <= numDaysInMonth; day++) {
            const calendarDay = document.createElement('div');
            calendarDay.classList.add('calendar-day');

            const dayNumber = document.createElement('span');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = day;
            calendarDay.appendChild(dayNumber);

            // Check for existing recommendation for this day
            const dateKey = `${year}-${month + 1}-${day}`;
            if (dailyRecommendations[dateKey]) {
                const mealEntry = document.createElement('span');
                mealEntry.classList.add('meal-entry');
                mealEntry.textContent = dailyRecommendations[dateKey].dish;
                calendarDay.appendChild(mealEntry);
            }

            calendarDay.addEventListener('click', () => {
                // Remove 'selected' from previously selected day
                if (selectedCalendarDay) {
                    selectedCalendarDay.classList.remove('selected');
                }
                // Add 'selected' to current day
                calendarDay.classList.add('selected');
                selectedCalendarDay = calendarDay;

                // Assign current recommendation to this day
                if (currentRecommendation.dish) {
                    dailyRecommendations[dateKey] = currentRecommendation;
                    saveDailyRecommendations(dailyRecommendations);
                    renderCalendar(); // Re-render to update the meal entry
                }
            });

            calendarGrid.appendChild(calendarDay);
        }
    };

    prevMonthBtn.addEventListener('click', () => {
        currentDisplayedDate.setMonth(currentDisplayedDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDisplayedDate.setMonth(currentDisplayedDate.getMonth() + 1);
        renderCalendar();
    });

    // Initial calendar render
    renderCalendar();
});