import { QuestionsProps } from "../types/types";

type Props = {
  question: QuestionsProps;
};

export default function Options({ question }: Props) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button className="btn btn-option" key={index}>
          {option}
        </button>
      ))}
    </div>
  );
}
