const ERR_CANCELED = "ERR_CANCELED";
export const isCanceledRequest = (reason) => reason.code === ERR_CANCELED;

export function errorHandler(reason, id) {
  console.log("id: ", id, "reason:", reason, { reason });

  if (!isCanceledRequest(reason)) {
    console.error("id: ", id, "reason:", reason, { reason });
  }
}
