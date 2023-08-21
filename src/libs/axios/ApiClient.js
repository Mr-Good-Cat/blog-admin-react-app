import { Client } from "./Client";

export class ApiClient {
  #client;

  constructor() {
    this.#client = new Client();
  }

  getPageList(parentPageId) {
    const query = new URLSearchParams({
      parentPageId,
    });

    return this.#client.get(`/page/list${!!parentPageId ? `?${query}` : ""}`);
  }
}
