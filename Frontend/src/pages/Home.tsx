import { useState } from "react";
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Navbar } from "../layouts/Navbar";
import { ActivityForm } from "../components/ActivityForm";
import { ActivityList } from "../components/ActivityList";
import { ReportsPanel } from "./modules/ReportsPanel";
import { Activity } from "../@types/core";

export function Home() {
  const [activitySelected, setActivitySelected] = useState({} as Activity);
  const [activities, setActivities] = useState<Activity[]>([]);

  const handleAddActivity = (newActivity: Activity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  const handleDeleteActivity = (nameActivity: string) => {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.name !== nameActivity)
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
          activitiesSelectedDefault={activities.map(
            (activity) => activity.name
          )}
          activitySelected={activitySelected}
          onAddActivity={handleAddActivity}
        />
        <ActivityList
          activities={activities}
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
