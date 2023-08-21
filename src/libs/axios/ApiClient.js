import { Client } from "./Client";

export class ApiClient {
  #client;

  constructor() {
    this.#client = new Client();
  }

  abort(name) {
    this.#client.abort(name);
  }

  getPageList(parentPageId) {
    const query = new URLSearchParams({
      parentPageId,
    });

    return this.#client.get(`/page/list${!!parentPageId ? `?${query}` : ""}`, {
      signal: this.#client.createSignal("getPageList"),
    });
  }

  getAncestors(pageId) {
    return this.#client.get(`/page/${pageId}/ancestors`, {
      signal: this.#client.createSignal("getAncestors"),
    });
  }

  createPage(page) {
    return this.#client.post("/page/create", page);
  }
}
