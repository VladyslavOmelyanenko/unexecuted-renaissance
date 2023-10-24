import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import './index.css';
import App from './App';


i18n.use(initReactI18next).init({
  resources: {
    eng: {
      translation: require("./locales/eng/translation.json"),
    },
    ukr: {
      translation: require("./locales/ukr/translation.json"),
    },
  },
  lng: "eng", // Set the default language
  fallbackLng: "eng", // Fallback to English if translation is missing
  interpolation: {
    escapeValue: false,
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <App />
    </BrowserRouter>

);

