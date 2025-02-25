import { AcitvityTimes } from "@customTypes/core";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from '@mui/material/styles';

export type ActivityTimelineProps = {
  activityTimes: AcitvityTimes[];
};

export function ActivityTimelineChart({ activityTimes }: ActivityTimelineProps) {
  const theme = useTheme();

  const timeMap: Record<number, { early: number; late: number }> = {};

  // Recorrer las actividades y llenar el conteo de concurrencia en cada unidad de tiempo
  activityTimes.forEach(({ earliest_start, earliest_finish, latest_start, latest_finish }) => {
    for (let t = Math.floor(earliest_start); t < Math.ceil(earliest_finish); t++) {
      if (!timeMap[t]) timeMap[t] = { early: 0, late: 0 };
      timeMap[t].early += 1;
    }
    for (let t = Math.floor(latest_start); t < Math.ceil(latest_finish); t++) {
      if (!timeMap[t]) timeMap[t] = { early: 0, late: 0 };
      timeMap[t].late += 1;
    }
  });

  // Convertir el objeto a un array para Recharts
  const data = Object.entries(timeMap).map(([time, counts]) => ({
    time: Number(time),
    early: counts.early,
    late: counts.late,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis type="number" dataKey="time" domain={["auto", "auto"]} />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Línea de actividades tempranas */}
        <Line type="monotone" dataKey="early" stroke={theme.palette.primary.main} name="Tempranas" strokeWidth={3} />
        {/* Línea de actividades tardías */}
        <Line type="monotone" dataKey="late" stroke={theme.palette.secondary.main} name="Tardías" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
