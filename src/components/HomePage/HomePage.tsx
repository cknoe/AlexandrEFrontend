import { useEffect } from 'react'
import Tabs from '../Tabs/Tabs'
import type { Tab } from '../Tabs/TabType'
import HowToTab from './HowToTab'
import WhatIsTab from './WhatIsTab'
import TechStackTab from './TechStackTab'

export default function HomePage() {

  useEffect(() => {
    document.title='Home'
  }, [])

  const tab: Tab = {
    name: 'What is this ?',
    content: <WhatIsTab />,
  }

  const tab2: Tab = {
    name: 'How to use ?',
    content: <HowToTab />,
  }

  const tab3: Tab = {
    name: 'Tech Stack',
    content: <TechStackTab />,
  }
  return (
    <div className="homepage-content">
      <Tabs tabs={[tab, tab2, tab3]}></Tabs>
    </div>
  )
}
