/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Генератор пагинации
 * @description Возвращает массив с корректной пагинацией или false, если переданы некорректные данные
 * @param totalPages {Number} Количество страниц
 * @param currentPage {Number} Текущая страница
 * @param sideSize {Number} Сколько показывать кнопок (с одного края)
 * @param middleSize {Number} Сколько показывать кнопок между многоточиями (по одну сторону от текущей страницы)
 * @example createPagination(25, 5, 1, 1)   =>   | 1 ... 4 (5) 6 ... 25 |
 * @example createPagination(25, 10, 2, 3)   =>   | 1 2 ... 7 8 9 (10) 11 12 13 ... 24 25 |
 * @returns {Array | Boolean}
 */

export const createPagination = (totalPages, currentPage, sideSize, middleSize) => {
  // Проверяем на корректность данных
  if (totalPages <= 1 || currentPage <= 0 || currentPage > totalPages) {
    return false
  }
  
  // Проверяем, есть ли смысл считать
  if (sideSize * 2 + (middleSize * 2 + 1) >= totalPages) {
    let pagination = []
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(i)
    }
    return pagination
  }
  
  // Исключаем первую и последнюю страницы
  currentPage = currentPage === 1 ? 2 : currentPage
  currentPage = currentPage === totalPages ? totalPages - 1 : currentPage
  
  // Создаем центральный интервал
  let middleInterval = []
  for (let i = currentPage - middleSize; i <= currentPage + middleSize; i++) {
    if (i > sideSize && i < totalPages - sideSize + 1) {
      middleInterval.push(i)
    }
  }
  
  // Создаем левый интервал
  let leftInterval = []
  for (let i = 1; i <= sideSize; i++) {
    leftInterval.push(i)
  }
  
  // Создаем правый интервал
  let rightInterval = []
  for (let i = totalPages - sideSize + 1; i <= totalPages; i++) {
    rightInterval.push(i)
  }
  
  // Проверяем на близость к левому интервалу
  if (currentPage > sideSize + middleSize * 2) {
    leftInterval.push('...')
  }
  
  // Проверяем на близость к правому интервалу
  if (currentPage <= totalPages - sideSize - middleSize * 2) {
    rightInterval.unshift('...')
  }
  
  return [...leftInterval, ...middleInterval, ...rightInterval]
}