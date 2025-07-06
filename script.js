document.addEventListener('DOMContentLoaded', () => {
    const correctYear = '2023';
    const correctMonth = '06';
    const correctDay = '09';

    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');
    const submitBtn = document.getElementById('submit-btn');
    const errorMessage = document.getElementById('error-message');

    const puzzleDiv = document.getElementById('puzzle-1');
    const rewardDiv = document.getElementById('reward');

    submitBtn.addEventListener('click', () => {
        const year = yearInput.value;
        const month = monthInput.value.padStart(2, '0'); // Ensure 2 digits
        const day = dayInput.value.padStart(2, '0');     // Ensure 2 digits

        if (year === correctYear && month === correctMonth && day === correctDay) {
            // Correct answer
            puzzleDiv.classList.add('hidden');
            rewardDiv.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        } else {
            // Incorrect answer
            errorMessage.classList.remove('hidden');
        }
    });

    // Optional: Auto-focus to next input for better UX
    yearInput.addEventListener('keyup', () => {
        if (yearInput.value.length === 4) {
            monthInput.focus();
        }
    });

    monthInput.addEventListener('keyup', () => {
        if (monthInput.value.length === 2) {
            dayInput.focus();
        }
    });

    // --- Puzzle 2 Logic ---
    const nextBtn1 = document.getElementById('next-btn-1');
    const puzzle2Div = document.getElementById('puzzle-2');
    const reward1Div = document.getElementById('reward');

    nextBtn1.addEventListener('click', () => {
        reward1Div.classList.add('hidden');
        puzzle2Div.classList.remove('hidden');
    });

    const map = document.getElementById('map');
    const errorMessage2 = document.getElementById('error-message-2');
    const reward2Div = document.getElementById('reward-2');

    // Define the "correct" area on the map (e.g., a rectangle)
    // These are relative coordinates (0 to 1)
    const correctArea = {
        minX: 0.4, // 40% from the left
        maxX: 0.6, // 60% from the left
        minY: 0.4, // 40% from the top
        maxY: 0.6, // 60% from the top
    };

    map.addEventListener('click', (event) => {
        const rect = map.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        if (x >= correctArea.minX && x <= correctArea.maxX && y >= correctArea.minY && y <= correctArea.maxY) {
            // Correct click
            map.style.filter = 'none'; // Unblur the map
            setTimeout(() => {
                puzzle2Div.classList.add('hidden');
                reward2Div.classList.remove('hidden');
            }, 1000); // Wait a second to show the unblurred map
            errorMessage2.classList.add('hidden');
        } else {
            // Incorrect click
            errorMessage2.classList.remove('hidden');
        }
    });
});
