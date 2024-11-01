"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTaskSchema } from "../schemas";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCreateTask } from "../api/use-create-task";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface CreateTaskFormProps {
    onCancel?: () => void;
    projectOptions: { id: string, name: string, imageUrl: string }[];
    memberOptions: { id: string, name: string }[];
};

export const CreateTaskForm = ({ onCancel, projectOptions, memberOptions }: CreateTaskFormProps) => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    const { mutate, isPending } = useCreateTask();

    const form = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema.omit({ workspaceId: true })),
        defaultValues: {
            workspaceId
        }
    });

    const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
        mutate({ json: { ...values, workspaceId } }, {
            onSuccess: () => {
                form.reset();
            }
        });
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new task
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Task Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter task name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Due Date</FormLabel>
                                        <FormControl>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DottedSeparator className="py-7" />
                        <div className="flex items-center justify-between">
                            <Button className={cn(
                                !onCancel && "invisible"
                            )} disabled={isPending} type="button" size="lg" variant="secondary" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button disabled={isPending} type="submit" size="lg" variant="primary">Create task</Button>
                        </div>
                    </form>
                </Form>

            </CardContent>
        </Card>
    );
};