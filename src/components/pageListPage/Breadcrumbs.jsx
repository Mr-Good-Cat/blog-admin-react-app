import RootLevel from "./Breadcrumbs/RootLevel";
import NestedLevel from "./Breadcrumbs/NestedLevel";

function Breadcrumbs({ ancestors }) {
  if (!ancestors) {
    return null;
  }

  return (
    <div className="flex items-center">
      <p className="mr-4 font-semibold">Nested level: </p>

      <div className="py-4 overflow-y-auto whitespace-nowrap flex items-center">
        <RootLevel />

        {ancestors.map((a) => (
          <NestedLevel pageId={a.id} pageTitle={a.title} />
        ))}
      </div>
    </div>
  );
}

export default Breadcrumbs;
