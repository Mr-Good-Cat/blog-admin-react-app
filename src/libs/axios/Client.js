import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../../helpers/storage";
import { isCanceledRequest } from "./utils";

const _disconnectHandle = () => {
  removeAccessToken();
  removeRefreshToken();
};

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

    this.#client.interceptors.request.use((config) => {
      if (!!getAccessToken()) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
      }

      return config;
    });

    this.#client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const refreshTokenUri = "/auth/refresh-token";

        if (isCanceledRequest(error)) {
          throw error;
        }

        if (refreshTokenUri === error.config.url) {
          window.refreshRequest = null;
          _disconnectHandle();
          return;
        }

        if (
          !getRefreshToken() ||
          error.response.status !== 401 ||
          error.config.isRetry
        ) {
          throw error;
        }

        if (!window.refreshRequest) {
          const client = axios.create(config);

          window.refreshRequest = client.post(
            refreshTokenUri,
            {},
            {
              headers: {
                Authorization: `Bearer ${getRefreshToken()}`,
              },
            },
          );
        }

        try {
          const { data } = await window.refreshRequest;

          setAccessToken(data?.accessToken);
          setRefreshToken(data?.refreshToken);
        } catch (e) {
          const accessToken = getAccessToken();
          _disconnectHandle();
          if (!!accessToken) {
            window.location.reload();
          }

          return;
        }

        window.refreshRequest = null;

        const newRequest = {
          ...error.config,
          isRetry: true,
        };

        return this.#client.request(newRequest);
      },
    );
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
