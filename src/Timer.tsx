import { useEffect } from "react";
import { useQuestions } from "./context/QuestionContext";
import { TQuestionsContext } from "./types/types";

export default function Timer() {
  const { secondRemaining, dispatch } = useQuestions() as TQuestionsContext;
  const mins = Math.floor(secondRemaining / 60);
  const secs = Math.floor(secondRemaining % 60);

  useEffect(() => {
    const timer = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);
  return (
    <div className="timer">
      {" "}
      {mins < 10 && "0"}
      {mins} : {secs < 10 && "0"}
      {secs}
    </div>
  );
}
