import { Handle, NodeProps, Position } from "@xyflow/react";
import { Card, CardContent, Typography } from "@mui/material";

type CustomNodeProps = NodeProps & {
  data: {
    label: string;
    tiempo: number;
    costo: number;
  };
};

export const CustomNode = ({ data }: CustomNodeProps) => {
  return (
    <Card sx={{ minWidth: 120, textAlign: "center", p: 1 }}>
      <CardContent>
        <Typography
          variant="h6"
          component="span"
          sx={{ fontWeight: "bold", marginRight: 1 }}
        >
          {data.label}
        </Typography>
        <Typography
          variant="body1"
          component="span"
          sx={{ color: "text.secondary" }}
        >
          {data.tiempo}T
        </Typography>
        <Typography variant="body2">${data.costo}</Typography>
      </CardContent>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </Card>
  );
};
