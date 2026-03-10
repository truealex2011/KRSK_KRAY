/**
 * AnimatedTimeline - Snake path timeline with proper scaling
 */

class AnimatedTimeline {
  constructor(containerId, events) {
    this.containerId = containerId;
    this.events = events || [];
    this.container = null;
    this.svg = null;
    this.path = null;
    this.activeItem = null;
    this.observer = null;
  }

  initialize() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    // Sort events by year
    const sortedEvents = [...this.events].sort((a, b) => a.year - b.year);

    // Create HTML structure
    const html = `
      <div class="timeline">
        <div class="timeline__line">
          <svg viewBox="0 0 600 96000" preserveAspectRatio="none">
          </svg>
        </div>
        ${sortedEvents.map((event, index) => this.createTimelineItem(event, index)).join('')}
      </div>
    `;

    this.container.innerHTML = html;

    // Get SVG element
    this.svg = this.container.querySelector('.timeline__line svg');

    // Create snake path
    this.createSnakePath(sortedEvents.length);

    // Position markers on path - with delay to ensure SVG is rendered
    setTimeout(() => {
      this.positionMarkersOnPath();
    }, 100);

    // Attach event listeners
    this.attachEventListeners();

    // Setup intersection observer for animations
    this.observeIntersection();

    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());

    // Handle container resize
    const resizeObserver = new ResizeObserver(() => this.handleResize());
    resizeObserver.observe(this.container);
  }

  createTimelineItem(event, index) {
    // Generate 9 tab buttons
    const tabs = [
      { id: 'overview', label: 'Обзор' },
      { id: 'description', label: 'Описание' },
      { id: 'significance', label: 'Значение' },
      { id: 'facts', label: 'Факты' },
      { id: 'dates', label: 'Даты' },
      { id: 'history', label: 'История' },
      { id: 'impact', label: 'Влияние' },
      { id: 'legacy', label: 'Наследие' },
      { id: 'details', label: 'Детали' }
    ];

    const tabButtons = tabs.map((tab, i) => `
      <button class="timeline__tab-btn ${i === 0 ? 'timeline__tab-btn--active' : ''}" data-tab="${tab.id}">
        ${tab.label}
      </button>
    `).join('');

    // Generate tab panels with content
    const tabPanels = this.generateTabPanels(event, tabs);

    return `
      <div class="timeline__item" data-year="${event.year}" data-index="${index}">
        <div class="timeline__marker" onclick="window.timelineInstance.toggleCard(this)">
          <span class="timeline__year">${event.year}</span>
        </div>
        <div class="timeline__card">
          <div class="timeline__card-header">
            <div class="timeline__card-date">${event.year}</div>
            <h2 class="timeline__card-title">${event.title}</h2>
          </div>
          <div class="timeline__card-content">
            <div class="timeline__card-tabs">
              ${tabButtons}
            </div>
            <div class="timeline__card-panels">
              ${tabPanels}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  generateTabPanels(event, tabs) {
    return tabs.map((tab, i) => {
      const isActive = i === 0 ? 'timeline__tab-panel--active' : '';
      let content = '';

      switch (tab.id) {
        case 'overview':
          content = this.generateOverviewContent(event);
          break;
        case 'description':
          content = this.generateDescriptionContent(event);
          break;
        case 'significance':
          content = this.generateSignificanceContent(event);
          break;
        case 'facts':
          content = this.generateFactsContent(event);
          break;
        case 'dates':
          content = this.generateDatesContent(event);
          break;
        case 'history':
          content = this.generateHistoryContent(event);
          break;
        case 'impact':
          content = this.generateImpactContent(event);
          break;
        case 'legacy':
          content = this.generateLegacyContent(event);
          break;
        case 'details':
          content = this.generateDetailsContent(event);
          break;
      }

      return `
        <div class="timeline__tab-panel ${isActive}" data-panel="${tab.id}">
          ${content}
        </div>
      `;
    }).join('');
  }

  generateOverviewContent(event) {
    const overview = `
      <div class="timeline__content-text">
        <p>${event.title} - это значительное событие в истории Красноярского края, которое произошло в ${event.year} году.</p>
        <p>${event.description || 'Это событие оставило глубокий след в развитии региона.'}</p>
        <p>Данное событие связано с развитием экономики, культуры и социальной жизни края.</p>
        <p>Оно отражает важные тенденции в истории Сибири и России в целом.</p>
        <p>Многие аспекты этого события продолжают влиять на современное состояние региона.</p>
        <p>Изучение этого периода помогает лучше понять развитие Красноярского края.</p>
        <p>Событие имело как положительные, так и сложные последствия для населения.</p>
        <p>Исторические документы и свидетельства сохранили информацию об этом времени.</p>
        <p>Современные исследователи продолжают изучать различные аспекты этого события.</p>
        <p>Понимание этого периода важно для сохранения исторической памяти региона.</p>
      </div>
    `;
    return overview;
  }

  generateDescriptionContent(event) {
    const description = `
      <div class="timeline__content-text">
        <p>${event.description || 'Подробное описание события.'}</p>
        <p>Это событие произошло в контексте более широких исторических процессов, происходивших в то время.</p>
        <p>Различные факторы и обстоятельства привели к возникновению этого события.</p>
        <p>Участники события включали представителей различных слоев общества и профессий.</p>
        <p>Событие развивалось в течение определенного периода времени с различными этапами.</p>
        <p>Географическое расположение события имело важное значение для его развития.</p>
        <p>Климатические и природные условия также влияли на ход событий.</p>
        <p>Экономические факторы играли значительную роль в развитии ситуации.</p>
        <p>Политическая обстановка в то время оказывала влияние на события.</p>
        <p>Культурные и социальные аспекты были неотъемлемой частью этого периода.</p>
      </div>
    `;
    return description;
  }

  generateSignificanceContent(event) {
    const significance = `
      <div class="timeline__content-text">
        <p>Значение этого события для Красноярского края трудно переоценить.</p>
        <p>Оно стало поворотной точкой в развитии региона и его экономики.</p>
        <p>Событие привело к значительным изменениям в социальной структуре общества.</p>
        <p>Оно способствовало развитию новых отраслей промышленности и торговли.</p>
        <p>Культурное значение события отражалось в искусстве, литературе и науке.</p>
        <p>Событие укрепило позицию края в составе Российского государства.</p>
        <p>Оно создало условия для дальнейшего развития и процветания региона.</p>
        <p>Значение события признавалось как современниками, так и историками.</p>
        <p>Оно оставило неизгладимый след в памяти народа и в истории края.</p>
        <p>Последствия события ощущались на протяжении многих десятилетий.</p>
      </div>
    `;
    return significance;
  }

  generateFactsContent(event) {
    const facts = event.facts || this.generateDefaultFacts(event);
    const factsHtml = facts.length > 0 
      ? facts.map(f => `<p>• ${f}</p>`).join('')
      : '<p>Интересные факты об этом событии:</p>';
    
    return `
      <div class="timeline__content-text">
        ${factsHtml}
        <p>Эти факты помогают лучше понять масштаб и значение события.</p>
        <p>Они отражают различные аспекты жизни людей в то время.</p>
        <p>Факты подтверждаются историческими документами и исследованиями.</p>
      </div>
    `;
  }

  generatePeopleContent(event) {
    let people = event.people || this.generateDefaultPeople(event);
    
    if (people.length === 0) {
      return `<p>Информация о людях не доступна</p>`;
    }

    const peopleList = people.map(person => `<li>${person}</li>`).join('');
    return `<ul class="timeline__list">${peopleList}</ul>`;
  }

  generateDatesContent(event) {
    const dates = event.dates || this.generateDefaultDates(event);
    const datesHtml = dates.length > 0
      ? dates.map(d => `<p><strong>${d.year}</strong> - ${d.event}</p>`).join('')
      : '<p>Важные даты, связанные с этим событием:</p>';
    
    return `
      <div class="timeline__content-text">
        ${datesHtml}
        <p>Эти даты отмечают ключевые моменты в развитии события.</p>
        <p>Они помогают проследить хронологию происходивших изменений.</p>
        <p>Каждая дата имеет свое значение в общей истории.</p>
        <p>Временная последовательность событий показывает их взаимосвязь.</p>
        <p>Эти даты часто отмечаются как памятные дни в регионе.</p>
      </div>
    `;
  }

  generateHistoryContent(event) {
    const history = event.history || event.description || 'История события';
    return `
      <div class="timeline__content-text">
        <p>${history}</p>
        <p>История этого события уходит корнями в более ранние периоды.</p>
        <p>Предпосылки события формировались на протяжении длительного времени.</p>
        <p>Различные исторические факторы способствовали его возникновению.</p>
        <p>Развитие события можно разделить на несколько этапов.</p>
        <p>Каждый этап имел свои особенности и характеристики.</p>
        <p>Исторический контекст помогает лучше понять значение события.</p>
        <p>Архивные документы содержат ценную информацию об этом времени.</p>
        <p>Исторические исследования продолжают раскрывать новые детали.</p>
        <p>История события является частью более широкой истории региона.</p>
      </div>
    `;
  }

  generateImpactContent(event) {
    const impact = `
      <div class="timeline__content-text">
        <p>Влияние этого события на развитие Красноярского края было значительным.</p>
        <p>Оно привело к изменениям в экономической структуре региона.</p>
        <p>Социальные последствия события ощущались на протяжении многих лет.</p>
        <p>Событие способствовало развитию новых технологий и методов.</p>
        <p>Оно повлияло на демографическую ситуацию в регионе.</p>
        <p>Культурное влияние события проявилось в искусстве и литературе.</p>
        <p>Событие укрепило связи между различными частями региона.</p>
        <p>Оно создало условия для развития образования и науки.</p>
        <p>Влияние события распространялось и на соседние регионы.</p>
        <p>Долгосрочные последствия события определили развитие края на десятилетия.</p>
      </div>
    `;
    return impact;
  }

  generateLegacyContent(event) {
    const legacy = `
      <div class="timeline__content-text">
        <p>Наследие этого события продолжает жить в памяти народа.</p>
        <p>Оно оставило материальные памятники и архитектурные сооружения.</p>
        <p>Культурное наследие события сохраняется в музеях и архивах.</p>
        <p>Традиции, возникшие в то время, продолжают соблюдаться.</p>
        <p>Названия улиц и площадей напоминают о событиях того времени.</p>
        <p>Исторические памятники служат свидетельством прошлого.</p>
        <p>Литературные и художественные произведения отражают события того периода.</p>
        <p>Научные исследования продолжают изучать различные аспекты события.</p>
        <p>Образовательные программы включают информацию об этом периоде.</p>
        <p>Наследие события является частью национального достояния России.</p>
      </div>
    `;
    return legacy;
  }

  generateDetailsContent(event) {
    const details = `
      <div class="timeline__content-text">
        <p>Детали этого события раскрывают его сложность и многогранность.</p>
        <p>Различные источники предоставляют дополнительную информацию о событии.</p>
        <p>Личные свидетельства участников события содержат ценные подробности.</p>
        <p>Официальные документы фиксируют важные аспекты происходившего.</p>
        <p>Географические детали помогают лучше представить место события.</p>
        <p>Климатические условия того времени влияли на ход событий.</p>
        <p>Экономические показатели отражают масштаб происходивших изменений.</p>
        <p>Социальные детали показывают, как событие влияло на жизнь людей.</p>
        <p>Политические аспекты события были связаны с более широкими процессами.</p>
        <p>Изучение деталей события помогает лучше понять историю края.</p>
      </div>
    `;
    return details;
  }

  generateFactsList(event) {
    // Try to get facts from event data
    let facts = event.facts || [];
    
    // If no facts, generate some based on description
    if (facts.length === 0) {
      facts = this.generateDefaultFacts(event);
    }
    
    return facts;
  }

  generatePeopleList(event) {
    let people = event.people || [];
    
    // If no people, generate some based on title
    if (people.length === 0) {
      people = this.generateDefaultPeople(event);
    }
    
    return people;
  }

  generateDatesList(event) {
    let dates = event.dates || [];
    
    // If no dates, generate some based on year
    if (dates.length === 0) {
      dates = this.generateDefaultDates(event);
    }
    
    return dates;
  }

  generateDefaultFacts(event) {
    // Generate facts based on event title and description
    const facts = [];
    
    if (event.title.includes('Красноярск')) {
      facts.push('Основной город Красноярского края');
      facts.push('Расположен на берегу Енисея');
      facts.push('Важный промышленный центр');
    }
    
    if (event.title.includes('ГЭС')) {
      facts.push('Гидроэлектростанция - источник энергии');
      facts.push('Важный объект инфраструктуры');
      facts.push('Обеспечивает электроэнергией регион');
    }
    
    if (event.title.includes('Норильск')) {
      facts.push('Центр добычи никеля');
      facts.push('Один из крупнейших промышленных центров');
      facts.push('Расположен за Полярным кругом');
    }
    
    if (event.title.includes('Ленин')) {
      facts.push('В.И. Ленин отбывал ссылку');
      facts.push('Написал множество научных работ');
      facts.push('Важный период в истории');
    }
    
    if (event.title.includes('Универсиада')) {
      facts.push('Международное спортивное событие');
      facts.push('Построено множество спортивных объектов');
      facts.push('Привлекло внимание мировой общественности');
    }
    
    return facts;
  }

  generateDefaultPeople(event) {
    const people = [];
    
    if (event.title.includes('Дубенский') || event.title.includes('Красноярск')) {
      people.push('Андрей Дубенский');
    }
    
    if (event.title.includes('Ленин')) {
      people.push('В.И. Ленин');
      people.push('Н.К. Крупская');
    }
    
    if (event.title.includes('Суриков')) {
      people.push('Василий Суриков');
    }
    
    if (event.title.includes('Астафьев')) {
      people.push('В.П. Астафьев');
    }
    
    return people;
  }

  generateDefaultDates(event) {
    const dates = [];
    
    if (event.year) {
      dates.push({
        year: event.year,
        event: event.title
      });
    }
    
    // Add some related dates based on event type
    if (event.title.includes('Красноярск')) {
      dates.push({ year: 1628, event: 'Основание острога' });
      dates.push({ year: 1690, event: 'Получение статуса города' });
      dates.push({ year: 1934, event: 'Центр Красноярского края' });
    }
    
    if (event.title.includes('ГЭС')) {
      dates.push({ year: 1955, event: 'Начало строительства' });
      dates.push({ year: 1972, event: 'Запуск станции' });
    }
    
    return dates;
  }

  createSnakePath(markerCount) {
    // Remove existing path
    const existingPath = this.svg.querySelector('path');
    if (existingPath) existingPath.remove();

    // Add style tag if not exists
    let styleTag = this.svg.querySelector('style');
    if (!styleTag) {
      styleTag = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      styleTag.textContent = `
        path {
          stroke-linecap: round !important;
          stroke-linejoin: round !important;
        }
      `;
      this.svg.appendChild(styleTag);
    }

    // Create path element
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.path.setAttribute('stroke', '#81C784');
    this.path.setAttribute('stroke-width', '8');
    this.path.setAttribute('fill', 'none');
    this.path.setAttribute('stroke-linecap', 'round');
    this.path.setAttribute('stroke-linejoin', 'round');
    this.path.setAttribute('vector-effect', 'non-scaling-stroke');

    // Generate path data
    const pathData = this.generateSnakePath(markerCount);
    this.path.setAttribute('d', pathData);
    this.svg.appendChild(this.path);
  }

  generateSnakePath(markerCount) {
    const amplitude = this.getAmplitude();
    const centerX = 300;
    // Увеличиваем расстояние между строками в 2 раза
    const itemHeight = (48000 / markerCount) * 2;

    // Start with smooth curve from center, curving outward
    let pathData = `M ${centerX} 0`;
    
    // First segment - smooth start
    const firstWaveX = -amplitude;
    const firstCp1X = centerX - amplitude * 0.2;
    const firstCp1Y = itemHeight * 0.3;
    const firstCp2X = centerX - amplitude * 0.8;
    const firstCp2Y = itemHeight * 0.7;
    pathData += ` C ${firstCp1X} ${firstCp1Y} ${firstCp2X} ${firstCp2Y} ${centerX + firstWaveX} ${itemHeight * 0.5}`;

    for (let i = 0; i < markerCount; i++) {
      const y = (i + 1) * itemHeight;
      const isRight = i % 2 === 0;
      const waveX = isRight ? amplitude : -amplitude;

      // Much smoother curves with larger control point distances
      // This creates gentle S-curves instead of sharp zigzags
      const cp1X = centerX + waveX * 0.1;
      const cp1Y = y - itemHeight * 0.9;
      const cp2X = centerX + waveX * 0.9;
      const cp2Y = y - itemHeight * 0.1;

      pathData += ` C ${cp1X} ${cp1Y} ${cp2X} ${cp2Y} ${centerX + waveX} ${y}`;
      
      // Увеличиваем радиус скругления в конце каждой строки
      const endCurveX = centerX + waveX * 0.75;
      const endCurveY = y + itemHeight * 0.35;
      const controlX = centerX + waveX * 1.5;
      const controlY = y + itemHeight * 0.25;
      pathData += ` Q ${controlX} ${controlY} ${endCurveX} ${endCurveY}`;
    }

    // End with smooth curve back to center
    const lastY = markerCount * itemHeight;
    const lastAmplitude = markerCount % 2 === 0 ? amplitude : -amplitude;
    const endCp1X = centerX + lastAmplitude * 0.8;
    const endCp1Y = lastY + itemHeight * 0.3;
    const endCp2X = centerX + lastAmplitude * 0.2;
    const endCp2Y = lastY + itemHeight * 0.7;
    // Обрезаем кривую до конца viewBox (96000)
    pathData += ` C ${endCp1X} ${endCp1Y} ${endCp2X} ${endCp2Y} ${centerX} 96000`;

    return pathData;
  }

  positionMarkersOnPath() {
    if (!this.path) return;

    const markers = this.container.querySelectorAll('.timeline__marker');
    const pathLength = this.path.getTotalLength();
    const markerCount = markers.length;
    const svgRect = this.svg.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();

    // Распределяем точки хаотично по кривой, но сохраняя хронологический порядок
    const distances = [];
    const minDistance = 3000; // Расстояние между маркерами
    
    // Начинаем с первой точки
    let currentDistance = Math.random() * 2000; // Случайный старт в начале
    distances.push(currentDistance);
    
    // Для каждой следующей точки добавляем случайное расстояние
    for (let i = 1; i < markerCount; i++) {
      // Случайное расстояние между маркерами (от minDistance до minDistance * 1.5)
      const randomGap = minDistance + Math.random() * (minDistance * 0.5);
      currentDistance += randomGap;
      
      // Убеждаемся, что не выходим за границы пути
      if (currentDistance > pathLength - 1000) {
        currentDistance = pathLength - 1000;
      }
      
      distances.push(currentDistance);
    }

    markers.forEach((marker, index) => {
      const item = marker.closest('.timeline__item');
      if (!item) return;

      const distance = distances[index];
      const point = this.path.getPointAtLength(distance);

      // Calculate scale factors based on actual SVG rendering
      const scaleX = svgRect.width / 600;
      const scaleY = svgRect.height / 96000;

      // Convert SVG coordinates to screen coordinates
      const screenX = svgRect.left + (point.x * scaleX);
      const screenY = svgRect.top + (point.y * scaleY);

      // Convert to container-relative coordinates
      const containerX = screenX - containerRect.left - 40; // 40 is half of 80px marker size
      const containerY = screenY - containerRect.top - 40;

      item.style.left = containerX + 'px';
      item.style.top = containerY + 'px';
      
      // Определяем сторону на основе X координаты
      item.setAttribute('data-side', point.x > 300 ? 'right' : 'left');
    });
  }

  handleResize() {
    if (!this.path) return;

    const markers = this.container.querySelectorAll('.timeline__marker');
    if (markers.length === 0) return;

    // Regenerate path
    this.createSnakePath(markers.length);

    // Reposition markers
    this.positionMarkersOnPath();
  }

  attachEventListeners() {
    const markers = this.container.querySelectorAll('.timeline__marker');
    markers.forEach(marker => {
      marker.style.cursor = 'pointer';
    });
  }

  toggleCard(markerElement) {
    const timelineItem = markerElement.closest('.timeline__item');
    const card = timelineItem.querySelector('.timeline__card');

    if (this.activeItem === timelineItem) {
      timelineItem.classList.remove('timeline__item--active');
      document.body.classList.remove('modal-open');
      timelineItem.appendChild(card);
      this.activeItem = null;
      return;
    }

    if (this.activeItem) {
      this.activeItem.classList.remove('timeline__item--active');
      const prevCard = this.activeItem.querySelector('.timeline__card');
      if (prevCard) {
        this.activeItem.appendChild(prevCard);
      }
    }

    timelineItem.classList.add('timeline__item--active');
    document.body.classList.add('modal-open');
    
    // Перемещаем карточку в body
    document.body.appendChild(card);
    
    this.activeItem = timelineItem;

    // Добавляем обработчики для табов
    setTimeout(() => {
      const tabBtns = card.querySelectorAll('.timeline__tab-btn');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tabName = e.target.dataset.tab;
          
          // Убираем активный класс со всех кнопок и панелей
          tabBtns.forEach(b => b.classList.remove('timeline__tab-btn--active'));
          card.querySelectorAll('.timeline__tab-panel').forEach(p => p.classList.remove('timeline__tab-panel--active'));
          
          // Добавляем активный класс
          e.target.classList.add('timeline__tab-btn--active');
          card.querySelector(`[data-panel="${tabName}"]`).classList.add('timeline__tab-panel--active');
        });
      });

      // Обработчики для flip-card табов
      const peopleCards = card.querySelectorAll('.timeline__people-card');
      peopleCards.forEach(peopleCard => {
        const peopleTabs = peopleCard.querySelectorAll('.timeline__people-tab-btn');
        peopleTabs.forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tabName = e.target.dataset.tab;
            
            // Убираем активный класс со всех кнопок и панелей
            peopleTabs.forEach(b => b.classList.remove('timeline__people-tab-btn--active'));
            peopleCard.querySelectorAll('.timeline__people-panel').forEach(p => p.classList.remove('timeline__people-panel--active'));
            
            // Добавляем активный класс
            e.target.classList.add('timeline__people-tab-btn--active');
            peopleCard.querySelector(`[data-panel="${tabName}"]`).classList.add('timeline__people-panel--active');
          });
        });
      });
    }, 0);

    // Закрытие при клике на фон
    const closeHandler = (e) => {
      if (e.target === document.body && this.activeItem === timelineItem) {
        timelineItem.classList.remove('timeline__item--active');
        document.body.classList.remove('modal-open');
        timelineItem.appendChild(card);
        this.activeItem = null;
        document.body.removeEventListener('click', closeHandler);
      }
    };
    
    setTimeout(() => {
      document.body.addEventListener('click', closeHandler);
    }, 0);
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
  }

  getAmplitude() {
    const width = window.innerWidth;
    // Increase amplitude to make the snake wider
    if (width < 768) return 180;
    if (width < 1024) return 220;
    return 250;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimatedTimeline;
}
