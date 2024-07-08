import { QuestionsProps } from "../types/types";
import Options from "./Options";

type Props = {
  question: QuestionsProps;
  answer: null;
  dispatch: () => void;
  points: number;
};

export default function Questions({
  question,
  answer,
  dispatch,
  points,
}: Props) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        points={points}
        answer={answer}
        dispatch={dispatch}
      />
    </div>
  );
}
