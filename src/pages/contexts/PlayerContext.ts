import { createContext } from 'react';

type Episode = {
  title: string;
  menbers: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  TogglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  play: (episode: Episode) => void;
}

export const PlayerContext = createContext({} as PlayerContextData)