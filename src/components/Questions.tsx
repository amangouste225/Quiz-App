import { useQuestions } from "../context/QuestionContext";
import Timer from "../Timer";
import { TQuestionsContext } from "../types/types";
import Options from "./Options";
import Progress from "./Progress";

export default function Questions() {
  const {
    question,
    index,
    sumAmount,
    numberOfQuestions,
    points,
    dispatch,
    answer,
  } = useQuestions() as TQuestionsContext;

  return (
    <div className="questions">
      <Progress
        index={index}
        numberOfQuestions={numberOfQuestions}
        sum={sumAmount}
        points={points}
      />
      <h4>{question.question}</h4>
      <Options />

      <div className="hflex">
        <Timer />
        {answer !== null && index <= 13 && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Next
          </button>
        )}
        {answer !== null && index >= 14 && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finish" })}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
