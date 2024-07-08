import { QuestionsProps } from "../types/types";
import Options from "./Options";

type Props = {
  question: QuestionsProps;
  answer: null;
  dispatch: () => void;
  points: number;
  index: number;
};

export default function Questions({
  question,
  answer,
  dispatch,
  points,
  index,
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

      {answer !== null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion", payload: index + 1 })}
        >
          Next
        </button>
      )}
    </div>
  );
}
