import { Paper, Typography } from "@mui/material";

export function ReportsPanel() {
  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Gráfico de Red PERT</Typography>
      {/* Aquí iría el componente del gráfico de red PERT */}
      <Typography variant="h6">Gráfico de Distribución de Tiempos</Typography>
      {/* Aquí iría el componente del gráfico de distribución de tiempos */}
      <Typography variant="h6">Tabla de Resultados</Typography>
      {/* Aquí iría la tabla de resultados */}
    </Paper>
  );
}
