import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { FullscreenControl } from "@/components/stream-player/fullscreen-control";
import { VolumeControl } from "@/components/stream-player/volume-control";

interface LiveVideoProps {
  participant: Participant;
}
export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(100);

  useTracks([Track.Source.ScreenShare, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = Boolean(document.fullscreenElement);
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Cleanup function
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleVolumeChange = (newValue: number) => {
    setVolume(newValue);
    if (videoRef.current) {
      videoRef.current.volume = newValue / 10;
      videoRef.current.muted = newValue === 0;
    }
  };

  const onToggleMute = () => {
    if (videoRef.current) {
      // If currently not muted, mute the video by setting volume to 0
      if (volume > 0) {
        videoRef.current.muted = true;
        videoRef.current.volume = 0;
        setVolume(0);
      } else {
        // If currently muted, unmute and restore the previous volume
        videoRef.current.volume = 1;
        videoRef.current.muted = false;
        setVolume(10);
      }
    }
  };

  // when page loads set the volume to 0
  useEffect(() => {
    handleVolumeChange(0);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (wrapperRef.current) {
          await wrapperRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.error("Error attempting to toggle fullscreen:", error);
    }
  };

  return (
    <div ref={wrapperRef} className="group h-full relative flex">
      <video ref={videoRef} width="100%" />

      <div
        className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4
        opacity-0 group-hover:opacity-100 group-hover:transition-all"
      >
        <VolumeControl
          onToggle={onToggleMute}
          onChange={handleVolumeChange}
          value={volume}
        />
        <FullscreenControl
          onToggle={toggleFullscreen}
          isFullscreen={isFullscreen}
        />
      </div>
    </div>
  );
};
