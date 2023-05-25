import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {createPagination} from '../../utils';

function Pagination({totalPages, currentPage, onChange}) {
  const cn = bem('Pagination');
  const onClick = (event) => {
    onChange(event.target.innerText)
  }
  
  const pagination = createPagination(totalPages, currentPage, 1, 1)
  
  return (
    <div className={cn()}>
      {pagination && pagination.map(value => (typeof value === 'number')
        ?
        <button className={cn('item')} disabled={value === currentPage} onClick={onClick} key={value}>{value}</button>
        :
        value)}
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

Pagination.defaultProps = {
  totalPages: 1,
  currentPage: 1,
  onChange: () => {}
}


export default memo(Pagination);
