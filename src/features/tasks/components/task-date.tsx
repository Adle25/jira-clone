import { differenceInDays, format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskDateProps {
    value: string;
    className?: string;
};

export const TaskDate = ({ value, className }: TaskDateProps) => {
    const today = new Date();
    const endDate = new Date(value);
    const diffInDays = differenceInDays(endDate, today);

    let txtColor = "text-muted-foreground";

    if (diffInDays <= 3) {
        txtColor = "text-red-500";
    } else if (diffInDays <= 7) {
        txtColor = "text-orange-500";
    } else if (diffInDays <= 14) {
        txtColor = "text-yellow-500";
    }

    return (
        <div className={txtColor}>
            <span className={cn("truncate", className)}>
                {format(value, "PPP")}
            </span>
        </div>
    );
};