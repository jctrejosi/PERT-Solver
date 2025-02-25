import { AcitvityTimes, Route, TableVariance, Activity as Task } from "@customTypes/core";
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
  activity_times: AcitvityTimes[];
  probability: {
    Z_score: number;
    completion_probability: number;
  };
};

export const ApiCalculatePert = (
  params: ParamsSetCalculatePert,
  dispatch: Dispatch
) => {
  axios
    .post<RequestCalculatePert>("/api/v1.0/calculatePert", params)
    .then((response) => {
      dispatch(ActionsHome.SetTable(response.data.table));
      dispatch(ActionsHome.SetRoutes(response.data.routes));
      dispatch(ActionsHome.SetActivityTimes(response.data.activity_times));
      dispatch(ActionsHome.SetProbability(response.data.probability.completion_probability));
    })
    .catch((error) => {
      console.error(error);
    });
};
