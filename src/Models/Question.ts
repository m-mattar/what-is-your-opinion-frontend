import { VoteOption } from "./VoteOption";

export type Question = {
  id: string | undefined,
  entity: string,
  questionType: string,
  voteOptions: VoteOption[],
};