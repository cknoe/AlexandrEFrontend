import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'

import { useLogo } from '../../hooks/useLogo'
import link from '../../assets/link.png'
import { OpenGraphRenderer } from './OpenGraphRenderer'
import type { ReactNode } from 'react'

import { IFRAME_URL } from '../../config'

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
  const isIframe =
    IFRAME_URL.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
    ) || url.includes('embed')

  const smallLink: ReactNode = (
    <div className="link-div">
      <img src={logo || link} alt="favicon" className="favicon-small" />
      <Link to={url}>{hostname}</Link>
    </div>
  )

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
    } else if (isIframe) {
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
          {smallLink}
        </>
      )
    } else {
      return (
        <>
          <OpenGraphRenderer url={url} logo={logo} />
          {smallLink}
        </>
      )
    }
  }

  return null
}
