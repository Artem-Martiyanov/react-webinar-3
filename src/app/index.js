import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import {Routes, Route, useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import Product from './product';
import useStore from '../store/use-store';


/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  let activeModal = useSelector(state => state.modals.name);
  const store = useStore();
  const location = useLocation()
  
  useEffect(() => {
    store.actions.modals.close()
  }, [location]);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/product/:id" element={<Product/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
