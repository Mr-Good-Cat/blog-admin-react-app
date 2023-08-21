import PageListItem from "./PageListItem";
import Breadcrumbs from "./Breadcrumbs";
import PageListHeader from "./PageListHeader";

function PageList({ pages, ancestors }) {
  return (
    <div className="bg-white p-8">
      <div className="border-b mb-4 pb-2">
        <PageListHeader />

        <Breadcrumbs ancestors={ancestors} />
      </div>

      {pages.map((p) => (
        <PageListItem page={p} key={p.id} />
      ))}
    </div>
  );
}

export default PageList;
