import { useEffect } from 'react'
import Tabs from '../Tabs/Tabs'
import type { Tab } from '../Tabs/TabType'
import HowToTab from './HowToTab'
import WhatIsTab from './WhatIsTab'

export default function HomePage() {

  useEffect(() => {
    document.title='Home'
  }, [])

  const tab: Tab = {
    name: 'What is Alexandr-e ?',
    content: <WhatIsTab />,
  }

  const tab2: Tab = {
    name: 'How to use ?',
    content: <HowToTab />,
  }
  return (
    <div className="homepage-content">
      <Tabs tabs={[tab, tab2]}></Tabs>
    </div>
  )
}
