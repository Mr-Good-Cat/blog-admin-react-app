import { Link } from "react-router-dom";
import { pageListUrl, pageUpdateUrl } from "../../helpers/url";
import { PAGE_TYPE_ARTICLE } from "../../helpers/page.entity";

function PageListItem({ page, index }) {
  return (
    <div className="flex items-center justify-between rounded-md p-4 border border-transparent hover:border-indigo-600">
      <p>
        <span className="mr-2">{index}.</span>
        <Link
          to={
            page.type === PAGE_TYPE_ARTICLE
              ? pageUpdateUrl(page.id)
              : pageListUrl(page.id)
          }
          className="font-semibold text-blue-600 underline"
        >
          {page.title}
        </Link>
      </p>

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
