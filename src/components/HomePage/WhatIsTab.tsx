import { useEffect } from 'react'
import CardsList from '../Cards/CardsList'
import type { CardData } from '../Cards/cardTypes'

export default function WhatIsTab() {
  useEffect(() => {
    document.title = 'What is Alexandr-e'
  }, [])

  const sampleCardList: CardData[] = [
    {
      id: 1,
      cardTitle: 'Click-Me !',
      cardText:
        `(Also click the others cards)
        Your entries will be stored in this card structure.
        Give it a title, link an url if you want, and write a lengthy description :
        \n
        ` + Array(100).fill('Lorem ipsum ').join(''),
      cardContent: '',
    },
    {
      id: 2,
      cardTitle: 'A GitHub Repo',
      cardText: `If a site comply with Open Graph Protocol, its informations will be displayed in a concise manner`,
      cardContent: 'https://github.com/cknoe/FrontendReact',
    },
    {
      id: 3,
      cardTitle: 'A YouTube Video',
      cardText: `An URL to a video can be watched directly from here`,
      cardContent: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    },
    {
      id: 4,
      cardTitle: 'The React WebSite',
      cardText: `A selection of web-sites, and URL containing "embed", will be displayed directly in the card`,
      cardContent: 'https://react.dev/',
    },
  ]
  return (
    <div className="homepage-tab-panel">
      <h2>What is Alexandr-e ?</h2>
      <div className="homepage-text">
        Welcome to Alexandr-e — your personal library for web content. <br />
        Save, organize and document your favorite online resources in
        collections, then revisit them anytime with interactive previews. <br />
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
  )
}
