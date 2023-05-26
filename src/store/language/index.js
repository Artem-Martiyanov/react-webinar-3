import StoreModule from '../module';


class Language extends StoreModule {
  
  constructor(store, name) {
    super(store, name);
  }
  
  initState() {
    return {
      language: null
    }
  }
  
  setLanguage(language) {
    this.setState({language: language === '' ? null : language}, `Установлен язык ${language ?? 'RU'}`);
  }
  
}

export default Language;
