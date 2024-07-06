import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Container from "./Container";
import Error from "./components/Error";
import Start from "./components/Start";

enum ActionKind {
  dataReceived = "dataReceived",
  dataFailed = "dataFailed",
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
};

const reducer = (state: StateProps, action: Actions) => {
  switch (action.type) {
    case ActionKind.dataReceived:
      return { ...state, questions: action.payload, status: "ready" };
      break;

    case ActionKind.dataFailed:
      return { ...state, status: "error" };
      break;
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer<React.ReducerWithoutAction<any>>(
    reducer,
    initial
  );

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

  const numberOfQuestions = state.questions;
  return (
    <div className="app">
      <Header />

      <Container>
        {state.status === "loading" && <Loader />}
        {state.status === "ready" && <Start question={numberOfQuestions} />}
        {state.status === "error" && <Error />}
      </Container>
    </div>
  );
}
