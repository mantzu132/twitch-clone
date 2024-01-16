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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const ConnectModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Generate connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate connection</DialogTitle>
        </DialogHeader>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="RTMP">RTMP</SelectItem>
              <SelectItem value="WHIP">WHIP</SelectItem>
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
            <DialogClose>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button variant="ghost">Generate</Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
