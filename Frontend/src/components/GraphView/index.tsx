import { Paper } from "@mui/material";
import { ReactFlow, Background, Edge, Node, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import { CustomNode } from "./CustomNode";
import { Activity } from "@customTypes/core";

export type GraphViewProps = {
  activities: Activity[];
};

export function GraphView({ activities }: GraphViewProps) {
  // Configurar Dagre.js para calcular las posiciones
  const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: "LR", nodesep: 100, ranksep: 70 }); // "LR" = Left to Right
    g.setDefaultEdgeLabel(() => ({}));

    nodes.forEach((node) => g.setNode(node.id, { width: 120, height: 60 }));
    edges.forEach((edge) => g.setEdge(edge.source, edge.target));

    dagre.layout(g);

    return nodes.map((node) => {
      const { x, y } = g.node(node.id);
      return { ...node, position: { x, y } };
    });
  };

  // Generar nodos automáticamente
  const initialNodes: Node[] = activities.map((activity) => ({
    id: activity.name,
    type: "custom", // <- Debe coincidir con el key en nodeTypes
    position: { x: 0, y: 0 },
    data: {
      label: activity.name,
      tiempo: activity.probable,
      costo: activity.cost,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  }));

  // Generar aristas automáticamente
  const initialEdges: Edge[] = activities.flatMap(
    (activity) =>
      activity.precedents?.map((predecessor) => ({
        id: `edge-${predecessor}-${activity.name}`,
        source: predecessor,
        target: predecessor,
        animated: true,
      })) || []
  );

  // Aplicar el layout automático
  const nodes = getLayoutedElements(initialNodes, initialEdges);

  return (
    <Paper style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={initialEdges}
        proOptions={{ hideAttribution: true }}
        fitView
        nodeTypes={{ custom: CustomNode }}
      >
        <Background />
      </ReactFlow>
    </Paper>
  );
}
