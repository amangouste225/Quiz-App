import { createContext, useContext, useEffect, useReducer } from "react";
import { Actions, Children, TQuestionsContext } from "../types/types";

const QuestionContext = createContext<TQuestionsContext | null>(null);

const initialState = {
  questions: [],

  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highlight: 0,
  secondRemaining: null,
};

const reducer = (state: TQuestionsContext, action: Actions) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * 15,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highlight:
          state.points > state.highlight ? state.points : state.highlight,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
};

function Provider({ children }: Children) {
  const [
    { questions, status, index, answer, points, highlight, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed", payload: error });
      }
    };
    fetchData();
  }, []);

  const numberOfQuestions = questions.length;

  const sumAmount = questions.reduce(
    (total: number, item: TQuestionsContext) => total + item.points,
    0
  );

  const question = questions.at(index);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highlight,
        secondRemaining,

        dispatch,
        sumAmount,
        numberOfQuestions,
        question,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(QuestionContext);
  if (context === undefined) throw new Error("no context");

  return context;
}

export { Provider, useQuestions };
