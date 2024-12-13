document.addEventListener("DOMContentLoaded", () => {
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];

    fetch("questions.json")
      .then((response) => response.json())
      .then((data) => {
        questions = data;
        showQuestion();
      })
      .catch((error) => console.error("Fel vid inladdning av frågor:", error));

    function showQuestion() {
      const quizContainer = document.getElementById("quiz-container");
      quizContainer.innerHTML = "";
  
      if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const questionElement = document.createElement("h2");
        questionElement.textContent = question.question;
        quizContainer.appendChild(questionElement);
  
        question.options.forEach((option) => {
          const button = document.createElement("button");
          button.textContent = option;
          button.addEventListener("click", () => checkAnswer(option));
          quizContainer.appendChild(button);
        });
      } else {
        showSummary();
      }
    }
    function checkAnswer(selectedOption) {
      const question = questions[currentQuestionIndex];
      const quizContainer = document.getElementById("quiz-container");
      const feedback = document.createElement("p");
  
      if (selectedOption === question.answer) {
        score++;
        feedback.textContent = "Rätt svar!";
        feedback.style.color = "green";
      } else {
        feedback.textContent = `Fel svar! Rätt svar är: ${question.answer}`;
        feedback.style.color = "red";
      }
  
      quizContainer.appendChild(feedback);
      setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
      }, 1000);
    }
    function showSummary() {
      const quizContainer = document.getElementById("quiz-container");
      quizContainer.innerHTML = `
        <h2>Spelet är slut!</h2>
        <p>Du fick ${score} av ${questions.length} poäng.</p>
        <p> Wooow du fick den!</p>
        <p> Grattis</p>
      `;
    }
  });
  