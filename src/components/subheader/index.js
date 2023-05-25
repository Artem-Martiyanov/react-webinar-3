import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Subheader({children}) {
  const cn = bem('Subheader');
  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

Subheader.propTypes = {
  children: PropTypes.node
}

export default memo(Subheader);
