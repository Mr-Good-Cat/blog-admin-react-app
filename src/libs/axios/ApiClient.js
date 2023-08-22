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

  createPage(page, parentPageId) {
    const data = { ...page };
    if (!!parentPageId) {
      data.parentPageId = parseInt(parentPageId, 10);
    }

    return this.#client.post("/page/create", data);
  }

  updatePage(page) {
    return this.#client.post("/page/update", page);
  }

  getPage(id) {
    return this.#client.get(`/page/${id}`, {
      signal: this.#client.createSignal("getPage"),
    });
  }

  signToken(wallet) {
    const query = new URLSearchParams({
      wallet,
    });

    return this.#client.get(`/auth/sign-token?${query}`, {
      signal: this.#client.createSignal("signToken"),
    });
  }

  signIn(wallet, signature) {
    const query = new URLSearchParams({
      wallet,
      signature,
    });

    return this.#client.post(`/auth/signin?${query}`);
  }
}
