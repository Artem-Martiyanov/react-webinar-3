import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {Link} from 'react-router-dom';

function Navigation() {
  const cn = bem('Navigation');
  return (
    <nav className={cn()}>
    <Link className={cn('link')} to="/">Главная</Link>
    </nav>
  );
}

export default memo(Navigation);
