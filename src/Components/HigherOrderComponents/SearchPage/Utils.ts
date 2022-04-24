import { TRANSLATION_KEY } from "../../../Translations/TranslationUtils";

export enum SEARCH_PAGE_TARGET {
  ENTITIES,
  ENTITY_CATEGORIES,
  VOTE_RESULTS,
}

export const searchPageTargetToTranslationKey = new Map<SEARCH_PAGE_TARGET, TRANSLATION_KEY>([
  [SEARCH_PAGE_TARGET.ENTITIES, TRANSLATION_KEY.create_question_choose_entity],
  [SEARCH_PAGE_TARGET.ENTITY_CATEGORIES, TRANSLATION_KEY.create_question_choose_entity_category],
  [SEARCH_PAGE_TARGET.VOTE_RESULTS, TRANSLATION_KEY.results_search_page_title],
]);