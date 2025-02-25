import { Typography, Box } from "@mui/material";
import { GraphView } from "./components/GraphView";
import { ReactFlowProvider } from "@xyflow/react";
import { useAppSelector } from "@store/hooks";
import { GetStateHome } from "../../slice";
import { ActivitiesTable } from "./components/ActivitiesTable";
import { useState } from "react";
import Expand from "@mui/icons-material/Expand";
import RoutesList from "./components/RoutesList";
import { ActivityTimesChart } from "./components/ActivityTimesChart";

export function ReportsPanel() {
  const STATE = useAppSelector(GetStateHome);
  const [graphHeight, setGraphHeight] = useState(320);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = graphHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const newHeight = Math.max(50, startHeight + (e.clientY - startY));
      setGraphHeight(newHeight);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
        gap: 2,
        scrollbarWidth: "thin",
        padding: "0 1rem",
      }}
    >
      <Typography variant="h6">Grafo de rutas</Typography>

      <Box sx={{ height: graphHeight, flexShrink: 0, position: "relative" }}>
        <ReactFlowProvider>
          <GraphView activities={STATE.activities} />
        </ReactFlowProvider>
      </Box>

      <Box
        sx={(theme) => ({
          minHeight: "20px",
          width: "100%",
          backgroundColor: theme.palette.grey[300],
          cursor: "ns-resize",
          "&:hover": { backgroundColor: theme.palette.grey[500] },
          top: "-1rem",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        })}
        onMouseDown={handleMouseDown}
      >
        <Expand
          sx={(theme) => ({
            fontSize: "1rem",
            color: theme.palette.grey[800],
          })}
        />
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6">Lista de rutas</Typography>
        <RoutesList />
        <Typography variant="h6">Tabla de actividades con sus varianzas</Typography>
        <ActivitiesTable />
        <Typography variant="subtitle1">La probabilidad de completar el proyecto en {STATE.expected_time} unidades de tiempo es de {STATE.probability}%</Typography>
        <ActivityTimesChart activityTimes={STATE.activity_times} />
      </Box>
    </Box>
  );
}
