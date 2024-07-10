type Props = {
  points: number;
  sum: number;
  highlight: number;
  dispatch: () => void;
};
export default function FinishScreen({
  points,
  sum,
  highlight,
  dispatch,
}: Props) {
  const percentage = (points / sum) * 100;

  let emoji;
  switch (true) {
    case percentage == 100:
      emoji = "⭐";
      break;
    case percentage >= 80 && percentage < 100:
      emoji = "💭";
      break;

    case percentage >= 50 && percentage < 80:
      emoji = "💊";
      break;
    case percentage >= 0 && percentage < 50:
      emoji = "✏️";
      break;
    default:
      emoji === "🌎";
  }

  console.log(highlight);
  return (
    <>
      <p className="result">
        Your scored
        <strong>
          {" "}
          {points} out of {sum} ({Math.ceil(percentage)}% ){emoji}
        </strong>
      </p>
      <p className="highscore"> (highscore : {highlight} points )</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
