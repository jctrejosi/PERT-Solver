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
  highlightedRoute?: string[];
};

export function RoutesGraph({
  activities,
  highlightedRoute = [],
}: GraphViewProps) {
  const { fitView } = useReactFlow();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: "LR", nodesep: 100, ranksep: 70 });
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
    const updatedNodes: Node[] = activities.map((activity) => ({
      id: activity.name,
      type: "custom",
      position: { x: 0, y: 0 },
      data: {
        label: activity.name,
        tiempo: Number(
          (activity.pessimist && activity.optimist
            ? (activity.pessimist + 4 * activity.probable + activity.optimist) /
              6
            : activity.probable
          ).toFixed(2)
        ),
        costo: activity.cost,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: highlightedRoute.includes(activity.name)
        ? { border: "2px solid red", backgroundColor: "#ffebee" }
        : { border: "1px solid gray", backgroundColor: "#ffffff" },
    }));

    const updatedEdges: Edge[] = activities.flatMap(
      (activity) =>
        activity.precedents?.map((predecessor) => ({
          id: `edge-${predecessor}-${activity.name}`,
          source: predecessor,
          target: activity.name,
          animated: true,
          style:
            highlightedRoute.includes(predecessor) &&
            highlightedRoute.includes(activity.name)
              ? { stroke: "red", strokeWidth: 4 }
              : { stroke: "#000", strokeWidth: 2 },
        })) || []
    );

    const layoutedNodes = getLayoutedElements(updatedNodes, updatedEdges);
    setNodes(layoutedNodes);
    setEdges(updatedEdges);

    setTimeout(() => fitView({ duration: 500, padding: 0.2 }), 100);
  }, [activities, highlightedRoute, fitView]);

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
