document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const recommendationContainer = document.getElementById('recommendation-container');
    const dateElement = document.getElementById('current-date');
    const themeSwitch = document.getElementById('checkbox');

    // Calendar Elements
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthYearSpan = document.getElementById('currentMonthYear');
    const calendarGrid = document.getElementById('calendarGrid');

    let currentDisplayedDate = new Date(); // Month and year for calendar display
    let selectedCalendarDay = null; // To store the currently selected day in the calendar
    let currentRecommendation = { category: '', dish: '' }; // Stores the last generated recommendation

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
        "Korean": ["Kimchi Stew", "Bibimbap", "Bulgogi", "Japchae", "Tteokbokki"],
        "Italian": ["Spaghetti Carbonara", "Pizza Margherita", "Lasagna", "Risotto", "Fettuccine Alfredo"],
        "Mexican": ["Beef Tacos", "Enchiladas", "Quesadillas", "Burritos", "Chiles Rellenos"],
        "Indian": ["Chicken Curry", "Dal Makhani", "Paneer Butter Masala", "Biryani", "Samosa"],
        "Japanese": ["Sushi", "Ramen", "Tempura", "Teriyaki Chicken", "Udon"],
        "Chinese": ["Sweet and Sour Pork", "Chow Mein", "Mapo Tofu", "Kung Pao Chicken", "Dumplings"],
        "American": ["Classic Cheeseburger", "BBQ Ribs", "Fried Chicken", "Mac and Cheese", "Hot Dogs"],
        "Mediterranean": ["Falafel Wraps", "Hummus and Pita", "Greek Salad", "Moussaka", "Shawarma"],
        "Thai": ["Pad Thai", "Green Curry", "Tom Yum Soup", "Massaman Curry", "Spring Rolls"],
        "French": ["Coq au Vin", "Beef Bourguignon", "Croque Monsieur", "Ratatouille", "French Onion Soup"]
    };

    const generateRecommendation = () => {
        recommendationContainer.innerHTML = '';
        generateBtn.disabled = true;

        const categories = Object.keys(dinnerRecommendations);
        const randomCategoryIndex = Math.floor(Math.random() * categories.length);
        const selectedCategory = categories[randomCategoryIndex];
        const dishes = dinnerRecommendations[selectedCategory];
        const randomDishIndex = Math.floor(Math.random() * dishes.length);
        const recommendation = dishes[randomDishIndex];

        currentRecommendation = { category: selectedCategory, dish: recommendation };

        const categoryText = document.createElement('p');
        categoryText.textContent = selectedCategory;
        categoryText.classList.add('category-text', 'fade-in');

        const recommendationText = document.createElement('p');
        recommendationText.textContent = recommendation;
        recommendationText.classList.add('recommendation-text', 'fade-in');

        recommendationContainer.appendChild(categoryText);
        recommendationContainer.appendChild(recommendationText);
        
        setTimeout(() => {
            generateBtn.disabled = false;
        }, 500);
    };

    generateBtn.addEventListener('click', generateRecommendation);

    // Initial message for recommendation
    recommendationContainer.innerHTML = '<p class="initial-message">Click \'Decide\' to find your dinner!</p>';

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