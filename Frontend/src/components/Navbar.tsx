import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          PERT-Solver
        </Typography>
        <Button color="inherit">Inicio</Button>
        <Button color="inherit">Ingreso de Actividades</Button>
        <Button color="inherit">Análisis y Gráficos</Button>
        <Button color="inherit">Configuración</Button>
      </Toolbar>
    </AppBar>
  );
};
