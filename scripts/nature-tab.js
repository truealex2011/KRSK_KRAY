// ============================================
// NATURE TAB FUNCTIONALITY
// Функциональность для вкладки "Природа"
// ============================================

// ============================================
// 1. INFO BADGES (Интерактивные бейджи)
// ============================================

function initInfoBadges() {
    const badges = document.querySelectorAll('.info-badge');
    const panel = document.querySelector('.info-badges-panel');
    
    badges.forEach(badge => {
        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const wasActive = this.classList.contains('info-badge--active');
            
            // Закрыть все другие бейджи
            badges.forEach(b => {
                if (b !== badge) {
                    b.classList.remove('info-badge--active');
                }
            });
            
            // Переключить текущий бейдж
            this.classList.toggle('info-badge--active');
            
            // Добавить/убрать класс у панели для сдвига контента
            if (panel) {
                if (!wasActive && this.classList.contains('info-badge--active')) {
                    panel.classList.add('has-active-dropdown');
                } else {
                    panel.classList.remove('has-active-dropdown');
                }
            }
        });
    });
    
    // Закрыть при клике вне бейджа
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.info-badge')) {
            badges.forEach(badge => {
                badge.classList.remove('info-badge--active');
            });
            if (panel) {
                panel.classList.remove('has-active-dropdown');
            }
        }
    });
}

// ============================================
// 1.5 COLLAPSIBLE SECTIONS (Сворачиваемые секции)
// ============================================

function initCollapsibleSections() {
    const sections = document.querySelectorAll('.compact-section');
    
    sections.forEach((section) => {
        const title = section.querySelector('.compact-section__title');
        if (!title) return;
        
        // Each section toggles independently
        title.addEventListener('click', function() {
            section.classList.toggle('compact-section--collapsed');
            
            // Если это секция заповедников и она открывается - переинициализировать карточки
            const isReservesSection = section.querySelector('.reserves-carousel');
            if (isReservesSection && !section.classList.contains('compact-section--collapsed')) {
                console.log('🔄 Reserves section opened, reinitializing cards...');
                setTimeout(() => {
                    initReserveCards();
                }, 100);
            }
        });
    });
}

// ============================================
// 2. GEO RECORDS FLIP (Переворачивающиеся карточки)
// ============================================

function initGeoRecordsFlip() {
    // Flip cards now work with CSS :hover, no JS needed
    // Keeping function for compatibility
}

// ============================================
// 3. FLORA & FAUNA TABS (Табы флоры и фауны)
// ============================================

function initFloraFaunaTabs() {
    const tabButtons = document.querySelectorAll('.flora-fauna-tab');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.closest('.flora-fauna-section');
            const tabName = this.dataset.tab;
            
            // Убрать активный класс со всех табов в этой секции
            section.querySelectorAll('.flora-fauna-tab').forEach(btn => {
                btn.classList.remove('flora-fauna-tab--active');
            });
            
            // Убрать активный класс со всех панелей в этой секции
            section.querySelectorAll('.flora-fauna-tab-panel').forEach(panel => {
                panel.classList.remove('flora-fauna-tab-panel--active');
            });
            
            // Активировать выбранный таб
            this.classList.add('flora-fauna-tab--active');
            
            // Активировать соответствующую панель
            const targetPanel = section.querySelector(`[data-panel="${tabName}"]`);
            if (targetPanel) {
                targetPanel.classList.add('flora-fauna-tab-panel--active');
            }
        });
    });
}

// ============================================
// 4. SPECIES GALLERY (Галерея видов) - НОВАЯ ВЕРСИЯ
// ============================================

let currentSpeciesData = null;
let currentTabIndex = 0;
let tabsVisible = true;

// База данных видов с МНОЖЕСТВОМ ТАБОВ
const SPECIES_DATABASE = {
    // ФАУНА - Млекопитающие
    'bear': {
        name: 'Бурый медведь',
        latin: 'Ursus arctos',
        image: 'assets/images/priroda/flora_fauna/fauna/bear.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Бурый медведь — крупнейший хищник Красноярского края и один из самых крупных наземных хищников в мире. Обитает в таёжных лесах, питается как растительной, так и животной пищей.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> 300-600 кг</li>
                    <li><strong>Длина тела:</strong> до 2,5 м</li>
                    <li><strong>Высота в холке:</strong> до 1,5 м</li>
                    <li><strong>Популяция в крае:</strong> ~8 000 особей</li>
                    <li><strong>Продолжительность жизни:</strong> 20-30 лет</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Бурые медведи населяют различные типы лесов Красноярского края, от южной тайги до лесотундры.</p>
                <ul class="species-gallery__tab-list">
                    <li>Темнохвойная тайга (ель, пихта)</li>
                    <li>Светлохвойная тайга (сосна, лиственница)</li>
                    <li>Смешанные леса</li>
                    <li>Горные леса Саян</li>
                    <li>Предпочитают участки с ягодниками</li>
                    <li>Часто встречаются у рек и озёр</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Медведь — всеядное животное с преобладанием растительной пищи в рационе (до 75%).</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Весна:</strong> Прошлогодние ягоды, корни, молодая трава</li>
                    <li><strong>Лето:</strong> Ягоды (черника, малина), травы, насекомые</li>
                    <li><strong>Осень:</strong> Кедровые орехи, ягоды, рыба</li>
                    <li><strong>Животная пища:</strong> Рыба, копытные, грызуны</li>
                    <li>Может охотиться на молодых лосей и оленей</li>
                    <li>Любит мёд диких пчёл</li>
                </ul>`
            },
            {
                title: 'Образ жизни',
                content: `<p class="species-gallery__tab-text">Медведи ведут одиночный образ жизни, за исключением периода размножения и самок с медвежатами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Активны преимущественно в сумерках</li>
                    <li>Территория самца: 200-400 км²</li>
                    <li>Территория самки: 50-100 км²</li>
                    <li>Отличные пловцы и альпинисты</li>
                    <li>Могут развивать скорость до 50 км/ч</li>
                    <li>Отличное обоняние и слух</li>
                </ul>`
            },
            {
                title: 'Зимняя спячка',
                content: `<p class="species-gallery__tab-text">Зимой медведи впадают в спячку, которая длится 5-6 месяцев.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Начало спячки:</strong> Октябрь-ноябрь</li>
                    <li><strong>Конец спячки:</strong> Март-апрель</li>
                    <li>Берлога устраивается в укромных местах</li>
                    <li>Температура тела снижается на 3-5°C</li>
                    <li>Пульс замедляется до 8-10 ударов в минуту</li>
                    <li>Не едят и не пьют всю зиму</li>
                    <li>Теряют до 30% массы тела</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Медведи достигают половой зрелости в 3-4 года.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Период спаривания:</strong> Май-июль</li>
                    <li><strong>Беременность:</strong> 6-8 месяцев</li>
                    <li><strong>Рождение:</strong> Январь-февраль в берлоге</li>
                    <li><strong>Количество детёнышей:</strong> 1-4 (обычно 2-3)</li>
                    <li>Медвежата рождаются слепыми, весом 500-600 г</li>
                    <li>Остаются с матерью 2-3 года</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Медведи обладают высоким интеллектом и сложным поведением.</p>
                <ul class="species-gallery__tab-list">
                    <li>Отличная память на места кормёжки</li>
                    <li>Могут использовать простые орудия</li>
                    <li>Метят территорию когтями на деревьях</li>
                    <li>Избегают встреч с человеком</li>
                    <li>Шатуны (не впавшие в спячку) опасны</li>
                    <li>Защищают медвежат от любой угрозы</li>
                </ul>`
            },
            {
                title: 'Следы и признаки',
                content: `<p class="species-gallery__tab-text">Опытный следопыт легко определит присутствие медведя.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>След:</strong> Длина до 30 см, ширина до 18 см</li>
                    <li>Видны отпечатки всех пяти пальцев</li>
                    <li>Когти оставляют глубокие борозды</li>
                    <li>Помёт крупный, содержимое зависит от пищи</li>
                    <li>Задиры на деревьях высотой до 2 м</li>
                    <li>Перевёрнутые камни и разрытые пни</li>
                </ul>`
            },
            {
                title: 'Взаимодействие с человеком',
                content: `<p class="species-gallery__tab-text">Медведи и люди делят одну территорию, что требует осторожности.</p>
                <ul class="species-gallery__tab-list">
                    <li>Избегайте встреч в период гона и с медвежатами</li>
                    <li>Не приближайтесь к добыче медведя</li>
                    <li>Шумите в лесу, чтобы не застать врасплох</li>
                    <li>Не оставляйте пищу в лагере</li>
                    <li>Охота регулируется квотами</li>
                    <li>Популяция стабильна</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности бурого медведя.</p>
                <ul class="species-gallery__tab-list">
                    <li>Может учуять добычу за 5 км</li>
                    <li>Сила укуса — 1200 PSI</li>
                    <li>Может прожить без еды до 6 месяцев</li>
                    <li>Самый крупный медведь в крае весил 750 кг</li>
                    <li>Может запомнить до 1000 мест кормёжки</li>
                    <li>Изображён на гербе многих городов края</li>
                </ul>`
            },
            {
                title: 'Охранный статус',
                content: `<p class="species-gallery__tab-text">Бурый медведь находится под охраной, но не является редким видом.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Статус:</strong> Обычный вид</li>
                    <li>Не занесён в Красную книгу</li>
                    <li>Популяция стабильна</li>
                    <li>Охота разрешена по лицензиям</li>
                    <li>Охраняется в заповедниках края</li>
                    <li>Важный объект экотуризма</li>
                </ul>`
            }
        ]
    },
    'wolf': {
        name: 'Волк',
        latin: 'Canis lupus',
        image: 'assets/images/priroda/flora_fauna/fauna/wolf.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Волк — стайный хищник, играющий важную роль в экосистеме тайги. Охотится на копытных животных, регулируя их численность.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> 30-50 кг</li>
                    <li><strong>Длина тела:</strong> до 1,6 м</li>
                    <li><strong>Высота в холке:</strong> 60-90 см</li>
                    <li><strong>Размер стаи:</strong> 5-10 особей</li>
                    <li><strong>Продолжительность жизни:</strong> 10-15 лет</li>
                </ul>`
            },
            {
                title: 'Социальная структура',
                content: `<p class="species-gallery__tab-text">Волки живут в строго организованных стаях с чёткой иерархией.</p>
                <ul class="species-gallery__tab-list">
                    <li>Альфа-пара — лидеры стаи</li>
                    <li>Бета-волки — помощники лидеров</li>
                    <li>Омега-волк — низший ранг</li>
                    <li>Размножается только альфа-пара</li>
                    <li>Все члены стаи помогают воспитывать щенков</li>
                    <li>Территория стаи: 200-500 км²</li>
                </ul>`
            },
            {
                title: 'Охота',
                content: `<p class="species-gallery__tab-text">Волки — искусные охотники с развитой тактикой.</p>
                <ul class="species-gallery__tab-list">
                    <li>Охотятся стаей, координируя действия</li>
                    <li>Основная добыча: лоси, олени, косули</li>
                    <li>Могут преследовать добычу до 20 км</li>
                    <li>Скорость бега: до 60 км/ч</li>
                    <li>Сила укуса: 400 PSI</li>
                    <li>Успешность охоты: 10-15%</li>
                </ul>`
            },
            {
                title: 'Коммуникация',
                content: `<p class="species-gallery__tab-text">Волки используют сложную систему коммуникации.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вой:</strong> Координация стаи, обозначение территории</li>
                    <li><strong>Рычание:</strong> Предупреждение, угроза</li>
                    <li><strong>Скуление:</strong> Подчинение, приветствие</li>
                    <li>Язык тела: положение хвоста, ушей</li>
                    <li>Запаховые метки территории</li>
                    <li>Вой слышен на расстоянии до 10 км</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Волки моногамны и создают пары на всю жизнь.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Период спаривания:</strong> Февраль-март</li>
                    <li><strong>Беременность:</strong> 62-65 дней</li>
                    <li><strong>Рождение:</strong> Апрель-май</li>
                    <li><strong>Количество щенков:</strong> 4-6</li>
                    <li>Щенки рождаются слепыми и глухими</li>
                    <li>Прозревают через 10-14 дней</li>
                    <li>Остаются с родителями 1-2 года</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Волки — плотоядные хищники с разнообразным рационом.</p>
                <ul class="species-gallery__tab-list">
                    <li>Основа рациона: копытные (лось, олень)</li>
                    <li>Дополнительно: зайцы, грызуны, птицы</li>
                    <li>Летом: ягоды, фрукты</li>
                    <li>Могут съесть до 10 кг за раз</li>
                    <li>Способны голодать до 2 недель</li>
                    <li>Едят всю добычу, включая кости</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Волки адаптируются к различным ландшафтам.</p>
                <ul class="species-gallery__tab-list">
                    <li>Тайга — основное место обитания</li>
                    <li>Лесотундра</li>
                    <li>Горные леса</li>
                    <li>Избегают густых зарослей</li>
                    <li>Предпочитают открытые участки для охоты</li>
                    <li>Логово устраивают в укромных местах</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Волки обладают высоким интеллектом и сложным поведением.</p>
                <ul class="species-gallery__tab-list">
                    <li>Активны преимущественно ночью</li>
                    <li>Отличная память и способность к обучению</li>
                    <li>Могут планировать охоту</li>
                    <li>Играют важную роль в экосистеме</li>
                    <li>Регулируют численность копытных</li>
                    <li>Осторожны и избегают человека</li>
                </ul>`
            },
            {
                title: 'Следы и признаки',
                content: `<p class="species-gallery__tab-text">Следы волка легко отличить от собачьих.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>След:</strong> Длина 10-14 см, ширина 7-9 см</li>
                    <li>Отпечатки двух средних пальцев выдвинуты вперёд</li>
                    <li>След более вытянутый, чем у собаки</li>
                    <li>Следы идут прямой линией</li>
                    <li>Помёт крупный, с шерстью и костями</li>
                    <li>Запаховые метки на деревьях и камнях</li>
                </ul>`
            },
            {
                title: 'Взаимодействие с человеком',
                content: `<p class="species-gallery__tab-text">Отношения волков и людей сложны и противоречивы.</p>
                <ul class="species-gallery__tab-list">
                    <li>Избегают встреч с человеком</li>
                    <li>Нападения на людей крайне редки</li>
                    <li>Могут нападать на домашний скот</li>
                    <li>Охота регулируется квотами</li>
                    <li>Популяция стабильна</li>
                    <li>Важны для баланса экосистемы</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности волков.</p>
                <ul class="species-gallery__tab-list">
                    <li>Могут пробежать до 60 км за ночь</li>
                    <li>Обоняние в 100 раз острее человеческого</li>
                    <li>Могут учуять добычу за 3 км</li>
                    <li>Челюсти создают давление 150 кг/см²</li>
                    <li>Предки всех домашних собак</li>
                    <li>Могут скрещиваться с собаками</li>
                </ul>`
            }
        ]
    },
    'reindeer': {
        name: 'Северный олень',
        latin: 'Rangifer tarandus',
        image: 'assets/images/priroda/flora_fauna/fauna/reindeer.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Северный олень — символ Севера, приспособленный к жизни в суровых условиях тундры и лесотундры.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> 100-220 кг</li>
                    <li><strong>Высота в холке:</strong> до 1,4 м</li>
                    <li><strong>Длина тела:</strong> до 2,2 м</li>
                    <li><strong>Популяция в крае:</strong> ~600 000 особей</li>
                    <li><strong>Продолжительность жизни:</strong> 15-20 лет</li>
                </ul>`
            },
            {
                title: 'Уникальные особенности',
                content: `<p class="species-gallery__tab-text">Северный олень обладает уникальными адаптациями к холоду.</p>
                <ul class="species-gallery__tab-list">
                    <li>Рога есть у обоих полов (единственный вид оленей)</li>
                    <li>Широкие копыта не проваливаются в снег</li>
                    <li>Густой мех с полыми волосками</li>
                    <li>Нос согревает вдыхаемый воздух</li>
                    <li>Выдерживают морозы до -60°C</li>
                    <li>Отличное обоняние — чуют ягель под снегом</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Рацион северного оленя меняется по сезонам.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Зима:</strong> Ягель (олений мох) из-под снега</li>
                    <li><strong>Весна:</strong> Молодая трава, побеги</li>
                    <li><strong>Лето:</strong> Травы, листья, грибы</li>
                    <li><strong>Осень:</strong> Ягоды, грибы</li>
                    <li>Могут есть леммингов и птичьи яйца</li>
                    <li>Нуждаются в соли — лижут солончаки</li>
                </ul>`
            },
            {
                title: 'Миграции',
                content: `<p class="species-gallery__tab-text">Северные олени совершают самые длинные миграции среди наземных млекопитающих.</p>
                <ul class="species-gallery__tab-list">
                    <li>Проходят до 5000 км в год</li>
                    <li>Весной идут на север к местам отёла</li>
                    <li>Осенью возвращаются в тайгу</li>
                    <li>Стада могут насчитывать тысячи особей</li>
                    <li>Переплывают реки шириной до 1 км</li>
                    <li>Скорость миграции: 20-30 км/день</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Размножение приурочено к короткому северному лету.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Гон:</strong> Сентябрь-октябрь</li>
                    <li><strong>Беременность:</strong> 7-8 месяцев</li>
                    <li><strong>Отёл:</strong> Май-июнь</li>
                    <li><strong>Количество телят:</strong> 1 (редко 2)</li>
                    <li>Телёнок встаёт через час после рождения</li>
                    <li>Через неделю бегает со стадом</li>
                    <li>Молочное кормление до 6 месяцев</li>
                </ul>`
            },
            {
                title: 'Рога',
                content: `<p class="species-gallery__tab-text">Рога северного оленя — уникальное явление.</p>
                <ul class="species-gallery__tab-list">
                    <li>Растут у самцов и самок</li>
                    <li>Самцы сбрасывают рога после гона (ноябрь)</li>
                    <li>Самки сбрасывают рога весной</li>
                    <li>Вес рогов: до 15 кг</li>
                    <li>Размах рогов: до 1,5 м</li>
                    <li>Используются для защиты и добывания пищи</li>
                </ul>`
            },
            {
                title: 'Хозяйственное значение',
                content: `<p class="species-gallery__tab-text">Северный олень — основа жизни коренных народов Севера.</p>
                <ul class="species-gallery__tab-list">
                    <li>Одомашнен более 2000 лет назад</li>
                    <li>Даёт мясо, молоко, шкуры</li>
                    <li>Используется как транспорт</li>
                    <li>В крае ~150 000 домашних оленей</li>
                    <li>Оленеводство — традиционное занятие</li>
                    <li>Важен для культуры северных народов</li>
                </ul>`
            },
            {
                title: 'Враги и угрозы',
                content: `<p class="species-gallery__tab-text">У северного оленя много естественных врагов.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Хищники:</strong> Волки, росомахи, медведи</li>
                    <li>Волки — главный враг (до 10% популяции)</li>
                    <li>Гнус летом изматывает оленей</li>
                    <li>Паразиты и болезни</li>
                    <li>Изменение климата влияет на кормовую базу</li>
                    <li>Браконьерство</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Северные олени — стадные животные с развитой социальной структурой.</p>
                <ul class="species-gallery__tab-list">
                    <li>Живут стадами от 10 до нескольких тысяч</li>
                    <li>Иерархия определяется размером рогов</li>
                    <li>Отличные пловцы</li>
                    <li>Могут бежать со скоростью до 80 км/ч</li>
                    <li>Активны круглосуточно</li>
                    <li>Издают характерное похрюкивание</li>
                </ul>`
            },
            {
                title: 'Адаптации к холоду',
                content: `<p class="species-gallery__tab-text">Северный олень идеально приспособлен к Арктике.</p>
                <ul class="species-gallery__tab-list">
                    <li>Двухслойный мех: подшёрсток + ость</li>
                    <li>Полые волоски удерживают тепло</li>
                    <li>Копыта зимой обрастают шерстью</li>
                    <li>Замедленный метаболизм зимой</li>
                    <li>Кровь не замерзает при -40°C</li>
                    <li>Нос согревает воздух до +38°C</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности северного оленя.</p>
                <ul class="species-gallery__tab-list">
                    <li>Копыта щёлкают при ходьбе</li>
                    <li>Видят ультрафиолет (находят ягель)</li>
                    <li>Могут спать стоя</li>
                    <li>Молоко самое жирное среди оленей (22%)</li>
                    <li>Прототип Санта-Клаусовых оленей</li>
                    <li>Изображён на гербе Ямало-Ненецкого АО</li>
                </ul>`
            }
        ]
    },
    'lynx': {
        name: 'Рысь',
        latin: 'Lynx lynx',
        image: 'assets/images/priroda/flora_fauna/fauna/lynx.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Рысь — скрытный лесной хищник с характерными кисточками на ушах.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> 18-25 кг</li>
                    <li><strong>Длина тела:</strong> до 1,3 м</li>
                    <li><strong>Высота в холке:</strong> 60-70 см</li>
                    <li><strong>Статус:</strong> Обычный вид</li>
                    <li><strong>Продолжительность жизни:</strong> 15-20 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Рысь легко узнать по характерным признакам.</p>
                <ul class="species-gallery__tab-list">
                    <li>Кисточки на ушах длиной до 5 см</li>
                    <li>Короткий хвост с чёрным кончиком</li>
                    <li>Бакенбарды на щеках</li>
                    <li>Длинные задние ноги</li>
                    <li>Широкие лапы с мехом между пальцами</li>
                    <li>Пятнистый окрас (летом ярче)</li>
                </ul>`
            },
            {
                title: 'Охота',
                content: `<p class="species-gallery__tab-text">Рысь — мастер скрытной охоты.</p>
                <ul class="species-gallery__tab-list">
                    <li>Охотится из засады</li>
                    <li>Бесшумно подкрадывается к добыче</li>
                    <li>Прыжок до 4 метров</li>
                    <li>Основная добыча: зайцы, косули</li>
                    <li>Может нападать на молодых оленей</li>
                    <li>Охотится в сумерках и ночью</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Рысь предпочитает густые леса.</p>
                <ul class="species-gallery__tab-list">
                    <li>Темнохвойная тайга</li>
                    <li>Смешанные леса</li>
                    <li>Горные леса</li>
                    <li>Избегает открытых пространств</li>
                    <li>Территория: 20-400 км²</li>
                    <li>Отличный альпинист</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Рыси — одиночные животные, встречающиеся только для размножения.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Гон:</strong> Февраль-март</li>
                    <li><strong>Беременность:</strong> 67-74 дня</li>
                    <li><strong>Рождение:</strong> Май-июнь</li>
                    <li><strong>Количество котят:</strong> 2-4</li>
                    <li>Котята слепые при рождении</li>
                    <li>Остаются с матерью до 10 месяцев</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Рысь — облигатный хищник.</p>
                <ul class="species-gallery__tab-list">
                    <li>Основа рациона: зайцы (до 50%)</li>
                    <li>Косули, молодые олени</li>
                    <li>Птицы (тетерева, рябчики)</li>
                    <li>Грызуны</li>
                    <li>Может голодать до 2 недель</li>
                    <li>Съедает 1-2 кг мяса в день</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Рысь — скрытное и осторожное животное.</p>
                <ul class="species-gallery__tab-list">
                    <li>Ведёт одиночный образ жизни</li>
                    <li>Активна в сумерках и ночью</li>
                    <li>Отличное зрение и слух</li>
                    <li>Может видеть мышь за 75 метров</li>
                    <li>Избегает встреч с человеком</li>
                    <li>Отличный пловец</li>
                </ul>`
            },
            {
                title: 'Следы',
                content: `<p class="species-gallery__tab-text">Следы рыси легко узнать.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Размер следа:</strong> 8-10 см</li>
                    <li>Круглая форма</li>
                    <li>Когти не видны (втянуты)</li>
                    <li>Зимой след больше из-за меха</li>
                    <li>Шаг: 40-50 см</li>
                    <li>Задние лапы ставит в след передних</li>
                </ul>`
            },
            {
                title: 'Коммуникация',
                content: `<p class="species-gallery__tab-text">Рыси общаются различными способами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Мяуканье (похоже на домашнюю кошку)</li>
                    <li>Шипение при угрозе</li>
                    <li>Мурлыканье</li>
                    <li>Запаховые метки</li>
                    <li>Царапины на деревьях</li>
                    <li>В период гона громкие крики</li>
                </ul>`
            },
            {
                title: 'Взаимодействие с человеком',
                content: `<p class="species-gallery__tab-text">Рысь редко встречается с людьми.</p>
                <ul class="species-gallery__tab-list">
                    <li>Избегает населённых пунктов</li>
                    <li>Нападения на людей не зафиксированы</li>
                    <li>Может нападать на домашних животных</li>
                    <li>Охота ограничена</li>
                    <li>Популяция стабильна</li>
                    <li>Ценный пушной зверь</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности рыси.</p>
                <ul class="species-gallery__tab-list">
                    <li>Кисточки усиливают слух</li>
                    <li>Может прыгнуть на 4 метра вверх</li>
                    <li>Видит в темноте в 6 раз лучше человека</li>
                    <li>Может услышать мышь под снегом</li>
                    <li>Самая северная кошка в мире</li>
                    <li>Изображена на монетах Беларуси</li>
                </ul>`
            }
        ]
    },
    'cedar': {
        name: 'Сибирский кедр',
        latin: 'Pinus sibirica',
        image: 'assets/images/priroda/flora_fauna/flora/cedar.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Сибирский кедр — величественное дерево сибирской тайги, дающее ценные кедровые орехи.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Высота:</strong> до 40 м</li>
                    <li><strong>Диаметр ствола:</strong> до 2 м</li>
                    <li><strong>Возраст:</strong> до 800 лет</li>
                    <li><strong>Плоды:</strong> Кедровые орехи</li>
                    <li><strong>Статус:</strong> Обычный вид</li>
                </ul>`
            },
            {
                title: 'Ботаническое описание',
                content: `<p class="species-gallery__tab-text">Кедр — вечнозелёное хвойное дерево.</p>
                <ul class="species-gallery__tab-list">
                    <li>Хвоя длиной 6-14 см, собрана по 5 штук</li>
                    <li>Хвоя мягкая, тёмно-зелёная</li>
                    <li>Кора серо-бурая, трещиноватая</li>
                    <li>Крона густая, многовершинная</li>
                    <li>Корневая система мощная</li>
                    <li>Растёт медленно (особенно первые 10 лет)</li>
                </ul>`
            },
            {
                title: 'Кедровые орехи',
                content: `<p class="species-gallery__tab-text">Кедровые орехи — ценный пищевой продукт.</p>
                <ul class="species-gallery__tab-list">
                    <li>Созревают на 2-3 год после опыления</li>
                    <li>Шишка содержит 30-150 орехов</li>
                    <li>Урожайные годы раз в 3-4 года</li>
                    <li>С одного дерева до 12 кг орехов</li>
                    <li>Содержат 60% масла</li>
                    <li>Богаты витаминами и микроэлементами</li>
                </ul>`
            },
            {
                title: 'Места произрастания',
                content: `<p class="species-gallery__tab-text">Кедр образует кедровые леса — кедрачи.</p>
                <ul class="species-gallery__tab-list">
                    <li>Горные районы Саян</li>
                    <li>Предгорья</li>
                    <li>Смешанные леса</li>
                    <li>Предпочитает влажные почвы</li>
                    <li>Растёт на высоте до 2400 м</li>
                    <li>Теневынослив</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Кедр размножается семенами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Начинает плодоносить в 40-70 лет</li>
                    <li>Опыление ветром в мае-июне</li>
                    <li>Шишки созревают 14-15 месяцев</li>
                    <li>Опадают в сентябре-октябре</li>
                    <li>Распространяются кедровкой и бурундуком</li>
                    <li>Всхожесть семян до 2 лет</li>
                </ul>`
            },
            {
                title: 'Хозяйственное значение',
                content: `<p class="species-gallery__tab-text">Кедр имеет огромное значение.</p>
                <ul class="species-gallery__tab-list">
                    <li>Ценная древесина (лёгкая, прочная)</li>
                    <li>Кедровые орехи — пищевой продукт</li>
                    <li>Кедровое масло</li>
                    <li>Живица (смола) — лекарственное сырьё</li>
                    <li>Хвоя — витаминный корм</li>
                    <li>Важен для экосистемы тайги</li>
                </ul>`
            },
            {
                title: 'Экологическая роль',
                content: `<p class="species-gallery__tab-text">Кедр — основа экосистемы кедровой тайги.</p>
                <ul class="species-gallery__tab-list">
                    <li>Кормит более 200 видов животных</li>
                    <li>Медведи, белки, бурундуки питаются орехами</li>
                    <li>Кедровка распространяет семена</li>
                    <li>Улучшает почву</li>
                    <li>Регулирует водный режим</li>
                    <li>Очищает воздух</li>
                </ul>`
            },
            {
                title: 'Лечебные свойства',
                content: `<p class="species-gallery__tab-text">Все части кедра обладают целебными свойствами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Орехи: витамины B, E, микроэлементы</li>
                    <li>Масло: лечит язвы, ожоги</li>
                    <li>Живица: ранозаживляющее</li>
                    <li>Хвоя: витамин C, эфирные масла</li>
                    <li>Воздух кедрового леса целебен</li>
                    <li>Фитонциды убивают бактерии</li>
                </ul>`
            },
            {
                title: 'Выращивание',
                content: `<p class="species-gallery__tab-text">Кедр можно выращивать искусственно.</p>
                <ul class="species-gallery__tab-list">
                    <li>Посадка орехами или саженцами</li>
                    <li>Предпочитает влажные почвы</li>
                    <li>Морозостоек (до -60°C)</li>
                    <li>Растёт медленно первые 10 лет</li>
                    <li>Требует ухода в молодости</li>
                    <li>Плодоносит через 40-70 лет</li>
                </ul>`
            },
            {
                title: 'Охрана',
                content: `<p class="species-gallery__tab-text">Кедровые леса нуждаются в охране.</p>
                <ul class="species-gallery__tab-list">
                    <li>Вырубка кедрачей ограничена</li>
                    <li>Охраняется в заповедниках</li>
                    <li>Создаются кедровые питомники</li>
                    <li>Важен для сохранения биоразнообразия</li>
                    <li>Символ сибирской тайги</li>
                    <li>Объект экотуризма</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности кедра.</p>
                <ul class="species-gallery__tab-list">
                    <li>Может жить до 800 лет</li>
                    <li>Один кедр даёт кислород для 3 человек</li>
                    <li>Древесина не гниёт веками</li>
                    <li>Из кедра делали иконы</li>
                    <li>Воздух кедрового леса стерилен</li>
                    <li>Изображён на гербе Томской области</li>
                </ul>`
            }
        ]
    },
    
    // Продолжение млекопитающих
    'moose': {
        name: 'Лось',
        latin: 'Alces alces',
        image: 'assets/images/priroda/flora_fauna/fauna/moose.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Лось — самый крупный представитель семейства оленевых, обитающий в лесах Красноярского края.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> 300-600 кг</li>
                    <li><strong>Высота в холке:</strong> до 2,3 м</li>
                    <li><strong>Длина тела:</strong> до 3 м</li>
                    <li><strong>Популяция в крае:</strong> ~25 000 особей</li>
                    <li><strong>Продолжительность жизни:</strong> 20-25 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Лось имеет характерную внешность, отличающую его от других оленей.</p>
                <ul class="species-gallery__tab-list">
                    <li>Массивное тело на длинных ногах</li>
                    <li>Горб на холке</li>
                    <li>Длинная голова с нависающей верхней губой</li>
                    <li>Кожистый вырост под горлом (серьга)</li>
                    <li>У самцов огромные лопатообразные рога</li>
                    <li>Тёмно-бурая окраска</li>
                </ul>`
            },
            {
                title: 'Рога',
                content: `<p class="species-gallery__tab-text">Рога лося — впечатляющее украшение самцов.</p>
                <ul class="species-gallery__tab-list">
                    <li>Растут только у самцов</li>
                    <li>Размах рогов до 1,8 м</li>
                    <li>Вес рогов до 30 кг</li>
                    <li>Сбрасываются ежегодно в ноябре-декабре</li>
                    <li>Новые рога растут с весны</li>
                    <li>Используются в турнирах за самок</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Лось — растительноядное животное с разнообразным рационом.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Лето:</strong> Водные растения, травы, листья</li>
                    <li><strong>Зима:</strong> Кора, побеги ивы, осины, сосны</li>
                    <li>Съедает до 35 кг корма в день летом</li>
                    <li>Зимой до 15 кг в день</li>
                    <li>Любит соль — посещает солонцы</li>
                    <li>Отлично плавает, ныряет за водорослями</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Лоси предпочитают лесные и заболоченные территории.</p>
                <ul class="species-gallery__tab-list">
                    <li>Смешанные и хвойные леса</li>
                    <li>Заболоченные участки</li>
                    <li>Берега рек и озёр</li>
                    <li>Вырубки и гари с молодой порослью</li>
                    <li>Избегают глубокоснежных районов</li>
                    <li>Территория: 5-20 км²</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Гон лосей происходит осенью и сопровождается турнирами самцов.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Гон:</strong> Сентябрь-октябрь</li>
                    <li><strong>Беременность:</strong> 8 месяцев</li>
                    <li><strong>Отёл:</strong> Май-июнь</li>
                    <li><strong>Количество телят:</strong> 1-2</li>
                    <li>Телёнок встаёт через 30 минут</li>
                    <li>Остаётся с матерью до года</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Лоси ведут одиночный или семейный образ жизни.</p>
                <ul class="species-gallery__tab-list">
                    <li>Активны утром и вечером</li>
                    <li>Отличные пловцы (до 10 км/ч)</li>
                    <li>Могут нырять на глубину до 5 м</li>
                    <li>Скорость бега до 55 км/ч</li>
                    <li>Зимой малоподвижны</li>
                    <li>Осторожны, но могут быть агрессивны</li>
                </ul>`
            },
            {
                title: 'Враги и угрозы',
                content: `<p class="species-gallery__tab-text">У взрослых лосей мало естественных врагов.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Хищники:</strong> Волки, медведи</li>
                    <li>Волки опасны для телят и ослабленных особей</li>
                    <li>Медведи нападают весной</li>
                    <li>Глубокий снег затрудняет передвижение</li>
                    <li>Паразиты и болезни</li>
                    <li>Браконьерство</li>
                </ul>`
            },
            {
                title: 'Следы',
                content: `<p class="species-gallery__tab-text">Следы лося легко узнать по размеру.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Размер следа:</strong> 14-18 см длиной</li>
                    <li>Раздвоенное копыто</li>
                    <li>На мягком грунте видны боковые пальцы</li>
                    <li>Шаг до 80 см</li>
                    <li>Помёт в виде орешков или лепёшек</li>
                    <li>Обкусанные ветки на высоте 2-3 м</li>
                </ul>`
            },
            {
                title: 'Взаимодействие с человеком',
                content: `<p class="species-gallery__tab-text">Лоси и люди часто встречаются, что требует осторожности.</p>
                <ul class="species-gallery__tab-list">
                    <li>Могут выходить на дороги (опасность ДТП)</li>
                    <li>В период гона самцы агрессивны</li>
                    <li>Самки с телятами защищают потомство</li>
                    <li>Охота регулируется лицензиями</li>
                    <li>Популяция стабильна</li>
                    <li>Важный охотничий вид</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности лося.</p>
                <ul class="species-gallery__tab-list">
                    <li>Самый крупный олень в мире</li>
                    <li>Может задержать дыхание под водой на минуту</li>
                    <li>Удар копытом может убить волка</li>
                    <li>Отличное обоняние и слух</li>
                    <li>Плохое зрение</li>
                    <li>Изображён на гербах многих городов</li>
                </ul>`
            }
        ]
    },
    
    'roe-deer': {
        name: 'Косуля',
        latin: 'Capreolus pygargus',
        image: 'assets/images/priroda/flora_fauna/fauna/roe-deer.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Косуля — изящный олень средних размеров, широко распространённый в лесах края.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> 20-35 кг</li>
                    <li><strong>Высота в холке:</strong> 75-90 см</li>
                    <li><strong>Длина тела:</strong> до 1,5 м</li>
                    <li><strong>Популяция в крае:</strong> ~40 000 особей</li>
                    <li><strong>Продолжительность жизни:</strong> 10-12 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Косуля — грациозное животное с изящным телосложением.</p>
                <ul class="species-gallery__tab-list">
                    <li>Стройное тело на тонких ногах</li>
                    <li>Короткий хвост (почти незаметен)</li>
                    <li>Большие выразительные глаза</li>
                    <li>Летом рыжая, зимой серая</li>
                    <li>Белое «зеркало» на крупе</li>
                    <li>У самцов небольшие рога с 2-3 отростками</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Косуля — избирательный растительноядный вид.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Лето:</strong> Травы, листья, ягоды</li>
                    <li><strong>Зима:</strong> Побеги, кора, хвоя</li>
                    <li>Предпочитает нежные части растений</li>
                    <li>Съедает 3-4 кг корма в день</li>
                    <li>Посещает солонцы</li>
                    <li>Кормится утром и вечером</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Косули предпочитают светлые леса с полянами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Смешанные леса</li>
                    <li>Лесостепь</li>
                    <li>Опушки и поляны</li>
                    <li>Вырубки с подростом</li>
                    <li>Избегают глубокого снега</li>
                    <li>Территория: 50-300 га</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Косули имеют уникальную особенность размножения.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Гон:</strong> Июль-август</li>
                    <li><strong>Латентный период:</strong> 4-5 месяцев</li>
                    <li><strong>Беременность:</strong> 9-10 месяцев</li>
                    <li><strong>Отёл:</strong> Май-июнь</li>
                    <li><strong>Количество телят:</strong> 1-2 (редко 3)</li>
                    <li>Телята пятнистые первые месяцы</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Косули живут небольшими группами или поодиночке.</p>
                <ul class="species-gallery__tab-list">
                    <li>Зимой собираются в группы до 20 особей</li>
                    <li>Летом держатся поодиночке или парами</li>
                    <li>Очень осторожны и пугливы</li>
                    <li>Скорость бега до 60 км/ч</li>
                    <li>Прыгают до 6 м в длину</li>
                    <li>Отличный слух и обоняние</li>
                </ul>`
            },
            {
                title: 'Враги',
                content: `<p class="species-gallery__tab-text">У косули много естественных врагов.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Хищники:</strong> Волки, рыси, росомахи</li>
                    <li>Волки — главный враг</li>
                    <li>Рыси охотятся из засады</li>
                    <li>Лисы опасны для телят</li>
                    <li>Глубокий снег делает уязвимыми</li>
                    <li>Суровые зимы — основная угроза</li>
                </ul>`
            },
            {
                title: 'Следы',
                content: `<p class="species-gallery__tab-text">Следы косули изящные и небольшие.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Размер следа:</strong> 4-5 см</li>
                    <li>Узкое раздвоенное копыто</li>
                    <li>Боковые пальцы редко отпечатываются</li>
                    <li>Шаг 40-50 см</li>
                    <li>Помёт в виде орешков</li>
                    <li>Лёжки в укромных местах</li>
                </ul>`
            },
            {
                title: 'Коммуникация',
                content: `<p class="species-gallery__tab-text">Косули общаются звуками и запахами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Лай при опасности</li>
                    <li>Писк телят</li>
                    <li>Свист самок</li>
                    <li>Запаховые метки</li>
                    <li>Язык тела (положение хвоста, ушей)</li>
                    <li>Топанье копытами</li>
                </ul>`
            },
            {
                title: 'Взаимодействие с человеком',
                content: `<p class="species-gallery__tab-text">Косули часто встречаются вблизи населённых пунктов.</p>
                <ul class="species-gallery__tab-list">
                    <li>Могут наносить ущерб посевам</li>
                    <li>Выходят на дороги</li>
                    <li>Охота регулируется</li>
                    <li>Популяция стабильна</li>
                    <li>Важный охотничий вид</li>
                    <li>Объект наблюдения для туристов</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности косули.</p>
                <ul class="species-gallery__tab-list">
                    <li>Единственный олень с латентным периодом</li>
                    <li>Может прыгать на 2 м в высоту</li>
                    <li>Новорождённый телёнок не имеет запаха</li>
                    <li>Самая многочисленная дичь в Европе</li>
                    <li>Может жить рядом с человеком</li>
                    <li>Изображена на гербе Златоуста</li>
                </ul>`
            }
        ]
    },
    
    'sable': {
        name: 'Соболь',
        latin: 'Martes zibellina',
        image: 'assets/images/priroda/flora_fauna/fauna/sable.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Соболь — ценный пушной зверь, символ сибирской тайги и богатства края.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> 0,7-1,8 кг</li>
                    <li><strong>Длина тела:</strong> 35-56 см</li>
                    <li><strong>Длина хвоста:</strong> 10-20 см</li>
                    <li><strong>Популяция в крае:</strong> ~150 000 особей</li>
                    <li><strong>Продолжительность жизни:</strong> 8-15 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Соболь — изящный хищник с роскошным мехом.</p>
                <ul class="species-gallery__tab-list">
                    <li>Вытянутое гибкое тело</li>
                    <li>Короткие лапы с широкими ступнями</li>
                    <li>Треугольная голова с округлыми ушами</li>
                    <li>Пушистый хвост</li>
                    <li>Окрас от светло-палевого до тёмно-бурого</li>
                    <li>Светлое пятно на горле</li>
                </ul>`
            },
            {
                title: 'Мех',
                content: `<p class="species-gallery__tab-text">Мех соболя — самый ценный в мире.</p>
                <ul class="species-gallery__tab-list">
                    <li>Густой, шелковистый, мягкий</li>
                    <li>Зимний мех особенно пышный</li>
                    <li>Баргузинский соболь — самый ценный</li>
                    <li>Цвет варьирует от светлого до чёрного</li>
                    <li>Не сваливается и не намокает</li>
                    <li>Исторически «мягкое золото» Сибири</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Соболь — всеядный хищник с разнообразным рационом.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Основа:</strong> Мышевидные грызуны</li>
                    <li>Белки, бурундуки, пищухи</li>
                    <li>Птицы и их яйца</li>
                    <li>Кедровые орехи (до 30% рациона)</li>
                    <li>Ягоды (черника, брусника, рябина)</li>
                    <li>Может охотиться на зайцев</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Соболь — типичный обитатель темнохвойной тайги.</p>
                <ul class="species-gallery__tab-list">
                    <li>Кедровая тайга — оптимальное место</li>
                    <li>Еловые и пихтовые леса</li>
                    <li>Горная тайга</li>
                    <li>Предпочитает захламлённые участки</li>
                    <li>Территория: 150-2000 га</li>
                    <li>Ведёт наземный образ жизни</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Соболи размножаются раз в год.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Гон:</strong> Июнь-июль</li>
                    <li><strong>Латентный период:</strong> 8 месяцев</li>
                    <li><strong>Беременность:</strong> 9-10 месяцев</li>
                    <li><strong>Рождение:</strong> Апрель-май</li>
                    <li><strong>Количество детёнышей:</strong> 1-7 (обычно 3-4)</li>
                    <li>Щенки слепые и беспомощные</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Соболь — одиночный территориальный хищник.</p>
                <ul class="species-gallery__tab-list">
                    <li>Активен круглосуточно</li>
                    <li>Отлично лазает по деревьям</li>
                    <li>Охотится преимущественно на земле</li>
                    <li>Имеет несколько убежищ на территории</li>
                    <li>Зимой передвигается под снегом</li>
                    <li>Метит территорию секретом желёз</li>
                </ul>`
            },
            {
                title: 'Враги',
                content: `<p class="species-gallery__tab-text">У соболя немного естественных врагов.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Хищники:</strong> Рысь, росомаха, крупные совы</li>
                    <li>Филин охотится ночью</li>
                    <li>Ястреб-тетеревятник днём</li>
                    <li>Молодые особи уязвимы</li>
                    <li>Конкуренция с куницей</li>
                    <li>Суровые зимы и бескормица</li>
                </ul>`
            },
            {
                title: 'Следы',
                content: `<p class="species-gallery__tab-text">Следы соболя характерны для куньих.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Размер следа:</strong> 5-7 см</li>
                    <li>Парные прыжки (двухчётка)</li>
                    <li>Длина прыжка 30-70 см</li>
                    <li>Зимой след нечёткий из-за меха</li>
                    <li>Часто ныряет в снег</li>
                    <li>Помёт тонкий, закрученный</li>
                </ul>`
            },
            {
                title: 'Хозяйственное значение',
                content: `<p class="species-gallery__tab-text">Соболь — важнейший пушной зверь России.</p>
                <ul class="species-gallery__tab-list">
                    <li>Самый ценный мех в мире</li>
                    <li>Основа пушного промысла Сибири</li>
                    <li>Разводится на зверофермах</li>
                    <li>Охота строго регулируется</li>
                    <li>Популяция восстановлена после кризиса</li>
                    <li>Символ богатства Сибири</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности соболя.</p>
                <ul class="species-gallery__tab-list">
                    <li>В XVII веке соболиные шкурки были валютой</li>
                    <li>К 1930-м годам почти истреблён</li>
                    <li>Успешно восстановлен благодаря охране</li>
                    <li>Может пробежать до 20 км за ночь</li>
                    <li>Запасает пищу на зиму</li>
                    <li>Изображён на гербе Иркутской области</li>
                </ul>`
            }
        ]
    },
    
    'fox': {
        name: 'Лисица',
        latin: 'Vulpes vulpes',
        image: 'assets/images/priroda/flora_fauna/fauna/fox.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Лисица — хитрый и ловкий хищник, широко распространённый по всему краю.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> 4-10 кг</li>
                    <li><strong>Длина тела:</strong> 60-90 см</li>
                    <li><strong>Длина хвоста:</strong> 40-60 см</li>
                    <li><strong>Популяция в крае:</strong> ~30 000 особей</li>
                    <li><strong>Продолжительность жизни:</strong> 6-8 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Лисица легко узнаваема по характерной внешности.</p>
                <ul class="species-gallery__tab-list">
                    <li>Вытянутая морда с острыми ушами</li>
                    <li>Рыжая окраска (варьирует)</li>
                    <li>Белая грудь и кончик хвоста</li>
                    <li>Чёрные «чулки» на лапах</li>
                    <li>Пушистый хвост</li>
                    <li>Стройное телосложение</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Лисица — всеядный хищник с широким рационом.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Основа:</strong> Мышевидные грызуны (до 80%)</li>
                    <li>Зайцы, птицы, яйца</li>
                    <li>Насекомые, черви</li>
                    <li>Ягоды, фрукты</li>
                    <li>Падаль</li>
                    <li>Может охотиться на домашнюю птицу</li>
                </ul>`
            },
            {
                title: 'Охота',
                content: `<p class="species-gallery__tab-text">Лисица — искусный охотник с уникальной техникой.</p>
                <ul class="species-gallery__tab-list">
                    <li>Знаменитая техника «мышкования»</li>
                    <li>Прыжок на добычу из засады</li>
                    <li>Слышит мышь под снегом на 100 м</li>
                    <li>Охотится в одиночку</li>
                    <li>Активна в сумерках и ночью</li>
                    <li>Может запасать пищу</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Лисица адаптируется к различным ландшафтам.</p>
                <ul class="species-gallery__tab-list">
                    <li>Лесостепь — оптимальное место</li>
                    <li>Опушки лесов</li>
                    <li>Поля и луга</li>
                    <li>Овраги и балки</li>
                    <li>Может жить вблизи населённых пунктов</li>
                    <li>Территория: 10-35 км²</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Лисицы создают пары на период размножения.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Гон:</strong> Январь-февраль</li>
                    <li><strong>Беременность:</strong> 52-56 дней</li>
                    <li><strong>Рождение:</strong> Март-апрель</li>
                    <li><strong>Количество щенков:</strong> 4-6 (до 12)</li>
                    <li>Щенки рождаются слепыми</li>
                    <li>Оба родителя заботятся о потомстве</li>
                </ul>`
            },
            {
                title: 'Нора',
                content: `<p class="species-gallery__tab-text">Лисица роет сложные норы или занимает чужие.</p>
                <ul class="species-gallery__tab-list">
                    <li>Несколько входов (до 10)</li>
                    <li>Длина ходов до 15 м</li>
                    <li>Гнездовая камера на глубине 2-3 м</li>
                    <li>Может занимать норы барсуков</li>
                    <li>Имеет несколько нор на территории</li>
                    <li>Использует нору только для выведения потомства</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Лисица — умное и осторожное животное.</p>
                <ul class="species-gallery__tab-list">
                    <li>Ведёт одиночный образ жизни</li>
                    <li>Очень осторожна и хитра</li>
                    <li>Отличный слух и обоняние</li>
                    <li>Скорость бега до 50 км/ч</li>
                    <li>Умеет запутывать следы</li>
                    <li>Издаёт разнообразные звуки</li>
                </ul>`
            },
            {
                title: 'Следы',
                content: `<p class="species-gallery__tab-text">Следы лисицы похожи на собачьи, но более вытянутые.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Размер следа:</strong> 5-7 см</li>
                    <li>Вытянутая форма</li>
                    <li>Отпечатки двух средних пальцев выдвинуты</li>
                    <li>След идёт прямой линией</li>
                    <li>Помёт тонкий, закрученный</li>
                    <li>Характерный запах</li>
                </ul>`
            },
            {
                title: 'Взаимодействие с человеком',
                content: `<p class="species-gallery__tab-text">Лисица часто встречается вблизи человека.</p>
                <ul class="species-gallery__tab-list">
                    <li>Может нападать на домашнюю птицу</li>
                    <li>Переносчик бешенства</li>
                    <li>Регулирует численность грызунов</li>
                    <li>Ценный пушной зверь</li>
                    <li>Охота регулируется</li>
                    <li>Популяция стабильна</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности лисицы.</p>
                <ul class="species-gallery__tab-list">
                    <li>Может услышать мышь под метром снега</li>
                    <li>Использует магнитное поле Земли для охоты</li>
                    <li>Может издавать 40 различных звуков</li>
                    <li>Хвост помогает балансировать при беге</li>
                    <li>Одомашнена в России (эксперимент Беляева)</li>
                    <li>Герой множества сказок и легенд</li>
                </ul>`
            }
        ]
    },
    
    'wolverine': {
        name: 'Росомаха',
        latin: 'Gulo gulo',
        image: 'assets/images/priroda/flora_fauna/fauna/wolverine.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Росомаха — свирепый и сильный хищник, самый крупный представитель куньих.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> 9-30 кг</li>
                    <li><strong>Длина тела:</strong> 70-105 см</li>
                    <li><strong>Длина хвоста:</strong> 18-23 см</li>
                    <li><strong>Популяция в крае:</strong> ~2 000 особей</li>
                    <li><strong>Продолжительность жизни:</strong> 10-13 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Росомаха похожа на маленького медведя.</p>
                <ul class="species-gallery__tab-list">
                    <li>Массивное приземистое тело</li>
                    <li>Короткие мощные лапы</li>
                    <li>Широкие ступни (не проваливается в снег)</li>
                    <li>Тёмно-бурый мех</li>
                    <li>Светлая полоса по бокам</li>
                    <li>Пушистый хвост</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Росомаха — всеядный хищник-падальщик.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Основа:</strong> Падаль (до 60%)</li>
                    <li>Может убить оленя или косулю</li>
                    <li>Грызуны, птицы, яйца</li>
                    <li>Рыба</li>
                    <li>Ягоды, орехи</li>
                    <li>Съедает всё, включая кости</li>
                </ul>`
            },
            {
                title: 'Охота',
                content: `<p class="species-gallery__tab-text">Росомаха — упорный и сильный охотник.</p>
                <ul class="species-gallery__tab-list">
                    <li>Нападает на добычу крупнее себя</li>
                    <li>Преследует жертву до изнеможения</li>
                    <li>Мощные челюсти дробят кости</li>
                    <li>Может отогнать медведя от добычи</li>
                    <li>Охотится в одиночку</li>
                    <li>Активна круглосуточно</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Росомаха предпочитает глухую тайгу и тундру.</p>
                <ul class="species-gallery__tab-list">
                    <li>Темнохвойная тайга</li>
                    <li>Лесотундра</li>
                    <li>Горная тайга</li>
                    <li>Избегает населённых мест</li>
                    <li>Огромная территория: до 2000 км²</li>
                    <li>Кочует в поисках пищи</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Росомахи размножаются раз в 2 года.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Гон:</strong> Май-август</li>
                    <li><strong>Латентный период:</strong> 7-8 месяцев</li>
                    <li><strong>Беременность:</strong> 9-10 месяцев</li>
                    <li><strong>Рождение:</strong> Февраль-март</li>
                    <li><strong>Количество детёнышей:</strong> 2-4</li>
                    <li>Щенки остаются с матерью до 2 лет</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Росомаха — одиночный территориальный хищник.</p>
                <ul class="species-gallery__tab-list">
                    <li>Ведёт кочевой образ жизни</li>
                    <li>Проходит до 40 км в день</li>
                    <li>Отлично лазает по деревьям</li>
                    <li>Хорошо плавает</li>
                    <li>Бесстрашна и агрессивна</li>
                    <li>Метит территорию секретом желёз</li>
                </ul>`
            },
            {
                title: 'Особенности',
                content: `<p class="species-gallery__tab-text">Росомаха обладает уникальными адаптациями.</p>
                <ul class="species-gallery__tab-list">
                    <li>Мех не смерзается на морозе</li>
                    <li>Широкие лапы как снегоступы</li>
                    <li>Мощные челюсти дробят кости</li>
                    <li>Острые когти</li>
                    <li>Выносливость и сила</li>
                    <li>Может тащить добычу тяжелее себя</li>
                </ul>`
            },
            {
                title: 'Следы',
                content: `<p class="species-gallery__tab-text">Следы росомахи крупные и характерные.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Размер следа:</strong> 10-12 см</li>
                    <li>Пятипалые отпечатки</li>
                    <li>Когти хорошо видны</li>
                    <li>Шаг 30-40 см</li>
                    <li>Помёт крупный, с костями и шерстью</li>
                    <li>Сильный мускусный запах</li>
                </ul>`
            },
            {
                title: 'Взаимодействие с человеком',
                content: `<p class="species-gallery__tab-text">Росомаха избегает человека, но может быть опасна.</p>
                <ul class="species-gallery__tab-list">
                    <li>Разоряет капканы и ловушки</li>
                    <li>Может нападать на домашних оленей</li>
                    <li>Избегает встреч с людьми</li>
                    <li>Охота ограничена</li>
                    <li>Численность невелика</li>
                    <li>Ценный пушной зверь</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности росомахи.</p>
                <ul class="species-gallery__tab-list">
                    <li>Самый сильный зверь относительно размера</li>
                    <li>Может убить оленя весом 100 кг</li>
                    <li>Мех используется для оторочки капюшонов</li>
                    <li>Прозвище «демон севера»</li>
                    <li>Может пройти 70 км за сутки</li>
                    <li>Герой комиксов Marvel</li>
                </ul>`
            }
        ]
    },
    
    'hare': {
        name: 'Заяц-беляк',
        latin: 'Lepus timidus',
        image: 'assets/images/priroda/flora_fauna/fauna/hare.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Заяц-беляк — типичный обитатель тайги, меняющий окраску по сезонам.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> 2,5-5,5 кг</li>
                    <li><strong>Длина тела:</strong> 44-65 см</li>
                    <li><strong>Длина ушей:</strong> 7-10 см</li>
                    <li><strong>Популяция в крае:</strong> ~100 000 особей</li>
                    <li><strong>Продолжительность жизни:</strong> 5-7 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Заяц-беляк отлично приспособлен к жизни в снежной тайге.</p>
                <ul class="species-gallery__tab-list">
                    <li>Зимой чисто-белый (кроме кончиков ушей)</li>
                    <li>Летом серо-бурый</li>
                    <li>Широкие лапы с густым мехом</li>
                    <li>Короткий хвост</li>
                    <li>Длинные задние ноги</li>
                    <li>Большие глаза по бокам головы</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Заяц — растительноядное животное.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Лето:</strong> Травы, листья, ягоды</li>
                    <li><strong>Зима:</strong> Кора деревьев, побеги</li>
                    <li>Предпочитает осину, иву, берёзу</li>
                    <li>Поедает хвою</li>
                    <li>Практикует копрофагию (поедание помёта)</li>
                    <li>Кормится ночью</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Заяц-беляк населяет различные типы лесов.</p>
                <ul class="species-gallery__tab-list">
                    <li>Смешанные леса</li>
                    <li>Хвойная тайга</li>
                    <li>Лесотундра</li>
                    <li>Предпочитает опушки и вырубки</li>
                    <li>Избегает густых зарослей</li>
                    <li>Территория: 3-30 га</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Зайцы очень плодовиты.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Сезон размножения:</strong> Март-август</li>
                    <li><strong>Беременность:</strong> 47-55 дней</li>
                    <li><strong>Количество выводков:</strong> 2-3 в год</li>
                    <li><strong>Количество зайчат:</strong> 2-8</li>
                    <li>Зайчата рождаются зрячими и опушёнными</li>
                    <li>Самостоятельны через 2 недели</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Заяц — осторожное и пугливое животное.</p>
                <ul class="species-gallery__tab-list">
                    <li>Ведёт одиночный образ жизни</li>
                    <li>Активен в сумерках и ночью</li>
                    <li>Днём отлёживается в укрытии</li>
                    <li>Скорость бега до 60 км/ч</li>
                    <li>Отлично плавает</li>
                    <li>Запутывает следы перед лёжкой</li>
                </ul>`
            },
            {
                title: 'Враги',
                content: `<p class="species-gallery__tab-text">У зайца множество естественных врагов.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Хищники:</strong> Рысь, лисица, волк, росомаха</li>
                    <li>Совы и ястребы</li>
                    <li>Горностай опасен для молодых</li>
                    <li>Основная добыча многих хищников</li>
                    <li>Выживает благодаря плодовитости</li>
                    <li>Численность циклична (пики раз в 10 лет)</li>
                </ul>`
            },
            {
                title: 'Следы',
                content: `<p class="species-gallery__tab-text">Следы зайца легко узнать.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Размер следа:</strong> Задние лапы 12-17 см</li>
                    <li>Характерная буква «Т»</li>
                    <li>Задние лапы впереди передних</li>
                    <li>Прыжки до 2 м</li>
                    <li>Помёт в виде шариков</li>
                    <li>Запутывает следы петлями и сдвойками</li>
                </ul>`
            },
            {
                title: 'Линька',
                content: `<p class="species-gallery__tab-text">Заяц меняет окраску дважды в год.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Весенняя линька:</strong> Март-май</li>
                    <li><strong>Осенняя линька:</strong> Сентябрь-ноябрь</li>
                    <li>Линька зависит от длины дня</li>
                    <li>Начинается с головы</li>
                    <li>Длится 70-80 дней</li>
                    <li>Зимний мех гуще и теплее</li>
                </ul>`
            },
            {
                title: 'Взаимодействие с человеком',
                content: `<p class="species-gallery__tab-text">Заяц — важный охотничий вид.</p>
                <ul class="species-gallery__tab-list">
                    <li>Популярный объект охоты</li>
                    <li>Может вредить молодым посадкам</li>
                    <li>Переносчик некоторых болезней</li>
                    <li>Охота регулируется</li>
                    <li>Численность колеблется</li>
                    <li>Важное звено пищевой цепи</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности зайца.</p>
                <ul class="species-gallery__tab-list">
                    <li>Глаза видят почти на 360°</li>
                    <li>Может менять направление на полном ходу</li>
                    <li>Зайчата разных выводков не родственники</li>
                    <li>Может прыгнуть на 3 м в высоту</li>
                    <li>Зимой лапы увеличиваются на 30%</li>
                    <li>Герой множества сказок</li>
                </ul>`
            }
        ]
    },
    
    'beaver': {
        name: 'Бобр',
        latin: 'Castor fiber',
        image: 'assets/images/priroda/flora_fauna/fauna/beaver.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Бобр — крупнейший грызун Евразии, инженер-строитель животного мира.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> 18-30 кг</li>
                    <li><strong>Длина тела:</strong> 75-120 см</li>
                    <li><strong>Длина хвоста:</strong> 25-30 см</li>
                    <li><strong>Популяция в крае:</strong> ~15 000 особей</li>
                    <li><strong>Продолжительность жизни:</strong> 15-20 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Бобр идеально приспособлен к полуводному образу жизни.</p>
                <ul class="species-gallery__tab-list">
                    <li>Массивное тело с короткими лапами</li>
                    <li>Плоский чешуйчатый хвост-весло</li>
                    <li>Перепонки между пальцами задних лап</li>
                    <li>Густой водонепроницаемый мех</li>
                    <li>Мощные резцы оранжевого цвета</li>
                    <li>Маленькие глаза и уши</li>
                </ul>`
            },
            {
                title: 'Строительство',
                content: `<p class="species-gallery__tab-text">Бобры — непревзойдённые строители.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Плотины:</strong> До 100 м длиной, 3 м высотой</li>
                    <li><strong>Хатки:</strong> Высота до 3 м, диаметр до 12 м</li>
                    <li>Каналы для сплава древесины</li>
                    <li>Подводные входы в жилище</li>
                    <li>Запасы корма под водой</li>
                    <li>Работают всей семьёй</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Бобр — строгий вегетарианец.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Лето:</strong> Травы, водные растения</li>
                    <li><strong>Зима:</strong> Кора и ветки деревьев</li>
                    <li>Предпочитает осину, иву, тополь</li>
                    <li>Съедает до 20% собственного веса в день</li>
                    <li>Заготавливает корм на зиму</li>
                    <li>Может валить деревья диаметром до 1 м</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Бобры селятся по берегам водоёмов.</p>
                <ul class="species-gallery__tab-list">
                    <li>Реки с медленным течением</li>
                    <li>Озёра и пруды</li>
                    <li>Старицы</li>
                    <li>Необходимы лиственные деревья</li>
                    <li>Глубина водоёма не менее 1 м</li>
                    <li>Территория семьи: 1-3 км берега</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Бобры создают пары на всю жизнь.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Гон:</strong> Январь-февраль</li>
                    <li><strong>Беременность:</strong> 105-107 дней</li>
                    <li><strong>Рождение:</strong> Апрель-май</li>
                    <li><strong>Количество бобрят:</strong> 2-5</li>
                    <li>Бобрята рождаются зрячими</li>
                    <li>Остаются с родителями 2 года</li>
                </ul>`
            },
            {
                title: 'Социальная структура',
                content: `<p class="species-gallery__tab-text">Бобры живут семейными группами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Семья: пара + молодые 2 поколений</li>
                    <li>До 8 особей в семье</li>
                    <li>Строгая территориальность</li>
                    <li>Метят границы бобровой струёй</li>
                    <li>Совместная работа по строительству</li>
                    <li>Общение звуками и хлопками хвоста</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Бобры активны круглый год.</p>
                <ul class="species-gallery__tab-list">
                    <li>Ночной образ жизни</li>
                    <li>Отличные пловцы и ныряльщики</li>
                    <li>Под водой до 15 минут</li>
                    <li>Скорость плавания до 10 км/ч</li>
                    <li>На суше неуклюжи</li>
                    <li>Зимой активны подо льдом</li>
                </ul>`
            },
            {
                title: 'Следы',
                content: `<p class="species-gallery__tab-text">Следы бобра легко узнать.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Размер следа:</strong> Задние лапы до 18 см</li>
                    <li>Отпечатки перепонок</li>
                    <li>След хвоста на грязи</li>
                    <li>Погрызы на деревьях</li>
                    <li>Стружка у основания деревьев</li>
                    <li>Плотины и хатки</li>
                </ul>`
            },
            {
                title: 'Экологическая роль',
                content: `<p class="species-gallery__tab-text">Бобры — ключевой вид экосистемы.</p>
                <ul class="species-gallery__tab-list">
                    <li>Создают водно-болотные угодья</li>
                    <li>Повышают уровень грунтовых вод</li>
                    <li>Создают места обитания для других видов</li>
                    <li>Очищают воду</li>
                    <li>Предотвращают эрозию берегов</li>
                    <li>«Инженеры экосистем»</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности бобра.</p>
                <ul class="species-gallery__tab-list">
                    <li>Резцы растут всю жизнь</li>
                    <li>Может перегрызть дерево 15 см за ночь</li>
                    <li>Самая длинная плотина — 850 м (Канада)</li>
                    <li>Почти истреблён к началу XX века</li>
                    <li>Успешно восстановлен</li>
                    <li>Изображён на монете 5 копеек СССР</li>
                </ul>`
            }
        ]
    },
    
    'sheep': {
        name: 'Снежный баран',
        latin: 'Ovis nivicola',
        image: 'assets/images/priroda/flora_fauna/fauna/sheep.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Снежный баран — редкое горное копытное, обитающее в горах Путорана.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> 60-120 кг</li>
                    <li><strong>Высота в холке:</strong> 90-110 см</li>
                    <li><strong>Длина тела:</strong> до 1,8 м</li>
                    <li><strong>Популяция в крае:</strong> ~3 000 особей</li>
                    <li><strong>Продолжительность жизни:</strong> 12-18 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Снежный баран отлично приспособлен к горам.</p>
                <ul class="species-gallery__tab-list">
                    <li>Массивное тело на крепких ногах</li>
                    <li>У самцов огромные закрученные рога</li>
                    <li>Рога самцов весом до 15 кг</li>
                    <li>Серо-бурая окраска</li>
                    <li>Белое «зеркало» на крупе</li>
                    <li>Копыта с острыми краями</li>
                </ul>`
            },
            {
                title: 'Рога',
                content: `<p class="species-gallery__tab-text">Рога снежного барана — впечатляющее украшение.</p>
                <ul class="species-gallery__tab-list">
                    <li>Растут всю жизнь</li>
                    <li>У самцов закручены в спираль</li>
                    <li>Длина по внешнему краю до 110 см</li>
                    <li>У самок небольшие рожки</li>
                    <li>Используются в турнирах</li>
                    <li>По кольцам определяют возраст</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Снежный баран — растительноядное животное.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Лето:</strong> Травы, осоки, разнотравье</li>
                    <li><strong>Зима:</strong> Сухие травы, лишайники, мхи</li>
                    <li>Выкапывает корм из-под снега</li>
                    <li>Посещает солонцы</li>
                    <li>Может обходиться без воды (ест снег)</li>
                    <li>Кормится утром и вечером</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Снежный баран — житель высокогорий.</p>
                <ul class="species-gallery__tab-list">
                    <li>Горы Путорана</li>
                    <li>Скалистые склоны</li>
                    <li>Высота 600-1800 м над уровнем моря</li>
                    <li>Летом выше, зимой ниже</li>
                    <li>Предпочитает южные склоны</li>
                    <li>Территория стада: 10-30 км²</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Гон снежных баранов сопровождается турнирами самцов.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Гон:</strong> Ноябрь-декабрь</li>
                    <li><strong>Беременность:</strong> 5-5,5 месяцев</li>
                    <li><strong>Ягнение:</strong> Апрель-май</li>
                    <li><strong>Количество ягнят:</strong> 1 (редко 2)</li>
                    <li>Ягнёнок встаёт через час</li>
                    <li>Остаётся с матерью до года</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Снежные бараны живут стадами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Стада 5-30 особей</li>
                    <li>Самцы и самки отдельно вне гона</li>
                    <li>Отличные скалолазы</li>
                    <li>Прыгают на 3-4 м</li>
                    <li>Скорость бега до 40 км/ч</li>
                    <li>Очень осторожны</li>
                </ul>`
            },
            {
                title: 'Враги',
                content: `<p class="species-gallery__tab-text">У снежного барана немного врагов в горах.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Хищники:</strong> Волки, росомахи</li>
                    <li>Беркуты опасны для ягнят</li>
                    <li>Спасаются на скалах</li>
                    <li>Суровые зимы — главная угроза</li>
                    <li>Лавины</li>
                    <li>Браконьерство</li>
                </ul>`
            },
            {
                title: 'Адаптации',
                content: `<p class="species-gallery__tab-text">Снежный баран идеально приспособлен к горам.</p>
                <ul class="species-gallery__tab-list">
                    <li>Копыта с острыми краями</li>
                    <li>Мягкие подушечки на копытах</li>
                    <li>Густой мех</li>
                    <li>Отличное зрение</li>
                    <li>Чуткий слух</li>
                    <li>Выносливость</li>
                </ul>`
            },
            {
                title: 'Охранный статус',
                content: `<p class="species-gallery__tab-text">Снежный баран нуждается в охране.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Статус:</strong> Редкий вид</li>
                    <li>Занесён в Красную книгу края</li>
                    <li>Численность сокращается</li>
                    <li>Охота запрещена</li>
                    <li>Охраняется в заповедниках</li>
                    <li>Необходимы меры охраны</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности снежного барана.</p>
                <ul class="species-gallery__tab-list">
                    <li>Может жить на высоте до 2400 м</li>
                    <li>Рога растут всю жизнь</li>
                    <li>Удар рогами слышен за километр</li>
                    <li>Видит на 300° без поворота головы</li>
                    <li>Символ гор Путорана</li>
                    <li>Один из самых редких баранов мира</li>
                </ul>`
            }
        ]
    },
    
    // ============================================
    // ПТИЦЫ
    // ============================================
    
    'eagle': {
        name: 'Орлан-белохвост',
        latin: 'Haliaeetus albicilla',
        image: 'assets/images/priroda/flora_fauna/fauna/eagle.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Орлан-белохвост — крупный хищник, связанный с водоёмами.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> 3-7 кг</li>
                    <li><strong>Размах крыльев:</strong> 200-250 см</li>
                    <li><strong>Длина тела:</strong> 70-90 см</li>
                    <li><strong>Популяция в крае:</strong> ~400 пар</li>
                    <li><strong>Продолжительность жизни:</strong> 25-30 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Орлан — массивная птица с характерным белым хвостом.</p>
                <ul class="species-gallery__tab-list">
                    <li>Бурое оперение</li>
                    <li>Белый клиновидный хвост (у взрослых)</li>
                    <li>Мощный жёлтый клюв</li>
                    <li>Жёлтые лапы</li>
                    <li>Широкие крылья</li>
                    <li>Самки крупнее самцов</li>
                </ul>`
            },
            {
                title: 'Охота',
                content: `<p class="species-gallery__tab-text">Орлан — специалист по ловле рыбы.</p>
                <ul class="species-gallery__tab-list">
                    <li>Высматривает рыбу с воздуха</li>
                    <li>Хватает рыбу когтями с поверхности</li>
                    <li>Может нырять за рыбой</li>
                    <li>Охотится на водоплавающих птиц</li>
                    <li>Ворует добычу у других птиц</li>
                    <li>Ест падаль</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Орлан — хищник с разнообразным рационом.</p>
                <ul class="species-gallery__tab-list">
                    <li>Рыба (до 70% рациона)</li>
                    <li>Водоплавающие птицы</li>
                    <li>Млекопитающие (зайцы, ондатры)</li>
                    <li>Падаль</li>
                    <li>Съедает до 1 кг в день</li>
                    <li>Может голодать неделю</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Орлан селится у крупных водоёмов.</p>
                <ul class="species-gallery__tab-list">
                    <li>Берега рек и озёр</li>
                    <li>Морские побережья</li>
                    <li>Требует высоких деревьев для гнезда</li>
                    <li>Богатые рыбой водоёмы</li>
                    <li>Избегает близости человека</li>
                    <li>Территория пары: 30-100 км²</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Орланы создают пары на всю жизнь.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Гнездование:</strong> Март-апрель</li>
                    <li><strong>Кладка:</strong> 1-3 яйца</li>
                    <li><strong>Насиживание:</strong> 38-42 дня</li>
                    <li><strong>Вылет птенцов:</strong> Через 70-90 дней</li>
                    <li>Обычно выживает 1-2 птенца</li>
                    <li>Молодые остаются с родителями до осени</li>
                </ul>`
            },
            {
                title: 'Гнездо',
                content: `<p class="species-gallery__tab-text">Орланы строят огромные гнёзда.</p>
                <ul class="species-gallery__tab-list">
                    <li>Диаметр до 2,5 м</li>
                    <li>Высота до 2 м</li>
                    <li>Вес до 600 кг</li>
                    <li>Используется много лет</li>
                    <li>Строят на высоких деревьях</li>
                    <li>Имеют несколько гнёзд</li>
                </ul>`
            },
            {
                title: 'Полёт',
                content: `<p class="species-gallery__tab-text">Орлан — мастер парящего полёта.</p>
                <ul class="species-gallery__tab-list">
                    <li>Парит часами</li>
                    <li>Использует термики</li>
                    <li>Скорость до 70 км/ч</li>
                    <li>Может зависать над водой</li>
                    <li>Тяжёлый взлёт с воды</li>
                    <li>Маневренный несмотря на размер</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Орлан — территориальная птица.</p>
                <ul class="species-gallery__tab-list">
                    <li>Строго охраняет территорию</li>
                    <li>Оседлая или кочующая птица</li>
                    <li>Отличное зрение</li>
                    <li>Видит рыбу под водой</li>
                    <li>Может отбирать добычу у других</li>
                    <li>Зимой собирается у незамерзающих водоёмов</li>
                </ul>`
            },
            {
                title: 'Охранный статус',
                content: `<p class="species-gallery__tab-text">Орлан находится под охраной.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Статус:</strong> Редкий вид</li>
                    <li>Занесён в Красную книгу</li>
                    <li>Численность восстанавливается</li>
                    <li>Страдал от загрязнения</li>
                    <li>Охраняется законом</li>
                    <li>Символ дикой природы</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности орлана.</p>
                <ul class="species-gallery__tab-list">
                    <li>Один из крупнейших орлов</li>
                    <li>Может поднять рыбу весом 6 кг</li>
                    <li>Живёт до 40 лет</li>
                    <li>Изображён на гербах многих стран</li>
                    <li>Национальная птица Германии</li>
                    <li>Символ силы и свободы</li>
                </ul>`
            }
        ]
    },
    
    'capercaillie': {
        name: 'Глухарь',
        latin: 'Tetrao urogallus',
        image: 'assets/images/priroda/flora_fauna/fauna/capercaillie.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Глухарь — крупнейшая птица семейства тетеревиных, символ тайги.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес самца:</strong> 3,5-6,5 кг</li>
                    <li><strong>Вес самки:</strong> 1,7-2,3 кг</li>
                    <li><strong>Длина тела:</strong> 60-110 см</li>
                    <li><strong>Размах крыльев:</strong> 90-125 см</li>
                    <li><strong>Продолжительность жизни:</strong> 10-12 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Самец и самка глухаря сильно различаются.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Самец:</strong> Тёмный с металлическим отливом</li>
                    <li>Красные брови</li>
                    <li>Веерообразный хвост</li>
                    <li>Борода из перьев</li>
                    <li><strong>Самка:</strong> Рыжевато-бурая с пестринами</li>
                    <li>Меньше самца в 2 раза</li>
                </ul>`
            },
            {
                title: 'Токование',
                content: `<p class="species-gallery__tab-text">Токование глухаря — удивительное зрелище.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Период:</strong> Апрель-май</li>
                    <li>Начинается до рассвета</li>
                    <li>Самец издаёт характерную песню</li>
                    <li>Во время песни глохнет (отсюда название)</li>
                    <li>Распускает хвост веером</li>
                    <li>Токует на дереве или земле</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Рацион глухаря меняется по сезонам.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Лето:</strong> Ягоды, травы, насекомые</li>
                    <li><strong>Осень:</strong> Ягоды, хвоя лиственницы</li>
                    <li><strong>Зима:</strong> Хвоя сосны, кедра</li>
                    <li><strong>Весна:</strong> Почки, побеги</li>
                    <li>Птенцы питаются насекомыми</li>
                    <li>Нуждается в гастролитах (камешках)</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Глухарь — типичный обитатель хвойных лесов.</p>
                <ul class="species-gallery__tab-list">
                    <li>Сосновые боры</li>
                    <li>Кедровая тайга</li>
                    <li>Смешанные леса</li>
                    <li>Предпочитает старые леса</li>
                    <li>Необходимы ягодники</li>
                    <li>Избегает густых зарослей</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Глухарь — полигамная птица.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Токование:</strong> Апрель-май</li>
                    <li><strong>Кладка:</strong> 6-8 яиц</li>
                    <li><strong>Насиживание:</strong> 25-28 дней</li>
                    <li>Насиживает только самка</li>
                    <li>Птенцы выводкового типа</li>
                    <li>Поднимаются на крыло через 2 недели</li>
                </ul>`
            },
            {
                title: 'Поведение',
                content: `<p class="species-gallery__tab-text">Глухарь ведёт скрытный образ жизни.</p>
                <ul class="species-gallery__tab-list">
                    <li>Осторожен и пуглив</li>
                    <li>Большую часть времени на земле</li>
                    <li>Ночует на деревьях</li>
                    <li>Зимой ночует в снегу</li>
                    <li>Хорошо бегает</li>
                    <li>Полёт тяжёлый и шумный</li>
                </ul>`
            },
            {
                title: 'Зимовка',
                content: `<p class="species-gallery__tab-text">Зимой глухарь приспосабливается к холодам.</p>
                <ul class="species-gallery__tab-list">
                    <li>Ночует в снежных камерах</li>
                    <li>Зарывается в снег на глубину до 50 см</li>
                    <li>В камере температура выше на 10-15°C</li>
                    <li>Питается только хвоей</li>
                    <li>Малоподвижен</li>
                    <li>Держится вблизи токовищ</li>
                </ul>`
            },
            {
                title: 'Враги',
                content: `<p class="species-gallery__tab-text">У глухаря много естественных врагов.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Хищники:</strong> Рысь, лисица, куница</li>
                    <li>Ястреб-тетеревятник</li>
                    <li>Филин</li>
                    <li>Разоряют гнёзда: вороны, сороки</li>
                    <li>Суровые зимы</li>
                    <li>Беспокойство на токах</li>
                </ul>`
            },
            {
                title: 'Охотничье значение',
                content: `<p class="species-gallery__tab-text">Глухарь — ценная охотничья птица.</p>
                <ul class="species-gallery__tab-list">
                    <li>Традиционный объект охоты</li>
                    <li>Охота на токах весной</li>
                    <li>Охота с лайкой осенью</li>
                    <li>Численность сокращается</li>
                    <li>Охота регулируется</li>
                    <li>Нуждается в охране токовищ</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности глухаря.</p>
                <ul class="species-gallery__tab-list">
                    <li>Во время токования действительно глохнет</li>
                    <li>Песня слышна за 500 м</li>
                    <li>Может прожить без еды 2 недели</li>
                    <li>Зимой кишечник удлиняется на 30%</li>
                    <li>Символ русской охоты</li>
                    <li>Изображён на марках и монетах</li>
                </ul>`
            }
        ]
    },
    
    // ============================================
    // РЫБЫ
    // ============================================
    
    'taimen': {
        name: 'Таймень',
        latin: 'Hucho taimen',
        image: 'assets/images/priroda/flora_fauna/fauna/taimen.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Таймень — крупнейший представитель лососевых, хозяин сибирских рек.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> до 60 кг (обычно 5-15 кг)</li>
                    <li><strong>Длина:</strong> до 1,5 м (обычно 50-80 см)</li>
                    <li><strong>Максимальный возраст:</strong> до 55 лет</li>
                    <li><strong>Статус:</strong> Редкий вид</li>
                    <li><strong>Продолжительность жизни:</strong> 30-40 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Таймень — мощная красивая рыба.</p>
                <ul class="species-gallery__tab-list">
                    <li>Удлинённое торпедообразное тело</li>
                    <li>Крупная голова с большой пастью</li>
                    <li>Мелкая чешуя</li>
                    <li>Спина тёмно-зелёная или бурая</li>
                    <li>Бока серебристые с тёмными пятнами</li>
                    <li>В период нереста краснеет</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Таймень — активный хищник.</p>
                <ul class="species-gallery__tab-list">
                    <li>Молодь: насекомые, личинки</li>
                    <li>Взрослые: рыба (хариус, ленок, сиг)</li>
                    <li>Мыши, землеройки</li>
                    <li>Лягушки</li>
                    <li>Может нападать на водоплавающих птиц</li>
                    <li>Охотится из засады</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Таймень предпочитает чистые холодные реки.</p>
                <ul class="species-gallery__tab-list">
                    <li>Быстрые горные реки</li>
                    <li>Глубокие плёсы</li>
                    <li>Омуты под перекатами</li>
                    <li>Требует чистой воды</li>
                    <li>Температура воды до 20°C</li>
                    <li>Территориален</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Таймень нерестится весной.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Нерест:</strong> Май-июнь</li>
                    <li>Температура воды 5-10°C</li>
                    <li>На галечных перекатах</li>
                    <li><strong>Плодовитость:</strong> 10-30 тыс. икринок</li>
                    <li>Икра крупная (5-6 мм)</li>
                    <li>Половозрелость в 5-7 лет</li>
                </ul>`
            },
            {
                title: 'Образ жизни',
                content: `<p class="species-gallery__tab-text">Таймень — оседлая рыба.</p>
                <ul class="species-gallery__tab-list">
                    <li>Держится на своём участке</li>
                    <li>Активен в сумерках</li>
                    <li>Зимует в глубоких ямах</li>
                    <li>Весной поднимается в притоки</li>
                    <li>Летом в основном русле</li>
                    <li>Одиночный образ жизни</li>
                </ul>`
            },
            {
                title: 'Рост',
                content: `<p class="species-gallery__tab-text">Таймень растёт всю жизнь.</p>
                <ul class="species-gallery__tab-list">
                    <li>Первый год: 10-15 см</li>
                    <li>Три года: 30-40 см</li>
                    <li>Пять лет: 50-60 см</li>
                    <li>Десять лет: 80-100 см</li>
                    <li>Рекордные особи до 1,5 м</li>
                    <li>Растёт медленно</li>
                </ul>`
            },
            {
                title: 'Враги и угрозы',
                content: `<p class="species-gallery__tab-text">Таймень сталкивается с многими угрозами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Браконьерство — главная угроза</li>
                    <li>Загрязнение рек</li>
                    <li>Вырубка лесов по берегам</li>
                    <li>Молодь поедают щука, налим</li>
                    <li>Выдра охотится на тайменя</li>
                    <li>Изменение климата</li>
                </ul>`
            },
            {
                title: 'Рыболовное значение',
                content: `<p class="species-gallery__tab-text">Таймень — мечта рыболова.</p>
                <ul class="species-gallery__tab-list">
                    <li>Ценная спортивная рыба</li>
                    <li>Ловля по принципу «поймал-отпусти»</li>
                    <li>Вкусное мясо</li>
                    <li>Промысловый лов запрещён</li>
                    <li>Любительская ловля ограничена</li>
                    <li>Объект экологического туризма</li>
                </ul>`
            },
            {
                title: 'Охранный статус',
                content: `<p class="species-gallery__tab-text">Таймень нуждается в строгой охране.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Статус:</strong> Редкий вид</li>
                    <li>Занесён в Красную книгу России</li>
                    <li>Численность сокращается</li>
                    <li>Охраняется в заповедниках</li>
                    <li>Необходимо восстановление популяции</li>
                    <li>Символ чистых рек Сибири</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности тайменя.</p>
                <ul class="species-gallery__tab-list">
                    <li>Может прожить более 50 лет</li>
                    <li>Рекордный таймень весил 105 кг</li>
                    <li>Может выпрыгивать из воды на 1,5 м</li>
                    <li>Нападает на уток и гусей</li>
                    <li>«Красная щука» — народное название</li>
                    <li>Реликтовый вид (существует миллионы лет)</li>
                </ul>`
            }
        ]
    },
    
    'sturgeon': {
        name: 'Сибирский осётр',
        latin: 'Acipenser baerii',
        image: 'assets/images/priroda/flora_fauna/fauna/sturgeon.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Сибирский осётр — древняя ценная рыба, живое ископаемое.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> до 200 кг (обычно 10-30 кг)</li>
                    <li><strong>Длина:</strong> до 3 м (обычно 1-1,5 м)</li>
                    <li><strong>Максимальный возраст:</strong> до 60 лет</li>
                    <li><strong>Статус:</strong> Редкий вид</li>
                    <li><strong>Продолжительность жизни:</strong> 40-50 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Осётр имеет характерную древнюю внешность.</p>
                <ul class="species-gallery__tab-list">
                    <li>Удлинённое веретенообразное тело</li>
                    <li>Пять рядов костных жучек</li>
                    <li>Вытянутое рыло</li>
                    <li>Четыре усика перед ртом</li>
                    <li>Рот на нижней стороне головы</li>
                    <li>Спина тёмно-серая, брюхо светлое</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Осётр — донный хищник.</p>
                <ul class="species-gallery__tab-list">
                    <li>Личинки насекомых</li>
                    <li>Моллюски</li>
                    <li>Черви</li>
                    <li>Мелкая рыба</li>
                    <li>Ракообразные</li>
                    <li>Находит пищу усиками</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Осётр обитает в крупных реках и водохранилищах.</p>
                <ul class="species-gallery__tab-list">
                    <li>Енисей и его притоки</li>
                    <li>Глубокие участки рек</li>
                    <li>Водохранилища ГЭС</li>
                    <li>Предпочитает холодную воду</li>
                    <li>Держится у дна</li>
                    <li>Совершает миграции</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Осётр размножается редко.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Нерест:</strong> Май-июнь</li>
                    <li>Температура воды 10-15°C</li>
                    <li>На каменистом грунте</li>
                    <li><strong>Плодовитость:</strong> 200-800 тыс. икринок</li>
                    <li>Половозрелость в 10-20 лет</li>
                    <li>Нерестится раз в 3-4 года</li>
                </ul>`
            },
            {
                title: 'Образ жизни',
                content: `<p class="species-gallery__tab-text">Осётр — долгоживущая рыба.</p>
                <ul class="species-gallery__tab-list">
                    <li>Медленно растёт</li>
                    <li>Поздно созревает</li>
                    <li>Зимует в глубоких ямах</li>
                    <li>Весной поднимается вверх по реке</li>
                    <li>Летом нагуливается</li>
                    <li>Может жить в солоноватой воде</li>
                </ul>`
            },
            {
                title: 'Рост',
                content: `<p class="species-gallery__tab-text">Осётр растёт очень медленно.</p>
                <ul class="species-gallery__tab-list">
                    <li>Первый год: 10-15 см</li>
                    <li>Пять лет: 40-50 см</li>
                    <li>Десять лет: 70-80 см</li>
                    <li>Двадцать лет: 100-120 см</li>
                    <li>Рекордные особи до 3 м</li>
                    <li>Вес увеличивается всю жизнь</li>
                </ul>`
            },
            {
                title: 'Враги и угрозы',
                content: `<p class="species-gallery__tab-text">Осётр находится под угрозой исчезновения.</p>
                <ul class="species-gallery__tab-list">
                    <li>Браконьерство (икра очень ценна)</li>
                    <li>Плотины ГЭС (нарушают миграции)</li>
                    <li>Загрязнение рек</li>
                    <li>Молодь поедают хищные рыбы</li>
                    <li>Медленное размножение</li>
                    <li>Изменение климата</li>
                </ul>`
            },
            {
                title: 'Хозяйственное значение',
                content: `<p class="species-gallery__tab-text">Осётр — ценнейшая промысловая рыба.</p>
                <ul class="species-gallery__tab-list">
                    <li>Чёрная икра — деликатес</li>
                    <li>Ценное мясо</li>
                    <li>Промысел запрещён</li>
                    <li>Разводится на рыбозаводах</li>
                    <li>Выпуск молоди в реки</li>
                    <li>Аквакультура</li>
                </ul>`
            },
            {
                title: 'Охранный статус',
                content: `<p class="species-gallery__tab-text">Осётр строго охраняется.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Статус:</strong> Исчезающий вид</li>
                    <li>Занесён в Красную книгу России</li>
                    <li>Промысел полностью запрещён</li>
                    <li>Искусственное разведение</li>
                    <li>Охраняется в заповедниках</li>
                    <li>Необходимо восстановление популяции</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности осётра.</p>
                <ul class="species-gallery__tab-list">
                    <li>Существует более 200 млн лет</li>
                    <li>Современник динозавров</li>
                    <li>Рекордный осётр весил 210 кг</li>
                    <li>Икра стоит дороже золота</li>
                    <li>Может прожить более 100 лет</li>
                    <li>Символ богатства Сибири</li>
                </ul>`
            }
        ]
    },
    
    'pike': {
        name: 'Щука',
        latin: 'Esox lucius',
        image: 'assets/images/priroda/flora_fauna/fauna/pike.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Щука — грозный пресноводный хищник, санитар водоёмов.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Вес:</strong> до 35 кг (обычно 1-8 кг)</li>
                    <li><strong>Длина:</strong> до 1,5 м (обычно 40-80 см)</li>
                    <li><strong>Максимальный возраст:</strong> до 30 лет</li>
                    <li><strong>Статус:</strong> Обычный вид</li>
                    <li><strong>Продолжительность жизни:</strong> 15-20 лет</li>
                </ul>`
            },
            {
                title: 'Внешний вид',
                content: `<p class="species-gallery__tab-text">Щука идеально приспособлена для охоты.</p>
                <ul class="species-gallery__tab-list">
                    <li>Торпедообразное тело</li>
                    <li>Вытянутая голова с большой пастью</li>
                    <li>Острые зубы в несколько рядов</li>
                    <li>Спинной плавник сдвинут назад</li>
                    <li>Окраска маскировочная (зелёная с пятнами)</li>
                    <li>Самки крупнее самцов</li>
                </ul>`
            },
            {
                title: 'Охота',
                content: `<p class="species-gallery__tab-text">Щука — мастер засадной охоты.</p>
                <ul class="species-gallery__tab-list">
                    <li>Подстерегает добычу в засаде</li>
                    <li>Молниеносный бросок</li>
                    <li>Скорость атаки до 4 м/с</li>
                    <li>Хватает добычу поперёк</li>
                    <li>Затем разворачивает головой вперёд</li>
                    <li>Может нападать на добычу своего размера</li>
                </ul>`
            },
            {
                title: 'Питание',
                content: `<p class="species-gallery__tab-text">Щука — прожорливый хищник.</p>
                <ul class="species-gallery__tab-list">
                    <li>Основа: рыба (плотва, окунь, карась)</li>
                    <li>Лягушки</li>
                    <li>Мыши и водяные крысы</li>
                    <li>Утята</li>
                    <li>Может поедать мелких щук</li>
                    <li>Съедает до 30% собственного веса</li>
                </ul>`
            },
            {
                title: 'Места обитания',
                content: `<p class="species-gallery__tab-text">Щука населяет разнообразные водоёмы.</p>
                <ul class="species-gallery__tab-list">
                    <li>Реки с медленным течением</li>
                    <li>Озёра и пруды</li>
                    <li>Водохранилища</li>
                    <li>Заросшие заливы</li>
                    <li>Предпочитает заросли водной растительности</li>
                    <li>Держится у дна или в зарослях</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Щука нерестится ранней весной.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Нерест:</strong> Март-апрель (сразу после ледохода)</li>
                    <li>Температура воды 3-6°C</li>
                    <li>На мелководье в зарослях</li>
                    <li><strong>Плодовитость:</strong> 20-200 тыс. икринок</li>
                    <li>Половозрелость в 3-4 года</li>
                    <li>Нерестится группами</li>
                </ul>`
            },
            {
                title: 'Образ жизни',
                content: `<p class="species-gallery__tab-text">Щука — одиночный хищник.</p>
                <ul class="species-gallery__tab-list">
                    <li>Территориальна</li>
                    <li>Активна круглый год</li>
                    <li>Охотится в сумерках</li>
                    <li>Зимой менее активна</li>
                    <li>Может голодать несколько недель</li>
                    <li>После еды переваривает пищу несколько дней</li>
                </ul>`
            },
            {
                title: 'Зубы',
                content: `<p class="species-gallery__tab-text">Зубы щуки — грозное оружие.</p>
                <ul class="species-gallery__tab-list">
                    <li>Несколько рядов острых зубов</li>
                    <li>Зубы направлены назад</li>
                    <li>Постоянно обновляются</li>
                    <li>Во время смены зубов не охотится</li>
                    <li>Может удерживать крупную добычу</li>
                    <li>Зубы на нёбе и языке</li>
                </ul>`
            },
            {
                title: 'Враги',
                content: `<p class="species-gallery__tab-text">У взрослой щуки мало врагов.</p>
                <ul class="species-gallery__tab-list">
                    <li>Молодь поедают окуни, судаки</li>
                    <li>Выдра охотится на щук</li>
                    <li>Скопа ловит щук</li>
                    <li>Каннибализм (крупные едят мелких)</li>
                    <li>Паразиты</li>
                    <li>Загрязнение водоёмов</li>
                </ul>`
            },
            {
                title: 'Рыболовное значение',
                content: `<p class="species-gallery__tab-text">Щука — популярный объект рыбалки.</p>
                <ul class="species-gallery__tab-list">
                    <li>Ценная промысловая рыба</li>
                    <li>Популярна у рыболовов-спортсменов</li>
                    <li>Вкусное диетическое мясо</li>
                    <li>Ловят круглый год</li>
                    <li>Регулирует численность сорной рыбы</li>
                    <li>«Санитар водоёмов»</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности щуки.</p>
                <ul class="species-gallery__tab-list">
                    <li>Может прожить до 30 лет</li>
                    <li>Рекордная щука весила 35 кг</li>
                    <li>Видит на 360° (глаза по бокам)</li>
                    <li>Может выпрыгивать из воды</li>
                    <li>Нападает на добычу в 2/3 своего размера</li>
                    <li>Герой многих сказок и легенд</li>
                </ul>`
            }
        ]
    },
    
    // ============================================
    // ФЛОРА - ДЕРЕВЬЯ
    // ============================================
    
    'larch': {
        name: 'Лиственница',
        latin: 'Larix sibirica',
        image: 'assets/images/priroda/flora_fauna/flora/larch.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Лиственница — единственное хвойное дерево, сбрасывающее хвою на зиму.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Высота:</strong> до 45 м</li>
                    <li><strong>Диаметр ствола:</strong> до 2 м</li>
                    <li><strong>Возраст:</strong> до 500 лет</li>
                    <li><strong>Хвоя:</strong> Опадающая</li>
                    <li><strong>Статус:</strong> Обычный вид</li>
                </ul>`
            },
            {
                title: 'Ботаническое описание',
                content: `<p class="species-gallery__tab-text">Лиственница — листопадное хвойное дерево.</p>
                <ul class="species-gallery__tab-list">
                    <li>Хвоя мягкая, светло-зелёная</li>
                    <li>Собрана в пучки по 20-40 штук</li>
                    <li>Осенью желтеет и опадает</li>
                    <li>Кора толстая, трещиноватая</li>
                    <li>Крона ажурная, пропускает свет</li>
                    <li>Корневая система мощная</li>
                </ul>`
            },
            {
                title: 'Шишки и семена',
                content: `<p class="species-gallery__tab-text">Шишки лиственницы небольшие и изящные.</p>
                <ul class="species-gallery__tab-list">
                    <li>Шишки яйцевидные, 2-4 см</li>
                    <li>Созревают за один сезон</li>
                    <li>Висят на дереве несколько лет</li>
                    <li>Семена мелкие, крылатые</li>
                    <li>Плодоносит с 15-20 лет</li>
                    <li>Урожайные годы раз в 3-5 лет</li>
                </ul>`
            },
            {
                title: 'Места произрастания',
                content: `<p class="species-gallery__tab-text">Лиственница образует светлохвойную тайгу.</p>
                <ul class="species-gallery__tab-list">
                    <li>Основная лесообразующая порода края</li>
                    <li>От лесостепи до лесотундры</li>
                    <li>Горы и равнины</li>
                    <li>Растёт на вечной мерзлоте</li>
                    <li>Светолюбива</li>
                    <li>Неприхотлива к почвам</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Лиственница размножается семенами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Опыление ветром в мае</li>
                    <li>Шишки созревают в августе-сентябре</li>
                    <li>Семена разносятся ветром</li>
                    <li>Всхожесть семян 1-2 года</li>
                    <li>Быстро растёт в молодости</li>
                    <li>Может возобновляться после пожаров</li>
                </ul>`
            },
            {
                title: 'Хозяйственное значение',
                content: `<p class="species-gallery__tab-text">Лиственница — ценнейшая древесная порода.</p>
                <ul class="species-gallery__tab-list">
                    <li>Прочная долговечная древесина</li>
                    <li>Не гниёт в воде</li>
                    <li>Строительство, судостроение</li>
                    <li>Шпалы, столбы</li>
                    <li>Из коры получают дубильные вещества</li>
                    <li>Хвоя — витаминный корм</li>
                </ul>`
            },
            {
                title: 'Экологическая роль',
                content: `<p class="species-gallery__tab-text">Лиственница — основа светлохвойной тайги.</p>
                <ul class="species-gallery__tab-list">
                    <li>Образует обширные леса</li>
                    <li>Улучшает почву (опадающая хвоя)</li>
                    <li>Пропускает свет (богатый подлесок)</li>
                    <li>Регулирует водный режим</li>
                    <li>Предотвращает эрозию</li>
                    <li>Важна для многих животных</li>
                </ul>`
            },
            {
                title: 'Особенности',
                content: `<p class="species-gallery__tab-text">Лиственница обладает уникальными свойствами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Единственная листопадная хвойная</li>
                    <li>Морозостойка (до -70°C)</li>
                    <li>Растёт на вечной мерзлоте</li>
                    <li>Древесина тонет в воде</li>
                    <li>С возрастом становится прочнее</li>
                    <li>Устойчива к пожарам (толстая кора)</li>
                </ul>`
            },
            {
                title: 'Лечебные свойства',
                content: `<p class="species-gallery__tab-text">Лиственница используется в медицине.</p>
                <ul class="species-gallery__tab-list">
                    <li>Хвоя богата витамином C</li>
                    <li>Живица обладает ранозаживляющим действием</li>
                    <li>Кора содержит дубильные вещества</li>
                    <li>Эфирные масла</li>
                    <li>Антисептические свойства</li>
                    <li>Используется в народной медицине</li>
                </ul>`
            },
            {
                title: 'Выращивание',
                content: `<p class="species-gallery__tab-text">Лиственницу можно выращивать искусственно.</p>
                <ul class="species-gallery__tab-list">
                    <li>Посадка семенами или саженцами</li>
                    <li>Неприхотлива</li>
                    <li>Быстро растёт</li>
                    <li>Светолюбива</li>
                    <li>Морозостойка</li>
                    <li>Используется в лесоразведении</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности лиственницы.</p>
                <ul class="species-gallery__tab-list">
                    <li>Занимает 40% лесов России</li>
                    <li>Древесина не гниёт веками</li>
                    <li>Венеция построена на сваях из лиственницы</li>
                    <li>Может жить до 900 лет</li>
                    <li>Самое распространённое дерево Сибири</li>
                    <li>Символ Красноярского края</li>
                </ul>`
            }
        ]
    },
    
    'pine': {
        name: 'Сосна обыкновенная',
        latin: 'Pinus sylvestris',
        image: 'assets/images/priroda/flora_fauna/flora/pine.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Сосна — светолюбивое хвойное дерево, образующее сосновые боры.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Высота:</strong> до 40 м</li>
                    <li><strong>Диаметр ствола:</strong> до 1,2 м</li>
                    <li><strong>Возраст:</strong> до 400 лет</li>
                    <li><strong>Хвоя:</strong> Вечнозелёная</li>
                    <li><strong>Статус:</strong> Обычный вид</li>
                </ul>`
            },
            {
                title: 'Ботаническое описание',
                content: `<p class="species-gallery__tab-text">Сосна — стройное хвойное дерево.</p>
                <ul class="species-gallery__tab-list">
                    <li>Хвоя длиной 4-7 см, собрана по 2</li>
                    <li>Хвоя сизо-зелёная</li>
                    <li>Кора красновато-бурая, чешуйчатая</li>
                    <li>Крона высоко поднята</li>
                    <li>Корневая система стержневая</li>
                    <li>Ствол прямой</li>
                </ul>`
            },
            {
                title: 'Шишки и семена',
                content: `<p class="species-gallery__tab-text">Шишки сосны созревают два года.</p>
                <ul class="species-gallery__tab-list">
                    <li>Шишки яйцевидные, 3-7 см</li>
                    <li>Созревают на второй год</li>
                    <li>Раскрываются весной</li>
                    <li>Семена крылатые</li>
                    <li>Плодоносит с 15 лет</li>
                    <li>Урожайные годы раз в 3-5 лет</li>
                </ul>`
            },
            {
                title: 'Места произрастания',
                content: `<p class="species-gallery__tab-text">Сосна растёт на разных почвах.</p>
                <ul class="species-gallery__tab-list">
                    <li>Сосновые боры</li>
                    <li>Песчаные почвы</li>
                    <li>Болота (сосна болотная)</li>
                    <li>Скалы</li>
                    <li>От лесостепи до тайги</li>
                    <li>Очень светолюбива</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Сосна размножается семенами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Опыление ветром в мае-июне</li>
                    <li>Шишки созревают через 18 месяцев</li>
                    <li>Семена разносятся ветром</li>
                    <li>Всхожесть семян 2-3 года</li>
                    <li>Быстро растёт</li>
                    <li>Пионер на бедных почвах</li>
                </ul>`
            },
            {
                title: 'Хозяйственное значение',
                content: `<p class="species-gallery__tab-text">Сосна — важнейшая лесная порода.</p>
                <ul class="species-gallery__tab-list">
                    <li>Ценная строительная древесина</li>
                    <li>Смола (живица) — сырьё для канифоли</li>
                    <li>Скипидар</li>
                    <li>Целлюлоза</li>
                    <li>Дрова</li>
                    <li>Хвоя — витаминный корм</li>
                </ul>`
            },
            {
                title: 'Экологическая роль',
                content: `<p class="species-gallery__tab-text">Сосна — важный компонент экосистемы.</p>
                <ul class="species-gallery__tab-list">
                    <li>Образует сосновые боры</li>
                    <li>Улучшает песчаные почвы</li>
                    <li>Закрепляет пески</li>
                    <li>Очищает воздух</li>
                    <li>Фитонциды убивают бактерии</li>
                    <li>Место обитания многих животных</li>
                </ul>`
            },
            {
                title: 'Лечебные свойства',
                content: `<p class="species-gallery__tab-text">Сосна широко используется в медицине.</p>
                <ul class="species-gallery__tab-list">
                    <li>Хвоя богата витамином C</li>
                    <li>Почки — отхаркивающее средство</li>
                    <li>Живица — ранозаживляющее</li>
                    <li>Эфирные масла</li>
                    <li>Воздух соснового бора целебен</li>
                    <li>Фитонциды</li>
                </ul>`
            },
            {
                title: 'Особенности',
                content: `<p class="species-gallery__tab-text">Сосна обладает уникальными свойствами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Очень светолюбива</li>
                    <li>Неприхотлива к почвам</li>
                    <li>Морозостойка</li>
                    <li>Засухоустойчива</li>
                    <li>Быстро растёт</li>
                    <li>Устойчива к загрязнению</li>
                </ul>`
            },
            {
                title: 'Выращивание',
                content: `<p class="species-gallery__tab-text">Сосну легко выращивать.</p>
                <ul class="species-gallery__tab-list">
                    <li>Посадка семенами или саженцами</li>
                    <li>Неприхотлива</li>
                    <li>Быстро растёт</li>
                    <li>Требует много света</li>
                    <li>Морозостойка</li>
                    <li>Широко используется в лесоразведении</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности сосны.</p>
                <ul class="species-gallery__tab-list">
                    <li>Может жить до 600 лет</li>
                    <li>Древесина не гниёт</li>
                    <li>Воздух соснового бора стерилен</li>
                    <li>Одно дерево даёт кислород для 3 человек</li>
                    <li>Символ долголетия</li>
                    <li>Используется в кораблестроении</li>
                </ul>`
            }
        ]
    },
    
    'birch': {
        name: 'Берёза',
        latin: 'Betula pendula',
        image: 'assets/images/priroda/flora_fauna/flora/birch.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Берёза — символ России, изящное лиственное дерево.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Высота:</strong> до 30 м</li>
                    <li><strong>Диаметр ствола:</strong> до 80 см</li>
                    <li><strong>Возраст:</strong> до 150 лет</li>
                    <li><strong>Листья:</strong> Опадающие</li>
                    <li><strong>Статус:</strong> Обычный вид</li>
                </ul>`
            },
            {
                title: 'Ботаническое описание',
                content: `<p class="species-gallery__tab-text">Берёза легко узнаваема по белой коре.</p>
                <ul class="species-gallery__tab-list">
                    <li>Кора белая с чёрными чечевичками</li>
                    <li>Листья треугольные, зубчатые</li>
                    <li>Ветви повислые</li>
                    <li>Крона ажурная</li>
                    <li>Корневая система поверхностная</li>
                    <li>Ствол стройный</li>
                </ul>`
            },
            {
                title: 'Серёжки и семена',
                content: `<p class="species-gallery__tab-text">Берёза цветёт серёжками.</p>
                <ul class="species-gallery__tab-list">
                    <li>Мужские серёжки длинные, повислые</li>
                    <li>Женские серёжки короткие</li>
                    <li>Цветёт в апреле-мае</li>
                    <li>Семена мелкие, крылатые</li>
                    <li>Плодоносит с 10 лет</li>
                    <li>Обильное плодоношение ежегодно</li>
                </ul>`
            },
            {
                title: 'Места произрастания',
                content: `<p class="species-gallery__tab-text">Берёза растёт повсеместно.</p>
                <ul class="species-gallery__tab-list">
                    <li>Смешанные леса</li>
                    <li>Берёзовые рощи</li>
                    <li>Опушки</li>
                    <li>Вырубки и гари</li>
                    <li>От лесостепи до тундры</li>
                    <li>Неприхотлива к почвам</li>
                </ul>`
            },
            {
                title: 'Размножение',
                content: `<p class="species-gallery__tab-text">Берёза легко размножается семенами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Опыление ветром</li>
                    <li>Семена созревают в августе</li>
                    <li>Разносятся ветром на большие расстояния</li>
                    <li>Всхожесть семян до 1 года</li>
                    <li>Быстро растёт</li>
                    <li>Пионер на вырубках</li>
                </ul>`
            },
            {
                title: 'Хозяйственное значение',
                content: `<p class="species-gallery__tab-text">Берёза — ценное дерево.</p>
                <ul class="species-gallery__tab-list">
                    <li>Древесина для мебели, фанеры</li>
                    <li>Дрова (высокая теплотворность)</li>
                    <li>Берёзовый сок</li>
                    <li>Дёготь</li>
                    <li>Береста для поделок</li>
                    <li>Веники для бани</li>
                </ul>`
            },
            {
                title: 'Лечебные свойства',
                content: `<p class="species-gallery__tab-text">Берёза — природная аптека.</p>
                <ul class="species-gallery__tab-list">
                    <li>Почки — мочегонное, противовоспалительное</li>
                    <li>Листья — витамины</li>
                    <li>Сок — общеукрепляющее</li>
                    <li>Дёготь — антисептик</li>
                    <li>Чага (берёзовый гриб)</li>
                    <li>Веники для бани</li>
                </ul>`
            },
            {
                title: 'Экологическая роль',
                content: `<p class="species-gallery__tab-text">Берёза — важный компонент леса.</p>
                <ul class="species-gallery__tab-list">
                    <li>Пионер на вырубках и гарях</li>
                    <li>Улучшает почву</li>
                    <li>Даёт приют многим животным</li>
                    <li>Пыльца — корм для пчёл</li>
                    <li>Листовой опад удобряет почву</li>
                    <li>Очищает воздух</li>
                </ul>`
            },
            {
                title: 'Берёзовый сок',
                content: `<p class="species-gallery__tab-text">Берёзовый сок — ценный напиток.</p>
                <ul class="species-gallery__tab-list">
                    <li>Собирают весной (март-апрель)</li>
                    <li>Содержит сахара, витамины</li>
                    <li>Общеукрепляющее действие</li>
                    <li>С одного дерева до 5 литров в день</li>
                    <li>Важно не навредить дереву</li>
                    <li>Традиционный напиток</li>
                </ul>`
            },
            {
                title: 'Особенности',
                content: `<p class="species-gallery__tab-text">Берёза обладает уникальными свойствами.</p>
                <ul class="species-gallery__tab-list">
                    <li>Белая кора отражает свет</li>
                    <li>Быстро растёт</li>
                    <li>Морозостойка</li>
                    <li>Светолюбива</li>
                    <li>Неприхотлива</li>
                    <li>Первой заселяет вырубки</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности берёзы.</p>
                <ul class="species-gallery__tab-list">
                    <li>Символ России</li>
                    <li>Береста не гниёт веками</li>
                    <li>На бересте писали в древности</li>
                    <li>Может жить до 300 лет</li>
                    <li>Воспета в песнях и стихах</li>
                    <li>Национальное дерево России</li>
                </ul>`
            }
        ]
    },
    
    // ============================================
    // ЯГОДЫ И КУСТАРНИКИ
    // ============================================
    
    'lingonberry': {
        name: 'Брусника',
        latin: 'Vaccinium vitis-idaea',
        image: 'assets/images/priroda/flora_fauna/flora/lingonberry-Photoroom.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Брусника — вечнозелёный кустарничек с ценными ягодами.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Высота:</strong> 10-25 см</li>
                    <li><strong>Тип:</strong> Вечнозелёный кустарничек</li>
                    <li><strong>Плоды:</strong> Красные ягоды</li>
                    <li><strong>Возраст:</strong> до 300 лет</li>
                    <li><strong>Статус:</strong> Обычный вид</li>
                </ul>`
            },
            {
                title: 'Ботаническое описание',
                content: `<p class="species-gallery__tab-text">Брусника — небольшой вечнозелёный кустарничек.</p>
                <ul class="species-gallery__tab-list">
                    <li>Листья кожистые, блестящие</li>
                    <li>Зимуют под снегом</li>
                    <li>Цветки розовато-белые, колокольчатые</li>
                    <li>Ягоды ярко-красные, блестящие</li>
                    <li>Корневище ползучее</li>
                    <li>Образует куртины</li>
                </ul>`
            },
            {
                title: 'Цветение и плодоношение',
                content: `<p class="species-gallery__tab-text">Брусника цветёт в начале лета.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Цветение:</strong> Май-июнь</li>
                    <li><strong>Созревание:</strong> Август-сентябрь</li>
                    <li>Опыляется насекомыми</li>
                    <li>Плодоносит ежегодно</li>
                    <li>Урожайность до 300 кг/га</li>
                    <li>Ягоды сохраняются до зимы</li>
                </ul>`
            },
            {
                title: 'Места произрастания',
                content: `<p class="species-gallery__tab-text">Брусника растёт в хвойных лесах.</p>
                <ul class="species-gallery__tab-list">
                    <li>Сосновые боры</li>
                    <li>Еловые леса</li>
                    <li>Смешанные леса</li>
                    <li>Тундра</li>
                    <li>Предпочитает кислые почвы</li>
                    <li>Образует сплошные ковры</li>
                </ul>`
            },
            {
                title: 'Ягоды',
                content: `<p class="species-gallery__tab-text">Ягоды брусники очень ценны.</p>
                <ul class="species-gallery__tab-list">
                    <li>Размер 6-8 мм</li>
                    <li>Кисло-сладкий вкус</li>
                    <li>Богаты витаминами C, A</li>
                    <li>Содержат органические кислоты</li>
                    <li>Долго хранятся</li>
                    <li>Не портятся благодаря бензойной кислоте</li>
                </ul>`
            },
            {
                title: 'Использование',
                content: `<p class="species-gallery__tab-text">Брусника широко используется.</p>
                <ul class="species-gallery__tab-list">
                    <li>Свежие ягоды</li>
                    <li>Варенье, джем</li>
                    <li>Морс, сок</li>
                    <li>Моченая брусника</li>
                    <li>Начинка для пирогов</li>
                    <li>Соус к мясу</li>
                </ul>`
            },
            {
                title: 'Лечебные свойства',
                content: `<p class="species-gallery__tab-text">Брусника — природное лекарство.</p>
                <ul class="species-gallery__tab-list">
                    <li>Ягоды — витаминное средство</li>
                    <li>Листья — мочегонное</li>
                    <li>Антисептическое действие</li>
                    <li>Снижает давление</li>
                    <li>Укрепляет иммунитет</li>
                    <li>Противовоспалительное</li>
                </ul>`
            },
            {
                title: 'Заготовка',
                content: `<p class="species-gallery__tab-text">Бруснику заготавливают впрок.</p>
                <ul class="species-gallery__tab-list">
                    <li>Собирают в августе-сентябре</li>
                    <li>Используют специальные совки</li>
                    <li>Листья собирают весной или осенью</li>
                    <li>Ягоды замораживают</li>
                    <li>Сушат</li>
                    <li>Мочат в воде</li>
                </ul>`
            },
            {
                title: 'Выращивание',
                content: `<p class="species-gallery__tab-text">Бруснику можно выращивать в саду.</p>
                <ul class="species-gallery__tab-list">
                    <li>Требует кислой почвы</li>
                    <li>Предпочитает полутень</li>
                    <li>Размножается черенками</li>
                    <li>Неприхотлива</li>
                    <li>Морозостойка</li>
                    <li>Плодоносит на 3-4 год</li>
                </ul>`
            },
            {
                title: 'Экологическая роль',
                content: `<p class="species-gallery__tab-text">Брусника важна для экосистемы.</p>
                <ul class="species-gallery__tab-list">
                    <li>Корм для птиц и зверей</li>
                    <li>Медонос</li>
                    <li>Укрепляет почву</li>
                    <li>Индикатор кислых почв</li>
                    <li>Пища для медведей, лисиц</li>
                    <li>Зимний корм для тетеревов</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности брусники.</p>
                <ul class="species-gallery__tab-list">
                    <li>Может жить до 300 лет</li>
                    <li>Одно растение — это клон</li>
                    <li>Ягоды не портятся без сахара</li>
                    <li>Листья зимуют зелёными</li>
                    <li>Символ северных лесов</li>
                    <li>«Ягода бессмертия» в Скандинавии</li>
                </ul>`
            }
        ]
    },
    
    'blueberry': {
        name: 'Черника',
        latin: 'Vaccinium myrtillus',
        image: 'assets/images/priroda/flora_fauna/flora/blueberry-Photoroom.png',
        tabs: [
            {
                title: 'Общая информация',
                content: `<p class="species-gallery__tab-text">Черника — листопадный кустарничек с целебными ягодами.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Высота:</strong> 15-40 см</li>
                    <li><strong>Тип:</strong> Листопадный кустарничек</li>
                    <li><strong>Плоды:</strong> Чёрные ягоды</li>
                    <li><strong>Возраст:</strong> до 30 лет</li>
                    <li><strong>Статус:</strong> Обычный вид</li>
                </ul>`
            },
            {
                title: 'Ботаническое описание',
                content: `<p class="species-gallery__tab-text">Черника — небольшой листопадный кустарничек.</p>
                <ul class="species-gallery__tab-list">
                    <li>Стебли зелёные, ребристые</li>
                    <li>Листья яйцевидные, мелкопильчатые</li>
                    <li>Цветки зеленовато-розовые</li>
                    <li>Ягоды чёрные с сизым налётом</li>
                    <li>Корневище ползучее</li>
                    <li>Образует заросли</li>
                </ul>`
            },
            {
                title: 'Цветение и плодоношение',
                content: `<p class="species-gallery__tab-text">Черника цветёт весной.</p>
                <ul class="species-gallery__tab-list">
                    <li><strong>Цветение:</strong> Май-июнь</li>
                    <li><strong>Созревание:</strong> Июль-август</li>
                    <li>Опыляется насекомыми</li>
                    <li>Плодоносит ежегодно</li>
                    <li>Урожайность до 200 кг/га</li>
                    <li>Ягоды быстро осыпаются</li>
                </ul>`
            },
            {
                title: 'Места произрастания',
                content: `<p class="species-gallery__tab-text">Черника растёт в тенистых лесах.</p>
                <ul class="species-gallery__tab-list">
                    <li>Еловые леса</li>
                    <li>Смешанные леса</li>
                    <li>Сосновые боры</li>
                    <li>Предпочитает тень</li>
                    <li>Кислые почвы</li>
                    <li>Образует черничники</li>
                </ul>`
            },
            {
                title: 'Ягоды',
                content: `<p class="species-gallery__tab-text">Ягоды черники очень полезны.</p>
                <ul class="species-gallery__tab-list">
                    <li>Размер 6-10 мм</li>
                    <li>Сладкий вкус</li>
                    <li>Богаты антоцианами</li>
                    <li>Витамины C, A, группы B</li>
                    <li>Органические кислоты</li>
                    <li>Красящие вещества</li>
                </ul>`
            },
            {
                title: 'Использование',
                content: `<p class="species-gallery__tab-text">Черника широко используется.</p>
                <ul class="species-gallery__tab-list">
                    <li>Свежие ягоды</li>
                    <li>Варенье, джем</li>
                    <li>Компот, сок</li>
                    <li>Начинка для пирогов</li>
                    <li>Сушёные ягоды</li>
                    <li>Замороженные ягоды</li>
                </ul>`
            },
            {
                title: 'Лечебные свойства',
                content: `<p class="species-gallery__tab-text">Черника — ценное лекарственное растение.</p>
                <ul class="species-gallery__tab-list">
                    <li>Улучшает зрение</li>
                    <li>Антиоксидант</li>
                    <li>Вяжущее действие</li>
                    <li>Снижает сахар в крови</li>
                    <li>Укрепляет сосуды</li>
                    <li>Противовоспалительное</li>
                </ul>`
            },
            {
                title: 'Заготовка',
                content: `<p class="species-gallery__tab-text">Чернику заготавливают летом.</p>
                <ul class="species-gallery__tab-list">
                    <li>Собирают в июле-августе</li>
                    <li>Используют специальные совки</li>
                    <li>Листья собирают во время цветения</li>
                    <li>Ягоды замораживают</li>
                    <li>Сушат</li>
                    <li>Быстро портятся свежими</li>
                </ul>`
            },
            {
                title: 'Выращивание',
                content: `<p class="species-gallery__tab-text">Чернику можно выращивать в саду.</p>
                <ul class="species-gallery__tab-list">
                    <li>Требует кислой почвы</li>
                    <li>Предпочитает тень</li>
                    <li>Размножается черенками</li>
                    <li>Требовательна к влаге</li>
                    <li>Морозостойка</li>
                    <li>Плодоносит на 3-4 год</li>
                </ul>`
            },
            {
                title: 'Экологическая роль',
                content: `<p class="species-gallery__tab-text">Черника важна для лесной экосистемы.</p>
                <ul class="species-gallery__tab-list">
                    <li>Корм для птиц и зверей</li>
                    <li>Медонос</li>
                    <li>Индикатор еловых лесов</li>
                    <li>Пища для медведей, лисиц</li>
                    <li>Корм для глухарей, тетеревов</li>
                    <li>Улучшает почву</li>
                </ul>`
            },
            {
                title: 'Интересные факты',
                content: `<p class="species-gallery__tab-text">Удивительные особенности черники.</p>
                <ul class="species-gallery__tab-list">
                    <li>Окрашивает рот и руки в синий цвет</li>
                    <li>Использовалась как краситель</li>
                    <li>Улучшает ночное зрение</li>
                    <li>Входила в рацион лётчиков</li>
                    <li>Символ северных лесов</li>
                    <li>«Молодильная ягода»</li>
                </ul>`
            }
        ]
    },
    
    'cranberry': {
        name: 'Клюква',
        latin: 'Oxycoccus palustris',
        image: 'assets/images/priroda/flora_fauna/flora/cranberry.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Клюква — стелющийся кустарничек болот с кислыми ягодами.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> 10-30 см</li><li><strong>Тип:</strong> Вечнозелёный кустарничек</li><li><strong>Плоды:</strong> Красные ягоды</li><li><strong>Возраст:</strong> до 100 лет</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Ботаническое описание', content: `<p class="species-gallery__tab-text">Клюква — стелющееся растение.</p><ul class="species-gallery__tab-list"><li>Стебли тонкие, нитевидные</li><li>Листья мелкие, кожистые</li><li>Цветки розовые</li><li>Ягоды шаровидные, красные</li><li>Корни поверхностные</li><li>Образует ковры на болотах</li></ul>`},
            {title: 'Цветение и плодоношение', content: `<p class="species-gallery__tab-text">Клюква цветёт летом.</p><ul class="species-gallery__tab-list"><li><strong>Цветение:</strong> Июнь-июль</li><li><strong>Созревание:</strong> Сентябрь-октябрь</li><li>Опыляется насекомыми</li><li>Плодоносит ежегодно</li><li>Урожайность до 500 кг/га</li><li>Ягоды зимуют под снегом</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Клюква растёт на болотах.</p><ul class="species-gallery__tab-list"><li>Сфагновые болота</li><li>Заболоченные леса</li><li>Тундра</li><li>Требует кислых почв</li><li>Высокая влажность</li><li>Образует клюквенники</li></ul>`},
            {title: 'Ягоды', content: `<p class="species-gallery__tab-text">Ягоды клюквы очень кислые и полезные.</p><ul class="species-gallery__tab-list"><li>Размер 10-18 мм</li><li>Очень кислый вкус</li><li>Богаты витамином C</li><li>Органические кислоты</li><li>Долго хранятся</li><li>Не портятся в воде</li></ul>`},
            {title: 'Использование', content: `<p class="species-gallery__tab-text">Клюква широко используется.</p><ul class="species-gallery__tab-list"><li>Морс, сок</li><li>Варенье, джем</li><li>Соус к мясу</li><li>Квашение капусты</li><li>Кисель</li><li>Замороженные ягоды</li></ul>`},
            {title: 'Лечебные свойства', content: `<p class="species-gallery__tab-text">Клюква — природный антибиотик.</p><ul class="species-gallery__tab-list"><li>Жаропонижающее</li><li>Противовоспалительное</li><li>Мочегонное</li><li>Антибактериальное</li><li>Укрепляет иммунитет</li><li>Снижает давление</li></ul>`},
            {title: 'Заготовка', content: `<p class="species-gallery__tab-text">Клюкву собирают осенью и весной.</p><ul class="species-gallery__tab-list"><li>Осенний сбор: сентябрь-октябрь</li><li>Весенний сбор: после таяния снега</li><li>Используют специальные совки</li><li>Замораживают</li><li>Мочат в воде</li><li>Хранят в прохладном месте</li></ul>`},
            {title: 'Выращивание', content: `<p class="species-gallery__tab-text">Клюкву можно выращивать.</p><ul class="species-gallery__tab-list"><li>Требует кислой почвы</li><li>Высокая влажность</li><li>Размножается черенками</li><li>Предпочитает солнце</li><li>Морозостойка</li><li>Плодоносит на 3-4 год</li></ul>`},
            {title: 'Экологическая роль', content: `<p class="species-gallery__tab-text">Клюква важна для болотных экосистем.</p><ul class="species-gallery__tab-list"><li>Корм для птиц</li><li>Медонос</li><li>Индикатор болот</li><li>Пища для медведей</li><li>Зимний корм для птиц</li><li>Укрепляет торф</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности клюквы.</p><ul class="species-gallery__tab-list"><li>Может жить до 100 лет</li><li>Ягоды зимуют под снегом</li><li>Весенняя клюква слаще</li><li>Не портится без холодильника</li><li>Символ русского Севера</li><li>«Северный лимон»</li></ul>`}
        ]
    },
    
    'raspberry': {
        name: 'Малина',
        latin: 'Rubus idaeus',
        image: 'assets/images/priroda/flora_fauna/flora/raspberry.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Малина — полукустарник с ароматными сладкими ягодами.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> 1-2 м</li><li><strong>Тип:</strong> Полукустарник</li><li><strong>Плоды:</strong> Красные ягоды</li><li><strong>Возраст побегов:</strong> 2 года</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Ботаническое описание', content: `<p class="species-gallery__tab-text">Малина — колючий полукустарник.</p><ul class="species-gallery__tab-list"><li>Стебли с шипами</li><li>Листья сложные, непарноперистые</li><li>Цветки белые</li><li>Плод — сборная костянка</li><li>Корневище многолетнее</li><li>Побеги двулетние</li></ul>`},
            {title: 'Цветение и плодоношение', content: `<p class="species-gallery__tab-text">Малина цветёт летом.</p><ul class="species-gallery__tab-list"><li><strong>Цветение:</strong> Июнь-июль</li><li><strong>Созревание:</strong> Июль-август</li><li>Опыляется насекомыми</li><li>Плодоносит на второй год</li><li>Урожайность высокая</li><li>Ягоды быстро осыпаются</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Малина растёт на вырубках и опушках.</p><ul class="species-gallery__tab-list"><li>Вырубки</li><li>Гари</li><li>Опушки лесов</li><li>Берега рек</li><li>Предпочитает плодородные почвы</li><li>Образует малинники</li></ul>`},
            {title: 'Ягоды', content: `<p class="species-gallery__tab-text">Ягоды малины ароматные и сладкие.</p><ul class="species-gallery__tab-list"><li>Размер 1-2 см</li><li>Сладкий вкус</li><li>Сильный аромат</li><li>Богаты витаминами</li><li>Органические кислоты</li><li>Быстро портятся</li></ul>`},
            {title: 'Использование', content: `<p class="species-gallery__tab-text">Малина широко используется.</p><ul class="species-gallery__tab-list"><li>Свежие ягоды</li><li>Варенье, джем</li><li>Компот, сок</li><li>Начинка для пирогов</li><li>Сушёные ягоды</li><li>Замороженные ягоды</li></ul>`},
            {title: 'Лечебные свойства', content: `<p class="species-gallery__tab-text">Малина — природное жаропонижающее.</p><ul class="species-gallery__tab-list"><li>Жаропонижающее</li><li>Потогонное</li><li>Противовоспалительное</li><li>Укрепляет иммунитет</li><li>Листья — вяжущее</li><li>Антиоксидант</li></ul>`},
            {title: 'Заготовка', content: `<p class="species-gallery__tab-text">Малину собирают летом.</p><ul class="species-gallery__tab-list"><li>Собирают в июле-августе</li><li>Утром после росы</li><li>Листья собирают во время цветения</li><li>Ягоды замораживают</li><li>Сушат</li><li>Варят варенье</li></ul>`},
            {title: 'Выращивание', content: `<p class="species-gallery__tab-text">Малину легко выращивать.</p><ul class="species-gallery__tab-list"><li>Неприхотлива</li><li>Размножается корневыми отпрысками</li><li>Предпочитает солнце</li><li>Требует полива</li><li>Морозостойка</li><li>Плодоносит на 2 год</li></ul>`},
            {title: 'Экологическая роль', content: `<p class="species-gallery__tab-text">Малина важна для экосистемы.</p><ul class="species-gallery__tab-list"><li>Корм для птиц и зверей</li><li>Отличный медонос</li><li>Пионер на вырубках</li><li>Пища для медведей</li><li>Укрытие для птиц</li><li>Улучшает почву</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности малины.</p><ul class="species-gallery__tab-list"><li>Одна из древнейших ягод</li><li>Упоминается в древних летописях</li><li>Символ гостеприимства</li><li>Малиновый звон колоколов</li><li>Любимая ягода медведей</li><li>«Медвежья ягода»</li></ul>`}
        ]
    },
    
    // Продолжение птиц
    'grouse': {
        name: 'Тетерев',
        latin: 'Lyrurus tetrix',
        image: 'assets/images/priroda/flora_fauna/fauna/grouse.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Тетерев — крупная лесная птица семейства тетеревиных с характерными лировидными перьями хвоста у самцов.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 1-1,5 кг</li><li><strong>Длина тела:</strong> 40-58 см</li><li><strong>Размах крыльев:</strong> 65-80 см</li><li><strong>Популяция:</strong> Обычный вид</li><li><strong>Продолжительность жизни:</strong> 10-13 лет</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Тетерев имеет яркий половой диморфизм.</p><ul class="species-gallery__tab-list"><li><strong>Самец:</strong> Чёрное оперение с синим отливом</li><li>Красные брови</li><li>Лировидный хвост</li><li>Белое подхвостье</li><li><strong>Самка:</strong> Рыжевато-бурая с пестринами</li><li>Токующий самец распускает хвост</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Рацион тетерева меняется по сезонам.</p><ul class="species-gallery__tab-list"><li><strong>Лето:</strong> Ягоды, семена, насекомые</li><li><strong>Осень:</strong> Ягоды, серёжки берёзы</li><li><strong>Зима:</strong> Серёжки, почки берёзы</li><li><strong>Весна:</strong> Почки, побеги</li><li>Птенцы питаются насекомыми</li><li>Нуждается в гастролитах</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Тетерев — обитатель лесных опушек и болот.</p><ul class="species-gallery__tab-list"><li>Опушки лесов</li><li>Березняки</li><li>Моховые болота</li><li>Вырубки</li><li>Избегает густых лесов</li><li>Оседлая птица</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Тетерев известен своими токами.</p><ul class="species-gallery__tab-list"><li><strong>Токование:</strong> Апрель-май</li><li><strong>Кладка:</strong> 6-10 яиц</li><li><strong>Насиживание:</strong> 24-26 дней</li><li>Насиживает только самка</li><li>Птенцы выводкового типа</li><li>Семья держится до осени</li></ul>`},
            {title: 'Токование', content: `<p class="species-gallery__tab-text">Токование тетеревов — удивительное зрелище.</p><ul class="species-gallery__tab-list"><li>Токуют на открытых местах</li><li>Начинается до рассвета</li><li>Самцы бормочут и чуфыкают</li><li>Распускают хвост</li><li>Турниры между самцами</li><li>Ток слышен за километр</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Тетерев — осторожная птица.</p><ul class="species-gallery__tab-list"><li>Держится на опушках</li><li>При опасности затаивается</li><li>Взлетает с шумом</li><li>Ночует на деревьях</li><li>Зимой ночует в снегу</li><li>Издаёт характерное бормотание</li></ul>`},
            {title: 'Зимовка', content: `<p class="species-gallery__tab-text">Зимой тетерев приспосабливается к холодам.</p><ul class="species-gallery__tab-list"><li>Ночует в снежных камерах</li><li>Зарывается в снег</li><li>Питается серёжками берёзы</li><li>Малоподвижен</li><li>Держится стаями</li><li>Не совершает миграций</li></ul>`},
            {title: 'Голос', content: `<p class="species-gallery__tab-text">Тетерев издаёт характерные звуки.</p><ul class="species-gallery__tab-list"><li>Бормотание на току</li><li>Чуфыканье</li><li>Ток слышен за 2-3 км</li><li>Самка квохчет</li><li>При опасности тихое цоканье</li><li>Птенцы пищат</li></ul>`},
            {title: 'Враги', content: `<p class="species-gallery__tab-text">У тетерева много естественных врагов.</p><ul class="species-gallery__tab-list"><li><strong>Хищники:</strong> Ястреб-тетеревятник, лиса</li><li>Куница</li><li>Соболь</li><li>Филин</li><li>Разоряют гнёзда: вороны</li><li>Суровые зимы</li></ul>`},
            {title: 'Охотничье значение', content: `<p class="species-gallery__tab-text">Тетерев — ценная дичь.</p><ul class="species-gallery__tab-list"><li>Вкусное мясо</li><li>Традиционный объект охоты</li><li>Охота на току</li><li>Охота с лайкой</li><li>Численность стабильна</li><li>Популярен у охотников</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности тетерева.</p><ul class="species-gallery__tab-list"><li>Токование — уникальное явление</li><li>Самцы не участвуют в воспитании</li><li>Лировидный хвост — украшение</li><li>Может пробежать под снегом 10 м</li><li>Символ русской природы</li><li>Герой народных песен</li></ul>`}
        ]
    },
    
    // Продолжение - добавляем остальные виды
    'cloudberry': {
        name: 'Морошка',
        latin: 'Rubus chamaemorus',
        image: 'assets/images/priroda/flora_fauna/flora/cloudberry.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Морошка — северная ягода, «царская ягода».</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> 10-30 см</li><li><strong>Тип:</strong> Травянистый многолетник</li><li><strong>Плоды:</strong> Янтарные ягоды</li><li><strong>Возраст:</strong> Многолетник</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Ботаническое описание', content: `<p class="species-gallery__tab-text">Морошка — приземистое растение.</p><ul class="species-gallery__tab-list"><li>Стебель прямостоячий</li><li>Листья округлые, морщинистые</li><li>Цветки белые, одиночные</li><li>Ягоды сначала красные, потом янтарные</li><li>Корневище ползучее</li><li>Двудомное растение</li></ul>`},
            {title: 'Цветение и плодоношение', content: `<p class="species-gallery__tab-text">Морошка цветёт летом.</p><ul class="species-gallery__tab-list"><li><strong>Цветение:</strong> Июнь-июль</li><li><strong>Созревание:</strong> Июль-август</li><li>Опыляется насекомыми</li><li>Плодоносит не каждый год</li><li>Урожайность низкая</li><li>Ягоды быстро перезревают</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Морошка растёт на болотах Севера.</p><ul class="species-gallery__tab-list"><li>Сфагновые болота</li><li>Тундра</li><li>Лесотундра</li><li>Требует кислых почв</li><li>Высокая влажность</li><li>Образует заросли</li></ul>`},
            {title: 'Ягоды', content: `<p class="species-gallery__tab-text">Ягоды морошки очень ценны.</p><ul class="species-gallery__tab-list"><li>Размер 1,5-2 см</li><li>Кисло-сладкий вкус</li><li>Янтарный цвет</li><li>Богаты витамином C</li><li>Органические кислоты</li><li>Быстро портятся</li></ul>`},
            {title: 'Использование', content: `<p class="species-gallery__tab-text">Морошка широко используется.</p><ul class="species-gallery__tab-list"><li>Свежие ягоды</li><li>Варенье, джем</li><li>Морс</li><li>Моченая морошка</li><li>Начинка для пирогов</li><li>Замороженные ягоды</li></ul>`},
            {title: 'Лечебные свойства', content: `<p class="species-gallery__tab-text">Морошка — ценное лекарственное растение.</p><ul class="species-gallery__tab-list"><li>Богата витамином C</li><li>Противоцинготное</li><li>Общеукрепляющее</li><li>Жаропонижающее</li><li>Мочегонное</li><li>Ранозаживляющее</li></ul>`},
            {title: 'Заготовка', content: `<p class="species-gallery__tab-text">Морошку собирают летом.</p><ul class="species-gallery__tab-list"><li>Собирают в июле-августе</li><li>Ягоды нежные</li><li>Быстро мнутся</li><li>Замораживают</li><li>Мочат в воде</li><li>Варят варенье</li></ul>`},
            {title: 'Экологическая роль', content: `<p class="species-gallery__tab-text">Морошка важна для северных экосистем.</p><ul class="species-gallery__tab-list"><li>Корм для птиц</li><li>Медонос</li><li>Индикатор болот</li><li>Пища для медведей</li><li>Важна для северных народов</li><li>Укрепляет торф</li></ul>`},
            {title: 'Особенности', content: `<p class="species-gallery__tab-text">Морошка обладает уникальными свойствами.</p><ul class="species-gallery__tab-list"><li>Двудомное растение</li><li>Плодоносит не каждый год</li><li>Ягоды меняют цвет</li><li>Трудно культивируется</li><li>Растёт только на Севере</li><li>Очень нежная</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности морошки.</p><ul class="species-gallery__tab-list"><li>«Царская ягода»</li><li>Любимая ягода Петра I</li><li>Символ Севера</li><li>Дороже золота</li><li>Изображена на монете Финляндии</li><li>«Болотный янтарь»</li></ul>`}
        ]
    },
    
    // ============================================
    // ДОПОЛНИТЕЛЬНЫЕ ПТИЦЫ
    // ============================================
    
    'owl': {
        name: 'Полярная сова',
        latin: 'Bubo scandiacus',
        image: 'assets/images/priroda/flora_fauna/fauna/owl.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Полярная сова — крупная белая сова, обитатель Арктики.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 1,5-3 кг</li><li><strong>Размах крыльев:</strong> 140-165 см</li><li><strong>Длина тела:</strong> 55-70 см</li><li><strong>Популяция в крае:</strong> ~500 пар</li><li><strong>Продолжительность жизни:</strong> 10-15 лет</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Полярная сова — белоснежная птица.</p><ul class="species-gallery__tab-list"><li>Белое оперение с тёмными пестринами</li><li>Самцы белее самок</li><li>Жёлтые глаза</li><li>Оперённые лапы</li><li>Круглая голова без ушек</li><li>Маскировка на снегу</li></ul>`},
            {title: 'Охота', content: `<p class="species-gallery__tab-text">Полярная сова — дневной охотник.</p><ul class="species-gallery__tab-list"><li>Охотится днём (полярный день)</li><li>Высматривает добычу с возвышений</li><li>Бесшумный полёт</li><li>Может парить</li><li>Убивает ударом когтей</li><li>Охотится круглый год</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Полярная сова — хищник тундры.</p><ul class="species-gallery__tab-list"><li><strong>Основа:</strong> Лемминги</li><li>Полёвки</li><li>Зайцы</li><li>Птицы (куропатки, утки)</li><li>Рыба</li><li>Съедает до 400 г в день</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Полярная сова — житель Арктики.</p><ul class="species-gallery__tab-list"><li>Тундра</li><li>Лесотундра</li><li>Арктические острова</li><li>Открытые пространства</li><li>Гнездится на земле</li><li>Территория пары: 10-50 км²</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Размножение зависит от численности леммингов.</p><ul class="species-gallery__tab-list"><li><strong>Гнездование:</strong> Май-июнь</li><li><strong>Кладка:</strong> 3-11 яиц</li><li><strong>Насиживание:</strong> 32-34 дня</li><li><strong>Вылет птенцов:</strong> Через 50-60 дней</li><li>При неурожае леммингов не гнездится</li><li>Агрессивно защищает гнездо</li></ul>`},
            {title: 'Голос', content: `<p class="species-gallery__tab-text">Полярная сова издаёт громкие крики.</p><ul class="species-gallery__tab-list"><li>Громкое «кра-кра-кра»</li><li>Лающие звуки</li><li>Слышно за километр</li><li>У гнезда громче</li><li>Тревожный крик</li><li>Птенцы шипят</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Полярная сова — активная днём птица.</p><ul class="species-gallery__tab-list"><li>Активна круглосуточно</li><li>Отличное зрение и слух</li><li>Может поворачивать голову на 270°</li><li>Территориальная</li><li>Кочует в поисках пищи</li><li>Может нападать на человека у гнезда</li></ul>`},
            {title: 'Миграции', content: `<p class="species-gallery__tab-text">Полярная сова совершает нерегулярные кочёвки.</p><ul class="species-gallery__tab-list"><li>Зимой откочёвывает на юг</li><li>Массовые налёты раз в 3-5 лет</li><li>Зависит от численности леммингов</li><li>Может залетать в города</li><li>Весной возвращается в тундру</li><li>Непредсказуемые перемещения</li></ul>`},
            {title: 'Охранный статус', content: `<p class="species-gallery__tab-text">Полярная сова нуждается в охране.</p><ul class="species-gallery__tab-list"><li><strong>Статус:</strong> Редкий вид</li><li>Занесена в Красную книгу</li><li>Численность колеблется</li><li>Зависит от леммингов</li><li>Охраняется законом</li><li>Символ Арктики</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности полярной совы.</p><ul class="species-gallery__tab-list"><li>Одна из крупнейших сов</li><li>Может съесть до 1600 леммингов в год</li><li>Живёт до 28 лет</li><li>Герой сказок и легенд</li><li>Символ Квебека</li><li>Сова Букля из Гарри Поттера</li></ul>`}
        ]
    },
    
    'crane': {
        name: 'Стерх',
        latin: 'Grus leucogeranus',
        image: 'assets/images/priroda/flora_fauna/fauna/crane.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Стерх (Белый журавль) — редчайшая птица, эндемик России, занесённая в Красную книгу.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 5-8,6 кг</li><li><strong>Размах крыльев:</strong> 210-230 см</li><li><strong>Высота:</strong> 135-140 см</li><li><strong>Популяция в крае:</strong> ~20 пар</li><li><strong>Продолжительность жизни:</strong> до 70 лет</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Стерх — белоснежная птица с контрастными чёрными концами крыльев.</p><ul class="species-gallery__tab-list"><li>Белоснежное оперение</li><li>Чёрные концы крыльев (видны в полёте)</li><li>Красная «маска» на лице</li><li>Красные ноги</li><li>Длинный красный клюв</li><li>Самый крупный из журавлей</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Стерх гнездится только в двух местах России.</p><ul class="species-gallery__tab-list"><li>Якутская популяция (основная)</li><li>Западносибирская популяция (почти исчезла)</li><li>Тундровые болота</li><li>Требует обширных открытых пространств</li><li>Избегает близости человека</li><li>Территория пары: 5-20 км²</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Стерх — всеядная птица с преобладанием растительной пищи.</p><ul class="species-gallery__tab-list"><li><strong>Растительная пища:</strong> Корневища, клубни</li><li><strong>Животная пища:</strong> Рыба, грызуны, насекомые</li><li>Весной: корневища осоки</li><li>Летом: ягоды, насекомые</li><li>На зимовке: водные растения</li><li>Кормятся на мелководье</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Стерхи создают пары на всю жизнь.</p><ul class="species-gallery__tab-list"><li><strong>Прилёт:</strong> Май-июнь</li><li><strong>Кладка:</strong> 2 яйца</li><li><strong>Насиживание:</strong> 27-29 дней</li><li><strong>Вылет птенцов:</strong> Через 70-75 дней</li><li>Насиживают оба родителя</li><li>Обычно выживает 1 птенец</li></ul>`},
            {title: 'Танцы стерхов', content: `<p class="species-gallery__tab-text">Брачные танцы стерхов — редкое зрелище.</p><ul class="species-gallery__tab-list"><li>Танцуют весной на току</li><li>Подпрыгивают с распростёртыми крыльями</li><li>Кланяются друг другу</li><li>Издают трубные крики</li><li>Танцуют парами</li><li>Укрепляют парные связи</li></ul>`},
            {title: 'Голос', content: `<p class="species-gallery__tab-text">Голос стерха — чистый и мелодичный.</p><ul class="species-gallery__tab-list"><li>Чистое флейтовое курлыканье</li><li>Слышно за 3-4 км</li><li>Дуэты пар</li><li>Перекличка в стае</li><li>Тревожный крик резкий</li><li>Птенцы пищат</li></ul>`},
            {title: 'Миграции', content: `<p class="species-gallery__tab-text">Стерхи совершают одни из самых дальних перелётов.</p><ul class="species-gallery__tab-list"><li>Улетают в сентябре</li><li>Летят через Казахстан, Узбекистан</li><li>Высота полёта до 1500 м</li><li>Зимуют в Индии, Иране, Китае</li><li>Пролетают до 6000 км</li><li>Возвращаются в мае-июне</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Стерхи — крайне осторожные птицы.</p><ul class="species-gallery__tab-list"><li>Очень пугливы</li><li>Отличное зрение</li><li>Держатся парами или семьями</li><li>Ночуют на воде</li><li>Моногамны</li><li>Агрессивны к сородичам</li></ul>`},
            {title: 'Охранный статус', content: `<p class="species-gallery__tab-text">Стерх — вид на грани исчезновения.</p><ul class="species-gallery__tab-list"><li><strong>Статус:</strong> Критически угрожаемый вид</li><li>Занесён в Красную книгу России</li><li>Международная Красная книга</li><li>Западная популяция почти исчезла</li><li>Охраняется законом</li><li>Программы разведения в питомниках</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности стерха.</p><ul class="species-gallery__tab-list"><li>Эндемик России</li><li>Может жить до 70-80 лет</li><li>Символ Якутии</li><li>Программа «Полёт надежды» с дельтапланами</li><li>Путин летал с стерхами на дельтаплане</li><li>Один из редчайших журавлей мира</li></ul>`}
        ]
    },
    
    // ПРИМЕЧАНИЕ: Из-за большого объёма данных (48 видов × 11 табов = 528 табов),
    // полное наполнение всех карточек будет выполнено в следующих промптах.
    // Структура готова, добавлены 27 видов с полной детализацией.
    // Для завершения работы требуется продолжение в следующем сообщении.
    
    // Список недостающих видов для добавления:
    // ПТИЦЫ: falcon, gyrfalcon, golden-eagle, goose, waxwing, nutcracker, crossbill
    // РЫБЫ: grayling, lenok, omul, muksun, nelma, peled, whitefish, burbot, chir
    // ДЕРЕВЬЯ: spruce, fir, aspen, poplar, rowan, alder, willow
    // КУСТАРНИКИ: currant, rose-hip, bird-cherry, juniper, dwarf-pine, ledum, rhododendron
    // ТРАВЫ: fireweed, chamomile, bellflower, lily, orchid, globeflower, trollius, pasqueflower, rhodiola
    // ПРОЧИЕ: fern, moss, lichen, bilberry
    
    // Временные заглушки с базовой информацией для остальных видов
    // (будут заменены на полные данные в следующем промпте)
    
    'falcon': {
        name: 'Сапсан',
        latin: 'Falco peregrinus',
        image: 'assets/images/priroda/flora_fauna/fauna/falcon.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Сапсан — самая быстрая птица в мире, скоростной охотник.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 0,6-1,3 кг</li><li><strong>Размах крыльев:</strong> 80-120 см</li><li><strong>Длина тела:</strong> 34-50 см</li><li><strong>Популяция в крае:</strong> ~300 пар</li><li><strong>Продолжительность жизни:</strong> 15-20 лет</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Сапсан — компактный сокол с мощной грудью.</p><ul class="species-gallery__tab-list"><li>Тёмно-серая спина</li><li>Светлая грудь с пестринами</li><li>Чёрные «усы» на щеках</li><li>Жёлтые лапы и восковица</li><li>Острые крылья</li><li>Самки крупнее самцов</li></ul>`},
            {title: 'Охота', content: `<p class="species-gallery__tab-text">Сапсан — непревзойдённый воздушный охотник.</p><ul class="species-gallery__tab-list"><li>Охотится в воздухе</li><li>Пикирует на добычу сверху</li><li>Скорость пикирования до 390 км/ч</li><li>Убивает ударом когтей</li><li>Ловит добычу в воздухе</li><li>Охотится утром и вечером</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Сапсан питается исключительно птицами.</p><ul class="species-gallery__tab-list"><li>Утки, голуби, чайки</li><li>Кулики, дрозды</li><li>Мелкие воробьиные</li><li>Редко — грызуны</li><li>Съедает 70-100 г в день</li><li>Может голодать несколько дней</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Сапсан гнездится на скалах и обрывах.</p><ul class="species-gallery__tab-list"><li>Скалистые берега рек</li><li>Горы</li><li>Обрывы</li><li>Высокие здания в городах</li><li>Требует открытых пространств для охоты</li><li>Территория пары: 10-50 км²</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Сапсаны создают пары на несколько лет.</p><ul class="species-gallery__tab-list"><li><strong>Гнездование:</strong> Апрель-май</li><li><strong>Кладка:</strong> 3-4 яйца</li><li><strong>Насиживание:</strong> 28-32 дня</li><li><strong>Вылет птенцов:</strong> Через 35-42 дня</li><li>Насиживает в основном самка</li><li>Птенцы остаются с родителями до осени</li></ul>`},
            {title: 'Полёт', content: `<p class="species-gallery__tab-text">Сапсан — мастер скоростного полёта.</p><ul class="species-gallery__tab-list"><li>Самая быстрая птица в мире</li><li>Скорость пикирования до 390 км/ч</li><li>Горизонтальный полёт до 110 км/ч</li><li>Маневренный</li><li>Может зависать в воздухе</li><li>Виртуозные воздушные трюки</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Сапсан — территориальная птица.</p><ul class="species-gallery__tab-list"><li>Агрессивно защищает территорию</li><li>Атакует даже крупных хищников</li><li>Отличное зрение</li><li>Видит добычу за 1,5 км</li><li>Молчаливы вне сезона размножения</li><li>Некоторые популяции перелётные</li></ul>`},
            {title: 'Голос', content: `<p class="species-gallery__tab-text">Сапсан издаёт резкие крики.</p><ul class="species-gallery__tab-list"><li>Резкое «кьяк-кьяк-кьяк»</li><li>У гнезда громче</li><li>Тревожный крик</li><li>Птенцы пищат</li><li>Молчаливы на охоте</li><li>Крик слышен за 500 м</li></ul>`},
            {title: 'Охранный статус', content: `<p class="species-gallery__tab-text">Сапсан находится под охраной.</p><ul class="species-gallery__tab-list"><li><strong>Статус:</strong> Редкий вид</li><li>Занесён в Красную книгу</li><li>Численность восстанавливается</li><li>Страдал от пестицидов</li><li>Охраняется законом</li><li>Успешно размножается в неволе</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности сапсана.</p><ul class="species-gallery__tab-list"><li>Самое быстрое животное на Земле</li><li>Используется в соколиной охоте</li><li>Может убить добычу крупнее себя</li><li>Гнездится на небоскрёбах</li><li>Символ скорости и точности</li><li>Изображён на гербах и монетах</li></ul>`}
        ]
    },
    'gyrfalcon': {
        name: 'Кречет',
        latin: 'Falco rusticolus',
        image: 'assets/images/priroda/flora_fauna/fauna/gyrfalcon.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Кречет — крупнейший сокол, северный охотник.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 1-2 кг</li><li><strong>Размах крыльев:</strong> 120-160 см</li><li><strong>Длина тела:</strong> 50-65 см</li><li><strong>Популяция в крае:</strong> ~200 пар</li><li><strong>Продолжительность жизни:</strong> 15-20 лет</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Кречет — мощный сокол с вариабельной окраской.</p><ul class="species-gallery__tab-list"><li>Окраска от белой до тёмно-серой</li><li>Белая морфа — самая ценная</li><li>Мощное телосложение</li><li>Широкие крылья</li><li>Жёлтые лапы и восковица</li><li>Самки крупнее самцов</li></ul>`},
            {title: 'Охота', content: `<p class="species-gallery__tab-text">Кречет — мощный охотник.</p><ul class="species-gallery__tab-list"><li>Охотится на птиц и млекопитающих</li><li>Атакует с воздуха и с присады</li><li>Скорость до 200 км/ч</li><li>Может преследовать добычу</li><li>Охотится днём</li><li>Сила удара огромна</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Кречет — хищник с разнообразным рационом.</p><ul class="species-gallery__tab-list"><li>Белые куропатки (основа)</li><li>Утки, чайки</li><li>Лемминги, полёвки</li><li>Зайцы</li><li>Съедает 150-200 г в день</li><li>Делает запасы пищи</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Кречет — житель Арктики и субарктики.</p><ul class="species-gallery__tab-list"><li>Тундра</li><li>Лесотундра</li><li>Скалистые побережья</li><li>Горы</li><li>Гнездится на скалах</li><li>Территория пары: 50-100 км²</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Кречеты создают пары на всю жизнь.</p><ul class="species-gallery__tab-list"><li><strong>Гнездование:</strong> Апрель-май</li><li><strong>Кладка:</strong> 3-5 яиц</li><li><strong>Насиживание:</strong> 28-32 дня</li><li><strong>Вылет птенцов:</strong> Через 46-53 дня</li><li>Используют старые гнёзда воронов</li><li>Агрессивно защищают гнездо</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Кречет — оседлая птица.</p><ul class="species-gallery__tab-list"><li>Не мигрирует</li><li>Зимует в местах гнездования</li><li>Территориальный</li><li>Отличное зрение</li><li>Может охотиться в сумерках</li><li>Выносливый</li></ul>`},
            {title: 'Адаптации к холоду', content: `<p class="species-gallery__tab-text">Кречет идеально приспособлен к Арктике.</p><ul class="species-gallery__tab-list"><li>Густое оперение</li><li>Оперённые лапы</li><li>Выдерживает морозы до -50°C</li><li>Белая окраска маскирует на снегу</li><li>Замедленный метаболизм зимой</li><li>Делает запасы пищи</li></ul>`},
            {title: 'Историческое значение', content: `<p class="species-gallery__tab-text">Кречет — легендарная ловчая птица.</p><ul class="species-gallery__tab-list"><li>Самая ценная ловчая птица</li><li>Дар королям и султанам</li><li>Белый кречет — особо ценен</li><li>Использовался в соколиной охоте</li><li>Символ власти</li><li>Торговля кречетами приносила огромные доходы</li></ul>`},
            {title: 'Охранный статус', content: `<p class="species-gallery__tab-text">Кречет нуждается в охране.</p><ul class="species-gallery__tab-list"><li><strong>Статус:</strong> Редкий вид</li><li>Занесён в Красную книгу</li><li>Численность низкая</li><li>Страдает от браконьерства</li><li>Охраняется законом</li><li>Торговля запрещена</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности кречета.</p><ul class="species-gallery__tab-list"><li>Крупнейший сокол в мире</li><li>Белый кречет стоил целое состояние</li><li>Может убить гуся</li><li>Национальная птица Исландии</li><li>Изображён на гербе Исландии</li><li>Символ Севера и силы</li></ul>`}
        ]
    },
    'golden-eagle': {
        name: 'Беркут',
        latin: 'Aquila chrysaetos',
        image: 'assets/images/priroda/flora_fauna/fauna/golden-eagle.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Беркут — крупнейший орёл, могучий хищник неба.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 3-7 кг</li><li><strong>Размах крыльев:</strong> 180-240 см</li><li><strong>Длина тела:</strong> 76-93 см</li><li><strong>Популяция в крае:</strong> ~500 пар</li><li><strong>Продолжительность жизни:</strong> 25-30 лет</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Беркут — величественная птица.</p><ul class="species-gallery__tab-list"><li>Тёмно-бурое оперение</li><li>Золотистые перья на голове и шее</li><li>Мощный крючковатый клюв</li><li>Сильные лапы с острыми когтями</li><li>Жёлтые глаза</li><li>Самки крупнее самцов</li></ul>`},
            {title: 'Охота', content: `<p class="species-gallery__tab-text">Беркут — непревзойдённый охотник.</p><ul class="species-gallery__tab-list"><li>Высматривает добычу с высоты</li><li>Пикирует со скоростью до 320 км/ч</li><li>Сила удара когтями огромна</li><li>Охотится на зайцев, сурков, лисиц</li><li>Может убить молодого оленя</li><li>Охотится в паре</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Беркут — хищник с разнообразным рационом.</p><ul class="species-gallery__tab-list"><li>Зайцы, суслики, сурки</li><li>Птицы (тетерева, утки)</li><li>Молодые копытные</li><li>Лисы</li><li>Падаль зимой</li><li>Съедает до 1 кг в день</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Беркут предпочитает открытые пространства с лесами.</p><ul class="species-gallery__tab-list"><li>Горная тайга</li><li>Лесотундра</li><li>Скалистые районы</li><li>Избегает густых лесов</li><li>Гнездится на деревьях или скалах</li><li>Территория пары: 50-150 км²</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Беркуты создают пары на всю жизнь.</p><ul class="species-gallery__tab-list"><li><strong>Гнездование:</strong> Март-апрель</li><li><strong>Кладка:</strong> 1-3 яйца</li><li><strong>Насиживание:</strong> 40-45 дней</li><li><strong>Вылет птенцов:</strong> Через 70-80 дней</li><li>Обычно выживает 1 птенец</li><li>Молодые остаются с родителями до осени</li></ul>`},
            {title: 'Гнездо', content: `<p class="species-gallery__tab-text">Беркуты строят огромные гнёзда.</p><ul class="species-gallery__tab-list"><li>Диаметр до 2 м</li><li>Высота до 1,5 м</li><li>Вес до 400 кг</li><li>Используется много лет</li><li>Имеют несколько гнёзд</li><li>Строят из веток</li></ul>`},
            {title: 'Полёт', content: `<p class="species-gallery__tab-text">Беркут — мастер полёта.</p><ul class="species-gallery__tab-list"><li>Парит часами без взмахов</li><li>Использует восходящие потоки</li><li>Скорость пикирования до 320 км/ч</li><li>Крейсерская скорость 50-80 км/ч</li><li>Может подниматься на 3000 м</li><li>Виртуозные воздушные игры</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Беркут — территориальная птица.</p><ul class="species-gallery__tab-list"><li>Строго охраняет территорию</li><li>Пара держится вместе круглый год</li><li>Отличное зрение (в 8 раз острее человека)</li><li>Видит зайца с 3 км</li><li>Молчаливы</li><li>Оседлы или кочуют</li></ul>`},
            {title: 'Охранный статус', content: `<p class="species-gallery__tab-text">Беркут нуждается в охране.</p><ul class="species-gallery__tab-list"><li><strong>Статус:</strong> Редкий вид</li><li>Занесён в Красную книгу</li><li>Численность сокращается</li><li>Страдает от беспокойства</li><li>Охраняется законом</li><li>Символ силы и свободы</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности беркута.</p><ul class="species-gallery__tab-list"><li>Используется в соколиной охоте</li><li>Может поднять добычу весом 5 кг</li><li>Сила сжатия когтей 200 кг/см²</li><li>Изображён на гербах многих стран</li><li>Национальная птица Мексики</li><li>Символ храбрости и власти</li></ul>`}
        ]
    },
    'goose': {
        name: 'Гусь-гуменник',
        latin: 'Anser fabalis',
        image: 'assets/images/priroda/flora_fauna/fauna/goose.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Гусь-гуменник — крупная водоплавающая птица, один из самых распространённых гусей.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 2,5-4,5 кг</li><li><strong>Размах крыльев:</strong> 147-175 см</li><li><strong>Длина тела:</strong> 66-84 см</li><li><strong>Популяция:</strong> Обычный вид</li><li><strong>Продолжительность жизни:</strong> 15-20 лет</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Гуменник — серо-бурый гусь с характерным клювом.</p><ul class="species-gallery__tab-list"><li>Серо-бурое оперение</li><li>Тёмная голова и шея</li><li>Оранжевая полоса на чёрном клюве</li><li>Оранжевые лапы</li><li>Белое подхвостье</li><li>Молодые птицы бурее</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Гуси — растительноядные птицы.</p><ul class="species-gallery__tab-list"><li>Травы, злаки</li><li>Водные растения</li><li>Зерно на полях</li><li>Корни растений</li><li>Кормятся на суше и воде</li><li>Едят днём</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Гуси гнездятся в тундре и лесотундре.</p><ul class="species-gallery__tab-list"><li>Тундра</li><li>Лесотундра</li><li>Берега озёр и рек</li><li>Болота</li><li>На пролёте — поля, луга</li><li>Колониальное гнездование</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Гуси создают пары на всю жизнь.</p><ul class="species-gallery__tab-list"><li><strong>Прилёт:</strong> Май</li><li><strong>Кладка:</strong> 4-6 яиц</li><li><strong>Насиживание:</strong> 25-28 дней</li><li><strong>Вылет птенцов:</strong> Через 40-45 дней</li><li>Насиживает только самка</li><li>Самец охраняет гнездо</li></ul>`},
            {title: 'Миграции', content: `<p class="species-gallery__tab-text">Гуси совершают дальние перелёты.</p><ul class="species-gallery__tab-list"><li>Улетают в сентябре-октябре</li><li>Летят клином</li><li>Высота полёта до 2000 м</li><li>Зимуют на юге Европы, Азии</li><li>Пролетают тысячи километров</li><li>Возвращаются в мае</li></ul>`},
            {title: 'Голос', content: `<p class="species-gallery__tab-text">Гуси издают громкое гоготание.</p><ul class="species-gallery__tab-list"><li>Громкое «га-га-га»</li><li>Слышно за километр</li><li>Перекличка в стае</li><li>Тревожный крик</li><li>Гусята пищат</li><li>Шипят при угрозе</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Гуси — общественные птицы.</p><ul class="species-gallery__tab-list"><li>Живут стаями</li><li>Моногамны</li><li>Агрессивно защищают гнездо</li><li>Отличные пловцы</li><li>Хорошо ходят по суше</li><li>Осторожны</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Гуси — важный охотничий вид.</p><ul class="species-gallery__tab-list"><li>Объект спортивной охоты</li><li>Вкусное мясо</li><li>Пух и перо</li><li>Одомашнены тысячи лет назад</li><li>Охота регулируется</li><li>Популяция стабильна</li></ul>`},
            {title: 'Враги', content: `<p class="species-gallery__tab-text">У гусей много естественных врагов.</p><ul class="species-gallery__tab-list"><li><strong>Хищники:</strong> Лисы, песцы</li><li>Орланы, беркуты</li><li>Разоряют гнёзда: чайки, поморники</li><li>Птенцы уязвимы</li><li>Взрослые защищаются клювом</li><li>Держатся стаями для защиты</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности гусей.</p><ul class="species-gallery__tab-list"><li>Летят клином для экономии энергии</li><li>Могут лететь на высоте 9000 м</li><li>Верны партнёру всю жизнь</li><li>Спасли Рим (легенда)</li><li>Символ верности</li><li>Одомашнены раньше кур</li></ul>`}
        ]
    },
    'waxwing': {
        name: 'Свиристель',
        latin: 'Bombycilla garrulus',
        image: 'assets/images/priroda/flora_fauna/fauna/waxwing.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Свиристель — красивая певчая птица с хохолком.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 60-70 г</li><li><strong>Размах крыльев:</strong> 32-35 см</li><li><strong>Длина тела:</strong> 18-23 см</li><li><strong>Популяция:</strong> Обычный вид</li><li><strong>Продолжительность жизни:</strong> 10-13 лет</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Свиристель — нарядная птица.</p><ul class="species-gallery__tab-list"><li>Серовато-розовое оперение</li><li>Хохолок на голове</li><li>Чёрная маска на глазах</li><li>Жёлтая полоса на хвосте</li><li>Красные восковые пятна на крыльях</li><li>Самцы ярче самок</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Свиристели питаются ягодами и насекомыми.</p><ul class="species-gallery__tab-list"><li><strong>Зима:</strong> Ягоды рябины, калины</li><li><strong>Лето:</strong> Насекомые, ягоды</li><li>Могут съесть ягод больше собственного веса</li><li>Кормятся стаями</li><li>Глотают ягоды целиком</li><li>Пьянеют от забродивших ягод</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Свиристели гнездятся в северной тайге.</p><ul class="species-gallery__tab-list"><li>Северная тайга</li><li>Лесотундра</li><li>Хвойные и смешанные леса</li><li>Зимой — города и посёлки</li><li>Держатся у ягодных деревьев</li><li>Кочующий вид</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Свиристели гнездятся поздно.</p><ul class="species-gallery__tab-list"><li><strong>Гнездование:</strong> Июнь-июль</li><li><strong>Кладка:</strong> 4-6 яиц</li><li><strong>Насиживание:</strong> 13-14 дней</li><li><strong>Вылет птенцов:</strong> Через 15-17 дней</li><li>Гнездо на дереве</li><li>Насиживает самка</li></ul>`},
            {title: 'Голос', content: `<p class="species-gallery__tab-text">Свиристели издают характерную трель.</p><ul class="species-gallery__tab-list"><li>Нежное «свирири-свирири»</li><li>Журчащая трель</li><li>Поют круглый год</li><li>Перекличка в стае</li><li>Тихое щебетание</li><li>Песня мелодичная</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Свиристели — общительные птицы.</p><ul class="species-gallery__tab-list"><li>Держатся стаями</li><li>Доверчивы к человеку</li><li>Кочуют в поисках корма</li><li>Зимой прилетают в города</li><li>Активны днём</li><li>Неагрессивны</li></ul>`},
            {title: 'Миграции', content: `<p class="species-gallery__tab-text">Свиристели совершают нерегулярные кочёвки.</p><ul class="species-gallery__tab-list"><li>Кочуют в зависимости от урожая ягод</li><li>Зимой летят на юг</li><li>Массовые налёты в города</li><li>Могут оставаться на зиму</li><li>Весной возвращаются на север</li><li>Непредсказуемые перемещения</li></ul>`},
            {title: 'Особенности', content: `<p class="species-gallery__tab-text">Свиристели обладают уникальными особенностями.</p><ul class="species-gallery__tab-list"><li>Могут переедать ягод</li><li>Пьянеют от забродивших ягод</li><li>Восковые пятна на крыльях уникальны</li><li>Очень прожорливы</li><li>Распространяют семена растений</li><li>Доверчивы</li></ul>`},
            {title: 'Экологическая роль', content: `<p class="species-gallery__tab-text">Свиристели важны для распространения растений.</p><ul class="species-gallery__tab-list"><li>Распространяют семена ягод</li><li>Едят насекомых-вредителей</li><li>Украшают зимний город</li><li>Индикатор урожая ягод</li><li>Пища для хищников</li><li>Важны для экосистемы</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности свиристелей.</p><ul class="species-gallery__tab-list"><li>Название от слова «свирель»</li><li>Могут съесть 100 ягод за раз</li><li>Пьянеют от перебродивших ягод</li><li>Символ зимы</li><li>Очень красивая песня</li><li>Любимцы горожан зимой</li></ul>`}
        ]
    },
    'nutcracker': {
        name: 'Кедровка',
        latin: 'Nucifraga caryocatactes',
        image: 'assets/images/priroda/flora_fauna/fauna/nutcracker.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Кедровка — птица кедровых лесов, распространитель кедровых орехов.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 125-200 г</li><li><strong>Размах крыльев:</strong> 49-53 см</li><li><strong>Длина тела:</strong> 30-35 см</li><li><strong>Популяция:</strong> Обычный вид</li><li><strong>Продолжительность жизни:</strong> 10-12 лет</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Кедровка — пёстрая птица.</p><ul class="species-gallery__tab-list"><li>Тёмно-бурое оперение с белыми пестринами</li><li>Чёрные крылья и хвост</li><li>Белое подхвостье</li><li>Длинный острый клюв</li><li>Короткий хвост</li><li>Самцы и самки одинаковы</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Кедровка специализируется на кедровых орехах.</p><ul class="species-gallery__tab-list"><li><strong>Основа:</strong> Кедровые орехи</li><li>Семена хвойных</li><li>Насекомые летом</li><li>Ягоды</li><li>Яйца и птенцы</li><li>Запасает орехи на зиму</li></ul>`},
            {title: 'Запасание корма', content: `<p class="species-gallery__tab-text">Кедровка — мастер создания запасов.</p><ul class="species-gallery__tab-list"><li>Делает до 30 000 кладовых</li><li>В подъязычном мешке до 100 орехов</li><li>Прячет орехи в землю, мох</li><li>Запоминает места кладовых</li><li>Находит запасы под снегом</li><li>Не все запасы находит</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Кедровка — житель кедровой тайги.</p><ul class="species-gallery__tab-list"><li>Кедровые леса</li><li>Смешанные леса с кедром</li><li>Горная тайга</li><li>Оседлая птица</li><li>При неурожае кочует</li><li>Территория: 1-5 км²</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Кедровки гнездятся рано.</p><ul class="species-gallery__tab-list"><li><strong>Гнездование:</strong> Март-апрель</li><li><strong>Кладка:</strong> 3-4 яйца</li><li><strong>Насиживание:</strong> 17-19 дней</li><li><strong>Вылет птенцов:</strong> Через 21-28 дней</li><li>Гнездо на хвойном дереве</li><li>Насиживает самка</li></ul>`},
            {title: 'Голос', content: `<p class="species-gallery__tab-text">Кедровка издаёт характерные крики.</p><ul class="species-gallery__tab-list"><li>Резкое «крэ-крэ-крэ»</li><li>Трескучее «крр-крр»</li><li>Громкие крики</li><li>Слышна за 500 м</li><li>Тревожный крик</li><li>Щебетание у гнезда</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Кедровка — умная и запасливая птица.</p><ul class="species-gallery__tab-list"><li>Отличная память</li><li>Запоминает тысячи мест</li><li>Активна днём</li><li>Ловкая и быстрая</li><li>Осторожная</li><li>Держится поодиночке или парами</li></ul>`},
            {title: 'Экологическая роль', content: `<p class="species-gallery__tab-text">Кедровка — главный распространитель кедра.</p><ul class="species-gallery__tab-list"><li>Распространяет кедровые орехи</li><li>Способствует возобновлению кедра</li><li>Не находит 20-30% запасов</li><li>Эти орехи прорастают</li><li>«Сеятель кедровых лесов»</li><li>Важнейшая роль в экосистеме</li></ul>`},
            {title: 'Кочёвки', content: `<p class="species-gallery__tab-text">При неурожае кедровки кочуют.</p><ul class="species-gallery__tab-list"><li>Массовые кочёвки раз в 10-15 лет</li><li>Улетают за сотни километров</li><li>Появляются в нетипичных местах</li><li>Могут залетать в города</li><li>Возвращаются при урожае</li><li>Непредсказуемые перемещения</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности кедровки.</p><ul class="species-gallery__tab-list"><li>Может запомнить 30 000 мест</li><li>Переносит до 100 орехов за раз</li><li>Главный распространитель кедра</li><li>Без кедровки нет кедровых лесов</li><li>Феноменальная память</li><li>Символ кедровой тайги</li></ul>`}
        ]
    },
    'crossbill': {
        name: 'Клёст',
        latin: 'Loxia',
        image: 'assets/images/priroda/flora_fauna/fauna/crossbill.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Клёст — уникальная птица с перекрещенным клювом, гнездящаяся зимой.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 40-50 г</li><li><strong>Размах крыльев:</strong> 27-30 см</li><li><strong>Длина тела:</strong> 15-17 см</li><li><strong>Популяция:</strong> Обычный вид</li><li><strong>Продолжительность жизни:</strong> 5-10 лет</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Клёст имеет уникальный клюв.</p><ul class="species-gallery__tab-list"><li>Перекрещенный клюв</li><li><strong>Самец:</strong> Красно-малиновый</li><li><strong>Самка:</strong> Зеленовато-серая</li><li>Молодые — серые с пестринами</li><li>Короткий хвост</li><li>Крепкое телосложение</li></ul>`},
            {title: 'Клюв', content: `<p class="species-gallery__tab-text">Клюв клёста — уникальное приспособление.</p><ul class="species-gallery__tab-list"><li>Концы клюва перекрещены</li><li>Идеален для вылущивания семян</li><li>Раздвигает чешуйки шишек</li><li>Может быть перекрещен вправо или влево</li><li>Формируется у птенцов</li><li>Позволяет питаться круглый год</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Клёст специализируется на семенах хвойных.</p><ul class="species-gallery__tab-list"><li><strong>Основа:</strong> Семена ели, сосны, лиственницы</li><li>Кедровые орехи</li><li>Семена других деревьев</li><li>Насекомые летом</li><li>Почки</li><li>Пьёт талую воду</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Клёст — житель хвойных лесов.</p><ul class="species-gallery__tab-list"><li>Еловые леса</li><li>Сосновые боры</li><li>Кедровая тайга</li><li>Смешанные леса</li><li>Кочует в поисках урожая</li><li>Оседлый или кочующий</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Клёст гнездится зимой!</p><ul class="species-gallery__tab-list"><li><strong>Гнездование:</strong> Январь-март</li><li><strong>Кладка:</strong> 3-4 яйца</li><li><strong>Насиживание:</strong> 14-16 дней</li><li><strong>Вылет птенцов:</strong> Через 20-25 дней</li><li>Гнездо утеплённое</li><li>Птенцы не мёрзнут</li></ul>`},
            {title: 'Зимнее гнездование', content: `<p class="species-gallery__tab-text">Клёст — единственная птица, гнездящаяся зимой.</p><ul class="species-gallery__tab-list"><li>Гнездится при -30°C</li><li>Урожай шишек зимой</li><li>Самка не покидает гнездо</li><li>Самец кормит самку</li><li>Гнездо очень тёплое</li><li>Птенцы выживают в мороз</li></ul>`},
            {title: 'Голос', content: `<p class="species-gallery__tab-text">Клёст издаёт звонкие трели.</p><ul class="species-gallery__tab-list"><li>Звонкое «гип-гип-гип»</li><li>Трескучая трель</li><li>Поёт круглый год</li><li>Перекличка в стае</li><li>Тихое щебетание</li><li>Песня мелодичная</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Клёсты — общительные птицы.</p><ul class="species-gallery__tab-list"><li>Держатся стаями</li><li>Кочуют в поисках урожая</li><li>Ловко лазают по ветвям</li><li>Висят вниз головой</li><li>Активны днём</li><li>Доверчивы</li></ul>`},
            {title: 'Кочёвки', content: `<p class="species-gallery__tab-text">Клёсты кочуют в зависимости от урожая.</p><ul class="species-gallery__tab-list"><li>Следуют за урожаем шишек</li><li>Массовые налёты</li><li>Могут улетать за сотни км</li><li>Непредсказуемые перемещения</li><li>Могут оставаться на зиму</li><li>Возвращаются при урожае</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности клёста.</p><ul class="species-gallery__tab-list"><li>Единственная птица, гнездящаяся зимой</li><li>Уникальный перекрещенный клюв</li><li>Птенцы вылупляются в мороз</li><li>Мясо не портится (смола)</li><li>Герой легенд</li><li>Символ хвойных лесов</li></ul>`}
        ]
    },
    'grayling': {
        name: 'Хариус',
        latin: 'Thymallus',
        image: 'assets/images/priroda/flora_fauna/fauna/grayling.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Хариус — красивая рыба чистых рек с огромным спинным плавником.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 0,5-3 кг</li><li><strong>Длина:</strong> до 50 см</li><li><strong>Возраст:</strong> до 15 лет</li><li><strong>Статус:</strong> Обычный вид</li><li><strong>Семейство:</strong> Лососёвые</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Хариус — одна из красивейших рыб.</p><ul class="species-gallery__tab-list"><li>Огромный спинной плавник с пятнами</li><li>Серебристая чешуя с фиолетовым отливом</li><li>Мелкая чешуя</li><li>Маленький рот</li><li>Самцы ярче самок</li><li>Плавник складывается в бороздку</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Хариус — хищник-насекомоядный.</p><ul class="species-gallery__tab-list"><li>Насекомые и их личинки</li><li>Летающие насекомые</li><li>Икра других рыб</li><li>Мелкая рыба</li><li>Рачки, моллюски</li><li>Кормится у поверхности</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Хариус — житель чистых холодных рек.</p><ul class="species-gallery__tab-list"><li>Горные реки</li><li>Быстрые ручьи</li><li>Холодные озёра</li><li>Требует чистой воды</li><li>Богатой кислородом</li><li>Держится на течении</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Хариус нерестится весной.</p><ul class="species-gallery__tab-list"><li><strong>Нерест:</strong> Май-июнь</li><li><strong>Икра:</strong> 3-10 тысяч икринок</li><li>На галечном дне</li><li>Икра крупная, жёлтая</li><li>Развитие 2-3 недели</li><li>Половозрелость в 3-4 года</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Хариус — осторожная рыба.</p><ul class="species-gallery__tab-list"><li>Держится на течении</li><li>Выпрыгивает за насекомыми</li><li>Очень осторожен</li><li>Территориальный</li><li>Активен днём</li><li>Зимует в ямах</li></ul>`},
            {title: 'Особенности', content: `<p class="species-gallery__tab-text">Хариус обладает уникальными чертами.</p><ul class="species-gallery__tab-list"><li>Огромный спинной плавник</li><li>Пахнет тимьяном (отсюда название)</li><li>Отличное зрение</li><li>Видит над водой</li><li>Индикатор чистоты воды</li><li>Не живёт в грязной воде</li></ul>`},
            {title: 'Рыболовное значение', content: `<p class="species-gallery__tab-text">Хариус — ценная спортивная рыба.</p><ul class="species-gallery__tab-list"><li>Популярен у рыболовов</li><li>Ловят на мушку</li><li>Спиннинг</li><li>Поплавочная удочка</li><li>Вкусное мясо</li><li>Охраняется в некоторых водоёмах</li></ul>`},
            {title: 'Враги', content: `<p class="species-gallery__tab-text">У хариуса много естественных врагов.</p><ul class="species-gallery__tab-list"><li><strong>Хищники:</strong> Таймень, щука</li><li>Налим</li><li>Скопа, орлан</li><li>Выдра</li><li>Икру едят другие рыбы</li><li>Загрязнение воды</li></ul>`},
            {title: 'Миграции', content: `<p class="species-gallery__tab-text">Хариус совершает сезонные миграции.</p><ul class="species-gallery__tab-list"><li>Весной поднимается вверх по рекам</li><li>Осенью спускается в ямы</li><li>Зимует в глубоких местах</li><li>Нерестовые миграции</li><li>Кормовые миграции</li><li>Может проходить десятки км</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности хариуса.</p><ul class="species-gallery__tab-list"><li>Пахнет свежим тимьяном</li><li>Огромный плавник — украшение</li><li>Выпрыгивает за мухами</li><li>Индикатор экологии</li><li>Символ чистых рек</li><li>Деликатесная рыба</li></ul>`}
        ]
    },
    'lenok': {
        name: 'Ленок',
        latin: 'Brachymystax',
        image: 'assets/images/priroda/flora_fauna/fauna/lenok.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Ленок — ценная лососёвая рыба горных рек.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 1-6 кг</li><li><strong>Длина:</strong> до 70 см</li><li><strong>Возраст:</strong> до 15 лет</li><li><strong>Статус:</strong> Обычный вид</li><li><strong>Семейство:</strong> Лососёвые</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Ленок — красивая рыба с тёмными пятнами.</p><ul class="species-gallery__tab-list"><li>Тёмные пятна по телу</li><li>Золотистые бока</li><li>Мелкая чешуя</li><li>Маленький рот</li><li>Два подвида: тупорылый и острорылый</li><li>Яркая окраска в нерест</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Ленок — активный хищник.</p><ul class="species-gallery__tab-list"><li>Насекомые и личинки</li><li>Мелкая рыба</li><li>Икра других рыб</li><li>Мыши, лягушки</li><li>Рачки</li><li>Кормится у дна и поверхности</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Ленок — житель горных рек.</p><ul class="species-gallery__tab-list"><li>Горные реки</li><li>Холодные ручьи</li><li>Озёра</li><li>Требует чистой воды</li><li>Быстрое течение</li><li>Каменистое дно</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Ленок нерестится осенью.</p><ul class="species-gallery__tab-list"><li><strong>Нерест:</strong> Сентябрь-октябрь</li><li><strong>Икра:</strong> 2-10 тысяч икринок</li><li>На галечном дне</li><li>Икра крупная, оранжевая</li><li>Развитие всю зиму</li><li>Половозрелость в 5-6 лет</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Ленок — осторожная рыба.</p><ul class="species-gallery__tab-list"><li>Держится на течении</li><li>Активен утром и вечером</li><li>Осторожен</li><li>Территориальный</li><li>Зимует в ямах</li><li>Может выпрыгивать из воды</li></ul>`},
            {title: 'Миграции', content: `<p class="species-gallery__tab-text">Ленок совершает сезонные миграции.</p><ul class="species-gallery__tab-list"><li>Весной поднимается по рекам</li><li>Осенью на нерест</li><li>Зимует в глубоких ямах</li><li>Нерестовые миграции</li><li>Может проходить сотни км</li><li>Возвращается в родные реки</li></ul>`},
            {title: 'Рыболовное значение', content: `<p class="species-gallery__tab-text">Ленок — ценная промысловая рыба.</p><ul class="species-gallery__tab-list"><li>Популярен у рыболовов</li><li>Ловят на спиннинг</li><li>Нахлыст</li><li>Поплавочная удочка</li><li>Вкусное розовое мясо</li><li>Охраняется в некоторых водоёмах</li></ul>`},
            {title: 'Враги', content: `<p class="species-gallery__tab-text">У ленка есть естественные враги.</p><ul class="species-gallery__tab-list"><li><strong>Хищники:</strong> Таймень</li><li>Щука</li><li>Налим</li><li>Скопа</li><li>Выдра</li><li>Загрязнение воды</li></ul>`},
            {title: 'Особенности', content: `<p class="species-gallery__tab-text">Ленок обладает уникальными чертами.</p><ul class="species-gallery__tab-list"><li>Два подвида</li><li>Яркая окраска в нерест</li><li>Отличное зрение</li><li>Сильная рыба</li><li>Индикатор чистоты воды</li><li>Может жить в озёрах</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности ленка.</p><ul class="species-gallery__tab-list"><li>Розовое мясо как у лосося</li><li>Может достигать 8 кг</li><li>Сильный боец</li><li>Деликатесная рыба</li><li>Символ горных рек</li><li>Ценится рыболовами</li></ul>`}
        ]
    },
    'omul': {
        name: 'Омуль',
        latin: 'Coregonus autumnalis',
        image: 'assets/images/priroda/flora_fauna/fauna/omul.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Омуль — ценнейшая промысловая рыба сиговых.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 0,5-3 кг</li><li><strong>Длина:</strong> до 50 см</li><li><strong>Возраст:</strong> до 18 лет</li><li><strong>Статус:</strong> Ценный вид</li><li><strong>Семейство:</strong> Лососёвые (сиговые)</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Омуль — серебристая рыба с нежным мясом.</p><ul class="species-gallery__tab-list"><li>Серебристая чешуя</li><li>Тёмная спина</li><li>Крупная чешуя</li><li>Маленький рот</li><li>Жировой плавник</li><li>Стройное тело</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Омуль питается планктоном и мелкими организмами.</p><ul class="species-gallery__tab-list"><li>Зоопланктон</li><li>Мелкие рачки</li><li>Личинки насекомых</li><li>Мелкая рыба</li><li>Моллюски</li><li>Кормится в толще воды</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Омуль — житель холодных северных рек и озёр.</p><ul class="species-gallery__tab-list"><li>Енисей и притоки</li><li>Холодные озёра</li><li>Требует чистой воды</li><li>Богатой кислородом</li><li>Держится в толще воды</li><li>Проходная и озёрная формы</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Омуль нерестится осенью.</p><ul class="species-gallery__tab-list"><li><strong>Нерест:</strong> Сентябрь-ноябрь</li><li><strong>Икра:</strong> 20-60 тысяч икринок</li><li>На галечном дне</li><li>Икра мелкая, янтарная</li><li>Развитие всю зиму</li><li>Половозрелость в 5-7 лет</li></ul>`},
            {title: 'Миграции', content: `<p class="species-gallery__tab-text">Проходной омуль совершает дальние миграции.</p><ul class="species-gallery__tab-list"><li>Из моря в реки на нерест</li><li>Поднимается на сотни км</li><li>После нереста скатывается</li><li>Нерестовые миграции осенью</li><li>Кормовые миграции</li><li>Озёрный омуль не мигрирует</li></ul>`},
            {title: 'Промысловое значение', content: `<p class="species-gallery__tab-text">Омуль — ценнейшая промысловая рыба.</p><ul class="species-gallery__tab-list"><li>Деликатесное мясо</li><li>Малосольный омуль</li><li>Копчёный омуль</li><li>Промысел регулируется</li><li>Искусственное разведение</li><li>Символ Сибири</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Омуль — стайная рыба.</p><ul class="species-gallery__tab-list"><li>Держится стаями</li><li>Активен круглый год</li><li>Предпочитает холодную воду</li><li>Держится в толще воды</li><li>Осторожен</li><li>Быстро плавает</li></ul>`},
            {title: 'Враги', content: `<p class="species-gallery__tab-text">У омуля есть естественные враги.</p><ul class="species-gallery__tab-list"><li><strong>Хищники:</strong> Налим, щука</li><li>Таймень</li><li>Нерпа</li><li>Чайки</li><li>Икру едят другие рыбы</li><li>Перелов</li></ul>`},
            {title: 'Охрана', content: `<p class="species-gallery__tab-text">Омуль нуждается в охране.</p><ul class="species-gallery__tab-list"><li>Промысел регулируется квотами</li><li>Запреты в нерестовый период</li><li>Искусственное разведение</li><li>Охрана нерестилищ</li><li>Контроль загрязнения</li><li>Важен для экономики региона</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности омуля.</p><ul class="species-gallery__tab-list"><li>Символ Байкала и Енисея</li><li>Деликатес мировой кухни</li><li>Нежнейшее мясо</li><li>Малосольный омуль — легенда</li><li>Воспет в песнях</li><li>Гордость Сибири</li></ul>`}
        ]
    },
    'muksun': {
        name: 'Муксун',
        latin: 'Coregonus muksun',
        image: 'assets/images/priroda/flora_fauna/fauna/muksun.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Муксун — ценная сиговая рыба северных рек.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 1-4 кг</li><li><strong>Длина:</strong> до 75 см</li><li><strong>Возраст:</strong> до 20 лет</li><li><strong>Статус:</strong> Ценный вид</li><li><strong>Семейство:</strong> Лососёвые (сиговые)</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Муксун — красивая серебристая рыба.</p><ul class="species-gallery__tab-list"><li>Серебристая чешуя</li><li>Тёмная спина с синим отливом</li><li>Крупная чешуя</li><li>Конечный рот</li><li>Жировой плавник</li><li>Высокое тело</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Муксун питается донными организмами.</p><ul class="species-gallery__tab-list"><li>Донные рачки</li><li>Моллюски</li><li>Личинки насекомых</li><li>Мелкая рыба</li><li>Зоопланктон</li><li>Кормится у дна</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Муксун — проходная рыба северных рек.</p><ul class="species-gallery__tab-list"><li>Енисей и притоки</li><li>Опресненные участки моря</li><li>Холодные реки</li><li>Требует чистой воды</li><li>Держится у дна</li><li>Проходная форма</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Муксун нерестится осенью.</p><ul class="species-gallery__tab-list"><li><strong>Нерест:</strong> Сентябрь-октябрь</li><li><strong>Икра:</strong> 40-60 тысяч икринок</li><li>На галечном дне</li><li>Икра мелкая, жёлтая</li><li>Развитие всю зиму</li><li>Половозрелость в 7-10 лет</li></ul>`},
            {title: 'Миграции', content: `<p class="species-gallery__tab-text">Муксун совершает дальние миграции.</p><ul class="species-gallery__tab-list"><li>Из моря в реки на нерест</li><li>Поднимается на тысячи км</li><li>После нереста скатывается</li><li>Нерестовые миграции осенью</li><li>Кормится в море</li><li>Возвращается в родные реки</li></ul>`},
            {title: 'Промысловое значение', content: `<p class="species-gallery__tab-text">Муксун — ценнейшая промысловая рыба.</p><ul class="species-gallery__tab-list"><li>Деликатесное белое мясо</li><li>Строганина из муксуна</li><li>Малосольный муксун</li><li>Промысел регулируется</li><li>Искусственное разведение</li><li>Экспортируется</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Муксун — стайная рыба.</p><ul class="species-gallery__tab-list"><li>Держится стаями</li><li>Активен круглый год</li><li>Предпочитает холодную воду</li><li>Держится у дна</li><li>Осторожен</li><li>Сильная рыба</li></ul>`},
            {title: 'Враги', content: `<p class="species-gallery__tab-text">У муксуна есть естественные враги.</p><ul class="species-gallery__tab-list"><li><strong>Хищники:</strong> Налим, щука</li><li>Таймень</li><li>Нерпа</li><li>Чайки</li><li>Икру едят другие рыбы</li><li>Перелов</li></ul>`},
            {title: 'Охрана', content: `<p class="species-gallery__tab-text">Муксун нуждается в охране.</p><ul class="species-gallery__tab-list"><li>Промысел регулируется квотами</li><li>Запреты в нерестовый период</li><li>Искусственное разведение</li><li>Охрана нерестилищ</li><li>Контроль загрязнения</li><li>Ценный вид</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности муксуна.</p><ul class="species-gallery__tab-list"><li>Лучшая рыба для строганины</li><li>Деликатес мировой кухни</li><li>Нежнейшее белое мясо</li><li>Символ северной кухни</li><li>Может достигать 8 кг</li><li>Гордость Севера</li></ul>`}
        ]
    },
    'nelma': {
        name: 'Нельма',
        latin: 'Stenodus leucichthys nelma',
        image: 'assets/images/priroda/flora_fauna/fauna/nelma.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Нельма — крупнейший представитель сиговых, «царица сибирских рек».</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 3-12 кг</li><li><strong>Длина:</strong> до 130 см</li><li><strong>Возраст:</strong> до 22 лет</li><li><strong>Статус:</strong> Ценный вид</li><li><strong>Семейство:</strong> Лососёвые (сиговые)</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Нельма — крупная серебристая рыба.</p><ul class="species-gallery__tab-list"><li>Серебристая чешуя</li><li>Тёмная спина</li><li>Крупная чешуя</li><li>Большой рот</li><li>Жировой плавник</li><li>Мощное тело</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Нельма — активный хищник.</p><ul class="species-gallery__tab-list"><li>Мелкая рыба (ряпушка, корюшка)</li><li>Молодь других рыб</li><li>Рачки</li><li>Насекомые</li><li>Активный охотник</li><li>Кормится в толще воды</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Нельма — проходная рыба великих рек.</p><ul class="species-gallery__tab-list"><li>Енисей и притоки</li><li>Опресненные участки моря</li><li>Крупные реки</li><li>Требует чистой воды</li><li>Держится в толще воды</li><li>Проходная и речная формы</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Нельма нерестится осенью.</p><ul class="species-gallery__tab-list"><li><strong>Нерест:</strong> Сентябрь-октябрь</li><li><strong>Икра:</strong> 125-420 тысяч икринок</li><li>На галечном дне</li><li>Икра крупная, жёлтая</li><li>Развитие всю зиму</li><li>Половозрелость в 8-12 лет</li></ul>`},
            {title: 'Миграции', content: `<p class="species-gallery__tab-text">Нельма совершает дальние миграции.</p><ul class="species-gallery__tab-list"><li>Из моря в реки на нерест</li><li>Поднимается на тысячи км</li><li>После нереста скатывается</li><li>Нерестовые миграции осенью</li><li>Кормится в море и реках</li><li>Возвращается в родные реки</li></ul>`},
            {title: 'Промысловое значение', content: `<p class="species-gallery__tab-text">Нельма — ценнейшая промысловая рыба.</p><ul class="species-gallery__tab-list"><li>Деликатесное белое мясо</li><li>Строганина из нельмы</li><li>Малосольная нельма</li><li>Промысел ограничен</li><li>Искусственное разведение</li><li>«Царица сибирских рек»</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Нельма — стайная хищная рыба.</p><ul class="species-gallery__tab-list"><li>Держится стаями</li><li>Активный хищник</li><li>Предпочитает холодную воду</li><li>Держится в толще воды</li><li>Быстро плавает</li><li>Сильная рыба</li></ul>`},
            {title: 'Враги', content: `<p class="species-gallery__tab-text">У нельмы мало естественных врагов.</p><ul class="species-gallery__tab-list"><li><strong>Хищники:</strong> Таймень (молодь)</li><li>Налим</li><li>Нерпа</li><li>Чайки</li><li>Икру едят другие рыбы</li><li>Перелов — главная угроза</li></ul>`},
            {title: 'Охрана', content: `<p class="species-gallery__tab-text">Нельма нуждается в строгой охране.</p><ul class="species-gallery__tab-list"><li>Промысел строго регулируется</li><li>Запреты в нерестовый период</li><li>Искусственное разведение</li><li>Охрана нерестилищ</li><li>Занесена в Красную книгу некоторых регионов</li><li>Ценнейший вид</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности нельмы.</p><ul class="species-gallery__tab-list"><li>Крупнейший сиг в мире</li><li>Может достигать 30 кг</li><li>«Царица сибирских рек»</li><li>Лучшая рыба для строганины</li><li>Деликатес мировой кухни</li><li>Символ богатства Севера</li></ul>`}
        ]
    },
    'peled': {
        name: 'Пелядь',
        latin: 'Coregonus peled',
        image: 'assets/images/priroda/flora_fauna/fauna/peled.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Пелядь (сырок) — ценная сиговая рыба, успешно акклиматизированная во многих водоёмах.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 0,5-3 кг</li><li><strong>Длина:</strong> до 55 см</li><li><strong>Возраст:</strong> до 13 лет</li><li><strong>Статус:</strong> Промысловый вид</li><li><strong>Семейство:</strong> Лососёвые (сиговые)</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Пелядь — красивая серебристая рыба.</p><ul class="species-gallery__tab-list"><li>Серебристая чешуя</li><li>Тёмная спина</li><li>Конечный рот</li><li>Жировой плавник</li><li>Высокое тело</li><li>Крупная чешуя</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Пелядь питается зоопланктоном.</p><ul class="species-gallery__tab-list"><li>Зоопланктон (основа)</li><li>Рачки</li><li>Личинки насекомых</li><li>Моллюски</li><li>Кормится в толще воды</li><li>Активна круглый год</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Пелядь обитает в озёрах и реках.</p><ul class="species-gallery__tab-list"><li>Озёра</li><li>Реки с медленным течением</li><li>Водохранилища</li><li>Предпочитает холодную воду</li><li>Держится в толще воды</li><li>Озёрная и речная формы</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Пелядь нерестится осенью.</p><ul class="species-gallery__tab-list"><li><strong>Нерест:</strong> Октябрь-ноябрь</li><li><strong>Икра:</strong> 5-85 тысяч икринок</li><li>На галечном дне</li><li>Икра мелкая, жёлтая</li><li>Развитие всю зиму</li><li>Половозрелость в 3-4 года</li></ul>`},
            {title: 'Рост', content: `<p class="species-gallery__tab-text">Пелядь быстро растёт.</p><ul class="species-gallery__tab-list"><li>Быстрорастущий вид</li><li>К 3 годам 300-500 г</li><li>Хорошо набирает вес</li><li>Растёт всю жизнь</li><li>Темп роста зависит от кормовой базы</li><li>В прудах растёт быстрее</li></ul>`},
            {title: 'Промысловое значение', content: `<p class="species-gallery__tab-text">Пелядь — важная промысловая рыба.</p><ul class="species-gallery__tab-list"><li>Вкусное жирное мясо</li><li>Хороша в любом виде</li><li>Объект товарного рыбоводства</li><li>Акклиматизирована во многих водоёмах</li><li>Промысел регулируется</li><li>Популярна у рыбаков</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Пелядь — стайная рыба.</p><ul class="species-gallery__tab-list"><li>Держится стаями</li><li>Активна круглый год</li><li>Предпочитает холодную воду</li><li>Держится в толще воды</li><li>Зимой подо льдом</li><li>Неприхотлива</li></ul>`},
            {title: 'Враги', content: `<p class="species-gallery__tab-text">У пеляди есть естественные враги.</p><ul class="species-gallery__tab-list"><li><strong>Хищники:</strong> Щука, налим</li><li>Окунь</li><li>Чайки</li><li>Икру едят другие рыбы</li><li>Молодь уязвима</li><li>Перелов</li></ul>`},
            {title: 'Разведение', content: `<p class="species-gallery__tab-text">Пелядь успешно разводится искусственно.</p><ul class="species-gallery__tab-list"><li>Объект прудового рыбоводства</li><li>Акклиматизирована в сотнях водоёмов</li><li>Хорошо приживается</li><li>Быстро растёт</li><li>Неприхотлива</li><li>Товарная рыба</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности пеляди.</p><ul class="species-gallery__tab-list"><li>Называется «сырок»</li><li>Успешно акклиматизирована по всей России</li><li>Может жить в солоноватой воде</li><li>Хороша в строганине</li><li>Жирная и вкусная</li><li>Важна для северного рыбоводства</li></ul>`}
        ]
    },
    'whitefish': {
        name: 'Сиг',
        latin: 'Coregonus lavaretus',
        image: 'assets/images/priroda/flora_fauna/fauna/whitefish.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Сиг — ценная промысловая рыба семейства лососёвых.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 0,5-5 кг</li><li><strong>Длина:</strong> до 70 см</li><li><strong>Возраст:</strong> до 20 лет</li><li><strong>Статус:</strong> Ценный вид</li><li><strong>Семейство:</strong> Лососёвые (сиговые)</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Сиг — серебристая рыба с изящным телом.</p><ul class="species-gallery__tab-list"><li>Серебристая чешуя</li><li>Тёмная спина</li><li>Небольшой рот</li><li>Жировой плавник</li><li>Вытянутое тело</li><li>Крупная чешуя</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Сиг питается донными организмами.</p><ul class="species-gallery__tab-list"><li>Донные рачки</li><li>Моллюски</li><li>Личинки насекомых</li><li>Икра других рыб</li><li>Зоопланктон</li><li>Кормится у дна</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Сиг обитает в чистых холодных водоёмах.</p><ul class="species-gallery__tab-list"><li>Озёра</li><li>Реки</li><li>Водохранилища</li><li>Требует чистой воды</li><li>Холодолюбивый</li><li>Озёрные и речные формы</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Сиг нерестится осенью.</p><ul class="species-gallery__tab-list"><li><strong>Нерест:</strong> Октябрь-декабрь</li><li><strong>Икра:</strong> 10-80 тысяч икринок</li><li>На галечном дне</li><li>Икра крупная, жёлтая</li><li>Развитие всю зиму</li><li>Половозрелость в 4-6 лет</li></ul>`},
            {title: 'Формы', content: `<p class="species-gallery__tab-text">Сиг образует множество форм.</p><ul class="species-gallery__tab-list"><li>Озёрные формы</li><li>Речные формы</li><li>Проходные формы</li><li>Различаются по размеру и образу жизни</li><li>Более 40 подвидов</li><li>Пластичный вид</li></ul>`},
            {title: 'Промысловое значение', content: `<p class="species-gallery__tab-text">Сиг — ценная промысловая рыба.</p><ul class="species-gallery__tab-list"><li>Деликатесное белое мясо</li><li>Хорош в любом виде</li><li>Объект промысла</li><li>Искусственное разведение</li><li>Промысел регулируется</li><li>Популярен у рыбаков</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Сиг — стайная рыба.</p><ul class="species-gallery__tab-list"><li>Держится стаями</li><li>Активен круглый год</li><li>Предпочитает холодную воду</li><li>Держится у дна</li><li>Осторожен</li><li>Чувствителен к загрязнению</li></ul>`},
            {title: 'Враги', content: `<p class="species-gallery__tab-text">У сига есть естественные враги.</p><ul class="species-gallery__tab-list"><li><strong>Хищники:</strong> Щука, налим</li><li>Таймень</li><li>Окунь</li><li>Чайки</li><li>Икру едят другие рыбы</li><li>Загрязнение водоёмов</li></ul>`},
            {title: 'Охрана', content: `<p class="species-gallery__tab-text">Сиг нуждается в охране.</p><ul class="species-gallery__tab-list"><li>Промысел регулируется</li><li>Запреты в нерестовый период</li><li>Искусственное разведение</li><li>Охрана нерестилищ</li><li>Контроль загрязнения</li><li>Ценный вид</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности сига.</p><ul class="species-gallery__tab-list"><li>Более 40 подвидов</li><li>Каждое озеро имеет свою форму</li><li>Деликатесная рыба</li><li>Нежное белое мясо</li><li>Символ чистых вод</li><li>Индикатор экологии водоёма</li></ul>`}
        ]
    },
    'burbot': {
        name: 'Налим',
        latin: 'Lota lota',
        image: 'assets/images/priroda/flora_fauna/fauna/burbot.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Налим — единственный пресноводный представитель тресковых, холодолюбивый хищник.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 1-6 кг</li><li><strong>Длина:</strong> до 120 см</li><li><strong>Возраст:</strong> до 24 лет</li><li><strong>Статус:</strong> Промысловый вид</li><li><strong>Семейство:</strong> Тресковые</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Налим — змееподобная рыба с характерным усом.</p><ul class="species-gallery__tab-list"><li>Вытянутое тело</li><li>Мраморная окраска</li><li>Один ус на подбородке</li><li>Два спинных плавника</li><li>Мелкая чешуя</li><li>Широкая голова</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Налим — ночной хищник.</p><ul class="species-gallery__tab-list"><li>Мелкая рыба</li><li>Икра других рыб</li><li>Лягушки</li><li>Раки</li><li>Личинки насекомых</li><li>Охотится ночью</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Налим предпочитает холодные чистые водоёмы.</p><ul class="species-gallery__tab-list"><li>Реки с холодной водой</li><li>Озёра</li><li>Каменистое дно</li><li>Держится у дна</li><li>Любит коряги и камни</li><li>Активен при температуре ниже 10°C</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Налим нерестится зимой подо льдом.</p><ul class="species-gallery__tab-list"><li><strong>Нерест:</strong> Декабрь-февраль</li><li><strong>Икра:</strong> 200 тысяч - 3 млн икринок</li><li>Единственная рыба, нерестящаяся зимой</li><li>Икра мелкая, плавучая</li><li>Развитие 30-120 дней</li><li>Половозрелость в 3-4 года</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Налим — ночной донный хищник.</p><ul class="species-gallery__tab-list"><li>Активен ночью</li><li>Днём прячется в укрытиях</li><li>Холодолюбивый</li><li>Летом впадает в оцепенение</li><li>Зимой наиболее активен</li><li>Одиночный образ жизни</li></ul>`},
            {title: 'Промысловое значение', content: `<p class="species-gallery__tab-text">Налим — ценная промысловая рыба.</p><ul class="species-gallery__tab-list"><li>Вкусное белое мясо</li><li>Деликатесная печень</li><li>Зимний промысел</li><li>Популярен у рыбаков</li><li>Ловят на жерлицы</li><li>Промысел не регулируется</li></ul>`},
            {title: 'Охота', content: `<p class="species-gallery__tab-text">Налим охотится с помощью обоняния и осязания.</p><ul class="species-gallery__tab-list"><li>Находит добычу усом</li><li>Охотится в темноте</li><li>Заглатывает добычу целиком</li><li>Может съесть рыбу размером с себя</li><li>Прожорливый хищник</li><li>Ест икру других рыб</li></ul>`},
            {title: 'Враги', content: `<p class="species-gallery__tab-text">У налима мало естественных врагов.</p><ul class="species-gallery__tab-list"><li><strong>Хищники:</strong> Щука, таймень</li><li>Выдра</li><li>Молодь едят другие рыбы</li><li>Икру едят рыбы</li><li>Взрослые почти неуязвимы</li><li>Загрязнение водоёмов</li></ul>`},
            {title: 'Адаптации', content: `<p class="species-gallery__tab-text">Налим идеально приспособлен к холодной воде.</p><ul class="species-gallery__tab-list"><li>Активен при низких температурах</li><li>Нерестится зимой</li><li>Летом впадает в оцепенение</li><li>Чувствительный ус</li><li>Отличное обоняние</li><li>Видит в темноте</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности налима.</p><ul class="species-gallery__tab-list"><li>Единственная пресноводная треска</li><li>Единственная рыба, нерестящаяся зимой</li><li>Печень налима — деликатес</li><li>Может достигать 18 кг</li><li>Летом не питается</li><li>Реликт ледникового периода</li></ul>`}
        ]
    },
    'chir': {
        name: 'Чир',
        latin: 'Coregonus nasus',
        image: 'assets/images/priroda/flora_fauna/fauna/chir.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Чир (щокур) — крупная ценная сиговая рыба северных рек.</p><ul class="species-gallery__tab-list"><li><strong>Вес:</strong> 2-5 кг</li><li><strong>Длина:</strong> до 80 см</li><li><strong>Возраст:</strong> до 26 лет</li><li><strong>Статус:</strong> Ценный вид</li><li><strong>Семейство:</strong> Лососёвые (сиговые)</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Чир — крупная серебристая рыба с горбатым носом.</p><ul class="species-gallery__tab-list"><li>Серебристая чешуя</li><li>Тёмная спина</li><li>Горбатый нос</li><li>Нижний рот</li><li>Жировой плавник</li><li>Высокое тело</li></ul>`},
            {title: 'Питание', content: `<p class="species-gallery__tab-text">Чир питается донными организмами.</p><ul class="species-gallery__tab-list"><li>Донные рачки</li><li>Моллюски</li><li>Личинки насекомых</li><li>Зоопланктон</li><li>Кормится у дна</li><li>Активен круглый год</li></ul>`},
            {title: 'Места обитания', content: `<p class="species-gallery__tab-text">Чир — проходная и озёрная рыба.</p><ul class="species-gallery__tab-list"><li>Енисей и притоки</li><li>Озёра</li><li>Опресненные участки моря</li><li>Холодные реки</li><li>Требует чистой воды</li><li>Проходная и озёрная формы</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Чир нерестится осенью.</p><ul class="species-gallery__tab-list"><li><strong>Нерест:</strong> Сентябрь-октябрь</li><li><strong>Икра:</strong> 20-140 тысяч икринок</li><li>На галечном дне</li><li>Икра крупная, жёлтая</li><li>Развитие всю зиму</li><li>Половозрелость в 6-8 лет</li></ul>`},
            {title: 'Миграции', content: `<p class="species-gallery__tab-text">Проходной чир совершает миграции.</p><ul class="species-gallery__tab-list"><li>Из моря в реки на нерест</li><li>Поднимается на сотни км</li><li>После нереста скатывается</li><li>Нерестовые миграции осенью</li><li>Кормится в море</li><li>Озёрная форма не мигрирует</li></ul>`},
            {title: 'Промысловое значение', content: `<p class="species-gallery__tab-text">Чир — ценная промысловая рыба.</p><ul class="species-gallery__tab-list"><li>Деликатесное жирное мясо</li><li>Строганина из чира</li><li>Малосольный чир</li><li>Промысел регулируется</li><li>Искусственное разведение</li><li>Популярен у рыбаков</li></ul>`},
            {title: 'Поведение', content: `<p class="species-gallery__tab-text">Чир — стайная донная рыба.</p><ul class="species-gallery__tab-list"><li>Держится стаями</li><li>Активен круглый год</li><li>Предпочитает холодную воду</li><li>Держится у дна</li><li>Медлительный</li><li>Осторожен</li></ul>`},
            {title: 'Враги', content: `<p class="species-gallery__tab-text">У чира есть естественные враги.</p><ul class="species-gallery__tab-list"><li><strong>Хищники:</strong> Налим, щука</li><li>Таймень</li><li>Нерпа</li><li>Чайки</li><li>Икру едят другие рыбы</li><li>Перелов</li></ul>`},
            {title: 'Охрана', content: `<p class="species-gallery__tab-text">Чир нуждается в охране.</p><ul class="species-gallery__tab-list"><li>Промысел регулируется квотами</li><li>Запреты в нерестовый период</li><li>Искусственное разведение</li><li>Охрана нерестилищ</li><li>Контроль загрязнения</li><li>Ценный вид</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности чира.</p><ul class="species-gallery__tab-list"><li>Называется «щокур»</li><li>Самый жирный из сигов</li><li>Деликатес северной кухни</li><li>Отличная строганина</li><li>Может достигать 16 кг</li><li>Долгожитель среди сигов</li></ul>`}
        ]
    },
    'spruce': {
        name: 'Ель',
        latin: 'Picea obovata',
        image: 'assets/images/priroda/flora_fauna/flora/spruce.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Ель сибирская — вечнозелёное хвойное дерево, основа темнохвойной тайги.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 30 м</li><li><strong>Диаметр ствола:</strong> до 70 см</li><li><strong>Продолжительность жизни:</strong> 250-300 лет</li><li><strong>Семейство:</strong> Сосновые</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Ель — стройное дерево с конусовидной кроной.</p><ul class="species-gallery__tab-list"><li>Конусовидная крона</li><li>Ветви опущены вниз</li><li>Тёмно-зелёная хвоя</li><li>Хвоинки четырёхгранные</li><li>Серая кора</li><li>Поверхностная корневая система</li></ul>`},
            {title: 'Хвоя', content: `<p class="species-gallery__tab-text">Хвоя ели короткая и колючая.</p><ul class="species-gallery__tab-list"><li>Длина 1-2 см</li><li>Четырёхгранная в сечении</li><li>Колючая</li><li>Держится 5-7 лет</li><li>Тёмно-зелёная</li><li>Расположена спирально</li></ul>`},
            {title: 'Шишки', content: `<p class="species-gallery__tab-text">Шишки ели висячие, цилиндрические.</p><ul class="species-gallery__tab-list"><li>Длина 5-15 см</li><li>Висячие</li><li>Созревают за один год</li><li>Раскрываются зимой</li><li>Семена с крылышком</li><li>Плодоносит с 15-20 лет</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Ель образует темнохвойные леса.</p><ul class="species-gallery__tab-list"><li>Темнохвойная тайга</li><li>Смешанные леса</li><li>Предпочитает влажные почвы</li><li>Теневынослива</li><li>Не любит заболачивания</li><li>Растёт в долинах рек</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Ель размножается семенами.</p><ul class="species-gallery__tab-list"><li>Цветёт в мае-июне</li><li>Опыляется ветром</li><li>Шишки созревают осенью</li><li>Семена разносятся ветром</li><li>Урожайные годы раз в 3-5 лет</li><li>Может размножаться отводками</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Ель создаёт особый микроклимат.</p><ul class="species-gallery__tab-list"><li>Создаёт густую тень</li><li>Под елью мало растений</li><li>Подкисляет почву</li><li>Дом для многих животных</li><li>Семена — корм для птиц и грызунов</li><li>Ветровальна из-за корней</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Ель — важная лесообразующая порода.</p><ul class="species-gallery__tab-list"><li>Ценная древесина</li><li>Строительство</li><li>Производство бумаги</li><li>Музыкальные инструменты</li><li>Новогодние ёлки</li><li>Хвоя для витаминной муки</li></ul>`},
            {title: 'Древесина', content: `<p class="species-gallery__tab-text">Древесина ели лёгкая и прочная.</p><ul class="species-gallery__tab-list"><li>Белая с желтоватым оттенком</li><li>Мягкая, лёгкая</li><li>Хорошо обрабатывается</li><li>Резонансная древесина</li><li>Используется в строительстве</li><li>Производство бумаги</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Ель используется в народной медицине.</p><ul class="species-gallery__tab-list"><li>Хвоя богата витамином C</li><li>Эфирное масло</li><li>Смола (живица)</li><li>Почки — отхаркивающее</li><li>Хвойные ванны</li><li>Антисептические свойства</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности ели.</p><ul class="species-gallery__tab-list"><li>Символ Нового года</li><li>Из ели делают скрипки</li><li>Может дожить до 600 лет</li><li>Корни на поверхности</li><li>Не любит городской воздух</li><li>Шишки раскрываются в мороз</li></ul>`}
        ]
    },
    'fir': {
        name: 'Пихта',
        latin: 'Abies sibirica',
        image: 'assets/images/priroda/flora_fauna/flora/fir.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Пихта сибирская — вечнозелёное хвойное дерево с ароматной хвоей.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 30 м</li><li><strong>Диаметр ствола:</strong> до 80 см</li><li><strong>Продолжительность жизни:</strong> 150-200 лет</li><li><strong>Семейство:</strong> Сосновые</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Пихта — стройное дерево с узкой кроной.</p><ul class="species-gallery__tab-list"><li>Узкая конусовидная крона</li><li>Ветви горизонтальные</li><li>Тёмно-зелёная хвоя</li><li>Гладкая серая кора</li><li>Смоляные желваки на коре</li><li>Глубокая корневая система</li></ul>`},
            {title: 'Хвоя', content: `<p class="species-gallery__tab-text">Хвоя пихты мягкая и ароматная.</p><ul class="species-gallery__tab-list"><li>Длина 2-3 см</li><li>Плоская</li><li>Мягкая, не колючая</li><li>Держится 7-10 лет</li><li>Тёмно-зелёная сверху</li><li>Две белые полоски снизу</li></ul>`},
            {title: 'Шишки', content: `<p class="species-gallery__tab-text">Шишки пихты стоят вертикально.</p><ul class="species-gallery__tab-list"><li>Длина 5-9 см</li><li>Стоят вертикально</li><li>Созревают за один год</li><li>Рассыпаются на дереве</li><li>Семена с крылышком</li><li>Плодоносит с 30-40 лет</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Пихта образует темнохвойные леса.</p><ul class="species-gallery__tab-list"><li>Темнохвойная тайга</li><li>Смешанные леса</li><li>Предпочитает влажные почвы</li><li>Очень теневынослива</li><li>Не переносит заболачивания</li><li>Растёт в горах</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Пихта размножается семенами.</p><ul class="species-gallery__tab-list"><li>Цветёт в мае-июне</li><li>Опыляется ветром</li><li>Шишки созревают осенью</li><li>Семена разносятся ветром</li><li>Урожайные годы раз в 2-3 года</li><li>Может размножаться отводками</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Пихта — важный компонент тайги.</p><ul class="species-gallery__tab-list"><li>Самая теневыносливая порода</li><li>Создаёт густую тень</li><li>Улучшает почву</li><li>Дом для многих животных</li><li>Семена — корм для птиц</li><li>Ветроустойчива</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Пихта имеет разностороннее применение.</p><ul class="species-gallery__tab-list"><li>Древесина для строительства</li><li>Производство бумаги</li><li>Пихтовое масло</li><li>Живица (бальзам)</li><li>Новогодние ёлки</li><li>Лапник для укрытия растений</li></ul>`},
            {title: 'Пихтовое масло', content: `<p class="species-gallery__tab-text">Пихтовое масло — ценный продукт.</p><ul class="species-gallery__tab-list"><li>Получают из хвои</li><li>Сильный хвойный аромат</li><li>Антисептические свойства</li><li>Используется в медицине</li><li>Парфюмерия</li><li>Ароматерапия</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Пихта широко используется в медицине.</p><ul class="species-gallery__tab-list"><li>Хвоя богата витамином C</li><li>Эфирное масло</li><li>Живица (пихтовый бальзам)</li><li>Противовоспалительное</li><li>Отхаркивающее</li><li>Ранозаживляющее</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности пихты.</p><ul class="species-gallery__tab-list"><li>Шишки не падают, а рассыпаются</li><li>Самая теневыносливая хвойная</li><li>Живица не застывает</li><li>Хвоя мягкая, не колется</li><li>Очищает воздух</li><li>Символ чистоты тайги</li></ul>`}
        ]
    },
    'aspen': {
        name: 'Осина',
        latin: 'Populus tremula',
        image: 'assets/images/priroda/flora_fauna/flora/aspen.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Осина — быстрорастущее лиственное дерево с дрожащими листьями.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 35 м</li><li><strong>Диаметр ствола:</strong> до 1 м</li><li><strong>Продолжительность жизни:</strong> 80-100 лет</li><li><strong>Семейство:</strong> Ивовые</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Осина — стройное дерево с гладкой корой.</p><ul class="species-gallery__tab-list"><li>Прямой ствол</li><li>Гладкая зеленовато-серая кора</li><li>Округлые листья</li><li>Длинные черешки</li><li>Осенью листья жёлтые</li><li>Мощная корневая система</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья осины дрожат от малейшего ветерка.</p><ul class="species-gallery__tab-list"><li>Округлые, 3-7 см</li><li>Длинный сплюснутый черешок</li><li>Дрожат на ветру</li><li>Зубчатый край</li><li>Осенью жёлтые или красные</li><li>Опадают поздно</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Осина цветёт ранней весной.</p><ul class="species-gallery__tab-list"><li>Цветёт в апреле-мае</li><li>До распускания листьев</li><li>Серёжки</li><li>Двудомное растение</li><li>Опыляется ветром</li><li>Семена с пухом</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Осина растёт в различных условиях.</p><ul class="species-gallery__tab-list"><li>Смешанные леса</li><li>Вырубки</li><li>Гари</li><li>Берега рек</li><li>Влажные почвы</li><li>Образует чистые осинники</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Осина размножается семенами и корневыми отпрысками.</p><ul class="species-gallery__tab-list"><li>Семена созревают в июне</li><li>Разносятся ветром</li><li>Корневые отпрыски</li><li>Быстро заселяет вырубки</li><li>Образует клоны</li><li>Пионерная порода</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Осина — важная лесообразующая порода.</p><ul class="species-gallery__tab-list"><li>Быстро растёт</li><li>Улучшает почву</li><li>Корм для многих животных</li><li>Кору едят зайцы, лоси</li><li>Дом для дятлов</li><li>Подготавливает почву для хвойных</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Осина имеет разностороннее применение.</p><ul class="species-gallery__tab-list"><li>Древесина для спичек</li><li>Производство бумаги</li><li>Строительство</li><li>Корм для скота</li><li>Кора для дубления</li><li>Дрова</li></ul>`},
            {title: 'Древесина', content: `<p class="species-gallery__tab-text">Древесина осины лёгкая и мягкая.</p><ul class="species-gallery__tab-list"><li>Белая</li><li>Мягкая, лёгкая</li><li>Не трескается</li><li>Не коробится</li><li>Хорошо обрабатывается</li><li>Используется для спичек</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Осина используется в народной медицине.</p><ul class="species-gallery__tab-list"><li>Кора — противовоспалительное</li><li>Почки — жаропонижающее</li><li>Листья — ранозаживляющее</li><li>Содержит салицин</li><li>Противомикробное</li><li>Желчегонное</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности осины.</p><ul class="species-gallery__tab-list"><li>Листья дрожат из-за черешка</li><li>Быстро заселяет вырубки</li><li>Может размножаться корнями</li><li>Живёт до 150 лет</li><li>Герой многих легенд</li><li>Осиновый кол против вампиров</li></ul>`}
        ]
    },
    'poplar': {
        name: 'Тополь',
        latin: 'Populus',
        image: 'assets/images/priroda/flora_fauna/flora/poplar.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Тополь — быстрорастущее лиственное дерево.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 40 м</li><li><strong>Диаметр ствола:</strong> до 2 м</li><li><strong>Продолжительность жизни:</strong> 60-80 лет</li><li><strong>Семейство:</strong> Ивовые</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Тополь — мощное дерево с раскидистой кроной.</p><ul class="species-gallery__tab-list"><li>Прямой ствол</li><li>Серая трещиноватая кора</li><li>Раскидистая крона</li><li>Треугольные или овальные листья</li><li>Осенью листья жёлтые</li><li>Мощные корни</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья тополя крупные и разнообразные.</p><ul class="species-gallery__tab-list"><li>Треугольные или овальные</li><li>Длина 5-12 см</li><li>Блестящие</li><li>Зубчатый край</li><li>Осенью жёлтые</li><li>Шелестят на ветру</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Тополь цветёт ранней весной.</p><ul class="species-gallery__tab-list"><li>Цветёт в апреле-мае</li><li>До распускания листьев</li><li>Серёжки</li><li>Двудомное растение</li><li>Опыляется ветром</li><li>Семена с пухом (тополиный пух)</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Тополь растёт в долинах рек.</p><ul class="species-gallery__tab-list"><li>Берега рек</li><li>Поймы</li><li>Влажные почвы</li><li>Парки и аллеи</li><li>Светолюбив</li><li>Быстро растёт</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Тополь размножается семенами и черенками.</p><ul class="species-gallery__tab-list"><li>Семена созревают в июне</li><li>Разносятся ветром (пух)</li><li>Черенки легко укореняются</li><li>Корневые отпрыски</li><li>Быстро растёт</li><li>Пионерная порода</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Тополь — важное дерево для экологии.</p><ul class="species-gallery__tab-list"><li>Очищает воздух</li><li>Поглощает CO2</li><li>Выделяет много кислорода</li><li>Укрепляет берега</li><li>Быстро растёт</li><li>Улучшает микроклимат</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Тополь широко используется человеком.</p><ul class="species-gallery__tab-list"><li>Озеленение городов</li><li>Древесина для бумаги</li><li>Спички</li><li>Тара</li><li>Строительство</li><li>Ветрозащитные полосы</li></ul>`},
            {title: 'Древесина', content: `<p class="species-gallery__tab-text">Древесина тополя лёгкая и мягкая.</p><ul class="species-gallery__tab-list"><li>Белая</li><li>Мягкая, лёгкая</li><li>Хорошо обрабатывается</li><li>Не трескается</li><li>Производство бумаги</li><li>Тара и упаковка</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Тополь используется в медицине.</p><ul class="species-gallery__tab-list"><li>Почки — противовоспалительное</li><li>Кора — жаропонижающее</li><li>Содержит салицин</li><li>Антисептическое</li><li>Ранозаживляющее</li><li>Мочегонное</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности тополя.</p><ul class="species-gallery__tab-list"><li>Самое быстрорастущее дерево</li><li>Тополиный пух — семена</li><li>Очищает воздух лучше других</li><li>Может вырасти на 2 м за год</li><li>Живёт до 150 лет</li><li>Символ стойкости</li></ul>`}
        ]
    },
    'rowan': {
        name: 'Рябина',
        latin: 'Sorbus aucuparia',
        image: 'assets/images/priroda/flora_fauna/flora/rowan.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Рябина — небольшое дерево с яркими красными ягодами.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 15 м</li><li><strong>Диаметр ствола:</strong> до 40 см</li><li><strong>Продолжительность жизни:</strong> 80-100 лет</li><li><strong>Семейство:</strong> Розовые</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Рябина — изящное дерево с ажурной кроной.</p><ul class="species-gallery__tab-list"><li>Стройный ствол</li><li>Гладкая серая кора</li><li>Ажурная крона</li><li>Непарноперистые листья</li><li>Осенью листья красные</li><li>Яркие красные ягоды</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья рябины сложные, перистые.</p><ul class="species-gallery__tab-list"><li>Непарноперистые</li><li>9-15 листочков</li><li>Зубчатый край</li><li>Тёмно-зелёные</li><li>Осенью красные или оранжевые</li><li>Опадают поздно</li></ul>`},
            {title: 'Цветение и плоды', content: `<p class="species-gallery__tab-text">Рябина цветёт белыми щитками.</p><ul class="species-gallery__tab-list"><li>Цветёт в мае-июне</li><li>Белые щитковидные соцветия</li><li>Сильный запах</li><li>Ягоды созревают в сентябре</li><li>Красные или оранжевые</li><li>Висят всю зиму</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Рябина растёт в различных условиях.</p><ul class="species-gallery__tab-list"><li>Смешанные леса</li><li>Опушки</li><li>Берега рек</li><li>Парки и сады</li><li>Неприхотлива</li><li>Морозостойка</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Рябина размножается семенами и порослью.</p><ul class="species-gallery__tab-list"><li>Семена в ягодах</li><li>Разносятся птицами</li><li>Корневая поросль</li><li>Отводки</li><li>Прививка</li><li>Плодоносит с 5-7 лет</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Рябина — важное дерево для птиц.</p><ul class="species-gallery__tab-list"><li>Корм для птиц зимой</li><li>Медонос</li><li>Декоративна</li><li>Улучшает почву</li><li>Морозостойка</li><li>Неприхотлива</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Рябина имеет разностороннее применение.</p><ul class="species-gallery__tab-list"><li>Ягоды съедобны</li><li>Варенье, компоты</li><li>Настойки</li><li>Декоративное дерево</li><li>Древесина для поделок</li><li>Медонос</li></ul>`},
            {title: 'Ягоды', content: `<p class="species-gallery__tab-text">Ягоды рябины богаты витаминами.</p><ul class="species-gallery__tab-list"><li>Богаты витамином C</li><li>Каротин</li><li>Горьковатый вкус</li><li>После заморозков слаще</li><li>Сушат и замораживают</li><li>Лечебные свойства</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Рябина широко используется в медицине.</p><ul class="species-gallery__tab-list"><li>Ягоды — поливитаминное</li><li>Мочегонное</li><li>Желчегонное</li><li>Противовоспалительное</li><li>Кровоостанавливающее</li><li>Укрепляет иммунитет</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности рябины.</p><ul class="species-gallery__tab-list"><li>Символ счастья и защиты</li><li>Ягоды висят всю зиму</li><li>Спасает птиц от голода</li><li>Древесина очень твёрдая</li><li>Герой народных песен</li><li>Может жить 200 лет</li></ul>`}
        ]
    },
    'alder': {
        name: 'Ольха',
        latin: 'Alnus',
        image: 'assets/images/priroda/flora_fauna/flora/alder.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Ольха — лиственное дерево, растущее у воды.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 25 м</li><li><strong>Диаметр ствола:</strong> до 60 см</li><li><strong>Продолжительность жизни:</strong> 80-100 лет</li><li><strong>Семейство:</strong> Берёзовые</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Ольха — дерево с тёмной корой.</p><ul class="species-gallery__tab-list"><li>Прямой ствол</li><li>Тёмно-серая кора</li><li>Округлая крона</li><li>Овальные листья</li><li>Осенью листья зелёные</li><li>Клубеньки на корнях</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья ольхи остаются зелёными до опадения.</p><ul class="species-gallery__tab-list"><li>Овальные, 4-9 см</li><li>Зубчатый край</li><li>Тёмно-зелёные</li><li>Не меняют цвет осенью</li><li>Опадают зелёными</li><li>Клейкие весной</li></ul>`},
            {title: 'Цветение и плоды', content: `<p class="species-gallery__tab-text">Ольха цветёт ранней весной.</p><ul class="species-gallery__tab-list"><li>Цветёт в марте-апреле</li><li>До распускания листьев</li><li>Серёжки</li><li>Однодомное растение</li><li>Опыляется ветром</li><li>Шишечки с семенами</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Ольха растёт на влажных почвах.</p><ul class="species-gallery__tab-list"><li>Берега рек и озёр</li><li>Болота</li><li>Влажные леса</li><li>Овраги</li><li>Переносит затопление</li><li>Образует ольшаники</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Ольха размножается семенами и порослью.</p><ul class="species-gallery__tab-list"><li>Семена созревают осенью</li><li>Разносятся ветром и водой</li><li>Корневая поросль</li><li>Пневая поросль</li><li>Быстро растёт</li><li>Плодоносит с 8-10 лет</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Ольха улучшает почву.</p><ul class="species-gallery__tab-list"><li>Фиксирует азот из воздуха</li><li>Обогащает почву</li><li>Укрепляет берега</li><li>Осушает болота</li><li>Дом для многих животных</li><li>Листья быстро перегнивают</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Ольха имеет разностороннее применение.</p><ul class="species-gallery__tab-list"><li>Древесина для мебели</li><li>Не гниёт в воде</li><li>Дрова</li><li>Кора для дубления</li><li>Краситель</li><li>Лекарственное сырьё</li></ul>`},
            {title: 'Древесина', content: `<p class="species-gallery__tab-text">Древесина ольхи лёгкая и мягкая.</p><ul class="species-gallery__tab-list"><li>Красноватая</li><li>Мягкая, лёгкая</li><li>Хорошо обрабатывается</li><li>Не гниёт в воде</li><li>Используется для мебели</li><li>Имитирует ценные породы</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Ольха используется в медицине.</p><ul class="species-gallery__tab-list"><li>Шишки — вяжущее</li><li>Кора — противовоспалительное</li><li>Листья — потогонное</li><li>Лечит диарею</li><li>Кровоостанавливающее</li><li>Антисептическое</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности ольхи.</p><ul class="species-gallery__tab-list"><li>Древесина краснеет на воздухе</li><li>Не гниёт в воде</li><li>Фиксирует азот как бобовые</li><li>Листья опадают зелёными</li><li>Венеция стоит на ольховых сваях</li><li>Может жить 300 лет</li></ul>`}
        ]
    },
    'willow': {
        name: 'Ива',
        latin: 'Salix',
        image: 'assets/images/priroda/flora_fauna/flora/willow.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Ива — дерево или кустарник, растущий у воды.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 15 м</li><li><strong>Диаметр ствола:</strong> до 50 см</li><li><strong>Продолжительность жизни:</strong> 50-70 лет</li><li><strong>Семейство:</strong> Ивовые</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Ива — дерево с плакучими ветвями.</p><ul class="species-gallery__tab-list"><li>Искривлённый ствол</li><li>Серая кора</li><li>Плакучие ветви</li><li>Узкие длинные листья</li><li>Осенью листья жёлтые</li><li>Мощные корни</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья ивы узкие и длинные.</p><ul class="species-gallery__tab-list"><li>Узкие, ланцетные</li><li>Длина 5-15 см</li><li>Серебристые снизу</li><li>Цельный край</li><li>Осенью жёлтые</li><li>Опадают поздно</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Ива цветёт ранней весной.</p><ul class="species-gallery__tab-list"><li>Цветёт в апреле-мае</li><li>До распускания листьев</li><li>Серёжки (котики)</li><li>Двудомное растение</li><li>Опыляется насекомыми</li><li>Ранний медонос</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Ива растёт у воды.</p><ul class="species-gallery__tab-list"><li>Берега рек и озёр</li><li>Болота</li><li>Влажные луга</li><li>Овраги</li><li>Переносит затопление</li><li>Образует ивняки</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Ива легко размножается черенками.</p><ul class="species-gallery__tab-list"><li>Семена с пухом</li><li>Разносятся ветром</li><li>Черенки легко укореняются</li><li>Корневая поросль</li><li>Отводки</li><li>Быстро растёт</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Ива — важное растение для экосистем.</p><ul class="species-gallery__tab-list"><li>Укрепляет берега</li><li>Ранний медонос</li><li>Корм для животных</li><li>Кору едят зайцы, лоси</li><li>Дом для птиц</li><li>Очищает воду</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Ива имеет разностороннее применение.</p><ul class="species-gallery__tab-list"><li>Плетение корзин</li><li>Укрепление берегов</li><li>Декоративное дерево</li><li>Дрова</li><li>Кора для дубления</li><li>Лекарственное сырьё</li></ul>`},
            {title: 'Прутья', content: `<p class="species-gallery__tab-text">Ивовые прутья используются для плетения.</p><ul class="species-gallery__tab-list"><li>Гибкие и прочные</li><li>Легко обрабатываются</li><li>Корзины, мебель</li><li>Изгороди</li><li>Традиционное ремесло</li><li>Экологичный материал</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Ива — источник аспирина.</p><ul class="species-gallery__tab-list"><li>Кора содержит салицин</li><li>Жаропонижающее</li><li>Противовоспалительное</li><li>Обезболивающее</li><li>Основа аспирина</li><li>Вяжущее</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности ивы.</p><ul class="species-gallery__tab-list"><li>Из коры получен аспирин</li><li>Черенок легко укореняется</li><li>Символ грусти и печали</li><li>Плакучая ива — декоративна</li><li>Может жить 100 лет</li><li>Герой многих легенд</li></ul>`}
        ]
    },
    'currant': {
        name: 'Смородина',
        latin: 'Ribes',
        image: 'assets/images/priroda/flora_fauna/flora/currant.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Смородина — кустарник с ароматными ягодами.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 2 м</li><li><strong>Продолжительность жизни:</strong> 15-20 лет</li><li><strong>Семейство:</strong> Крыжовниковые</li><li><strong>Виды:</strong> Чёрная, красная</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Смородина — раскидистый кустарник.</p><ul class="species-gallery__tab-list"><li>Многоствольный кустарник</li><li>Серая кора</li><li>Пальчатые листья</li><li>Ароматные листья</li><li>Кисти ягод</li><li>Чёрные или красные ягоды</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья смородины ароматные.</p><ul class="species-gallery__tab-list"><li>Пальчатые, 3-5 лопастей</li><li>Зубчатый край</li><li>Тёмно-зелёные</li><li>Сильный аромат</li><li>Осенью жёлтые или красные</li><li>Используются для чая</li></ul>`},
            {title: 'Цветение и плоды', content: `<p class="species-gallery__tab-text">Смородина цветёт весной.</p><ul class="species-gallery__tab-list"><li>Цветёт в мае</li><li>Кисти цветков</li><li>Медонос</li><li>Ягоды созревают в июле</li><li>Чёрные или красные</li><li>Кислые или кисло-сладкие</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Смородина растёт во влажных местах.</p><ul class="species-gallery__tab-list"><li>Берега рек</li><li>Влажные леса</li><li>Овраги</li><li>Опушки</li><li>Сады</li><li>Теневынослива</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Смородина легко размножается.</p><ul class="species-gallery__tab-list"><li>Семенами</li><li>Черенками</li><li>Отводками</li><li>Делением куста</li><li>Быстро растёт</li><li>Плодоносит с 2-3 лет</li></ul>`},
            {title: 'Ягоды', content: `<p class="species-gallery__tab-text">Ягоды смородины очень полезны.</p><ul class="species-gallery__tab-list"><li>Богаты витамином C</li><li>Чёрная — больше витаминов</li><li>Красная — больше кислот</li><li>Едят свежими</li><li>Варенье, компоты</li><li>Заморозка</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Смородина — ценная ягодная культура.</p><ul class="species-gallery__tab-list"><li>Ягоды съедобны</li><li>Варенье, джемы</li><li>Соки, компоты</li><li>Листья для чая</li><li>Медонос</li><li>Декоративный кустарник</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Смородина важна для экосистемы.</p><ul class="species-gallery__tab-list"><li>Корм для птиц</li><li>Медонос</li><li>Укрепляет почву</li><li>Дом для насекомых</li><li>Неприхотлива</li><li>Морозостойка</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Смородина используется в медицине.</p><ul class="species-gallery__tab-list"><li>Ягоды — поливитаминное</li><li>Листья — противовоспалительное</li><li>Мочегонное</li><li>Потогонное</li><li>Укрепляет иммунитет</li><li>Лечит простуду</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности смородины.</p><ul class="species-gallery__tab-list"><li>Чёрная смородина — рекордсмен по витамину C</li><li>Листья ароматнее ягод</li><li>Используется в парфюмерии</li><li>Может расти в тени</li><li>Популярна в садах</li><li>Символ лета</li></ul>`}
        ]
    },
    'rose-hip': {
        name: 'Шиповник',
        latin: 'Rosa',
        image: 'assets/images/priroda/flora_fauna/flora/rose-hip.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Шиповник — колючий кустарник с целебными плодами.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 3 м</li><li><strong>Продолжительность жизни:</strong> 30-50 лет</li><li><strong>Семейство:</strong> Розовые</li><li><strong>Виды:</strong> Более 10 видов</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Шиповник — кустарник с шипами.</p><ul class="species-gallery__tab-list"><li>Прямостоячие ветви</li><li>Покрыт шипами</li><li>Непарноперистые листья</li><li>Розовые цветки</li><li>Красные плоды</li><li>Образует заросли</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья шиповника сложные.</p><ul class="species-gallery__tab-list"><li>Непарноперистые</li><li>5-7 листочков</li><li>Зубчатый край</li><li>Тёмно-зелёные</li><li>Осенью красные</li><li>Опадают поздно</li></ul>`},
            {title: 'Цветение и плоды', content: `<p class="species-gallery__tab-text">Шиповник цветёт летом.</p><ul class="species-gallery__tab-list"><li>Цветёт в июне-июле</li><li>Розовые или белые цветки</li><li>Приятный аромат</li><li>Плоды созревают в сентябре</li><li>Красные или оранжевые</li><li>Висят всю зиму</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Шиповник растёт в различных условиях.</p><ul class="species-gallery__tab-list"><li>Опушки лесов</li><li>Берега рек</li><li>Овраги</li><li>Луга</li><li>Обочины дорог</li><li>Неприхотлив</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Шиповник размножается семенами и отпрысками.</p><ul class="species-gallery__tab-list"><li>Семена в плодах</li><li>Разносятся птицами</li><li>Корневые отпрыски</li><li>Черенки</li><li>Отводки</li><li>Образует заросли</li></ul>`},
            {title: 'Плоды', content: `<p class="species-gallery__tab-text">Плоды шиповника — кладезь витаминов.</p><ul class="species-gallery__tab-list"><li>Рекордсмен по витамину C</li><li>Каротин, витамины группы B</li><li>Собирают до заморозков</li><li>Сушат</li><li>Отвары, настои</li><li>Сироп, варенье</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Шиповник — ценное лекарственное растение.</p><ul class="species-gallery__tab-list"><li>Плоды — лекарственное сырьё</li><li>Витаминные препараты</li><li>Масло из семян</li><li>Декоративный кустарник</li><li>Медонос</li><li>Живые изгороди</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Шиповник важен для экосистемы.</p><ul class="species-gallery__tab-list"><li>Корм для птиц зимой</li><li>Медонос</li><li>Укрепляет склоны</li><li>Дом для птиц</li><li>Морозостойкий</li><li>Засухоустойчивый</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Шиповник — природная аптека.</p><ul class="species-gallery__tab-list"><li>Плоды — поливитаминное</li><li>Укрепляет иммунитет</li><li>Желчегонное</li><li>Мочегонное</li><li>Противовоспалительное</li><li>Масло — ранозаживляющее</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности шиповника.</p><ul class="species-gallery__tab-list"><li>В 50 раз больше витамина C, чем в лимоне</li><li>Предок всех роз</li><li>Плоды висят всю зиму</li><li>Спасает птиц от голода</li><li>Символ здоровья</li><li>Может жить 400 лет</li></ul>`}
        ]
    },
    'bird-cherry': {
        name: 'Черёмуха',
        latin: 'Prunus padus',
        image: 'assets/images/priroda/flora_fauna/flora/bird-cherry.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Черёмуха — дерево или кустарник с ароматными цветками.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 10 м</li><li><strong>Диаметр ствола:</strong> до 40 см</li><li><strong>Продолжительность жизни:</strong> 60-80 лет</li><li><strong>Семейство:</strong> Розовые</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Черёмуха — изящное дерево.</p><ul class="species-gallery__tab-list"><li>Стройный ствол</li><li>Тёмно-серая кора</li><li>Раскидистая крона</li><li>Овальные листья</li><li>Белые кисти цветков</li><li>Чёрные ягоды</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья черёмухи простые.</p><ul class="species-gallery__tab-list"><li>Овальные, 6-12 см</li><li>Зубчатый край</li><li>Тёмно-зелёные</li><li>Блестящие</li><li>Осенью жёлтые или красные</li><li>Опадают рано</li></ul>`},
            {title: 'Цветение и плоды', content: `<p class="species-gallery__tab-text">Черёмуха цветёт весной.</p><ul class="species-gallery__tab-list"><li>Цветёт в мае-июне</li><li>Белые кисти цветков</li><li>Сильный аромат</li><li>Медонос</li><li>Ягоды созревают в июле-августе</li><li>Чёрные, терпкие</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Черёмуха растёт у воды.</p><ul class="species-gallery__tab-list"><li>Берега рек</li><li>Влажные леса</li><li>Овраги</li><li>Опушки</li><li>Парки и сады</li><li>Теневынослива</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Черёмуха размножается семенами и порослью.</p><ul class="species-gallery__tab-list"><li>Семена в ягодах</li><li>Разносятся птицами</li><li>Корневая поросль</li><li>Черенки</li><li>Отводки</li><li>Быстро растёт</li></ul>`},
            {title: 'Ягоды', content: `<p class="species-gallery__tab-text">Ягоды черёмухи терпкие и вяжущие.</p><ul class="species-gallery__tab-list"><li>Чёрные, блестящие</li><li>Терпкий вкус</li><li>Вяжущие</li><li>Едят свежими</li><li>Варенье, компоты</li><li>Сушат</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Черёмуха имеет разностороннее применение.</p><ul class="species-gallery__tab-list"><li>Ягоды съедобны</li><li>Варенье, компоты</li><li>Мука из сушёных ягод</li><li>Декоративное дерево</li><li>Медонос</li><li>Древесина для поделок</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Черёмуха важна для экосистемы.</p><ul class="species-gallery__tab-list"><li>Ранний медонос</li><li>Корм для птиц</li><li>Фитонциды очищают воздух</li><li>Дом для насекомых</li><li>Декоративна</li><li>Морозостойка</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Черёмуха используется в медицине.</p><ul class="species-gallery__tab-list"><li>Ягоды — вяжущее</li><li>Кора — жаропонижающее</li><li>Цветки — противовоспалительное</li><li>Лечит диарею</li><li>Антисептическое</li><li>Витаминное</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности черёмухи.</p><ul class="species-gallery__tab-list"><li>Аромат цветков очищает воздух</li><li>Фитонциды убивают микробов</li><li>Символ весны</li><li>Герой народных песен</li><li>Может жить 100 лет</li><li>Косточки ядовиты</li></ul>`}
        ]
    },
    'juniper': {
        name: 'Можжевельник',
        latin: 'Juniperus',
        image: 'assets/images/priroda/flora_fauna/flora/juniper.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Можжевельник — вечнозелёный хвойный кустарник.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 3 м</li><li><strong>Продолжительность жизни:</strong> 200-600 лет</li><li><strong>Семейство:</strong> Кипарисовые</li><li><strong>Виды:</strong> Обыкновенный, сибирский</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Можжевельник — кустарник с игольчатой хвоей.</p><ul class="species-gallery__tab-list"><li>Раскидистый или колонновидный</li><li>Красно-бурая кора</li><li>Игольчатая хвоя</li><li>Сизо-зелёная окраска</li><li>Шишкоягоды</li><li>Ароматный</li></ul>`},
            {title: 'Хвоя', content: `<p class="species-gallery__tab-text">Хвоя можжевельника игольчатая.</p><ul class="species-gallery__tab-list"><li>Длина 1-2 см</li><li>Игольчатая, колючая</li><li>Держится 3-4 года</li><li>Сизо-зелёная</li><li>Белая полоска сверху</li><li>Сильный аромат</li></ul>`},
            {title: 'Шишкоягоды', content: `<p class="species-gallery__tab-text">Плоды можжевельника — шишкоягоды.</p><ul class="species-gallery__tab-list"><li>Диаметр 6-9 мм</li><li>Созревают 2 года</li><li>Сначала зелёные, потом сине-чёрные</li><li>Сизый налёт</li><li>Сладковатые</li><li>Используются как пряность</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Можжевельник растёт в различных условиях.</p><ul class="species-gallery__tab-list"><li>Сосновые леса</li><li>Опушки</li><li>Склоны</li><li>Скалы</li><li>Светолюбив</li><li>Неприхотлив</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Можжевельник размножается семенами.</p><ul class="species-gallery__tab-list"><li>Семена в шишкоягодах</li><li>Разносятся птицами</li><li>Прорастают через 2-3 года</li><li>Черенки</li><li>Отводки</li><li>Растёт медленно</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Можжевельник очищает воздух.</p><ul class="species-gallery__tab-list"><li>Выделяет фитонциды</li><li>Очищает воздух</li><li>Корм для птиц</li><li>Дом для животных</li><li>Долгожитель</li><li>Индикатор чистоты воздуха</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Можжевельник имеет разностороннее применение.</p><ul class="species-gallery__tab-list"><li>Шишкоягоды — пряность</li><li>Эфирное масло</li><li>Древесина для поделок</li><li>Декоративный кустарник</li><li>Лекарственное сырьё</li><li>Очищает воздух</li></ul>`},
            {title: 'Древесина', content: `<p class="species-gallery__tab-text">Древесина можжевельника ароматная и прочная.</p><ul class="species-gallery__tab-list"><li>Красноватая</li><li>Плотная, прочная</li><li>Ароматная</li><li>Не гниёт</li><li>Поделки, посуда</li><li>Карандаши</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Можжевельник используется в медицине.</p><ul class="species-gallery__tab-list"><li>Шишкоягоды — мочегонное</li><li>Эфирное масло</li><li>Дезинфицирующее</li><li>Отхаркивающее</li><li>Желчегонное</li><li>Ароматерапия</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности можжевельника.</p><ul class="species-gallery__tab-list"><li>Может жить 600 лет</li><li>Один куст очищает воздух на 1 га</li><li>Шишкоягоды созревают 2 года</li><li>Используется для джина</li><li>Символ вечной жизни</li><li>Самое медленнорастущее хвойное</li></ul>`}
        ]
    },
    'dwarf-pine': {
        name: 'Кедровый стланик',
        latin: 'Pinus pumila',
        image: 'assets/images/priroda/flora_fauna/flora/dwarf-pine-Photoroom.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Кедровый стланик — стелющийся хвойный кустарник Севера.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 5 м</li><li><strong>Продолжительность жизни:</strong> 200-300 лет</li><li><strong>Семейство:</strong> Сосновые</li><li><strong>Форма:</strong> Стелющийся кустарник</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Стланик — стелющийся кустарник.</p><ul class="species-gallery__tab-list"><li>Стелющиеся ветви</li><li>Серая кора</li><li>Хвоя в пучках по 5</li><li>Тёмно-зелёная хвоя</li><li>Фиолетовые шишки</li><li>Образует заросли</li></ul>`},
            {title: 'Хвоя', content: `<p class="species-gallery__tab-text">Хвоя стланика короткая.</p><ul class="species-gallery__tab-list"><li>Длина 4-8 см</li><li>В пучках по 5</li><li>Трёхгранная</li><li>Держится 2-3 года</li><li>Тёмно-зелёная</li><li>Сизоватая</li></ul>`},
            {title: 'Шишки и орехи', content: `<p class="species-gallery__tab-text">Шишки стланика мелкие.</p><ul class="species-gallery__tab-list"><li>Длина 4-7 см</li><li>Фиолетовые</li><li>Созревают 2 года</li><li>Орехи мелкие, съедобные</li><li>Плодоносит с 20-30 лет</li><li>Урожайные годы раз в 3-4 года</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Стланик растёт в суровых условиях.</p><ul class="species-gallery__tab-list"><li>Горная тундра</li><li>Лесотундра</li><li>Каменистые склоны</li><li>Верхняя граница леса</li><li>Морозостойкий</li><li>Образует заросли</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Стланик размножается семенами и отводками.</p><ul class="species-gallery__tab-list"><li>Семена в шишках</li><li>Разносятся кедровкой</li><li>Отводки</li><li>Ветви укореняются</li><li>Растёт медленно</li><li>Долгожитель</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Стланик — важное растение тундры.</p><ul class="species-gallery__tab-list"><li>Корм для животных</li><li>Орехи едят птицы, грызуны</li><li>Укрепляет склоны</li><li>Защищает от ветра</li><li>Дом для животных</li><li>Пионер на каменистых склонах</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Стланик используется человеком.</p><ul class="species-gallery__tab-list"><li>Орехи съедобны</li><li>Дрова</li><li>Хвоя для витаминной муки</li><li>Смола</li><li>Декоративный кустарник</li><li>Укрепление склонов</li></ul>`},
            {title: 'Адаптации', content: `<p class="species-gallery__tab-text">Стланик приспособлен к суровым условиям.</p><ul class="species-gallery__tab-list"><li>Стелющаяся форма</li><li>Зимой под снегом</li><li>Выдерживает морозы до -70°C</li><li>Ветви гибкие</li><li>Растёт на камнях</li><li>Долгожитель</li></ul>`},
            {title: 'Орехи', content: `<p class="species-gallery__tab-text">Орехи стланика мелкие, но питательные.</p><ul class="species-gallery__tab-list"><li>Мельче кедровых</li><li>Съедобны</li><li>Питательны</li><li>Богаты маслом</li><li>Корм для животных</li><li>Собирают местные жители</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности стланика.</p><ul class="species-gallery__tab-list"><li>Растёт в самых суровых условиях</li><li>Может жить 1000 лет</li><li>Зимует под снегом</li><li>Ветви укореняются</li><li>Символ Севера</li><li>Самое северное хвойное</li></ul>`}
        ]
    },
    'ledum': {
        name: 'Багульник',
        latin: 'Ledum palustre',
        image: 'assets/images/priroda/flora_fauna/flora/ledum-Photoroom.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Багульник — вечнозелёный кустарник болот с сильным ароматом.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 1,2 м</li><li><strong>Продолжительность жизни:</strong> 30-40 лет</li><li><strong>Семейство:</strong> Вересковые</li><li><strong>Тип:</strong> Вечнозелёный кустарник</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Багульник — невысокий кустарник.</p><ul class="species-gallery__tab-list"><li>Прямостоячие ветви</li><li>Серая кора</li><li>Узкие кожистые листья</li><li>Белые цветки</li><li>Сильный запах</li><li>Образует заросли</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья багульника узкие и ароматные.</p><ul class="species-gallery__tab-list"><li>Узкие, линейные</li><li>Длина 2-5 см</li><li>Кожистые</li><li>Края завёрнуты вниз</li><li>Сверху тёмно-зелёные</li><li>Снизу рыжее опушение</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Багульник цветёт летом.</p><ul class="species-gallery__tab-list"><li>Цветёт в мае-июле</li><li>Белые щитковидные соцветия</li><li>Сильный дурманящий запах</li><li>Медонос</li><li>Коробочки с семенами</li><li>Семена мелкие</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Багульник растёт на болотах.</p><ul class="species-gallery__tab-list"><li>Сфагновые болота</li><li>Заболоченные леса</li><li>Тундра</li><li>Торфяники</li><li>Образует заросли</li><li>Индикатор болот</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Багульник размножается семенами и отводками.</p><ul class="species-gallery__tab-list"><li>Семена в коробочках</li><li>Разносятся ветром</li><li>Отводки</li><li>Ветви укореняются</li><li>Корневые отпрыски</li><li>Растёт медленно</li></ul>`},
            {title: 'Эфирное масло', content: `<p class="species-gallery__tab-text">Багульник содержит эфирное масло.</p><ul class="species-gallery__tab-list"><li>Сильный запах</li><li>Дурманящее действие</li><li>Отпугивает насекомых</li><li>Используется в медицине</li><li>Ядовито в больших дозах</li><li>Вызывает головную боль</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Багульник используется ограниченно.</p><ul class="species-gallery__tab-list"><li>Лекарственное сырьё</li><li>Эфирное масло</li><li>Отпугивает моль</li><li>Дубление кож</li><li>Медонос (мёд ядовит)</li><li>Декоративный кустарник</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Багульник — типичное растение болот.</p><ul class="species-gallery__tab-list"><li>Индикатор болот</li><li>Медонос</li><li>Укрепляет торф</li><li>Дом для насекомых</li><li>Морозостойкий</li><li>Неприхотливый</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Багульник используется в медицине осторожно.</p><ul class="species-gallery__tab-list"><li>Отхаркивающее</li><li>Противокашлевое</li><li>Бактерицидное</li><li>Мочегонное</li><li>ЯДОВИТ в больших дозах</li><li>Только по назначению врача</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности багульника.</p><ul class="species-gallery__tab-list"><li>Запах вызывает головную боль</li><li>Мёд ядовит («пьяный мёд»)</li><li>Отпугивает насекомых</li><li>Символ болот</li><li>Герой песен</li><li>Название от «багулить» — отравлять</li></ul>`}
        ]
    },
    'rhododendron': {
        name: 'Рододендрон',
        latin: 'Rhododendron',
        image: 'assets/images/priroda/flora_fauna/flora/rhododendron.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Рододендрон — красивоцветущий кустарник.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 2 м</li><li><strong>Продолжительность жизни:</strong> 50-100 лет</li><li><strong>Семейство:</strong> Вересковые</li><li><strong>Виды:</strong> Даурский, золотистый</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Рододендрон — раскидистый кустарник.</p><ul class="species-gallery__tab-list"><li>Раскидистые ветви</li><li>Серая кора</li><li>Кожистые листья</li><li>Крупные цветки</li><li>Розовые или жёлтые</li><li>Очень декоративен</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья рододендрона кожистые.</p><ul class="species-gallery__tab-list"><li>Овальные, 2-7 см</li><li>Кожистые</li><li>Тёмно-зелёные</li><li>Блестящие</li><li>Зимующие или опадающие</li><li>Ароматные</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Рододендрон цветёт весной.</p><ul class="species-gallery__tab-list"><li>Цветёт в апреле-июне</li><li>Крупные цветки</li><li>Розовые, фиолетовые, жёлтые</li><li>Собраны в соцветия</li><li>Очень декоративны</li><li>Медонос</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Рододендрон растёт в горах и лесах.</p><ul class="species-gallery__tab-list"><li>Горные леса</li><li>Каменистые склоны</li><li>Тундра</li><li>Светлохвойная тайга</li><li>Кислые почвы</li><li>Образует заросли</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Рододендрон размножается семенами и отводками.</p><ul class="species-gallery__tab-list"><li>Семена в коробочках</li><li>Разносятся ветром</li><li>Отводки</li><li>Черенки</li><li>Деление куста</li><li>Растёт медленно</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Рододендрон важен для экосистемы.</p><ul class="species-gallery__tab-list"><li>Медонос</li><li>Декоративен</li><li>Укрепляет склоны</li><li>Дом для насекомых</li><li>Морозостойкий</li><li>Индикатор кислых почв</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Рододендрон используется человеком.</p><ul class="species-gallery__tab-list"><li>Декоративный кустарник</li><li>Озеленение</li><li>Медонос (мёд ядовит)</li><li>Лекарственное сырьё</li><li>Дубление кож</li><li>Краситель</li></ul>`},
            {title: 'Виды', content: `<p class="species-gallery__tab-text">В крае растут несколько видов.</p><ul class="species-gallery__tab-list"><li>Рододендрон даурский (багульник)</li><li>Рододендрон золотистый</li><li>Рододендрон Адамса</li><li>Различаются цветками</li><li>Все декоративны</li><li>Некоторые ядовиты</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Рододендрон используется в медицине осторожно.</p><ul class="species-gallery__tab-list"><li>Листья — сердечное</li><li>Противовоспалительное</li><li>Мочегонное</li><li>Бактерицидное</li><li>ЯДОВИТ</li><li>Только по назначению врача</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности рододендрона.</p><ul class="species-gallery__tab-list"><li>«Розовое дерево» (перевод)</li><li>Мёд может быть ядовит</li><li>Очень декоративен</li><li>Символ гор</li><li>Может жить 100 лет</li><li>Национальный цветок Непала</li></ul>`}
        ]
    },
    'fireweed': {
        name: 'Иван-чай',
        latin: 'Chamaenerion angustifolium',
        image: 'assets/images/priroda/flora_fauna/flora/fireweed.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Иван-чай — высокое травянистое растение с розовыми цветками.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 2 м</li><li><strong>Продолжительность жизни:</strong> Многолетник</li><li><strong>Семейство:</strong> Кипрейные</li><li><strong>Тип:</strong> Травянистое растение</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Иван-чай — высокое растение.</p><ul class="species-gallery__tab-list"><li>Прямостоячий стебель</li><li>Высота до 2 м</li><li>Узкие ланцетные листья</li><li>Розовые цветки</li><li>Кисть соцветия</li><li>Образует заросли</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья иван-чая узкие.</p><ul class="species-gallery__tab-list"><li>Узкие, ланцетные</li><li>Длина 5-12 см</li><li>Цельнокрайние</li><li>Тёмно-зелёные сверху</li><li>Сизоватые снизу</li><li>Очередные</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Иван-чай цветёт летом.</p><ul class="species-gallery__tab-list"><li>Цветёт в июне-августе</li><li>Розовые или лиловые цветки</li><li>Собраны в кисть</li><li>Медонос</li><li>Коробочки с пухом</li><li>Семена разносятся ветром</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Иван-чай растёт на вырубках и гарях.</p><ul class="species-gallery__tab-list"><li>Вырубки</li><li>Гари</li><li>Опушки</li><li>Обочины дорог</li><li>Луга</li><li>Пионерное растение</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Иван-чай размножается семенами и корневищами.</p><ul class="species-gallery__tab-list"><li>Семена с пухом</li><li>Разносятся ветром</li><li>Корневища</li><li>Быстро заселяет вырубки</li><li>Образует заросли</li><li>Агрессивный вид</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Иван-чай — ценное растение.</p><ul class="species-gallery__tab-list"><li>Копорский чай</li><li>Молодые побеги съедобны</li><li>Корни съедобны</li><li>Медонос</li><li>Лекарственное сырьё</li><li>Декоративное растение</li></ul>`},
            {title: 'Копорский чай', content: `<p class="species-gallery__tab-text">Из иван-чая делают знаменитый копорский чай.</p><ul class="species-gallery__tab-list"><li>Листья ферментируют</li><li>Получается чай</li><li>Без кофеина</li><li>Приятный вкус</li><li>Полезный напиток</li><li>Традиционный русский чай</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Иван-чай — пионер на вырубках.</p><ul class="species-gallery__tab-list"><li>Первым заселяет гари</li><li>Улучшает почву</li><li>Отличный медонос</li><li>Корм для животных</li><li>Декоративен</li><li>Подготавливает почву для леса</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Иван-чай используется в медицине.</p><ul class="species-gallery__tab-list"><li>Противовоспалительное</li><li>Успокаивающее</li><li>Обволакивающее</li><li>Кровоостанавливающее</li><li>Витаминное</li><li>Укрепляет иммунитет</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности иван-чая.</p><ul class="species-gallery__tab-list"><li>Копорский чай экспортировали в Европу</li><li>Конкурировал с индийским чаем</li><li>Первым заселяет гари</li><li>Отличный медонос</li><li>Символ русского чаепития</li><li>Может давать 600 кг мёда с га</li></ul>`}
        ]
    },
    'chamomile': {
        name: 'Ромашка',
        latin: 'Matricaria',
        image: 'assets/images/priroda/flora_fauna/flora/chamomile.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Ромашка — травянистое растение с белыми цветками.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 60 см</li><li><strong>Продолжительность жизни:</strong> Однолетник или многолетник</li><li><strong>Семейство:</strong> Астровые</li><li><strong>Виды:</strong> Аптечная, луговая</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Ромашка — изящное растение.</p><ul class="species-gallery__tab-list"><li>Прямостоячий стебель</li><li>Перисторассечённые листья</li><li>Белые цветки</li><li>Жёлтая серединка</li><li>Приятный запах</li><li>Образует куртины</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья ромашки рассечённые.</p><ul class="species-gallery__tab-list"><li>Перисторассечённые</li><li>Узкие доли</li><li>Очередные</li><li>Тёмно-зелёные</li><li>Ароматные</li><li>Сидячие</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Ромашка цветёт летом.</p><ul class="species-gallery__tab-list"><li>Цветёт в мае-сентябре</li><li>Белые краевые цветки</li><li>Жёлтые трубчатые в центре</li><li>Корзинки</li><li>Приятный запах</li><li>Медонос</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Ромашка растёт на лугах и полях.</p><ul class="species-gallery__tab-list"><li>Луга</li><li>Поля</li><li>Обочины дорог</li><li>Пустыри</li><li>Сады</li><li>Неприхотлива</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Ромашка размножается семенами.</p><ul class="species-gallery__tab-list"><li>Семена в корзинках</li><li>Разносятся ветром</li><li>Самосев</li><li>Быстро растёт</li><li>Обильно цветёт</li><li>Может быть сорняком</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Ромашка — ценное лекарственное растение.</p><ul class="species-gallery__tab-list"><li>Лекарственное сырьё</li><li>Чай из ромашки</li><li>Косметика</li><li>Декоративное растение</li><li>Медонос</li><li>Краситель</li></ul>`},
            {title: 'Виды', content: `<p class="species-gallery__tab-text">Существует несколько видов ромашки.</p><ul class="species-gallery__tab-list"><li>Ромашка аптечная — лекарственная</li><li>Ромашка луговая — декоративная</li><li>Различаются формой корзинки</li><li>Аптечная — полая внутри</li><li>Все ароматные</li><li>Все медоносы</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Ромашка важна для экосистемы.</p><ul class="species-gallery__tab-list"><li>Медонос</li><li>Корм для насекомых</li><li>Декоративна</li><li>Улучшает почву</li><li>Неприхотлива</li><li>Засухоустойчива</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Ромашка — универсальное лекарство.</p><ul class="species-gallery__tab-list"><li>Противовоспалительное</li><li>Спазмолитическое</li><li>Антисептическое</li><li>Успокаивающее</li><li>Ранозаживляющее</li><li>Желчегонное</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности ромашки.</p><ul class="species-gallery__tab-list"><li>Символ России</li><li>Гадают на ромашке</li><li>Одно из древнейших лекарств</li><li>Название от греческого «земляное яблоко»</li><li>Используется в косметике</li><li>Чай из ромашки — популярен во всём мире</li></ul>`}
        ]
    },
    'bellflower': {
        name: 'Колокольчик',
        latin: 'Campanula',
        image: 'assets/images/priroda/flora_fauna/flora/bellflower.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Колокольчик — травянистое растение с синими цветками-колокольчиками.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 70 см</li><li><strong>Продолжительность жизни:</strong> Многолетник</li><li><strong>Семейство:</strong> Колокольчиковые</li><li><strong>Виды:</strong> Более 10 видов</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Колокольчик — изящное растение.</p><ul class="species-gallery__tab-list"><li>Прямостоячий стебель</li><li>Простые листья</li><li>Синие или фиолетовые цветки</li><li>Форма колокольчика</li><li>Собраны в соцветия</li><li>Очень декоративен</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья колокольчика простые.</p><ul class="species-gallery__tab-list"><li>Овальные или ланцетные</li><li>Зубчатый край</li><li>Очередные</li><li>Тёмно-зелёные</li><li>Прикорневая розетка</li><li>Стеблевые мельче</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Колокольчик цветёт летом.</p><ul class="species-gallery__tab-list"><li>Цветёт в июне-августе</li><li>Синие, фиолетовые, белые цветки</li><li>Форма колокольчика</li><li>Собраны в кисти или метёлки</li><li>Медонос</li><li>Коробочки с семенами</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Колокольчик растёт на лугах и опушках.</p><ul class="species-gallery__tab-list"><li>Луга</li><li>Опушки лесов</li><li>Поляны</li><li>Склоны</li><li>Сады</li><li>Неприхотлив</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Колокольчик размножается семенами и делением.</p><ul class="species-gallery__tab-list"><li>Семена в коробочках</li><li>Разносятся ветром</li><li>Самосев</li><li>Деление куста</li><li>Черенки</li><li>Быстро растёт</li></ul>`},
            {title: 'Виды', content: `<p class="species-gallery__tab-text">В крае растут разные виды колокольчиков.</p><ul class="species-gallery__tab-list"><li>Колокольчик круглолистный</li><li>Колокольчик скученный</li><li>Колокольчик широколистный</li><li>Различаются размером и формой</li><li>Все декоративны</li><li>Все медоносы</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Колокольчик используется человеком.</p><ul class="species-gallery__tab-list"><li>Декоративное растение</li><li>Медонос</li><li>Лекарственное сырьё</li><li>Молодые листья съедобны</li><li>Озеленение</li><li>Букеты</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Колокольчик важен для экосистемы.</p><ul class="species-gallery__tab-list"><li>Медонос</li><li>Корм для насекомых</li><li>Декоративен</li><li>Украшает луга</li><li>Неприхотлив</li><li>Морозостойкий</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Колокольчик используется в народной медицине.</p><ul class="species-gallery__tab-list"><li>Противовоспалительное</li><li>Успокаивающее</li><li>Обезболивающее</li><li>Ранозаживляющее</li><li>Отвары для полоскания</li><li>Малоизучен</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности колокольчика.</p><ul class="species-gallery__tab-list"><li>Символ нежности</li><li>Герой сказок и легенд</li><li>Название от формы цветка</li><li>Некоторые виды редкие</li><li>Очень декоративен</li><li>Любим садоводами</li></ul>`}
        ]
    },
    'lily': {
        name: 'Лилия',
        latin: 'Lilium',
        image: 'assets/images/priroda/flora_fauna/flora/lily.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Лилия — луковичное растение с крупными ароматными цветками.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 1,5 м</li><li><strong>Продолжительность жизни:</strong> Многолетник</li><li><strong>Семейство:</strong> Лилейные</li><li><strong>Виды:</strong> Саранка, даурская</li><li><strong>Статус:</strong> Редкий вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Лилия — величественное растение.</p><ul class="species-gallery__tab-list"><li>Прямостоячий стебель</li><li>Узкие листья</li><li>Крупные цветки</li><li>Различной окраски</li><li>Сильный аромат</li><li>Очень декоративна</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья лилии узкие.</p><ul class="species-gallery__tab-list"><li>Узкие, ланцетные</li><li>Очередные или мутовчатые</li><li>Тёмно-зелёные</li><li>Сидячие</li><li>Многочисленные</li><li>Расположены по спирали</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Лилия цветёт летом.</p><ul class="species-gallery__tab-list"><li>Цветёт в июне-августе</li><li>Крупные цветки</li><li>Оранжевые, красные, белые</li><li>Форма воронки или чалмы</li><li>Сильный аромат</li><li>Коробочки с семенами</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Лилия растёт на лугах и опушках.</p><ul class="species-gallery__tab-list"><li>Луга</li><li>Опушки лесов</li><li>Поляны</li><li>Склоны</li><li>Предпочитает плодородные почвы</li><li>Светолюбива</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Лилия размножается луковицами и семенами.</p><ul class="species-gallery__tab-list"><li>Луковицы</li><li>Детки луковиц</li><li>Семена</li><li>Чешуйки луковиц</li><li>Растёт медленно</li><li>Зацветает на 3-5 год</li></ul>`},
            {title: 'Луковица', content: `<p class="species-gallery__tab-text">Луковица лилии состоит из чешуек.</p><ul class="species-gallery__tab-list"><li>Рыхлая луковица</li><li>Мясистые чешуйки</li><li>Белая или жёлтая</li><li>Съедобна</li><li>Зимует в почве</li><li>Образует детки</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Лилия используется человеком.</p><ul class="species-gallery__tab-list"><li>Декоративное растение</li><li>Луковицы съедобны</li><li>Лекарственное сырьё</li><li>Парфюмерия</li><li>Букеты</li><li>Символическое значение</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Лилия нуждается в охране.</p><ul class="species-gallery__tab-list"><li>Редкий вид</li><li>Страдает от сбора</li><li>Медленно размножается</li><li>Декоративна</li><li>Медонос</li><li>Нуждается в охране</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Лилия используется в медицине.</p><ul class="species-gallery__tab-list"><li>Луковицы — ранозаживляющее</li><li>Обезболивающее</li><li>Успокаивающее</li><li>Противовоспалительное</li><li>Используется в народной медицине</li><li>Малоизучена</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности лилии.</p><ul class="species-gallery__tab-list"><li>Символ чистоты и невинности</li><li>Герб Франции</li><li>Луковицы ели в голод</li><li>Очень ароматна</li><li>Занесена в Красную книгу</li><li>Королева цветов</li></ul>`}
        ]
    },
    'orchid': {
        name: 'Орхидея',
        latin: 'Orchidaceae',
        image: 'assets/images/priroda/flora_fauna/flora/orchid.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Орхидея — изящное растение с необычными цветками.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 50 см</li><li><strong>Продолжительность жизни:</strong> Многолетник</li><li><strong>Семейство:</strong> Орхидные</li><li><strong>Виды:</strong> Венерин башмачок, любка</li><li><strong>Статус:</strong> Редкий вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Орхидея — экзотическое растение.</p><ul class="species-gallery__tab-list"><li>Прямостоячий стебель</li><li>Овальные листья</li><li>Необычные цветки</li><li>Различной окраски</li><li>Часто ароматные</li><li>Очень декоративна</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья орхидеи простые.</p><ul class="species-gallery__tab-list"><li>Овальные или ланцетные</li><li>Цельнокрайние</li><li>Тёмно-зелёные</li><li>Блестящие</li><li>Прикорневая розетка</li><li>Стеблевые мельче</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Орхидея цветёт летом.</p><ul class="species-gallery__tab-list"><li>Цветёт в мае-июле</li><li>Необычная форма цветков</li><li>Белые, розовые, жёлтые</li><li>Собраны в колос или кисть</li><li>Часто ароматные</li><li>Коробочки с мелкими семенами</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Орхидея растёт в лесах и на лугах.</p><ul class="species-gallery__tab-list"><li>Леса</li><li>Луга</li><li>Болота</li><li>Требует особых условий</li><li>Симбиоз с грибами</li><li>Редка</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Орхидея размножается сложно.</p><ul class="species-gallery__tab-list"><li>Семена мелкие, пылевидные</li><li>Нужен гриб-симбионт</li><li>Прорастают годами</li><li>Деление корневища</li><li>Растёт очень медленно</li><li>Зацветает через 10-15 лет</li></ul>`},
            {title: 'Симбиоз', content: `<p class="species-gallery__tab-text">Орхидея живёт в симбиозе с грибами.</p><ul class="species-gallery__tab-list"><li>Нужен гриб-симбионт</li><li>Гриб помогает прорастать</li><li>Гриб питает проросток</li><li>Без гриба не выживает</li><li>Сложные отношения</li><li>Поэтому трудно пересадить</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Орхидея используется ограниченно.</p><ul class="species-gallery__tab-list"><li>Декоративное растение</li><li>Охраняется законом</li><li>Сбор запрещён</li><li>Некоторые виды лекарственные</li><li>Символическое значение</li><li>Редкость</li></ul>`},
            {title: 'Охрана', content: `<p class="species-gallery__tab-text">Орхидея нуждается в строгой охране.</p><ul class="species-gallery__tab-list"><li>Занесена в Красную книгу</li><li>Сбор запрещён</li><li>Медленно размножается</li><li>Требует особых условий</li><li>Страдает от сбора</li><li>Исчезающий вид</li></ul>`},
            {title: 'Виды', content: `<p class="species-gallery__tab-text">В крае растут несколько видов орхидей.</p><ul class="species-gallery__tab-list"><li>Венерин башмачок</li><li>Любка двулистная</li><li>Пальчатокоренник</li><li>Все редкие</li><li>Все охраняются</li><li>Все декоративны</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности орхидеи.</p><ul class="species-gallery__tab-list"><li>Самое крупное семейство растений</li><li>Семена как пыль</li><li>Зацветает через 10-15 лет</li><li>Живёт в симбиозе с грибами</li><li>Символ роскоши</li><li>Венерин башмачок — самая редкая</li></ul>`}
        ]
    },
    'globeflower': {
        name: 'Купальница',
        latin: 'Trollius',
        image: 'assets/images/priroda/flora_fauna/flora/globeflower.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Купальница — травянистое растение с шаровидными жёлтыми цветками.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 80 см</li><li><strong>Продолжительность жизни:</strong> Многолетник</li><li><strong>Семейство:</strong> Лютиковые</li><li><strong>Виды:</strong> Европейская, азиатская</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Купальница — яркое растение.</p><ul class="species-gallery__tab-list"><li>Прямостоячий стебель</li><li>Пальчаторассечённые листья</li><li>Шаровидные цветки</li><li>Жёлтые или оранжевые</li><li>Очень декоративна</li><li>Образует куртины</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья купальницы рассечённые.</p><ul class="species-gallery__tab-list"><li>Пальчаторассечённые</li><li>5-7 долей</li><li>Зубчатый край</li><li>Тёмно-зелёные</li><li>Прикорневая розетка</li><li>Стеблевые мельче</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Купальница цветёт в начале лета.</p><ul class="species-gallery__tab-list"><li>Цветёт в мае-июне</li><li>Шаровидные цветки</li><li>Жёлтые или оранжевые</li><li>Диаметр 3-5 см</li><li>Слабый аромат</li><li>Листовки с семенами</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Купальница растёт на влажных лугах.</p><ul class="species-gallery__tab-list"><li>Влажные луга</li><li>Опушки лесов</li><li>Берега рек</li><li>Поляны</li><li>Предпочитает влажные почвы</li><li>Светолюбива</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Купальница размножается семенами и делением.</p><ul class="species-gallery__tab-list"><li>Семена в листовках</li><li>Самосев</li><li>Деление куста</li><li>Растёт медленно</li><li>Зацветает на 2-3 год</li><li>Долгожитель</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Купальница используется человеком.</p><ul class="species-gallery__tab-list"><li>Декоративное растение</li><li>Озеленение</li><li>Букеты</li><li>Медонос</li><li>Лекарственное сырьё</li><li>ЯДОВИТА</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Купальница важна для экосистемы.</p><ul class="species-gallery__tab-list"><li>Медонос</li><li>Декоративна</li><li>Украшает луга</li><li>Индикатор влажных мест</li><li>Страдает от сбора</li><li>Нуждается в охране</li></ul>`},
            {title: 'Ядовитость', content: `<p class="species-gallery__tab-text">Купальница ядовита.</p><ul class="species-gallery__tab-list"><li>Содержит алкалоиды</li><li>Ядовиты все части</li><li>Вызывает отравление</li><li>Раздражает кожу</li><li>Не использовать без знаний</li><li>Опасна для скота</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Купальница используется в народной медицине осторожно.</p><ul class="species-gallery__tab-list"><li>Противовоспалительное</li><li>Ранозаживляющее</li><li>Мочегонное</li><li>ЯДОВИТА</li><li>Только наружно</li><li>Требует осторожности</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности купальницы.</p><ul class="species-gallery__tab-list"><li>Название от «купать» — растёт у воды</li><li>Символ Сибири</li><li>Очень декоративна</li><li>Страдает от сбора</li><li>Герой легенд</li><li>Может жить 50 лет</li></ul>`}
        ]
    },
    'trollius': {
        name: 'Жарки',
        latin: 'Trollius asiaticus',
        image: 'assets/images/priroda/flora_fauna/flora/trollius.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Жарки (огоньки) — яркое растение с оранжевыми цветками.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 80 см</li><li><strong>Продолжительность жизни:</strong> Многолетник</li><li><strong>Семейство:</strong> Лютиковые</li><li><strong>Вид:</strong> Купальница азиатская</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Жарки — яркое растение.</p><ul class="species-gallery__tab-list"><li>Прямостоячий стебель</li><li>Пальчаторассечённые листья</li><li>Шаровидные цветки</li><li>Ярко-оранжевые</li><li>Очень декоративны</li><li>Образуют яркие пятна</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья жарков рассечённые.</p><ul class="species-gallery__tab-list"><li>Пальчаторассечённые</li><li>5-7 долей</li><li>Зубчатый край</li><li>Тёмно-зелёные</li><li>Прикорневая розетка</li><li>Стеблевые мельче</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Жарки цветут в начале лета.</p><ul class="species-gallery__tab-list"><li>Цветут в мае-июне</li><li>Шаровидные цветки</li><li>Ярко-оранжевые</li><li>Диаметр 4-5 см</li><li>Слабый аромат</li><li>Листовки с семенами</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Жарки растут на лугах и полянах.</p><ul class="species-gallery__tab-list"><li>Луга</li><li>Поляны</li><li>Опушки лесов</li><li>Берега рек</li><li>Предпочитают влажные места</li><li>Светолюбивы</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Жарки размножаются семенами и делением.</p><ul class="species-gallery__tab-list"><li>Семена в листовках</li><li>Самосев</li><li>Деление куста</li><li>Растут медленно</li><li>Зацветают на 2-3 год</li><li>Долгожители</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Жарки используются человеком.</p><ul class="species-gallery__tab-list"><li>Декоративное растение</li><li>Озеленение</li><li>Букеты</li><li>Медонос</li><li>Символ Сибири</li><li>ЯДОВИТЫ</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Жарки важны для экосистемы.</p><ul class="species-gallery__tab-list"><li>Медонос</li><li>Очень декоративны</li><li>Украшают луга</li><li>Создают яркие пятна</li><li>Страдают от сбора</li><li>Нуждаются в охране</li></ul>`},
            {title: 'Название', content: `<p class="species-gallery__tab-text">Жарки имеют много народных названий.</p><ul class="species-gallery__tab-list"><li>Жарки — от яркого цвета</li><li>Огоньки</li><li>Купавки</li><li>Сибирская роза</li><li>Символ Сибири</li><li>Герой песен</li></ul>`},
            {title: 'Ядовитость', content: `<p class="species-gallery__tab-text">Жарки ядовиты.</p><ul class="species-gallery__tab-list"><li>Содержат алкалоиды</li><li>Ядовиты все части</li><li>Вызывают отравление</li><li>Раздражают кожу</li><li>Не использовать без знаний</li><li>Опасны для скота</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности жарков.</p><ul class="species-gallery__tab-list"><li>Символ Сибири</li><li>Очень яркие</li><li>Украшают луга</li><li>Страдают от сбора</li><li>Герой песен и легенд</li><li>«Огоньки» — народное название</li></ul>`}
        ]
    },
    'pasqueflower': {
        name: 'Прострел',
        latin: 'Pulsatilla',
        image: 'assets/images/priroda/flora_fauna/flora/pasqueflower.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Прострел (сон-трава) — раннецветущее растение с пушистыми цветками.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 30 см</li><li><strong>Продолжительность жизни:</strong> Многолетник</li><li><strong>Семейство:</strong> Лютиковые</li><li><strong>Виды:</strong> Раскрытый, желтеющий</li><li><strong>Статус:</strong> Редкий вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Прострел — пушистое растение.</p><ul class="species-gallery__tab-list"><li>Низкий стебель</li><li>Всё растение опушено</li><li>Перисторассечённые листья</li><li>Крупные цветки</li><li>Фиолетовые или жёлтые</li><li>Очень декоративен</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья прострела рассечённые и пушистые.</p><ul class="species-gallery__tab-list"><li>Перисторассечённые</li><li>Узкие доли</li><li>Густо опушены</li><li>Серебристые от волосков</li><li>Появляются после цветения</li><li>Прикорневая розетка</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Прострел цветёт ранней весной.</p><ul class="species-gallery__tab-list"><li>Цветёт в апреле-мае</li><li>Один из первых цветков</li><li>Крупные цветки</li><li>Фиолетовые, синие, жёлтые</li><li>Густо опушены</li><li>Плоды с длинными остями</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Прострел растёт на сухих склонах.</p><ul class="species-gallery__tab-list"><li>Сухие склоны</li><li>Степи</li><li>Сосновые боры</li><li>Опушки</li><li>Светолюбив</li><li>Засухоустойчив</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Прострел размножается семенами.</p><ul class="species-gallery__tab-list"><li>Семена с длинными остями</li><li>Разносятся ветром</li><li>Самосев</li><li>Растёт медленно</li><li>Зацветает на 6-7 год</li><li>Не переносит пересадку</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Прострел используется ограниченно.</p><ul class="species-gallery__tab-list"><li>Декоративное растение</li><li>Ранний медонос</li><li>Лекарственное сырьё</li><li>ЯДОВИТ</li><li>Охраняется законом</li><li>Сбор запрещён</li></ul>`},
            {title: 'Охрана', content: `<p class="species-gallery__tab-text">Прострел нуждается в охране.</p><ul class="species-gallery__tab-list"><li>Занесён в Красную книгу</li><li>Сбор запрещён</li><li>Медленно размножается</li><li>Не переносит пересадку</li><li>Страдает от сбора</li><li>Исчезающий вид</li></ul>`},
            {title: 'Ядовитость', content: `<p class="species-gallery__tab-text">Прострел ядовит.</p><ul class="species-gallery__tab-list"><li>Содержит алкалоиды</li><li>Ядовиты все части</li><li>Особенно свежее растение</li><li>Вызывает отравление</li><li>Раздражает кожу</li><li>Не использовать без знаний</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Прострел используется в медицине осторожно.</p><ul class="species-gallery__tab-list"><li>Успокаивающее</li><li>Обезболивающее</li><li>Противовоспалительное</li><li>ЯДОВИТ</li><li>Только в малых дозах</li><li>Требует осторожности</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности прострела.</p><ul class="species-gallery__tab-list"><li>Сон-трава — народное название</li><li>Один из первых весенних цветков</li><li>Весь покрыт пушком</li><li>Герой легенд</li><li>Символ весны</li><li>Занесён в Красную книгу</li></ul>`}
        ]
    },
    'rhodiola': {
        name: 'Родиола',
        latin: 'Rhodiola rosea',
        image: 'assets/images/priroda/flora_fauna/flora/rhodiola.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Родиола розовая (золотой корень) — лекарственное растение гор.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 40 см</li><li><strong>Продолжительность жизни:</strong> Многолетник</li><li><strong>Семейство:</strong> Толстянковые</li><li><strong>Тип:</strong> Суккулент</li><li><strong>Статус:</strong> Редкий вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Родиола — мясистое растение.</p><ul class="species-gallery__tab-list"><li>Толстое корневище</li><li>Несколько стеблей</li><li>Мясистые листья</li><li>Жёлтые цветки</li><li>Запах розы у корня</li><li>Образует куртины</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья родиолы мясистые.</p><ul class="species-gallery__tab-list"><li>Овальные, мясистые</li><li>Сидячие</li><li>Зубчатый край</li><li>Сизо-зелёные</li><li>Очередные</li><li>Запасают воду</li></ul>`},
            {title: 'Цветение', content: `<p class="species-gallery__tab-text">Родиола цветёт летом.</p><ul class="species-gallery__tab-list"><li>Цветёт в июне-июле</li><li>Жёлтые цветки</li><li>Собраны в щиток</li><li>Двудомное растение</li><li>Листовки с семенами</li><li>Медонос</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Родиола растёт в горах.</p><ul class="species-gallery__tab-list"><li>Горные тундры</li><li>Каменистые склоны</li><li>Берега горных рек</li><li>Альпийский пояс</li><li>Требует влаги</li><li>Холодостойка</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Родиола размножается семенами и делением.</p><ul class="species-gallery__tab-list"><li>Семена мелкие</li><li>Разносятся ветром</li><li>Деление корневища</li><li>Растёт медленно</li><li>Зацветает на 10-12 год</li><li>Долгожитель</li></ul>`},
            {title: 'Корневище', content: `<p class="species-gallery__tab-text">Корневище родиолы — ценное лекарственное сырьё.</p><ul class="species-gallery__tab-list"><li>Толстое, мясистое</li><li>Золотистое на изломе</li><li>Запах розы</li><li>Горьковатый вкус</li><li>Содержит активные вещества</li><li>Ценное сырьё</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Родиола — ценнейшее лекарственное растение.</p><ul class="species-gallery__tab-list"><li>Лекарственное сырьё</li><li>Адаптоген</li><li>Тонизирующее</li><li>Охраняется законом</li><li>Заготовка регулируется</li><li>Искусственное выращивание</li></ul>`},
            {title: 'Охрана', content: `<p class="species-gallery__tab-text">Родиола нуждается в строгой охране.</p><ul class="species-gallery__tab-list"><li>Занесена в Красную книгу</li><li>Заготовка регулируется</li><li>Медленно восстанавливается</li><li>Страдает от заготовок</li><li>Искусственное выращивание</li><li>Ценнейший вид</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Родиола — мощный адаптоген.</p><ul class="species-gallery__tab-list"><li>Адаптоген</li><li>Тонизирующее</li><li>Повышает работоспособность</li><li>Укрепляет иммунитет</li><li>Антистрессовое</li><li>Улучшает память</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности родиолы.</p><ul class="species-gallery__tab-list"><li>«Золотой корень» — народное название</li><li>Корень пахнет розой</li><li>Мощный адаптоген</li><li>Ценилась на вес золота</li><li>Секрет долголетия</li><li>Может жить 100 лет</li></ul>`}
        ]
    },
    'fern': {
        name: 'Папоротник',
        latin: 'Polypodiophyta',
        image: 'assets/images/priroda/flora_fauna/flora/fern.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Папоротник — древнее споровое растение.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 1,5 м</li><li><strong>Продолжительность жизни:</strong> Многолетник</li><li><strong>Отдел:</strong> Папоротниковидные</li><li><strong>Виды:</strong> Орляк, щитовник</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Папоротник — изящное растение.</p><ul class="species-gallery__tab-list"><li>Корневище</li><li>Перистые листья (вайи)</li><li>Улиткообразно свёрнуты весной</li><li>Тёмно-зелёные</li><li>Споры снизу листа</li><li>Образует заросли</li></ul>`},
            {title: 'Листья (вайи)', content: `<p class="species-gallery__tab-text">Листья папоротника называются вайями.</p><ul class="species-gallery__tab-list"><li>Перистые, рассечённые</li><li>Крупные</li><li>Весной свёрнуты улиткой</li><li>Тёмно-зелёные</li><li>Споры снизу</li><li>Отмирают на зиму</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Папоротник размножается спорами.</p><ul class="species-gallery__tab-list"><li>Споры в сорусах</li><li>Снизу листа</li><li>Созревают летом</li><li>Разносятся ветром</li><li>Сложный цикл развития</li><li>Корневище</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Папоротник растёт в тенистых влажных местах.</p><ul class="species-gallery__tab-list"><li>Леса</li><li>Овраги</li><li>Берега рек</li><li>Влажные места</li><li>Теневынослив</li><li>Образует заросли</li></ul>`},
            {title: 'Цикл развития', content: `<p class="species-gallery__tab-text">Папоротник имеет сложный цикл развития.</p><ul class="species-gallery__tab-list"><li>Споры прорастают</li><li>Образуется заросток</li><li>На заростке половые органы</li><li>Оплодотворение</li><li>Вырастает новое растение</li><li>Чередование поколений</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Папоротник используется человеком.</p><ul class="species-gallery__tab-list"><li>Молодые побеги съедобны</li><li>Декоративное растение</li><li>Лекарственное сырьё</li><li>Корм для животных</li><li>Удобрение</li><li>Подстилка для скота</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Папоротник важен для экосистемы.</p><ul class="species-gallery__tab-list"><li>Индикатор влажных мест</li><li>Улучшает почву</li><li>Дом для животных</li><li>Древнее растение</li><li>Реликт</li><li>Образует ярус в лесу</li></ul>`},
            {title: 'Виды', content: `<p class="species-gallery__tab-text">В крае растут разные виды папоротников.</p><ul class="species-gallery__tab-list"><li>Орляк обыкновенный</li><li>Щитовник мужской</li><li>Кочедыжник женский</li><li>Страусник</li><li>Все теневыносливы</li><li>Все влаголюбивы</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Папоротник используется в медицине.</p><ul class="species-gallery__tab-list"><li>Противоглистное</li><li>Ранозаживляющее</li><li>Обезболивающее</li><li>Некоторые виды ядовиты</li><li>Требует осторожности</li><li>Используется в народной медицине</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности папоротника.</p><ul class="species-gallery__tab-list"><li>Древнейшее растение (350 млн лет)</li><li>Не цветёт никогда</li><li>Легенда о цветке папоротника</li><li>Молодые побеги съедобны</li><li>Символ тайны</li><li>Может жить 100 лет</li></ul>`}
        ]
    },
    'moss': {
        name: 'Мох',
        latin: 'Bryophyta',
        image: 'assets/images/priroda/flora_fauna/flora/moss.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Мох — древнее споровое растение, образующее ковры.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 10 см</li><li><strong>Продолжительность жизни:</strong> Многолетник</li><li><strong>Отдел:</strong> Моховидные</li><li><strong>Виды:</strong> Сфагнум, кукушкин лён</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Мох — мелкое растение.</p><ul class="species-gallery__tab-list"><li>Стебель с листочками</li><li>Нет настоящих корней</li><li>Ризоиды для прикрепления</li><li>Зелёный или бурый</li><li>Коробочки со спорами</li><li>Образует ковры</li></ul>`},
            {title: 'Строение', content: `<p class="species-gallery__tab-text">Мох имеет простое строение.</p><ul class="species-gallery__tab-list"><li>Стебель</li><li>Мелкие листочки</li><li>Ризоиды вместо корней</li><li>Нет сосудов</li><li>Коробочка на ножке</li><li>Споры в коробочке</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Мох размножается спорами.</p><ul class="species-gallery__tab-list"><li>Споры в коробочках</li><li>Коробочка на длинной ножке</li><li>Споры разносятся ветром</li><li>Прорастают во влажных местах</li><li>Вегетативное размножение</li><li>Чередование поколений</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Мох растёт во влажных местах.</p><ul class="species-gallery__tab-list"><li>Леса</li><li>Болота</li><li>Берега рек</li><li>Камни</li><li>Стволы деревьев</li><li>Требует влаги</li></ul>`},
            {title: 'Виды', content: `<p class="species-gallery__tab-text">В крае растут разные виды мхов.</p><ul class="species-gallery__tab-list"><li>Сфагнум — торфяной мох</li><li>Кукушкин лён</li><li>Зелёные мхи</li><li>Различаются по местам обитания</li><li>Все влаголюбивы</li><li>Все образуют ковры</li></ul>`},
            {title: 'Сфагнум', content: `<p class="species-gallery__tab-text">Сфагнум — торфообразующий мох.</p><ul class="species-gallery__tab-list"><li>Растёт на болотах</li><li>Образует торф</li><li>Впитывает много воды</li><li>Антисептические свойства</li><li>Светло-зелёный</li><li>Нарастает сверху</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Мох используется человеком.</p><ul class="species-gallery__tab-list"><li>Сфагнум — перевязочный материал</li><li>Утеплитель</li><li>Топливо (торф)</li><li>Удобрение</li><li>Субстрат для растений</li><li>Декоративное растение</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Мох важен для экосистемы.</p><ul class="species-gallery__tab-list"><li>Образует торф</li><li>Накапливает влагу</li><li>Дом для мелких животных</li><li>Индикатор влажности</li><li>Пионер на голых местах</li><li>Древнейшее растение</li></ul>`},
            {title: 'Свойства', content: `<p class="species-gallery__tab-text">Мох обладает уникальными свойствами.</p><ul class="species-gallery__tab-list"><li>Впитывает воду в 20 раз больше веса</li><li>Антисептические свойства</li><li>Не гниёт</li><li>Может высыхать и оживать</li><li>Очень живучий</li><li>Растёт медленно</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности мха.</p><ul class="species-gallery__tab-list"><li>Древнейшее наземное растение</li><li>Может оживать после высыхания</li><li>Сфагнум использовали как бинты</li><li>Образует торф</li><li>Индикатор чистоты воздуха</li><li>Может жить сотни лет</li></ul>`}
        ]
    },
    'lichen': {
        name: 'Лишайник',
        latin: 'Lichenes',
        image: 'assets/images/priroda/flora_fauna/flora/lichen.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Лишайник — симбиоз гриба и водоросли.</p><ul class="species-gallery__tab-list"><li><strong>Размер:</strong> от 1 мм до 1 м</li><li><strong>Продолжительность жизни:</strong> Сотни лет</li><li><strong>Тип:</strong> Симбиотический организм</li><li><strong>Виды:</strong> Тысячи видов</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Строение', content: `<p class="species-gallery__tab-text">Лишайник — уникальный организм.</p><ul class="species-gallery__tab-list"><li>Симбиоз гриба и водоросли</li><li>Гриб даёт структуру</li><li>Водоросль фотосинтезирует</li><li>Взаимовыгодное сотрудничество</li><li>Различные формы</li><li>Медленный рост</li></ul>`},
            {title: 'Формы', content: `<p class="species-gallery__tab-text">Лишайники имеют разные формы.</p><ul class="species-gallery__tab-list"><li>Накипные — корка на субстрате</li><li>Листоватые — пластинки</li><li>Кустистые — веточки</li><li>Различаются по форме</li><li>Все медленно растут</li><li>Все долгожители</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Лишайники размножаются несколькими способами.</p><ul class="species-gallery__tab-list"><li>Кусочками слоевища</li><li>Соредии (гриб + водоросль)</li><li>Споры гриба</li><li>Очень медленно</li><li>Растут 1-3 мм в год</li><li>Могут жить сотни лет</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Лишайники растут везде.</p><ul class="species-gallery__tab-list"><li>Камни</li><li>Стволы деревьев</li><li>Почва</li><li>Скалы</li><li>Тундра</li><li>Самые неприхотливые</li></ul>`},
            {title: 'Ягель', content: `<p class="species-gallery__tab-text">Ягель (олений мох) — важнейший лишайник Севера.</p><ul class="species-gallery__tab-list"><li>Кустистый лишайник</li><li>Основной корм оленей</li><li>Растёт в тундре</li><li>Светло-серый</li><li>Растёт очень медленно</li><li>Восстанавливается 15-20 лет</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Лишайники используются человеком.</p><ul class="species-gallery__tab-list"><li>Ягель — корм для оленей</li><li>Красители</li><li>Лекарственное сырьё</li><li>Парфюмерия</li><li>Индикатор чистоты воздуха</li><li>Биоиндикация</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Лишайники важны для экосистемы.</p><ul class="species-gallery__tab-list"><li>Пионеры на голых скалах</li><li>Разрушают камни</li><li>Образуют почву</li><li>Корм для животных</li><li>Индикатор чистоты воздуха</li><li>Не растут в загрязнённых местах</li></ul>`},
            {title: 'Индикация', content: `<p class="species-gallery__tab-text">Лишайники — индикаторы чистоты воздуха.</p><ul class="species-gallery__tab-list"><li>Очень чувствительны к загрязнению</li><li>Не растут в городах</li><li>Исчезают при загрязнении</li><li>Биоиндикаторы</li><li>Показатель экологии</li><li>Лихеноиндикация</li></ul>`},
            {title: 'Свойства', content: `<p class="species-gallery__tab-text">Лишайники обладают уникальными свойствами.</p><ul class="species-gallery__tab-list"><li>Выживают в экстремальных условиях</li><li>Переносят засуху</li><li>Переносят морозы</li><li>Могут высыхать и оживать</li><li>Растут очень медленно</li><li>Живут сотни лет</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности лишайников.</p><ul class="species-gallery__tab-list"><li>Симбиоз двух организмов</li><li>Могут жить 4500 лет</li><li>Растут 1 мм в год</li><li>Выживают в космосе</li><li>Индикатор чистоты воздуха</li><li>Пионеры на голых скалах</li></ul>`}
        ]
    },
    'bilberry': {
        name: 'Голубика',
        latin: 'Vaccinium uliginosum',
        image: 'assets/images/priroda/flora_fauna/flora/bilberry-Photoroom.png',
        tabs: [
            {title: 'Общая информация', content: `<p class="species-gallery__tab-text">Голубика — кустарничек с синими ягодами.</p><ul class="species-gallery__tab-list"><li><strong>Высота:</strong> до 1 м</li><li><strong>Продолжительность жизни:</strong> до 90 лет</li><li><strong>Семейство:</strong> Вересковые</li><li><strong>Тип:</strong> Листопадный кустарничек</li><li><strong>Статус:</strong> Обычный вид</li></ul>`},
            {title: 'Внешний вид', content: `<p class="species-gallery__tab-text">Голубика — невысокий кустарничек.</p><ul class="species-gallery__tab-list"><li>Ветвистый кустарничек</li><li>Серая кора</li><li>Овальные листья</li><li>Розовые цветки</li><li>Синие ягоды с налётом</li><li>Образует заросли</li></ul>`},
            {title: 'Листья', content: `<p class="species-gallery__tab-text">Листья голубики простые.</p><ul class="species-gallery__tab-list"><li>Овальные, 1-3 см</li><li>Цельнокрайние</li><li>Тупые</li><li>Сизо-зелёные</li><li>Осенью красные</li><li>Опадают на зиму</li></ul>`},
            {title: 'Цветение и плоды', content: `<p class="species-gallery__tab-text">Голубика цветёт весной.</p><ul class="species-gallery__tab-list"><li>Цветёт в мае-июне</li><li>Розовые колокольчатые цветки</li><li>Медонос</li><li>Ягоды созревают в июле-августе</li><li>Синие с сизым налётом</li><li>Сладкие</li></ul>`},
            {title: 'Места произрастания', content: `<p class="species-gallery__tab-text">Голубика растёт на болотах и в лесах.</p><ul class="species-gallery__tab-list"><li>Болота</li><li>Заболоченные леса</li><li>Тундра</li><li>Горы</li><li>Кислые почвы</li><li>Образует заросли</li></ul>`},
            {title: 'Размножение', content: `<p class="species-gallery__tab-text">Голубика размножается семенами и отводками.</p><ul class="species-gallery__tab-list"><li>Семена в ягодах</li><li>Разносятся птицами</li><li>Отводки</li><li>Корневые отпрыски</li><li>Растёт медленно</li><li>Плодоносит с 10-15 лет</li></ul>`},
            {title: 'Ягоды', content: `<p class="species-gallery__tab-text">Ягоды голубики очень полезны.</p><ul class="species-gallery__tab-list"><li>Синие с сизым налётом</li><li>Сладкие</li><li>Богаты витаминами</li><li>Антиоксиданты</li><li>Едят свежими</li><li>Замораживают</li></ul>`},
            {title: 'Хозяйственное значение', content: `<p class="species-gallery__tab-text">Голубика — ценная ягодная культура.</p><ul class="species-gallery__tab-list"><li>Ягоды съедобны</li><li>Варенье, компоты</li><li>Заморозка</li><li>Медонос</li><li>Лекарственное сырьё</li><li>Декоративный кустарник</li></ul>`},
            {title: 'Экология', content: `<p class="species-gallery__tab-text">Голубика важна для экосистемы.</p><ul class="species-gallery__tab-list"><li>Корм для птиц и зверей</li><li>Медонос</li><li>Индикатор болот</li><li>Пища для медведей</li><li>Морозостойка</li><li>Долгожитель</li></ul>`},
            {title: 'Лекарственные свойства', content: `<p class="species-gallery__tab-text">Голубика используется в медицине.</p><ul class="species-gallery__tab-list"><li>Ягоды — поливитаминное</li><li>Антиоксидант</li><li>Улучшает зрение</li><li>Укрепляет сосуды</li><li>Противовоспалительное</li><li>Укрепляет иммунитет</li></ul>`},
            {title: 'Интересные факты', content: `<p class="species-gallery__tab-text">Удивительные особенности голубики.</p><ul class="species-gallery__tab-list"><li>Может жить 90 лет</li><li>Ягоды очень полезны</li><li>Богата антиоксидантами</li><li>Улучшает зрение</li><li>Растёт в суровых условиях</li><li>«Северная черника»</li></ul>`}
        ]
    }
};

function openSpeciesGallery(speciesId) {
    const speciesData = SPECIES_DATABASE[speciesId];
    
    if (!speciesData) {
        console.error('Species not found:', speciesId);
        alert('Информация об этом виде пока не добавлена. Доступны: Бурый медведь, Волк, Северный олень, Рысь, Сибирский кедр');
        return;
    }
    
    currentSpeciesData = speciesData;
    currentTabIndex = 0;
    tabsVisible = true;
    
    const gallery = document.getElementById('speciesGallery');
    if (!gallery) {
        console.error('Species gallery element not found');
        return;
    }
    
    renderGalleryContent();
    gallery.classList.add('species-gallery--active');
    document.body.style.overflow = 'hidden';
}

function closeSpeciesGallery() {
    const gallery = document.getElementById('speciesGallery');
    if (gallery) {
        gallery.classList.remove('species-gallery--active');
        document.body.style.overflow = '';
    }
    currentSpeciesData = null;
    currentTabIndex = 0;
}

function switchSpeciesTab(tabIndex) {
    currentTabIndex = tabIndex;
    renderGalleryContent();
}

function toggleTabs() {
    tabsVisible = !tabsVisible;
    
    const gallery = document.getElementById('speciesGallery');
    if (!gallery) return;
    
    const tabsSection = gallery.querySelector('.species-gallery__tabs-section');
    const imageSection = gallery.querySelector('.species-gallery__image-section');
    const toggleBtn = gallery.querySelector('.species-gallery__tabs-toggle');
    
    if (tabsVisible) {
        tabsSection.classList.remove('species-gallery__tabs-section--hidden');
        imageSection.classList.remove('species-gallery__image-section--expanded');
        if (toggleBtn) toggleBtn.textContent = '◀';
    } else {
        tabsSection.classList.add('species-gallery__tabs-section--hidden');
        imageSection.classList.add('species-gallery__image-section--expanded');
        if (toggleBtn) toggleBtn.textContent = '▶';
    }
}

function renderGalleryContent() {
    if (!currentSpeciesData) return;
    
    const gallery = document.getElementById('speciesGallery');
    
    if (!gallery) {
        console.error('Gallery element not found!');
        return;
    }
    
    // Обновляем видимость табов
    const tabsSection = gallery.querySelector('.species-gallery__tabs-section');
    const imageSection = gallery.querySelector('.species-gallery__image-section');
    const toggleBtn = gallery.querySelector('.species-gallery__tabs-toggle');
    
    if (!tabsSection || !imageSection) {
        console.error('Gallery sections not found!', { tabsSection, imageSection });
        return;
    }
    
    if (tabsVisible) {
        tabsSection.classList.remove('species-gallery__tabs-section--hidden');
        imageSection.classList.remove('species-gallery__image-section--expanded');
        if (toggleBtn) toggleBtn.textContent = '▶';
    } else {
        tabsSection.classList.add('species-gallery__tabs-section--hidden');
        imageSection.classList.add('species-gallery__image-section--expanded');
        if (toggleBtn) toggleBtn.textContent = '◀';
    }
    
    // Обновляем изображение - используем БОЛЬШИЕ картинки из папки images
    const img = gallery.querySelector('.species-gallery__image');
    if (img && currentSpeciesData.image) {
        // Извлекаем имя файла из пути (например, 'wolf' из 'fauna/wolf.png')
        const imagePath = currentSpeciesData.image;
        const fileName = imagePath.split('/').pop().replace('.png', '');
        
        // Формируем путь к большой картинке
        // Сначала пробуем .jpg, если нет - .webp
        const largeImagePath = `assets/images/priroda/images/${fileName}.jpg`;
        const largeImagePathWebp = `assets/images/priroda/images/${fileName}.webp`;
        
        // Пробуем загрузить .jpg, если не получится - .webp
        img.src = largeImagePath;
        img.onerror = function() {
            img.src = largeImagePathWebp;
            img.onerror = function() {
                // Если и webp не найден, используем оригинальную маленькую картинку
                img.src = currentSpeciesData.image;
            };
        };
        img.alt = currentSpeciesData.name;
    }
    
    // Обновляем заголовок (латинское название убрано)
    const title = gallery.querySelector('.species-gallery__title');
    if (title) {
        title.textContent = currentSpeciesData.name;
    }
    
    const latin = gallery.querySelector('.species-gallery__latin');
    if (latin) {
        latin.style.display = 'none'; // Скрываем латинское название
    }
    
    // Рендерим список табов
    const tabsList = gallery.querySelector('.species-gallery__tabs-list');
    if (tabsList && currentSpeciesData.tabs) {
        tabsList.innerHTML = '';
        currentSpeciesData.tabs.forEach((tab, index) => {
            const li = document.createElement('li');
            li.className = 'species-gallery__tab-item';
            if (index === currentTabIndex) {
                li.classList.add('species-gallery__tab-item--active');
            }
            li.textContent = tab.title;
            li.onclick = () => switchSpeciesTab(index);
            tabsList.appendChild(li);
        });
    }
    
    // Рендерим контент активного таба
    const contentContainer = gallery.querySelector('.species-gallery__tab-content-container');
    if (contentContainer && currentSpeciesData.tabs && currentSpeciesData.tabs[currentTabIndex]) {
        const activeTab = currentSpeciesData.tabs[currentTabIndex];
        contentContainer.innerHTML = `
            <div class="species-gallery__tab-content species-gallery__tab-content--active">
                <h4 class="species-gallery__tab-title">${activeTab.title}</h4>
                ${activeTab.content}
            </div>
        `;
    }
}

// Глобальные функции для HTML
window.openSpeciesGallery = openSpeciesGallery;
window.closeSpeciesGallery = closeSpeciesGallery;
window.switchSpeciesTab = switchSpeciesTab;
window.toggleTabs = toggleTabs;

// ============================================
// 5. RESERVES CAROUSEL (Карусель заповедников)
// ============================================

function initReservesCarousel() {
    const carousel = document.querySelector('.reserves-carousel__wrapper');
    if (!carousel) return;
    
    // Можно добавить кнопки навигации если нужно
    // Пока используем нативный скролл
}

// ============================================
// INITIALIZATION - REMOVED (moved to end of file)
// ============================================


// ============================================
// ФЛОРА И ФАУНА - ТАБЫ
// ============================================

function initFloraFaunaTabs() {
    console.log('Initializing Flora and Fauna tabs...');
    
    // Получаем все кнопки табов флоры и фауны
    const floraFaunaTabs = document.querySelectorAll('.flora-fauna-tab');
    
    console.log('Found', floraFaunaTabs.length, 'flora-fauna tabs');
    
    if (floraFaunaTabs.length === 0) {
        console.warn('No flora-fauna tabs found!');
        return;
    }
    
    floraFaunaTabs.forEach((tab, index) => {
        console.log(`Setting up tab ${index}:`, tab.getAttribute('data-tab'));
        
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetTab = this.getAttribute('data-tab');
            const section = this.closest('.flora-fauna-section');
            
            console.log('Tab clicked:', targetTab);
            
            if (!section) {
                console.error('Section not found for tab');
                return;
            }
            
            // Убираем активный класс со всех табов в этой секции
            section.querySelectorAll('.flora-fauna-tab').forEach(t => {
                t.classList.remove('flora-fauna-tab--active');
            });
            
            // Добавляем активный класс к нажатому табу
            this.classList.add('flora-fauna-tab--active');
            
            // Скрываем все панели в этой секции
            section.querySelectorAll('.flora-fauna-tab-panel').forEach(panel => {
                panel.classList.remove('flora-fauna-tab-panel--active');
            });
            
            // Показываем нужную панель
            const targetPanel = section.querySelector(`[data-panel="${targetTab}"]`);
            if (targetPanel) {
                targetPanel.classList.add('flora-fauna-tab-panel--active');
                console.log('Panel activated:', targetTab);
            } else {
                console.error('Panel not found:', targetTab);
            }
        });
    });
    
    console.log('Flora and Fauna tabs initialized successfully');
}

// ВНИМАНИЕ: Из-за ограничений на размер файла, остальные 48 видов будут добавлены в следующем промпте.
// Уже добавлено 24 вида из 72 с полной детализацией (10-11 табов каждый).
// Структура готова для добавления остальных видов.


// ============================================
// DRAG TO SCROLL FOR RESERVES CAROUSEL
// Перетаскивание для карусели заповедников
// ============================================

function initReservesCarouselDrag() {
    const carousel = document.querySelector('.reserves-carousel__wrapper');
    
    if (!carousel) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active-drag');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        e.preventDefault();
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active-drag');
    });
    
    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active-drag');
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5; // Скорость прокрутки
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    // Отключить плавную прокрутку при перетаскивании
    carousel.addEventListener('mousedown', () => {
        carousel.style.scrollBehavior = 'auto';
    });
    
    carousel.addEventListener('mouseup', () => {
        setTimeout(() => {
            carousel.style.scrollBehavior = 'smooth';
        }, 100);
    });
}

// Добавить инициализацию в DOMContentLoaded - REMOVED (consolidated below)


// ============================================
// 5. RESERVES MODAL (Модальное окно заповедников)
// ============================================

let currentReserveData = null;
let currentReserveTabIndex = 0;
let reserveMap = null;

// Открыть модальное окно заповедника
function openReserveModal(reserveId) {
    console.log('🚀 Opening reserve modal for:', reserveId);
    
    // Проверить что база данных существует
    if (typeof RESERVES_DATABASE === 'undefined') {
        console.error('❌ RESERVES_DATABASE is not defined!');
        alert('Ошибка: База данных заповедников не загружена. Проверьте консоль.');
        return;
    }
    
    const reserveData = RESERVES_DATABASE[reserveId];
    
    if (!reserveData) {
        console.error('❌ Reserve not found:', reserveId);
        console.log('Available reserves:', Object.keys(RESERVES_DATABASE));
        alert(`Заповедник "${reserveId}" не найден в базе данных.`);
        return;
    }
    
    console.log('✅ Reserve data loaded:', reserveData.name);
    
    currentReserveData = reserveData;
    currentReserveTabIndex = 0;
    
    // Создать модальное окно если его нет
    let modal = document.getElementById('reserveModal');
    if (!modal) {
        console.log('📝 Creating modal structure...');
        modal = createReserveModal();
        document.body.appendChild(modal);
    }
    
    // Заполнить контент
    console.log('📄 Updating modal content...');
    updateReserveModalContent();
    
    // Показать модальное окно
    console.log('👁️ Showing modal...');
    modal.classList.add('reserve-modal--active');
    document.body.style.overflow = 'hidden';
    
    // Инициализировать карту после небольшой задержки
    setTimeout(() => {
        initReserveMap(reserveId);
    }, 300);
    
    console.log('✅ Modal opened successfully');
}

// Создать структуру модального окна
function createReserveModal() {
    const modal = document.createElement('div');
    modal.id = 'reserveModal';
    modal.className = 'reserve-modal';
    
    modal.innerHTML = `
        <div class="reserve-modal__overlay" onclick="closeReserveModal()"></div>
        <div class="reserve-modal__container">
            <button class="reserve-modal__close" onclick="closeReserveModal()" aria-label="Закрыть">
                <span>×</span>
            </button>
            
            <div class="reserve-modal__header">
                <div class="reserve-modal__title-section">
                    <h2 class="reserve-modal__title"></h2>
                    <div class="reserve-modal__meta"></div>
                </div>
                <div class="reserve-modal__image-container">
                    <img class="reserve-modal__main-image" alt="">
                </div>
            </div>
            
            <div class="reserve-modal__tabs">
                <!-- Табы будут добавлены динамически -->
            </div>
            
            <div class="reserve-modal__content">
                <!-- Контент табов -->
            </div>
            
            <div class="reserve-modal__gallery">
                <!-- Галерея изображений -->
            </div>
        </div>
    `;
    
    return modal;
}


// Обновить контент модального окна
function updateReserveModalContent() {
    if (!currentReserveData) return;
    
    const modal = document.getElementById('reserveModal');
    
    // Заголовок
    const title = modal.querySelector('.reserve-modal__title');
    title.textContent = currentReserveData.name;
    
    // Мета-информация удалена
    const meta = modal.querySelector('.reserve-modal__meta');
    if (meta) {
        meta.style.display = 'none';
    }
    
    // Главное изображение
    const mainImage = modal.querySelector('.reserve-modal__main-image');
    mainImage.src = currentReserveData.mainImage;
    mainImage.alt = currentReserveData.name;
    
    // Табы
    const tabsContainer = modal.querySelector('.reserve-modal__tabs');
    tabsContainer.innerHTML = currentReserveData.tabs.map((tab, index) => `
        <button class="reserve-modal__tab ${index === 0 ? 'reserve-modal__tab--active' : ''}" 
                onclick="switchReserveTab(${index})">
            <span class="reserve-modal__tab-icon">${tab.icon}</span>
            <span class="reserve-modal__tab-title">${tab.title}</span>
        </button>
    `).join('');
    
    // Контент первого таба
    updateReserveTabContent();
    
    // Галерея
    updateReserveGallery();
}

// Обновить контент таба
function updateReserveTabContent() {
    if (!currentReserveData) return;
    
    const modal = document.getElementById('reserveModal');
    const contentContainer = modal.querySelector('.reserve-modal__content');
    const currentTab = currentReserveData.tabs[currentReserveTabIndex];
    
    contentContainer.innerHTML = currentTab.content;
}

// Переключить таб
function switchReserveTab(index) {
    if (!currentReserveData || index === currentReserveTabIndex) return;
    
    currentReserveTabIndex = index;
    
    const modal = document.getElementById('reserveModal');
    
    // Обновить активный таб
    const tabs = modal.querySelectorAll('.reserve-modal__tab');
    tabs.forEach((tab, i) => {
        tab.classList.toggle('reserve-modal__tab--active', i === index);
    });
    
    // Обновить контент
    updateReserveTabContent();
    
    // Если это таб "Местоположение на карте", инициализировать карту
    const currentTab = currentReserveData.tabs[index];
    if (currentTab.title === 'Местоположение на карте') {
        setTimeout(() => {
            initReserveMap(currentReserveData.nameEn.toLowerCase().replace(/ /g, '-'));
        }, 100);
    }
}

// Обновить галерею
function updateReserveGallery() {
    if (!currentReserveData) return;
    
    const modal = document.getElementById('reserveModal');
    const galleryContainer = modal.querySelector('.reserve-modal__gallery');
    
    if (currentReserveData.gallery && currentReserveData.gallery.length > 0) {
        galleryContainer.innerHTML = `
            <h3 class="reserve-modal__gallery-title">📸 Фотогалерея</h3>
            <div class="reserve-modal__gallery-grid">
                ${currentReserveData.gallery.map((img, index) => `
                    <img src="${img}" 
                         alt="${currentReserveData.name} - фото ${index + 1}" 
                         class="reserve-modal__gallery-image"
                         onclick="openImageLightbox('${img}')"
                         onerror="this.style.display='none'">
                `).join('')}
            </div>
        `;
    } else {
        galleryContainer.innerHTML = '';
    }
}

// Закрыть модальное окно
function closeReserveModal() {
    const modal = document.getElementById('reserveModal');
    if (modal) {
        modal.classList.remove('reserve-modal--active');
        document.body.style.overflow = '';
        
        // Уничтожить карту
        if (reserveMap) {
            reserveMap.remove();
            reserveMap = null;
        }
    }
    
    currentReserveData = null;
    currentReserveTabIndex = 0;
}

// Открыть изображение в лайтбоксе
function openImageLightbox(imageSrc) {
    // Простой лайтбокс
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
        <div class="image-lightbox__overlay" onclick="this.parentElement.remove()"></div>
        <img src="${imageSrc}" class="image-lightbox__image">
        <button class="image-lightbox__close" onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(lightbox);
}


// ============================================
// 6. LEAFLET MAP INTEGRATION (Интеграция карт)
// ============================================

function initReserveMap(reserveId) {
    const reserveData = RESERVES_DATABASE[reserveId];
    if (!reserveData) return;
    
    const mapContainer = document.getElementById(`reserve-map-${reserveId}`);
    if (!mapContainer) return;
    
    // Проверить, загружен ли Leaflet
    if (typeof L === 'undefined') {
        console.warn('Leaflet not loaded, map will not be displayed');
        mapContainer.innerHTML = '<p style="text-align: center; padding: 20px;">Карта недоступна</p>';
        return;
    }
    
    // Уничтожить предыдущую карту если есть
    if (reserveMap) {
        reserveMap.remove();
    }
    
    // Создать карту
    try {
        reserveMap = L.map(mapContainer).setView(reserveData.coordinates, 8);
        
        // Добавить тайлы OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(reserveMap);
        
        // Добавить маркер
        const marker = L.marker(reserveData.coordinates).addTo(reserveMap);
        marker.bindPopup(`<b>${reserveData.name}</b><br>${reserveData.shortDescription}`).openPopup();
        
    } catch (error) {
        console.error('Error initializing map:', error);
        mapContainer.innerHTML = '<p style="text-align: center; padding: 20px;">Ошибка загрузки карты</p>';
    }
}

// ============================================
// 7. MAKE RESERVE CARDS CLICKABLE
// ============================================

function initReserveCards() {
    console.log('🔍 Initializing reserve cards...');
    
    // Проверить что база данных загружена
    if (typeof RESERVES_DATABASE === 'undefined') {
        console.error('❌ RESERVES_DATABASE not loaded!');
        return;
    }
    
    const reserveCards = document.querySelectorAll('.reserve-card-compact');
    console.log(`📊 Found ${reserveCards.length} reserve cards`);
    
    if (reserveCards.length === 0) {
        console.warn('⚠️ No reserve cards found. They might be in a collapsed section.');
    }
    
    // Просто добавить data-атрибуты, обработчик будет глобальный
    reserveCards.forEach((card, index) => {
        const img = card.querySelector('.reserve-card-compact__image');
        if (!img) {
            console.warn(`⚠️ Card ${index}: No image found`);
            return;
        }
        
        const imgSrc = img.getAttribute('src');
        let reserveId = null;
        
        // Извлечь ID из пути к изображению
        if (imgSrc.includes('stolby')) reserveId = 'stolby';
        else if (imgSrc.includes('putorana')) reserveId = 'putorana';
        else if (imgSrc.includes('big-arctic')) reserveId = 'big-arctic';
        else if (imgSrc.includes('taimyr')) reserveId = 'taimyr';
        else if (imgSrc.includes('tunguska')) reserveId = 'tunguska';
        else if (imgSrc.includes('sayano')) reserveId = 'sayano-shushenskiy';
        else if (imgSrc.includes('central-siberian')) reserveId = 'central-siberian';
        else if (imgSrc.includes('ergaki')) reserveId = 'ergaki';
        else if (imgSrc.includes('shushensky-bor')) reserveId = 'shushensky-bor';
        
        if (reserveId) {
            console.log(`✅ Card ${index}: ${reserveId}`);
            card.style.cursor = 'pointer';
            card.setAttribute('data-reserve-id', reserveId);
            
            // Добавить hover эффект через CSS класс
            card.classList.add('reserve-card-clickable');
        } else {
            console.warn(`⚠️ Card ${index}: Could not determine reserve ID from ${imgSrc}`);
        }
    });
    
    console.log('✅ Reserve cards initialization complete');
}

// Глобальный обработчик кликов (делегирование событий)
document.addEventListener('click', function(e) {
    // Найти ближайшую карточку заповедника
    const card = e.target.closest('.reserve-card-compact[data-reserve-id]');
    
    if (card) {
        const reserveId = card.getAttribute('data-reserve-id');
        console.log(`🖱️ Clicked on reserve card: ${reserveId}`);
        e.preventDefault();
        e.stopPropagation();
        openReserveModal(reserveId);
    }
});

// ============================================
// UPDATED INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initInfoBadges();
    initCollapsibleSections();
    initGeoRecordsFlip();
    initFloraFaunaTabs();
    initReservesCarousel();
    initReservesCarouselDrag();
    initReserveCards(); // Новая инициализация
    
    // Keyboard navigation for species gallery
    document.addEventListener('keydown', function(e) {
        const gallery = document.getElementById('speciesGallery');
        if (gallery && gallery.classList.contains('species-gallery--active')) {
            if (e.key === 'Escape') {
                closeSpeciesGallery();
            } else if (e.key === 'ArrowUp' && currentTabIndex > 0) {
                switchSpeciesTab(currentTabIndex - 1);
            } else if (e.key === 'ArrowDown' && currentSpeciesData && currentTabIndex < currentSpeciesData.tabs.length - 1) {
                switchSpeciesTab(currentTabIndex + 1);
            }
        }
        
        // Keyboard navigation for reserve modal
        const reserveModal = document.getElementById('reserveModal');
        if (reserveModal && reserveModal.classList.contains('reserve-modal--active')) {
            if (e.key === 'Escape') {
                closeReserveModal();
            }
        }
    });
    
    console.log('Nature tab functionality initialized with reserves');
});


// ============================================
// 8. IMAGE ERROR HANDLING & IMPROVEMENTS
// ============================================

// Улучшенная функция обновления галереи с обработкой ошибок
function updateReserveGalleryImproved() {
    console.log('🖼️ Updating gallery...');
    
    if (!currentReserveData) {
        console.log('❌ No current reserve data');
        return;
    }
    
    console.log('📊 Reserve data:', currentReserveData.name);
    console.log('📸 Gallery images:', currentReserveData.gallery);
    
    const modal = document.getElementById('reserveModal');
    if (!modal) {
        console.log('❌ Modal not found');
        return;
    }
    
    const galleryContainer = modal.querySelector('.reserve-modal__gallery');
    if (!galleryContainer) {
        console.log('❌ Gallery container not found');
        return;
    }
    
    console.log('✅ Gallery container found');
    
    if (currentReserveData.gallery && currentReserveData.gallery.length > 0) {
        console.log(`✅ Rendering ${currentReserveData.gallery.length} images`);
        
        galleryContainer.innerHTML = `
            <h3 class="reserve-modal__gallery-title">📸 Фотогалерея</h3>
            <div class="reserve-modal__gallery-grid" id="galleryGrid">
                ${currentReserveData.gallery.map((img, index) => `
                    <div class="reserve-modal__gallery-item" data-index="${index}">
                        <img src="${img}" 
                             alt="${currentReserveData.name} - фото ${index + 1}" 
                             class="reserve-modal__gallery-image"
                             onclick="openImageLightbox('${img}', ${index})"
                             onerror="handleImageError(this)">
                        <div class="reserve-modal__gallery-loader">
                            <div class="spinner"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Добавить обработчики загрузки изображений
        const images = galleryContainer.querySelectorAll('.reserve-modal__gallery-image');
        console.log(`✅ Found ${images.length} image elements`);
        
        images.forEach(img => {
            img.addEventListener('load', function() {
                console.log('✅ Image loaded:', this.src);
                const loader = this.parentElement.querySelector('.reserve-modal__gallery-loader');
                if (loader) loader.style.display = 'none';
            });
            
            img.addEventListener('error', function() {
                console.log('❌ Image failed to load:', this.src);
            });
        });
    } else {
        console.log('⚠️ No gallery images found');
        galleryContainer.innerHTML = `
            <div class="reserve-modal__gallery-empty">
                <p>📷 Фотографии скоро появятся</p>
            </div>
        `;
    }
}

// Обработка ошибок загрузки изображений
function handleImageError(img) {
    const container = img.parentElement;
    if (container) {
        container.style.display = 'none';
    }
}

// Улучшенный лайтбокс с навигацией
function openImageLightboxImproved(imageSrc, currentIndex) {
    if (!currentReserveData || !currentReserveData.gallery) return;
    
    const gallery = currentReserveData.gallery;
    let index = currentIndex;
    
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.id = 'imageLightbox';
    
    function updateLightboxImage() {
        const img = lightbox.querySelector('.image-lightbox__image');
        const counter = lightbox.querySelector('.image-lightbox__counter');
        
        img.src = gallery[index];
        img.alt = `${currentReserveData.name} - фото ${index + 1}`;
        counter.textContent = `${index + 1} / ${gallery.length}`;
        
        // Обновить состояние кнопок
        const prevBtn = lightbox.querySelector('.image-lightbox__prev');
        const nextBtn = lightbox.querySelector('.image-lightbox__next');
        
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === gallery.length - 1;
    }
    
    lightbox.innerHTML = `
        <div class="image-lightbox__overlay" onclick="document.getElementById('imageLightbox').remove()"></div>
        <img src="${imageSrc}" class="image-lightbox__image" alt="">
        <button class="image-lightbox__close" onclick="document.getElementById('imageLightbox').remove()">×</button>
        <div class="image-lightbox__counter">${index + 1} / ${gallery.length}</div>
        ${gallery.length > 1 ? `
            <button class="image-lightbox__prev" onclick="event.stopPropagation()">‹</button>
            <button class="image-lightbox__next" onclick="event.stopPropagation()">›</button>
        ` : ''}
    `;
    
    document.body.appendChild(lightbox);
    
    // Навигация
    if (gallery.length > 1) {
        const prevBtn = lightbox.querySelector('.image-lightbox__prev');
        const nextBtn = lightbox.querySelector('.image-lightbox__next');
        
        prevBtn.addEventListener('click', () => {
            if (index > 0) {
                index--;
                updateLightboxImage();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (index < gallery.length - 1) {
                index++;
                updateLightboxImage();
            }
        });
        
        // Клавиатурная навигация
        const handleKeyboard = (e) => {
            if (e.key === 'ArrowLeft' && index > 0) {
                index--;
                updateLightboxImage();
            } else if (e.key === 'ArrowRight' && index < gallery.length - 1) {
                index++;
                updateLightboxImage();
            } else if (e.key === 'Escape') {
                lightbox.remove();
                document.removeEventListener('keydown', handleKeyboard);
            }
        };
        
        document.addEventListener('keydown', handleKeyboard);
    }
}

// Переопределить старые функции
updateReserveGallery = updateReserveGalleryImproved;
openImageLightbox = openImageLightboxImproved;
