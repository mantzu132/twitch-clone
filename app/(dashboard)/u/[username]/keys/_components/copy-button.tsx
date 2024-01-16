"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCheck, Copy, CopyIcon } from "lucide-react";

interface CopyButtonProps {
  value?: string;
}
export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(value as string);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant="ghost"
      size="sm"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};
