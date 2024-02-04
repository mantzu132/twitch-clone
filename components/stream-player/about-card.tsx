import { VerifiedMark } from "@/components/verified-mark";
import { BioModal } from "@/components/stream-player/bio-modal";

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
}

export const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;
  const followedByLabel = followedByCount === 1 ? "follower" : "followers";
  return (
    <div className="bg-background mx-3 mt-1 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="group rounded-xl bg-background p-6 lg:p-9 flex flex-col gap-y-3">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <VerifiedMark />
          </div>
          <p className="text-muted-foreground text-sm ">
            <span className="font-semibold text-primary">
              {followedByCount}
            </span>{" "}
            {followedByLabel}
          </p>
          <p className="text-sm">
            {bio || "This user prefers to keep an air of mystery about them."}
          </p>
        </div>
        {isHost && <BioModal initialValue={bio} />}
      </div>
    </div>
  );
};
