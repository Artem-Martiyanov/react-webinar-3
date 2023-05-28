import {memo, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useTranslate from '../../store/use-translate';

function ModalLayout(props) {
  
  const cn = bem('ModalLayout');
  const translate = useTranslate()
  // Корректировка центра, если модалка больше окна браузера.
  const layout = useRef();
  const frame = useRef();
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (layout.current) {
        // Центрирование frame или его прижатие к краю, если размеры больше чем у layout
        layout.current.style.alignItems = (layout.current.clientHeight < frame.current.clientHeight)
          ? 'flex-start'
          : 'center';
        layout.current.style.justifyContent = (layout.current.clientWidth < frame.current.clientWidth)
          ? 'flex-start'
          : 'center';
      }
    });
    
    // Следим за изменениями размеров layout
    resizeObserver.observe(layout.current);
    return () => {
      resizeObserver.disconnect();
    }
  }, []);
  
  return (
    <div className={cn()} ref={layout} onClick={props.onClose}>
      <div className={cn('frame')} ref={frame} onClick={(event) => event.stopPropagation()}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>{translate(props.title)}</h1>
          <button className={cn('close')} onClick={props.onClose}>{translate('Закрыть')}</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

ModalLayout.defaultProps = {
  title: 'Модалка',
  onClose: () => {
  }
};

export default memo(ModalLayout);
