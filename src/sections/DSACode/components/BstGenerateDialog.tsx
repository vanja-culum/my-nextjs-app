'use client'

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { env } from '@/env';
import { useForm } from 'react-hook-form';


export const BstGenerateDialog = () => {
    const form = useForm({
        defaultValues: {
            nodeCount: 10,
            levelDepth: 3,
        },
    })

    const { control, handleSubmit } = form

    async function onSubmit(data: { nodeCount: number; levelDepth: number }) {
        console.log('Submitting data:', data);
        const response = await fetch(env.NEXT_PUBLIC_API_BASE_URL + '/dsa/bst/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to generate BST');
        }
        const result = await response.json();
        console.log('Generated BST:', result);
        // Handle the result as needed, e.g., update state or notify user
    }


    return <Dialog>
        <DialogTrigger asChild>
            <Button>
                Generate random BST
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>BST Generation</DialogTitle>
                <DialogDescription>
                    This form is validated with zod and react-hook-form packages on front end and go-validator on backend.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}  >
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <FormField control={control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Node Count</FormLabel>
                            <Input {...field} type='number' placeholder='Number of nodes' />
                        </FormItem>
                    )} name='nodeCount' />

                    <FormField control={control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Level Depth</FormLabel>
                            <Input {...field} type='number' placeholder='Level depth' />
                        </FormItem>
                    )} name='levelDepth' />
                    <DialogFooter className='mt-4'>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Generate</Button>
                    </DialogFooter>
                </form>
            </Form>

        </DialogContent>

    </Dialog>
}