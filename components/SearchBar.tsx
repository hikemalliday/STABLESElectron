import Input from '@mui/material/Input'
import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'

import { getItems, getSpells, getMissingSpells, getCampOut } from '../fetches'

export function SearchBar() {
  const {
    // @ts-ignore
    searchBarInput,
    // @ts-ignore
    setSearchBarInput,
    // @ts-ignore
    characterName,
    // @ts-ignore
    setItemsArray,
    // @ts-ignore
    setSpellsArray,
    // @ts-ignore
    setMissingSpellsArray,
    // @ts-ignore
    setCampOutArray,
    // @ts-ignore
    activeView,
    // @ts-ignore
    characterClass,
  } = useItemAndCharacterContext()
  const handleEnter = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (activeView === 'Inventory') {
        const results = await getItems({
          charName: characterName,
          itemName: searchBarInput,
          charClass: characterClass,
        })
        if (results) {
          setItemsArray(results)
        }
      } else if (activeView === 'MissingSpells') {
        const results = await getMissingSpells({
          charName: characterName,
          charClass: characterClass,
          spellName: searchBarInput,
        })
        if (results) {
          setMissingSpellsArray(results)
        }
      } else if (activeView === 'Spells') {
        const results = await getSpells({
          charName: characterName,
          charClass: characterClass,
          spellName: searchBarInput,
        })
        if (results) {
          setSpellsArray(results)
        }
      }
      else if (activeView === 'Camp Out') {
        const results = await getCampOut({
          charName: characterName,
          charClass: characterClass,
        })
        if (results) {
          setCampOutArray(results)
        }
      }
    }
  }

  return (
    <div className="item-input">
      <Input
        fullWidth
        value={searchBarInput}
        onChange={(e) => setSearchBarInput(e.target.value)}
        defaultValue="Search"
        placeholder="Search"
        sx={{ input: { color: 'white', padding: '0' } }}
        onKeyDown={handleEnter}
      />
    </div>
  )
}

export default SearchBar
