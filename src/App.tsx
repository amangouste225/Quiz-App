import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Container from "./Container";
import Error from "./components/Error";
import Start from "./components/Start";
import Questions from "./components/Questions";
import { QuestionsProps } from "./types/types";
import FinishScreen from "./components/FinishScreen";

enum ActionKind {
  dataReceived = "dataReceived",
  dataFailed = "dataFailed",
  active = "active",
  newAnswer = "newAnswer",
  points = "points",
  nextQuestion = "nextQuestion",
  finish = "finish",
  restart = "restart",
}

type StateProps = {
  status: string;
  question: QuestionsProps;
  index: number;
  questions: any;
  points: number;
  answer: null;
  highlight: number;
};

type Actions = {
  type: ActionKind;
  payload?: number;
};

const initial = {
  questions: [],

  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highlight: 0,
};

const reducer = (state: StateProps, action: Actions) => {
  switch (action.type) {
    case ActionKind.dataReceived:
      return { ...state, questions: action.payload, status: "ready" };
      break;

    case ActionKind.dataFailed:
      return { ...state, status: "error" };
      break;

    case ActionKind.active:
      return { ...state, status: "active" };
      break;

    case ActionKind.newAnswer:
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,

        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
      break;

    case ActionKind.nextQuestion:
      return { ...state, index: state.index + 1, answer: null };
      break;
    case ActionKind.finish:
      return {
        ...state,
        status: "finished",
        highlight:
          state.points > state.highlight ? state.points : state.highlight,
      };
      break;
    case ActionKind.restart:
      return { ...initial, questions: state.questions, status: "ready" };
      break;
    default:
      throw new Error("Action unknown");
  }
};

export default function App() {
  const [{ questions, status, index, answer, points, highlight }, dispatch] =
    useReducer<React.ReducerWithoutAction<StateProps>>(reducer, initial);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/questions");
        const data = await res.json();
        dispatch({ type: ActionKind.dataReceived, payload: data });
      } catch (error) {
        dispatch({ type: ActionKind.dataFailed, payload: error });
      }
    };
    fetchData();
  }, []);

  const numberOfQuestions = questions.length;

  const sumAmount = questions.reduce(
    (total: number, item: QuestionsProps) => total + item.points,
    0
  );

  return (
    <div className="app">
      <Header />

      <Container>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <Start dispatch={dispatch} question={questions} />
        )}
        {status === "error" && <Error />}
        {status === "active" && (
          <Questions
            question={questions[index]}
            answer={answer}
            dispatch={dispatch}
            points={points}
            index={index}
            numberOfQuestions={numberOfQuestions}
            sum={sumAmount}
          />
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            sum={sumAmount}
            highlight={highlight}
            dispatch={dispatch}
          />
        )}
      </Container>
    </div>
  );
}
