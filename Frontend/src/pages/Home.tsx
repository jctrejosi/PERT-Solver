import { useState } from "react";
import { HomeContainer } from "../styles/AppStyles";
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Navbar } from "../components/Navbar";
import { ActivityForm } from "../components/ActivityForm";
import { ActivityList } from "../components/ActivityList";
import { ReportsPanel } from "../components/ReportsPanel";
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
    <HomeContainer>
      <Navbar />
      <Container
        maxWidth="xl"
        style={{ flex: 1, display: "flex", padding: 0, width: "100%" }}
      >
        <Grid2 container spacing={2} style={{ height: "100%", width: "100%" }}>
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
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
          </Grid2>
          <Grid2
            sx={{ height: "calc(100% - 1rem)", overflowY: "auto", flex: 2 }}
          >
            <ReportsPanel />
          </Grid2>
        </Grid2>
      </Container>
    </HomeContainer>
  );
}
