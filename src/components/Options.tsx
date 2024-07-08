import { QuestionsProps } from "../types/types";

type Props = {
  question: QuestionsProps;
  answer: null;
  dispatch: () => void;
};

export default function Options({ question, answer, dispatch }: Props) {
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
