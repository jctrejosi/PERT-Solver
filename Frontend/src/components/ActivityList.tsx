import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Activity } from "../@types/core";

export function ActivityList() {
  const activities: Activity[] = [];

  return (
    <List
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        flexGrow: 1,
        maxHeight: "calc(100vh - 8rem)",
        paddingTop: 0,
        paddingRight: 5,
        scrollbarWidth: "thin",
        width: "100%",
      }}
    >
      {activities.map((activity, index) => (
        <ListItem
          key={index}
          sx={{
            alignItems: "center",
            borderBottom: "1px solid #ccc",
            padding: "10px 0",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
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
