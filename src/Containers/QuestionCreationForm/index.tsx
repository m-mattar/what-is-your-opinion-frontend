import Auxiliary from "../../Components/HigherOrderComponents/Auxiliary";
import { Text, TEXT_TYPE } from "../../Components/Elements/Text";
import { TRANSLATION_KEY } from "../../Translations/TranslationUtils";
import { SearchPage } from "../../Components/HigherOrderComponents/SearchPage";
import { SEARCH_PAGE_TARGET } from "../../Components/HigherOrderComponents/SearchPage/Utils";

export function QuestionCreationForm() {
  return (
    <Auxiliary>
      <Text
        translationKey={TRANSLATION_KEY.create_question_page_title}
        textType={TEXT_TYPE.page_title}
      />

      <SearchPage
        searchPageTarget={SEARCH_PAGE_TARGET.ENTITIES}
        initialResults={[]}
      />
    </Auxiliary>
  );
}