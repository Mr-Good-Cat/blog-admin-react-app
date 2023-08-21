import axios from "axios";
export class Client {
  #client;
  #signals;

  constructor() {
    const config = {
      baseURL: process.env.REACT_APP_API_DOMAIN,
      timeout: 30000,
    };

    this.#client = axios.create(config);
    this.#signals = {};
  }

  abort(name) {
    if (!!this.#signals[name]) {
      this.#signals[name].abort();
    }
  }

  get(url, config) {
    return this.#client.get(url, config).then((response) => response.data);
  }

  post(url, data, config) {
    return this.#client
      .post(url, data, config)
      .then((response) => response.data);
  }

  put(url, data, config) {
    return this.#client
      .put(url, data, config)
      .then((response) => response.data);
  }

  createSignal(name) {
    const controller = new AbortController();
    this.#signals[name] = controller;

    return controller.signal;
  }
}
