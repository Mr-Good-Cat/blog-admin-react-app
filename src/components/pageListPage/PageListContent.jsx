import PageListItem from "./PageListItem";
import Breadcrumbs from "./Breadcrumbs";
import PageListHeader from "./PageListHeader";

function PageListContent({ pages, ancestors, parentPageId }) {
  return (
    <div className="bg-white p-8">
      <div className="border-b mb-4 pb-2">
        <PageListHeader parentPageId={parentPageId} />

        <Breadcrumbs ancestors={ancestors} />
      </div>

      {pages.map((p) => (
        <PageListItem page={p} key={p.id} />
      ))}
    </div>
  );
}

export default PageListContent;
