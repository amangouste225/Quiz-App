import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Container from "./Container";
import Error from "./components/Error";
import Start from "./components/Start";
import Questions from "./components/Questions";

enum ActionKind {
  dataReceived = "dataReceived",
  dataFailed = "dataFailed",
  start = "start",
  newAnswer = "newAnswer",
}

type StateProps = {
  status: string;
  question: never[];
};

type Actions = {
  type: ActionKind;
  payload: any;
};

const initial = {
  questions: [],
  // "loading" "error" "ready" "active"
  status: "loading",
  index: 0,
  answer: null,
};

const reducer = (state: StateProps, action: Actions) => {
  switch (action.type) {
    case ActionKind.dataReceived:
      return { ...state, questions: action.payload, status: "ready" };
      break;

    case ActionKind.dataFailed:
      return { ...state, status: "error" };
      break;

    case ActionKind.start:
      return { ...state, status: "start" };
      break;

    case ActionKind.newAnswer:
      return { ...state, answer: action.payload };
    default:
      return state;
  }
};

export default function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer<
    React.ReducerWithoutAction<any>
  >(reducer, initial);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/questions");
        const data = await res.json();
        setTimeout(() => {
          dispatch({ type: ActionKind.dataReceived, payload: data });
        }, 2000);
      } catch (error) {
        dispatch({ type: ActionKind.dataFailed, payload: error });
      }
    };
    fetchData();
  }, []);

  const numberOfQuestions = questions;
  return (
    <div className="app">
      <Header />

      <Container>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <Start dispatch={dispatch} question={numberOfQuestions} />
        )}
        {status === "error" && <Error />}
        {status === "start" && (
          <Questions
            question={questions[index]}
            answer={answer}
            dispatch={dispatch}
          />
        )}
      </Container>
    </div>
  );
}
