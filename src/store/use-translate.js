import useStore from './use-store';
import {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import shallowequal from 'shallowequal';
import {translate} from '../utils';
import useSelector from './use-selector';

/**
 * Хук для перевода теста
 * @param initValue {string|null}
 * @return {*}
 */
export default function useTranslate(initLang = null) {
  const store = useStore();
  const [language, setLanguage] = useState(initLang);
  useEffect(() => {
    store.setState({
      ...store.getState(),
      language: language,
    }, `Установлен язык ${language ?? 'RU'}`)
  }, [language]);
  const select = useSelector(state => ({
    lang: state.language
  }))
  const translateFunction = (text) => {
    return translate(text, select.lang)
  }
  return [translateFunction, setLanguage];
}
