import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface ActivityFormProps {
  activities?: string[];
}

export function ActivityForm({ activities = ["A", "B"] }: ActivityFormProps) {
  const [activity, setActivity] = useState({
    acceleration: "",
    accelerationCost: "",
    name: "",
    optimist: "",
    probable: "",
    pessimist: "",
    cost: "",
    dependencies: [],
    dependenciesSelected: [],
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target as
      | HTMLInputElement
      | { name?: string; value: unknown };
    setActivity({ ...activity, [name as string]: value });
  };

  const handleChangeDependencie = () => {};

  const handleSubmit = () => {
    // Lógica para agregar la actividad
  };

  return (
    <form>
      <Grid container spacing={2}>
        <TextField
          label="Nombre de la actividad"
          name="name"
          value={activity.name}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Dependencia</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={activity.dependenciesSelected}
            label="Dependencias"
            onChange={handleChangeDependencie}
          >
            {activities.map((activityName, index) => (
              <MenuItem key={index} value={activityName}>
                {activityName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <h3 style={{ width: "100%" }}>Tiempos</h3>
        <Grid container>
          <Grid size="grow">
            <TextField
              label="Optimista"
              name="optimist"
              type="number"
              value={activity.optimist}
              onChange={handleChange}
            />
          </Grid>
          <Grid size="grow">
            <TextField
              label="Probable"
              type="number"
              name="probable"
              value={activity.probable}
              onChange={handleChange}
            />
          </Grid>
          <Grid size="grow">
            <TextField
              label="Pesimista"
              type="number"
              name="pessimist"
              value={activity.pessimist}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid width="100%">
          <TextField
            label="Costo"
            type="number"
            name="cost"
            value={activity.cost}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid width="100%">
          <TextField
            label="Aceleració aplicable"
            type="number"
            name="acceleration"
            value={activity.acceleration}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid width="100%">
          <TextField
            label="Costo de aceleración"
            type="number"
            name="accelerationCost"
            value={activity.accelerationCost}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid width="100%">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Agregar Actividad
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
