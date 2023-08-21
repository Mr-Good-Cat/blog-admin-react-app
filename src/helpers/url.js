export const homePageUrl = () => "/";

export const pageListUrl = (parentPageId) =>
  withOptionalParam("/page/list/", "parentPageId")(parentPageId);
export const pageCreateUrl = (parentPageId) =>
  withOptionalParam("/page/create/", "parentPageId")(parentPageId);
export const pageUpdateUrl = (id) =>
  !!id ? `/page/update/${id}` : "/page/update/:id";

const withOptionalParam = (url, optionalParamName) => (param) => {
  if (!!param) {
    return `${url}${param}`;
  } else if (param === null) {
    return url;
  }

  return `${url}:${optionalParamName}?`;
};
