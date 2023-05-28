import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      info: {}
    }
  }
  
  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      info: json.result
    }, 'Загружена информация о товаре');
  }
  clear() {
    this.setState({
      ...this.getState(),
      info: null
    }, 'Товар очищен');
  }
}

export default Product;
