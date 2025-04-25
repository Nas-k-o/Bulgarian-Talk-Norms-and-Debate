const startButton = document.getElementById('startButton');
const questionnaireArea = document.getElementById('questionnaire-area');
const questions = document.querySelectorAll('.question-container');
const quizForm = document.getElementById('quizForm');
const resultsArea = document.getElementById('results-area');
const submitButton = document.getElementById('submitButton');
const levelHeading = document.querySelector('.container h2'); // Get the H2 element for level detection

// --- Store all answer sets ---
const allCorrectAnswers = {
    easy: { // Answers for norms.html (or default)
        q1: 'a', q2: 'a', q3: 'c', q4: 'c', q5: 'a', q6: 'b', q7: 'b', q8: 'a', q9: 'b', q10: 'b'
    },
    medium: { // Answers for norms-medium.html
        q1: 'a', q2: 'c', q3: 'a', q4: 'a', q5: 'b', q6: 'a', q7: 'c', q8: 'a', q9: 'b', q10: 'a'
    },
    hard: { // Answers for norms-hard.html
        q1: 'c',  // Четейки книгата, заспа на дивана. (Incorrect usage)
        q2: 'a',  // двете жени
        q3: 'c',  // Детето плачеше невъздържано. (Incorrect word)
        q4: 'a',  // На първата сричка (пръ́-)
        q5: 'a',  // изпекъл
        q6: 'd',  // Ако знаеше, щеше да дойде. (Correct verb aspect/tense) - Changed from prompt's 'г' to 'd'
        q7: 'c',  // Напиши! / Напишете!
        q8: 'c',  // бъдат
        q9: 'b',  // Тя се срещна се него. (Incorrect 'се' usage)
        q10: 'b' // срещу
    }
};

// --- Determine current level and select correct answers ---
let currentLevel = 'easy'; // Default level
if (levelHeading) { // Check if heading exists
    const levelText = levelHeading.textContent.toLowerCase(); // Use lowercase for robust comparison
    if (levelText.includes('средно')) {
        currentLevel = 'medium';
    } else if (levelText.includes('трудно')) { // Added check for 'hard' level
        currentLevel = 'hard';
    }
}

const correctAnswers = allCorrectAnswers[currentLevel]; // Select the answers for the current level

const explanations = document.querySelectorAll('.explanation'); // Get all explanation divs

// --- Event Listeners ---
startButton.addEventListener('click', () => {
    questionnaireArea.classList.add('visible');
    startButton.style.display = 'none';
});


// --- Form Submission Logic ---
quizForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let score = 0;
    if (!correctAnswers) {
        console.error("Could not determine correct answer set for this level:", currentLevel);
        resultsArea.textContent = "Грешка: Не може да се определят верните отговори за това ниво.";
        resultsArea.style.color = 'red';
        return;
    }

    const totalQuestions = Object.keys(correctAnswers).length;

    // Reset previous visual feedback
    quizForm.querySelectorAll('.question-container').forEach(container => {
        container.style.borderColor = 'var(--border-color)';
    });

    // Loop through the correct answers for the current level
    for (const questionName in correctAnswers) {
        const correctAnswer = correctAnswers[questionName];
        const questionContainer = document.querySelector(`input[name="${questionName}"]`)?.closest('.question-container');
        if (!questionContainer) {
            console.warn(`Container not found for question ${questionName}`);
            continue;
        }

        const selectedAnswerInput = quizForm.querySelector(`input[name="${questionName}"]:checked`);

        if (selectedAnswerInput) {
            const userAnswer = selectedAnswerInput.value;
            if (userAnswer === correctAnswer) {
                score++;
                questionContainer.style.borderColor = 'green';
            } else {
                questionContainer.style.borderColor = 'red';
            }
        } else {
             questionContainer.style.borderColor = 'orange';
        }
    }

    // Make all explanations visible upon submission
    explanations.forEach(explanation => {
        explanation.classList.add('visible');
    });

    // Display the results
    let levelText = '';
    if (currentLevel !== 'easy') {
        levelText = ` (${currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)} ниво)`;
    }
    resultsArea.textContent = `Вашият резултат${levelText}: ${score} от ${totalQuestions}`;
    resultsArea.style.color = score >= totalQuestions / 2 ? 'green' : 'red';

    // Disable inputs
    submitButton.disabled = true;
    submitButton.textContent = 'Предадено';
    quizForm.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = true;
    });

    console.log(`Quiz submitted (${currentLevel}). Score: ${score}/${totalQuestions}`);
});