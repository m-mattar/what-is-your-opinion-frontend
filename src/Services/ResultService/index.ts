import { VoteResult } from "../../Models/VoteResult/VoteResult";
import axios from "axios";

const BASE_URL = "http://what-is-your-opinion.herokuapp.com";

class ResultService {
  private doGetSearchPageResults = async(urlParams: string) => {
    let resultList = await axios.get<VoteResult[]>(BASE_URL + urlParams)
      .then((response) => {
        return response.data.map(result => {
          return new VoteResult(
            result._id,
            result.entity,
            result.result,
            Math.round(result.result[0] * 100/(result.result[0] + result.result[1]))
          );
        }, [] as VoteResult[]);
      })
      .catch((error) => {
        return [] as VoteResult[];
      })

    return resultList;
  }

  private getMocks(): VoteResult[] {

    let MOCK_RESULT1 = new VoteResult (
      "ID1", "USJ", [0, 0],75,
    )

    let MOCK_RESULT2 = new VoteResult(
      "ID2", "LAU", [0, 0], 65
    )

    let MOCK_RESULT3 = new VoteResult (
      "ID3","AUB",[0, 0],90,
    )

    return [MOCK_RESULT1, MOCK_RESULT2, MOCK_RESULT3];
  }

  public getInitialVoteResults(): VoteResult[] {
    //REMOVE THIS WHEN CONNECTING
    return this.getMocks();

    let resultList: VoteResult[] = [];
    this.doGetSearchPageResults("/poll/finished")
      .then((data) => {
        return data.map((voteResult) => {
          resultList.push(voteResult as VoteResult);
          return voteResult as VoteResult;
        }, [] as VoteResult[])
      })

    return resultList;
  };
}

export const resultService = new ResultService();