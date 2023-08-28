import Input from "../commons/Input";
import Dropdown from "../commons/Dropdown";
import Textarea from "../commons/Textarea";
import { useImmer } from "use-immer";
import {
  PAGE_STATUS,
  PAGE_TYPE,
  pageCreateDto,
} from "../../helpers/page.entity";
import { ApiClient } from "../../libs/axios/ApiClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageListUrl } from "../../helpers/url";
import UserPageView from "./UserPageView";

const PAGE_TYPE_OPTIONS = Object.entries(PAGE_TYPE).map(([key, value]) => {
  return {
    id: value,
    value: key,
    title: value,
  };
});
const PAGE_STATUS_OPTIONS = Object.entries(PAGE_STATUS).map(([key, value]) => {
  return {
    id: value,
    value: key,
    title: value,
  };
});

const TYPING = "TYPING";
const SUBMITTING = "SUBMITTING";

export const VIEW_TYPE_CREATE = "create";
export const VIEW_TYPE_UPDATE = "update";

const TYPE_VARIABLES = {
  [VIEW_TYPE_CREATE]: {
    dropdown: {
      prop: "type",
      title: "Type",
      options: PAGE_TYPE_OPTIONS,
    },
    apiMethod: "createPage",
    button: {
      title: "Create",
    },
  },
  [VIEW_TYPE_UPDATE]: {
    dropdown: {
      prop: "status",
      title: "status",
      options: PAGE_STATUS_OPTIONS,
    },
    apiMethod: "updatePage",
    button: {
      title: "Update",
    },
  },
};

function PageForm({ page, parentPageId, view }) {
  let navigate = useNavigate();
  const [status, setStatus] = useState(TYPING);
  const [validationErrorList, updateValidationErrorList] = useImmer([]);
  const [fields, updateFields] = useImmer(
    view === VIEW_TYPE_CREATE
      ? pageCreateDto(PAGE_TYPE_OPTIONS[0].value)
      : { ...page },
  );

  const onChange = (e) => {
    updateFields((draft) => {
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
    client[TYPE_VARIABLES[view].apiMethod](fields, parentPageId)
      .then((response) => {
        const parentPageIdList = response.path.split(".");
        const parentPageId =
          parentPageIdList.length > 1
            ? parentPageIdList[parentPageIdList.length - 2]
            : null;

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
            value={fields.title}
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
              value={fields.order}
              onInput={onChange}
              name="order"
              errorList={getErrors("order")}
              disabled={isDisabled}
            />
          </div>

          <div className="lg:w-2/5 mb-2">
            <Dropdown
              name={TYPE_VARIABLES[view].dropdown.prop}
              value={fields[TYPE_VARIABLES[view].dropdown.prop]}
              onChange={onChange}
              label={TYPE_VARIABLES[view].dropdown.title}
              options={TYPE_VARIABLES[view].dropdown.options}
              disabled={isDisabled}
              errorList={getErrors(TYPE_VARIABLES[view].dropdown.prop)}
            />
          </div>
        </div>
      </div>

      <div className="lg:flex lg:justify-between">
        <div className="lg:w-2/5 mb-2">
          <Input
            label="Slug"
            value={fields.slug}
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
              value={fields.seoTitle}
              onInput={onChange}
              name="seoTitle"
              errorList={getErrors("seoTitle")}
              disabled={isDisabled}
            />
          </div>
          <div className="mb-2">
            <Input
              label="Seo Description"
              value={fields.seoDescription}
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
          value={fields.description}
          onInput={onChange}
          name="description"
          errorList={getErrors("description")}
          disabled={isDisabled}
        />
      </div>

      <UserPageView title={fields.title} description={fields.description} />

      <button
        type="submit"
        disabled={isDisabled}
        className="w-full border py-1 px-3 rounded-full border-green-600 text-green-600 hover:text-white hover:bg-green-600 disabled:border-gray-400 disabled:bg-gray-50 disabled:text-black"
      >
        {isDisabled ? "Processing..." : TYPE_VARIABLES[view].button.title}
      </button>
    </form>
  );
}

export default PageForm;
