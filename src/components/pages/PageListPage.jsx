import PageList from "../pageListPage/PageList";
import { useEffect, useState } from "react";
import { ApiClient } from "../../libs/axios/ApiClient";
import UniversalLoader from "../commons/UniversalLoader";
import { useParams } from "react-router-dom";
import { errorHandler } from "../../libs/axios/utils";

function PageListPage() {
  let { parentPageId } = useParams();

  const [pages, setPage] = useState(null);
  const [ancestors, setAncestors] = useState(null);

  useEffect(() => {
    setPage(null);
    setAncestors(null);

    const client = new ApiClient();

    client
      .getPageList(parentPageId)
      .then(setPage)
      .catch((reason) => errorHandler(reason, "getPageList"));

    if (parentPageId) {
      client
        .getAncestors(parentPageId)
        .then(setAncestors)
        .catch((reason) => errorHandler(reason, "getAncestors"));
    }

    return () => {
      client.abort("getPageList");
      client.abort("getAncestors");
    };
  }, [parentPageId]);

  return pages === null ? (
    <UniversalLoader />
  ) : (
    <PageList ancestors={ancestors} pages={pages} />
  );
}

export default PageListPage;
