import Input from "../commons/Input";
import Dropdown from "../commons/Dropdown";
import Textarea from "../commons/Textarea";
import { useImmer } from "use-immer";
import { PAGE_TYPE } from "../../helpers/page.entity";
import { ApiClient } from "../../libs/axios/ApiClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageListUrl } from "../../helpers/url";

const PAGE_TYPE_OPTIONS = Object.entries(PAGE_TYPE).map(([key, value]) => {
  return {
    id: value,
    value: key,
    title: value,
  };
});

const TYPING = "TYPING";
const SUBMITTING = "SUBMITTING";

function PageCreateForm({ parentPageId }) {
  let navigate = useNavigate();
  const [status, setStatus] = useState(TYPING);
  const [validationErrorList, updateValidationErrorList] = useImmer([]);
  const [page, updatePage] = useImmer({
    title: "",
    order: "0",
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

    updateValidationErrorList((draft) =>
      draft.filter((vE) => vE.field !== e.target.name),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (status === SUBMITTING) {
      return;
    }

    setStatus(SUBMITTING);

    const client = new ApiClient();
    client
      .createPage(page, parentPageId)
      .then((createdPage) => {
        const parentPageIdList = createdPage.path.split(".");
        const parentPageId =
          parentPageIdList.length > 1
            ? parentPageIdList[parentPageIdList.length - 2]
            : null;

        console.log(parentPageIdList);

        navigate(pageListUrl(parentPageId));
      })
      .catch((reason) =>
        updateValidationErrorList(reason.response.data.message),
      )
      .finally(() => setStatus(TYPING));
  };

  const getErrors = (field) =>
    validationErrorList.find((vE) => vE.field === field)?.errors;

  const isDisabled = status === SUBMITTING;

  return (
    <form onSubmit={onSubmit}>
      <div className="lg:flex lg:justify-between">
        <div className="lg:w-2/5 mb-2">
          <Input
            label="Title"
            value={page.title}
            onInput={onChange}
            name="title"
            errorList={getErrors("title")}
            disabled={isDisabled}
          />
        </div>
        <div className="lg:flex lg:justify-between lg:w-2/5">
          <div className="lg:w-1/3 mb-2">
            <Input
              label="Order"
              value={page.order}
              onInput={onChange}
              name="order"
              errorList={getErrors("order")}
              disabled={isDisabled}
            />
          </div>

          <div className="lg:w-2/5 mb-2">
            <Dropdown
              name="type"
              value={page.type}
              onChange={onChange}
              label="Type"
              options={PAGE_TYPE_OPTIONS}
              disabled={isDisabled}
              errorList={getErrors("type")}
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
            errorList={getErrors("slug")}
            disabled={isDisabled}
          />
        </div>

        <div className="lg:w-2/5">
          <div className="mb-2">
            <Input
              label="Seo Title"
              value={page.seoTitle}
              onInput={onChange}
              name="seoTitle"
              errorList={getErrors("seoTitle")}
              disabled={isDisabled}
            />
          </div>
          <div className="mb-2">
            <Input
              label="Seo Description"
              value={page.seoDescription}
              onInput={onChange}
              name="seoDescription"
              errorList={getErrors("seoDescription")}
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>

      <div className="mb-2">
        <Textarea
          label="Description"
          value={page.description}
          onInput={onChange}
          name="description"
          errorList={getErrors("description")}
          disabled={isDisabled}
        />
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="w-full border py-1 px-3 rounded-full border-green-600 text-green-600 hover:text-white hover:bg-green-600 disabled:border-gray-400 disabled:bg-gray-50 disabled:text-black"
      >
        {isDisabled ? "Processing..." : "Create"}
      </button>
    </form>
  );
}

export default PageCreateForm;
