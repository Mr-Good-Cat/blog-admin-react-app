import Bold from "./Bold";
import Italic from "./Italic";
import Paragraph from "./Paragraph";
import { Link } from "react-router-dom";
import Image from "./Image";

const SEPARATOR_TEMPLATE = "| $& |";
const SEPARATOR = "|";

const rules = [
  [/~([^~]+\n?)~/g, '{"text": "$1"}', Paragraph],
  [/\*([^*]+)\*/g, '{"text": "$1"}', Bold],
  [/_([^_`]+)_/g, '{"text": "$1"}', Italic],

  [
    /!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g,
    '{"src": "$1", "alt": "$2", "title": "$3"}',
    Image,
  ],
  [
    /[^!]\[([^\]]+)]\(([^)]+)\)/g,
    '{"children": "$1", "to": "$2", "className": "text-blue-400 hover:text-blue-200"}',
    Link,
  ],
];

const parse = (description) => {
  let html = description;

  for (const [rule, jsonProps, Component] of rules) {
    if (html.match(rule)) {
      html = html.replace(rule, SEPARATOR_TEMPLATE);

      return html
        .split(SEPARATOR)
        .filter((s) => !!s)
        .map((s, index) => {
          const found = s.match(rule);

          if (found) {
            const props = JSON.parse(s.replace(rule, jsonProps));
            return <Component key={index} {...props} />;
          }

          return parse(s);
        });
    }
  }

  return html;
};

function Markdown({ text }) {
  return parse(text);
}

export default Markdown;
