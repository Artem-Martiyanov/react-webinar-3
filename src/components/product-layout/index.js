import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Determination from '../determinaton';
import useTranslate from '../../store/use-translate';
import {numberFormat} from '../../utils';

function ProductLayout(props) {
  const translate = useTranslate()
  const cn = bem('ProductLayout');
  
  const callbacks = {
    onAdd: () => props.onAdd(props.data._id)
  }
  
  return (
    <div className={cn()}>
      <p className={cn('description')}>{props?.data?.description}</p>
      <Determination title={translate('Страна производитель')} description={props?.data?.madeIn?.title}/>
      <Determination title={translate('Категория')} description={props?.data?.category?.title}/>
      <Determination title={translate('Год выпуска')} description={props?.data?.edition}/>
      <p className={cn('price')}>{translate('Цена')}: {numberFormat(props?.data?.price)} ₽</p>
      <button onClick={callbacks.onAdd}>{translate('Добавить')}</button>
    </div>
  );
}

ProductLayout.propTypes = {
  props: PropTypes.node
}

export default memo(ProductLayout);
