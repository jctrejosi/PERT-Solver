import { Paper, Typography } from "@mui/material";

export function ProgressSection() {
  return (
    <Paper style={{ padding: 16, marginTop: 16 }}>
      <Typography variant="h6">Historial de Cálculos</Typography>
      {/* Aquí iría el historial de cálculos */}
      <Typography variant="h6">Paso Aplicado</Typography>
      {/* Aquí iría la información sobre el paso aplicado */}
    </Paper>
  );
}
