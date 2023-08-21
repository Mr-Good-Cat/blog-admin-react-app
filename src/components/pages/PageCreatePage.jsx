import Input from "../commons/Input";
import Dropdown from "../commons/Dropdown";
import Textarea from "../commons/Textarea";

function PageCreatePage() {
  return (
    <div className="bg-white p-8">
      <form action="">
        <div className="lg:flex lg:justify-between">
          <div className="lg:w-2/5 mb-2">
            <Input label="Title" />
          </div>
          <div className="lg:flex lg:justify-between lg:w-2/5">
            <div className="lg:w-1/3 mb-2">
              <Input label="Order" />
            </div>

            <div className="lg:w-1/3 mb-2">
              <Dropdown
                label="Type"
                options={[{ id: 1, value: "qq", title: "qwe" }]}
              />
            </div>
          </div>
        </div>

        <div className="lg:flex lg:justify-between">
          <div className="lg:w-2/5 mb-2">
            <Input label="Slug" />
          </div>

          <div className="lg:w-2/5">
            <div className="mb-2">
              <Input label="Seo Title" />
            </div>
            <div className="mb-2">
              <Input label="Seo Description" />
            </div>
          </div>
        </div>

        <Textarea label="Description" />
      </form>
    </div>
  );
}

export default PageCreatePage;
