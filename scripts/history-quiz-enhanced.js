/**
 * Enhanced History Quiz Component
 * Features: Random questions, answer highlighting, score display
 */

class HistoryQuizEnhanced {
  constructor(containerId, quizData) {
    this.container = document.getElementById(containerId);
    this.quizData = quizData;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.quizStarted = false;
    this.quizCompleted = false;
  }

  initialize() {
    if (!this.container) {
      console.error('Container not found:', this.containerId);
      return;
    }

    // Сразу запускаем викторину
    this.startQuiz();
  }

  startQuiz() {
    // Get 15 random questions
    this.questions = this.quizData.getRandomQuestions(15);
    this.currentQuestionIndex = 0;
    this.userAnswers = new Array(this.questions.length).fill(null);
    this.quizStarted = true;
    this.quizCompleted = false;
    this.renderQuestion();
  }

  render() {
    if (!this.quizStarted) {
      this.renderStartScreen();
    } else if (this.quizCompleted) {
      this.renderResults();
    } else {
      this.renderQuestion();
    }
  }

  renderStartScreen() {
    this.container.innerHTML = `
      <div class="quiz-start-screen">
        <div class="quiz-start-screen__content">
          <h3 class="quiz-start-screen__title">📚 Викторина по истории Красноярска</h3>
          <p class="quiz-start-screen__description">
            Проверьте свои знания об истории Красноярского края!
          </p>
          <div class="quiz-start-screen__info">
            <p>✓ 15 вопросов из более чем 30</p>
            <p>✓ Каждый тест уникален</p>
            <p>✓ Мгновенная проверка ответов</p>
            <p>✓ Подробные объяснения</p>
          </div>
          <button class="quiz-start-screen__btn" onclick="window.quizInstance.startQuiz()">
            Начать викторину
          </button>
        </div>
      </div>
    `;
  }

