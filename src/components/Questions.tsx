import { QuestionsProps } from "../types/types";
import Options from "./Options";
import Progress from "./Progress";

type Props = {
  question: QuestionsProps;
  answer: null;
  dispatch: () => void;
  points: number;
  index: number;
  numberOfQuestions: number;
};

export default function Questions({
  question,
  answer,
  dispatch,
  points,
  index,
  numberOfQuestions,
}: Props) {
  return (
    <div>
      <Progress index={index} numberOfQuestions={numberOfQuestions} />
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
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
    </div>
  );
}
