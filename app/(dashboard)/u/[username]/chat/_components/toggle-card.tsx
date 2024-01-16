"use client";
import { Switch } from "@/components/ui/switch";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";
interface ToggleCardProps {
  field: FieldTypes;
  label: string;
  currentValue: boolean;
}
export const ToggleCard = ({
  field,
  label,
  currentValue = false,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();
  const onChange = async () => {
    startTransition(() => {
      updateStream({ [field]: !currentValue })
        .then(() => {
          toast.success("Updated successfully");
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  };
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p>{label}</p>
        <div className="space-y-2">
          <Switch
            checked={currentValue}
            onCheckedChange={onChange}
            disabled={isPending}
          >
            {currentValue ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
