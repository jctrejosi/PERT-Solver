import { Paper } from "@mui/material";
import { ReactFlow, Background, Edge, Node, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import { CustomNode } from "./CustomNode";

type Actividad = {
  id: string;
  predecesoras: string[];
  tiempo: number;
  costo: number;
};

const actividades: Actividad[] = [
  { id: "A", predecesoras: [], tiempo: 5, costo: 100 },
  { id: "B", predecesoras: [], tiempo: 3, costo: 80 },
  { id: "C", predecesoras: [], tiempo: 4, costo: 90 },
  { id: "D", predecesoras: ["A"], tiempo: 6, costo: 110 },
  { id: "E", predecesoras: ["A"], tiempo: 2, costo: 70 },
  { id: "F", predecesoras: ["B"], tiempo: 5, costo: 95 },
  { id: "G", predecesoras: ["C"], tiempo: 3, costo: 85 },
  { id: "H", predecesoras: ["C"], tiempo: 4, costo: 88 },
  { id: "I", predecesoras: ["D", "E"], tiempo: 7, costo: 120 },
  { id: "J", predecesoras: ["F"], tiempo: 3, costo: 75 },
  { id: "K", predecesoras: ["G", "H"], tiempo: 5, costo: 98 },
  { id: "L", predecesoras: ["I", "J", "K"], tiempo: 6, costo: 105 },
  { id: "M", predecesoras: ["L"], tiempo: 4, costo: 90 },
  { id: "N", predecesoras: ["L"], tiempo: 5, costo: 95 },
  { id: "O", predecesoras: ["M"], tiempo: 3, costo: 85 },
  { id: "P", predecesoras: ["N"], tiempo: 4, costo: 92 },
  { id: "Q", predecesoras: ["O", "P"], tiempo: 6, costo: 110 },
];

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
const initialNodes: Node[] = actividades.map((actividad) => ({
  id: actividad.id,
  type: "custom", // <- Debe coincidir con el key en nodeTypes
  position: { x: 0, y: 0 },
  data: {
    label: actividad.id,
    tiempo: actividad.tiempo,
    costo: actividad.costo,
  },
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
}));

// Generar aristas automáticamente
const initialEdges: Edge[] = actividades.flatMap((actividad) =>
  actividad.predecesoras.map((predecesora) => ({
    id: `edge-${predecesora}-${actividad.id}`,
    source: predecesora,
    target: actividad.id,
    animated: true,
  }))
);

// Aplicar el layout automático
const nodes = getLayoutedElements(initialNodes, initialEdges);

export function GraphView() {
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
