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
    <TableContainer component={Paper} sx={{ height: "20rem", width: "40rem" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "22%" }} align="left">
              Nombre
            </TableCell>
            <TableCell sx={{ width: "22%" }} align="left">
              Precedentes
            </TableCell>
            <TableCell sx={{ width: "22%" }}>Tiempo Promedio</TableCell>
            <TableCell sx={{ width: "22%" }}>Varianza</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.precedents.join(", ")}</TableCell>
              <TableCell align="right">{row.average_time}</TableCell>
              <TableCell align="right">{row.variance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
