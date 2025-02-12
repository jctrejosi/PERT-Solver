import { Container, Grid2 } from "@mui/material";
import { Navbar } from "@layouts/Navbar";
import { ReportsPanel } from "./modules/ReportsPanel";
import { ActivityManager } from "./modules/ActivityManager";

export function Home() {
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
        <ActivityManager />
      </Container>
      <Container
        sx={(theme) => ({
          padding: 2,
          gap: 4,
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 1rem)",
          overflowY: "auto",
          flex: 2,
          borderLeft: `.1rem solid ${theme.palette.divider}`,
        })}
      >
        <ReportsPanel />
      </Container>
    </Grid2>
  );
}
