import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Activity, Route, TableVariance } from "@customTypes/core";
import { exampleActivities } from "./Examples/activities";

const initialState = {
  activities: exampleActivities as Activity[],
  table: [] as TableVariance[],
  routes: [] as Route[],
  expected_time: 31,
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

    ResetState: () => initialState,
  },
});

export const ActionsHome = homeSlice.actions;

export const GetStateHome = (state: RootState) => state.home;

export default homeSlice.reducer;
