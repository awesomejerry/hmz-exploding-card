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
});
