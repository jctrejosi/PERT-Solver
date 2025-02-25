import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "@store/hooks";
import { RootState } from "@store/index";

export function ActivitiesTable() {
  const table = useAppSelector((state: RootState) => state.home.table);

  return (
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: (theme) => theme.palette.background.default }}>
          <TableRow>
            <TableCell align="center" sx={{ color: (theme) => theme.palette.common.black, fontWeight: "bold" }}>
              Nombre
            </TableCell>
            <TableCell align="center" sx={{ color: (theme) => theme.palette.common.black, fontWeight: "bold" }}>
              Predecesoras
            </TableCell>
            <TableCell align="center" sx={{ color: (theme) => theme.palette.common.black, fontWeight: "bold" }}>
              Tiempo Promedio
            </TableCell>
            <TableCell align="center" sx={{ color: (theme) => theme.palette.common.black, fontWeight: "bold" }}>
              Varianza
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.precedents.join(", ")}</TableCell>
              <TableCell align="center">{row.average_time}</TableCell>
              <TableCell align="center">{row.variance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
