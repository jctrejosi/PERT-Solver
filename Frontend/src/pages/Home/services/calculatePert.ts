import { Route, TableVariance, Activity as Task } from "@customTypes/core";
import axios from "axios";
import { ActionsHome } from "../slice";
import { Dispatch } from "redux";

// ..............................................................

export type ParamsSetCalculatePert = {
  activities: Task[];
  expected_time: number;
};

export type RequestCalculatePert = {
  routes: Route[];
  table: TableVariance[];
};

export const ApiCalculatePert = (
  params: ParamsSetCalculatePert,
  dispatch: Dispatch
) => {
  axios
    .post<RequestCalculatePert>("/api/v1.0/calculatePert", params)
    .then((response) => {
      console.log(response.data);
      dispatch(ActionsHome.SetTable(response.data.table));
      dispatch(ActionsHome.SetRoutes(response.data.routes));
    })
    .catch((error) => {
      // Manejar el error aquí
      console.error(error);
    });
};
