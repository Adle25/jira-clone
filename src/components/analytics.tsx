import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { AnalyticsCard } from "./analytics-card";
import { DottedSeparator } from "./dotted-separator";

export const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
    return (
        <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
            <div className="w-full flex flex-row">
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Total tasks"
                        value={data.taskCount}
                        variant={data.taskDifference > 0 ? "up" : "down"}
                        increaseValue={data.taskDifference}
                    />
                    <DottedSeparator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Assigned tasks"
                        value={data.assignedTaskCount}
                        variant={data.assignedTaskDifference > 0 ? "up" : "down"}
                        increaseValue={data.assignedTaskDifference}
                    />
                    <DottedSeparator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Completed tasks"
                        value={data.completedTasksCount}
                        variant={data.completedTasksDifference > 0 ? "up" : "down"}
                        increaseValue={data.completedTasksDifference}
                    />
                    <DottedSeparator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Overdue tasks"
                        value={data.overdueTasksCount}
                        variant={data.overdueTasksDifference > 0 ? "up" : "down"}
                        increaseValue={data.overdueTasksDifference}
                    />
                    <DottedSeparator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Incomplete tasks"
                        value={data.incompleteTasksCount}
                        variant={data.incompleteTasksDifference > 0 ? "up" : "down"}
                        increaseValue={data.incompleteTasksDifference}
                    />
                    <DottedSeparator direction="vertical" />
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
};