import { Paper } from "@mui/material";
import { ReactFlow, Background, Edge, Node, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";

const actividades: { id: string; predecesoras: string[] }[] = [
  { id: "A", predecesoras: [] },
  { id: "B", predecesoras: [] },
  { id: "C", predecesoras: [] },
  { id: "D", predecesoras: ["A"] },
  { id: "E", predecesoras: ["A"] },
  { id: "F", predecesoras: ["B"] },
  { id: "G", predecesoras: ["C"] },
  { id: "H", predecesoras: ["C"] },
  { id: "I", predecesoras: ["D", "E"] },
  { id: "J", predecesoras: ["F"] },
  { id: "K", predecesoras: ["G", "H"] },
  { id: "L", predecesoras: ["I", "J", "K"] },
  { id: "M", predecesoras: ["L"] },
  { id: "N", predecesoras: ["L"] },
  { id: "O", predecesoras: ["M"] },
  { id: "P", predecesoras: ["N"] },
  { id: "Q", predecesoras: ["O", "P"] },
];

// Configurar Dagre.js para calcular las posiciones
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "LR", nodesep: 40, ranksep: 70 }); // "LE" = Left-Right (de izquierda a derecha)
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => g.setNode(node.id, { width: 100, height: 50 }));
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));

  dagre.layout(g);

  // Aplicar las posiciones calculadas por Dagre
  return nodes.map((node) => {
    const { x, y } = g.node(node.id);
    return { ...node, position: { x, y } };
  });
};

// Generar nodos automáticamente
const initialNodes: Node[] = actividades.map((actividad) => ({
  id: actividad.id,
  data: { label: actividad.id },
  position: { x: 0, y: 0 }, // Dagre ajustará la posición
  style: {
    width: "auto",
    textAlign: "center",
    borderRadius: "3rem",
    fontSize: "24px",
    fontWeight: "bold",
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

export default function GraphView() {
  return (
    <Paper style={{ height: "14rem" }}>
      <ReactFlow
        nodes={nodes}
        edges={initialEdges}
        proOptions={{ hideAttribution: true }}
        fitView
      >
        <Background />
      </ReactFlow>
    </Paper>
  );
}
