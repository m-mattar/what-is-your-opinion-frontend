import { Question } from "../../Models/Question";
import { VoteOption } from "../../Models/VoteOption";

class VotingService {
  public getQuestionById(questionId: string): Question {
    let Mock_Question = {
      id: questionId,
      questionType: "What's your opinion on...",
      voteOptions: [
        {id: "1", option: "With"},
        {id: "2", option: "Against"}
      ] as VoteOption[],
      entity: "The American University of Beirut",
    } as Question;

    return Mock_Question;
  };
};

export const votingService = new VotingService();