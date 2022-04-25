import "./style.css";
import { Question } from "../../../Models/Question";

type QuestionCardProps = {
  question: Question,
}

export function QuestionCard(props: QuestionCardProps) {
  return (
    <div className={"card question-card is-centered"}>
      <span className={"text-question"}>
        <span className={"question-type"}> {props.question.questionType} </span>
        <span className={"question-entity"}> {props.question.entity} </span>
      </span>
    </div>
  );
}