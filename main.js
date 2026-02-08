document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const recommendationContainer = document.getElementById('recommendation-container');
    const dateElement = document.getElementById('current-date');
    const themeSwitch = document.getElementById('checkbox'); // Get the theme switch

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

    // Set current date
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const dinnerRecommendations = [
        "Spaghetti Carbonara", "Chicken Stir-fry", "Beef Tacos", "Lentil Soup",
        "Salmon with Roasted Vegetables", "Pizza (homemade or delivery)", "Sushi",
        "Classic Cheeseburger", "Vegetable Curry", "Shepherd's Pie",
        "Pasta Primavera", "Grilled Cheese and Tomato Soup", "Korean BBQ",
        "Falafel Wraps", "Chicken Caesar Salad", "Mushroom Risotto",
        "Fish and Chips", "Pad Thai", "Enchiladas", "Pork Chops with Apple Sauce",
        "Shrimp Scampi", "Black Bean Burgers", "Ramen", "Mediterranean Mezze Platter",
        "Chicken and Dumplings"
    ];

    const generateRecommendation = () => {
        // Clear previous recommendation or initial message
        recommendationContainer.innerHTML = '';
        generateBtn.disabled = true; // Prevent double clicking during animation

        const randomIndex = Math.floor(Math.random() * dinnerRecommendations.length);
        const recommendation = dinnerRecommendations[randomIndex];

        const recommendationText = document.createElement('p');
        recommendationText.textContent = recommendation;
        recommendationText.classList.add('fade-in'); // Add a class for animation

        recommendationContainer.appendChild(recommendationText);
        
        // Re-enable button after a short delay
        setTimeout(() => {
            generateBtn.disabled = false;
        }, 500); // 500ms delay for animation effect
    };

    generateBtn.addEventListener('click', generateRecommendation);

    // Display initial message on load
    recommendationContainer.innerHTML = '<p class="initial-message">Click \'Decide\' to find your dinner!</p>';
});
