import { useEffect } from 'react'

export default function TechStackTab() {
  useEffect(() => {
    document.title = 'Tech Stack'
  }, [])

  return (
    <section className="homepage-tab-panel">
      <h2>Frontend</h2>
      <span>
        Source code available on{' '}
        <a href="https://github.com/cknoe/FrontendReact">Github</a>
      </span>
      <ul>
        <li>Typescript</li>
        <li>Yarn</li>
        <li>Vite</li>
        <li>React</li>
      </ul>
      <h2>Backend</h2>
      <span>
        Source code available on{' '}
        <a href="https://github.com/cknoe/Alexandr-eBackend">Github</a>
      </span>
      <ul>
        <li>Java</li>
        <li>Maven</li>
        <li>Springboot</li>
      </ul>
      <h2>Features</h2>
      <ul>
        <li>JWT Authentication system</li>
        <li>Local draft storage</li>
        <li>REST API communication between frontend and backend</li>
        <li>Responsive interface</li>
      </ul>
    </section>
  )
}
