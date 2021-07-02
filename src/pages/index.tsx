import { GetStaticProps } from 'next'

type Episode = {
  id: string;
  title: string;
  menbers: string;
}
type HomeProps = {
  episodes: Array<Episode>;
}

export default function Home(props: HomeProps) {
  return (
    <> </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3333/episodes?_limit=12&_sort=publiched_at&order=desc')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}