import PageUpdateForm from "./PageUpdateForm";

function PageUpdateContent({ page }) {
  return (
    <div className="bg-white p-8">
      <h2 className="text-xl font-bold mb-2">Update page "{page.title}"</h2>

      <PageUpdateForm page={page} />
    </div>
  );
}

export default PageUpdateContent;
