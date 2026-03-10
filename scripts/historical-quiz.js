/**
 * HistoricalQuiz - Интерактивная викторина по истории Красноярского края
 * Управляет отображением вопросов, проверкой ответов и подсчетом баллов
 */

class HistoricalQuiz {
  /**
   * @param {string} containerId - ID контейнера для викторины
   * @param {Array} questions - Массив вопросов викторины
   */
  constructor(containerId, questions) {
    this.containerId = containerId;
    this.questions = questions || [];
    this.state = {
      currentQuestion: 0,
      score: 0,
      totalQuestions: this.questions.length,
      answered: new Array(this.questions.length).fill(false),
      userAnswers: new Array(this.questions.length).fill(-1)
    };
    this.container = null;
    this.answerLocked = false;
  }

  /**
   * Запуск/перезапуск викторины
   */
  startQuiz() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    // Сброс состояния
    this.state = {
      currentQuestion: 0,
      score: 0,
      totalQuestions: this.questions.length,
      answered: new Array(this.questions.length).fill(false),
      userAnswers: new Array(this.questions.length).fill(-1)
    };
    this.answerLocked = false;

    // Отображение первого вопроса
    this.displayQuestion(0);
  }

  /**
   * Отображение вопроса по индексу
   * @param {number} index - Индекс вопроса
   */
  displayQuestion(index) {
    if (index < 0 || index >= this.questions.length) {
      return;
    }

    const question = this.questions[index];
    this.answerLocked = false;

    const html = `
      <div class="quiz-container">
        <div class="quiz-header">
          <h3 class="quiz-title">Историческая викторина</h3>
          <div class="quiz-progress">
            Вопрос ${index + 1} из ${this.questions.length}
          </div>
        </div>
        
        <div class="quiz-question">
          <p class="quiz-question__text">${question.question}</p>
        </div>

        <div class="quiz-options">
          ${question.options.map((option, i) => `
            <button 
              class="quiz-option" 
              data-index="${i}"
              onclick="window.quizInstance.checkAnswer(${i})"
            >
              ${option}
            </button>
          `).join('')}
        </div>

        <div class="quiz-feedback" style="display: none;"></div>

        <div class="quiz-navigation">
          <button 
            class="quiz-btn quiz-btn--next" 
            onclick="window.quizInstance.nextQuestion()"
            style="display: none;"
          >
            ${index < this.questions.length - 1 ? 'Следующий вопрос' : 'Показать результаты'}
          </button>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  /**
   * Проверка выбранного ответа
   * @param {number} selectedIndex - Индекс выбранного ответа
   * @returns {boolean} - Правильный ли ответ
   */
  checkAnswer(selectedIndex) {
    if (this.answerLocked) {
      return false;
    }

    const question = this.questions[this.state.currentQuestion];
    const isCorrect = selectedIndex === question.correctAnswer;

    // Блокировка дальнейших ответов
    this.answerLocked = true;

    // Сохранение ответа
    this.state.userAnswers[this.state.currentQuestion] = selectedIndex;
    this.state.answered[this.state.currentQuestion] = true;

    if (isCorrect) {
      this.state.score++;
    }

    // Отображение обратной связи
    this.showFeedback(isCorrect, question);

    // Обновление кнопок
    const options = this.container.querySelectorAll('.quiz-option');
    options.forEach((btn, i) => {
      btn.disabled = true;
      if (i === question.correctAnswer) {
        btn.classList.add('quiz-option--correct');
      } else if (i === selectedIndex && !isCorrect) {
        btn.classList.add('quiz-option--incorrect');
      }
    });

    // Показать кнопку "Далее"
    const nextBtn = this.container.querySelector('.quiz-btn--next');
    if (nextBtn) {
      nextBtn.style.display = 'block';
    }

    return isCorrect;
  }

  /**
   * Отображение обратной связи после ответа
   * @param {boolean} isCorrect - Правильный ли ответ
   * @param {Object} question - Объект вопроса
   */
  showFeedback(isCorrect, question) {
    const feedback = this.container.querySelector('.quiz-feedback');
    if (!feedback) return;

    feedback.style.display = 'block';
    feedback.className = `quiz-feedback quiz-feedback--${isCorrect ? 'correct' : 'incorrect'}`;
    
    const message = isCorrect 
      ? '✓ Правильно!' 
      : '✗ Неправильно';
    
    const explanation = question.explanation 
      ? `<p class="quiz-feedback__explanation">${question.explanation}</p>`
      : '';

    feedback.innerHTML = `
      <p class="quiz-feedback__message">${message}</p>
      ${explanation}
    `;
  }

  /**
   * Переход к следующему вопросу
   */
  nextQuestion() {
    this.state.currentQuestion++;

    if (this.state.currentQuestion < this.questions.length) {
      this.displayQuestion(this.state.currentQuestion);
    } else {
      this.showResults();
    }
  }

  /**
   * Отображение финальных результатов
   */
  showResults() {
    const score = this.getScore();
    
    let message = '';
    if (score.percentage >= 80) {
      message = 'Отлично! Вы отлично знаете историю Красноярского края!';
    } else if (score.percentage >= 60) {
      message = 'Хорошо! Но есть куда расти.';
    } else if (score.percentage >= 40) {
      message = 'Неплохо, но стоит узнать больше об истории края.';
    } else {
      message = 'Рекомендуем изучить историю Красноярского края подробнее.';
    }

    const html = `
      <div class="quiz-results">
        <h3 class="quiz-results__title">Результаты викторины</h3>
        
        <div class="quiz-results__score">
          <div class="quiz-results__number">${score.correct} / ${score.total}</div>
          <div class="quiz-results__percentage">${score.percentage}%</div>
        </div>

        <p class="quiz-results__message">${message}</p>

        <button 
          class="quiz-btn quiz-btn--restart" 
          onclick="window.quizInstance.startQuiz()"
        >
          Пройти еще раз
        </button>
      </div>
    `;

    this.container.innerHTML = html;
  }

  /**
   * Получение текущего счета
   * @returns {Object} - Объект с результатами
   */
  getScore() {
    return {
      correct: this.state.score,
      total: this.state.totalQuestions,
      percentage: Math.round((this.state.score / this.state.totalQuestions) * 100)
    };
  }

  /**
   * Сброс викторины
   */
  resetQuiz() {
    this.startQuiz();
  }
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HistoricalQuiz;
}
