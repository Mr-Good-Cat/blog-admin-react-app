export const PAGE_TYPE_MAIN_CATEGORY = "MAIN_CATEGORY";
export const PAGE_TYPE_CATEGORY = "CATEGORY";
export const PAGE_TYPE_ARTICLE = "ARTICLE";

export const PAGE_TYPE = {
  [PAGE_TYPE_MAIN_CATEGORY]: PAGE_TYPE_MAIN_CATEGORY,
  [PAGE_TYPE_CATEGORY]: PAGE_TYPE_CATEGORY,
  [PAGE_TYPE_ARTICLE]: PAGE_TYPE_ARTICLE,
};

const PAGE_STATUS_PENDING = "PENDING";
const PAGE_STATUS_PUBLISHED = "PUBLISHED";
const PAGE_STATUS_DELETED = "DELETED";

export const PAGE_STATUS = {
  [PAGE_STATUS_PENDING]: PAGE_STATUS_PENDING,
  [PAGE_STATUS_PUBLISHED]: PAGE_STATUS_PUBLISHED,
  [PAGE_STATUS_DELETED]: PAGE_STATUS_DELETED,
};

export const pageCreateDto = (type) => {
  return {
    title: "",
    order: "0",
    slug: "",
    seoTitle: "",
    seoDescription: "",
    description: "",
    type: type,
  };
};
