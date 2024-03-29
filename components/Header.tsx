import EqDir from './Eqdir'
import SearchBar from './SearchBar'
import CharactersDropdown from './CharactersDropdown'
import ClassDropdown from './ClassDropdown'
import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'
import { parseItems, parseSpells, parseMissingSpells, parseCampOut } from '../fetches'
import { getCharNames, getClassNames } from '../helper'
import { SubHeader } from './SubHeader'

export const Header = () => {
  const {
    // @ts-ignore
    eqDir,
    // @ts-ignore
    setSearchBarInput,
    // @ts-ignore
    setItemsArray,
    // @ts-ignore
    setSpellsArray,
    // @ts-ignore
    setMissingSpellsArray,
    // @ts-ignore
    setCampOutArray,
    // @ts-ignore
    setItemsCharacterNamesArray,
    // @ts-ignore
    setSpellsCharacterNamesArray,
    // @ts-ignore
    setCampOutCharacterNamesArray,
    // @ts-ignore
    setItemsCharacterClassesArray,
    // @ts-ignore
    setSpellsCharacterClassesArray,
    // @ts-ignore
    setCampOutCharacterClassesArray,
    // @ts-ignore
    activeView
  } = useItemAndCharacterContext()

  const handleLogoClick = () => {
    setSearchBarInput('')
  }

  const handleParseClick = async (activeView: string) => {
    if (activeView === 'Inventory') {
      const results = await parseItems(eqDir)
      if (results) {
        setItemsArray(results)
        setItemsCharacterNamesArray(getCharNames(results))
        setItemsCharacterClassesArray(getClassNames(results))
      }
    } else if (activeView === 'MissingSpells') {
      const results = await parseMissingSpells(eqDir)
      if (results) {
        setMissingSpellsArray(results)
        setSpellsCharacterNamesArray(getCharNames(results))
        setSpellsCharacterClassesArray(getClassNames(results))
      }
    } else if (activeView === 'Spells') {
      const results = await parseSpells(eqDir)
      if (results) {
        setSpellsArray(results)
        setSpellsCharacterNamesArray(getCharNames(results))
        setSpellsCharacterClassesArray(getClassNames(results))
      }
    } else if (activeView === 'Camp Out') {
      const results = await parseCampOut(eqDir)
      if (results) {
        setCampOutArray(results)
        setCampOutCharacterNamesArray(getCharNames(results))
        setCampOutCharacterClassesArray(getClassNames(results))
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
        <SearchBar />
        <div className="header-buttons-container">
          <ClassDropdown/>
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
