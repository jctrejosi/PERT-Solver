import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Activity } from "@customTypes/core";

const initialState = {
  activities: [] as Activity[],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    SetActivities: (state, newValue: PayloadAction<Activity[]>) => ({
      ...state,
      activities: newValue.payload,
    }),

    ResetState: () => initialState,
  },
});

export const ActionsHome = homeSlice.actions;

export const GetStateHome = (state: RootState) => state.home;

export default homeSlice.reducer;
