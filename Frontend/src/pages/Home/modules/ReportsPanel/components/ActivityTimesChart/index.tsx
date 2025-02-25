import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, LabelList } from "recharts";
import { AcitvityTimes, Activity } from "@customTypes/core";
import { useTheme } from '@mui/material/styles';

type props = {
  activityTimes: AcitvityTimes[]
}
export function ActivityTimesChart({ activityTimes }: props) {
  // Convertir el objeto en un array compatible con Recharts
  const theme = useTheme();

  const data = Object.entries(activityTimes).map(([name, times]) => ({
    name,
    earliest_duration: times.earliest_finish - times.earliest_start,
    latest_duration: times.latest_finish - times.latest_start,
    earliest_start: times.earliest_start,
    latest_start: times.latest_start,
    slack: times.slack,
  }));

  return (
    <ResponsiveContainer width="100%" height={800}>
      <BarChart layout="vertical" data={data} margin={{ top: 20, right: 30, left: 150, bottom: 5 }}>
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />

        <Legend />

        {/* Barra invisible para alinear la actividad temprana */}
        <Bar dataKey="earliest_start" stackId="a" fill="transparent" />
        {/* Barra de actividades tempranas (azul) */}
        <Bar dataKey="earliest_duration" stackId="a" fill={theme.palette.primary.main} name="Temprano">
          {/* Etiqueta estática para la holgura */}
          <LabelList dataKey="slack" position="right" fill="black" fontSize={12} formatter={(slack: Activity) => (slack ? `Holgura: ${slack}` : "")} />
        </Bar>


        {/* Barra invisible para alinear la actividad tardía */}
        <Bar dataKey="latest_start" stackId="b" fill="transparent" />
        {/* Barra de actividades tardías (verde) */}
        <Bar dataKey="latest_duration" stackId="b" fill={theme.palette.secondary.main} name="Tardío" />
      </BarChart>
    </ResponsiveContainer>
  );
}
