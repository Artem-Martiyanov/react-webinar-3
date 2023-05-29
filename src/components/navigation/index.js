import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {NavLink} from 'react-router-dom';
import useTranslate from '../../store/use-translate';

function Navigation() {
  const translate = useTranslate()
  const cn = bem('Navigation');
  return (
    <nav className={cn()}>
    <NavLink className={cn('link')} to="/">{translate('Главная')}</NavLink>
    </nav>
  );
}

export default memo(Navigation);
