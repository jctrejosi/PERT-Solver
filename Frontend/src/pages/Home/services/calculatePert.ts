import { Activity as Task } from "@customTypes/core";
import axios from "axios";

// ..............................................................

export type ParamsSetCalculatePert = {
  activities: Task[];
};

export const ApiCalculatePert = (params: ParamsSetCalculatePert) => {
  axios
    .post("/api/v1.0/calculatePert", params, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      // Manejar la respuesta aquí
      console.log(response.data);
    })
    .catch((error) => {
      // Manejar el error aquí
      console.error(error);
    });
};
