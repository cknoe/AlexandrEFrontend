export default function TechStackTab() {
  return (
    <section className="homepage-tab-panel">
      <h2>Frontend</h2>
        <span>Source code available on <a href="https://github.com/cknoe/FrontendReact">Github</a></span>
        <ul>
          <li>React</li>
          <li>Typescript</li>
          <li>vite</li>
        </ul>
      <h2>Backend</h2>
        <span>Source code available on <a href="https://github.com/cknoe/FrontendReact">Github</a></span>
        <ul>
          <li>Java</li>
          <li>Maven</li>
          <li>Springboot</li>
        </ul>
      <h2>Features</h2>
        <ul>
          <li>Authentication system</li>
          <li>Local draft storage</li>
          <li>REST API communication between frontend and backend</li>
          <li>Responsive interface</li>
        </ul>
    </section>
  )
}