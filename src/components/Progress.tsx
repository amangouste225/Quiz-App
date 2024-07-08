type Props = {
  index: number;
  numberOfQuestions: number;
};

export default function Progress({ index, numberOfQuestions }: Props) {
  return (
    <header className="progress">
      <progress />
      <p>
        Question{" "}
        <strong>
          {index + 1} / {numberOfQuestions}
        </strong>
      </p>
      <p>
        <strong>0</strong> / X points
      </p>
    </header>
  );
}
