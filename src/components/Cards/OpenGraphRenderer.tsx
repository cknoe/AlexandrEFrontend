import { useEffect, useState } from 'react'
import { fetchOpenGaph } from '../../api/openGraph'
import link from '../../assets/link.png'

type OpenGraph = {
  title?: string
  image?: string
}

type Props = {
  url: string
  logo: string | null
}

export function OpenGraphRenderer({ url, logo }: Props) {
  const [openGraph, setOpenGraph] = useState<OpenGraph | null>(null)

  useEffect(() => {
    async function load() {
      setOpenGraph(await fetchOpenGaph(url))
    }
    load()
  }, [url])

  return (
    <div className="opengraph-renderer">
      {openGraph?.image ?
        (
          <img className="opengraph-renderer-img" src={openGraph.image || logo || link} />
        ) :
        (
          <img className="opengraph-renderer-img" src={ logo || link} />
        )
      }
      {openGraph?.title && (
        <div className="opengraph-rendrer-title">{openGraph.title}</div>
      )}
    </div>
  )
}
