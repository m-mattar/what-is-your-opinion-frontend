import "./style.css";
import { Question } from "../../../Models/Question";

type QuestionCardProps = {
  question: Question,
}

export function QuestionCard(props: QuestionCardProps) {
  return (
    <div className={""}>
      <div>
        <p> {props.question.questionType} </p>
        <p> {props.question.entity} </p>
      </div>
    </div>
  );
}