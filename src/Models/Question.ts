import { VoteOption } from "./VoteOption";

export type Question = {
  id: string,
  entity: string,
  questionType: string,
  voteOptions: VoteOption[],
};