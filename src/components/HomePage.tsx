import CardsList from './Cards/CardsList'
import type { CardData } from './Cards/cardTypes'
import Tabs from './Tabs/Tabs'
import type { Tab } from './Tabs/TabType'

export default function HomePage() {
  const sampleCardList: CardData[] = [
    {
      id: 1,
      cardTitle: 'Click-Me !',
      cardText:
        `(Also click the others cards)
        Your entries will be stored in this card structure.
        Give it a title, link an url if you want, and write a lengthy description :
        \n
        ` +
        Array(100).fill('Lorem ipsum ').join(''),
      cardContent: '',
    },
    {
      id: 2,
      cardTitle: 'A GitHub Repo',
      cardText:
        `If a site comply with Open Graph Protocol, its informations will be displayed in a concise manner`,
      cardContent: 'https://github.com/cknoe/FrontendReact',
    },
    {
      id: 3,
      cardTitle: 'A YouTube Video',
      cardText:
        `An URL to a video can be watched directly from here`,
      cardContent: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    },
    {
      id: 4,
      cardTitle: 'The React WebSite',
      cardText:
        `A selection of web-sites, and URL containing "embed", will be displayed directly in the card`,
      cardContent: 'https://react.dev/',
    }
  ]
  const tab: Tab = {
    name: 'What is Alexandr-e ?',
    content: (
      <div className="homepage-tab-panel">
        <div className="homepage-text">
          Welcome to Alexandr-e, your own private library for web-related
          content ! Save ressources, document them, store them in collections
          and then review them with a preview to where they lead <br />
          <br />
          Here is a sample :
        </div>
        <CardsList
          mode="AllCards"
          cards={sampleCardList}
          deleteCard={() => {}}
          updateCard={() => {}}
          addCard={() => {}}
          openUpdateForm={() => {}}
          openAddForm={() => {}}
          openSaveDraftForm={() => {}}
        />
      </div>
    ),
  }

  const tab2: Tab = {
    name: 'How to use ?',
    content: <div className="homepage-tab-panel">hello</div>,
  }
  return (
    <div className="homepage-content">
      <Tabs tabs={[tab, tab2]}></Tabs>
    </div>
  )
}
