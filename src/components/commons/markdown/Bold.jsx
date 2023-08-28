import Markdown from "./Markdown";

function Bold({ text }) {
  return (
    <span className="font-semibold">
      <Markdown text={text} />
    </span>
  );
}

export default Bold;
