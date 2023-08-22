import PageForm, { VIEW_TYPE_UPDATE } from "../commons/PageForm";

function PageUpdateContent({ page }) {
  return (
    <div className="bg-white p-8">
      <h2 className="text-xl font-bold mb-2">Update page "{page.title}"</h2>

      <PageForm view={VIEW_TYPE_UPDATE} key={page.id} page={page} />
    </div>
  );
}

export default PageUpdateContent;
