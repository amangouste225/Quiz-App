import { QuestionsProps } from "../types/types";

type QuestionProps = {
  question: QuestionsProps[];
  dispatch: any;
};

export default function Start({ question, dispatch }: QuestionProps) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{question.length} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
