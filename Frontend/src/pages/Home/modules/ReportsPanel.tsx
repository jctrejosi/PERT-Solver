import { Grid2, Typography, Box } from "@mui/material";
import { GraphView } from "@components/GraphView";
import { ReactFlowProvider } from "@xyflow/react";
import { useAppSelector } from "@store/hooks";
import { GetStateHome } from "../slice";

export function ReportsPanel() {
  const STATE = useAppSelector(GetStateHome);

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
      <Box sx={{ height: "15rem" }}>
        <ReactFlowProvider>
          <GraphView activities={STATE.activities} />
        </ReactFlowProvider>
      </Box>
      <Typography variant="h6">Gráfico de Distribución de Tiempos</Typography>
      {/* Aquí iría el componente del gráfico de distribución de tiempos */}
      <Typography variant="h6">Tabla de Resultados</Typography>
      {/* Aquí iría la tabla de resultados */}
    </Grid2>
  );
}
