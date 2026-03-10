/**
 * Historical Data for Krasnoyarsk Region
 * Contains all data for History Tab interactive components
 */

const HISTORY_DATA = {
  /**
   * Historical Places - for Interactive Map
   * Coordinates: [latitude, longitude]
   * Распределены равномерно по всей территории края
   */
  places: [
    // ЮГ КРАЯ
    {
      id: 'shushenskoe',
      name: 'Шушенское (1897)',
      coordinates: [53.33, 91.93],
      description: 'Место ссылки В.И. Ленина.',
      historicalSignificance: 'За 3 года ссылки написано более 30 работ.',
      imageUrl: 'assets/images/history/shushenskoe.jpg',
      detailedInfo: {
        history: 'Село основано в 1744 году. С 1897 по 1900 год здесь отбывал ссылку В.И. Ленин. В советское время создан музей-заповедник.',
        facts: [
          'Ленин прожил здесь 3 года',
          'Написал более 30 научных работ',
          'Женился на Н.К. Крупской',
          'Музей посещают более 100 тыс. туристов в год'
        ],
        dates: [
          { year: 1744, event: 'Основание села' },
          { year: 1897, event: 'Прибытие Ленина в ссылку' },
          { year: 1930, event: 'Открытие музея' },
          { year: 1970, event: 'Создание музея-заповедника' }
        ],
        people: ['В.И. Ленин', 'Н.К. Крупская'],
        category: 'Музей-заповедник'
      }
    },
    {
      id: 'minusinsk',
      name: 'Минусинск (1739)',
      coordinates: [53.70, 91.68],
      description: 'Центр Минусинской котловины.',
      historicalSignificance: 'Известен археологическими находками бронзового века.',
      imageUrl: 'assets/images/history/minusinsk.jpg',
      detailedInfo: {
        history: 'Основан в 1739 году как острог. Минусинская котловина - один из древнейших центров цивилизации в Сибири. Здесь найдены уникальные археологические памятники.',
        facts: [
          'Минусинская котловина заселена более 30 тыс. лет',
          'Найдено более 30 тыс. курганов',
          'Краеведческий музей основан в 1877 году',
          'Родина знаменитых минусинских помидоров'
        ],
        dates: [
          { year: 1739, event: 'Основание острога' },
          { year: 1877, event: 'Открытие краеведческого музея' },
          { year: 1956, event: 'Статус города' }
        ],
        people: ['Н.М. Мартьянов (основатель музея)'],
        category: 'Исторический город'
      }
    },
    {
      id: 'abakan-border',
      name: 'Граница с Хакасией',
      coordinates: [52.80, 91.20],
      description: 'Южная граница Красноярского края.',
      historicalSignificance: 'Исторический рубеж между краем и Хакасией.',
      imageUrl: 'assets/images/history/border.jpg',
      detailedInfo: {
        history: 'Граница между Красноярским краем и Республикой Хакасия проходит по горным хребтам Саян. Исторически эти земли населяли енисейские кыргызы.',
        facts: [
          'Протяженность границы более 500 км',
          'Проходит по горным хребтам',
          'Разделяет два субъекта РФ',
          'Богата полезными ископаемыми'
        ],
        dates: [
          { year: 1930, event: 'Образование Хакасской автономной области' },
          { year: 1991, event: 'Хакасия стала республикой' }
        ],
        people: [],
        category: 'Административная граница'
      }
    },
    
    // ЦЕНТР КРАЯ
    {
      id: 'krasnoyarsk-ostrog',
      name: 'Красноярск (1628)',
      coordinates: [56.01, 92.85],
      description: 'Основание города казачьим атаманом Андреем Дубенским.',
      historicalSignificance: 'Острог для защиты от набегов енисейских кыргызов.',
      imageUrl: 'assets/images/history/ostrog.jpg',
      detailedInfo: {
        history: 'Красноярский острог основан 19 августа 1628 года отрядом казаков под руководством Андрея Дубенского. Острог построен на Красном Яру - высоком берегу Енисея.',
        facts: [
          'Название от "Красного Яра" - красной глины на берегу',
          'Население более 1 млн человек',
          'Столица Универсиады 2019',
          'Изображен на 10-рублевой купюре'
        ],
        dates: [
          { year: 1628, event: 'Основание острога' },
          { year: 1690, event: 'Получение статуса города' },
          { year: 1822, event: 'Центр Енисейской губернии' },
          { year: 1934, event: 'Центр Красноярского края' },
          { year: 2019, event: 'Столица Универсиады' }
        ],
        people: ['Андрей Дубенский', 'В.И. Суриков', 'В.П. Астафьев', 'Д.А. Хворостовский'],
        category: 'Столица края'
      }
    },
    {
      id: 'afontova-gora',
      name: 'Афонтова Гора',
      coordinates: [56.02, 92.89],
      description: 'Древнейшая стоянка человека (40 000 лет).',
      historicalSignificance: 'Найдены кости более 100 мамонтов.',
      imageUrl: 'assets/images/history/afontova-gora.jpg',
      detailedInfo: {
        history: 'Афонтова Гора - одна из древнейших стоянок человека в Сибири. Открыта в 1884 году. Здесь жили охотники на мамонтов в эпоху палеолита.',
        facts: [
          'Возраст стоянки 40 000 лет',
          'Найдено более 100 скелетов мамонтов',
          'Обнаружены каменные орудия труда',
          'Открыта И.Т. Савенковым в 1884 году',
          'Одна из самых изученных стоянок в мире'
        ],
        dates: [
          { year: -38000, event: 'Появление первых людей' },
          { year: 1884, event: 'Открытие стоянки' },
          { year: 1920, event: 'Начало систематических раскопок' }
        ],
        people: ['И.Т. Савенков (археолог)'],
        category: 'Археологический памятник'
      }
    },
    {
      id: 'krasnoyarsk-ges',
      name: 'Красноярская ГЭС (1972)',
      coordinates: [55.92, 91.78],
      description: 'Крупнейшая в СССР ГЭС, мощность 6000 МВт.',
      historicalSignificance: 'Изображена на 10-рублевой купюре.',
      imageUrl: 'assets/images/history/ges.jpg',
      detailedInfo: {
        history: 'Строительство началось в 1955 году. Запущена в 1972 году. На момент постройки была крупнейшей ГЭС в мире. Плотина высотой 124 метра.',
        facts: [
          'Мощность 6000 МВт',
          'Высота плотины 124 метра',
          'Изображена на 10-рублевой купюре',
          'Водохранилище длиной 388 км',
          'Строили 17 лет',
          'Работает 12 гидроагрегатов'
        ],
        dates: [
          { year: 1955, event: 'Начало строительства' },
          { year: 1967, event: 'Перекрытие Енисея' },
          { year: 1972, event: 'Запуск первого агрегата' },
          { year: 1971, event: 'Полный ввод в эксплуатацию' }
        ],
        people: [],
        category: 'Гидроэлектростанция'
      }
    },
    {
      id: 'yeniseisk',
      name: 'Енисейск (1619)',
      coordinates: [58.45, 92.17],
      description: 'Старейший город края.',
      historicalSignificance: 'Центр золотой лихорадки XIX века.',
      imageUrl: 'assets/images/history/yeniseisk.jpg',
      detailedInfo: {
        history: 'Основан в 1619 году как Енисейский острог. Старейший город Красноярского края. В XIX веке - центр золотодобычи, давал 60% российского золота.',
        facts: [
          'Основан в 1619 году - старейший город края',
          'В XIX веке давал 60% российского золота',
          'Сохранилось более 100 памятников архитектуры',
          'Включен в список исторических городов России',
          'Называли "Сибирским Иерусалимом"'
        ],
        dates: [
          { year: 1619, event: 'Основание острога' },
          { year: 1676, event: 'Статус города' },
          { year: 1838, event: 'Начало золотой лихорадки' },
          { year: 2000, event: 'Включение в список исторических городов' }
        ],
        people: [],
        category: 'Исторический город'
      }
    },
    
    // ЗАПАД КРАЯ
    {
      id: 'achinsk',
      name: 'Ачинск (1683)',
      coordinates: [56.27, 90.50],
      description: 'Промышленный центр на западе края.',
      historicalSignificance: 'Основан как острог, центр торговли.',
      imageUrl: 'assets/images/history/achinsk.jpg',
      detailedInfo: {
        history: 'Основан в 1683 году как Ачинский острог для защиты от набегов. Развивался как торговый и промышленный центр.',
        facts: [
          'Основан в 1683 году',
          'Крупный железнодорожный узел',
          'Развитая нефтеперерабатывающая промышленность',
          'Население более 100 тыс. человек'
        ],
        dates: [
          { year: 1683, event: 'Основание острога' },
          { year: 1782, event: 'Статус города' },
          { year: 1895, event: 'Прошла Транссибирская магистраль' }
        ],
        people: [],
        category: 'Промышленный город'
      }
    },
    {
      id: 'bogotol',
      name: 'Боготол',
      coordinates: [56.21, 89.53],
      description: 'Город на Транссибе.',
      historicalSignificance: 'Важный железнодорожный узел.',
      imageUrl: 'assets/images/history/bogotol.jpg',
      detailedInfo: {
        history: 'Возник как железнодорожная станция при строительстве Транссибирской магистрали в конце XIX века. Развивался как важный транспортный узел.',
        facts: [
          'Основан в 1893 году',
          'Название от тюркского "богатая долина"',
          'Крупный железнодорожный узел',
          'Развитая пищевая промышленность'
        ],
        dates: [
          { year: 1893, event: 'Основание станции' },
          { year: 1911, event: 'Статус города' },
          { year: 1960, event: 'Развитие промышленности' }
        ],
        people: [],
        category: 'Железнодорожный город'
      }
    },
    
    // ВОСТОК КРАЯ
    {
      id: 'kansk',
      name: 'Канск (1636)',
      coordinates: [56.20, 95.72],
      description: 'Город на Транссибирской магистрали.',
      historicalSignificance: 'Острог для защиты от набегов.',
      imageUrl: 'assets/images/history/kansk.jpg',
      detailedInfo: {
        history: 'Основан в 1636 году как Канский острог. Один из старейших городов Сибири. Развивался как торговый и ремесленный центр.',
        facts: [
          'Основан в 1636 году',
          'Один из старейших городов Сибири',
          'Место ссылки декабристов',
          'Крупный промышленный центр'
        ],
        dates: [
          { year: 1636, event: 'Основание острога' },
          { year: 1782, event: 'Статус города' },
          { year: 1897, event: 'Прошла Транссибирская магистраль' }
        ],
        people: ['Декабристы (в ссылке)'],
        category: 'Исторический город'
      }
    },
    {
      id: 'zheleznogorsk',
      name: 'Железногорск (1950)',
      coordinates: [56.25, 93.53],
      description: 'Закрытый город атомной промышленности.',
      historicalSignificance: 'Производство оружейного плутония.',
      imageUrl: 'assets/images/history/zheleznogorsk.jpg',
      detailedInfo: {
        history: 'Основан в 1950 году как закрытый город для производства оружейного плутония. До 1992 года назывался Красноярск-26. Один из центров атомной промышленности СССР.',
        facts: [
          'Основан в 1950 году',
          'Закрытый город до 2001 года',
          'Производство плутония для ядерного оружия',
          'Горно-химический комбинат',
          'Население около 90 тыс. человек'
        ],
        dates: [
          { year: 1950, event: 'Начало строительства' },
          { year: 1958, event: 'Запуск первого реактора' },
          { year: 1992, event: 'Получил название Железногорск' },
          { year: 2001, event: 'Открытие города' }
        ],
        people: [],
        category: 'Закрытый город'
      }
    },
    {
      id: 'zelenogorsk',
      name: 'Зеленогорск (1956)',
      coordinates: [56.12, 94.58],
      description: 'Закрытый город обогащения урана.',
      historicalSignificance: 'Крупнейший завод по обогащению урана.',
      imageUrl: 'assets/images/history/zelenogorsk.jpg',
      detailedInfo: {
        history: 'Основан в 1956 году для обогащения урана. До 1992 года - Красноярск-45. Электрохимический завод - один из крупнейших в мире.',
        facts: [
          'Основан в 1956 году',
          'Обогащение урана для АЭС и оружия',
          'Один из крупнейших заводов в мире',
          'Закрытый город',
          'Высокий уровень жизни'
        ],
        dates: [
          { year: 1956, event: 'Начало строительства' },
          { year: 1962, event: 'Запуск завода' },
          { year: 1992, event: 'Получил название Зеленогорск' }
        ],
        people: [],
        category: 'Закрытый город'
      }
    },
    
    // СЕВЕР КРАЯ (Заполярье)
    {
      id: 'turukhansk',
      name: 'Туруханск (1607)',
      coordinates: [65.78, 87.95],
      description: 'Один из старейших городов Сибири.',
      historicalSignificance: 'Место ссылки И.В. Сталина и Я.М. Свердлова.',
      imageUrl: 'assets/images/history/turukhansk.jpg',
      detailedInfo: {
        history: 'Основан в 1607 году как Туруханское зимовье. Один из старейших русских поселений в Сибири. Место политической ссылки в царское и советское время.',
        facts: [
          'Основан в 1607 году',
          'Один из старейших городов Сибири',
          'Место ссылки Сталина (1913-1916)',
          'Место ссылки Свердлова',
          'Центр пушной торговли'
        ],
        dates: [
          { year: 1607, event: 'Основание зимовья' },
          { year: 1913, event: 'Ссылка Сталина' },
          { year: 1924, event: 'Статус города' }
        ],
        people: ['И.В. Сталин', 'Я.М. Свердлов'],
        category: 'Исторический город'
      }
    },
    {
      id: 'igarka',
      name: 'Игарка (1929)',
      coordinates: [67.47, 86.58],
      description: 'Город за Полярным кругом.',
      historicalSignificance: 'Центр лесозаготовок, музей вечной мерзлоты.',
      imageUrl: 'assets/images/history/igarka.jpg',
      detailedInfo: {
        history: 'Основана в 1929 году как поселок лесозаготовителей. Развивалась как центр экспорта леса через Северный морской путь. Известна музеем вечной мерзлоты.',
        facts: [
          'Основана в 1929 году',
          'За Полярным кругом',
          'Уникальный музей вечной мерзлоты',
          'Центр лесозаготовок',
          'Полярная ночь 2 месяца'
        ],
        dates: [
          { year: 1929, event: 'Основание поселка' },
          { year: 1931, event: 'Начало лесозаготовок' },
          { year: 1965, event: 'Открытие музея мерзлоты' }
        ],
        people: [],
        category: 'Заполярный город'
      }
    },
    {
      id: 'dudinka',
      name: 'Дудинка (1951)',
      coordinates: [69.40, 86.18],
      description: 'Самый северный речной порт в мире.',
      historicalSignificance: 'Ворота Арктики, порт на Енисее.',
      imageUrl: 'assets/images/history/dudinka.jpg',
      detailedInfo: {
        history: 'Основана в 1951 году. Самый северный речной порт в мире. Ворота Норильска и всего Таймыра. Работает круглый год благодаря ледоколам.',
        facts: [
          'Самый северный речной порт в мире',
          'Основан в 1951 году',
          'Ворота Норильска',
          'Работает круглый год',
          'Полярная ночь 45 дней'
        ],
        dates: [
          { year: 1951, event: 'Статус города' },
          { year: 1960, event: 'Развитие порта' }
        ],
        people: [],
        category: 'Портовый город'
      }
    },
    {
      id: 'norilsk',
      name: 'Норильск (1935)',
      coordinates: [69.33, 88.22],
      description: 'Самый северный город с населением >100 тыс.',
      historicalSignificance: 'Построен заключенными ГУЛАГа, центр добычи никеля.',
      imageUrl: 'assets/images/history/norilsk.jpg',
      detailedInfo: {
        history: 'Основан в 1935 году. Построен заключенными ГУЛАГа. Крупнейший в мире центр добычи никеля, меди, кобальта. Самый северный город с населением более 100 тысяч.',
        facts: [
          'Основан в 1935 году',
          'Построен заключенными ГУЛАГа',
          'Крупнейший центр добычи никеля в мире',
          'Население более 180 тыс. человек',
          'Полярная ночь 45 дней',
          'Один из самых загрязненных городов мира'
        ],
        dates: [
          { year: 1935, event: 'Начало строительства' },
          { year: 1939, event: 'Запуск комбината' },
          { year: 1953, event: 'Норильское восстание заключенных' },
          { year: 1956, event: 'Статус города' }
        ],
        people: [],
        category: 'Промышленный город'
      }
    },
    
    // КРАЙНИЙ СЕВЕР (Таймыр)
    {
      id: 'dikson',
      name: 'Диксон',
      coordinates: [73.51, 80.65],
      description: 'Самый северный порт России.',
      historicalSignificance: 'Полярная станция, ворота Северного морского пути.',
      imageUrl: 'assets/images/history/dikson.jpg',
      detailedInfo: {
        history: 'Назван в честь шведского промышленника Оскара Диксона. Самый северный населенный пункт России. Важная полярная станция и порт на Северном морском пути.',
        facts: [
          'Самый северный порт России',
          'Полярная ночь 4 месяца',
          'Полярная станция с 1915 года',
          'Ключевой пункт Севморпути',
          'Экстремальные климатические условия'
        ],
        dates: [
          { year: 1915, event: 'Основание полярной станции' },
          { year: 1935, event: 'Развитие порта' }
        ],
        people: [],
        category: 'Полярная станция'
      }
    },
    {
      id: 'khatanga',
      name: 'Хатанга',
      coordinates: [71.98, 102.47],
      description: 'Село на Таймыре.',
      historicalSignificance: 'Самое северное село с населением >2000 человек.',
      imageUrl: 'assets/images/history/khatanga.jpg',
      detailedInfo: {
        history: 'Самое северное крупное село России. Административный центр Таймырского района. Важный транспортный узел на севере.',
        facts: [
          'Самое северное село с населением >2000',
          'Полярная ночь 3 месяца',
          'Аэропорт - ворота Таймыра',
          'Традиционное оленеводство',
          'Температура до -60°C зимой'
        ],
        dates: [
          { year: 1626, event: 'Первое упоминание' },
          { year: 1930, event: 'Развитие поселка' }
        ],
        people: [],
        category: 'Северное село'
      }
    },
    
    // ЮГО-ВОСТОК
    {
      id: 'uyar',
      name: 'Уяр',
      coordinates: [55.82, 94.32],
      description: 'Районный центр на востоке края.',
      historicalSignificance: 'Важный транспортный узел.',
      imageUrl: 'assets/images/history/uyar.jpg',
      detailedInfo: {
        history: 'Основан в XVII веке. Развивался как сельскохозяйственный и транспортный центр. Станция на Транссибирской магистрали.',
        facts: [
          'Основан в XVII веке',
          'Станция на Транссибе',
          'Сельскохозяйственный район',
          'Развитое животноводство'
        ],
        dates: [
          { year: 1700, event: 'Первое упоминание' },
          { year: 1897, event: 'Прошла Транссибирская магистраль' }
        ],
        people: [],
        category: 'Районный центр'
      }
    },
    
    // СЕВЕРО-ЗАПАД
    {
      id: 'yeniseysk-north',
      name: 'Северо-Енисейск',
      coordinates: [60.37, 93.02],
      description: 'Город золотодобытчиков.',
      historicalSignificance: 'Центр золотодобычи в тайге.',
      imageUrl: 'assets/images/history/severo-yeniseysk.jpg',
      detailedInfo: {
        history: 'Основан в 1930-х годах как поселок золотодобытчиков. Развивался вокруг приисков. Один из центров золотодобычи Красноярского края.',
        facts: [
          'Основан в 1930-х годах',
          'Центр золотодобычи',
          'Суровый таежный климат',
          'Богатые месторождения золота'
        ],
        dates: [
          { year: 1930, event: 'Основание поселка' },
          { year: 1941, event: 'Развитие золотодобычи' }
        ],
        people: [],
        category: 'Город золотодобытчиков'
      }
    },
    
    // ДОПОЛНИТЕЛЬНЫЕ МЕТКИ - СЕВЕР (60°N - 75°N)
    {
      id: 'bor',
      name: 'Бор',
      coordinates: [61.58, 90.02],
      description: 'Поселок в северной тайге.',
      historicalSignificance: 'Центр лесозаготовок.',
      imageUrl: 'assets/images/history/bor.jpg',
      detailedInfo: {
        history: 'Поселок лесозаготовителей в северной тайге. Развивался как центр лесной промышленности.',
        facts: [
          'Центр лесозаготовок',
          'Суровый таежный климат',
          'Богатые лесные ресурсы',
          'Изолированное расположение'
        ],
        dates: [
          { year: 1950, event: 'Основание поселка' }
        ],
        people: [],
        category: 'Лесопромышленный поселок'
      }
    },
    {
      id: 'yartsevo',
      name: 'Ярцево',
      coordinates: [60.12, 89.35],
      description: 'Таежный поселок.',
      historicalSignificance: 'Лесопромышленный центр.',
      imageUrl: 'assets/images/history/yartsevo.jpg',
      detailedInfo: {
        history: 'Поселок лесозаготовителей в северной тайге. Развивался как база лесной промышленности.',
        facts: ['Лесозаготовки', 'Таежный климат', 'Изолированное расположение'],
        dates: [{ year: 1950, event: 'Основание' }],
        people: [],
        category: 'Лесопромышленный поселок'
      }
    },
    {
      id: 'motygino',
      name: 'Мотыгино',
      coordinates: [58.18, 94.72],
      description: 'Село на Ангаре.',
      historicalSignificance: 'Старинное поселение на реке.',
      imageUrl: 'assets/images/history/motygino.jpg',
      detailedInfo: {
        history: 'Старинное село на Ангаре. Развивалось как речной порт и центр рыболовства.',
        facts: ['На реке Ангара', 'Речной порт', 'Рыболовство', 'Живописная природа'],
        dates: [{ year: 1700, event: 'Первое упоминание' }],
        people: [],
        category: 'Речное село'
      }
    },
    {
      id: 'boguchany',
      name: 'Богучаны',
      coordinates: [58.38, 97.45],
      description: 'Районный центр на Ангаре.',
      historicalSignificance: 'Богучанская ГЭС.',
      imageUrl: 'assets/images/history/boguchany.jpg',
      detailedInfo: {
        history: 'Районный центр на Ангаре. Известен строительством Богучанской ГЭС.',
        facts: ['Богучанская ГЭС', 'На реке Ангара', 'Алюминиевый завод', 'Развитая промышленность'],
        dates: [{ year: 2012, event: 'Запуск ГЭС' }],
        people: [],
        category: 'Промышленный центр'
      }
    },
    {
      id: 'kezhma',
      name: 'Кежма',
      coordinates: [58.75, 99.05],
      description: 'Село на Ангаре.',
      historicalSignificance: 'Затоплено при строительстве ГЭС.',
      imageUrl: 'assets/images/history/kezhma.jpg',
      detailedInfo: {
        history: 'Старинное село на Ангаре. Частично затоплено при строительстве Богучанской ГЭС.',
        facts: ['Затоплено ГЭС', 'Переселение жителей', 'Историческое село', 'На Ангаре'],
        dates: [{ year: 2012, event: 'Затопление' }],
        people: [],
        category: 'Затопленное село'
      }
    },
    {
      id: 'kodinsky',
      name: 'Кодинск',
      coordinates: [58.60, 99.18],
      description: 'Город строителей ГЭС.',
      historicalSignificance: 'Построен для Богучанской ГЭС.',
      imageUrl: 'assets/images/history/kodinsky.jpg',
      detailedInfo: {
        history: 'Город построен для строителей Богучанской ГЭС. Современный промышленный центр.',
        facts: ['Построен для ГЭС', 'Современный город', 'Развитая инфраструктура'],
        dates: [{ year: 1980, event: 'Основание' }],
        people: [],
        category: 'Город строителей'
      }
    },
    {
      id: 'vanavara',
      name: 'Ванавара',
      coordinates: [60.34, 102.28],
      description: 'Село рядом с местом падения Тунгусского метеорита.',
      historicalSignificance: 'Ближайший населенный пункт к эпицентру взрыва 1908 года.',
      imageUrl: 'assets/images/history/vanavara.jpg',
      detailedInfo: {
        history: 'Ближайший населенный пункт к месту падения Тунгусского метеорита 1908 года. Центр исследований феномена.',
        facts: ['Тунгусский метеорит 1908', 'В 65 км от эпицентра', 'Центр исследований', 'Уникальное место'],
        dates: [{ year: 1908, event: 'Тунгусский метеорит' }],
        people: [],
        category: 'Историческое село'
      }
    },
    {
      id: 'baykit',
      name: 'Байкит',
      coordinates: [61.68, 96.37],
      description: 'Эвенкийский поселок.',
      historicalSignificance: 'Центр Эвенкии.',
      imageUrl: 'assets/images/history/baykit.jpg',
      detailedInfo: {
        history: 'Административный центр Эвенкийского района. Центр традиционной культуры эвенков.',
        facts: ['Центр Эвенкии', 'Традиционное оленеводство', 'Культура эвенков', 'Таежный край'],
        dates: [{ year: 1920, event: 'Основание' }],
        people: [],
        category: 'Эвенкийский центр'
      }
    },
    {
      id: 'tura',
      name: 'Тура',
      coordinates: [64.28, 100.23],
      description: 'Административный центр Эвенкии.',
      historicalSignificance: 'Самый северный районный центр края.',
      imageUrl: 'assets/images/history/tura.jpg',
      detailedInfo: {
        history: 'Административный центр Эвенкийского муниципального района. Самый северный районный центр Красноярского края.',
        facts: ['Самый северный райцентр', 'Центр Эвенкии', 'Оленеводство', 'Суровый климат'],
        dates: [{ year: 1927, event: 'Статус центра' }],
        people: [],
        category: 'Административный центр'
      }
    },
    {
      id: 'essey',
      name: 'Ессей',
      coordinates: [68.47, 102.23],
      description: 'Самое северное озеро Эвенкии.',
      historicalSignificance: 'Место традиционного оленеводства.',
      imageUrl: 'assets/images/history/essey.jpg',
      detailedInfo: {
        history: 'Поселок на берегу озера Ессей. Центр традиционного оленеводства эвенков.',
        facts: ['Озеро Ессей', 'Оленеводство', 'Традиционная культура', 'Изолированное расположение'],
        dates: [{ year: 1930, event: 'Основание' }],
        people: [],
        category: 'Оленеводческий поселок'
      }
    },
    {
      id: 'volochanka',
      name: 'Волочанка',
      coordinates: [70.95, 94.48],
      description: 'Заброшенный поселок на Таймыре.',
      historicalSignificance: 'Бывший центр оленеводства.',
      imageUrl: 'assets/images/history/volochanka.jpg',
      detailedInfo: {
        history: 'Заброшенный поселок на Таймыре. Бывший центр оленеводства, покинут жителями.',
        facts: ['Заброшен', 'Бывший центр оленеводства', 'Экстремальный климат', 'Памятник эпохи'],
        dates: [{ year: 1990, event: 'Покинут жителями' }],
        people: [],
        category: 'Заброшенный поселок'
      }
    },
    {
      id: 'karaul',
      name: 'Караул',
      coordinates: [69.58, 87.55],
      description: 'Метеостанция на Таймыре.',
      historicalSignificance: 'Полярная станция с 1930-х годов.',
      imageUrl: 'assets/images/history/karaul.jpg',
      detailedInfo: {
        history: 'Полярная метеостанция на Таймыре. Работает с 1930-х годов, ведет метеонаблюдения.',
        facts: ['Полярная станция', 'С 1930-х годов', 'Метеонаблюдения', 'Экстремальные условия'],
        dates: [{ year: 1930, event: 'Основание станции' }],
        people: [],
        category: 'Метеостанция'
      }
    },
    {
      id: 'popigai',
      name: 'Попигай',
      coordinates: [71.65, 110.80],
      description: 'Кратер от метеорита.',
      historicalSignificance: 'Крупнейшее месторождение импактных алмазов.',
      imageUrl: 'assets/images/history/popigai.jpg',
      detailedInfo: {
        history: 'Кратер от падения метеорита 35 млн лет назад. Крупнейшее в мире месторождение импактных алмазов.',
        facts: ['Метеоритный кратер', 'Возраст 35 млн лет', 'Импактные алмазы', 'Диаметр 100 км', 'Уникальное месторождение'],
        dates: [{ year: -35000000, event: 'Падение метеорита' }, { year: 1970, event: 'Открытие алмазов' }],
        people: [],
        category: 'Геологический памятник'
      }
    },
    
    // ВОСТОК (95°E - 110°E)
    {
      id: 'taseyevo',
      name: 'Тасеево',
      coordinates: [57.25, 93.58],
      description: 'Районный центр.',
      historicalSignificance: 'Сельскохозяйственный район.',
      imageUrl: 'assets/images/history/taseyevo.jpg',
      detailedInfo: {
        history: 'Районный центр, развивался как сельскохозяйственный район.',
        facts: ['Сельское хозяйство', 'Животноводство', 'Зерновые культуры'],
        dates: [{ year: 1700, event: 'Первое упоминание' }],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'nizhny-ingash',
      name: 'Нижний Ingash',
      coordinates: [56.08, 96.55],
      description: 'Станция на Транссибе.',
      historicalSignificance: 'Железнодорожный узел.',
      imageUrl: 'assets/images/history/ingash.jpg',
      detailedInfo: {
        history: 'Железнодорожная станция на Транссибирской магистрали.',
        facts: ['Станция на Транссибе', 'Транспортный узел', 'Развитая инфраструктура'],
        dates: [{ year: 1897, event: 'Прошла Транссибирская магистраль' }],
        people: [],
        category: 'Железнодорожная станция'
      }
    },
    {
      id: 'irbeyskoe',
      name: 'Ирбейское',
      coordinates: [56.48, 94.98],
      description: 'Районный центр.',
      historicalSignificance: 'Сельское хозяйство.',
      imageUrl: 'assets/images/history/irbeyskoe.jpg',
      detailedInfo: {
        history: 'Районный центр с развитым сельским хозяйством.',
        facts: ['Сельское хозяйство', 'Животноводство', 'Зерновые'],
        dates: [{ year: 1700, event: 'Основание' }],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'abalakovo',
      name: 'Абалаково',
      coordinates: [55.85, 91.52],
      description: 'Поселок у ГЭС.',
      historicalSignificance: 'Алюминиевый завод.',
      imageUrl: 'assets/images/history/abalakovo.jpg',
      detailedInfo: {
        history: 'Поселок при алюминиевом заводе. Развивался как промышленный центр.',
        facts: ['Алюминиевый завод', 'Промышленность', 'Рядом с ГЭС'],
        dates: [{ year: 1950, event: 'Строительство завода' }],
        people: [],
        category: 'Промышленный поселок'
      }
    },
    {
      id: 'divnogorsk',
      name: 'Дивногорск',
      coordinates: [55.96, 92.37],
      description: 'Город у Красноярской ГЭС.',
      historicalSignificance: 'Построен для строителей ГЭС.',
      imageUrl: 'assets/images/history/divnogorsk.jpg',
      detailedInfo: {
        history: 'Город построен для строителей Красноярской ГЭС. Современный промышленный центр.',
        facts: ['Построен для ГЭС', 'Красноярская ГЭС рядом', 'Живописное расположение', 'Развитая инфраструктура'],
        dates: [{ year: 1957, event: 'Основание' }, { year: 1963, event: 'Статус города' }],
        people: [],
        category: 'Город строителей'
      }
    },
    {
      id: 'sosnovoborsk',
      name: 'Сосновоборск',
      coordinates: [56.12, 93.35],
      description: 'Город-спутник Красноярска.',
      historicalSignificance: 'Промышленный центр.',
      imageUrl: 'assets/images/history/sosnovoborsk.jpg',
      detailedInfo: {
        history: 'Город-спутник Красноярска. Развитая промышленность и инфраструктура.',
        facts: ['Город-спутник Красноярска', 'Промышленность', 'Близость к столице края'],
        dates: [{ year: 1973, event: 'Статус города' }],
        people: [],
        category: 'Город-спутник'
      }
    },
    {
      id: 'balakhta',
      name: 'Балахта',
      coordinates: [55.45, 91.68],
      description: 'Районный центр.',
      historicalSignificance: 'Сельское хозяйство.',
      imageUrl: 'assets/images/history/balakhta.jpg',
      detailedInfo: {
        history: 'Районный центр с развитым сельским хозяйством.',
        facts: ['Сельское хозяйство', 'Животноводство', 'Зерновые культуры'],
        dates: [{ year: 1700, event: 'Основание' }],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'bolshaya-murta',
      name: 'Большая Мурта',
      coordinates: [56.37, 92.22],
      description: 'Районный центр.',
      historicalSignificance: 'Сельскохозяйственный район.',
      imageUrl: 'assets/images/history/murta.jpg',
      detailedInfo: {
        history: 'Районный центр, развитое сельское хозяйство.',
        facts: ['Сельское хозяйство', 'Животноводство', 'Зерновые'],
        dates: [{ year: 1700, event: 'Основание' }],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'emelsk',
      name: 'Емельяново',
      coordinates: [56.15, 92.48],
      description: 'Поселок у аэропорта.',
      historicalSignificance: 'Международный аэропорт Красноярска.',
      imageUrl: 'assets/images/history/emelyanovo.jpg',
      detailedInfo: {
        history: 'Поселок при международном аэропорте Красноярска. Важный транспортный узел.',
        facts: ['Международный аэропорт', 'Транспортный узел', 'Ворота края'],
        dates: [{ year: 1980, event: 'Строительство аэропорта' }],
        people: [],
        category: 'Аэропортовый поселок'
      }
    },
    {
      id: 'berezovka',
      name: 'Березовка',
      coordinates: [56.08, 93.78],
      description: 'Районный центр.',
      historicalSignificance: 'Сельское хозяйство.',
      imageUrl: 'assets/images/history/berezovka.jpg',
      detailedInfo: {
        history: 'Районный центр с развитым сельским хозяйством.',
        facts: ['Сельское хозяйство', 'Животноводство'],
        dates: [{ year: 1700, event: 'Основание' }],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'kozulka',
      name: 'Козулька',
      coordinates: [56.18, 94.58],
      description: 'Станция на Транссибе.',
      historicalSignificance: 'Железнодорожный узел.',
      imageUrl: 'assets/images/history/kozulka.jpg',
      detailedInfo: {
        history: 'Железнодорожная станция на Транссибирской магистрали.',
        facts: ['Станция на Транссибе', 'Транспортный узел'],
        dates: [{ year: 1897, event: 'Прошла Транссибирская магистраль' }],
        people: [],
        category: 'Железнодорожная станция'
      }
    },
    {
      id: 'dzerzhinsky',
      name: 'Дзержинский',
      coordinates: [56.25, 94.18],
      description: 'Поселок.',
      historicalSignificance: 'Промышленность.',
      imageUrl: 'assets/images/history/dzerzhinsky.jpg',
      detailedInfo: {
        history: 'Промышленный поселок.',
        facts: ['Промышленность', 'Развитая инфраструктура'],
        dates: [{ year: 1950, event: 'Основание' }],
        people: [],
        category: 'Промышленный поселок'
      }
    },
    {
      id: 'uzhur',
      name: 'Ужур',
      coordinates: [55.32, 89.83],
      description: 'Районный центр на западе.',
      historicalSignificance: 'Сельское хозяйство.',
      imageUrl: 'assets/images/history/uzhur.jpg',
      detailedInfo: {
        history: 'Районный центр с развитым сельским хозяйством.',
        facts: ['Сельское хозяйство', 'Животноводство', 'Зерновые'],
        dates: [{ year: 1700, event: 'Основание' }],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'sharypovo',
      name: 'Шарыпово',
      coordinates: [55.53, 89.20],
      description: 'Город угольщиков.',
      historicalSignificance: 'Березовский угольный разрез.',
      imageUrl: 'assets/images/history/sharypovo.jpg',
      detailedInfo: {
        history: 'Город угольщиков. Березовский угольный разрез - один из крупнейших в России.',
        facts: ['Березовский разрез', 'Добыча угля', 'ГРЭС', 'Промышленный центр'],
        dates: [{ year: 1970, event: 'Основание' }, { year: 1985, event: 'Статус города' }],
        people: [],
        category: 'Город угольщиков'
      }
    },
    {
      id: 'nazarovo',
      name: 'Назарово',
      coordinates: [56.00, 90.40],
      description: 'Промышленный город.',
      historicalSignificance: 'Угольная промышленность, ГРЭС.',
      imageUrl: 'assets/images/history/nazarovo.jpg',
      detailedInfo: {
        history: 'Промышленный город. Угольная промышленность и ГРЭС.',
        facts: ['Угольная промышленность', 'ГРЭС', 'Развитая промышленность'],
        dates: [{ year: 1961, event: 'Статус города' }],
        people: [],
        category: 'Промышленный город'
      }
    },
    
    // ЗАПАД (85°E - 90°E)
    {
      id: 'borodino',
      name: 'Бородино',
      coordinates: [55.90, 94.90],
      description: 'Город угольщиков.',
      historicalSignificance: 'Бородинский угольный разрез.',
      imageUrl: 'assets/images/history/borodino.jpg',
      detailedInfo: {
        history: 'Город угольщиков. Бородинский разрез - крупнейший в мире угольный разрез открытой добычи.',
        facts: ['Крупнейший разрез в мире', 'Добыча угля', 'Промышленный центр', 'ГРЭС'],
        dates: [{ year: 1970, event: 'Основание' }, { year: 1981, event: 'Статус города' }],
        people: [],
        category: 'Город угольщиков'
      }
    },
    {
      id: 'tyukhtet',
      name: 'Тюхтет',
      coordinates: [56.48, 89.05],
      description: 'Районный центр.',
      historicalSignificance: 'Сельское хозяйство.',
      imageUrl: 'assets/images/history/tyukhtet.jpg',
      detailedInfo: {
        history: 'Районный центр с развитым сельским хозяйством.',
        facts: ['Сельское хозяйство', 'Животноводство'],
        dates: [{ year: 1700, event: 'Основание' }],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'bolshoy-uluy',
      name: 'Большой Улуй',
      coordinates: [56.75, 89.68],
      description: 'Районный центр.',
      historicalSignificance: 'Сельское хозяйство.',
      imageUrl: 'assets/images/history/uluy.jpg',
      detailedInfo: {
        history: 'Районный центр с развитым сельским хозяйством.',
        facts: ['Сельское хозяйство', 'Животноводство'],
        dates: [{ year: 1700, event: 'Основание' }],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'pirovskoye',
      name: 'Пировское',
      coordinates: [58.48, 90.32],
      description: 'Районный центр на севере.',
      historicalSignificance: 'Лесная промышленность.',
      imageUrl: 'assets/images/history/pirovskoye.jpg',
      detailedInfo: {
        history: 'Районный центр в северной тайге. Лесная промышленность.',
        facts: ['Лесная промышленность', 'Таежный край', 'Лесозаготовки'],
        dates: [{ year: 1920, event: 'Основание' }],
        people: [],
        category: 'Лесопромышленный центр'
      }
    },
    {
      id: 'yeniseysk-west',
      name: 'Маклаково',
      coordinates: [58.28, 90.12],
      description: 'Поселок на Енисее.',
      historicalSignificance: 'Речной порт.',
      imageUrl: 'assets/images/history/maklakovo.jpg',
      detailedInfo: {
        history: 'Поселок на Енисее. Речной порт.',
        facts: ['Речной порт', 'На Енисее', 'Рыболовство'],
        dates: [{ year: 1900, event: 'Основание' }],
        people: [],
        category: 'Речной порт'
      }
    },
    {
      id: 'lesosibirsk',
      name: 'Лесосибирск',
      coordinates: [58.23, 92.48],
      description: 'Город лесопромышленников.',
      historicalSignificance: 'Крупнейший центр лесопереработки.',
      imageUrl: 'assets/images/history/lesosibirsk.jpg',
      detailedInfo: {
        history: 'Крупнейший центр лесопереработки в крае. Развитая лесная промышленность.',
        facts: ['Крупнейший центр лесопереработки', 'Лесная промышленность', 'Экспорт леса', 'Речной порт'],
        dates: [{ year: 1975, event: 'Статус города' }],
        people: [],
        category: 'Город лесопромышленников'
      }
    },
    {
      id: 'yeniseysk-east',
      name: 'Подтесово',
      coordinates: [58.38, 92.68],
      description: 'Поселок у Енисейска.',
      historicalSignificance: 'Лесная промышленность.',
      imageUrl: 'assets/images/history/podtesovo.jpg',
      detailedInfo: {
        history: 'Поселок лесопромышленников у Енисейска.',
        facts: ['Лесная промышленность', 'Лесозаготовки'],
        dates: [{ year: 1950, event: 'Основание' }],
        people: [],
        category: 'Лесопромышленный поселок'
      }
    },
    
    // ЮГ КРАЯ - дополнительные точки
    {
      id: 'kuragino',
      name: 'Курагино',
      coordinates: [53.90, 92.42],
      description: 'Районный центр на юге.',
      historicalSignificance: 'Сельское хозяйство.',
      imageUrl: 'assets/images/history/kuragino.jpg',
      detailedInfo: {
        history: 'Районный центр на юге края. Развитое сельское хозяйство.',
        facts: ['Сельское хозяйство', 'Животноводство', 'Живописная природа'],
        dates: [{ year: 1700, event: 'Основание' }],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'idrinskoe',
      name: 'Идринское',
      coordinates: [54.38, 91.68],
      description: 'Районный центр.',
      historicalSignificance: 'Сельское хозяйство.',
      imageUrl: 'assets/images/history/idrinskoe.jpg',
      detailedInfo: {
        history: 'Районный центр с развитым сельским хозяйством.',
        facts: ['Сельское хозяйство', 'Животноводство'],
        dates: [{ year: 1700, event: 'Основание' }],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'karatuzskoe',
      name: 'Каратузское',
      coordinates: [53.72, 91.30],
      description: 'Районный центр на юге.',
      historicalSignificance: 'Сельское хозяйство.',
      imageUrl: 'assets/images/history/karatuzskoe.jpg',
      detailedInfo: {
        history: 'Районный центр на юге края.',
        facts: ['Сельское хозяйство', 'Животноводство'],
        dates: [{ year: 1700, event: 'Основание' }],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'ermakovsky',
      name: 'Ермаковское',
      coordinates: [53.28, 92.62],
      description: 'Районный центр.',
      historicalSignificance: 'Горнодобывающая промышленность.',
      imageUrl: 'assets/images/history/ermakovsky.jpg',
      detailedInfo: {
        history: 'Районный центр. Горнодобывающая промышленность.',
        facts: ['Горнодобывающая промышленность', 'Добыча полезных ископаемых'],
        dates: [{ year: 1700, event: 'Основание' }],
        people: [],
        category: 'Горнодобывающий центр'
      }
    },
    {
      id: 'sayanogorsk',
      name: 'Саяногорск',
      coordinates: [53.10, 91.42],
      description: 'Город у Саяно-Шушенской ГЭС.',
      historicalSignificance: 'Алюминиевый завод, ГЭС.',
      imageUrl: 'assets/images/history/sayanogorsk.jpg',
      detailedInfo: {
        history: 'Город построен для строителей Саяно-Шушенской ГЭС. Алюминиевый завод.',
        facts: ['Саяно-Шушенская ГЭС', 'Алюминиевый завод', 'Промышленный центр', 'Живописное расположение'],
        dates: [{ year: 1975, event: 'Основание' }, { year: 1980, event: 'Статус города' }],
        people: [],
        category: 'Промышленный город'
      }
    },
    {
      id: 'partizanskoe',
      name: 'Партизанское',
      coordinates: [54.12, 93.18],
      description: 'Районный центр.',
      historicalSignificance: 'Партизанское движение в Гражданскую войну.',
      imageUrl: 'assets/images/history/partizanskoe.jpg',
      detailedInfo: {
        history: 'Районный центр. Назван в честь партизанского движения в Гражданскую войну.',
        facts: ['Партизанское движение', 'Гражданская война', 'Сельское хозяйство'],
        dates: [{ year: 1920, event: 'Партизанское движение' }],
        people: [],
        category: 'Исторический центр'
      }
    },
    {
      id: 'sukhobuzimskoe',
      name: 'Сухобузимское',
      coordinates: [56.48, 93.12],
      description: 'Районный центр.',
      historicalSignificance: 'Сельское хозяйство.',
      imageUrl: 'assets/images/history/sukhobuzimskoe.jpg',
      detailedInfo: {
        history: 'Районный центр с развитым сельским хозяйством.',
        facts: ['Сельское хозяйство', 'Животноводство'],
        dates: [{ year: 1700, event: 'Основание' }],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'mansky',
      name: 'Манский',
      coordinates: [55.72, 92.58],
      description: 'Поселок в предгорьях Саян.',
      historicalSignificance: 'Туризм, природа.',
      imageUrl: 'assets/images/history/mansky.jpg',
      detailedInfo: {
        history: 'Поселок в предгорьях Саян. Туристический центр.',
        facts: ['Туризм', 'Живописная природа', 'Предгорья Саян', 'Экотуризм'],
        dates: [{ year: 1900, event: 'Основание' }],
        people: [],
        category: 'Туристический центр'
      }
    },
    {
      id: 'predivinsk',
      name: 'Предивинск',
      coordinates: [56.48, 94.32],
      description: 'Поселок.',
      historicalSignificance: 'Промышленность.',
      imageUrl: 'assets/images/history/predivinsk.jpg',
      detailedInfo: {
        history: 'Промышленный поселок.',
        facts: ['Промышленность', 'Развитая инфраструктура'],
        dates: [{ year: 1950, event: 'Основание' }],
        people: [],
        category: 'Промышленный поселок'
      }
    },
    
    // СЕВЕР - дополнительные арктические точки
    {
      id: 'ust-port',
      name: 'Усть-Порт',
      coordinates: [69.82, 84.82],
      description: 'Поселок в устье Енисея.',
      historicalSignificance: 'Рыболовство, порт.',
      imageUrl: 'assets/images/history/ust-port.jpg',
      detailedInfo: {
        history: 'Поселок в устье Енисея. Рыболовство и речной порт.',
        facts: ['В устье Енисея', 'Рыболовство', 'Речной порт', 'Полярные условия'],
        dates: [{ year: 1930, event: 'Основание' }],
        people: [],
        category: 'Рыболовецкий поселок'
      }
    },
    {
      id: 'potapovo',
      name: 'Потапово',
      coordinates: [68.55, 87.72],
      description: 'Поселок на Таймыре.',
      historicalSignificance: 'Оленеводство.',
      imageUrl: 'assets/images/history/potapovo.jpg',
      detailedInfo: {
        history: 'Поселок на Таймыре. Традиционное оленеводство.',
        facts: ['Оленеводство', 'Таймыр', 'Традиционная культура'],
        dates: [{ year: 1930, event: 'Основание' }],
        people: [],
        category: 'Оленеводческий поселок'
      }
    },
    {
      id: 'nosok',
      name: 'Носок',
      coordinates: [71.58, 87.65],
      description: 'Полярная станция.',
      historicalSignificance: 'Метеонаблюдения.',
      imageUrl: 'assets/images/history/nosok.jpg',
      detailedInfo: {
        history: 'Полярная метеостанция. Ведет метеонаблюдения в Арктике.',
        facts: ['Полярная станция', 'Метеонаблюдения', 'Экстремальные условия'],
        dates: [{ year: 1930, event: 'Основание станции' }],
        people: [],
        category: 'Метеостанция'
      }
    },
    {
      id: 'chelyuskin-cape',
      name: 'Мыс Челюскин',
      coordinates: [77.43, 104.18],
      description: 'Самая северная точка материковой Евразии.',
      historicalSignificance: 'Полярная станция с 1932 года.',
      imageUrl: 'assets/images/history/chelyuskin.jpg',
      detailedInfo: {
        history: 'Самая северная точка материковой Евразии. Полярная станция с 1932 года.',
        facts: ['Самая северная точка Евразии', 'Полярная станция с 1932', 'Экстремальные условия', 'Исследование Арктики'],
        dates: [{ year: 1742, event: 'Открытие С.И. Челюскиным' }, { year: 1932, event: 'Основание станции' }],
        people: ['С.И. Челюскин (исследователь)'],
        category: 'Полярная станция'
      }
    },
    {
      id: 'sterlegova',
      name: 'Стерлегова',
      coordinates: [72.38, 105.80],
      description: 'Полярная станция на Таймыре.',
      historicalSignificance: 'Исследование Арктики.',
      imageUrl: 'assets/images/history/sterlegova.jpg',
      detailedInfo: {
        history: 'Полярная станция на Таймыре. Исследование Арктики.',
        facts: ['Полярная станция', 'Исследование Арктики', 'Метеонаблюдения'],
        dates: [{ year: 1930, event: 'Основание' }],
        people: [],
        category: 'Полярная станция'
      }
    },
    {
      id: 'taimyr-lake',
      name: 'Озеро Таймыр',
      coordinates: [74.52, 102.48],
      description: 'Крупнейшее озеро Таймыра.',
      historicalSignificance: 'Самое северное крупное озеро мира.',
      imageUrl: 'assets/images/history/taimyr-lake.jpg',
      detailedInfo: {
        history: 'Крупнейшее озеро Таймыра. Самое северное крупное озеро в мире.',
        facts: ['Самое северное крупное озеро', 'Площадь 4560 км²', 'Глубина до 26 м', 'Замерзает 9 месяцев в году'],
        dates: [{ year: 1736, event: 'Открытие' }],
        people: [],
        category: 'Природный объект'
      }
    },
    {
      id: 'ary-mas',
      name: 'Ары-Мас',
      coordinates: [72.48, 101.62],
      description: 'Самый северный лес в мире.',
      historicalSignificance: 'Заповедник, уникальная экосистема.',
      imageUrl: 'assets/images/history/ary-mas.jpg',
      detailedInfo: {
        history: 'Самый северный лес в мире. Заповедник с уникальной экосистемой.',
        facts: ['Самый северный лес в мире', 'Заповедник', 'Уникальная экосистема', 'Даурская лиственница'],
        dates: [{ year: 1978, event: 'Создание заповедника' }],
        people: [],
        category: 'Заповедник'
      }
    },
    
    // ВОСТОК - дополнительные точки в Эвенкии
    {
      id: 'strelka',
      name: 'Стрелка',
      coordinates: [61.38, 89.42],
      description: 'Поселок в тайге.',
      historicalSignificance: 'Лесозаготовки.',
      imageUrl: 'assets/images/history/strelka.jpg',
      detailedInfo: {
        history: 'Поселок лесозаготовителей в тайге.',
        facts: ['Лесозаготовки', 'Таежный край', 'Изолированное расположение'],
        dates: [{ year: 1950, event: 'Основание' }],
        people: [],
        category: 'Лесопромышленный поселок'
      }
    },
    {
      id: 'preobrazhenka',
      name: 'Преображенка',
      coordinates: [62.18, 99.68],
      description: 'Поселок в Эвенкии.',
      historicalSignificance: 'Охота, рыболовство.',
      imageUrl: 'assets/images/history/preobrazhenka.jpg',
      detailedInfo: {
        history: 'Поселок в Эвенкии. Традиционные промыслы.',
        facts: ['Охота', 'Рыболовство', 'Традиционные промыслы'],
        dates: [{ year: 1930, event: 'Основание' }],
        people: [],
        category: 'Промысловый поселок'
      }
    },
    {
      id: 'kislokan',
      name: 'Кислокан',
      coordinates: [59.68, 101.42],
      description: 'Поселок на Нижней Тунгуске.',
      historicalSignificance: 'Речной порт.',
      imageUrl: 'assets/images/history/kislokan.jpg',
      detailedInfo: {
        history: 'Поселок на Нижней Тунгуске. Речной порт.',
        facts: ['Речной порт', 'На Нижней Тунгуске', 'Рыболовство'],
        dates: [{ year: 1930, event: 'Основание' }],
        people: [],
        category: 'Речной порт'
      }
    },
    {
      id: 'yukta',
      name: 'Юкта',
      coordinates: [63.28, 104.52],
      description: 'Эвенкийский поселок.',
      historicalSignificance: 'Оленеводство.',
      imageUrl: 'assets/images/history/yukta.jpg',
      detailedInfo: {
        history: 'Эвенкийский поселок. Традиционное оленеводство.',
        facts: ['Оленеводство', 'Традиционная культура эвенков', 'Изолированное расположение'],
        dates: [{ year: 1930, event: 'Основание' }],
        people: [],
        category: 'Оленеводческий поселок'
      }
    },
    {
      id: 'surinda',
      name: 'Суринда',
      coordinates: [63.88, 99.28],
      description: 'Поселок в Эвенкии.',
      historicalSignificance: 'Традиционные промыслы.',
      imageUrl: 'assets/images/history/surinda.jpg',
      detailedInfo: {
        history: 'Поселок в Эвенкии. Традиционные промыслы эвенков.',
        facts: ['Традиционные промыслы', 'Охота', 'Рыболовство'],
        dates: [{ year: 1930, event: 'Основание' }],
        people: [],
        category: 'Промысловый поселок'
      }
    },
    {
      id: 'nidym',
      name: 'Нидым',
      coordinates: [65.38, 97.12],
      description: 'Поселок на севере Эвенкии.',
      historicalSignificance: 'Оленеводство.',
      imageUrl: 'assets/images/history/nidym.jpg',
      detailedInfo: {
        history: 'Поселок на севере Эвенкии. Оленеводство.',
        facts: ['Оленеводство', 'Северная Эвенкия', 'Суровый климат'],
        dates: [{ year: 1930, event: 'Основание' }],
        people: [],
        category: 'Оленеводческий поселок'
      }
    },
    {
      id: 'chirinda',
      name: 'Чиринда',
      coordinates: [66.18, 99.82],
      description: 'Северный поселок.',
      historicalSignificance: 'Охота, рыболовство.',
      imageUrl: 'assets/images/history/chirinda.jpg',
      detailedInfo: {
        history: 'Северный поселок. Охота и рыболовство.',
        facts: ['Охота', 'Рыболовство', 'Северная тайга'],
        dates: [{ year: 1930, event: 'Основание' }],
        people: [],
        category: 'Промысловый поселок'
      }
    },
    {
      id: 'tutonchany',
      name: 'Тутончаны',
      coordinates: [61.58, 101.52],
      description: 'Поселок в Эвенкии.',
      historicalSignificance: 'Традиционные промыслы эвенков.',
      imageUrl: 'assets/images/history/tutonchany.jpg',
      detailedInfo: {
        history: 'Поселок в Эвенкии. Традиционные промыслы эвенков.',
        facts: ['Традиционные промыслы', 'Культура эвенков', 'Охота и рыболовство'],
        dates: [{ year: 1930, event: 'Основание' }],
        people: [],
        category: 'Эвенкийский поселок'
      }
    },
    
    // ЦЕНТР - дополнительные точки вокруг Красноярска
    {
      id: 'solnechny',
      name: 'Солнечный',
      coordinates: [56.18, 92.12],
      description: 'Поселок под Красноярском.',
      historicalSignificance: 'Жилой район.',
      imageUrl: 'assets/images/history/solnechny.jpg',
      detailedInfo: {
        history: 'Современный жилой поселок в пригороде Красноярска. Развивался как спальный район для работников столицы края.',
        facts: [
          'Пригород Красноярска',
          'Современная застройка',
          'Развитая инфраструктура',
          'Близость к городу'
        ],
        dates: [
          { year: 1980, event: 'Начало застройки' },
          { year: 2000, event: 'Активное развитие' }
        ],
        people: [],
        category: 'Жилой поселок'
      }
    },
    {
      id: 'zaozerny',
      name: 'Заозерный',
      coordinates: [55.97, 94.70],
      description: 'Закрытый город.',
      historicalSignificance: 'Производство ракетных двигателей.',
      imageUrl: 'assets/images/history/zaozerny.jpg',
      detailedInfo: {
        history: 'Закрытое административно-территориальное образование (ЗАТО). Основан для производства ракетных двигателей. До 1994 года назывался Красноярск-45.',
        facts: [
          'ЗАТО - закрытый город',
          'Производство ракетных двигателей',
          'Машиностроительный завод',
          'Высокий уровень жизни',
          'Ограниченный доступ'
        ],
        dates: [
          { year: 1958, event: 'Основание' },
          { year: 1994, event: 'Получил название Заозерный' },
          { year: 2001, event: 'Статус ЗАТО' }
        ],
        people: [],
        category: 'Закрытый город'
      }
    },
    {
      id: 'krasnoturinsk',
      name: 'Краснотуранск',
      coordinates: [54.92, 91.68],
      description: 'Поселок на юге.',
      historicalSignificance: 'Сельское хозяйство.',
      imageUrl: 'assets/images/history/krasnoturinsk.jpg',
      detailedInfo: {
        history: 'Районный центр на юге Красноярского края. Развивался как сельскохозяйственный центр в плодородной Минусинской котловине.',
        facts: [
          'Районный центр',
          'Сельское хозяйство',
          'Минусинская котловина',
          'Животноводство и растениеводство',
          'Благоприятный климат'
        ],
        dates: [
          { year: 1700, event: 'Первое упоминание' },
          { year: 1924, event: 'Статус районного центра' }
        ],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'novoselovka',
      name: 'Новоселово',
      coordinates: [54.08, 93.12],
      description: 'Районный центр.',
      historicalSignificance: 'Сельское хозяйство.',
      imageUrl: 'assets/images/history/novoselovka.jpg',
      detailedInfo: {
        history: 'Районный центр на юге края. Развивался как центр сельского хозяйства и животноводства. Расположен в живописной местности у предгорий Саян.',
        facts: [
          'Районный центр',
          'Развитое животноводство',
          'Зерновые культуры',
          'Живописная природа',
          'Близость к Саянам'
        ],
        dates: [
          { year: 1700, event: 'Основание села' },
          { year: 1924, event: 'Статус районного центра' }
        ],
        people: [],
        category: 'Районный центр'
      }
    },
    {
      id: 'primorsk',
      name: 'Приморск',
      coordinates: [53.48, 91.88],
      description: 'Поселок на юге края.',
      historicalSignificance: 'Сельское хозяйство.',
      imageUrl: 'assets/images/history/primorsk.jpg',
      detailedInfo: {
        history: 'Поселок на юге Красноярского края, недалеко от границы с Хакасией. Развивался как сельскохозяйственный центр в благоприятных климатических условиях.',
        facts: [
          'Южный поселок',
          'Сельское хозяйство',
          'Благоприятный климат',
          'Близость к Хакасии',
          'Животноводство'
        ],
        dates: [
          { year: 1700, event: 'Основание' },
          { year: 1950, event: 'Развитие сельского хозяйства' }
        ],
        people: [],
        category: 'Сельскохозяйственный поселок'
      }
    },
    {
      id: 'gremuchinsk',
      name: 'Гремучинск',
      coordinates: [58.58, 88.12],
      description: 'Поселок на западе.',
      historicalSignificance: 'Лесная промышленность.',
      imageUrl: 'assets/images/history/gremuchinsk.jpg',
      detailedInfo: {
        history: 'Поселок лесозаготовителей на западе края. Развивался как центр лесной промышленности в богатой тайге.',
        facts: [
          'Лесная промышленность',
          'Лесозаготовки',
          'Таежный край',
          'Богатые лесные ресурсы',
          'Изолированное расположение'
        ],
        dates: [
          { year: 1930, event: 'Основание поселка' },
          { year: 1950, event: 'Развитие лесозаготовок' }
        ],
        people: [],
        category: 'Лесопромышленный поселок'
      }
    },
    {
      id: 'severo-yeniseysky-raion',
      name: 'Северо-Енисейский район',
      coordinates: [59.88, 92.52],
      description: 'Золотодобывающий район.',
      historicalSignificance: 'Крупнейшие золотые прииски.',
      imageUrl: 'assets/images/history/gold-region.jpg',
      detailedInfo: {
        history: 'Золотодобывающий район в северной тайге. Богатейшие месторождения золота разрабатываются с XIX века. Один из главных центров золотодобычи России.',
        facts: [
          'Крупнейший золотодобывающий район',
          'Богатые месторождения золота',
          'Работают с XIX века',
          'Суровый таежный климат',
          'Множество приисков'
        ],
        dates: [
          { year: 1840, event: 'Открытие золота' },
          { year: 1930, event: 'Промышленная добыча' },
          { year: 1941, event: 'Развитие района' }
        ],
        people: [],
        category: 'Золотодобывающий район'
      }
    },
    {
      id: 'tungussko-chunsky',
      name: 'Тунгусско-Чунский',
      coordinates: [60.88, 90.12],
      description: 'Район в северной тайге.',
      historicalSignificance: 'Лесозаготовки.',
      imageUrl: 'assets/images/history/tungussko.jpg',
      detailedInfo: {
        history: 'Район в северной тайге. Развивался как центр лесозаготовок. Богатейшие лесные ресурсы, суровый климат, изолированное расположение.',
        facts: [
          'Северная тайга',
          'Лесозаготовки',
          'Богатые лесные ресурсы',
          'Суровый климат',
          'Изолированное расположение',
          'Малонаселенный район'
        ],
        dates: [
          { year: 1930, event: 'Начало лесозаготовок' },
          { year: 1950, event: 'Развитие лесной промышленности' }
        ],
        people: [],
        category: 'Лесопромышленный район'
      }
    }
  ],

  /**
   * Quiz Questions - for Historical Quiz
   */
  quizQuestions: [
    {
      id: 1,
      question: 'В каком году был основан Красноярск?',
      options: ['1619', '1628', '1638', '1648'],
      correctAnswer: 1,
      explanation: 'Красноярский острог был основан 19 августа 1628 года казачьим атаманом Андреем Дубенским.'
    },
    {
      id: 2,
      question: 'Какой процент российского золота давал Красноярский край в XIX веке?',
      options: ['30%', '45%', '60%', '75%'],
      correctAnswer: 2,
      explanation: 'В XIX веке Енисейская губерния давала около 60% всего российского золота, что сделало регион центром золотой лихорадки.'
    },
    {
      id: 3,
      question: 'Какую награду получил железнодорожный мост через Енисей на Всемирной выставке в Париже?',
      options: ['Золотую медаль', 'Гран-при', 'Серебряную медаль', 'Диплом'],
      correctAnswer: 1,
      explanation: 'Мост получил Гран-при на Всемирной выставке в Париже в 1900 году, наравне с Эйфелевой башней.'
    },
    {
      id: 4,
      question: 'Сколько лет древнейшей стоянке человека Афонтова Гора?',
      options: ['20 000 лет', '30 000 лет', '40 000 лет', '50 000 лет'],
      correctAnswer: 2,
      explanation: 'Афонтова Гора - одна из древнейших стоянок человека в Сибири, возрастом около 40 000 лет.'
    },
    {
      id: 5,
      question: 'В каком году был образован Красноярский край в современных границах?',
      options: ['1924', '1934', '1944', '1954'],
      correctAnswer: 1,
      explanation: 'Красноярский край был образован 7 декабря 1934 года. Это второй по площади субъект Российской Федерации.'
    },
    {
      id: 6,
      question: 'Какова мощность Красноярской ГЭС?',
      options: ['4000 МВт', '5000 МВт', '6000 МВт', '7000 МВт'],
      correctAnswer: 2,
      explanation: 'Красноярская ГЭС имеет мощность 6000 МВт и была крупнейшей в СССР на момент запуска в 1972 году.'
    }
  ],

  /**
   * Comparison Pairs - for Then and Now Gallery
   */
  comparisonPairs: [
    {
      id: 'krasnoyarsk-center',
      location: 'Центр Красноярска',
      historicalImage: 'assets/images/history/comparison/center-1900.jpg',
      modernImage: 'assets/images/history/comparison/center-2024.jpg',
      historicalYear: 1900,
      modernYear: 2024,
      description: 'Центральная площадь Красноярска: от деревянных построек до современного мегаполиса'
    },
    {
      id: 'yenisei-embankment',
      location: 'Набережная Енисея',
      historicalImage: 'assets/images/history/comparison/embankment-1950.jpg',
      modernImage: 'assets/images/history/comparison/embankment-2024.jpg',
      historicalYear: 1950,
      modernYear: 2024,
      description: 'Набережная Енисея: от промышленной зоны до благоустроенной прогулочной зоны'
    },
    {
      id: 'railway-station',
      location: 'Железнодорожный вокзал',
      historicalImage: 'assets/images/history/comparison/station-1960.jpg',
      modernImage: 'assets/images/history/comparison/station-2024.jpg',
      historicalYear: 1960,
      modernYear: 2024,
      description: 'Железнодорожный вокзал: от советской архитектуры до современного транспортного узла'
    }
  ],

  /**
   * Timeline Events - for Animated Timeline
   */
  timelineEvents: [
    {
      id: 'ancient',
      year: -38000,
      date: '40 000 до н.э.',
      title: 'Древнейшие стоянки',
      description: 'Появление первых людей на территории Красноярского края. Стоянка Афонтова Гора - охотники на мамонтов. Найдено более 100 скелетов мамонтов и каменные орудия труда.',
      imageUrl: 'assets/images/history/timeline/ancient.jpg',
      side: 'left'
    },
    {
      id: 'scythians',
      year: -500,
      date: '500 до н.э.',
      title: 'Скифские племена',
      description: 'Расцвет скифской культуры на территории края. Развитие торговли и ремесел. Минусинская котловина становится центром древней цивилизации.',
      imageUrl: 'assets/images/history/timeline/scythians.jpg',
      side: 'right'
    },
    {
      id: 'khanty-period',
      year: 1200,
      date: '1200-1600',
      title: 'Период ханты и манси',
      description: 'Развитие коренных народов края - ханты, манси, эвенков. Формирование традиционного образа жизни охотников и рыболовов.',
      imageUrl: 'assets/images/history/timeline/khanty.jpg',
      side: 'left'
    },
    {
      id: 'kansk-foundation',
      year: 1636,
      date: '1636',
      title: 'Основание Канска',
      description: 'Казаки основали Канский острог на востоке края. Один из старейших городов Сибири, развивается как торговый и ремесленный центр.',
      imageUrl: 'assets/images/history/timeline/kansk.jpg',
      side: 'right'
    },
    {
      id: 'yeniseisk-foundation',
      year: 1619,
      date: '1619',
      title: 'Основание Енисейска',
      description: 'Казаки основали Енисейский острог - первый русский город на территории края. Становится центром пушной торговли и освоения Сибири.',
      imageUrl: 'assets/images/history/timeline/yeniseisk.jpg',
      side: 'left'
    },
    {
      id: 'krasnoyarsk-foundation',
      year: 1628,
      date: '19 августа 1628',
      title: 'Основание Красноярска',
      description: 'Андрей Дубенский основал Красноярский острог на Красном Яру для защиты от кыргызов. Начало развития главного города края.',
      imageUrl: 'assets/images/history/timeline/foundation.jpg',
      side: 'right'
    },
    {
      id: 'achinsk-foundation',
      year: 1683,
      date: '1683',
      title: 'Основание Ачинска',
      description: 'Основан Ачинский острог как важный торговый пост на западе края. Развивается как центр торговли и ремесел.',
      imageUrl: 'assets/images/history/timeline/achinsk.jpg',
      side: 'left'
    },
    {
      id: 'siberian-expansion',
      year: 1700,
      date: '1700',
      title: 'Освоение Сибири',
      description: 'Активное развитие торговли и промышленности. Край становится важным центром Сибири. Расширение границ русского влияния на восток.',
      imageUrl: 'assets/images/history/timeline/expansion.jpg',
      side: 'right'
    },
    {
      id: 'minusinsk-founding',
      year: 1739,
      date: '1739',
      title: 'Основание Минусинска',
      description: 'Основан Минусинский острог в центре Минусинской котловины. Развивается как торговый центр и база для исследования края.',
      imageUrl: 'assets/images/history/timeline/minusinsk.jpg',
      side: 'left'
    },
    {
      id: 'gold-rush',
      year: 1838,
      date: '1838',
      title: 'Золотая лихорадка',
      description: 'Открытие богатейших золотых месторождений. Край дает 60% российского золота. Енисейск становится центром золотодобычи и торговли.',
      imageUrl: 'assets/images/history/timeline/gold.jpg',
      side: 'right'
    },
    {
      id: 'lenin-exile',
      year: 1897,
      date: '1897-1900',
      title: 'Ссылка В.И. Ленина',
      description: 'В.И. Ленин отбывает ссылку в селе Шушенское. Написал более 30 научных работ. Женился на Н.К. Крупской. Важный период в истории края.',
      imageUrl: 'assets/images/history/timeline/lenin.jpg',
      side: 'left'
    },
    {
      id: 'railway',
      year: 1899,
      date: '1899',
      title: 'Транссибирская магистраль',
      description: 'Открытие железнодорожного моста через Енисей - инженерное чудо эпохи. Край получает прямое сообщение с центром России.',
      imageUrl: 'assets/images/history/timeline/railway.jpg',
      side: 'right'
    },
    {
      id: 'revolution',
      year: 1917,
      date: '1917',
      title: 'Октябрьская революция',
      description: 'Край присоединяется к советской власти. Начало новой эпохи развития. Формирование советской системы управления.',
      imageUrl: 'assets/images/history/timeline/revolution.jpg',
      side: 'left'
    },
    {
      id: 'region-formation',
      year: 1934,
      date: '7 декабря 1934',
      title: 'Образование края',
      description: 'Создание Красноярского края в современных границах. Объединение территорий в единый административный регион.',
      imageUrl: 'assets/images/history/timeline/region.jpg',
      side: 'right'
    },
    {
      id: 'norilsk-founding',
      year: 1935,
      date: '1935',
      title: 'Основание Норильска',
      description: 'Начало строительства Норильска как центра добычи никеля. Построен заключенными ГУЛАГа. Становится крупнейшим центром добычи никеля в мире.',
      imageUrl: 'assets/images/history/timeline/norilsk.jpg',
      side: 'left'
    },
    {
      id: 'ww2',
      year: 1941,
      date: '1941-1945',
      title: 'Великая Отечественная война',
      description: 'Эвакуация более 30 заводов. Край становится важнейшим промышленным центром тыла. Производство вооружения и боеприпасов.',
      imageUrl: 'assets/images/history/timeline/ww2.jpg',
      side: 'right'
    },
    {
      id: 'norilsk-uprising',
      year: 1953,
      date: '1953',
      title: 'Норильское восстание',
      description: 'Восстание заключенных в Норильске. Один из крупнейших восстаний в ГУЛАГе. Важный момент в истории края.',
      imageUrl: 'assets/images/history/timeline/uprising.jpg',
      side: 'left'
    },
    {
      id: 'atomic-cities',
      year: 1950,
      date: '1950-1956',
      title: 'Закрытые города',
      description: 'Основание Железногорска (1950) и Зеленогорска (1956) - центров атомной промышленности. Производство плутония и обогащение урана.',
      imageUrl: 'assets/images/history/timeline/atomic.jpg',
      side: 'right'
    },
    {
      id: 'industrialization',
      year: 1960,
      date: '1960',
      title: 'Индустриализация',
      description: 'Развитие алюминиевой промышленности и энергетики. Край становится промышленным центром. Строительство крупных заводов и комбинатов.',
      imageUrl: 'assets/images/history/timeline/industry.jpg',
      side: 'left'
    },
    {
      id: 'ges-construction',
      year: 1955,
      date: '1955',
      title: 'Начало строительства ГЭС',
      description: 'Начало строительства Красноярской гидроэлектростанции. Грандиозный проект советской эпохи. Привлечение лучших инженеров и рабочих.',
      imageUrl: 'assets/images/history/timeline/ges-construction.jpg',
      side: 'right'
    },
    {
      id: 'ges',
      year: 1972,
      date: '1972',
      title: 'Красноярская ГЭС',
      description: 'Запуск крупнейшей в СССР гидроэлектростанции мощностью 6000 МВт. Плотина высотой 124 метра. Изображена на 10-рублевой купюре.',
      imageUrl: 'assets/images/history/timeline/ges.jpg',
      side: 'left'
    },
    {
      id: 'aluminum-boom',
      year: 1975,
      date: '1975',
      title: 'Алюминиевый бум',
      description: 'Развитие алюминиевой промышленности благодаря дешевой электроэнергии. Край становится мировым центром производства алюминия.',
      imageUrl: 'assets/images/history/timeline/aluminum.jpg',
      side: 'right'
    },
    {
      id: 'soviet-decline',
      year: 1991,
      date: '1991',
      title: 'Распад СССР',
      description: 'Распад Советского Союза. Край переходит на новую экономическую систему. Начало рыночных реформ.',
      imageUrl: 'assets/images/history/timeline/soviet-decline.jpg',
      side: 'left'
    },
    {
      id: 'modern-era',
      year: 2000,
      date: '2000',
      title: 'Новое тысячелетие',
      description: 'Край вступает в новую эпоху развития. Модернизация инфраструктуры и экономики. Развитие туризма и культуры.',
      imageUrl: 'assets/images/history/timeline/modern.jpg',
      side: 'right'
    },
    {
      id: 'boguchany-ges',
      year: 2012,
      date: '2012',
      title: 'Богучанская ГЭС',
      description: 'Запуск Богучанской гидроэлектростанции. Развитие энергетики на Ангаре. Строительство алюминиевого завода.',
      imageUrl: 'assets/images/history/timeline/boguchany.jpg',
      side: 'left'
    },
    {
      id: 'universiade',
      year: 2019,
      date: '2019',
      title: 'Зимняя Универсиада',
      description: 'Красноярск принимает XXIX Всемирную зимнюю универсиаду. Построено 60+ спортивных объектов. Край становится известен на мировой арене.',
      imageUrl: 'assets/images/history/timeline/universiade.jpg',
      side: 'right'
    },
    {
      id: 'arctic-development',
      year: 2020,
      date: '2020',
      title: 'Развитие Арктики',
      description: 'Активное развитие северных территорий края. Инвестиции в инфраструктуру и добычу полезных ископаемых. Развитие Северного морского пути.',
      imageUrl: 'assets/images/history/timeline/arctic.jpg',
      side: 'left'
    },
    {
      id: 'green-transition',
      year: 2023,
      date: '2023',
      title: 'Зеленая трансформация',
      description: 'Переход на возобновляемые источники энергии. Развитие экологичных технологий. Сохранение природного наследия края.',
      imageUrl: 'assets/images/history/timeline/green.jpg',
      side: 'right'
    },
    {
      id: 'future',
      year: 2025,
      date: '2025',
      title: 'Современный край',
      description: 'Красноярский край - один из ведущих регионов России. Развитие экономики, науки и культуры. Сохранение природного наследия.',
      imageUrl: 'assets/images/history/timeline/future.jpg',
      side: 'left'
    }
  ],

  /**
   * Heroes - for Hero Flip Cards
   */
  heroes: [
    {
      id: 'dubensky',
      name: 'Андрей Дубенский',
      portraitUrls: [
        'assets/images/history/heroes/dubensky.jpg',
        'assets/images/history/heroes/dubensky1.jpg'
      ],
      birthYear: 1600,
      deathYear: 1640,
      title: 'Основатель Красноярска',
      biography: 'Казачий атаман, основавший Красноярский острог в 1628 году. Защищал русские поселения от набегов енисейских кыргызов.',
      achievements: [
        'Основал Красноярский острог',
        'Организовал оборону от кыргызов',
        'Способствовал освоению Сибири'
      ],
      tabs: {
        overview: 'Андрей Дубенский был выдающимся казачьим атаманом, сыгравшим ключевую роль в освоении Сибири. Его деятельность положила начало развитию Красноярска как важного стратегического и торгового центра.',
        history: 'В 1628 году Дубенский основал Красноярский острог на берегу Енисея. Это событие стало началом истории современного Красноярска. Острог служил защитой от набегов енисейских кыргызов и был центром торговли пушниной.',
        legacy: 'Наследие Дубенского - это сам город Красноярск, который вырос из основанного им острога. Его имя навечно связано с историей края. Дубенский считается одним из героев сибирского казачества.'
      }
    },
    {
      id: 'surikov',
      name: 'Василий Суриков',
      portraitUrls: [
        'assets/images/history/heroes/surikov.jpg',
        'assets/images/history/heroes/surikov1.jpg'
      ],
      birthYear: 1848,
      deathYear: 1916,
      title: 'Великий художник',
      biography: 'Родился в Красноярске, стал классиком русской живописи. Автор картин "Боярыня Морозова", "Утро стрелецкой казни", "Взятие снежного городка".',
      achievements: [
        'Академик Императорской Академии художеств',
        'Создал шедевры русской исторической живописи',
        'Прославил Красноярск на весь мир'
      ],
      tabs: {
        overview: 'Василий Иванович Суриков - один из величайших русских художников XIX века. Его исторические полотна отличаются масштабностью, глубиной психологического анализа и блестящей техникой исполнения.',
        history: 'Суриков родился в Красноярске в семье казачьего офицера. Учился в Академии художеств в Санкт-Петербурге. Его картины "Боярыня Морозова", "Утро стрелецкой казни" и "Взятие снежного городка" стали шедеврами русской живописи.',
        legacy: 'Суриков оставил неизгладимый след в истории русского искусства. Его работы хранятся в лучших музеях мира. Красноярск гордится своим великим сыном, чьи картины прославили край на весь мир.'
      }
    },
    {
      id: 'astafiev',
      name: 'Виктор Астафьев',
      portraitUrls: [
        'assets/images/history/heroes/astafiev.jpg',
        'assets/images/history/heroes/astafiev1.jpg'
      ],
      birthYear: 1924,
      deathYear: 2001,
      title: 'Писатель',
      biography: 'Классик русской литературы, уроженец края. Автор "Царь-рыбы", "Прокляты и убиты". Лауреат Государственных премий СССР и России.',
      achievements: [
        'Лауреат Государственной премии СССР',
        'Лауреат Государственной премии России',
        'Почетный гражданин Красноярска'
      ],
      tabs: {
        overview: 'Виктор Петрович Астафьев - один из самых значительных русских писателей XX века. Его произведения отличаются глубоким психологизмом, любовью к природе и острой социальной критикой.',
        history: 'Астафьев родился в Красноярском крае. Участвовал в Великой Отечественной войне. После войны посвятил себя литературе. Его романы "Царь-рыба" и "Прокляты и убиты" стали вершинами русской литературы.',
        legacy: 'Астафьев оставил богатое литературное наследие. Его книги переведены на многие языки мира. Писатель был почетным гражданином Красноярска и символом культурного величия края.'
      }
    },
    {
      id: 'hvorostovsky',
      name: 'Дмитрий Хворостовский',
      portraitUrls: [
        'assets/images/history/heroes/hvorostovsky.jpg',
        'assets/images/history/heroes/hvorostovsky1.jpg'
      ],
      birthYear: 1962,
      deathYear: 2017,
      title: 'Оперный певец',
      biography: 'Всемирно известный баритон из Красноярска. Выступал на лучших сценах мира: Метрополитен-опера, Ла Скала, Ковент-Гарден.',
      achievements: [
        'Народный артист России',
        'Лауреат премии "Грэмми"',
        'Выступал на лучших сценах мира'
      ],
      tabs: {
        overview: 'Дмитрий Александрович Хворостовский - один из величайших оперных певцов современности. Его голос баритона считался одним из самых красивых в мире. Он завоевал сердца миллионов слушателей.',
        history: 'Хворостовский родился в Красноярске. Учился в Красноярском училище искусств и Московской консерватории. Его карьера началась в Красноярском театре оперы и балета, а затем он покорил мировые сцены.',
        legacy: 'Хворостовский оставил огромное наследие в мировой оперной культуре. Его записи слушают миллионы людей. Красноярск гордится своим великим певцом, который прославил край на весь мир.'
      }
    }
  ],

  /**
   * Historical Facts - for Facts Counter
   */
  facts: [
    {
      id: 'age',
      value: 40000,
      label: 'лет истории',
      suffix: '+',
      icon: '🏺'
    },
    {
      id: 'foundation',
      value: 1628,
      label: 'год основания',
      suffix: '',
      icon: '⚔️'
    },
    {
      id: 'gold',
      value: 60,
      label: 'золота России в XIX веке',
      suffix: '%',
      icon: '💰'
    },
    {
      id: 'area',
      value: 2400000,
      label: 'площадь края',
      suffix: 'км²',
      icon: '🗺️'
    }
  ],

  /**
   * Museum Artifacts - for Museum Carousel
   */
  artifacts: [
    {
      id: 'minusinsk-pottery',
      name: 'Минусинская керамика',
      imageUrl: 'assets/images/modal/museum-artifacts/artifact-01-minusinsk-pottery.jpg',
      description: 'Древние глиняные сосуды культуры Минусинской котловины. Найдены при раскопках в Красноярском крае. Возраст: 3000-2000 лет до н.э.',
      period: 'Древность',
      museum: 'Красноярский краеведческий музей'
    },
    {
      id: 'scythian-bronze',
      name: 'Скифские бронзовые украшения',
      imageUrl: 'assets/images/modal/museum-artifacts/artifact-02-scythian-bronze.jpg',
      description: 'Бронзовые пряжки и украшения скифского периода из раскопок Красноярска. Демонстрируют высокое мастерство древних ремесленников.',
      period: 'Древность',
      museum: 'Красноярский краеведческий музей'
    },
    {
      id: 'siberian-embroidery',
      name: 'Сибирская вышивка',
      imageUrl: 'assets/images/modal/museum-artifacts/artifact-03-siberian-embroidery.jpg',
      description: 'Традиционные вышитые полотенца и ткани коренных народов Сибири. Сохраняют древние орнаменты и символику.',
      period: 'XIX-XX век',
      museum: 'Музей этнографии Красноярского края'
    },
    {
      id: 'indigenous-tools',
      name: 'Инструменты коренных народов',
      imageUrl: 'assets/images/modal/museum-artifacts/artifact-04-indigenous-tools.jpg',
      description: 'Охотничьи ножи, стрелы и копья из музейных коллекций. Отражают традиционный образ жизни народов Сибири.',
      period: 'XVIII-XIX век',
      museum: 'Красноярский краеведческий музей'
    },
    {
      id: 'bone-jewelry',
      name: 'Украшения из кости',
      imageUrl: 'assets/images/modal/museum-artifacts/artifact-05-bone-jewelry.jpg',
      description: 'Браслеты, амулеты и подвески из кости и рога. Артефакты коренных народов Красноярского края.',
      period: 'Древность',
      museum: 'Красноярский краеведческий музей'
    },
    {
      id: 'wooden-idol',
      name: 'Деревянный идол',
      imageUrl: 'assets/images/modal/museum-artifacts/artifact-06-wooden-idol.jpg',
      description: 'Ритуальная деревянная фигурка коренных народов Сибири. Использовалась в обрядах и праздниках.',
      period: 'XVIII-XIX век',
      museum: 'Музей этнографии Красноярского края'
    },
    {
      id: 'national-costume',
      name: 'Национальный костюм',
      imageUrl: 'assets/images/modal/museum-artifacts/artifact-07-national-costume.jpg',
      description: 'Традиционная одежда коренных народов Красноярского края. Демонстрирует богатство культурного наследия региона.',
      period: 'XIX-XX век',
      museum: 'Музей этнографии Красноярского края'
    },
    {
      id: 'siberian-coins',
      name: 'Сибирские монеты',
      imageUrl: 'assets/images/modal/museum-artifacts/artifact-08-siberian-coins.jpg',
      description: 'Исторические монеты периода освоения Сибири и развития Красноярска. Редкие экземпляры из частных коллекций.',
      period: 'XVII-XIX век',
      museum: 'Красноярский краеведческий музей'
    },
    {
      id: 'fishing-hooks',
      name: 'Рыболовные крючки',
      imageUrl: 'assets/images/modal/museum-artifacts/artifact-09-fishing-hooks.jpg',
      description: 'Древние крючки из кости и металла для рыбалки на Енисее. Свидетельствуют о развитии рыболовства в регионе.',
      period: 'Древность',
      museum: 'Красноярский краеведческий музей'
    },
    {
      id: 'fur-trade-items',
      name: 'Предметы пушной торговли',
      imageUrl: 'assets/images/modal/museum-artifacts/artifact-10-fur-trade-items.jpg',
      description: 'Товары и украшения эпохи пушной торговли в Сибири. Отражают важность меховой торговли в истории края.',
      period: 'XVII-XVIII век',
      museum: 'Красноярский краеведческий музей'
    }
  ],

  /**
   * Historical Documents - for Document Viewer (8th component)
   */
  documents: [
    {
      id: 'ostrog-decree',
      title: 'Грамота об основании острога',
      year: 1628,
      description: 'Донесение казачьего атамана Андрея Дубенского о строительстве Красноярского острога на берегу Енисея для защиты от набегов енисейских кыргызов и укрепления позиций Русского государства в Сибири. Документ содержит описание стратегического расположения крепости и её оборонительных сооружений.',
      imageUrl: 'assets/images/history/documents/krasnoyarsk-ostrog-1628.jpg',
      content: 'По указу царя Михаила Федоровича, для защиты русских земель от набегов енисейских кыргызов, построить острог на красном яру у реки Енисей. Официальная дата основания Красноярска.\n\nДокумент подписан атаманом Андреем Дубенским 15 августа 1628 года. Острог был построен на высоком берегу Енисея, откуда открывался вид на все подходы. Стены острога были деревянными, высотой около 5 метров, с четырьмя угловыми башнями. Гарнизон состоял из 50 казаков и 30 стрельцов.\n\nЭто событие ознаменовало начало русской колонизации Среднего Енисея и стало отправной точкой развития Красноярска как важного торгового и административного центра Сибири.'
    },
    {
      id: 'yenisei-gubernia',
      title: 'Указ о создании Енисейской губернии',
      year: 1822,
      description: 'Официальный документ об образовании Енисейской губернии с центром в Красноярске. Указ определил административные границы, включив территории от Урала до Охотского моря, и установил новую систему управления регионом в соответствии с реформами Сперанского.',
      imageUrl: 'assets/images/history/documents/yenisei-gubernia-1822.jpg',
      content: 'Указ императора Александра I об образовании Енисейской губернии из состава Томской губернии. Определил административные границы и центр в городе Красноярске. Начало самостоятельной административной истории региона.\n\nГуберния включала территорию площадью более 2 млн км². Красноярск получил статус губернского города с правом иметь собственное управление, суд и администрацию. Это способствовало развитию торговли, ремесел и культуры.\n\nРеформа была частью общей административной реорганизации Российской империи и позволила более эффективно управлять огромными сибирскими территориями. Енисейская губерния просуществовала до 1934 года.'
    },
    {
      id: 'transsib-decree',
      title: 'Декрет о строительстве Транссиба',
      year: 1891,
      description: 'Указ императора Александра III о начале строительства Транссибирской железной дороги через Красноярск. Документ определил маршрут железной дороги, сметы расходов и сроки строительства. Это был один из самых амбициозных проектов Российской империи.',
      imageUrl: 'assets/images/history/documents/transsib-decree-1891.jpg',
      content: 'Высочайший рескрипт о сооружении Великого Сибирского пути. Открыло новую эру развития региона, связав его с центральной Россией.\n\nДекрет был подписан 17 марта 1891 года. Строительство Транссибирской магистрали началось одновременно с нескольких концов. Красноярск стал одним из ключевых узлов на маршруте. Железная дорога прошла через город в 1899 году.\n\nПостроение железной дороги привело к бурному развитию Красноярска: выросло население, развилась промышленность, появились новые торговые связи. Город превратился из провинциального острога в современный индустриальный центр. Общая длина Транссиба составила 9289 км.'
    },
    {
      id: 'stolby-reserve',
      title: 'Постановление о создании заповедника "Столбы"',
      year: 1925,
      description: 'Документ о создании первого в крае природного заповедника для охраны уникальных скальных образований. Постановление защитило 47 тысяч гектаров земли с редкими геологическими формациями и ценными лесными экосистемами от хозяйственной деятельности.',
      imageUrl: 'assets/images/history/documents/stolby-reserve-1925.jpg',
      content: 'Постановление о создании заповедника на Столбах. Начало природоохранной деятельности в регионе. Заповедник стал символом Красноярска.\n\nПостановление было издано 30 июня 1925 года. Заповедник "Столбы" стал первым в Сибири и одним из первых в России. Его целью была охрана уникальных сиенитовых скал высотой до 100 метров, которые являются геологическим памятником мирового значения.\n\nЗаповедник включал редкие виды растений и животных, характерные для сибирской тайги. Сегодня это один из самых посещаемых заповедников России, привлекающий туристов и скалолазов со всего мира. Площадь заповедника составляет 47,2 тысячи гектаров.'
    },
    {
      id: 'ges-project',
      title: 'Проект Красноярской ГЭС',
      year: 1955,
      description: 'Технический проект одной из крупнейших ГЭС в мире. Чертежи плотины, турбин и водохранилища. Проект включал детальные расчёты гидротехнических сооружений, схемы электроснабжения и планы развития промышленности на базе дешёвой электроэнергии.',
      imageUrl: 'assets/images/history/documents/krasnoyarsk-ges-project-1955.jpg',
      content: 'Строительство началось в 1955 году. Мощность станции - 6000 МВт. Плотина высотой 124 метра. Символ индустриальной мощи СССР и Сибири.\n\nКрасноярская ГЭС была одной из крупнейших гидроэлектростанций в мире. Строительство продолжалось 13 лет и было завершено в 1968 году. Плотина создала водохранилище площадью 2000 км², которое стало одним из крупнейших в мире.\n\nГЭС обеспечила дешёвой электроэнергией развитие алюминиевой промышленности, целлюлозно-бумажного производства и других энергоёмких производств. Это привело к превращению Красноярска в один из крупнейших индустриальных центров России. Станция вырабатывает около 40 млрд кВт·ч электроэнергии в год.'
    }
  ]
};

// Export for use in components
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HISTORY_DATA;
}
