/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }
  
  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
  
  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }
  
  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) {
      listener();
    }
  }
  
  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };
  
  
  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  deleteItemFromCart(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };
  
  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }
  
  /**
   * Добавление в корзину по коду
   * @param code
   */
  addToCart(code) {
    const currentItemIndex = this.state.cart.findIndex(item => item.code === code)
    // Копируем старую корзину
    const newCart = [...this.state.cart]
    
    // Если в корзине есть итем с входным кодом, то итерируем его количество
    currentItemIndex >= 0 ?
      newCart[currentItemIndex].count++
      :
      //Если в корзине такого итема нет, то добавляем его в новую корзину и модифицируем
      newCart.push({
        ...this.state.list.find(item => item.code === code),
        count: 1,
        canDelete: true
      })
    // Меняем старую корзину на новую
    this.setState({
      ...this.state,
      cart: newCart
    })
  }
}

export default Store;
