import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'
import { getCharNames, getClassNames } from '../helper'
import { getSpells, getItems, getCampOut } from '@renderer/fetches'

export const SubHeader = () => {
  //@ts-ignore
  const { activeView, setActiveView, itemsArray, spellsArray, campOutArray, setItemsCharacterNamesArray, setItemsCharacterClassesArray, setSpellsCharacterClassesArray, setSpellsCharacterNamesArray, setCampOutCharacterClassesArray, setCampOutCharacterNamesArray } = useItemAndCharacterContext()

  const handleInventoryViewClick = async () => {
    setActiveView('Inventory')
    const resp = await getItems({itemName: '', charName: 'All', charClass: 'All'})
    const names = getCharNames(resp)
    const classes = getClassNames(resp)
    if (resp) {
      setItemsCharacterNamesArray(names)
      setItemsCharacterClassesArray(classes)
    }
  }
  const handleCampoutViewClick = async () => {
    setActiveView('Camp Out')
    const resp = await getCampOut({charName: 'All', charClass: 'All'})
    const names = getCharNames(resp)
    const classes = getClassNames(resp)
    if (resp) {
      setCampOutCharacterNamesArray(names)
      setCampOutCharacterClassesArray(classes)
    }
  }
  const handleSpellsViewClick = async () => {
    setActiveView('Spells')
    const resp = await getSpells({charName: 'All', charClass: 'All', spellName: ''})
    const names = getCharNames(resp)
    const classes = getClassNames(resp)
    if (resp) {
      setSpellsCharacterNamesArray(names)
      setSpellsCharacterClassesArray(classes)
    }
  }
  return (
    <div className="sub-header">
      <div className="views-select">
        <div
          className={activeView === 'Inventory' ? 'view-option clicked' : 'view-option'}
          onClick={handleInventoryViewClick}
        >
          INVENTORY
        </div>
        <div
          className={activeView === 'Spells' ? 'view-option clicked' : 'view-option'}
          onClick={handleSpellsViewClick}
        >
          SPELLS
        </div>
        <div
          className={activeView === 'Camp Out' ? 'view-option clicked' : 'view-option'}
          onClick={handleCampoutViewClick}
        >
          CAMP OUT
        </div>
      </div>
    </div>
  )
}
