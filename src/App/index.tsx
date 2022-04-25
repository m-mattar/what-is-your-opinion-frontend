import React from 'react';
import "bulma/css/bulma.min.css";
import { translationProvider } from '../Translations/TranslationProvider';
import { AppRouter } from '../AppRouter';
import { LANGUAGES, TRANSLATION_KEY } from "../Translations/TranslationUtils";
import { Text, TEXT_TYPE } from "../Components/Elements/Text";
import "./style.css"

function App() {
  console.log("APP START")

  // need to have a state for the languages and update Messages accordingly
  translationProvider.setTranslations(LANGUAGES.EN);

  return (
    <section className={"App container is-fullheight"}>
      <div className={"hero-body"}>
        <div className={"column is-half is-offset-2"}>
          <br/>
          <Text
            translationKey={TRANSLATION_KEY.app_title}
            textType={TEXT_TYPE.APP_TITLE}
          />
          <AppRouter/>
        </div>
      </div>
    </section>
  );
}

export default App;
