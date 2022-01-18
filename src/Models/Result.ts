import { Question } from "./Question";
import { Statistics } from "./Statistics";

export type Result = {
  question: Question,
  voters: number,
  statistics: Statistics,
};
