import { format, parseISO } from "date-fns"
import { ptBR } from 'date-fns/locale'
import { GetStaticPaths, GetStaticProps } from "next"
import { FiPlay, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'
import { api } from "../../services/api"
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString"
import Image from 'next/image'
import styles from './episode.module.scss'

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  menbers: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  description: string;
  url: string;
}

type EpisodeProps = {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <FiArrowLeft type="Voltar" />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />

        <button type="button">
          <FiPlay type="Tocar" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>

        <span>{episode.menbers}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
    </div>



  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { slug } = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    menbers: data.menbers,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,

  };


  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}