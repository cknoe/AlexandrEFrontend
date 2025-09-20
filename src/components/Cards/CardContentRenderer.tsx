import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'

import { useLogo } from '../../hooks/useLogo'
import link from '../../assets/link.png'

type CardContentRendererProps = {
  url: string
  mode: 'compact_card' | 'full_card'
}

export default function CardContentRenderer({
  url,
  mode,
}: CardContentRendererProps) {
  const hostname = new URL(url).hostname
  const logo = useLogo(hostname)

  if (mode === 'compact_card') {
    return (
      <div className="compact-link-preview">
        <img src={logo || link} alt="favicon" className="favicon" />
        <br />
        <span className="hostname">{hostname}</span>
      </div>
    )
  }

  if (mode === 'full_card') {
    if (ReactPlayer.canPlay!(url)) {
      return (
        <div className="video-wrapper">
          <ReactPlayer src={url} controls width="100%" height="100%" />
        </div>
      )
    } else {
      return (
        <>
          <iframe
            src={url}
            title="Embedded content"
            width="100%"
            height="400"
            style={{ border: 'none' }}
            allowFullScreen
          />
          <div className="link-div">
            <img src={logo || link} alt="favicon" className="favicon-small" />
            <Link to={url}>{hostname}</Link>
          </div>
        </>
      )
    }
  }

  return null
}
