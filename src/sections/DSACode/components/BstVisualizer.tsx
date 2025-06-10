'use client'

import { Heading, Paragraph } from '@/components/ui/typography';
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
import { BstGenerateDialog } from './BstGenerateDialog';

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


  return <div className='container flex-col gap-8 my-16 h-[56rem]'>
    <Heading className='text-center mb-8'>
      BST Visualizer
    </Heading>
    <Paragraph>
      This is a simple Binary Search Tree (BST) visualizer.
      You can randomly generate a BST and visualize it.
      You can also select an operation from the dropdown menu to visualize the operation on the BST.
      <br />
      This will open a socket connection to the server, send the operation to the server and get animations for nodes and edges with one second delay to animate appropriately.
    </Paragraph>

    <div className='flex gap-4 my-4'>
      <BstGenerateDialog />
    </div>
    <ReactFlow
      fitView
      className='!h-[80%]'
      draggable={false}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  </div>
}