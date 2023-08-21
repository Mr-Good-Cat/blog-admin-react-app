import PageCreateContent from "../pageCreatePage/PageCreateContent";
import { useParams } from "react-router-dom";

function PageCreatePage() {
  let { parentPageId } = useParams();

  return <PageCreateContent parentPageId={parentPageId} />;
}

export default PageCreatePage;
