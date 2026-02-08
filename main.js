document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const numbersContainer = document.getElementById('numbers-container');
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

    const getBallColor = (number) => {
        if (number <= 10) return '#fbc400'; // Yellow
        if (number <= 20) return '#69c8f2'; // Blue
        if (number <= 30) return '#ff7272'; // Red
        if (number <= 40) return '#a3a3a3'; // Gray
        return '#b0d840';      // Green
    };

    const generateNumbers = () => {
        // Clear previous numbers
        numbersContainer.innerHTML = '';
        generateBtn.disabled = true; // Prevent double clicking during animation

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const row = document.createElement('div');
                row.classList.add('lotto-row');

                const numbers = new Set();
                while (numbers.size < 6) {
                    const randomNumber = Math.floor(Math.random() * 45) + 1;
                    numbers.add(randomNumber);
                }

                const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

                sortedNumbers.forEach(number => {
                    const ball = document.createElement('div');
                    ball.classList.add('lotto-ball');
                    ball.style.backgroundColor = getBallColor(number);
                    ball.textContent = number;
                    row.appendChild(ball);
                });

                numbersContainer.appendChild(row);
                
                // Re-enable button after last row
                if (i === 4) {
                    generateBtn.disabled = false;
                }
            }, i * 200); // 200ms delay for each row
        }
    };

    generateBtn.addEventListener('click', generateNumbers);

    // Generate numbers on initial load
    generateNumbers();
});
