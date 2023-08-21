import { Link } from "react-router-dom";
import { pageCreateUrl } from "../../helpers/url";

function PageListHeader() {
  return (
    <div className="flex justify-between">
      <h2 className="text-xl font-bold">Pages</h2>
      <Link
        to={pageCreateUrl()}
        className="border py-1 px-3 rounded-full border-green-600 text-green-600 hover:text-white hover:bg-green-600"
      >
        Create new page
      </Link>
    </div>
  );
}

export default PageListHeader;
