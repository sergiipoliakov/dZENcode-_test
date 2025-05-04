import React, { JSX, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

// Api
import { fetchTranslations, fetchLanguages } from '../../http/i18n'


// Actions
import * as actions from './actions';

// Types
import { I18N } from './types';

const withTranslation = (WrapperComponent: React.FC): React.FC => {
    return (): JSX.Element | null => {
        const { translation } = useSelector((state: any) => state.i18n as I18N);
        const [cookies] = useCookies(['language']);
        const dispatch = useDispatch();
        
        const getTranslations =  async () => {
          const translations = await fetchTranslations();
          dispatch(actions.setTranslations(translations));
        }
        const getLanguages =  async () => {
          const languages = await fetchLanguages();
          dispatch(actions.setLanguages(languages));
        }
        useEffect(() => {
          getLanguages();
      }, []);

        useEffect(() => {
            getTranslations();
        }, [cookies.language]);

        if (translation) return <WrapperComponent />;
        return null;
    };
};

export default withTranslation;
