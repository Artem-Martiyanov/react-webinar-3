import {memo, useEffect} from 'react';import PropTypes from 'prop-types';import {cn as bem} from '@bem-react/classname';import './style.css';import {useParams} from 'react-router-dom';import useStore from '../../store/use-store';import useSelector from '../../store/use-selector';import useTranslate from '../../store/use-translate';function Product(props) {  const {id} = useParams()  const store = useStore();  const translate = useTranslate()  const select = useSelector(state => ({    product: state.catalog.product,  }));    useEffect(() => {    store.actions.catalog.loadProduct(id);    return () => store.actions.catalog.deleteProduct()  }, []);    const callbacks = {    onAdd: (e) => props.onAdd(id)  };    const cn = bem('Product');  return (        <div className={cn()}>      {!select?.product ? translate('Загрузка') + '...' :        <>          <p className={cn('description')}>            {select?.product?.description}          </p>          <p className={cn('description')}>            {translate('Страна производитель')}: <span className={cn('parameter')}>{select?.product?.madeIn?.title}</span>          </p>          <p className={cn('description')}>            {translate('Категория')}: <span className={cn('parameter')}>{select?.product?.category?.title}</span>          </p>          <p className={cn('description')}>            {translate('Год выпуска')}: <span className={cn('parameter')}>{select?.product?.edition}</span>          </p>          <p className={cn('price')}>{translate('Цена')}: {select?.product?.price} ₽</p>          <button onClick={callbacks.onAdd}>{translate('Добавить')}</button>        </>      }    </div>    );}export default memo(Product);