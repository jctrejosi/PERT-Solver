import { Typography, Box } from "@mui/material";
import { GraphView } from "./components/GraphView";
import { ReactFlowProvider } from "@xyflow/react";
import { useAppSelector } from "@store/hooks";
import { GetStateHome } from "../../slice";
import { ActivitiesTable } from "./ActivitiesTable";

export function ReportsPanel() {
  const STATE = useAppSelector(GetStateHome);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
        gap: 2,
        scrollbarWidth: "thin",
        padding: "0 1rem",
      }}
    >
      <Typography variant="h6">Grafo de rutas</Typography>
      <Box sx={{ height: "20rem", flexShrink: 0 }}>
        <ReactFlowProvider>
          <GraphView activities={STATE.activities} />
        </ReactFlowProvider>
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6">Lista de rutas</Typography>
        <Typography variant="h6">Tabla de varianzas</Typography>
        <ActivitiesTable />
      </Box>
    </Box>
  );
}