  renderQuestion() {
    const question = this.questions[this.currentQuestionIndex];
    const progress = this.currentQuestionIndex + 1;
    const total = this.questions.length;
    const progressPercent = (progress / total) * 100;

    let optionsHTML = question.options.map((option, index) => {
      const isSelected = this.userAnswers[this.currentQuestionIndex] === index;
      const isCorrect = index === question.correct;
      
      let className = 'quiz-option';
      if (isSelected) {
        className += isCorrect ? ' quiz-option--correct' : ' quiz-option--incorrect';
      }

      return `
        <button class="${className}" onclick="window.quizInstance.selectAnswer(${index})" ${this.userAnswers[this.currentQuestionIndex] !== null ? 'disabled' : ''}>
          <span class="quiz-option__letter">${String.fromCharCode(65 + index)}</span>
          <span class="quiz-option__text">${option}</span>
          ${isSelected && isCorrect ? '<span class="quiz-option__icon">✓</span>' : ''}
          ${isSelected && !isCorrect ? '<span class="quiz-option__icon">✗</span>' : ''}
        </button>
      `;
    }).join('');

    const explanationHTML = this.userAnswers[this.currentQuestionIndex] !== null ? `
      <div class="quiz-explanation">
        <p class="quiz-explanation__text">${question.explanation}</p>
      </div>
    ` : '';

    this.container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <div class="quiz-progress">
            <div class="quiz-progress__bar" style="width: ${progressPercent}%"></div>
          </div>
          <div class="quiz-counter">Вопрос ${progress} из ${total}</div>
        </div>

        <div class="quiz-content">
          <h3 class="quiz-question" style="color: #FFFFFF !important;">${question.question}</h3>
          
          <div class="quiz-options">
            ${optionsHTML}
          </div>

          ${explanationHTML}

          <div class="quiz-navigation">
            <button class="quiz-btn quiz-btn--secondary" onclick="window.quizInstance.previousQuestion()" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
              ← Назад
            </button>
            
            ${this.currentQuestionIndex === this.questions.length - 1 && this.userAnswers[this.currentQuestionIndex] !== null ? `
              <button class="quiz-btn quiz-btn--primary" onclick="window.quizInstance.finishQuiz()">
                Завершить викторину →
              </button>
            ` : `
              <button class="quiz-btn quiz-btn--secondary" onclick="window.quizInstance.nextQuestion()" ${this.currentQuestionIndex === this.questions.length - 1 || this.userAnswers[this.currentQuestionIndex] === null ? 'disabled' : ''}>
                Далее →
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  selectAnswer(index) {
    this.userAnswers[this.currentQuestionIndex] = index;
    this.renderQuestion();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.renderQuestion();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.renderQuestion();
    }
  }

  finishQuiz() {
    this.quizCompleted = true;
    this.renderResults();
  }

  renderResults() {
    const correctCount = this.userAnswers.reduce((count, answer, index) => {
      return count + (answer === this.questions[index].correct ? 1 : 0);
    }, 0);

    const totalCount = this.questions.length;
    const percentage = Math.round((correctCount / totalCount) * 100);
    
    let resultMessage = '';
    let resultEmoji = '';
    
    if (percentage === 100) {
      resultMessage = 'Отлично! Вы идеально знаете историю Красноярска!';
      resultEmoji = '🏆';
    } else if (percentage >= 80) {
      resultMessage = 'Превосходно! Вы отлично разбираетесь в истории!';
      resultEmoji = '⭐';
    } else if (percentage >= 60) {
      resultMessage = 'Хорошо! Вы хорошо знаете историю края!';
      resultEmoji = '👍';
    } else if (percentage >= 40) {
      resultMessage = 'Неплохо! Но есть ещё что узнать!';
      resultEmoji = '📚';
    } else {
      resultMessage = 'Рекомендуем ещё раз прочитать историю!';
      resultEmoji = '💪';
    }

    // Создаём детальный результат
    let detailedResults = this.questions.map((question, index) => {
      const userAnswer = this.userAnswers[index];
      const isCorrect = userAnswer === question.correct;
      const userAnswerText = question.options[userAnswer];
      const correctAnswerText = question.options[question.correct];

      return `
        <div class="quiz-result-item ${isCorrect ? 'quiz-result-item--correct' : 'quiz-result-item--incorrect'}">
          <div class="quiz-result-item__header">
            <span class="quiz-result-item__number">${index + 1}</span>
            <span class="quiz-result-item__status">${isCorrect ? '✓ Верно' : '✗ Неверно'}</span>
          </div>
          <p class="quiz-result-item__question">${question.question}</p>
          ${!isCorrect ? `
            <p class="quiz-result-item__answer">Ваш ответ: <strong>${userAnswerText}</strong></p>
            <p class="quiz-result-item__correct">Правильный ответ: <strong>${correctAnswerText}</strong></p>
          ` : ''}
          <p class="quiz-result-item__explanation">${question.explanation}</p>
        </div>
      `;
    }).join('');

    this.container.innerHTML = `
      <div class="quiz-results">
        <div class="quiz-results__header">
          <div class="quiz-results__emoji">${resultEmoji}</div>
          <h3 class="quiz-results__title">Викторина завершена!</h3>
          <p class="quiz-results__message">${resultMessage}</p>
        </div>

        <div class="quiz-results__score">
          <div class="quiz-results__score-circle">
            <div class="quiz-results__score-value">${correctCount}/${totalCount}</div>
            <div class="quiz-results__score-percent">${percentage}%</div>
          </div>
        </div>

        <div class="quiz-results__details">
          <h4 class="quiz-results__details-title">Подробные результаты:</h4>
          <div class="quiz-results__items">
            ${detailedResults}
          </div>
        </div>

        <div class="quiz-results__actions">
          <button class="quiz-btn quiz-btn--primary" onclick="window.quizInstance.restartQuiz()">
            Пройти викторину снова
          </button>
        </div>
      </div>
    `;
  }

  restartQuiz() {
    this.quizStarted = false;
    this.quizCompleted = false;
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.questions = [];
    // Сразу запускаем викторину снова
    this.startQuiz();
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HistoryQuizEnhanced;
}
