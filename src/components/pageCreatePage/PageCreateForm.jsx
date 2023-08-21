import Input from "../commons/Input";
import Dropdown from "../commons/Dropdown";
import Textarea from "../commons/Textarea";
import { useImmer } from "use-immer";
import { PAGE_TYPE } from "../../helpers/page.entity";

const PAGE_TYPE_OPTIONS = Object.entries(PAGE_TYPE).map(([key, value]) => {
  return {
    id: value,
    value: key,
    title: value,
  };
});

function PageCreateForm() {
  const [page, updatePage] = useImmer({
    title: "",
    order: "",
    slug: "",
    seoTitle: "",
    seoDescription: "",
    description: "",
    type: PAGE_TYPE_OPTIONS[0].value,
  });

  const onChange = (e) => {
    updatePage((draft) => {
      draft[e.target.name] = e.target.value;
    });
  };

  return (
    <form action="">
      <div className="lg:flex lg:justify-between">
        <div className="lg:w-2/5 mb-2">
          <Input
            label="Title"
            value={page.title}
            onInput={onChange}
            name="title"
          />
        </div>
        <div className="lg:flex lg:justify-between lg:w-2/5">
          <div className="lg:w-1/3 mb-2">
            <Input
              label="Order"
              value={page.order}
              onInput={onChange}
              name="order"
            />
          </div>

          <div className="lg:w-2/5 mb-2">
            <Dropdown
              name="type"
              value={page.type}
              onChange={onChange}
              label="Type"
              options={PAGE_TYPE_OPTIONS}
            />
          </div>
        </div>
      </div>

      <div className="lg:flex lg:justify-between">
        <div className="lg:w-2/5 mb-2">
          <Input
            label="Slug"
            value={page.slug}
            onInput={onChange}
            name="slug"
          />
        </div>

        <div className="lg:w-2/5">
          <div className="mb-2">
            <Input
              label="Seo Title"
              value={page.seoTitle}
              onInput={onChange}
              name="seoTitle"
            />
          </div>
          <div className="mb-2">
            <Input
              label="Seo Description"
              value={page.seoDescription}
              onInput={onChange}
              name="seoDescription"
            />
          </div>
        </div>
      </div>

      <Textarea
        label="Description"
        value={page.description}
        onInput={onChange}
        name="description"
      />
    </form>
  );
}

export default PageCreateForm;
