import PageUpdateContent from "../pageUpdatePage/PageUpdateContent";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UniversalLoader from "../commons/UniversalLoader";
import { ApiClient } from "../../libs/axios/ApiClient";
import { errorHandler } from "../../libs/axios/utils";

function PageUpdatePage() {
  let { id } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    setPage(null);

    const client = new ApiClient();

    client
      .getPage(id)
      .then(setPage)
      .catch((reason) => errorHandler(reason, "getPage"));

    return () => client.abort("getPage");
  }, [id]);

  return page === null ? (
    <UniversalLoader />
  ) : (
    <PageUpdateContent page={page} />
  );
}

export default PageUpdatePage;
