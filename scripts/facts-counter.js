/**
 * FactsCounter - Анимированный счетчик статистики
 */

class FactsCounter {
  constructor(containerId, facts) {
    this.containerId = containerId;
    this.facts = facts || [];
    this.container = null;
    this.observer = null;
    this.animated = new Set();
  }

  initialize() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    const html = `
      <div class="facts-counter">
        ${this.facts.map(fact => `
          <div class="fact-item" data-fact-id="${fact.id}">
            ${fact.icon ? `<span class="fact-item__icon">${fact.icon}</span>` : ''}
            <div class="fact-item__value" data-target="${fact.value}">0</div>
            <div class="fact-item__label">${fact.label}</div>
          </div>
        `).join('')}
      </div>
    `;

    this.container.innerHTML = html;
    this.observeIntersection();
  }

  observeIntersection() {
    const options = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated.has(entry.target)) {
          const valueElement = entry.target.querySelector('.fact-item__value');
          const target = parseInt(valueElement.dataset.target);
          this.animateCounter(valueElement, target, 2000);
          this.animated.add(entry.target);
        }
      });
    }, options);

    const items = this.container.querySelectorAll('.fact-item');
    items.forEach(item => this.observer.observe(item));
  }

  animateCounter(element, target, duration) {
    const start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = this.easeOutQuad(progress);
      const current = Math.floor(start + (target - start) * eased);

      element.textContent = current.toLocaleString('ru-RU');

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target.toLocaleString('ru-RU');
      }
    };

    requestAnimationFrame(animate);
  }

  easeOutQuad(t) {
    return t * (2 - t);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FactsCounter;
}
