/**
 * MuseumCarousel - Карусель с историческими артефактами
 */

class MuseumCarousel {
  constructor(containerId, artifacts) {
    this.containerId = containerId;
    this.artifacts = artifacts || [];
    this.container = null;
    this.currentIndex = 0;
    this.currentTab = 'overview';
    this.autoPlayTimer = null;
    this.isAutoPlaying = false;
  }

  initialize() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    const html = `
      <div class="museum-carousel">
        <div class="carousel__header">
          <h3 class="carousel__title">
            <span class="carousel__icon-title">🏛️</span>
            Музейные артефакты
          </h3>
          <p class="carousel__subtitle">Исторические сокровища Красноярского края</p>
        </div>
        
        <div class="carousel__container">
          <div class="carousel__slides">
            <button class="carousel__fullscreen-btn" onclick="window.carouselInstance.openFullscreen()" title="Полноэкранный режим">
              ⛶
            </button>
            ${this.artifacts.map((artifact, index) => `
              <div class="carousel__slide ${index === 0 ? 'carousel__slide--active' : ''}" data-index="${index}">
                <div class="carousel__content">
                  <div class="carousel__image-wrapper">
                    <div class="carousel__image">
                      ${artifact.imageUrl ? `
                        <img src="${artifact.imageUrl}" alt="${artifact.name}" class="carousel__image-img" loading="lazy">
                      ` : `
                        <span class="carousel__icon">🏺</span>
                      `}
                    </div>
                    <div class="carousel__badge">${artifact.period}</div>
                  </div>
                  
                  <div class="carousel__info">
                    <h4 class="carousel__name">${artifact.name}</h4>
                    <p class="carousel__museum">${artifact.museum || 'Музей Красноярского края'}</p>
                    
                    ${artifact.tabs ? `
                      <div class="carousel__tabs">
                        <div class="carousel__tabs-nav">
                          ${Object.keys(artifact.tabs).map((tabKey, idx) => `
                            <button class="carousel__tab-btn ${idx === 0 ? 'carousel__tab-btn--active' : ''}" 
                                    data-tab="${tabKey}" 
                                    onclick="window.carouselInstance.switchTab('${tabKey}', this)">
                              ${artifact.tabs[tabKey].title}
                            </button>
                          `).join('')}
                        </div>
                        <div class="carousel__tabs-content">
                          ${Object.keys(artifact.tabs).map((tabKey, idx) => `
                            <div class="carousel__tab-content ${idx === 0 ? 'carousel__tab-content--active' : ''}" data-tab="${tabKey}">
                              <p>${artifact.tabs[tabKey].content}</p>
                            </div>
                          `).join('')}
                        </div>
                      </div>
                    ` : `
                      <p class="carousel__description">${artifact.description}</p>
                    `}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <button class="carousel__btn carousel__btn--prev" onclick="window.carouselInstance.previousSlide()" aria-label="Предыдущий артефакт">
            <span class="carousel__btn-icon">‹</span>
          </button>
          <button class="carousel__btn carousel__btn--next" onclick="window.carouselInstance.nextSlide()" aria-label="Следующий артефакт">
            <span class="carousel__btn-icon">›</span>
          </button>
        </div>
        
        <div class="carousel__footer">
          <div class="carousel__dots">
            ${this.artifacts.map((_, index) => `
              <button class="carousel__dot ${index === 0 ? 'carousel__dot--active' : ''}" 
                      onclick="window.carouselInstance.showSlide(${index})"
                      aria-label="Артефакт ${index + 1}"
                      aria-current="${index === 0 ? 'true' : 'false'}"></button>
            `).join('')}
          </div>
          <div class="carousel__counter">
            <span class="carousel__counter-current">${this.currentIndex + 1}</span>
            <span class="carousel__counter-separator">/</span>
            <span class="carousel__counter-total">${this.artifacts.length}</span>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    
    // Create modal outside of carousel container
    this.createModal();
    
