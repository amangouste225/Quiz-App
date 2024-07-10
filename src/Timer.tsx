import { useEffect } from "react";

type Props = {
  secondRemaining: number;
  dispatch: () => void;
};

export default function Timer({ secondRemaining, dispatch }: Props) {
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
