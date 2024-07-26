import { Dispatch } from "react";

export type TQuestionsProps = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type TQuestionsContext = {
  status: string;
  question?: TQuestionsProps;
  index: number;
  questions?: any;
  points: number;
  answer: null;
  highlight: number;
  secondRemaining: number;
  dispatch: Dispatch<Actions>;
  sumAmount: number;
  numberOfQuestions: number;
};

export type Actions = {
  type:
    | "dataReceived"
    | "dataFailed"
    | "active"
    | "newAnswer"
    | "nextQuestion"
    | "finish"
    | "restart"
    | "tick";
  payload?: number;
};

export type Children = {
  children: React.ReactNode;
};
