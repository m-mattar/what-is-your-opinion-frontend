import * as React from "react";
import Auxiliary from "../../Components/HigherOrderComponents/Auxiliary";
import { Question } from "../../Models/Question";
import { TRANSLATION_KEY } from "../../Translations/TranslationUtils";
import { QuestionCard } from "../../Components/Elements/QuestionCard/QuestionCard";
import { useState } from "react";
import { VotingOptionsList } from "./VotingOptionsList";
import { VoteOption } from "../../Models/VoteOption";
import { Button } from "../../Components/Elements/Button";
import { translationProvider } from "../../Translations/TranslationProvider";
import "./style.css"
import { EncryptionNote } from "../../Components/Elements/EncryptionNote";
import { votingService } from "../../Services/VotingService";
import { localStorageUtils } from "../../Utils/localStorageUtils";
import { redirectionProvider } from "../../Utils/RouterUtils";
import { Dropdown } from "../../Components/Elements/Dropdown";

type VotingPageProps = {
  question: Question;
  pollId: string;
  oneTimeCode: string;
}

let locations: string[] = [" ", "بيروت","البقاع","جبل لبنان","النبطية","الشمال","الجنوب"]

export function VotingPage(props: VotingPageProps) {
  const [isSubmissionButtonEnabled, setIsSubmissionButtonEnabled] = useState(false);
  const [selectedVotingOption, setSelectedVotingOption] = useState( {} as VoteOption);
  const [selectedLocation, setSelectedLocation] = useState("" as string);

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
    votingService.collect(props.pollId, props.oneTimeCode, selectedLocation).then((key) => {
      localStorageUtils.setPair(props.question.id, key);
    });
    redirectionProvider.redirectToCollectPhaseComplete();
  }

  return (
    <Auxiliary>
      <br/><br/>
      <EncryptionNote/>
      <div className={`box; box-shadow:none`}>
        <QuestionCard question={props.question}/>
        <br/>
        <VotingOptionsList
          votingOptions={props.question.voteOptions}
          onChangeSelection={handleChangeOfSelectedVotingOption}
        />
        <Dropdown
         items={locations}
         translationKey={TRANSLATION_KEY.select_location_button}
         onSelect={(location: string) => setSelectedLocation(location)}/>
      </div>
      <br/>
      <Button
        _id={"submit-vote-button"}
        classname={"button button-color is-white is-medium is-responsive is-rounded"}
        onClick={handleVoteSubmission}
        isEnabled={isSubmissionButtonEnabled}
        title={translationProvider.getTranslation(TRANSLATION_KEY.voting_page_submit_vote_button)}/>
    </Auxiliary>
  );
}