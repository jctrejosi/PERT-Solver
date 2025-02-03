import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export function ActivityList() {
  const activities = [
    { name: "Actividad 1", optimist: 2, probable: 4, pessimist: 6 },
    { name: "Actividad 1", probable: 4 },
    { name: "Actividad 1", optimist: 2, probable: 4, pessimist: 6 },
    { name: "Actividad 1", optimist: 2, probable: 4, pessimist: 6 },
    { name: "Actividad 1", optimist: 2, probable: 4, pessimist: 6 },
    { name: "Actividad 1", optimist: 2, probable: 4, pessimist: 6 },
    { name: "Actividad 1", optimist: 2, probable: 4, pessimist: 6 },
    { name: "Actividad 1", optimist: 2, probable: 4, pessimist: 6 },
  ];

  return (
    <List
      style={{
        overflowY: "auto",
        flexGrow: 1,
        maxHeight: "calc(100vh - 8rem)",
        paddingTop: 0,
      }}
    >
      {activities.map((activity, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={activity.name}
            secondary={`${activity.optimist ? activity.optimist + " / " : ""}${
              activity.probable
            }${activity.pessimist ? " / " + activity.pessimist : ""}`}
          />
          <IconButton edge="end" aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}
