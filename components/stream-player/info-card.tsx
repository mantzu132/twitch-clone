"use client";
import { Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface InfoCardProps {
  hostIdentity: string;
  viewerIdentity: string;
  streamName: string;
  thumbnailUrl: string | null;
}

export const InfoCard = ({
  hostIdentity,
  viewerIdentity,
  streamName,
  thumbnailUrl,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) null;

  return (
    <div className="bg-background m-3 text-white rounded-lg p-4">
      {/* Card Header */}
      <div className="flex items-center gap-x-3 mb-1.5">
        <div className="bg-blue-600 p-2 flex items-center justify-center rounded-lg">
          <Pencil className="h-5 w-5 text-white" />
        </div>
        <div className="">
          <h1 className="text-lg font-bold">Edit Your Stream Info</h1>
          <p className="text-muted-foreground text-sm">
            Maximize your visibility
          </p>
        </div>
      </div>
      <Separator />

      {/*//  Form Fields*/}
      <div className="mt-1.5 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-muted-foreground"
          >
            Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-800 text-muted-foreground text-white block w-full border-gray-600 rounded-md p-2"
              placeholder="mantas's stream"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-300"
          >
            Thumbnail
          </label>
          {/*Thumbnail placeholder or upload field */}
          <div className="mt-1">
            <div className="w-full h-24 bg-gray-800 rounded-md flex items-center justify-center text-muted-foreground">
              {/*Replace this with an actual thumbnail or upload button*/}
              Thumbnail placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
