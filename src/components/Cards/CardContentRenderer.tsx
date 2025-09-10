import ReactPlayer from "react-player";

import { useLogo } from "../../hooks/useLogo";
import link from "../../assets/link.png";

type CardContentRendererProps = {
  url: string;
  mode: "compact_card" | "full_card";
};

export default function CardContentRenderer({ url, mode }: CardContentRendererProps) {

  try {
    new URL(url).hostname;
  } catch {
    return <span>🔗 Invalid Link</span>; //API does not accept non URL anymore
  }

  if (mode === "compact_card") {
    const hostname = new URL(url).hostname;
    const logo = useLogo(hostname);
    return (
      <div className="compact-link-preview">
        <img src={logo || link} alt="favicon" className="favicon" /><br/>
        <span className="hostname">{hostname}</span>
      </div>
    );
  }

  if (mode === "full_card") {
    if (ReactPlayer.canPlay!(url)) {
      return (
        <div className="video-wrapper">
          <ReactPlayer src={url} controls width="100%" height="100%" />
        </div>
      );
    } else {
      return (
        <iframe
          src={url}
          title="Embedded content"
          width="100%"
          height="400"
          style={{ border: "none" }}
          allowFullScreen
        />
      );
    }
  }

  return null;
}