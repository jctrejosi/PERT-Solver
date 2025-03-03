import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import {
  AcitvityTimes,
  Activity,
  ActivityInform,
  Route,
  TableVariance,
} from "@customTypes/core";
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
  critical_path: [] as string[],
  showInform: false,
  actual_time: undefined as number | undefined,
  activities_inform: [] as ActivityInform[],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    SetActivitiesInform: (
      state,
      newValue: PayloadAction<ActivityInform[]>
    ) => ({
      ...state,
      activities_inform: newValue.payload,
    }),

    SetActualTime: (state, newValue: PayloadAction<number>) => ({
      ...state,
      actual_time: newValue.payload,
    }),

    SetActivities: (state, newValue: PayloadAction<Activity[]>) => ({
      ...state,
      activities: newValue.payload,
    }),

    SetShowInform: (state, newValue: PayloadAction<boolean>) => ({
      ...state,
      showInform: newValue.payload,
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

    SetOptimizedActivities: (
      state,
      newValue: PayloadAction<OptimizedActivitiesT[]>
    ) => ({
      ...state,
      optimized_activities: newValue.payload,
    }),

    SetTotalAccelerationCost: (state, newValue: PayloadAction<number>) => ({
      ...state,
      total_acceleration_cost: newValue.payload,
    }),

    SetCriticalPath: (state, newValue: PayloadAction<string[]>) => ({
      ...state,
      critical_path: newValue.payload,
    }),

    ResetState: () => initialState,
  },
});

export const ActionsHome = homeSlice.actions;

export const GetStateHome = (state: RootState) => state.home;

export default homeSlice.reducer;
