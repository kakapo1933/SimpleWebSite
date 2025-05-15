// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      donationPage: 'Donation Page',
    },
  },
  zh_tw: {
    translation: {
      donationPage: '所有捐款項目',
    },
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: 'zh_tw',            // Default language
    fallbackLng: 'zh_tw',    // Fallback language
    interpolation: {
      escapeValue: false, // React already does escape
    },
  });

export default i18n;
