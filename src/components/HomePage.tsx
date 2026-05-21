import TabBar from './Tabs/TabBar'

export default function HomePage() {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ width: 'var(--collection-tray-width)' }} />
      <TabBar tabNames={['hello', 'bonjour', 'hey']}></TabBar>
    </div>
  )
}
