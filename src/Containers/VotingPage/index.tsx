import * as React from "react";
import Auxiliary from "../../Components/HigherOrderComponents/Auxiliary";
import { Question } from "../../Models/Question";
import { Text, TEXT_TYPE } from "../../Components/Elements/Text";
import { TRANSLATION_KEY } from "../../Translations/TranslationUtils";
import { QuestionCard } from "./QuestionCard/QuestionCard";
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
    setSelectedVotingOption(vote);

  }

  return (
    <Auxiliary>
      <Text
        translationKey={TRANSLATION_KEY.voting_page_title}
        textType={TEXT_TYPE.page_title}
      />

      <div className={"box"}>
        <QuestionCard question={props.question}/>
        <VotingOptionsList
          votingOptions={props.question.voteOptions}
          onChangeSelection={handleChangeOfSelectedVotingOption}
        />
      </div>

      <SubmissionButton
        request={{} as JSON }
        type={SUBMISSION_BUTTON_TYPE.SUBMIT_VOTE}
        isEnabled={isSubmissionButtonEnabled}
      />
    </Auxiliary>
  );
}