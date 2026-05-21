import { useState } from 'react'
import type { TabBarProps } from './TabType'

export default function TabBar(props: TabBarProps) {
  const [tabsName] = useState<string[]>(props.tabNames)
  const [activeTab, setActiveTab] = useState<string>(tabsName[0])

  return (
    <div className="tabs">
      {tabsName.map((tabName) => (
        <div
          className={`tab ${activeTab === tabName ? 'active-tab' : ''}`}
          onClick={() => setActiveTab(tabName)}
        >
          {tabName}
        </div>
      ))}
    </div>
  )
}
