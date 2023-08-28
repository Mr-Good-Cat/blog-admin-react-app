import Markdown from "./Markdown";

function Paragraph({ text }) {
  return (
    <p className="my-2">
      <Markdown text={text} />
    </p>
  );
}

export default Paragraph;
