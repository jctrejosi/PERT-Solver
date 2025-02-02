import { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

export function ActivityForm() {
  const [activity, setActivity] = useState({
    name: "",
    optimist: "",
    probable: "",
    pessimist: "",
    dependencies: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Lógica para agregar la actividad
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nombre de la actividad"
            name="name"
            value={activity.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Optimista"
            name="optimist"
            value={activity.optimist}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Probable"
            name="probable"
            value={activity.probable}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Pesimista"
            name="pessimist"
            value={activity.pessimist}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Dependencias"
            name="dependencies"
            value={activity.dependencies}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Agregar Actividad
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
