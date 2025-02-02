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

  const [errors, setErrors] = useState({
    name: false,
    cost: false,
    optimist: false,
    probable: false,
    pessimist: false,
    acceleration: false,
    accelerationCost: false,
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
    setErrors({ ...errors, [name as string]: false });
  };

  const handleChangeDependencie = () => {};

  const handleSubmit = () => {
    const newErrors = {
      name: activity.name === "",
      cost: activity.cost === "",
      optimist: false,
      probable: false,
      pessimist: false,
      acceleration: false,
      accelerationCost: false,
    };

    if (activity.optimist && (!activity.probable || !activity.pessimist)) {
      newErrors.probable = activity.probable === "";
      newErrors.pessimist = activity.pessimist === "";
    }

    if (activity.probable && !activity.optimist) {
      newErrors.optimist = activity.optimist === "";
    }

    if (!activity.optimist && !activity.probable && !activity.pessimist) {
      newErrors.probable = activity.probable === "";
    }

    if (activity.acceleration && !activity.accelerationCost) {
      newErrors.accelerationCost = activity.accelerationCost === "";
    }

    if (activity.accelerationCost && !activity.acceleration) {
      newErrors.acceleration = activity.acceleration === "";
    }

    if (
      newErrors.name ||
      newErrors.cost ||
      newErrors.optimist ||
      newErrors.probable ||
      newErrors.pessimist ||
      newErrors.acceleration ||
      newErrors.accelerationCost
    ) {
      setErrors(newErrors);
      return;
    }

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
          error={errors.name}
          helperText={errors.name ? "Este campo es obligatorio" : ""}
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
              error={errors.optimist}
              helperText={errors.optimist ? "Este campo es obligatorio" : ""}
            />
          </Grid>
          <Grid size="grow">
            <TextField
              label="Probable"
              type="number"
              name="probable"
              value={activity.probable}
              onChange={handleChange}
              error={errors.probable}
              helperText={errors.probable ? "Este campo es obligatorio" : ""}
            />
          </Grid>
          <Grid size="grow">
            <TextField
              label="Pesimista"
              type="number"
              name="pessimist"
              value={activity.pessimist}
              onChange={handleChange}
              error={errors.pessimist}
              helperText={errors.pessimist ? "Este campo es obligatorio" : ""}
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
            error={errors.cost}
            helperText={errors.cost ? "Este campo es obligatorio" : ""}
          />
        </Grid>
        <Grid width="100%">
          <TextField
            label="Aceleración aplicable"
            type="number"
            name="acceleration"
            value={activity.acceleration}
            onChange={handleChange}
            fullWidth
            error={errors.acceleration}
            helperText={errors.acceleration ? "Este campo es obligatorio" : ""}
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
            error={errors.accelerationCost}
            helperText={
              errors.accelerationCost ? "Este campo es obligatorio" : ""
            }
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
