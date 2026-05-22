import Tabs from './Tabs/Tabs'
import type { Tab } from './Tabs/TabType'

export default function HomePage() {
  const tab: Tab = { name: 'hello', content: <>hello</> }
  const tab2: Tab = { name: 'bonjour', content: <>bonjour</> }
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ width: 'var(--collection-tray-width)' }} />
      <Tabs tabs={[tab, tab2]}></Tabs>
    </div>
  )
}
