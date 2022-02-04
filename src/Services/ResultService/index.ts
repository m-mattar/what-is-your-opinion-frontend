import { Result } from "../../Models/Result";
import axios from "axios";

class ResultService {
  private doGetSearchPageResults = async(parameters: string) => {
     axios.get<Result[]>(parameters)
        .then((response) => {
            return response.data.map(result => {
                return {...result} as Result;
            });
        })
        .catch((error) => {
            return [] as Result[];
        })
  }

  public getInitialSearchPageResults(): Result[] {
    // let resultList = this.doGetSearchPageResults("");

    // map resultList to Result[],
    // for now we use mocks

    let MOCK_RESULT1: Result = {
      id: "ID1",
      entity: "USJ",
      positivePercentage: 75,
    }

    let MOCK_RESULT2: Result = {
      id: "ID2",
      entity: "LAU",
      positivePercentage: 65,
    }

      let MOCK_RESULT3: Result = {
          id: "ID3",
          entity: "AUB",
          positivePercentage: 90,
      }

    return [MOCK_RESULT1, MOCK_RESULT2, MOCK_RESULT3];
  };
};

export const resultService = new ResultService();