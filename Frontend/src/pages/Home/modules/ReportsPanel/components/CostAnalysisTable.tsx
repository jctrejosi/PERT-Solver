import { ActivityCost } from "@customTypes/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export type CostAnalysisTableProps = {
  activities: ActivityCost[];
};

export function CostAnalysisTable({ activities }: CostAnalysisTableProps) {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Análisis de Costos por Actividad
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Actividad</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Costo Planeado</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Costo Real</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Valor Ganado</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Variación de Costos</strong>
            </TableCell>
            <TableCell align="center">
              <strong>CPI</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.activity}>
              <TableCell>{activity.activity}</TableCell>
              <TableCell align="center">
                ${activity.planned_cost.toLocaleString()}
              </TableCell>
              <TableCell align="center">
                ${activity.actual_cost.toLocaleString()}
              </TableCell>
              <TableCell align="center">
                ${activity.earned_value.toLocaleString()}
              </TableCell>
              <TableCell align="center">
                ${activity.cost_variance.toLocaleString()}
              </TableCell>
              <TableCell align="center">{activity.CPI.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
