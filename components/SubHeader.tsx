import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'

export const SubHeader = () => {
  //@ts-ignore
  const { activeView, setActiveView } = useItemAndCharacterContext()

  const setInventoryView = () => {
    setActiveView('Inventory')
  }
  const setCampoutView = () => {
    setActiveView('Camp Out')
  }
  const setSpellsView = () => {
    setActiveView('Spells')
  }
  //<Link to="/" onClick={() => handleLinkClick('home')} className={activeLink === 'home' ? 'active' : ''}>Home</Link>
  return (
    <div className="sub-header">
      <div className="views-select">
        <div
          className={activeView === 'Inventory' ? 'view-option clicked' : 'view-option'}
          onClick={setInventoryView}
        >
          INVENTORY
        </div>
        <div
          className={activeView === 'Spells' ? 'view-option clicked' : 'view-option'}
          onClick={setSpellsView}
        >
          SPELLS
        </div>
        <div
          className={activeView === 'Camp Out' ? 'view-option clicked' : 'view-option'}
          onClick={setCampoutView}
        >
          CAMP OUT
        </div>
      </div>
    </div>
  )
}
