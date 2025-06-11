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
  ConnectionMode,
} from 'reactflow';
import { Input } from '@/components/ui/input';

import 'reactflow/dist/style.css';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { env } from '@/env';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialNodes: Node[] = [
  { id: '1', draggable: false, position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', draggable: false, position: { x: -100, y: 100 }, data: { label: '2' } },
  { id: '3', draggable: false, position: { x: 100, y: 100 }, data: { label: '3' } },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2'
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
  }];

const bstTypes = [
  { value: 'random', label: 'Random' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'unbalanced', label: 'Unbalanced' },
  { value: 'perfect', label: 'Perfectly balanced' },
]

export const BstVisualizer = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const form = useForm({
    defaultValues: {
      nodeCount: '10',
      type: 'random'
    },
  })

  const { control, handleSubmit, formState: { isSubmitting } } = form


  const onConnect = useCallback<OnConnect>((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


  async function onSubmit(data: { nodeCount: string }) {
    const payload = {
      ...data,
      nodeCount: +data.nodeCount
    }

    console.log('onSubmit', data);
    try {
      const response = await fetch(env.NEXT_PUBLIC_API_BASE_URL + '/dsa/bst/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });


      const result = await response.json();

      result.edges
        .forEach((edge: Edge) => {
          edge.type = 'straight'
        });

      console.log('result', result);
      setNodes(result.nodes)
      setEdges(result.edges)
    } catch (error) {
      console.log('error', error);
    }

  }

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
      <Form {...form}  >
        <form onSubmit={handleSubmit(onSubmit)} className='flex my-4 items-end gap-4'>
          <FormField control={control} render={({ field }) => (
            <FormItem>
              <FormLabel>Node Count</FormLabel>
              <Input {...field} type='number' placeholder='Number of nodes' />
            </FormItem>
          )} name='nodeCount' />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select BST type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bstTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />


          <div>
            <Button loading={isSubmitting} type="submit">Generate</Button>
          </div>
        </form>
      </Form>
    </div>
    <ReactFlow
      fitView
      connectionMode={ConnectionMode.Strict}
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