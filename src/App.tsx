import Header from "./components/Header";
import Loader from "./components/Loader";
import Container from "./Container";
import Error from "./components/Error";
import Start from "./components/Start";
import Questions from "./components/Questions";

import FinishScreen from "./components/FinishScreen";
import { useQuestions } from "./context/QuestionContext";
import { TQuestionsContext } from "./types/types";

export default function App() {
  const { status } = useQuestions() as TQuestionsContext;
  return (
    <div className="app">
      <Header />

      <Container>
        {status === "loading" && <Loader />}
        {status === "ready" && <Start />}
        {status === "error" && <Error />}
        {status === "active" && <Questions />}

        {status === "finished" && <FinishScreen />}
      </Container>
    </div>
  );
}
