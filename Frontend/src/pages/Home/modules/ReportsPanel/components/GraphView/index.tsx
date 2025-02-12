import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import {
  ReactFlow,
  Background,
  Edge,
  Node,
  Position,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import { CustomNode } from "./CustomNode";
import { Activity } from "@customTypes/core";

export type GraphViewProps = {
  activities: Activity[];
};

export function GraphView({ activities }: GraphViewProps) {
  const { fitView } = useReactFlow(); // Hook para controlar ReactFlow
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

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

  useEffect(() => {
    // Generar nodos
    const updatedNodes: Node[] = activities.map((activity) => ({
      id: activity.name,
      type: "custom",
      position: { x: 0, y: 0 }, // Se actualizará con Dagre
      data: {
        label: activity.name,
        tiempo: activity.probable,
        costo: activity.cost,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    }));

    // Generar aristas
    const updatedEdges: Edge[] = activities.flatMap(
      (activity) =>
        activity.precedents?.map((predecessor) => ({
          id: `edge-${predecessor}-${activity.name}`,
          source: predecessor,
          target: activity.name,
          animated: true,
          style: { stroke: "#000", strokeWidth: 3 }, // Estilo personalizado para las aristas
        })) || []
    );

    // Aplicar layout
    const layoutedNodes = getLayoutedElements(updatedNodes, updatedEdges);

    setNodes(layoutedNodes);
    setEdges(updatedEdges);

    // 🔹 Ajustar el zoom automáticamente al cambiar actividades
    setTimeout(() => fitView({ duration: 500, padding: 0.2 }), 100);
  }, [activities, fitView]); // Se ejecuta cada vez que `activities` cambia

  return (
    <Paper style={{ height: "100%" }} elevation={3}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        proOptions={{ hideAttribution: true }}
        fitView
        nodeTypes={{ custom: CustomNode }}
      >
        <Background />
      </ReactFlow>
    </Paper>
  );
}
