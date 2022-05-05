import React from 'react';
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { VoteResultSearchPage } from "./index";
import { Button } from "../../Components/Elements/Button";
import { resultService } from "../../Services/ResultService";
import { VoteResult } from "../../Models/VoteResult/VoteResult";
import { SearchPage } from "../../Components/HigherOrderComponents/SearchPage";

configure({adapter: new Adapter()});

let MOCK_RESULT1 = new VoteResult (
  "ID1", "ENTITY1", [0, 0],75,
)

let MOCK_RESULT2 = new VoteResult(
  "ID2", "ENTITY2", [0, 0], 65
)

let MOCK_RESULT3 = new VoteResult (
  "ID3","ENTITY3",[0, 0],52,
)

const MOCK_VOTE_RESULTS = [MOCK_RESULT1, MOCK_RESULT2, MOCK_RESULT3];

describe("VoteResultSearchPage", () => {
  beforeAll(() => {
    resultService.getInitialVoteResults = jest.fn().mockReturnValue(MOCK_VOTE_RESULTS);
  });

  describe("when component mounts", () => {
    let component = shallow(<VoteResultSearchPage/>);

    test("renders navigate to question creation button", () => {
      expect(component.find(Button)).toHaveLength(1);
    });

    test("renders search page with VoteResult target", () => {
      // expect(component.find(SearchPage)).toBeInTheDocument();
      expect(component.find(SearchPage)).toHaveLength(1);
    });
  });

  describe("when question creation button is clicked", () => {
    beforeAll(() => {
      Object.defineProperty(window, "location", {
        value: {
          assign: jest.fn(),
        }
      });
    })

    test("redirects to question creation form", () => {
      let component = shallow(<VoteResultSearchPage/>);
      component.find(Button).simulate("click");
      expect(window.location.assign).toHaveBeenCalledWith("/create_question");
    });
  });
});