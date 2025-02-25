import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, LabelList, Tooltip } from "recharts";
import { AcitvityTimes } from "@customTypes/core";
import { useTheme } from '@mui/material/styles';

type props = {
  activityTimes: AcitvityTimes[]
}
export function ActivityTimesChart({ activityTimes }: props) {
  // Convertir el objeto en un array compatible con Recharts
  const theme = useTheme();

  const data = Object.entries(activityTimes).map(([name, times]) => ({
    name,
    duration: times.earliest_finish - times.earliest_start,
    earliest_finish: times.earliest_finish,
    latest_finish: times.latest_finish,
    earliest_start: times.earliest_start,
    latest_start: times.latest_start,
    slack: times.slack,
  }));

  return (
    <ResponsiveContainer width="100%" height={800}>
      <BarChart layout="vertical" data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }} style={{ display: 'flex', justifyContent: 'center' }}>
        <XAxis type="number" domain={[0, 'dataMax']} />
        <YAxis dataKey="name" type="category" />

        <Tooltip content={({ active, payload }) => {
          if (active && payload && payload.length && payload[0].payload.slack > 0) {
            const slackValue = payload[0].payload.slack;
            return (
              <div style={{ background: "white", padding: "5px", border: "1px solid #ccc" }}>
                <p style={{ margin: 0 }}><strong>Holgura:</strong> {slackValue}</p>
              </div>
            );
          }
          return null;
        }} />
        <Legend />

        {/* Barra invisible para alinear la actividad temprana */}
        <Bar dataKey="earliest_start" stackId="a" fill="transparent" />
        {/* Barra de actividades tempranas (azul) */}
        <Bar dataKey="duration" stackId="a" fill={theme.palette.primary.main} name="Temprano" stroke={theme.palette.primary.main} strokeWidth={3}>
          <LabelList dataKey="earliest_start" position="left" fill="black" fontSize={10} formatter={(value: number) => value === 0 ? '' : Number(value).toFixed(2)} />
          <LabelList dataKey="earliest_finish" position="right" fill="black" fontSize={10} formatter={(value: number) => Number(value).toFixed(2)} />
          {/* Etiqueta estática para la holgura */}
          <LabelList dataKey="duration" position="center" fill="white" fontSize={10} formatter={(duration: number) => duration.toFixed(2)} />
                  {/* Tooltip personalizado que solo muestra la duración */}

        </Bar>

        {/* Barra invisible para alinear la actividad tardía */}
        <Bar dataKey="latest_start" stackId="b" fill="transparent" />
        {/* Barra de actividades tardías (verde) */}
        <Bar dataKey="duration" stackId="b" fill={theme.palette.secondary.main} name="Tardío" stroke={theme.palette.secondary.main} strokeWidth={3}>
          <LabelList dataKey="latest_start" position="left" fill="black" fontSize={10} formatter={(value: number) => value === 0 ? '' : Number(value).toFixed(2)} />
          <LabelList dataKey="latest_finish" position="right" fill="black" fontSize={10} formatter={(value: number) => Number(value).toFixed(2)} />
          {/* Etiqueta estática para la duración */}
          <LabelList dataKey="duration" position="center" fill="white" fontSize={10} formatter={(duration: number) => duration.toFixed(2)} />
                  {/* Tooltip personalizado que solo muestra la duración */}

        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
