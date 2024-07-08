import { QuestionsProps } from "../types/types";
import Options from "./Options";

type Props = {
  question: QuestionsProps;
  answer: null;
  dispatch: () => void;
};

export default function Questions({ question, answer, dispatch }: Props) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}
