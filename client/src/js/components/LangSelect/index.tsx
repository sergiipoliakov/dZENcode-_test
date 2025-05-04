import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

// Types
import { I18N } from '../../middlewares/i18n/types';

// Components
import { Select } from '../../common/components'

const LangSelect = () => {
  const {
    languages
  } = useSelector((state: any) => state.i18n as I18N);
  const [cookies, setCookie] = useCookies(['language']);

  const onChangeLanguageHandler = (lang: string) => {
    setCookie('language', lang, { path: '/' });
  };
  return (
    <div>
      <Select
        value={cookies.language}
        onChange={onChangeLanguageHandler}
        options={languages?.map((lang: string) => ({ value: lang, text: lang }))}
      />
    </div>
  )
}

export default LangSelect