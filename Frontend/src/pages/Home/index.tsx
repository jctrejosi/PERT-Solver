import { useState } from "react";
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Navbar } from "@layouts/Navbar";
import { ActivityForm } from "@components/ActivityForm";
import { ActivityList } from "@components/ActivityList";
import { ReportsPanel } from "./modules/ReportsPanel";
import { Activity } from "@customTypes/core";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { ActionsHome, GetStateHome } from "./slice";

export function Home() {
  const disptach = useAppDispatch();
  const STATE = useAppSelector(GetStateHome);

  const [activitySelected, setActivitySelected] = useState({} as Activity);

  const handleAddActivity = (newActivity: Activity) => {
    disptach(ActionsHome.SetActivities([...STATE.activities, newActivity]));
  };

  const handleDeleteActivity = (nameActivity: string) => {
    disptach(
      ActionsHome.SetActivities(
        STATE.activities.filter((activity) => activity.name !== nameActivity)
      )
    );
  };

  return (
    <Grid2
      container
      spacing={2}
      style={{ height: "100%", width: "100%", overflow: "hidden" }}
    >
      <Navbar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100%-6.4rem)",
          overflowY: "auto",
          pr: 2,
          width: "17rem",
          pl: 2,
        }}
      >
        <ActivityForm
          activitiesSelectedDefault={STATE.activities.map(
            (activity) => activity.name
          )}
          activitySelected={activitySelected}
          onAddActivity={handleAddActivity}
        />
        <ActivityList
          activities={STATE.activities}
          onEditActivity={(activity) => {
            setActivitySelected(activity);
          }}
          onDeleteActivity={handleDeleteActivity}
        />
      </Container>
      <ReportsPanel />
    </Grid2>
  );
}
