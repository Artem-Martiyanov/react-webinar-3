import useSelector from './use-selector';


export default function useTranslate() {
  const select = useSelector(state => ({
    language: state.language.language
  }))
  return (originalWord) => {
    const dictionary = {
      'ENG': {
        'магазин': 'Shop',
        'в корзине': 'Basket',
        'пусто': 'is empty',
        'сменить язык': 'Change language',
        'главная': 'Main',
        'итого': 'Total',
        'товар': 'product',
        'товара': 'products',
        'товаров': 'products',
        'закрыть': 'Close',
        'перейти': 'follow',
        'корзина': 'Basket',
        'добавить': 'Add',
        'удалить': 'Delete',
        'страна производитель': 'Manufacturer country',
        'категория': 'Category',
        'год выпуска': 'Year of issue',
        'цена': 'Price',
      },
      'DE': {
        'магазин': 'Geschäft',
        'в корзине': 'im Korb',
        'пусто': 'leer',
        'сменить язык': 'Sprache ändern',
        'главная': 'Hauptseite',
        'итого': 'Gesamt',
        'товар': 'produkt',
        'товара': 'waren',
        'товаров': 'waren',
        'закрыть': 'Schließen',
        'перейти': 'folge',
        'корзина': 'Einkaufswagen',
        'добавить': 'Hinzufügen',
        'удалить': 'Löschen',
        'шт': 'st',
        'страна производитель': 'Herstellungsland',
        'категория': 'Kategorie',
        'год выпуска': 'Baujahr',
        'цена': 'Preis',
      },
    }
    const translatedWord = dictionary?.[select.language]?.[originalWord.trim().toLowerCase()]
    return select.language ? translatedWord ?? originalWord : originalWord
  }
}
