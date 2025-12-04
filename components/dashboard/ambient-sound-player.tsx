"use client";

import { PauseIcon, PlayIcon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// TODO: Replace these URLs with your own hosted audio files
// You can use services like Cloudinary, AWS S3, or host them in your /public folder
// For now, these are placeholder URLs - replace with actual MP3 files
const TRACKS = [
  {
    id: "rain",
    name: "Chuva Suave",
    url: "/sounds/rain.mp3", // Add your rain sound to public/sounds/rain.mp3
  },
  {
    id: "forest",
    name: "Floresta",
    url: "/sounds/forest.mp3", // Add your forest sound to public/sounds/forest.mp3
  },
  {
    id: "fire",
    name: "Lareira",
    url: "/sounds/fire.mp3", // Add your fire sound to public/sounds/fire.mp3
  },
];

export default function AmbientSoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(TRACKS[0]);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle play/pause
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (track: (typeof TRACKS)[0]) => {
    if (currentTrack.id === track.id) return;
    setCurrentTrack(track);
    if (isPlaying) {
      // Small delay to allow source change
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  };

  return (
    <div className="bg-background/50 flex items-center gap-2 rounded-full border p-1 backdrop-blur-sm">
      <audio ref={audioRef} loop className="hidden">
        <source src={currentTrack.url} type="audio/mpeg" />
        <track kind="captions" />
      </audio>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full transition-all",
                isPlaying && "bg-primary/10 text-primary animate-pulse",
              )}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <PauseIcon className="size-4" />
              ) : (
                <PlayIcon className="size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isPlaying ? "Pausar" : "Tocar"} som ambiente</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs font-medium"
          >
            {currentTrack.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          {TRACKS.map((track) => (
            <DropdownMenuItem
              key={track.id}
              onClick={() => changeTrack(track)}
              className={cn(
                "cursor-pointer",
                currentTrack.id === track.id && "bg-accent",
              )}
            >
              {track.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="group relative flex items-center px-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground h-8 w-8 rounded-full"
        >
          {volume === 0 ? (
            <VolumeXIcon className="size-4" />
          ) : (
            <Volume2Icon className="size-4" />
          )}
        </Button>

        <div className="bg-popover absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-md border p-2 shadow-md group-hover:block">
          <Slider
            defaultValue={[volume]}
            max={1}
            step={0.01}
            onValueChange={(vals: number[]) => setVolume(vals[0])}
            className="h-24 w-2"
            orientation="vertical"
          />
        </div>
      </div>
    </div>
  );
}
