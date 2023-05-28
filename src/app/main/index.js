import {memo, useCallback, useEffect} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import Navigation from '../../components/navigation';

import {Routes, Route, useLocation} from 'react-router-dom';
import Subheader from '../../components/subheader';
import Product from '../product';
import LangSwitcher from '../../components/lang-switcher';
import useTranslate from '../../store/use-translate';


function Main() {
  const store = useStore();
  const location = useLocation()
  
  useEffect(() => {
    store.actions.modals.close()
  }, [location]);
  
  useEffect(() => {
    store.actions.catalog.load();
  }, []);
  
  const select = useSelector(state => ({
    product: state.catalog.product,
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    pagesCount: state.catalog.pagesCount,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  
  const translate = useTranslate()
  
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение страницы списка товаров
    changePage: useCallback(page => store.actions.catalog.setPage(+page), [store]),
    // Изменение языка
    changeLang: useCallback(lang => {
      store.actions.language.setLanguage(lang)
    }, [store])
  }
  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} path={'product/'}/>
    }, [callbacks.addToBasket]),
  };
  
  return (
    <PageLayout>
      <Head title={select.product ? select.product.title : translate('Магазин')}>
        <LangSwitcher onSelect={callbacks.changeLang}/>
      </Head>
      <Subheader>
        <Navigation/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </Subheader>
      <Routes>
        <Route path="/" element={<>
          <List list={select.list} renderItem={renders.item}/>
          <Pagination totalPages={select.pagesCount} currentPage={select.currentPage} onChange={callbacks.changePage}/>
        </>}
        />
        <Route path="/product/:id" element={<Product onAdd={callbacks.addToBasket}/>}/>
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
