import { Activity } from "@customTypes/core";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { ActionsHome, GetStateHome } from "../slice";
import { ActivityFormModal } from "@components/ActivityFormModal";
import { ActivityList } from "@components/ActivityList";
import { useState } from "react";

export function ActivityManager() {
  const disptach = useAppDispatch();
  const STATE = useAppSelector(GetStateHome);

  const [activitySelected, setActivitySelected] = useState<Activity>({
    acceleration: undefined,
    accelerationCost: undefined,
    name: "",
    optimist: undefined,
    probable: 0,
    pessimist: undefined,
    cost: 0,
    precedents: [],
  });

  const handleAddActivity = (newActivity: Activity) => {
    disptach(ActionsHome.SetActivities([...STATE.activities, newActivity]));
  };

  const handleDeleteActivity = (nameActivity: string) => {
    disptach(
      ActionsHome.SetActivities(
        STATE.activities.filter((activity) => activity.name !== nameActivity)
      )
    );
  };

  return (
    <>
      <ActivityFormModal
        predecessorActivities={
          STATE.activities.map((activity) => activity.name) || []
        }
        activitySelected={activitySelected}
        onAddActivity={handleAddActivity}
      />
      <ActivityList
        activities={STATE.activities}
        onEditActivity={(activity) => {
          setActivitySelected(activity);
        }}
        onDeleteActivity={handleDeleteActivity}
      />
    </>
  );
}
