import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({isVisible = false, children, onClose}) {
  console.log('modal')
  return !isVisible ? null : (
    <div className={'Modal'} onClick={onClose}>
      <div className={'Modal-inner'} onClick={event => event.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func
};

Modal.defaultProps = {
  onClose: () => {
  }
}

export default React.memo(Modal);
