import React from 'react';
import { translationProvider } from '../Translations/TranslationProvider';
import { AppRouter } from '../AppRouter';
import { LANGUAGES } from "../Translations/TranslationUtils";

function App() {
  console.log("APP START")

  // need to have a state for the languages and update Messages accordingly
  translationProvider.setTranslations(LANGUAGES.EN);

  return (
    <AppRouter/>
  );
}

export default App;
