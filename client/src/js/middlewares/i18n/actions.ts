import { SET_TRANSLATION, GET_LANGUAGES } from './constants';
import { TranslationI18N } from './types';

export function setTranslations(translations: TranslationI18N): any {
    return (dispatch: any) => {
        dispatch({
            type: SET_TRANSLATION,
            payload: translations
        });
    };
}
export function setLanguages(languages: string[]): any {
  return (dispatch: any) => {
      dispatch({
          type: GET_LANGUAGES,
          payload: languages
      });
  };
}