import { Container, Grid } from "@mui/material";
import { Navbar } from "./components/Navbar";
import { ActivityForm } from "./components/ActivityForm";
import { ActivityList } from "./components/ActivityList";
import { ReportsPanel } from "./components/ReportsPanel";
import { ProgressSection } from "./components/ProgressSection";

export function App() {
  return (
    <div>
      <Navbar />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ActivityForm />
            <ActivityList />
          </Grid>
          <Grid item xs={12} md={8}>
            <ReportsPanel />
          </Grid>
        </Grid>
        <ProgressSection />
      </Container>
    </div>
  );
}
