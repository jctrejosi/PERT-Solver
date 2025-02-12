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
      }}
    >
      <Box sx={{ height: "20rem" }}>
        <ReactFlowProvider>
          <GraphView activities={STATE.activities} />
        </ReactFlowProvider>
      </Box>
      <Box>
        <Typography variant="h6">Tabla de varianzas</Typography>
        <ActivitiesTable />
        <Typography variant="h6">Tabla de Resultados</Typography>
        {/* Aquí iría la tabla de resultados */}
      </Box>
    </Box>
  );
}
