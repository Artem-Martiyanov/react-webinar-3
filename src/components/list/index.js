import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List(props) {
  console.log('list')
  return (
    <div className="List">{
      props.list.map(item =>
        <div key={item.code} className="List-item">
          <Item item={item} handlers={props.handlers}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
};

export default React.memo(List);
