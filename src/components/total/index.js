import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {plural} from '../../utils';

function Total({sum, countOfItems}) {
  return (
    <div className="Total">
      {countOfItems ?
        `${countOfItems}
        ${plural(countOfItems, {one: 'товар', few: 'товара', many: 'товаров'})}` : ''}
      {(countOfItems && sum) ? ' / ' : ''}
      {sum > 0 && `${sum} ₽`}
      {(!countOfItems && !sum) && 'пусто'}
    </div>
  )
}

Total.propTypes = {
  sum: PropTypes.number,
  countOfItems: PropTypes.number
};

export default React.memo(Total);
