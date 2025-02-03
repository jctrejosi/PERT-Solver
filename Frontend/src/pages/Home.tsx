import { HomeContainer } from "../styles/AppStyles";
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Navbar } from "../components/Navbar";
import { ActivityForm } from "../components/ActivityForm";
import { ActivityList } from "../components/ActivityList";
import { ReportsPanel } from "../components/ReportsPanel";

export function Home() {
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
    </HomeContainer>
  );
}
