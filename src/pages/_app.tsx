import '../styles/global.scss'

import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { Sidebar } from '../components/Sidebar'
import styles from '../styles/app.module.scss'

import { PlayerContextProvider } from './contexts/PlayerContext'


function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>

      <div className={styles.wrapper}>
        < Sidebar />
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

      </div>
      <Player />

     

    </PlayerContextProvider>

  )
}

export default MyApp
