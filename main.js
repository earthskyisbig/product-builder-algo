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

    // Food Image Generator Elements
    const foodInput = document.getElementById('food-input');
    const generateFoodImageBtn = document.getElementById('generate-food-image-btn');
    const recommendationContainer = document.getElementById('recommendation-container');
    const mealImage = document.getElementById('meal-image');
    const loadingText = document.getElementById('loading-text');

    // Initial state for image generation section
    recommendationContainer.innerHTML = '<p class="initial-message">Enter a food name and click \'Generate\' to see an image!</p>';
    mealImage.style.display = 'none';

    const generateFoodImage = async () => {
        const foodName = foodInput.value.trim();
        if (!foodName) {
            alert('Please enter a food name!');
            return;
        }

        // Show loading and hide previous image
        loadingText.style.display = 'block';
        mealImage.style.display = 'none';
        recommendationContainer.innerHTML = ''; // Clear previous messages
        generateFoodImageBtn.disabled = true;

        try {
            // Using Unsplash source for random images based on search query
            const imageUrl = `https://source.unsplash.com/random/400x300/?${encodeURIComponent(foodName)}`;
            
            // Create a temporary image to check loading state
            const tempImage = new Image();
            tempImage.src = imageUrl;

            await new Promise((resolve, reject) => {
                tempImage.onload = resolve;
                tempImage.onerror = reject;
            });

            mealImage.src = imageUrl;
            mealImage.alt = `Image of ${foodName}`;
            
            // Display the image and hide loading
            mealImage.style.display = 'block';
            loadingText.style.display = 'none';

            // Optional: Add the food name as a recommendation text
            const foodNameDisplay = document.createElement('p');
            foodNameDisplay.textContent = foodName;
            foodNameDisplay.classList.add('recommendation-text', 'fade-in');
            recommendationContainer.appendChild(foodNameDisplay);

        } catch (error) {
            console.error('Error loading image:', error);
            loadingText.style.display = 'none';
            recommendationContainer.innerHTML = '<p class="initial-message">Could not load image. Please try another food name.</p>';
        } finally {
            generateFoodImageBtn.disabled = false;
        }
    };

    generateFoodImageBtn.addEventListener('click', generateFoodImage);
    foodInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            generateFoodImage();
        }
    });

    // Calendar Elements
    const dateElement = document.getElementById('current-date'); // This seems to be for the main header date
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthYearSpan = document.getElementById('currentMonthYear');
    const calendarGrid = document.getElementById('calendarGrid');

    let currentDisplayedDate = new Date(); // Month and year for calendar display
    let selectedCalendarDay = null; // To store the currently selected day in the calendar
    // The calendar now needs to store generic entries, not tied to 'dinner recommendations' specifically
    // So, we'll keep the concept of daily entries but rename for clarity
    let dailyEntries = {};

    // Set current date on initial load for the main card (retained from original)
    dateElement.textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Load/Save daily entries (e.g., generated food images, or other notes) from Local Storage
    const loadDailyEntries = () => {
        const storedEntries = localStorage.getItem('dailyEntries');
        return storedEntries ? JSON.parse(storedEntries) : {};
    };

    const saveDailyEntries = (entries) => {
        localStorage.setItem('dailyEntries', JSON.stringify(entries));
    };

    dailyEntries = loadDailyEntries();

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

            // Check for existing entry for this day
            const dateKey = `${year}-${month + 1}-${day}`;
            if (dailyEntries[dateKey]) {
                const mealEntry = document.createElement('span');
                mealEntry.classList.add('meal-entry');
                // Displaying the food name that was generated
                mealEntry.textContent = dailyEntries[dateKey].foodName; 
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

                // When a day is clicked, if there's a food image currently displayed,
                // we'll associate it with this day.
                if (mealImage.style.display === 'block' && foodInput.value.trim()) {
                    dailyEntries[dateKey] = {
                        foodName: foodInput.value.trim(),
                        imageUrl: mealImage.src
                    };
                    saveDailyEntries(dailyEntries);
                    renderCalendar(); // Re-render to update the meal entry
                } else if (dailyEntries[dateKey]) {
                    // If no new image is generated but there's an entry for this day,
                    // display its image in the main section.
                    mealImage.src = dailyEntries[dateKey].imageUrl;
                    mealImage.alt = `Image of ${dailyEntries[dateKey].foodName}`;
                    mealImage.style.display = 'block';
                    recommendationContainer.innerHTML = '';
                    const foodNameDisplay = document.createElement('p');
                    foodNameDisplay.textContent = dailyEntries[dateKey].foodName;
                    foodNameDisplay.classList.add('recommendation-text', 'fade-in');
                    recommendationContainer.appendChild(foodNameDisplay);
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