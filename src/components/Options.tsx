import { useQuestions } from "../context/QuestionContext";
import { TQuestionsContext } from "../types/types";

export default function Options() {
  const { questions, dispatch, answer, index } =
    useQuestions() as TQuestionsContext;

  const question = questions.at(index);
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answer !== null
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } `}
          key={index}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
