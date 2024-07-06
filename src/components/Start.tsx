import { Questions } from "../types/types";

type QuestionProps = {
  question: Questions[];
};

export default function Start({ question }: QuestionProps) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{question.length} questions to test your React mastery</h3>
      <button>Let's start</button>
    </div>
  );
}
