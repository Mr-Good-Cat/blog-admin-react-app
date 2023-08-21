export const homePageUrl = () => "/";

export const pageListUrl = (parentPageId) => {
  if (!!parentPageId) {
    return `/page/list/${parentPageId}`;
  } else if (parentPageId === null) {
    return `/page/list/`;
  }

  return `/page/list/:parentPageId?`;
};
