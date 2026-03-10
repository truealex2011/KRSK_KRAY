/**
 * InteractiveHistoryMap - Интерактивная карта исторических мест Красноярского края
 * Использует Leaflet.js для отображения маркеров с информацией о исторических местах
 */

class InteractiveHistoryMap {
  /**
   * @param {string} containerId - ID контейнера для карты
   * @param {Array} places - Массив исторических мест
   */
  constructor(containerId, places) {
    this.containerId = containerId;
    this.places = places || [];
    this.map = null;
    this.markers = [];
  }

  /**
   * Инициализация карты с центром на Красноярском крае
   */
  initialize() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    // Небольшая задержка для корректной инициализации
    setTimeout(() => {
      // Создание карты без начального центра
      this.map = L.map(this.containerId);

      // Добавление тайлов OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        minZoom: 3
      }).addTo(this.map);

      // Добавление границы Красноярского края (упрощенная)
      this.addRegionBoundary();

      // Добавление маркеров для всех мест
      this.places.forEach(place => this.addMarker(place));
      
      // Принудительное обновление размера карты и автомасштабирование
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
          this.fitMapToBounds();
        }
      }, 100);
    }, 100);
  }

  /**
   * Автоматическое масштабирование карты к границам края
   */
  fitMapToBounds() {
    // Границы Красноярского края
    const bounds = L.latLngBounds(
      [51.5, 82.0],  // Юго-западный угол
      [77.72, 115.5] // Северо-восточный угол
    );
    
    // Масштабируем карту к этим границам с отступами
    this.map.fitBounds(bounds, {
      padding: [50, 50],  // Отступы от краев
      maxZoom: 5          // Максимальный зум
    });
  }

  /**
   * Добавление границы Красноярского края
   */
  async addRegionBoundary() {
    try {
      // Загружаем точную границу из Overpass API (OpenStreetMap)
      const response = await fetch('https://nominatim.openstreetmap.org/search?q=Красноярский+край&format=geojson&polygon_geojson=1&limit=1');
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const geometry = data.features[0].geometry;
        
        // Добавляем GeoJSON на карту
        L.geoJSON(geometry, {
          style: {
            color: '#2563eb',      // Синий цвет
            weight: 3,             // Толщина линии
            opacity: 0.9,          // Непрозрачность
            fillOpacity: 0,        // БЕЗ заливки
            smoothFactor: 1
          }
        }).addTo(this.map);
        
        console.log('✓ Граница Красноярского края загружена');
      }
    } catch (error) {
      console.warn('Не удалось загрузить точную границу, используем упрощенную:', error);
      // Fallback - упрощенная граница
      this.addSimplifiedBoundary();
    }
  }

  /**
   * Упрощенная граница (fallback)
   */
  addSimplifiedBoundary() {
    const boundaryCoords = [
      [77.72, 104.25], [77.65, 106.5], [77.4, 108.0], [76.8, 110.5],
      [75.5, 112.8], [74.2, 114.5], [72.8, 115.2], [71.5, 115.5],
      [70.0, 115.3], [68.5, 114.8], [67.0, 114.5], [65.5, 113.8],
      [64.0, 112.5], [62.5, 110.8], [61.0, 109.0], [59.5, 107.5],
      [58.0, 106.2], [56.8, 105.0], [55.5, 103.8], [54.2, 102.5],
      [53.0, 101.0], [52.2, 99.5], [51.8, 97.5], [51.6, 95.8],
      [51.5, 94.0], [51.6, 92.5], [51.7, 91.0], [51.8, 89.5],
      [52.0, 88.0], [52.2, 86.8], [52.5, 85.5], [53.0, 84.5],
      [54.0, 83.8], [55.0, 83.2], [56.0, 82.8], [57.0, 82.5],
      [58.0, 82.3], [59.0, 82.2], [60.0, 82.1], [61.5, 82.0],
      [63.0, 82.0], [64.5, 82.2], [66.0, 82.5], [67.5, 83.0],
      [69.0, 84.0], [70.5, 85.5], [72.0, 87.5], [73.5, 90.0],
      [74.8, 92.5], [75.8, 95.0], [76.5, 97.5], [77.0, 100.0],
      [77.4, 102.0], [77.72, 104.25]
    ];

    L.polyline(boundaryCoords, {
      color: '#2563eb',
      weight: 3,
      opacity: 0.9,
      smoothFactor: 1,
      lineJoin: 'round',
      lineCap: 'round'
    }).addTo(this.map);
  }

  /**
   * Создание кастомной иконки с историческим стилем
   */
  createCustomIcon() {
    return L.divIcon({
      className: 'history-marker',
      html: '<div class="history-marker__icon">📍</div>',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  }

  /**
   * Создание расширенного popup с табами
   * @param {Object} place - Объект с данными о месте
   */
  createDetailedPopup(place) {
    const details = place.detailedInfo || {};
    
    return `
      <div class="history-popup-detailed">
        <h3 class="history-popup-detailed__title">${place.name}</h3>
        
        <div class="history-popup-tabs">
          <div class="history-popup-tabs__nav">
            <button class="history-popup-tabs__btn active" data-tab="overview">Обзор</button>
            <button class="history-popup-tabs__btn" data-tab="history">История</button>
            <button class="history-popup-tabs__btn" data-tab="facts">Факты</button>
            <button class="history-popup-tabs__btn" data-tab="timeline">Даты</button>
          </div>
          
          <div class="history-popup-tabs__content">
            <!-- Обзор -->
            <div class="history-popup-tabs__panel active" data-panel="overview">
              <p class="history-popup__description">${place.description}</p>
              <div class="history-popup__significance">
                <strong>Историческое значение:</strong> ${place.historicalSignificance}
              </div>
              ${details.category ? `<div class="history-popup__category">📍 ${details.category}</div>` : ''}
            </div>
            
            <!-- История -->
            <div class="history-popup-tabs__panel" data-panel="history">
              <p class="history-popup__text">${details.history || 'Информация готовится...'}</p>
              ${details.people && details.people.length > 0 ? `
                <div class="history-popup__people">
                  <strong>Известные личности:</strong>
                  <ul>
                    ${details.people.map(person => `<li>${person}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
            
            <!-- Факты -->
            <div class="history-popup-tabs__panel" data-panel="facts">
              ${details.facts && details.facts.length > 0 ? `
                <ul class="history-popup__facts-list">
                  ${details.facts.map(fact => `<li>✓ ${fact}</li>`).join('')}
                </ul>
              ` : '<p>Интересные факты готовятся...</p>'}
            </div>
            
            <!-- Временная шкала -->
            <div class="history-popup-tabs__panel" data-panel="timeline">
              ${details.dates && details.dates.length > 0 ? `
                <div class="history-popup__timeline">
                  ${details.dates.map(item => `
                    <div class="history-popup__timeline-item">
                      <span class="history-popup__timeline-year">${item.year}</span>
                      <span class="history-popup__timeline-event">${item.event}</span>
                    </div>
                  `).join('')}
                </div>
              ` : '<p>Хронология готовится...</p>'}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Инициализация табов в popup
   * @param {HTMLElement} popupElement - DOM элемент popup
   */
  initPopupTabs(popupElement) {
    const tabs = popupElement.querySelectorAll('.history-popup-tabs__btn');
    const panels = popupElement.querySelectorAll('.history-popup-tabs__panel');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // Убираем active у всех табов и панелей
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        // Добавляем active к выбранным
        tab.classList.add('active');
        const targetPanel = popupElement.querySelector(`[data-panel="${targetTab}"]`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  /**
   * Добавление маркера на карту
   * @param {Object} place - Объект с данными о месте
   */
  addMarker(place) {
    if (!this.map || !place.coordinates) {
      return;
    }

    const icon = this.createCustomIcon();
    const marker = L.marker(place.coordinates, { icon })
      .addTo(this.map);

    // Создание расширенного popup с табами
    const popupContent = this.createDetailedPopup(place);
    
    const popup = marker.bindPopup(popupContent, {
      maxWidth: 400,
      minWidth: 350,
      className: 'history-popup-container'
    });

    // Инициализация табов после открытия popup
    marker.on('popupopen', (e) => {
      const popupElement = e.popup.getElement();
      this.initPopupTabs(popupElement);
    });

    // Добавление tooltip при наведении с inline стилями для текста
    const tooltipContent = `<span style="color: #FFFFFF !important; font-weight: 700;">${place.name}</span>`;
    
    marker.bindTooltip(tooltipContent, {
      permanent: false,
      direction: 'top',
      offset: [0, -10],
      className: 'history-tooltip',
      opacity: 1,
      sticky: false  // Тултип не следует за курсором и закрывается сразу
    });

    // Закрываем тултип при уходе курсора с маркера
    marker.on('mouseout', function() {
      marker.closeTooltip();
    });

    this.markers.push(marker);
  }

  /**
   * Удаление всех маркеров с карты
   */
  clearMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

  /**
   * Уничтожение карты
   */
  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InteractiveHistoryMap;
}

/**
 * Инициализация кнопки полноэкранного режима
 */
function initMapFullscreen() {
  const fullscreenBtn = document.getElementById('map-fullscreen-btn');
  const mapWrapper = document.querySelector('.map-wrapper');
  const mapContainer = document.getElementById('history-map');
  
  if (!fullscreenBtn || !mapWrapper || !mapContainer) {
    console.warn('Fullscreen button elements not found:', {
      btn: !!fullscreenBtn,
      wrapper: !!mapWrapper,
      container: !!mapContainer
    });
    return;
  }

  // Удаляем старые обработчики если есть
  const newBtn = fullscreenBtn.cloneNode(true);
  fullscreenBtn.parentNode.replaceChild(newBtn, fullscreenBtn);
  
  let isFullscreen = false;

  newBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Fullscreen button clicked, current state:', isFullscreen);
    
    isFullscreen = !isFullscreen;

    if (isFullscreen) {
      // Включить полноэкранный режим
      mapWrapper.classList.add('fullscreen');
      newBtn.classList.add('exit');
      newBtn.title = 'Выйти из полноэкранного режима';
      document.body.classList.add('map-fullscreen-active');
      
      // Обновить SVG иконку для выхода
      newBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
        </svg>
      `;
      
      console.log('Entered fullscreen mode');
    } else {
      // Выйти из полноэкранного режима
      mapWrapper.classList.remove('fullscreen');
      newBtn.classList.remove('exit');
      newBtn.title = 'Полноэкранный режим';
      document.body.classList.remove('map-fullscreen-active');
      
      // Вернуть оригинальную иконку
      newBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      `;
      
      console.log('Exited fullscreen mode');
    }

    // Обновить размер карты после изменения режима
    setTimeout(() => {
      if (window.historyMap && window.historyMap.map) {
        window.historyMap.map.invalidateSize();
        console.log('Map size invalidated');
      }
    }, 100);
  });

  // Выход из полноэкранного режима по ESC
  const escHandler = (e) => {
    if (e.key === 'Escape' && isFullscreen) {
      newBtn.click();
    }
  };
  
  document.removeEventListener('keydown', escHandler);
  document.addEventListener('keydown', escHandler);
  
  console.log('✓ Fullscreen button initialized');
}
