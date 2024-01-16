import { Input } from "@/components/ui/input";
import { CopyButton } from "@/app/(dashboard)/u/[username]/keys/_components/copy-button";

interface UrlCardProps {
  value: string | null;
}
export const UrlCard = ({ value }: UrlCardProps) => {
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p>Server URL</p>

        <div className="w-full flex items-center gap-x-2">
          <Input value={value || ""} disabled placeholder="Server URL" />
          <CopyButton value={value || ""} />
        </div>
      </div>
    </div>
  );
};
