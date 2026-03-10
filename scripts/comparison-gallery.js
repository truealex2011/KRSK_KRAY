/**
 * ComparisonGallery - Сравнение исторических и современных фотографий
 */

class ComparisonGallery {
  constructor(containerId, pairs) {
    this.containerId = containerId;
    this.pairs = pairs || [];
    this.container = null;
  }

  initialize() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    const html = `
      <div class="comparison-gallery">
        ${this.pairs.map(pair => this.createComparisonSlider(pair)).join('')}
      </div>
    `;

    this.container.innerHTML = html;

    // Добавление обработчиков для слайдеров
    this.pairs.forEach((pair, index) => {
      this.initializeSlider(index);
    });
  }

  createComparisonSlider(pair) {
    return `
      <div class="comparison-item" data-pair-id="${pair.id}">
        <h4 class="comparison-item__location">${pair.location}</h4>
        <div class="comparison-slider">
          <div class="comparison-slider__container">
            <div class="comparison-slider__image comparison-slider__image--historical">
              <div class="comparison-slider__placeholder">
                <span class="comparison-slider__icon">🏛️</span>
                <p>${pair.historicalYear}</p>
              </div>
              <span class="comparison-slider__label comparison-slider__label--left">Тогда</span>
            </div>
            <div class="comparison-slider__image comparison-slider__image--modern">
              <div class="comparison-slider__placeholder">
                <span class="comparison-slider__icon">🏙️</span>
                <p>${pair.modernYear}</p>
              </div>
              <span class="comparison-slider__label comparison-slider__label--right">Сейчас</span>
            </div>
            <div class="comparison-slider__divider" style="left: 50%;">
              <div class="comparison-slider__handle"></div>
            </div>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value="50" 
            class="comparison-slider__input"
            data-pair-id="${pair.id}"
          >
        </div>
        <p class="comparison-item__description">${pair.description}</p>
      </div>
    `;
  }

  initializeSlider(index) {
    const slider = this.container.querySelectorAll('.comparison-slider__input')[index];
    const divider = this.container.querySelectorAll('.comparison-slider__divider')[index];
    const historicalImage = this.container.querySelectorAll('.comparison-slider__image--historical')[index];

    if (!slider || !divider || !historicalImage) return;

    slider.addEventListener('input', (e) => {
      const value = e.target.value;
      divider.style.left = `${value}%`;
      historicalImage.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
    });
  }

  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ComparisonGallery;
}
