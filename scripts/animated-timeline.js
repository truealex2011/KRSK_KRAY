/**
 * AnimatedTimeline - Интерактивная временная шкала исторических событий
 */

class AnimatedTimeline {
  constructor(containerId, events) {
    this.containerId = containerId;
    this.events = events || [];
    this.container = null;
    this.observer = null;
    this.activeItem = null;
    this.pathGenerator = null;
    this.markerPositioner = null;
    this.animationController = null;
    this.responsiveHandler = null;
  }

  initialize() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    // Сортировка событий по году
    const sortedEvents = [...this.events].sort((a, b) => a.year - b.year);

    // Создание HTML
    const html = `
      <div class="timeline">
        <div class="timeline__line">
          <svg viewBox="0 0 600 5000" preserveAspectRatio="none">
          </svg>
        </div>
        ${sortedEvents.map((event, index) => this.createTimelineItem(event, index)).join('')}
      </div>
    `;

    this.container.innerHTML = html;

    // Инициализация компонентов змейки
    this.initializeSnakePath(sortedEvents.length);

    // Добавление обработчиков кликов
    this.attachEventListeners();

    // Настройка Intersection Observer для анимаций
    this.observeIntersection();

    // Запуск анимации
    if (this.animationController) {
      this.animationController.runAnimationSequence();
    }

    // Исправление позиций маркеров после инициализации
    this.fixMarkerPositions();
  }

  /**
   * Initialize snake path components
   */
  initializeSnakePath(itemCount) {
    const svgContainer = this.container.querySelector('.timeline__line svg');
    const markerElements = this.container.querySelectorAll('.timeline__marker');

    // Create path generator
    this.pathGenerator = new SnakePathGenerator(600, 5000, itemCount);

    // Calculate marker positions
    const markerPositions = this.calculateMarkerPositions(itemCount);

    // Generate and add SVG path
    const pathElement = this.pathGenerator.generatePath(markerPositions);
    svgContainer.appendChild(pathElement);

    // Create marker positioner and position markers
    this.markerPositioner = new MarkerPositioner(pathElement, markerElements);
    this.markerPositioner.positionMarkers();

    // Create animation controller
    this.animationController = new TimelineAnimationController(this.container);

    // Create responsive handler
    this.responsiveHandler = new ResponsiveTimelineHandler(
      this.container,
      this.pathGenerator,
      this.markerPositioner,
      this
    );
    this.responsiveHandler.initialize();
  }

  /**
   * Calculate marker positions
   */
  calculateMarkerPositions(itemCount) {
    const positions = [];
    const itemHeight = 5000 / itemCount;

    for (let i = 0; i < itemCount; i++) {
      positions.push({
        y: (i + 1) * itemHeight,
        x: 300 // centerX
      });
    }

    return positions;
  }

  /**
   * Fix marker positions on the path
   */
  fixMarkerPositions() {
    const svg = this.container.querySelector('.timeline__line svg');
    const path = svg.querySelector('path');
    const markers = this.container.querySelectorAll('.timeline__marker');

    if (!path) return;

    const pathLength = path.getTotalLength();

    markers.forEach((marker, index) => {
      const item = marker.closest('.timeline__item');
      const distance = (pathLength / markers.length) * (index + 1);
      const point = path.getPointAtLength(distance);

      // Set correct position
      item.style.left = (point.x - 40) + 'px';
      item.style.top = (point.y - 40) + 'px';
    });
  }

  createTimelineItem(event, index) {
    return `
      <div class="timeline__item" data-year="${event.year}" data-index="${index}">
        <div class="timeline__marker" onclick="window.timelineInstance.toggleCard(this)">
          <span class="timeline__year">${event.year}</span>
        </div>
        <div class="timeline__card">
          <h4 class="timeline__title">${event.title}</h4>
          <p class="timeline__description">${event.description}</p>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const markers = this.container.querySelectorAll('.timeline__marker');
    markers.forEach(marker => {
      marker.style.cursor = 'pointer';
    });
  }

  toggleCard(markerElement) {
    const timelineItem = markerElement.closest('.timeline__item');
    
    // Если это уже активный элемент, закрываем его
    if (this.activeItem === timelineItem) {
      timelineItem.classList.remove('timeline__item--active');
      this.activeItem = null;
      return;
    }

    // Закрываем предыдущий активный элемент
    if (this.activeItem) {
      this.activeItem.classList.remove('timeline__item--active');
    }

    // Открываем новый элемент
    timelineItem.classList.add('timeline__item--active');
    this.activeItem = timelineItem;

    // Плавная прокрутка к элементу
    timelineItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  observeIntersection() {
    const options = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateItem(entry.target);
        }
      });
    }, options);

    const items = this.container.querySelectorAll('.timeline__item');
    items.forEach(item => this.observer.observe(item));
  }

  animateItem(element) {
    element.classList.add('timeline__item--animated');
    this.observer.unobserve(element);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.responsiveHandler) {
      this.responsiveHandler.destroy();
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimatedTimeline;
}
