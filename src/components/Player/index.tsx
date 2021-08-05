import { useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiRotateCcw } from 'react-icons/fi'
import { IoInfiniteOutline } from "react-icons/io5";
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { usePlayer } from '../../pages/contexts/PlayerContext';
import styles from './styles.module.scss';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { useState } from 'react';




export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);


  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    isLooping,
    isShuffling,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    clearPlayerState
  } = usePlayer()

  const episode = episodeList[currentEpisodeIndex]


  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]) // play e pause dos button


  return (
    <div className={styles.playerContainer}>
      <section className={styles.header}>
        <div className={styles.buttons}>


          <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
            <FiSkipBack type="Tocar anterior" />
          </button>

          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying
              ? < FiPause type="Pausar" />
              : <FiPlay type="Tocar" />
            }
          </button>

          <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
            <FiSkipForward type="Tocar proxíma" />
          </button>


        </div>
      </section>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={130}
            height={130}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>

        </div>
      ) : (
        <div className={styles.enptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <section className={!episode ? styles.enpty : ''}>

        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider} >
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: '#394be8' }}
                railStyle={{ backgroundColor: '#526073' }}
                handleStyle={{ borderColor: '#394be8', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.enptySlider} />
            )}
          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            autoPlay
            onEnded={handleEpisodeEnded}
            onPlay={() => setPlayingState(true)} // play do teclado
            onPause={() => setPlayingState(false)} // pause do teclado
            onLoadedMetadata={setupProgressListener}
          />
        )}



      </section>
    </div >
  )

}
