import Auxiliary from "../../Components/HigherOrderComponents/Auxiliary";
import { Text, TEXT_TYPE } from "../../Components/Elements/Text";
import { TRANSLATION_KEY } from "../../Translations/TranslationUtils";
import { SearchPage } from "../../Components/HigherOrderComponents/SearchPage";
import { SEARCH_PAGE_TARGET } from "../../Components/HigherOrderComponents/SearchPage/Utils";
import { EntityCategory } from "../../Models/EntityCategory/EntityCategory";
import { entityService } from "../../Services/EntityService";
import * as React from "react";
import { DISPLAY_TYPE } from "../../Components/HigherOrderComponents/SearchPage/Searchable";
import { translationProvider } from "../../Translations/TranslationProvider";
import { Button } from "../../Components/Elements/Button";

export function QuestionCreationForm() {
  const fetchInitialData = () => {
    let initialResults: EntityCategory[] = entityService.getEntityCategories();
    return initialResults;
  }

  const redirectToEntityCreationForm = () => {
    console.log("REDIRECTING")
  }

  return (
    <Auxiliary>
      <br/><br/>
      <Text
        translationKey={TRANSLATION_KEY.create_question_page_title}
        textType={TEXT_TYPE.PAGE_TITLE}
      />
      <br/><br/>
      <Button
        _id={"go-to-create-entity-button"}
        classname={`button is-normal is-centered is-black is-responsive is-rounded`}
        onClick={redirectToEntityCreationForm}
        isEnabled={true}
        title={translationProvider.getTranslation(TRANSLATION_KEY.create_entity)}
      />
      <br/><br/>
      <SearchPage
        searchPageTarget={SEARCH_PAGE_TARGET.ENTITY_CATEGORIES}
        initialResults={fetchInitialData}
        displayType={DISPLAY_TYPE.DOUBLE_COLUMNS}
      />
    </Auxiliary>
  );
}