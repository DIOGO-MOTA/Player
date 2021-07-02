import { FiPlay, FiSkipBack, FiSkipForward, FiRotateCcw } from 'react-icons/fi'
import { IoInfiniteOutline } from "react-icons/io5";
import styles from './styles.module.scss';


export function Player() {

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/logo.png" alt="logo" />
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.enptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.enpty}>

        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider} >
            <div className={styles.enptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <IoInfiniteOutline type="Embaralhar" />
          </button>

          <button type="button">
            <FiSkipBack type="Tocar anterior" />
          </button>

          <button type="button" className={styles.playButton}>
            <FiPlay type="Tocar" />
          </button>

          <button type="button">
            <FiSkipForward type="Tocar proxíma" />
          </button>

          <button type="button">
            <FiRotateCcw type="Tocar proxíma" />
          </button>

        </div>

      </footer>
    </div>
  )

}
