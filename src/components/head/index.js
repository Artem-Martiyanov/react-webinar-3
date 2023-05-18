import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({title, children}) {
  return (
    <header className="Head">
      <h1 className={'Head-title'}>{title}</h1>
      {children}
    </header>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node
};

export default React.memo(Head);
