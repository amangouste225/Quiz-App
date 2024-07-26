import { useQuestions } from "../context/QuestionContext";
import { TQuestionsContext } from "../types/types";

export default function FinishScreen() {
  const { points, dispatch, sumAmount, highlight } =
    useQuestions() as TQuestionsContext;
  const percentage = (points / sumAmount) * 100;

  let emoji;
  switch (true) {
    case percentage == 100:
      emoji = "⭐";
      break;
    case percentage >= 80 && percentage < 100:
      emoji = "💭";
      break;

    case percentage >= 50 && percentage < 80:
      emoji = "💊";
      break;
    case percentage >= 0 && percentage < 50:
      emoji = "✏️";
      break;
    default:
      emoji === "🌎";
  }
  return (
    <>
      <p className="result">
        Your scored
        <strong>
          {" "}
          {points} out of {sumAmount} ({Math.ceil(percentage)}% ){emoji}
        </strong>
      </p>
      <p className="highscore"> (highscore : {highlight} points )</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
