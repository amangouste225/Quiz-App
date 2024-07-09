type Props = {
  points: number;
  sum: number;
};
export default function FinishScreen({ points, sum }: Props) {
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

  return (
    <>
      <p className="result">
        Your scored
        <strong>
          {" "}
          {points} out of {sum} ({Math.ceil(percentage)}% ){emoji}
        </strong>
      </p>
      <p className="highscore"> (highscore : X points )</p>
    </>
  );
}
