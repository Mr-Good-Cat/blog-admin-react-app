const ACCESS_TOKEN_KEY = "access_token_key";
const REFRESH_TOKEN_KEY = "refresh_token_key";

function setItem(key, value) {
  window.localStorage.setItem(key, value);
  return true;
}

function getItem(key) {
  return window.localStorage.getItem(key);
}

function removeItem(key) {
  return window.localStorage.removeItem(key);
}

export function setAccessToken(value) {
  return setItem(ACCESS_TOKEN_KEY, value);
}

export function getAccessToken() {
  return getItem(ACCESS_TOKEN_KEY);
}

export function removeAccessToken() {
  return removeItem(ACCESS_TOKEN_KEY);
}

export function setRefreshToken(value) {
  return setItem(REFRESH_TOKEN_KEY, value);
}

export function getRefreshToken() {
  return getItem(REFRESH_TOKEN_KEY);
}

export function removeRefreshToken() {
  return removeItem(REFRESH_TOKEN_KEY);
}
