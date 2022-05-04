export const RAW_ROUTES = {
  COLLECT_PHASE: "/collect",
  DECRYPT_PHASE: "/dec",
  ENTITY_CREATE: "/create_entity",
  ENTITY_SEARCH: "/create_question/choose_entity",
  QUESTION_CREATE: "/create_question",
  QUESTION_VOTE: "/vote",
  VOTE_RESULT_DISPLAY: "/result",
  VOTE_RESULT_SEARCH: "/",
  VOTE_PHASE: "/enc",
};

export enum ENCRYPTION_PHASE {
  PHASE_0 = "collect",
  PHASE_1 = "vote",
  PHASE_2 = "decrypt",
}