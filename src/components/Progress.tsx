type Props = {
  index: number;
  numberOfQuestions: number;
  sum: number;
  points: number;
};

export default function Progress({
  index,
  numberOfQuestions,
  sum,
  points,
}: Props) {
  return (
    <header className="progress">
      <progress max={numberOfQuestions} value={index} />
      <p>
        Question{" "}
        <strong>
          {index + 1} / {numberOfQuestions}
        </strong>
      </p>
      <p>
        <strong>{points} </strong> / {sum} points
      </p>
    </header>
  );
}
