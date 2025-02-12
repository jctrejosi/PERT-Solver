import { Typography, Box } from "@mui/material";
import { GraphView } from "@components/GraphView";
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
        overflowY: "auto", // Habilita scroll en todo el ReportsPanel
      }}
    >
      {/* Grafo con alto fijo */}
      <Box sx={{ height: "20rem", flexShrink: 0 }}>
        <ReactFlowProvider>
          <GraphView activities={STATE.activities} />
        </ReactFlowProvider>
      </Box>

      {/* Contenedor con scroll si crece */}
      <Box
        sx={{
          flex: 1, // Ocupa el espacio restante// Scroll en el contenido restante
        }}
      >
        <Typography variant="h6">Tabla de varianzas</Typography>
        <ActivitiesTable />
        <Typography variant="h6">Tabla de Resultados</Typography>
        {/* Aquí iría la tabla de resultados */}
      </Box>
    </Box>
  );
}
