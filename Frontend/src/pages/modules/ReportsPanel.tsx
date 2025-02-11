import { Grid2, Typography } from "@mui/material";
import GraphView from "@components/GraphView";
import { ReactFlowProvider } from "@xyflow/react";

export function ReportsPanel() {
  return (
    <Grid2
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
      <ReactFlowProvider>
        <GraphView />
      </ReactFlowProvider>
      {/* Aquí iría el componente del gráfico de red PERT */}
      <Typography variant="h6">Gráfico de Distribución de Tiempos</Typography>
      {/* Aquí iría el componente del gráfico de distribución de tiempos */}
      <Typography variant="h6">Tabla de Resultados</Typography>
      {/* Aquí iría la tabla de resultados */}
    </Grid2>
  );
}
