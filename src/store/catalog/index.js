import StoreModule from '../module';

class Catalog extends StoreModule {
  
  constructor(store, name) {
    super(store, name);
  }
  
  initState() {
    return {
      currentPage: 1,
      list: [],
      pagesCount: 0,
    }
  }
  
  setPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    }, 'Изменена страница с товарами');
    this.load()
  }
  
  async load() {
    const currentPage = this.getState().currentPage
    const limit = 10
    const skip = (currentPage - 1) * limit
    
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    const pagesCount = Math.ceil(json.result.count / limit)
    this.setState({
      ...this.getState(),
      list: json.result.items,
      pagesCount: pagesCount
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
