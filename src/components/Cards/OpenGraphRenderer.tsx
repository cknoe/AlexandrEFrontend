import { useEffect, useState } from "react";
import { fetchOpenGaph } from "../../api/openGraph";

type OpenGraph = {
  title?: string
  image?: string
}

type Props = {
  url: string
};
export function OpenGraphRenderer({ url }: Props) {
const [openGraph, setOpenGraph] = useState<OpenGraph | null>(null)

useEffect(() => {
  async function load() {
    setOpenGraph(await fetchOpenGaph(url))
  }
  load()
},[url])


  return (
    <div className="opengraph-renderer">
      {openGraph?.image &&
        <img
          className="opengraph-renderer-img"
          src={openGraph.image}
        />
      }
      {openGraph?.title &&
        <div className="opengraph-rendrer-title">
          {openGraph.title}
        </div>
      }
    </div>
  )
}