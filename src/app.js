import React, {useCallback, useMemo, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Total from './components/total';
import {calculateSumOfPrice} from './utils'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  
  const [modalVisibility, setModalVisibility] = useState(false)
  const list = store.getState().list;
  const cart = store.getState().cart
  
  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),
    
    onDeleteItemFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, [store]),
    
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),
    
    onModalToggle: useCallback(() => {
      setModalVisibility(prev => !prev)
    }, []),
  }
  
  
  return (
    <PageLayout>
      <Head title="Магазин"/>
      <div className="PageLayout-subHeader">
        <p>В корзине:</p>
        <Total sum={calculateSumOfPrice(cart)} countOfItems={cart.length}/>
        <Controls onOpen={callbacks.onModalToggle}/>
      </div>
      <List list={list} handlers={{
        onAddItem: callbacks.onAddToCart,
      }}
      />
      <Modal isVisible={modalVisibility} onClose={callbacks.onModalToggle}>
        <Head title={'Корзина'}>
          <button onClick={callbacks.onModalToggle}>Закрыть</button>
        </Head>
        <div className="Modal-content">
          {!cart.length > 0 ?
            <h2 className="Modal-empty">Пока пусто :(</h2>
            :
            <>
              <List list={cart} handlers={{
                onDeleteItem: callbacks.onDeleteItemFromCart,
              }}
              />
              <div className="Modal-total">
                <div className="Modal-amount">Итого</div>
                <Total sum={calculateSumOfPrice(cart)}/>
              </div>
            </>
          }
        </div>
      </Modal>
    </PageLayout>
  );
}

export default App;
