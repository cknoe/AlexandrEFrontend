import { useEffect, useRef } from 'react'
import { useDraftCards } from '../../hooks/useDraftCards'
import type { SaveDraftFormProps } from './draftTypes'
import CreateFromDraftForm from './CreateFromDraftForm'
import AddFromDraftForm from './AddFromDraftForm'
import Tabs from '../Tabs/Tabs'
import type { Tab } from '../Tabs/TabType'

export default function SaveDraftForm({ cardList, index }: SaveDraftFormProps) {
  const { draftCards, clearDraft, removeDraftCard } = useDraftCards()
  const cards = cardList ? cardList : draftCards
  const createInputRef = useRef<HTMLInputElement | null>(null)

  const createTab: Tab = {
    name:'Create',
    content:
      <CreateFromDraftForm
        cards={cards}
        handleKeepDraft={handleKeepDraft}
        createInputRef={createInputRef}
      />
  }

  const addTab: Tab = {
    name:'Add',
    content:
      <AddFromDraftForm
        cards={cards}
        handleKeepDraft={handleKeepDraft}
      />
  }

  useEffect(() => {
    createInputRef.current?.focus()
  }, [])

  function handleKeepDraft() {
    if (index) {
      removeDraftCard(index)
    } else {
      clearDraft()
    }
  }

  return (
    <Tabs tabs={[createTab, addTab]} />
  )
}
