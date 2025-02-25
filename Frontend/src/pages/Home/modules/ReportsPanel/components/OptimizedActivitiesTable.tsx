import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "@store/hooks";
import { RootState } from "@store/index";

export function OptimizedActivitiesTable() {
  const optimized_activities = useAppSelector((state: RootState) => state.home.optimized_activities);
  const total_acceleration_cost = useAppSelector((state: RootState) => state.home.total_acceleration_cost);

  return (
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: (theme) => theme.palette.background.default }}>
          <TableRow>
            <TableCell align="center" sx={{ color: (theme) => theme.palette.common.black, fontWeight: "bold" }}>
              Actividad
            </TableCell>
            <TableCell align="center" sx={{ color: (theme) => theme.palette.common.black, fontWeight: "bold" }}>
              Tiempo reducido
            </TableCell>
            <TableCell align="center" sx={{ color: (theme) => theme.palette.common.black, fontWeight: "bold" }}>
              Costo de aceleración por unidad
            </TableCell>
            <TableCell align="center" sx={{ color: (theme) => theme.palette.common.black, fontWeight: "bold" }}>
              Costo total de aceleración
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {optimized_activities.length > 0 && optimized_activities.map((row) => (
            <TableRow
              key={row.activity}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.activity}
              </TableCell>
              <TableCell align="center">{row.time_reduced}</TableCell>
              <TableCell align="center">{Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(row.acceleration_cost_per_unit)}</TableCell>
              <TableCell align="center">{Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(row.total_acceleration_cost)}</TableCell>
            </TableRow>
          ))}
          {optimized_activities.length > 0 && (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0, backgroundColor: (theme) => theme.palette.primary.light } }}
            >
              <TableCell component="th" scope="row" align="right" colSpan={3} sx={{  fontWeight: "bold" }}>
                Costo total de aceleración
              </TableCell>
              <TableCell align="center" sx={{  fontWeight: "bold" }}>
                {Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(total_acceleration_cost)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
