import { useContext, useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiRotateCcw } from 'react-icons/fi'
import { IoInfiniteOutline } from "react-icons/io5";
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { PlayerContext } from '../../pages/contexts/PlayerContext';
import styles from './styles.module.scss';




export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    TogglePlay,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious
  } = useContext(PlayerContext)

  const episode = episodeList[currentEpisodeIndex]

  useEffect(() => {
    if (!audioRef.current){
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  },[isPlaying]) // play e pause dos button


  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/logo.png" alt="logo" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.menbers}</span>

        </div>
      ) : (
        <div className={styles.enptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.enpty : ''}>

        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider} >
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: '#84D361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#84D361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.enptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            autoPlay
            onPlay={() => setPlayingState(true)} // play do teclado
            onPause={() => setPlayingState(false)} // pause do teclado
          />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <IoInfiniteOutline type="Embaralhar" />
          </button>

          <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
            <FiSkipBack type="Tocar anterior" />
          </button>

          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={TogglePlay}
          >
            {isPlaying
              ? < FiPause type="Pausar" />
              : <FiPlay type="Tocar" />
            }
          </button>

          <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
            <FiSkipForward type="Tocar proxíma" />
          </button>

          <button type="button" disabled={!episode}>
            <FiRotateCcw type="Repetir" />
          </button>

        </div>

      </footer>
    </div >
  )

}
