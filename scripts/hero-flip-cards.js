/**
 * HeroFlipCards - 3D карточки с историческими личностями
 */

class HeroFlipCards {
  constructor(containerId, heroes) {
    this.containerId = containerId;
    this.heroes = heroes || [];
    this.container = null;
    this.portraitTimers = new Map(); // Таймеры для каждого героя
  }

  initialize() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    const html = `
      <div class="hero-cards-grid">
        ${this.heroes.map(hero => this.createCard(hero)).join('')}
      </div>
    `;

    this.container.innerHTML = html;
    console.log('Hero cards initialized, attaching handlers in 100ms');

    // Добавляем задержку для инициализации обработчиков
    setTimeout(() => {
      console.log('Attaching event handlers now');
      this.attachEventHandlers();
    }, 100);
  }

  attachEventHandlers() {
    console.log('attachEventHandlers called');
    
    // Добавление обработчиков событий
    const cards = this.container.querySelectorAll('.hero-card');
    console.log('Found cards:', cards.length);
    
    cards.forEach((card, cardIndex) => {
      const heroId = card.getAttribute('data-hero-id');
      console.log(`Processing card ${cardIndex}: ${heroId}`);
      
      this.attachCardHandlers(card);
      
      // Запуск автоматической прокрутки фотографий
      this.startPortraitRotation(heroId);
    });
  }

  attachCardHandlers(card) {
    console.log('attachCardHandlers called for card:', card.getAttribute('data-hero-id'));
    
    // Добавляем обработчики для кнопок разворота
    const flipBtns = card.querySelectorAll('.hero-card__flip-btn');
    console.log('Found flip buttons:', flipBtns.length);
    flipBtns.forEach((btn, idx) => {
      btn.addEventListener('click', (e) => {
        console.log('Flip button clicked', idx);
        e.stopPropagation();
        e.preventDefault();
        this.handleFlip(card);
      });
    });
    
    // Добавляем обработчики для табов
    const tabButtons = card.querySelectorAll('.hero-card__tab-btn');
    console.log('Found tab buttons:', tabButtons.length);
    
    tabButtons.forEach((btn, btnIndex) => {
      const tabName = btn.getAttribute('data-tab');
      console.log(`Attaching handler to tab button ${btnIndex}: ${tabName}`);
      
      btn.addEventListener('click', (e) => {
        console.log('TAB BUTTON CLICKED:', tabName, 'Event:', e);
        e.stopPropagation();
        e.preventDefault();
        this.handleTabClick(btn, card);
      });
    });
  }

  createCard(hero) {
    const yearsText = hero.deathYear 
      ? `${hero.birthYear}-${hero.deathYear}`
      : `${hero.birthYear}-н.в.`;

    // Используем portraitUrls если есть, иначе portraitUrl для обратной совместимости
    const portraitUrls = hero.portraitUrls || (hero.portraitUrl ? [hero.portraitUrl] : []);

    // Генерируем табы если они есть в данных
    const tabsHtml = hero.tabs ? this.generateTabs(hero.tabs) : '';

    return `
      <div class="hero-card" data-hero-id="${hero.id}">
        <div class="hero-card__inner">
          <div class="hero-card__front">
            ${portraitUrls.length > 0 ? `
              <img src="${portraitUrls[0]}" alt="${hero.name}" class="hero-card__bg-image" data-hero-id="${hero.id}">
            ` : `
              <div class="hero-card__bg-placeholder">👤</div>
            `}
            <div class="hero-card__overlay">
              <h4 class="hero-card__name">${hero.name}</h4>
              <p class="hero-card__title">${hero.title}</p>
            </div>
            <button class="hero-card__flip-btn" style="position: absolute; top: 10px; right: 10px; z-index: 20;">
              ↻
            </button>
          </div>
          <div class="hero-card__back">
            <h4 class="hero-card__name" style="color: #FFFFFF !important;">${hero.name}</h4>
            <p class="hero-card__years" style="color: #FFFFFF !important;">${yearsText}</p>
            ${tabsHtml ? `
              <div class="hero-card__tabs-container">
                ${tabsHtml}
              </div>
            ` : `
              <p class="hero-card__bio">${hero.biography}</p>
              ${hero.achievements && hero.achievements.length > 0 ? `
                <ul class="hero-card__achievements">
                  ${hero.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
              ` : ''}
            `}
            <button class="hero-card__flip-btn" style="position: absolute; top: 10px; right: 10px; z-index: 20;">
              ↻
            </button>
          </div>
        </div>
      </div>
    `;
  }

  generateTabs(tabs) {
    const tabKeys = Object.keys(tabs);
    if (tabKeys.length === 0) return '';

    const tabLabels = {
      overview: 'Обзор',
      history: 'История',
      legacy: 'Наследие',
      biography: 'Биография',
      achievements: 'Достижения'
    };

    const tabButtons = tabKeys.map((key, i) => `
      <button class="hero-card__tab-btn ${i === 0 ? 'hero-card__tab-btn--active' : ''}" data-tab="${key}" style="color: #FFFFFF !important; pointer-events: auto !important; z-index: 100 !important;">
        ${tabLabels[key] || key}
      </button>
    `).join('');

    const tabPanels = tabKeys.map((key, i) => `
      <div class="hero-card__tab-panel ${i === 0 ? 'hero-card__tab-panel--active' : ''}" data-panel="${key}" style="color: #FFFFFF !important;">
        <p style="color: #FFFFFF !important;">${tabs[key]}</p>
      </div>
    `).join('');

    return `
      <div class="hero-card__tabs" style="color: #FFFFFF !important;">
        <div class="hero-card__tab-buttons">
          ${tabButtons}
        </div>
        <div class="hero-card__tab-panels">
          ${tabPanels}
        </div>
      </div>
    `;
  }

  handleFlip(cardElement) {
    console.log('handleFlip called');
    cardElement.classList.toggle('hero-card--flipped');
    
    // Переинициализируем обработчики после переворота
    setTimeout(() => {
      console.log('Reinitializing handlers after flip');
      
      // Удаляем старые обработчики, клонируя элементы
      const flipBtns = cardElement.querySelectorAll('.hero-card__flip-btn');
      console.log('Cloning flip buttons:', flipBtns.length);
      flipBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
      });
      
      const tabButtons = cardElement.querySelectorAll('.hero-card__tab-btn');
      console.log('Cloning tab buttons:', tabButtons.length);
      tabButtons.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
      });
      
      // Прикрепляем новые обработчики
      console.log('Attaching new handlers');
      this.attachCardHandlers(cardElement);
    }, 50);
  }

  handleTabClick(btnElement, cardElement) {
    const tabName = btnElement.getAttribute('data-tab');
    const tabsContainer = cardElement.querySelector('.hero-card__tabs');
    
    console.log('handleTabClick called with tab:', tabName);
    console.log('tabsContainer found:', !!tabsContainer);
    
    if (!tabsContainer) {
      console.error('No tabs container found');
      return;
    }

    // Убираем активный класс со всех кнопок и панелей
    const allBtns = tabsContainer.querySelectorAll('.hero-card__tab-btn');
    const allPanels = tabsContainer.querySelectorAll('.hero-card__tab-panel');
    
    console.log('Found buttons:', allBtns.length, 'panels:', allPanels.length);
    
    allBtns.forEach(btn => {
      btn.classList.remove('hero-card__tab-btn--active');
    });
    allPanels.forEach(panel => {
      panel.classList.remove('hero-card__tab-panel--active');
    });

    // Добавляем активный класс
    btnElement.classList.add('hero-card__tab-btn--active');
    const targetPanel = tabsContainer.querySelector(`[data-panel="${tabName}"]`);
    
    console.log('Target panel found:', !!targetPanel);
    
    if (targetPanel) {
      targetPanel.classList.add('hero-card__tab-panel--active');
      console.log('Tab switched to:', tabName);
    } else {
      console.error('Target panel not found for tab:', tabName);
    }
  }

  startPortraitRotation(heroId) {
    const hero = this.heroes.find(h => h.id === heroId);
    if (!hero || !hero.portraitUrls || hero.portraitUrls.length <= 1) {
      return; // Нет нужды в ротации если только одна фотография
    }

    let currentIndex = 0;
    const portraitImg = this.container.querySelector(`img[data-hero-id="${heroId}"]`);
    
    if (!portraitImg) return;

    const rotatePortrait = () => {
      currentIndex = (currentIndex + 1) % hero.portraitUrls.length;
      portraitImg.style.opacity = '0.5';
      
      setTimeout(() => {
        portraitImg.src = hero.portraitUrls[currentIndex];
        portraitImg.style.opacity = '1';
      }, 300);
    };

    // Запуск ротации каждые 10 секунд
    const timer = setInterval(rotatePortrait, 10000);
    this.portraitTimers.set(heroId, timer);
  }

  destroy() {
    // Очистка таймеров
    this.portraitTimers.forEach(timer => clearInterval(timer));
    this.portraitTimers.clear();
    
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeroFlipCards;
}
