import { QuestionsProps } from "../types/types";

type Props = {
  question: QuestionsProps;
  onclick: () => void;
  answer: null;
};

export default function Options({ question, onclick, answer }: Props) {
  const isAnswer = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            isAnswer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={index}
          disabled={isAnswer}
          onClick={() => onclick({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
