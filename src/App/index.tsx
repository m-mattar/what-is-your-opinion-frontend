import React from 'react';
import { translationProvider } from '../Translations/TranslationProvider';
import { PlatformRouter } from '../Routes/PlatformRouter';
import { LANGUAGES } from "../Translations/TranslationUtils";

function App() {
  console.log("APP START")

  // need to have a state for the languages and update Messages accordingly
  translationProvider.setTranslations(LANGUAGES.EN);

  return (
      <PlatformRouter/>
  );
}

export default App;
