import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from '../../utils';
import './style.css';
import useTranslate from '../../store/use-translate';

function BasketTool({sum, amount, onOpen}) {
  const translate = useTranslate()
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate('В корзине')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${translate(plural(amount, {one: 'товар', few: 'товара', many: 'товаров'}))} / ${numberFormat(sum)} ₽`
          : `${translate('пусто')}`
        }
      </span>
      <button onClick={onOpen}>{translate('Перейти')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
