document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const numbersContainer = document.getElementById('lotto-numbers');

    const getBallColor = (number) => {
        if (number <= 10) return '#fbc400'; // Yellow
        if (number <= 20) return '#69c8f2'; // Blue
        if (number <= 30) return '#ff7272'; // Red
        if (number <= 40) return '#aaa';    // Gray
        return '#b0d840';      // Green
    };

    const generateNumbers = () => {
        // Clear previous numbers
        numbersContainer.innerHTML = '';

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
            numbersContainer.appendChild(ball);
        });
    };

    generateBtn.addEventListener('click', generateNumbers);

    // Generate numbers on initial load
    generateNumbers();
});
