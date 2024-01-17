"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { IngressInput } from "livekit-server-sdk";
import { ElementRef, useRef, useState, useTransition } from "react";
import { createIngress } from "@/actions/ingress";
import { onFollow } from "@/actions/follow";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;
export const ConnectModal = () => {
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);
  const closeRef = useRef<ElementRef<"button">>(null);

  const onSubmit = async () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then((data) => {
          toast.success(`Ingress created`);
          closeRef.current?.click();
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Generate connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate connection</DialogTitle>
        </DialogHeader>
        <Select
          value={ingressType}
          onValueChange={(value) => {
            setIngressType(value);
          }}
          disabled={isPending}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={RTMP}>RTMP</SelectItem>
              <SelectItem value={WHIP}>WHIP</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <DialogDescription>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              This action will reset all active streams using the current
              connection.
            </AlertDescription>
          </Alert>
          <div className="flex justify-between">
            <DialogClose ref={closeRef}>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button disabled={isPending} onClick={onSubmit} variant="ghost">
              Generate
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
