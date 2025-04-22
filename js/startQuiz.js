const startButton = document.getElementById('startButton');
        const questionnaireArea = document.getElementById('questionnaire-area');
        const questions = document.querySelectorAll('.question-container');

        startButton.addEventListener('click', () => {
            questionnaireArea.classList.add('visible'); 
            startButton.style.display = 'none'; 
        });

        questions.forEach((question, index) => {
            const radios = question.querySelectorAll('input[type="radio"]');
            const explanation = question.querySelector('.explanation');

            radios.forEach(radio => {
                radio.addEventListener('change', () => {

                    explanation.classList.add('visible'); 
                });
            });
        });

        // TODO: Add logic for form submission and grading if needed
        // const quizForm = document.getElementById('quizForm');
        // quizForm.addEventListener('submit', (event) => {
        //     event.preventDefault(); // Prevent default form submission
        //     // Add grading logic here
        //     console.log('Quiz submitted');
        // });