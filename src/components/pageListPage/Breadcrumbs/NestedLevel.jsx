import ChevronRight from "../../icons/ChevronRight";
import { Link } from "react-router-dom";
import { pageListUrl } from "../../../helpers/url";

function NestedLevel({ pageId, pageTitle }) {
  return (
    <>
      <span className="mx-2 text-gray-300">
        <ChevronRight />
      </span>

      <Link
        to={pageListUrl(pageId)}
        className="text-gray-600 hover:text-indigo-900"
      >
        {pageTitle}
      </Link>
    </>
  );
}

export default NestedLevel;
