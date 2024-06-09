import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'
import { getCharNames, getClassNames } from '../helper'
import { getMissingSpells, getItems, getSpells, getCampOut, getYellowText } from '@renderer/fetches'

export const SubHeader = () => {
  //@ts-ignore
  const { activeView, setActiveView, itemsArray, spellsArray, campOutArray, setItemsCharacterNamesArray, setItemsCharacterClassesArray, setSpellsCharacterClassesArray, setSpellsCharacterNamesArray, setCampOutCharacterClassesArray, setCampOutCharacterNamesArray, yellowTextArray, setYellowTextArray, yellowTextCharactersArray, setYellowTextCharactersArray } = useItemAndCharacterContext()

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
  const handleMissingSpellsViewClick = async () => {
    setActiveView('MissingSpells')
    const resp = await getMissingSpells({charName: 'All', charClass: 'All', spellName: ''})
    const names = getCharNames(resp)
    const classes = getClassNames(resp)
    if (resp) {
      setSpellsCharacterNamesArray(names)
      setSpellsCharacterClassesArray(classes)
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

  const handleYellowTextViewClick = async () => {
    setActiveView('Yellow Text')
    const resp = await getYellowText({ charName: 'All' })
    const names = getCharNames(resp)
    if (resp) {
      setSpellsCharacterNamesArray(names)
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
          className={activeView === 'MissingSpells' ? 'view-option clicked' : 'view-option'}
          onClick={handleMissingSpellsViewClick}
        >
          MISSING SPELLS
        </div>
        <div
          className={activeView === 'Camp Out' ? 'view-option clicked' : 'view-option'}
          onClick={handleCampoutViewClick}
        >
          CAMP OUT
        </div>
        <div
          className={activeView === 'Yellow Text' ? 'view-option clicked' : 'view-option'}
          onClick={handleYellowTextViewClick}
        >
          YELLOW TEXT
        </div>
      </div>
    </div>
  )
}
