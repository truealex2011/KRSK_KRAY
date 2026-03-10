/**
 * Historical Documents Viewer Component - Carousel Version
 * Displays historical documents in a carousel with navigation arrows
 */

class HistoricalDocuments {
  constructor(containerId, documents) {
    this.container = document.getElementById(containerId);
    this.documents = documents || [];
    this.currentIndex = 0;
  }

  initialize() {
    if (!this.container) {
      console.error('Container not found:', this.containerId);
      return;
    }

    if (!this.documents || this.documents.length === 0) {
      this.container.innerHTML = '<p style="text-align: center; color: #B8E6D5;">Документы не найдены</p>';
      return;
    }

    this.render();
  }

  render() {
    const carousel = document.createElement('div');
    carousel.className = 'documents-carousel';

    carousel.innerHTML = `
      <div class="documents-carousel__tabs" id="documents-tabs">
        ${this.documents.map((doc, index) => `
          <button class="documents-carousel__tab ${index === this.currentIndex ? 'documents-carousel__tab--active' : ''}" 
                  data-index="${index}" 
                  onclick="window.documentsInstance.goToDocument(${index})">
            ${doc.year}
          </button>
        `).join('')}
      </div>
      <div class="documents-carousel__wrapper">
        <div class="documents-carousel__track" id="documents-track">
          ${this.documents.map((doc, index) => this.createDocumentCard(doc, index)).join('')}
        </div>
      </div>
      <div class="documents-carousel__nav">
        <button class="documents-carousel__btn documents-carousel__btn--prev" onclick="window.documentsInstance.prev()" ${this.currentIndex === 0 ? 'disabled' : ''}>
          ←
        </button>
        <span class="documents-carousel__counter">
          <span id="current-doc">${this.currentIndex + 1}</span> / ${this.documents.length}
        </span>
        <button class="documents-carousel__btn documents-carousel__btn--next" onclick="window.documentsInstance.next()" ${this.currentIndex === this.documents.length - 1 ? 'disabled' : ''}>
          →
        </button>
      </div>
    `;

    this.container.innerHTML = '';
    this.container.appendChild(carousel);
    this.updateCarousel();
  }

  createDocumentCard(doc, index) {
    return `
      <div class="document-card" data-index="${index}">
        <div class="document-card__year">${doc.year}</div>
        <div class="document-card__image">
          <img src="${doc.imageUrl}" alt="${doc.title}" loading="lazy" onerror="this.src='assets/images/history/documents/placeholder.jpg'">
        </div>
        <div class="document-card__content">
          <h4 class="document-card__title" style="color: #FFFFFF !important;">${doc.title}</h4>
          <p class="document-card__description">${doc.description}</p>
          <button class="document-card__btn" onclick="window.documentsInstance.showDetails(${index})">
            Читать подробнее
          </button>
        </div>
      </div>
    `;
  }

  updateCarousel() {
    const track = document.getElementById('documents-track');
    const counter = document.getElementById('current-doc');
    const prevBtn = document.querySelector('.documents-carousel__btn--prev');
    const nextBtn = document.querySelector('.documents-carousel__btn--next');
    const tabs = document.querySelectorAll('.documents-carousel__tab');

    if (track) {
      track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    if (counter) {
      counter.textContent = this.currentIndex + 1;
    }

    if (prevBtn) {
      prevBtn.disabled = this.currentIndex === 0;
    }

    if (nextBtn) {
      nextBtn.disabled = this.currentIndex === this.documents.length - 1;
    }

    // Update tabs
    tabs.forEach((tab, index) => {
      if (index === this.currentIndex) {
        tab.classList.add('documents-carousel__tab--active');
      } else {
        tab.classList.remove('documents-carousel__tab--active');
      }
    });
  }

  goToDocument(index) {
    if (index >= 0 && index < this.documents.length) {
      this.currentIndex = index;
      this.updateCarousel();
    }
  }

  next() {
    if (this.currentIndex < this.documents.length - 1) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  showDetails(index) {
    const doc = this.documents[index];
    if (!doc) return;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'document-modal';
    modal.innerHTML = `
      <div class="document-modal__overlay" onclick="window.documentsInstance.closeDetails()"></div>
      <div class="document-modal__content">
        <button class="document-modal__close" onclick="window.documentsInstance.closeDetails()">×</button>
        <div class="document-modal__header">
          <span class="document-modal__year">${doc.year}</span>
          <h3 class="document-modal__title">${doc.title}</h3>
        </div>
        <div class="document-modal__body">
          <div class="document-modal__image">
            <img src="${doc.imageUrl}" alt="${doc.title}" onerror="this.src='assets/images/history/documents/placeholder.jpg'">
          </div>
          <div class="document-modal__text">
            <p>${doc.content}</p>
            <p class="document-modal__description">${doc.description}</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Animate in
    setTimeout(() => {
      modal.classList.add('document-modal--active');
    }, 10);

    // Add keyboard listener
    this.handleKeydown = (e) => {
      if (e.key === 'Escape') {
        this.closeDetails();
      }
    };
    document.addEventListener('keydown', this.handleKeydown);
  }

  closeDetails() {
    const modal = document.querySelector('.document-modal');
    if (!modal) return;

    modal.classList.remove('document-modal--active');
    document.body.style.overflow = '';

    setTimeout(() => {
      modal.remove();
    }, 300);

    // Remove keyboard listener
    if (this.handleKeydown) {
      document.removeEventListener('keydown', this.handleKeydown);
      this.handleKeydown = null;
    }
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HistoricalDocuments;
}
