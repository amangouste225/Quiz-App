import { useQuestions } from "../context/QuestionContext";
import { TQuestionsContext } from "../types/types";

export default function Start() {
  const { questions, dispatch } = useQuestions() as TQuestionsContext;
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        Let's start
      </button>
    </div>
  );
}
