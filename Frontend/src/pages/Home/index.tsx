import { Container, Grid2 } from "@mui/material";
import { Navbar } from "@layouts/Navbar";
import { ReportsPanel } from "./modules/ReportsPanel";
import { ActivityManager } from "./modules/ActivityManager";

export function Home() {
  return (
    <Grid2 container spacing={2} style={{ height: "100%", width: "100%" }}>
      <Navbar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 6.4rem)",
          overflowY: "auto",
          pr: 2,
          width: "17rem",
          pl: 2,
        }}
      >
        <ActivityManager />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 6.4rem)",
          overflowY: "auto",
          width: "calc(100% - 17rem)",
          flex: 2,
          paddingRight: 0,
          padding: 0,
        }}
      >
        <ReportsPanel />
      </Container>
    </Grid2>
  );
}
