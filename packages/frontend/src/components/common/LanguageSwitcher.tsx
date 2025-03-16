// LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
  };

  return (<div>
    <button className='border-green-700 bg-gradient-to-r from-green-600 to-teal-400 border-2 border-r-0 rounded-l-full p-2 cursor-pointer transition-transform duration-150 ease-in-out active:scale-95
'
            onClick={() => changeLanguage('en')}>English
    </button>
    <button
      className='border-green-700 bg-gradient-to-l from-green-600 to-teal-400 border-2 border-l-0 rounded-r-full p-2 cursor-pointer transition-transform duration-150 ease-in-out active:scale-95'
      onClick={() => changeLanguage('zh_tw')}>繁體中文
    </button>
  </div>);
};

export default LanguageSwitcher;