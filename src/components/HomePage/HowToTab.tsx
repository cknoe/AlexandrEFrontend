import { Pencil, Save, Trash2, User } from 'lucide-react'

export default function HowToTab() {
  return (
    <section className="homepage-tab-panel">
      <p className="hide-on-desktop">
        The application is organized around a vertical menu located on the left
        side of the screen. On mobile devices, this menu is accessible by
        clicking the
        <button className="hide-collection-list-div">{'>'}</button>
        button in the top-left corner.
      </p>

      <h2>Guest Mode - Draft</h2>

      <p>
        Without authentication, you have access to the <strong>Draft</strong>{' '}
        tab. This section contains cards stored locally in your browser.
        <br />
        Each card contains:
        <ul>
          <li>a title (required)</li>
          <li>a description (required)</li>
          <li>an optional URL</li>
        </ul>
        To edit a card, click the{' '}
        <button className="homepage-card-button update-button">
          <Pencil className="w-4 h-4" />
        </button>{' '}
        button.
        <span className="hide-on-desktop">
          <br />
        </span>{' '}
        To delete a card, use the{' '}
        <button className="homepage-card-button delete-button red-button">
          <Trash2 className="w-4 h-4" />
        </button>{' '}
        button.
        <br />
        Click on a card to get an expanded view showing a dynamic preview of the
        URL and the full description of this card.
      </p>

      <h2>Authenticated Mode</h2>

      <p>
        You can create an account or sign in using the{' '}
        <button>
          <User size={16} />
        </button>{' '}
        button. Once logged in, additional features become available.
      </p>

      <h3>All Your Cards</h3>

      <p>
        The <strong>All Your Cards</strong> tab displays every card saved to
        your account. Unlike Draft cards, these cards are stored online.
      </p>

      <h3>Your Collections</h3>

      <p>
        Under the <strong>Collections</strong> section, you can manage your
        collections. A collection is a named group of cards.
        <br />
        To create a new collection, click the{' '}
        <button className="homepage-collection-button">+</button> button next to{' '}
        <strong>Your Collections</strong>. A text input will appear so you can
        enter the collection name.
        <br />
        Each collection also includes:
        <ul>
          <li>
            a{' '}
            <button className="homepage-collection-button">
              <Pencil size={16}></Pencil>
            </button>{' '}
            button to rename the collection
          </li>
          <li>
            a{' '}
            <button className="red-button homepage-collection-button">-</button>{' '}
            button to remove the collection
          </li>
        </ul>
      </p>

      <h3>Saving Draft Cards</h3>

      <p>
        When authenticated, a new{' '}
        <button className="homepage-collection-button">
          <Save size={16} />
        </button>{' '}
        appears on the right of the <strong>Draft</strong> tab or on the top
        left of your draft cards.
        <br />
        It allows you to save one or all your draft cards into a new/existing
        collection. You can decide to keep or delete those cards from your draft
        cards.
      </p>
      <h3>Account Management</h3>

      <p>
        Clicking the{' '}
        <button>
          <User size={16} />
        </button>{' '}
        button in the top-right corner opens the user menu.
        <br />
        This menu allows you to:
        <ul>
          <li>edit your account information</li>
          <li>log out</li>
        </ul>
      </p>
    </section>
  )
}
