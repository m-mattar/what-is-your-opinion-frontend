export const RAW_ROUTES = {
  RESULT_SEARCH: "/",
  RESULT_DISPLAY: "/result",
  QUESTION_VOTE: "/vote",
  QUESTION_CREATE: "/create",
  COLLECT_PHASE: "/collect",
  VOTE_PHASE: "/enc",
  DECRYPT_PHASE: "/dec",
};

export enum ENCRYPTION_PHASE {
  PHASE_0 = "collect",
  PHASE_1 = "vote",
  PHASE_2 = "decrypt",
}