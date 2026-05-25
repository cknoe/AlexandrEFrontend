import { useState } from 'react'
import type { TabBarProps } from './TabType'

export default function Tabs({ tabs }: TabBarProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].name)

  return (
    <div className="tabs">
      <div className="tab-names">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`tab ${activeTab === tab.name ? 'active-tab' : ''}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="tab-panel">
        {tabs.find((tab) => tab.name === activeTab)?.content}
      </div>
    </div>
  )
}
