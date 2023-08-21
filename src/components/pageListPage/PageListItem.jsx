import { Link } from "react-router-dom";
import { pageListUrl, pageUpdateUrl } from "../../helpers/url";

function PageListItem({ page }) {
  return (
    <div className="flex items-center justify-between rounded-md p-4 border border-transparent hover:border-indigo-600">
      <Link to={pageListUrl(page.id)}>{page.title}</Link>

      <Link
        to={pageUpdateUrl(page.id)}
        className="border py-1 px-3 rounded-full border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"
      >
        Update
      </Link>
    </div>
  );
}

export default PageListItem;
