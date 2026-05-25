import type { ReactNode } from 'react'

export type Tab = {
  name: string
  content: ReactNode
}

export type TabBarProps = {
  tabs: Tab[]
}

export type TabProps = {
  child: ReactNode
}
