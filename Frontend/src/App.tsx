import { AppContainer } from "./styles/AppStyles";
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Grid2"; // Grid2 is the new component
import { Navbar } from "./components/Navbar";
import { ActivityForm } from "./components/ActivityForm";
import { ActivityList } from "./components/ActivityList";
import { ReportsPanel } from "./components/ReportsPanel";

export function App() {
  return (
    <AppContainer>
      <Navbar />
      <Container maxWidth="xl" style={{ flex: 1, display: "flex", padding: 0 }}>
        <Grid2 container spacing={2} style={{ height: "100%" }}>
          <Grid2
            sx={{
              height: "100%",
              overflowY: "auto",
              pr: 2,
              flex: 1,
              maxWidth: "20rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ActivityForm />
            <ActivityList />
          </Grid2>
          <Grid2
            sx={{ height: "calc(100% - 1rem)", overflowY: "auto", flex: 2 }}
          >
            <ReportsPanel />
          </Grid2>
        </Grid2>
      </Container>
    </AppContainer>
  );
}
