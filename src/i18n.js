import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Enter a task": "Enter a task",
      "Add task": "Add task",
      "Show all": "Show all",
      "Show selected day only": "Show selected day only",
      "Delete": "Delete",
      "Edit": "Edit",
      "Save": "Save",
      // Weekdays
      "Mon": "Mon",
      "Tue": "Tue",
      "Wed": "Wed",
      "Thu": "Thu",
      "Fri": "Fri",
      "Sat": "Sat",
      "Sun": "Sun"
    }
  },
  lt: {
    translation: {
      "Enter a task": "Įvesk užduotį",
      "Add task": "Pridėti užduotį",
      "Show all": "Rodyti visas",
      "Show selected day only": "Rodyti tik pasirinktą dieną",
      "Delete": "Ištrinti",
      "Edit": "Redaguoti",
      "Save": "Išsaugoti",
      // Weekdays
      "Mon": "Pr",
      "Tue": "An",
      "Wed": "Tr",
      "Thu": "Kt",
      "Fri": "Pn",
      "Sat": "Št",
      "Sun": "Sk"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  }
});

export default i18n;