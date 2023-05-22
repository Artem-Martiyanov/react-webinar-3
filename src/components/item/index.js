import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';


function Item(props) {
  const cn = bem('Item');
  
  const callbacks = {
    onAdd: () => {
      props.handler(props.item.code)
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.handler(props.item.code);
    }
  }
  
  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      {props.item.price !== null &&
        <span className={cn('price')}>{`${props.item.price.toLocaleString('ru-RU')} ₽`}</span>}
      {props.item.count &&
        <span className={cn('count')}>{`${props.item.count} шт`}</span>}
      <div className={cn('actions')}>
        {props.item.canDelete ?
          <button onClick={callbacks.onDelete}>Удалить</button>
          :
          <button onClick={callbacks.onAdd}>Добавить</button>
        }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  functions: PropTypes.objectOf(PropTypes.func),
};

export default React.memo(Item);
