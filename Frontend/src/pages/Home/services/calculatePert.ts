import { Activity } from "@customTypes/core";
import axios from "axios";

// ..............................................................

export type ParamsSetCalculatePert = {
  activities: Activity[];
};

export const ApiCalculatePert = (params: ParamsSetCalculatePert) => {
  axios
    .post("/api/v1.0/calculatePert", params, {
      responseType: "arraybuffer",
    })
    .then(() => {})
    .catch(() => {});
};
