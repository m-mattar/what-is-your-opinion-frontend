import React from 'react';
import "bulma/css/bulma.min.css";
import { translationProvider } from '../Translations/TranslationProvider';
import { AppRouter } from '../AppRouter';
import { LANGUAGES, TRANSLATION_KEY } from "../Translations/TranslationUtils";
import { Text, TEXT_TYPE } from "../Components/Elements/Text";

function App() {
  console.log("APP START")

  // need to have a state for the languages and update Messages accordingly
  translationProvider.setTranslations(LANGUAGES.AR);

  return (
    <section className={"container is-fullheight"}>
      <div className={"hero-body"}>
        <div className={"column is-half is-offset-2"}>
          <Text
            translationKey={TRANSLATION_KEY.app_title}
            textType={TEXT_TYPE.app_title}
          />
          <AppRouter/>
        </div>
      </div>
    </section>
  );
}

export default App;
