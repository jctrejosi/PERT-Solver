import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Activity } from "../@types/core";

export type ActivityListProps = {
  activities?: Activity[];
  onDeleteActivity?: (name: string) => void;
  onEditActivity?: (activity: Activity) => void;
};

export function ActivityList({
  activities = [],
  onDeleteActivity = () => {},
  onEditActivity = () => {},
}: ActivityListProps) {
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
            primary={
              <>
                {activity.name}
                <br />
                <Typography variant="body2" color="text.secondary">
                  (
                  {activity.dependencies
                    ? activity.dependencies.join(", ")
                    : " - "}
                  )
                </Typography>
              </>
            }
            secondary={
              <>
                {`${activity.optimist ? activity.optimist + " / " : ""}${
                  activity.probable
                }${activity.pessimist ? " / " + activity.pessimist : ""} T`}
                <br />
                <Typography variant="body2" color="text.secondary">
                  Costo: {activity.cost ?? "N/A"}
                </Typography>
              </>
            }
          />

          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => onEditActivity(activity)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDeleteActivity(activity.name)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}
