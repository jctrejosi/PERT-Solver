import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Divider,
  Modal,
  Box,
  SelectChangeEvent,
  MenuItem,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Activity } from "../types/core";

export type ActivityFormProps = {
  activitiesSelectedDefault?: string[];
  activitySelected?: Activity;
  onAddActivity?: (activity: Activity) => void;
};

export const ActivityForm = ({
  activitiesSelectedDefault = [],
  activitySelected = {
    acceleration: undefined as number | undefined,
    accelerationCost: undefined as number | undefined,
    name: "",
    optimist: undefined as number | undefined,
    probable: 0,
    pessimist: undefined as number | undefined,
    cost: 0,
    dependencies: [],
  },
  onAddActivity = () => {},
}: ActivityFormProps) => {
  const [activity, setActivity] = useState({} as Activity);

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
  const [valueSelect, setValueSelect] = useState<string[]>(
    activitiesSelectedDefault
  );

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<{ name?: string; value: number | string }>
  ) => {
    const { name, value } = e.target as
      | HTMLInputElement
      | { name: string; value: number | string };
    let parsedValue: number | string | undefined;
    let parsedError: boolean = false;

    switch (name) {
      case "name":
        parsedValue = value;
        parsedError = value === "";
        break;
      case "cost":
        parsedValue = value === "" ? undefined : Number(value);
        parsedError = value === "";
        break;
      case "optimist":
        parsedValue = value === "" ? undefined : Number(value);
        parsedError = activity.pessimist !== undefined && value === "";
        break;
      case "probable":
        parsedValue = value === "" ? undefined : Number(value);
        parsedError = value === "";
        break;
      case "pessimist":
        parsedValue = value === "" ? undefined : Number(value);
        parsedError = activity.optimist !== undefined && value === "";
        break;
      case "acceleration":
        parsedValue = value === "" ? undefined : Number(value);
        parsedError = activity.accelerationCost !== undefined && value === "";
        break;
      case "accelerationCost":
        parsedValue = value === "" ? undefined : Number(value);
        parsedError = activity.acceleration !== undefined && value === "";
        break;
      default:
        parsedValue = value;
        parsedError = false;
    }

    setActivity({ ...activity, [name]: parsedValue });
    setErrors({ ...errors, [name]: parsedError });
  };

  const handleChangeDependencie = (
    event: SelectChangeEvent<typeof valueSelect>
  ) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === "string" ? value.split(",") : value;
    setValueSelect(newValue);

    setActivity({ ...activity, dependencies: newValue });
  };

  const handleSubmit = () => {
    const newErrors = {
      name: activity.name === undefined || activity.name === "",
      cost: activity.cost === undefined || typeof activity.cost == "object",
      optimist:
        (activity.optimist == undefined ||
          typeof activity.optimist == "object") &&
        activity.pessimist != undefined &&
        typeof activity.pessimist != "object",
      probable:
        activity.probable === undefined || typeof activity.probable == "object",
      pessimist:
        (activity.pessimist == undefined ||
          typeof activity.pessimist == "object") &&
        activity.optimist != undefined &&
        typeof activity.optimist != "object",
      acceleration:
        (activity.acceleration == undefined ||
          typeof activity.acceleration == "object") &&
        activity.accelerationCost != undefined &&
        typeof activity.accelerationCost != "object",
      accelerationCost:
        (activity.accelerationCost == undefined ||
          typeof activity.accelerationCost == "object") &&
        activity.acceleration != undefined &&
        typeof activity.acceleration != "object",
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

    if (activitiesSelectedDefault.includes(activity.name)) {
      setErrors({ ...newErrors, name: true });
      return;
    }

    onAddActivity(activity);
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (activitySelected.name && activitySelected.name !== "") setOpen(true);
    setActivity(activitySelected);
  }, [activitySelected]);

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
            marginBottom={3}
          >
            <Typography variant="h5" gutterBottom>
              Edite los datos de la actividad
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
                helperText={
                  errors.name ? "Este campo es obligatorio e irrepetible" : ""
                }
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Dependencia (De dónde procede la actividad)
                </InputLabel>
                <Select<string[]>
                  size="medium"
                  multiple
                  id="demo-simple-select"
                  value={valueSelect}
                  labelId="demo-simple-select-label"
                  label="Dependencias"
                  input={<OutlinedInput label="Name" />}
                  onChange={handleChangeDependencie}
                >
                  {activitiesSelectedDefault.map((name) => (
                    <MenuItem key={name} value={name}>
                      <ListItemText primary={name} />
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
};
