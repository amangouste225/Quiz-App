import { QuestionsProps } from "../types/types";
import Options from "./Options";

type Props = {
  question: QuestionsProps;
};

export default function Questions({ question }: Props) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}
