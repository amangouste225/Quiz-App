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
  tick = "tick",
}

type StateProps = {
  status: string;
  question: QuestionsProps;
  index: number;
  questions: any;
  points: number;
  answer: null;
  highlight: number;
  secondRemaining: number;
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
  secondRemaining: null,
};

const reducer = (state: StateProps, action: Actions) => {
  switch (action.type) {
    case ActionKind.dataReceived:
      return { ...state, questions: action.payload, status: "ready" };
    case ActionKind.dataFailed:
      return { ...state, status: "error" };
    case ActionKind.active:
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * 1,
      };
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

    case ActionKind.nextQuestion:
      return { ...state, index: state.index + 1, answer: null };
    case ActionKind.finish:
      return {
        ...state,
        status: "finished",
        highlight:
          state.points > state.highlight ? state.points : state.highlight,
      };
    case ActionKind.restart:
      return { ...initial, questions: state.questions, status: "ready" };

    case ActionKind.tick:
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
};

export default function App() {
  const [
    { questions, status, index, answer, points, highlight, secondRemaining },
    dispatch,
  ] = useReducer<React.ReducerWithoutAction<StateProps>>(reducer, initial);

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
            secondRemaining={secondRemaining}
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
