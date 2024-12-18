'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { useForm } from 'react-hook-form';
import { quizCreationSchema } from '@/schemas/form/quiz';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input as TextInput } from '@/components/ui/input';
import { BookOpen, CopyCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {};

// interface ApiResponse {
//   gameId: string;
// }

// type Input = z.infer<typeof quizCreationSchema>;
interface Input {
  topic: string;
  type: 'mcq' | 'open_ended';
  amount: number;
}

interface ApiResponse {
  gameId: string;
}


const QuizCreation = (props: Props) => {
  const router = useRouter();

  const mutation = useMutation<ApiResponse, unknown, Input>({
    mutationFn: async (input) => {
      // console.log('Input being sent to the API:', input); // Add this
      const response = await axios.post<ApiResponse>('/api/game', input);
      return response.data;
    },
    onSuccess: (data) => {
      const { gameId } = data;
      const quizType = form.getValues('type');
      const path = quizType === 'open_ended' ? `/play/open_ended/${gameId}` : `/play/mcq/${gameId}`;
      router.push(path);
    },
    onError: (error) => {
      console.error('Error creating quiz:', error);
      // Optionally handle error (e.g., show a notification)
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response?.data);
      }
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      amount: 4,
      topic: '',
      type: 'open_ended',
    },
  });

  function onSubmit(input: Input) {
    mutation.mutate(input);
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Quiz Creation</CardTitle>
          <CardDescription>Choose a Topic</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <TextInput placeholder="Enter a Topic..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <TextInput
                        placeholder="Enter an Amount..."
                        {...field}
                        type="number"
                        min={1}
                        max={20}
                        onChange={(e) => form.setValue('amount', parseInt(e.target.value, 10))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button
                  variant={form.getValues('type') === 'mcq' ? 'default' : 'secondary'}
                  className="w-1/2 rounded-none rounded-l-lg"
                  onClick={() => form.setValue('type', 'mcq')}
                  type="button"
                >
                  <CopyCheck className="w-4 h-4 mr-2" /> Multiple Choice
                </Button>
                <Separator orientation="vertical" />
                <Button
                  variant={form.getValues('type') === 'open_ended' ? 'default' : 'secondary'}
                  className="w-1/2 rounded-none rounded-r-lg"
                  onClick={() => form.setValue('type', 'open_ended')}
                  type="button"
                >
                  <BookOpen className="w-4 h-4 mr-2" /> Open Ended
                </Button>
              </div>
              <Button type="submit">
  Submit
</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCreation;
