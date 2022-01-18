import { Question } from "../../Models/Question";
import { Result } from "../../Models/Result";
import { Entity } from "../../Models/Entity";
import { Statistics } from "../../Models/Statistics";

class VotingService {

  public getInitialSearchPageResults(): Result[] {
    // HTTP call happens here, for now we use mocks
    let MOCK_RESULT1: Result = {
      question: {
        id: "ID1",
        entity: { } as Entity,
        question: "Question 1",
      } as Question,
      voters: 5000,
      statistics: { } as Statistics,
    }


    let MOCK_RESULT2: Result = {
      question: {
        id: "ID2",
        entity: { } as Entity,
        question: "Question 2",
      } as Question,
      voters: 4786,
      statistics: { } as Statistics,
    }

    return [MOCK_RESULT1, MOCK_RESULT2];
  };
};

export const votingService = new VotingService();