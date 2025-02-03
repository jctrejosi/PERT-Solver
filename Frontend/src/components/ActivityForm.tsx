import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Divider,
  Modal,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Activity } from "../@types/core";

interface ActivityFormProps {
  activitiesList?: string[];
  activitySelected?: Activity;
}

export function ActivityForm({
  activitiesList = ["A", "B"],
  activitySelected = {
    id: {} as number,
    acceleration: {} as number,
    accelerationCost: {} as number,
    name: "",
    optimist: {} as number,
    probable: {} as number,
    pessimist: {} as number,
    cost: {} as number,
    dependencies: [],
  },
}: ActivityFormProps) {
  const [activity, setActivity] = useState({
    ...activitySelected,
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

  const [open, setOpen] = useState(false);

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
      name: activity.name == "",
      cost:
        typeof activity.cost === "object" || typeof activity.cost === "string",
      optimist:
        typeof activity.pessimist !== "object" ||
        typeof activity.pessimist !== "string",
      probable:
        typeof activity.probable === "object" ||
        typeof activity.probable === "string",
      pessimist:
        typeof activity.optimist !== "object" ||
        typeof activity.optimist !== "string",
      acceleration:
        typeof activity.accelerationCost !== "object" ||
        typeof activity.accelerationCost !== "string",
      accelerationCost:
        typeof activity.acceleration !== "object" ||
        typeof activity.acceleration !== "string",
    };

    setErrors(newErrors);

    if (
      newErrors.name ||
      newErrors.cost ||
      newErrors.optimist ||
      newErrors.probable ||
      newErrors.pessimist ||
      newErrors.acceleration ||
      newErrors.accelerationCost
    ) {
      return;
    }

    // Lógica para agregar la actividad
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ width: "100%" }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        endIcon={<AddCircleOutlineIcon />}
        fullWidth
        style={{ marginBottom: "1rem" }}
      >
        Agregar Actividad
      </Button>
      <Modal open={open} onClose={handleClose} style={{ height: "100%" }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 3,
            maxHeight: "90vh",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "2px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" gutterBottom>
              Formulario de Actividad
            </Typography>
            <Button
              onClick={handleClose}
              type="button"
              style={{ minWidth: "auto" }}
            >
              X
            </Button>
          </Box>
          <Divider />
          <form>
            <Grid container spacing={1}>
              <TextField
                label="Nombre de la actividad"
                name="name"
                size="small"
                value={activity.name}
                onChange={handleChange}
                fullWidth
                error={errors.name}
                helperText={errors.name ? "Este campo es obligatorio" : ""}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Dependencia
                </InputLabel>
                <Select
                  size="medium"
                  multiple
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={activity.dependencies}
                  label="Dependencias"
                  onChange={handleChangeDependencie}
                >
                  {activitiesList.map((activityName, index) => (
                    <MenuItem key={index} value={activityName}>
                      {activityName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <p style={{ width: "100%", margin: 0, fontSize: "1rem" }}>
                Tiempos
              </p>
              <Grid container>
                <Grid size="grow">
                  <TextField
                    variant="filled"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    size="small"
                    label="Optimista"
                    name="optimist"
                    type="number"
                    value={activity.optimist}
                    onChange={handleChange}
                    error={errors.optimist}
                    helperText={
                      errors.optimist ? "Este campo es obligatorio" : ""
                    }
                  />
                </Grid>
                <Grid size="grow">
                  <TextField
                    variant="filled"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    size="small"
                    label="Probable"
                    type="number"
                    name="probable"
                    value={activity.probable}
                    onChange={handleChange}
                    error={errors.probable}
                    helperText={
                      errors.probable ? "Este campo es obligatorio" : ""
                    }
                  />
                </Grid>
                <Grid size="grow">
                  <TextField
                    variant="filled"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    size="small"
                    label="Pesimista"
                    type="number"
                    name="pessimist"
                    value={activity.pessimist}
                    onChange={handleChange}
                    error={errors.pessimist}
                    helperText={
                      errors.pessimist ? "Este campo es obligatorio" : ""
                    }
                  />
                </Grid>
              </Grid>
              <Grid width="100%">
                <TextField
                  label="Costo"
                  type="number"
                  name="cost"
                  size="small"
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
                  size="small"
                  value={activity.acceleration}
                  onChange={handleChange}
                  fullWidth
                  error={errors.acceleration}
                  helperText={
                    errors.acceleration ? "Este campo es obligatorio" : ""
                  }
                />
              </Grid>
              <Grid width="100%">
                <TextField
                  label="Costo de aceleración"
                  type="number"
                  name="accelerationCost"
                  size="small"
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Agregar Actividad
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
