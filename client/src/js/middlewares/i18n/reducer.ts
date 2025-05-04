import { ReduxState, I18N } from './types';
import { SET_TRANSLATION, GET_LANGUAGES } from './constants';

const initialState = {
    translation: null,
    languages: null
};

export default function i18n(state = initialState as I18N, action: ReduxState): I18N {
    switch (action.type) {
        case SET_TRANSLATION:

            return {
                ...state,
                translation: action.payload
            };
          case GET_LANGUAGES:
              return {
                  ...state,
                  languages: action?.payload
              };
        default:
            return state;
    }
}
