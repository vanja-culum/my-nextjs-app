'use client'

import { useCallback } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    type Node,
    type OnConnect,
    type Edge,
  } from 'reactflow';
  
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
    { id: '1', draggable: false, position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', draggable: false, position: { x: -100, y: 100 }, data: { label: '2' } },
    { id: '3', draggable: false, position: { x: 100, y: 100 }, data: { label: '3' } },
  ];
  
  const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }, {
    id: 'e1-3',
    source: '1',
    target: '3',
  }];

  
export const BstVisualizer = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback<OnConnect>((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


    return <div className='container h-[60vh] max-h-[60vh]'>
        <h1>
            BST Visualizer
        </h1>
        <ReactFlow
        draggable={false}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <MiniMap />
      <Controls   />
      <Background />
    </ReactFlow>
    </div>
}