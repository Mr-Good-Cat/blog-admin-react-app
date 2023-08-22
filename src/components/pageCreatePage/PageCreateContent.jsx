import PageForm, { VIEW_TYPE_CREATE } from "../commons/PageForm";

function PageCreateContent({ parentPageId }) {
  return (
    <div className="bg-white p-8">
      <h2 className="text-xl font-bold mb-2">Create page</h2>

      <PageForm view={VIEW_TYPE_CREATE} parentPageId={parentPageId} />
    </div>
  );
}

export default PageCreateContent;
