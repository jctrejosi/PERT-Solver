import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { AcitvityTimes, Activity, Route, TableVariance } from "@customTypes/core";
import { exampleActivities } from "./Examples/activities";
import { OptimizedActivitiesT } from "./services/calculatePert";

const initialState = {
  activities: exampleActivities as Activity[],
  table: [] as TableVariance[],
  routes: [] as Route[],
  expected_time: 31,
  activity_times: [] as AcitvityTimes[],
  probability: 0,
  optimized_activities: [] as OptimizedActivitiesT[],
  total_acceleration_cost: 0,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    SetActivities: (state, newValue: PayloadAction<Activity[]>) => ({
      ...state,
      activities: newValue.payload,
    }),

    SetExpectedTime: (state, newValue: PayloadAction<number>) => ({
      ...state,
      expected_time: newValue.payload,
    }),

    SetTable: (state, newValue: PayloadAction<TableVariance[]>) => ({
      ...state,
      table: newValue.payload,
    }),

    SetRoutes: (state, newValue: PayloadAction<Route[]>) => ({
      ...state,
      routes: newValue.payload,
    }),

    SetActivityTimes: (state, newValue: PayloadAction<AcitvityTimes[]>) => ({
      ...state,
      activity_times: newValue.payload,
    }),

    SetProbability: (state, newValue: PayloadAction<number>) => ({
      ...state,
      probability: newValue.payload,
    }),

    SetOptimizedActivities: (state, newValue: PayloadAction<OptimizedActivitiesT[]>) => ({
      ...state,
      optimized_activities: newValue.payload,
    }),

    SetTotalAccelerationCost: (state, newValue: PayloadAction<number>) => ({
      ...state,
      total_acceleration_cost: newValue.payload,
    }),

    ResetState: () => initialState,
  },
});

export const ActionsHome = homeSlice.actions;

export const GetStateHome = (state: RootState) => state.home;

export default homeSlice.reducer;
