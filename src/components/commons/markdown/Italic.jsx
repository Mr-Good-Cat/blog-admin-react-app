import Markdown from "./Markdown";

function Italic({ text }) {
  return (
    <span className="italic">
      <Markdown text={text} />
    </span>
  );
}

export default Italic;
