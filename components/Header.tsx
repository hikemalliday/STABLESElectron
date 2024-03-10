import EqDir from './Eqdir'
import ItemInput from './ItemInput'
import CharactersDropdown from './CharactersDropdown'
import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'
import { parseItems } from '../fetches'
import { getCharNames } from '../helper'
import { SubHeader } from './SubHeader'

export const Header = () => {
  // @ts-ignore
  const { eqDir, setItemSearchInput, setItemsArray, setCharacterNamesArray } =
    useItemAndCharacterContext()

  const handleLogoClick = () => {
    setItemSearchInput('')
  }

  const handleParseClick = async () => {
    const results = await parseItems(eqDir)
    if (results) {
      setItemsArray(results)
      setCharacterNamesArray(getCharNames(results))
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
          <div className="header-button" onClick={() => handleParseClick()}>
            PARSE
          </div>
          <SubHeader />
        </div>
      </div>
    </>
  )
}

export default Header
