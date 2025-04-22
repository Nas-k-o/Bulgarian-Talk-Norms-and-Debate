const startButton = document.getElementById('startButton');
const questionnaireArea = document.getElementById('questionnaire-area');
const questions = document.querySelectorAll('.question-container');
const quizForm = document.getElementById('quizForm'); 
const resultsArea = document.getElementById('results-area'); 
const submitButton = document.getElementById('submitButton'); 

const correctAnswers = {
    q1: 'a',  
    q2: 'a',  
    q3: 'c',  
    q4: 'c',  
    q5: 'a',  
    q6: 'b',  
    q7: 'b',  
    q8: 'a',  
    q9: 'b',  
    q10: 'b' 
};

startButton.addEventListener('click', () => {
    questionnaireArea.classList.add('visible');
    startButton.style.display = 'none';
});

questions.forEach((question) => {
    const radios = question.querySelectorAll('input[type="radio"]');
    const explanation = question.querySelector('.explanation');

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            const groupName = radio.name;
            document.querySelectorAll(`.explanation[id^="explanation${groupName.substring(1)}"]`).forEach(expl => {
                 if(expl !== explanation) expl.classList.remove('visible');
            });
            explanation.classList.add('visible');
        });
    });
});


quizForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length; 

    quizForm.querySelectorAll('.question-container').forEach(container => {
        container.style.borderColor = 'var(--border-color)'; 
    });


    for (const questionName in correctAnswers) {
        const correctAnswer = correctAnswers[questionName];
        const questionContainer = document.querySelector(`input[name="${questionName}"]`)?.closest('.question-container');
        if (!questionContainer) continue; 

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

    resultsArea.textContent = `Вашият резултат: ${score} от ${totalQuestions}`; 
    resultsArea.style.color = score >= totalQuestions / 2 ? 'green' : 'red'; 

    submitButton.disabled = true;
    submitButton.textContent = 'Предадено'; 

    quizForm.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = true;
    });


    console.log(`Quiz submitted. Score: ${score}/${totalQuestions}`);
});