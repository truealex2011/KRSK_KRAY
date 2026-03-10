// ============================================
// RESERVES DATABASE
// База данных заповедников Красноярского края
// ============================================

const RESERVES_DATABASE = {
    'stolby': {
        name: 'Столбы',
        nameEn: 'Stolby',
        year: 1925,
        area: '47 тыс га',
        areaNum: 47000,
        status: 'Государственный природный заповедник',
        unesco: false,
        mainImage: 'assets/images/priroda/reserves/stolby.jpg',
        gallery: [
            'assets/images/priroda/reserves/stolby/gallery-1.webp',
            'assets/images/priroda/reserves/stolby/gallery-2.webp',
            'assets/images/priroda/reserves/stolby/gallery-3.jpg'
        ],
        coordinates: [55.9333, 92.7667], // Широта, Долгота
        shortDescription: 'Уникальные сиенитовые скалы-останцы высотой до 100 метров.',
        tabs: [
            {
                title: 'Обзор',
                icon: '',
                content: `
                    <div class="reserve-overview">
                        <p class="reserve-text">
                            Заповедник "Столбы" — один из старейших заповедников России, основанный в 1925 году. 
                            Расположен на северо-западных отрогах Восточного Саяна, граничит с Красноярском.
                        </p>
                        <div class="reserve-stats">
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Год основания</div>
                                    <div class="reserve-stat__value">1925</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Площадь</div>
                                    <div class="reserve-stat__value">47 219 га</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Высота скал</div>
                                    <div class="reserve-stat__value">До 100 м</div>
                                </div>
                            </div>
                        </div>
                        <ul class="reserve-features">
                            <li> Уникальные сиенитовые скалы-останцы</li>
                            <li> Центр скалолазания и альпинизма</li>
                            <li> Пихтово-еловая тайга</li>
                            <li> Более 1 млн посетителей в год</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Флора и фауна',
                icon: '',
                content: `
                    <div class="reserve-nature">
                        <h4>Животный мир (58 видов млекопитающих, 200 видов птиц)</h4>
                        <div class="species-mini-grid">
                            <div class="species-mini-card" onclick="openSpeciesGallery('bear')">
                                <img src="assets/images/priroda/flora_fauna/fauna/bear.png" alt="Медведь">
                                <span>Медведь</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('wolf')">
                                <img src="assets/images/priroda/flora_fauna/fauna/wolf.png" alt="Волк">
                                <span>Волк</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('lynx')">
                                <img src="assets/images/priroda/flora_fauna/fauna/lynx.png" alt="Рысь">
                                <span>Рысь</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('sable')">
                                <img src="assets/images/priroda/flora_fauna/fauna/sable.png" alt="Соболь">
                                <span>Соболь</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('fox')">
                                <img src="assets/images/priroda/flora_fauna/fauna/fox.png" alt="Лиса">
                                <span>Лиса</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('wolverine')">
                                <img src="assets/images/priroda/flora_fauna/fauna/wolverine.png" alt="Росомаха">
                                <span>Росомаха</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('moose')">
                                <img src="assets/images/priroda/flora_fauna/fauna/moose.png" alt="Лось">
                                <span>Лось</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('roe-deer')">
                                <img src="assets/images/priroda/flora_fauna/fauna/roe-deer.png" alt="Косуля">
                                <span>Косуля</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('hare')">
                                <img src="assets/images/priroda/flora_fauna/fauna/hare.png" alt="Заяц">
                                <span>Заяц</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('beaver')">
                                <img src="assets/images/priroda/flora_fauna/fauna/beaver.png" alt="Бобр">
                                <span>Бобр</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('eagle')">
                                <img src="assets/images/priroda/flora_fauna/fauna/eagle.png" alt="Орёл">
                                <span>Орёл</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('owl')">
                                <img src="assets/images/priroda/flora_fauna/fauna/owl.png" alt="Сова">
                                <span>Сова</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('capercaillie')">
                                <img src="assets/images/priroda/flora_fauna/fauna/capercaillie.png" alt="Глухарь">
                                <span>Глухарь</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('grouse')">
                                <img src="assets/images/priroda/flora_fauna/fauna/grouse.png" alt="Рябчик">
                                <span>Рябчик</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('crossbill')">
                                <img src="assets/images/priroda/flora_fauna/fauna/crossbill.png" alt="Клёст">
                                <span>Клёст</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('nutcracker')">
                                <img src="assets/images/priroda/flora_fauna/fauna/nutcracker.png" alt="Кедровка">
                                <span>Кедровка</span>
                            </div>
                        </div>
                        
                        <h4>Растительный мир (740+ видов)</h4>
                        <div class="species-mini-grid">
                            <div class="species-mini-card" onclick="openSpeciesGallery('cedar')">
                                <img src="assets/images/priroda/flora_fauna/flora/cedar.png" alt="Кедр">
                                <span>Кедр</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('pine')">
                                <img src="assets/images/priroda/flora_fauna/flora/pine.png" alt="Сосна">
                                <span>Сосна</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('fir')">
                                <img src="assets/images/priroda/flora_fauna/flora/fir.png" alt="Пихта">
                                <span>Пихта</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('spruce')">
                                <img src="assets/images/priroda/flora_fauna/flora/spruce.png" alt="Ель">
                                <span>Ель</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('larch')">
                                <img src="assets/images/priroda/flora_fauna/flora/larch.png" alt="Лиственница">
                                <span>Лиственница</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('birch')">
                                <img src="assets/images/priroda/flora_fauna/flora/birch.png" alt="Берёза">
                                <span>Берёза</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('aspen')">
                                <img src="assets/images/priroda/flora_fauna/flora/aspen.png" alt="Осина">
                                <span>Осина</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('rowan')">
                                <img src="assets/images/priroda/flora_fauna/flora/rowan.png" alt="Рябина">
                                <span>Рябина</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('bird-cherry')">
                                <img src="assets/images/priroda/flora_fauna/flora/bird-cherry.png" alt="Черёмуха">
                                <span>Черёмуха</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('willow')">
                                <img src="assets/images/priroda/flora_fauna/flora/willow.png" alt="Ива">
                                <span>Ива</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('lingonberry')">
                                <img src="assets/images/priroda/flora_fauna/flora/lingonberry-Photoroom.png" alt="Брусника">
                                <span>Брусника</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('blueberry')">
                                <img src="assets/images/priroda/flora_fauna/flora/blueberry-Photoroom.png" alt="Черника">
                                <span>Черника</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('raspberry')">
                                <img src="assets/images/priroda/flora_fauna/flora/raspberry.png" alt="Малина">
                                <span>Малина</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('currant')">
                                <img src="assets/images/priroda/flora_fauna/flora/currant.png" alt="Смородина">
                                <span>Смородина</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('rose-hip')">
                                <img src="assets/images/priroda/flora_fauna/flora/rose-hip.png" alt="Шиповник">
                                <span>Шиповник</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('fern')">
                                <img src="assets/images/priroda/flora_fauna/flora/fern.png" alt="Папоротник">
                                <span>Папоротник</span>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                title: 'Достопримечательности',
                icon: '',
                content: `
                    <div class="reserve-attractions">
                        <ul class="reserve-list">
                            <li><strong>Дед</strong> — самая известная скала, символ заповедника</li>
                            <li><strong>Перья</strong> — группа высоких скал</li>
                            <li><strong>Львиные ворота</strong> — узкий проход между скалами</li>
                            <li><strong>Такмак</strong> — отдельно стоящая гора (675 м)</li>
                            <li><strong>Смотровая площадка</strong> — панорама Красноярска</li>
                        </ul>
                        <div class="reserve-routes">
                            <h4>Популярные маршруты:</h4>
                            <div class="route-card">
                                <div class="route-name"> Центральные Столбы</div>
                                <div class="route-info">6 км • 3-4 часа • Средняя сложность</div>
                            </div>
                            <div class="route-card">
                                <div class="route-name"> Такмак</div>
                                <div class="route-info">8 км • 4-5 часов • Высокая сложность</div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                title: 'Местоположение на карте',
                icon: '',
                content: `
                    <div class="reserve-access">
                        <div id="reserve-map-stolby" class="reserve-map"></div>
                    </div>
                `
            }
        ]
    },

    'putorana': {
        name: 'Путоранский',
        nameEn: 'Putorana',
        year: 1988,
        area: '1,9 млн га',
        areaNum: 1900000,
        status: 'Государственный природный заповедник',
        unesco: true,
        mainImage: 'assets/images/priroda/reserves/putorana.jpg',
        gallery: [
            'assets/images/priroda/reserves/putorana/gallery-1.webp',
            'assets/images/priroda/reserves/putorana/gallery-2.webp',
            'assets/images/priroda/reserves/putorana/gallery-3.webp'
        ],
        coordinates: [69.0, 93.5],
        shortDescription: 'Объект ЮНЕСКО. Плато с 25 000 озёр и 18 000 водопадов.',
        tabs: [
            {
                title: 'Обзор',
                icon: '',
                content: `
                    <div class="reserve-overview">
                        <p class="reserve-text">
                            Путоранский заповедник — объект Всемирного наследия ЮНЕСКО с 2010 года. 
                            Расположен на плато Путорана за Полярным кругом. "Край десяти тысяч озёр и тысячи водопадов".
                        </p>
                        <div class="reserve-stats">
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Статус</div>
                                    <div class="reserve-stat__value">ЮНЕСКО</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Озёра</div>
                                    <div class="reserve-stat__value">25 000</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Водопады</div>
                                    <div class="reserve-stat__value">18 000</div>
                                </div>
                            </div>
                        </div>
                        <ul class="reserve-features">
                            <li> Плато высотой до 1701 м</li>
                            <li> Крупнейшая популяция дикого северного оленя</li>
                            <li> Субарктический климат</li>
                            <li> Объект Всемирного наследия ЮНЕСКО</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Флора и фауна',
                icon: '',
                content: `
                    <div class="reserve-nature">
                        <h4>Животный мир (34 вида млекопитающих, 184 вида птиц)</h4>
                        <div class="species-mini-grid">
                            <div class="species-mini-card" onclick="openSpeciesGallery('reindeer')">
                                <img src="assets/images/priroda/flora_fauna/fauna/reindeer.png" alt="Северный олень">
                                <span>Северный олень</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('sheep')">
                                <img src="assets/images/priroda/flora_fauna/fauna/sheep.png" alt="Снежный баран">
                                <span>Снежный баран</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('bear')">
                                <img src="assets/images/priroda/flora_fauna/fauna/bear.png" alt="Медведь">
                                <span>Медведь</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('wolf')">
                                <img src="assets/images/priroda/flora_fauna/fauna/wolf.png" alt="Волк">
                                <span>Волк</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('wolverine')">
                                <img src="assets/images/priroda/flora_fauna/fauna/wolverine.png" alt="Росомаха">
                                <span>Росомаха</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('lynx')">
                                <img src="assets/images/priroda/flora_fauna/fauna/lynx.png" alt="Рысь">
                                <span>Рысь</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('fox')">
                                <img src="assets/images/priroda/flora_fauna/fauna/fox.png" alt="Лиса">
                                <span>Лиса</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('moose')">
                                <img src="assets/images/priroda/flora_fauna/fauna/moose.png" alt="Лось">
                                <span>Лось</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('gyrfalcon')">
                                <img src="assets/images/priroda/flora_fauna/fauna/gyrfalcon.png" alt="Кречет">
                                <span>Кречет</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('golden-eagle')">
                                <img src="assets/images/priroda/flora_fauna/fauna/golden-eagle.png" alt="Беркут">
                                <span>Беркут</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('crane')">
                                <img src="assets/images/priroda/flora_fauna/fauna/crane.png" alt="Журавль">
                                <span>Журавль</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('goose')">
                                <img src="assets/images/priroda/flora_fauna/fauna/goose.png" alt="Гусь">
                                <span>Гусь</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('taimen')">
                                <img src="assets/images/priroda/flora_fauna/fauna/taimen.png" alt="Таймень">
                                <span>Таймень</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('grayling')">
                                <img src="assets/images/priroda/flora_fauna/fauna/grayling.png" alt="Хариус">
                                <span>Хариус</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('lenok')">
                                <img src="assets/images/priroda/flora_fauna/fauna/lenok.png" alt="Ленок">
                                <span>Ленок</span>
                            </div>
                        </div>
                        
                        <h4>Растительный мир (400+ видов)</h4>
                        <div class="species-mini-grid">
                            <div class="species-mini-card" onclick="openSpeciesGallery('larch')">
                                <img src="assets/images/priroda/flora_fauna/flora/larch.png" alt="Лиственница">
                                <span>Лиственница</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('dwarf-pine')">
                                <img src="assets/images/priroda/flora_fauna/flora/dwarf-pine-Photoroom.png" alt="Кедровый стланик">
                                <span>Кедровый стланик</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('birch')">
                                <img src="assets/images/priroda/flora_fauna/flora/birch.png" alt="Берёза">
                                <span>Берёза</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('willow')">
                                <img src="assets/images/priroda/flora_fauna/flora/willow.png" alt="Ива">
                                <span>Ива</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('alder')">
                                <img src="assets/images/priroda/flora_fauna/flora/alder.png" alt="Ольха">
                                <span>Ольха</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('cloudberry')">
                                <img src="assets/images/priroda/flora_fauna/flora/cloudberry.png" alt="Морошка">
                                <span>Морошка</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('lingonberry')">
                                <img src="assets/images/priroda/flora_fauna/flora/lingonberry-Photoroom.png" alt="Брусника">
                                <span>Брусника</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('blueberry')">
                                <img src="assets/images/priroda/flora_fauna/flora/blueberry-Photoroom.png" alt="Черника">
                                <span>Черника</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('cranberry')">
                                <img src="assets/images/priroda/flora_fauna/flora/cranberry.png" alt="Клюква">
                                <span>Клюква</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('ledum')">
                                <img src="assets/images/priroda/flora_fauna/flora/ledum-Photoroom.png" alt="Багульник">
                                <span>Багульник</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('rhododendron')">
                                <img src="assets/images/priroda/flora_fauna/flora/rhododendron.png" alt="Рододендрон">
                                <span>Рододендрон</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('moss')">
                                <img src="assets/images/priroda/flora_fauna/flora/moss.png" alt="Мох">
                                <span>Мох</span>
                            </div>
                            <div class="species-mini-card" onclick="openSpeciesGallery('lichen')">
                                <img src="assets/images/priroda/flora_fauna/flora/lichen.png" alt="Лишайник">
                                <span>Лишайник</span>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                title: 'Достопримечательности',
                icon: '',
                content: `
                    <div class="reserve-attractions">
                        <ul class="reserve-list">
                            <li><strong>Озеро Лама</strong> — одно из красивейших озёр России (глубина 250 м)</li>
                            <li><strong>Водопад Тальниковый</strong> — высочайший в России (700 м)</li>
                            <li><strong>Каньоны</strong> — глубиной до 1000 метров</li>
                            <li><strong>Плато</strong> — уникальный ландшафт "сибирской Шотландии"</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Местоположение на карте',
                icon: '',
                content: `
                    <div class="reserve-access">
                        <div id="reserve-map-putorana" class="reserve-map"></div>
                    </div>
                `
            }
        ]
    },

    'big-arctic': {
        name: 'Большой Арктический',
        nameEn: 'Big Arctic',
        year: 1993,
        area: '4,2 млн га',
        areaNum: 4200000,
        status: 'Крупнейший заповедник России',
        unesco: false,
        mainImage: 'assets/images/priroda/reserves/big-arctic.jpg',
        gallery: [
            'assets/images/priroda/reserves/big-arctic/gallery-1.jpg',
            'assets/images/priroda/reserves/big-arctic/gallery-2.jpg',
            'assets/images/priroda/reserves/big-arctic/gallery-3.jpg'
        ],
        coordinates: [75.5, 98.0],
        shortDescription: 'Крупнейший заповедник России. 124 вида птиц.',
        tabs: [
            {
                title: 'Обзор',
                icon: '',
                content: `
                    <div class="reserve-overview">
                        <p class="reserve-text">
                            Большой Арктический заповедник — крупнейший заповедник России и третий по величине в мире! 
                            Его площадь превышает территорию Швейцарии. Расположен на полуострове Таймыр и островах Карского моря.
                        </p>
                        <div class="reserve-stats">
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Год основания</div>
                                    <div class="reserve-stat__value">1993</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Площадь</div>
                                    <div class="reserve-stat__value">4,2 млн га</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Виды птиц</div>
                                    <div class="reserve-stat__value">124</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Острова</div>
                                    <div class="reserve-stat__value">30+</div>
                                </div>
                            </div>
                        </div>
                        <ul class="reserve-features">
                            <li> Крупнейший заповедник России (больше Швейцарии)</li>
                            <li> Важнейшее место гнездования арктических птиц</li>
                            <li> Арктическая тундра и полярные пустыни</li>
                            <li> Включает острова Карского моря</li>
                            <li> Побережье протяженностью более 1000 км</li>
                            <li>� Белые медведи, моржи, нерпы</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Флора и фауна',
                icon: '',
                content: `<div class="reserve-nature">
                    <h4>Животный мир (18 видов млекопитающих, 124 вида птиц)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('reindeer')">
                            <img src="assets/images/priroda/flora_fauna/fauna/reindeer.png" alt="Северный олень">
                            <span>Северный олень</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('wolf')">
                            <img src="assets/images/priroda/flora_fauna/fauna/wolf.png" alt="Волк">
                            <span>Волк</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('fox')">
                            <img src="assets/images/priroda/flora_fauna/fauna/fox.png" alt="Песец">
                            <span>Песец</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('wolverine')">
                            <img src="assets/images/priroda/flora_fauna/fauna/wolverine.png" alt="Росомаха">
                            <span>Росомаха</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('gyrfalcon')">
                            <img src="assets/images/priroda/flora_fauna/fauna/gyrfalcon.png" alt="Кречет">
                            <span>Кречет</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('owl')">
                            <img src="assets/images/priroda/flora_fauna/fauna/owl.png" alt="Полярная сова">
                            <span>Полярная сова</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('goose')">
                            <img src="assets/images/priroda/flora_fauna/fauna/goose.png" alt="Гусь">
                            <span>Гусь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('crane')">
                            <img src="assets/images/priroda/flora_fauna/fauna/crane.png" alt="Журавль">
                            <span>Журавль</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('falcon')">
                            <img src="assets/images/priroda/flora_fauna/fauna/falcon.png" alt="Сокол">
                            <span>Сокол</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('omul')">
                            <img src="assets/images/priroda/flora_fauna/fauna/omul.png" alt="Омуль">
                            <span>Омуль</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('nelma')">
                            <img src="assets/images/priroda/flora_fauna/fauna/nelma.png" alt="Нельма">
                            <span>Нельма</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('muksun')">
                            <img src="assets/images/priroda/flora_fauna/fauna/muksun.png" alt="Муксун">
                            <span>Муксун</span>
                        </div>
                    </div>
                    <h4>Растительный мир (арктическая тундра)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('moss')">
                            <img src="assets/images/priroda/flora_fauna/flora/moss.png" alt="Мох">
                            <span>Мох</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('lichen')">
                            <img src="assets/images/priroda/flora_fauna/flora/lichen.png" alt="Лишайник">
                            <span>Лишайник</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('dwarf-pine')">
                            <img src="assets/images/priroda/flora_fauna/flora/dwarf-pine-Photoroom.png" alt="Кедровый стланик">
                            <span>Кедровый стланик</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('willow')">
                            <img src="assets/images/priroda/flora_fauna/flora/willow.png" alt="Карликовая ива">
                            <span>Карликовая ива</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('cloudberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/cloudberry.png" alt="Морошка">
                            <span>Морошка</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('lingonberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/lingonberry-Photoroom.png" alt="Брусника">
                            <span>Брусника</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('cranberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/cranberry.png" alt="Клюква">
                            <span>Клюква</span>
                        </div>
                    </div>
                </div>`
            },
            {
                title: 'Достопримечательности',
                icon: '',
                content: `
                    <div class="reserve-attractions">
                        <ul class="reserve-list">
                            <li><strong>Острова Карского моря</strong> — более 30 островов с уникальной природой</li>
                            <li><strong>Птичьи базары</strong> — крупнейшие колонии арктических птиц</li>
                            <li><strong>Лежбища моржей</strong> — места скопления морских млекопитающих</li>
                            <li><strong>Арктическая тундра</strong> — бескрайние просторы полярных пустынь</li>
                            <li><strong>Ледники</strong> — древние ледниковые образования</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Местоположение на карте',
                icon: '',
                content: `<div class="reserve-access">
                    <div id="reserve-map-big-arctic" class="reserve-map"></div>
                </div>`
            }
        ]
    },

    'taimyr': {
        name: 'Таймырский',
        nameEn: 'Taimyr',
        year: 1979,
        area: '1,8 млн га',
        areaNum: 1800000,
        status: 'Государственный природный заповедник',
        unesco: false,
        mainImage: 'assets/images/priroda/reserves/taimyr.jpg',
        gallery: [
            'assets/images/priroda/reserves/taimyr/gallery-1.webp',
            'assets/images/priroda/reserves/taimyr/gallery-2.jpg',
            'assets/images/priroda/reserves/taimyr/gallery-3.jpg'
        ],
        coordinates: [74.5, 101.0],
        shortDescription: 'Северный олень, овцебык. Арктическая тундра.',
        tabs: [
            {
                title: 'Обзор',
                icon: '',
                content: `
                    <div class="reserve-overview">
                        <p class="reserve-text">
                            Таймырский заповедник — самый северный заповедник материковой России. 
                            Создан для охраны и изучения уникальных экосистем тундры, а также крупнейшей в мире популяции дикого северного оленя.
                        </p>
                        <div class="reserve-stats">
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Год основания</div>
                                    <div class="reserve-stat__value">1979</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Площадь</div>
                                    <div class="reserve-stat__value">1,8 млн га</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Северные олени</div>
                                    <div class="reserve-stat__value">500 000+</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Полярная ночь</div>
                                    <div class="reserve-stat__value">65 дней</div>
                                </div>
                            </div>
                        </div>
                        <ul class="reserve-features">
                            <li> Крупнейшее в мире стадо диких северных оленей</li>
                            <li> Успешная реинтродукция овцебыков</li>
                            <li> Полярная ночь длится более 2 месяцев</li>
                            <li> Побережье моря Лаптевых</li>
                            <li> От тундры до горных массивов</li>
                            <li> Гнездовья редких хищных птиц</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Флора и фауна',
                icon: '',
                content: `<div class="reserve-nature">
                    <h4>Животный мир (21 вид млекопитающих, 110 видов птиц)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('reindeer')">
                            <img src="assets/images/priroda/flora_fauna/fauna/reindeer.png" alt="Северный олень">
                            <span>Северный олень</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('sheep')">
                            <img src="assets/images/priroda/flora_fauna/fauna/sheep.png" alt="Овцебык">
                            <span>Овцебык</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('wolf')">
                            <img src="assets/images/priroda/flora_fauna/fauna/wolf.png" alt="Волк">
                            <span>Волк</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('fox')">
                            <img src="assets/images/priroda/flora_fauna/fauna/fox.png" alt="Песец">
                            <span>Песец</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('wolverine')">
                            <img src="assets/images/priroda/flora_fauna/fauna/wolverine.png" alt="Росомаха">
                            <span>Росомаха</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('owl')">
                            <img src="assets/images/priroda/flora_fauna/fauna/owl.png" alt="Белая сова">
                            <span>Белая сова</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('falcon')">
                            <img src="assets/images/priroda/flora_fauna/fauna/falcon.png" alt="Сокол-сапсан">
                            <span>Сокол-сапсан</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('gyrfalcon')">
                            <img src="assets/images/priroda/flora_fauna/fauna/gyrfalcon.png" alt="Кречет">
                            <span>Кречет</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('goose')">
                            <img src="assets/images/priroda/flora_fauna/fauna/goose.png" alt="Гусь">
                            <span>Гусь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('crane')">
                            <img src="assets/images/priroda/flora_fauna/fauna/crane.png" alt="Журавль">
                            <span>Журавль</span>
                        </div>
                    </div>
                    <h4>Растительный мир (430+ видов)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('moss')">
                            <img src="assets/images/priroda/flora_fauna/flora/moss.png" alt="Мох">
                            <span>Мох</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('lichen')">
                            <img src="assets/images/priroda/flora_fauna/flora/lichen.png" alt="Лишайник">
                            <span>Лишайник</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('dwarf-pine')">
                            <img src="assets/images/priroda/flora_fauna/flora/dwarf-pine-Photoroom.png" alt="Кедровый стланик">
                            <span>Кедровый стланик</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('willow')">
                            <img src="assets/images/priroda/flora_fauna/flora/willow.png" alt="Карликовая ива">
                            <span>Карликовая ива</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('cloudberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/cloudberry.png" alt="Морошка">
                            <span>Морошка</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('lingonberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/lingonberry-Photoroom.png" alt="Брусника">
                            <span>Брусника</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('cranberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/cranberry.png" alt="Клюква">
                            <span>Клюква</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('ledum')">
                            <img src="assets/images/priroda/flora_fauna/flora/ledum-Photoroom.png" alt="Багульник">
                            <span>Багульник</span>
                        </div>
                    </div>
                </div>`
            },
            {
                title: 'Достопримечательности',
                icon: '',
                content: `
                    <div class="reserve-attractions">
                        <ul class="reserve-list">
                            <li><strong>Таймырская тундра</strong> — крупнейшая популяция дикого северного оленя</li>
                            <li><strong>Стада овцебыков</strong> — реликтовые животные ледникового периода</li>
                            <li><strong>Арктические озёра</strong> — места гнездования водоплавающих птиц</li>
                            <li><strong>Полярная ночь и день</strong> — уникальные природные явления</li>
                            <li><strong>Вечная мерзлота</strong> — древние ледяные образования</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Местоположение на карте',
                icon: '',
                content: `<div class="reserve-access">
                    <div id="reserve-map-taimyr" class="reserve-map"></div>
                </div>`
            }
        ]
    },

    'tunguska': {
        name: 'Тунгусский',
        nameEn: 'Tunguska',
        year: 1995,
        area: '296 тыс га',
        areaNum: 296000,
        status: 'Государственный природный заповедник',
        unesco: false,
        mainImage: 'assets/images/priroda/reserves/tunguska.jpg',
        gallery: [
            'assets/images/priroda/reserves/tunguska/gallery-1.webp',
            'assets/images/priroda/reserves/tunguska/gallery-2.webp',
            'assets/images/priroda/reserves/tunguska/gallery-3.webp'
        ],
        coordinates: [60.9, 101.9],
        shortDescription: 'Место падения Тунгусского метеорита 1908 года.',
        tabs: [
            {
                title: 'Обзор',
                icon: '',
                content: `
                    <div class="reserve-overview">
                        <p class="reserve-text">
                            Тунгусский заповедник создан для изучения последствий падения Тунгусского метеорита 1908 года — 
                            одного из самых загадочных событий XX века. Взрыв мощностью 40-50 мегатонн повалил лес на площади 2150 км².
                        </p>
                        <div class="reserve-stats">
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Тунгусский феномен</div>
                                    <div class="reserve-stat__value">1908</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Площадь</div>
                                    <div class="reserve-stat__value">296 тыс га</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Мощность взрыва</div>
                                    <div class="reserve-stat__value">40-50 Мт</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Повалено леса</div>
                                    <div class="reserve-stat__value">2150 км²</div>
                                </div>
                            </div>
                        </div>
                        <ul class="reserve-features">
                            <li> Эпицентр Тунгусского феномена 1908 года</li>
                            <li> Уникальная восстановившаяся тайга</li>
                            <li> Постоянные научные исследования</li>
                            <li> Сохранившиеся следы катастрофы</li>
                            <li> Место паломничества ученых со всего мира</li>
                            <li> Богатая фауна средней тайги</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Флора и фауна',
                icon: '',
                content: `<div class="reserve-nature">
                    <h4>Животный мир (40 видов млекопитающих, 150 видов птиц)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('bear')">
                            <img src="assets/images/priroda/flora_fauna/fauna/bear.png" alt="Медведь">
                            <span>Медведь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('moose')">
                            <img src="assets/images/priroda/flora_fauna/fauna/moose.png" alt="Лось">
                            <span>Лось</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('wolf')">
                            <img src="assets/images/priroda/flora_fauna/fauna/wolf.png" alt="Волк">
                            <span>Волк</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('sable')">
                            <img src="assets/images/priroda/flora_fauna/fauna/sable.png" alt="Соболь">
                            <span>Соболь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('lynx')">
                            <img src="assets/images/priroda/flora_fauna/fauna/lynx.png" alt="Рысь">
                            <span>Рысь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('wolverine')">
                            <img src="assets/images/priroda/flora_fauna/fauna/wolverine.png" alt="Росомаха">
                            <span>Росомаха</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('capercaillie')">
                            <img src="assets/images/priroda/flora_fauna/fauna/capercaillie.png" alt="Глухарь">
                            <span>Глухарь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('grouse')">
                            <img src="assets/images/priroda/flora_fauna/fauna/grouse.png" alt="Рябчик">
                            <span>Рябчик</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('eagle')">
                            <img src="assets/images/priroda/flora_fauna/fauna/eagle.png" alt="Орёл">
                            <span>Орёл</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('taimen')">
                            <img src="assets/images/priroda/flora_fauna/fauna/taimen.png" alt="Таймень">
                            <span>Таймень</span>
                        </div>
                    </div>
                    <h4>Растительный мир (восстановившаяся тайга)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('larch')">
                            <img src="assets/images/priroda/flora_fauna/flora/larch.png" alt="Лиственница">
                            <span>Лиственница</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('spruce')">
                            <img src="assets/images/priroda/flora_fauna/flora/spruce.png" alt="Ель">
                            <span>Ель</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('pine')">
                            <img src="assets/images/priroda/flora_fauna/flora/pine.png" alt="Сосна">
                            <span>Сосна</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('birch')">
                            <img src="assets/images/priroda/flora_fauna/flora/birch.png" alt="Берёза">
                            <span>Берёза</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('lingonberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/lingonberry-Photoroom.png" alt="Брусника">
                            <span>Брусника</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('blueberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/blueberry-Photoroom.png" alt="Черника">
                            <span>Черника</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('moss')">
                            <img src="assets/images/priroda/flora_fauna/flora/moss.png" alt="Мох">
                            <span>Мох</span>
                        </div>
                    </div>
                </div>`
            },
            {
                title: 'Достопримечательности',
                icon: '',
                content: `
                    <div class="reserve-attractions">
                        <ul class="reserve-list">
                            <li><strong>Эпицентр взрыва</strong> — место падения Тунгусского метеорита 1908 года</li>
                            <li><strong>Поваленный лес</strong> — деревья, сваленные взрывной волной</li>
                            <li><strong>Восстановившаяся тайга</strong> — уникальный пример природной регенерации</li>
                            <li><strong>Научная станция</strong> — центр изучения феномена</li>
                            <li><strong>Музей метеорита</strong> — экспозиция о событии 1908 года</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Местоположение на карте',
                icon: '',
                content: `<div class="reserve-access">
                    <div id="reserve-map-tunguska" class="reserve-map"></div>
                </div>`
            }
        ]
    },

    'sayano-shushenskiy': {
        name: 'Саяно-Шушенский',
        nameEn: 'Sayano-Shushenskiy',
        year: 1976,
        area: '390 тыс га',
        areaNum: 390000,
        status: 'Государственный природный биосферный заповедник',
        unesco: false,
        mainImage: 'assets/images/priroda/reserves/sayano-shushenskiy.jpg',
        gallery: [
            'assets/images/priroda/reserves/sayano-shushenskiy/gallery-1.jpg',
            'assets/images/priroda/reserves/sayano-shushenskiy/gallery-2.webp',
            'assets/images/priroda/reserves/sayano-shushenskiy/gallery-3.webp'
        ],
        coordinates: [52.0, 91.5],
        shortDescription: 'Снежный барс, горная тайга. Уникальная флора и фауна.',
        tabs: [
            {
                title: 'Обзор',
                icon: '',
                content: `
                    <div class="reserve-overview">
                        <p class="reserve-text">
                            Саяно-Шушенский биосферный заповедник расположен в горах Западного Саяна на юге Красноярского края. 
                            Это единственное место в России, где обитает снежный барс (ирбис) — один из самых редких хищников планеты.
                        </p>
                        <div class="reserve-stats">
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Год основания</div>
                                    <div class="reserve-stat__value">1976</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Площадь</div>
                                    <div class="reserve-stat__value">390 тыс га</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Снежные барсы</div>
                                    <div class="reserve-stat__value">15-20</div>
                                </div>
                            </div>
                            <div class="reserve-stat">
                                <span class="reserve-stat__icon"></span>
                                <div>
                                    <div class="reserve-stat__label">Высота</div>
                                    <div class="reserve-stat__value">До 2735 м</div>
                                </div>
                            </div>
                        </div>
                        <ul class="reserve-features">
                            <li> Единственное место обитания снежного барса в России</li>
                            <li> Горная тайга и альпийские луга</li>
                            <li> Крупнейшая популяция сибирского горного козла</li>
                            <li> Берега Саяно-Шушенского водохранилища</li>
                            <li> Биосферный резерват ЮНЕСКО</li>
                            <li> Уникальная высотная поясность растительности</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Флора и фауна',
                icon: '',
                content: `<div class="reserve-nature">
                    <h4>Животный мир (50 видов млекопитающих, 250 видов птиц)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('sheep')">
                            <img src="assets/images/priroda/flora_fauna/fauna/sheep.png" alt="Сибирский горный козёл">
                            <span>Горный козёл</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('bear')">
                            <img src="assets/images/priroda/flora_fauna/fauna/bear.png" alt="Медведь">
                            <span>Медведь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('lynx')">
                            <img src="assets/images/priroda/flora_fauna/fauna/lynx.png" alt="Рысь">
                            <span>Рысь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('wolf')">
                            <img src="assets/images/priroda/flora_fauna/fauna/wolf.png" alt="Волк">
                            <span>Волк</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('wolverine')">
                            <img src="assets/images/priroda/flora_fauna/fauna/wolverine.png" alt="Росомаха">
                            <span>Росомаха</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('sable')">
                            <img src="assets/images/priroda/flora_fauna/fauna/sable.png" alt="Соболь">
                            <span>Соболь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('moose')">
                            <img src="assets/images/priroda/flora_fauna/fauna/moose.png" alt="Марал">
                            <span>Марал</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('roe-deer')">
                            <img src="assets/images/priroda/flora_fauna/fauna/roe-deer.png" alt="Косуля">
                            <span>Косуля</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('golden-eagle')">
                            <img src="assets/images/priroda/flora_fauna/fauna/golden-eagle.png" alt="Беркут">
                            <span>Беркут</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('falcon')">
                            <img src="assets/images/priroda/flora_fauna/fauna/falcon.png" alt="Сокол">
                            <span>Сокол</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('capercaillie')">
                            <img src="assets/images/priroda/flora_fauna/fauna/capercaillie.png" alt="Глухарь">
                            <span>Глухарь</span>
                        </div>
                    </div>
                    <h4>Растительный мир (1000+ видов)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('cedar')">
                            <img src="assets/images/priroda/flora_fauna/flora/cedar.png" alt="Кедр">
                            <span>Кедр</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('pine')">
                            <img src="assets/images/priroda/flora_fauna/flora/pine.png" alt="Сосна">
                            <span>Сосна</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('fir')">
                            <img src="assets/images/priroda/flora_fauna/flora/fir.png" alt="Пихта">
                            <span>Пихта</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('larch')">
                            <img src="assets/images/priroda/flora_fauna/flora/larch.png" alt="Лиственница">
                            <span>Лиственница</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('rhododendron')">
                            <img src="assets/images/priroda/flora_fauna/flora/rhododendron.png" alt="Рододендрон">
                            <span>Рододендрон</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('rhodiola')">
                            <img src="assets/images/priroda/flora_fauna/flora/rhodiola.png" alt="Родиола">
                            <span>Родиола</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('lingonberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/lingonberry-Photoroom.png" alt="Брусника">
                            <span>Брусника</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('blueberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/blueberry-Photoroom.png" alt="Черника">
                            <span>Черника</span>
                        </div>
                    </div>
                </div>`
            },
            {
                title: 'Достопримечательности',
                icon: '',
                content: `
                    <div class="reserve-attractions">
                        <ul class="reserve-list">
                            <li><strong>Снежный барс</strong> — единственное место обитания ирбиса в России</li>
                            <li><strong>Саяно-Шушенская ГЭС</strong> — крупнейшая гидроэлектростанция России</li>
                            <li><strong>Горные вершины</strong> — пики высотой до 2735 метров</li>
                            <li><strong>Альпийские луга</strong> — уникальная высокогорная растительность</li>
                            <li><strong>Водохранилище</strong> — живописные берега и заливы</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Местоположение на карте',
                icon: '',
                content: `<div class="reserve-access">
                    <div id="reserve-map-sayano-shushenskiy" class="reserve-map"></div>
                </div>`
            }
        ]
    },

    'central-siberian': {
        name: 'Центральносибирский',
        nameEn: 'Central Siberian',
        year: 1985,
        area: '972 тыс га',
        areaNum: 972000,
        status: 'Государственный природный биосферный заповедник',
        unesco: false,
        mainImage: 'assets/images/priroda/reserves/central-siberian.jpg',
        gallery: [
            'assets/images/priroda/reserves/central-siberian/gallery-1.jpg',
            'assets/images/priroda/reserves/central-siberian/gallery-2.jpg',
            'assets/images/priroda/reserves/central-siberian/gallery-3.jpg'
        ],
        coordinates: [61.5, 90.5],
        shortDescription: 'Эталон средней тайги. Нетронутая природа.',
        tabs: [
            {
                title: 'Обзор',
                icon: '',
                content: `<div class="reserve-overview">
                    <p class="reserve-text">Эталон нетронутой средней тайги Сибири. Охраняет типичные таёжные экосистемы.</p>
                    <ul class="reserve-features">
                        <li> Девственная тайга</li>
                        <li> Типичная таёжная фауна</li>
                        <li> Река Енисей</li>
                        <li> Биосферный резерват ЮНЕСКО</li>
                    </ul>
                </div>`
            },
            {
                title: 'Флора и фауна',
                icon: '',
                content: `<div class="reserve-nature">
                    <h4>Животный мир (43 вида млекопитающих, 200 видов птиц)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('bear')">
                            <img src="assets/images/priroda/flora_fauna/fauna/bear.png" alt="Медведь">
                            <span>Медведь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('moose')">
                            <img src="assets/images/priroda/flora_fauna/fauna/moose.png" alt="Лось">
                            <span>Лось</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('sable')">
                            <img src="assets/images/priroda/flora_fauna/fauna/sable.png" alt="Соболь">
                            <span>Соболь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('wolverine')">
                            <img src="assets/images/priroda/flora_fauna/fauna/wolverine.png" alt="Росомаха">
                            <span>Росомаха</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('lynx')">
                            <img src="assets/images/priroda/flora_fauna/fauna/lynx.png" alt="Рысь">
                            <span>Рысь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('wolf')">
                            <img src="assets/images/priroda/flora_fauna/fauna/wolf.png" alt="Волк">
                            <span>Волк</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('reindeer')">
                            <img src="assets/images/priroda/flora_fauna/fauna/reindeer.png" alt="Северный олень">
                            <span>Северный олень</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('capercaillie')">
                            <img src="assets/images/priroda/flora_fauna/fauna/capercaillie.png" alt="Глухарь">
                            <span>Глухарь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('eagle')">
                            <img src="assets/images/priroda/flora_fauna/fauna/eagle.png" alt="Орёл">
                            <span>Орёл</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('taimen')">
                            <img src="assets/images/priroda/flora_fauna/fauna/taimen.png" alt="Таймень">
                            <span>Таймень</span>
                        </div>
                    </div>
                    <h4>Растительный мир (600+ видов)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('spruce')">
                            <img src="assets/images/priroda/flora_fauna/flora/spruce.png" alt="Ель">
                            <span>Ель</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('fir')">
                            <img src="assets/images/priroda/flora_fauna/flora/fir.png" alt="Пихта">
                            <span>Пихта</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('cedar')">
                            <img src="assets/images/priroda/flora_fauna/flora/cedar.png" alt="Кедр">
                            <span>Кедр</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('larch')">
                            <img src="assets/images/priroda/flora_fauna/flora/larch.png" alt="Лиственница">
                            <span>Лиственница</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('birch')">
                            <img src="assets/images/priroda/flora_fauna/flora/birch.png" alt="Берёза">
                            <span>Берёза</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('lingonberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/lingonberry-Photoroom.png" alt="Брусника">
                            <span>Брусника</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('blueberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/blueberry-Photoroom.png" alt="Черника">
                            <span>Черника</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('moss')">
                            <img src="assets/images/priroda/flora_fauna/flora/moss.png" alt="Мох">
                            <span>Мох</span>
                        </div>
                    </div>
                </div>`
            },
            {
                title: 'Достопримечательности',
                icon: '',
                content: `
                    <div class="reserve-attractions">
                        <ul class="reserve-list">
                            <li><strong>Река Енисей</strong> — могучая сибирская река в первозданном виде</li>
                            <li><strong>Темнохвойная тайга</strong> — нетронутые леса из ели, пихты и кедра</li>
                            <li><strong>Болотные массивы</strong> — уникальные экосистемы</li>
                            <li><strong>Скальные обнажения</strong> — живописные берега Енисея</li>
                            <li><strong>Медвежьи тропы</strong> — места обитания бурого медведя</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Местоположение на карте',
                icon: '',
                content: `<div class="reserve-access">
                    <div id="reserve-map-central-siberian" class="reserve-map"></div>
                </div>`
            }
        ]
    },

    'ergaki': {
        name: 'Ергаки',
        nameEn: 'Ergaki',
        year: 2005,
        area: '342 тыс га',
        areaNum: 342000,
        status: 'Природный парк',
        unesco: false,
        mainImage: 'assets/images/priroda/reserves/ergaki.jpg',
        gallery: [
            'assets/images/priroda/reserves/ergaki/gallery-1.jpg',
            'assets/images/priroda/reserves/ergaki/gallery-2.webp',
            'assets/images/priroda/reserves/ergaki/gallery-3.webp'
        ],
        coordinates: [52.8, 93.3],
        shortDescription: 'Природный парк. Горные озёра, пики, альпийские луга.',
        tabs: [
            {
                title: 'Обзор',
                icon: '',
                content: `<div class="reserve-overview">
                    <p class="reserve-text">Популярный природный парк в Западном Саяне. Горные озёра, пики, водопады.</p>
                    <ul class="reserve-features">
                        <li> Пик Звёздный (2265 м)</li>
                        <li> Озеро Горных Духов</li>
                        <li> Развитая сеть троп</li>
                        <li>� Туристический центр</li>
                    </ul>
                </div>`
            },
            {
                title: 'Флора и фауна',
                icon: '',
                content: `<div class="reserve-nature">
                    <h4>Животный мир (горная фауна)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('moose')">
                            <img src="assets/images/priroda/flora_fauna/fauna/moose.png" alt="Марал">
                            <span>Марал</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('bear')">
                            <img src="assets/images/priroda/flora_fauna/fauna/bear.png" alt="Медведь">
                            <span>Медведь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('lynx')">
                            <img src="assets/images/priroda/flora_fauna/fauna/lynx.png" alt="Рысь">
                            <span>Рысь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('sable')">
                            <img src="assets/images/priroda/flora_fauna/fauna/sable.png" alt="Соболь">
                            <span>Соболь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('roe-deer')">
                            <img src="assets/images/priroda/flora_fauna/fauna/roe-deer.png" alt="Косуля">
                            <span>Косуля</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('golden-eagle')">
                            <img src="assets/images/priroda/flora_fauna/fauna/golden-eagle.png" alt="Беркут">
                            <span>Беркут</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('capercaillie')">
                            <img src="assets/images/priroda/flora_fauna/fauna/capercaillie.png" alt="Глухарь">
                            <span>Глухарь</span>
                        </div>
                    </div>
                    <h4>Растительный мир (горная флора)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('cedar')">
                            <img src="assets/images/priroda/flora_fauna/flora/cedar.png" alt="Кедр">
                            <span>Кедр</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('fir')">
                            <img src="assets/images/priroda/flora_fauna/flora/fir.png" alt="Пихта">
                            <span>Пихта</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('larch')">
                            <img src="assets/images/priroda/flora_fauna/flora/larch.png" alt="Лиственница">
                            <span>Лиственница</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('rhododendron')">
                            <img src="assets/images/priroda/flora_fauna/flora/rhododendron.png" alt="Рододендрон">
                            <span>Рододендрон</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('globeflower')">
                            <img src="assets/images/priroda/flora_fauna/flora/globeflower.png" alt="Жарки">
                            <span>Жарки</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('pasqueflower')">
                            <img src="assets/images/priroda/flora_fauna/flora/pasqueflower.png" alt="Прострел">
                            <span>Прострел</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('lingonberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/lingonberry-Photoroom.png" alt="Брусника">
                            <span>Брусника</span>
                        </div>
                    </div>
                </div>`
            },
            {
                title: 'Достопримечательности',
                icon: '',
                content: `
                    <div class="reserve-attractions">
                        <ul class="reserve-list">
                            <li><strong>Пик Звёздный</strong> — самая высокая вершина парка (2265 м)</li>
                            <li><strong>Озеро Горных Духов</strong> — живописное горное озеро</li>
                            <li><strong>Висячий камень</strong> — огромный валун на краю обрыва</li>
                            <li><strong>Спящий Саян</strong> — горный хребет в форме спящего великана</li>
                            <li><strong>Перевал Художников</strong> — панорамные виды на горы</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Местоположение на карте',
                icon: '',
                content: `<div class="reserve-access">
                    <div id="reserve-map-ergaki" class="reserve-map"></div>
                </div>`
            }
        ]
    },

    'shushensky-bor': {
        name: 'Шушенский бор',
        nameEn: 'Shushensky Bor',
        year: 1995,
        area: '39 тыс га',
        areaNum: 39000,
        status: 'Национальный парк',
        unesco: false,
        mainImage: 'assets/images/priroda/reserves/shushensky-bor.jpg',
        gallery: [
            'assets/images/priroda/reserves/shushensky-bor/gallery-1.webp',
            'assets/images/priroda/reserves/shushensky-bor/gallery-2.webp',
            'assets/images/priroda/reserves/shushensky-bor/gallery-3.jpg'
        ],
        coordinates: [53.3, 91.9],
        shortDescription: 'Национальный парк. Реликтовые сосновые леса.',
        tabs: [
            {
                title: 'Обзор',
                icon: '',
                content: `<div class="reserve-overview">
                    <p class="reserve-text">Национальный парк с реликтовыми сосновыми лесами и развитой туристической инфраструктурой.</p>
                    <ul class="reserve-features">
                        <li> Реликтовые сосны</li>
                        <li>� Экотуризм</li>
                        <li> Экологические тропы</li>
                        <li>� Музей-заповедник В.И. Ленина</li>
                    </ul>
                </div>`
            },
            {
                title: 'Флора и фауна',
                icon: '',
                content: `<div class="reserve-nature">
                    <h4>Животный мир (45 видов млекопитающих, 150 видов птиц)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('moose')">
                            <img src="assets/images/priroda/flora_fauna/fauna/moose.png" alt="Марал">
                            <span>Марал</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('roe-deer')">
                            <img src="assets/images/priroda/flora_fauna/fauna/roe-deer.png" alt="Косуля">
                            <span>Косуля</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('bear')">
                            <img src="assets/images/priroda/flora_fauna/fauna/bear.png" alt="Медведь">
                            <span>Медведь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('lynx')">
                            <img src="assets/images/priroda/flora_fauna/fauna/lynx.png" alt="Рысь">
                            <span>Рысь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('wolf')">
                            <img src="assets/images/priroda/flora_fauna/fauna/wolf.png" alt="Волк">
                            <span>Волк</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('fox')">
                            <img src="assets/images/priroda/flora_fauna/fauna/fox.png" alt="Лиса">
                            <span>Лиса</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('beaver')">
                            <img src="assets/images/priroda/flora_fauna/fauna/beaver.png" alt="Бобр">
                            <span>Бобр</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('capercaillie')">
                            <img src="assets/images/priroda/flora_fauna/fauna/capercaillie.png" alt="Глухарь">
                            <span>Глухарь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('eagle')">
                            <img src="assets/images/priroda/flora_fauna/fauna/eagle.png" alt="Орёл">
                            <span>Орёл</span>
                        </div>
                    </div>
                    <h4>Растительный мир (реликтовые сосновые боры)</h4>
                    <div class="species-mini-grid">
                        <div class="species-mini-card" onclick="openSpeciesGallery('pine')">
                            <img src="assets/images/priroda/flora_fauna/flora/pine.png" alt="Сосна">
                            <span>Сосна</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('birch')">
                            <img src="assets/images/priroda/flora_fauna/flora/birch.png" alt="Берёза">
                            <span>Берёза</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('aspen')">
                            <img src="assets/images/priroda/flora_fauna/flora/aspen.png" alt="Осина">
                            <span>Осина</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('poplar')">
                            <img src="assets/images/priroda/flora_fauna/flora/poplar.png" alt="Тополь">
                            <span>Тополь</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('willow')">
                            <img src="assets/images/priroda/flora_fauna/flora/willow.png" alt="Ива">
                            <span>Ива</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('raspberry')">
                            <img src="assets/images/priroda/flora_fauna/flora/raspberry.png" alt="Малина">
                            <span>Малина</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('rose-hip')">
                            <img src="assets/images/priroda/flora_fauna/flora/rose-hip.png" alt="Шиповник">
                            <span>Шиповник</span>
                        </div>
                        <div class="species-mini-card" onclick="openSpeciesGallery('fireweed')">
                            <img src="assets/images/priroda/flora_fauna/flora/fireweed.png" alt="Иван-чай">
                            <span>Иван-чай</span>
                        </div>
                    </div>
                </div>`
            },
            {
                title: 'Достопримечательности',
                icon: '',
                content: `
                    <div class="reserve-attractions">
                        <ul class="reserve-list">
                            <li><strong>Реликтовые сосновые боры</strong> — древние леса возрастом более 300 лет</li>
                            <li><strong>Музей-заповедник В.И. Ленина</strong> — историческое место ссылки</li>
                            <li><strong>Перуновские скалы</strong> — живописные скальные образования</li>
                            <li><strong>Река Енисей</strong> — берега великой сибирской реки</li>
                            <li><strong>Экологические тропы</strong> — оборудованные маршруты для туристов</li>
                        </ul>
                    </div>
                `
            },
            {
                title: 'Местоположение на карте',
                icon: '',
                content: `<div class="reserve-access">
                    <div id="reserve-map-shushensky-bor" class="reserve-map"></div>
                </div>`
            }
        ]
    }
};
