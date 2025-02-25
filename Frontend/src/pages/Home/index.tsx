import { Container, Grid2 } from "@mui/material";
import { Navbar } from "@layouts/Navbar";
import { ReportsPanel } from "./modules/ReportsPanel";
import { ActivityManager } from "./modules/ActivityManager";

export function Home() {
  return (
    <Grid2 container spacing={2} style={{ height: "100%", width: "100%" }}>
      <Navbar />
      <Container
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 6rem)",
          overflowY: "auto",
          width: "17rem",
          "@media (min-width: 600px)": {
            paddingRight: 1,
          },
          borderRight: `1px solid ${theme.palette.divider}`,
        })}
      >
        <ActivityManager />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 6.4rem)",
          overflowY: "auto",
          flex: 2,
          "@media (min-width: 600px)": {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
      >
        <ReportsPanel />
      </Container>
    </Grid2>
  );
}
