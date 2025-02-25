import { AcitvityTimes } from "@customTypes/core";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from '@mui/material/styles';

export type ActivityTimelineProps = {
  activityTimes: AcitvityTimes[];
};

export function PeriodTimesChart({ activityTimes }: ActivityTimelineProps) {
  const theme = useTheme();

  const timeMap: Record<number, { early: number; late: number }> = {};

  // Construir el histograma de concurrencia
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

 // Ordenamos los tiempos y generamos la sumatoria acumulativa
 const sortedTimes = Object.keys(timeMap).map(Number).sort((a, b) => a - b);
 let earlySum = 0;
 let lateSum = 0;

 const data = sortedTimes.map((time) => {
   earlySum += timeMap[time].early; // Suma acumulativa de actividades tempranas
   lateSum += timeMap[time].late; // Suma acumulativa de actividades tardías

    return {
      time,
      early: earlySum,
      late: lateSum,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 50, bottom: 5 }}>
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
