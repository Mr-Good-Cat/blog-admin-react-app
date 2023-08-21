import PageCreateForm from "./PageCreateForm";

function PageCreateContent({ parentPageId }) {
  return (
    <div className="bg-white p-8">
      <h2 className="text-xl font-bold mb-2">Create page</h2>

      <PageCreateForm parentPageId={parentPageId} />
    </div>
  );
}

export default PageCreateContent;