    this.startAutoPlay();
  }

  createModal() {
    // Check if modal already exists
    let existingModal = document.getElementById('carouselModal');
    if (existingModal) {
      existingModal.remove();
    }

    const modalHtml = `
      <div class="carousel__modal" id="carouselModal">
        <div class="carousel__modal-content">
          <button class="carousel__modal-close" onclick="window.carouselInstance.closeFullscreen()">✕</button>
          <div class="carousel__modal-carousel">
            <div class="carousel__modal-header">
              <h2 id="modalTitle">Музейные артефакты</h2>
              <p id="modalSubtitle">Исторические сокровища Красноярского края</p>
            </div>
            <div class="carousel__modal-slides" id="modalSlides"></div>
            <div class="carousel__modal-footer">
              <div class="carousel__modal-nav">
                <button class="carousel__modal-nav-btn" onclick="window.carouselInstance.previousSlideModal()">‹</button>
                <button class="carousel__modal-nav-btn" onclick="window.carouselInstance.nextSlideModal()">›</button>
              </div>
              <div class="carousel__counter">
                <span class="carousel__counter-current" id="modalCounter">1</span>
                <span class="carousel__counter-separator">/</span>
                <span class="carousel__counter-total">${this.artifacts.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Add keyboard handler for Escape key
    const newModal = document.getElementById('carouselModal');
    newModal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeFullscreen();
      }
    });
    
    // Close modal when clicking outside content
    newModal.addEventListener('click', (e) => {
      if (e.target === newModal) {
        this.closeFullscreen();
      }
    });
  }

  switchTab(tabKey, button) {
    this.pauseAutoPlay();
    this.currentTab = tabKey;
    
    const slide = this.container.querySelector(`.carousel__slide--active`);
    if (!slide) return;
    
    // Обновляем активную кнопку табов
    const tabButtons = slide.querySelectorAll('.carousel__tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('carousel__tab-btn--active'));
    button.classList.add('carousel__tab-btn--active');
    
    // Обновляем активный контент табов
    const tabContents = slide.querySelectorAll('.carousel__tab-content');
    tabContents.forEach(content => content.classList.remove('carousel__tab-content--active'));
    slide.querySelector(`.carousel__tab-content[data-tab="${tabKey}"]`).classList.add('carousel__tab-content--active');
    
    setTimeout(() => this.startAutoPlay(), 10000);
  }

  showSlide(index) {
    this.pauseAutoPlay();
    
    const slides = this.container.querySelectorAll('.carousel__slide');
    const dots = this.container.querySelectorAll('.carousel__dot');
    const counterCurrent = this.container.querySelector('.carousel__counter-current');

    slides.forEach(slide => slide.classList.remove('carousel__slide--active'));
    dots.forEach(dot => {
      dot.classList.remove('carousel__dot--active');
      dot.setAttribute('aria-current', 'false');
    });

    this.currentIndex = index;
    slides[index].classList.add('carousel__slide--active');
    dots[index].classList.add('carousel__dot--active');
    dots[index].setAttribute('aria-current', 'true');
    
    if (counterCurrent) {
      counterCurrent.textContent = index + 1;
    }
    
    // Сбрасываем таб на первый
    this.currentTab = 'overview';
    const firstTabBtn = slides[index].querySelector('.carousel__tab-btn');
    if (firstTabBtn) {
      firstTabBtn.click();
    }

    setTimeout(() => this.startAutoPlay(), 10000);
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.artifacts.length;
    this.showSlide(nextIndex);
  }

  previousSlide() {
    const prevIndex = (this.currentIndex - 1 + this.artifacts.length) % this.artifacts.length;
    this.showSlide(prevIndex);
  }

  startAutoPlay() {
    if (this.isAutoPlaying) return;
    
    this.isAutoPlaying = true;
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  pauseAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
      this.isAutoPlaying = false;
    }
  }

  destroy() {
    this.pauseAutoPlay();
    if (this.container) {
      this.container.innerHTML = '';
    }
  }

  openFullscreen() {
    this.pauseAutoPlay();
    const modal = document.getElementById('carouselModal');
    if (!modal) {
      console.error('Modal not found');
      return;
    }
    
    modal.classList.add('carousel__modal--active');
    this.updateModalContent();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  closeFullscreen() {
    const modal = document.getElementById('carouselModal');
    if (!modal) return;
    
    modal.classList.remove('carousel__modal--active');
    
    // Restore body scroll
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    
    this.startAutoPlay();
  }

  updateModalContent() {
    const artifact = this.artifacts[this.currentIndex];
    const modalSlides = document.getElementById('modalSlides');
    const modalCounter = document.getElementById('modalCounter');
    
    if (!artifact || !modalSlides) return;

    let content = `
      <div class="carousel__modal-image">
        ${artifact.imageUrl ? `
          <img src="${artifact.imageUrl}" alt="${artifact.name}">
        ` : `
          <div style="font-size: 8rem; text-align: center;">🏺</div>
        `}
      </div>
      <div class="carousel__modal-info">
        <h3>${artifact.name}</h3>
        <p>${artifact.museum || 'Музей Красноярского края'}</p>
    `;

    if (artifact.tabs) {
      content += `
        <div class="carousel__modal-tabs">
          <div class="carousel__modal-tabs-nav">
            ${Object.keys(artifact.tabs).map((tabKey, idx) => `
              <button class="carousel__modal-tab-btn ${idx === 0 ? 'carousel__modal-tab-btn--active' : ''}" 
                      data-tab="${tabKey}" 
                      onclick="window.carouselInstance.switchModalTab('${tabKey}', this)">
                ${artifact.tabs[tabKey].title}
              </button>
            `).join('')}
          </div>
          <div>
            ${Object.keys(artifact.tabs).map((tabKey, idx) => `
              <div class="carousel__modal-tab-content ${idx === 0 ? 'carousel__modal-tab-content--active' : ''}" data-tab="${tabKey}">
                <p>${artifact.tabs[tabKey].content}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      content += `<p>${artifact.description}</p>`;
    }

    content += `</div>`;
    modalSlides.innerHTML = content;
    modalCounter.textContent = this.currentIndex + 1;
  }

  switchModalTab(tabKey, button) {
    const tabButtons = button.parentElement.querySelectorAll('.carousel__modal-tab-btn');
    const tabContents = button.parentElement.parentElement.querySelectorAll('.carousel__modal-tab-content');
    
    tabButtons.forEach(btn => btn.classList.remove('carousel__modal-tab-btn--active'));
    tabContents.forEach(content => content.classList.remove('carousel__modal-tab-content--active'));
    
    button.classList.add('carousel__modal-tab-btn--active');
    button.parentElement.parentElement.querySelector(`.carousel__modal-tab-content[data-tab="${tabKey}"]`).classList.add('carousel__modal-tab-content--active');
  }

  nextSlideModal() {
    const nextIndex = (this.currentIndex + 1) % this.artifacts.length;
    this.currentIndex = nextIndex;
    this.updateModalContent();
  }

  previousSlideModal() {
    const prevIndex = (this.currentIndex - 1 + this.artifacts.length) % this.artifacts.length;
    this.currentIndex = prevIndex;
    this.updateModalContent();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MuseumCarousel;
}
