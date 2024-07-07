import { QuestionsProps } from "../types/types";
import Options from "./Options";

type Props = {
  question: QuestionsProps;
  dispatch: () => void;
  answer: null;
};

export default function Questions({ question, dispatch, answer }: Props) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} onclick={dispatch} answer={answer} />
    </div>
  );
}
