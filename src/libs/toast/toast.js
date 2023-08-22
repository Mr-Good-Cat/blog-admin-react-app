import { toast } from "react-toastify";
import { isEmpty } from "../../helpers/object";
import { removeSpaces } from "../../helpers/string";

export function success(message, toastId) {
  toast.success(message, {
    toastId,
  });
}

export function warning(message, toastId) {
  toast.warning(message, { toastId });
}

export function error(message, toastId, autoClose) {
  toast.error(message, {
    toastId,
    autoClose,
  });
}

export function requestError(reason, toastId) {
  const data = reason?.response?.data;
  if (isEmpty(data)) {
    error("Something went wrong. Please, try later", toastId);
    return;
  }

  if (!!data.message && data.message.length > 0) {
    if (Array.isArray(data.message)) {
      for (const message of data.message) {
        error(message, `${toastId}_${removeSpaces(message)}`);
      }
      return;
    }

    error(data.message, `${toastId}_${removeSpaces(data.message)}`);
    return;
  }

  error(`Status: ${data.statusCode}. Error: ${data.error}`);
}
