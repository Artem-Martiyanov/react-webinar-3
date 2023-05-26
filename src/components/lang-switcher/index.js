import {memo} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import useTranslate from '../../store/use-translate';


function LangSwitcher(props) {
  const cn = bem('LangSwitcher');
  
  const callbacks = {
    onChange: (e) => props.onSelect(e.target.value)
  }
  const translate = useTranslate()
  
  return (
    <div className={cn()}>
      <label className={cn('control')}>{translate('Сменить язык')}
        <select onChange={callbacks.onChange}>
          <option value="">Русский</option>
          <option value="ENG">English</option>
          <option value="DE">Deutsch</option>
        </select>
      </label>
    </div>
  )
}

LangSwitcher.propTypes = {
  onSelect: propTypes.func,
}

LangSwitcher.defaultProps = {
  onSelect: () => {
  },
}

export default memo(LangSwitcher);
