import * as React from "react";
import Auxiliary from "../../Components/HigherOrderComponents/Auxiliary";
import { Question } from "../../Models/Question";
import { Text, TEXT_TYPE } from "../../Components/Elements/Text";
import { TRANSLATION_KEY } from "../../Translations/TranslationUtils";
import { QuestionCard } from "../../Components/Elements/QuestionCard/QuestionCard";
import { SUBMISSION_BUTTON_TYPE, SubmissionButton } from "../../Components/Elements/Buttons/SubmissionButton";
import { useState } from "react";
import { VotingOptionsList } from "./VotingOptionsList";
import { VoteOption } from "../../Models/VoteOption";

type VotingPageProps = {
  question: Question;
}

export function VotingPage(props: VotingPageProps) {
  const [isSubmissionButtonEnabled, setIsSubmissionButtonEnabled] = useState(false);
  const [selectedVotingOption, setSelectedVotingOption] = useState( {} as VoteOption);

  const handleChangeOfSelectedVotingOption = (vote: VoteOption): void => {
    if(selectedVotingOption === vote) {
      setSelectedVotingOption({} as VoteOption);
      setIsSubmissionButtonEnabled(false);
    } else {
      setSelectedVotingOption(vote);
      setIsSubmissionButtonEnabled(true);
    }
  }

  const handleVoteSubmission = (): void => {
    console.log("SUBMITTING: ", selectedVotingOption);
  }

  return (
    <Auxiliary>
      <br/>
      <br/>
      <span className={"icon-text"}>
        <Text
          translationKey={TRANSLATION_KEY.voting_page_encryption_note}
          textType={TEXT_TYPE.PAGE_NOTE}
        />
        <span className={"icon is-small"}>
          <i className="fa-solid fa-lock"></i>
        </span>
      </span>
      <div className={`box; box-shadow:none`}>
        <QuestionCard question={props.question}/>
        <br/>
        <VotingOptionsList
          votingOptions={props.question.voteOptions}
          onChangeSelection={handleChangeOfSelectedVotingOption}
        />
      </div>

      <br/>
      <SubmissionButton
        onClick={handleVoteSubmission}
        type={SUBMISSION_BUTTON_TYPE.SUBMIT_VOTE}
        isEnabled={isSubmissionButtonEnabled}
      />
    </Auxiliary>
  );
}