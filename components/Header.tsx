import EqDir from './Eqdir'
import ItemInput from './ItemInput'
import CharactersDropdown from './CharactersDropdown'
import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'
import { parseItems, parseSpells, parseCampOut } from '../fetches'
import { getCharNames } from '../helper'
import { SubHeader } from './SubHeader'

export const Header = () => {
  const {
    // @ts-ignore
    eqDir,
    // @ts-ignore
    setItemSearchInput,
    // @ts-ignore
    setItemsArray,
    // @ts-ignore
    setSpellsArray,
    // @ts-ignore
    setCampOutArray,
    // @ts-ignore
    setItemsCharacterNamesArray,
    // @ts-ignore
    setSpellsCharacterNamesArray,
    // @ts-ignore
    setCampOutCharacterNamesArray,
    // @ts-ignore
    activeView
  } = useItemAndCharacterContext()

  const handleLogoClick = () => {
    setItemSearchInput('')
  }

  const handleParseClick = async (activeView: string) => {
    if (activeView === 'Inventory') {
      console.log('Headers.handleParseClick.Inventory')
      const results = await parseItems(eqDir)
      if (results) {
        setItemsArray(results)
        setItemsCharacterNamesArray(getCharNames(results))
      }
    } else if (activeView === 'Spells') {
      console.log('Headers.handleParseClick.Spells')
      const results = await parseSpells(eqDir)
      if (results) {
        setSpellsArray(results)
        setSpellsCharacterNamesArray(getCharNames(results))
      }
    } else if (activeView === 'Camp Out') {
      console.log('Headers.handleParseClick.Camp Out')
      const results = await parseCampOut(eqDir)
      if (results) {
        setCampOutArray(results)
        setCampOutCharacterNamesArray(getCharNames(results))
      }
    }
  }

  return (
    <>
      <div className="header-main-container">
        <div className="logo-container">
          <div className="logo" onClick={() => handleLogoClick()}>
            STABLES
          </div>
          <EqDir />
        </div>
        <ItemInput />
        <div className="header-buttons-container">
          <CharactersDropdown />
          <div className="header-button" onClick={() => handleParseClick(activeView)}>
            PARSE
          </div>
          <SubHeader />
        </div>
      </div>
    </>
  )
}

export default Header
