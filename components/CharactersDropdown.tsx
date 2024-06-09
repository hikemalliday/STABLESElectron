import { Autocomplete, TextField } from '@mui/material'
import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'

import { getItems, getSpells, getMissingSpells, getCampOut, getYellowText } from '../fetches'

export const CharactersDropdown = () => {
  const {
    // @ts-ignore
    searchBarInput,
    // @ts-ignore
    setItemsArray,
    // @ts-ignore
    setSpellsArray,
    // @ts-ignore
    setMissingSpellsArray,
    // @ts-ignore
    setCampOutArray,
    // @ts-ignore
    setYellowTextArray,
    // @ts-ignore
    itemsCharacterNamesArray,
    // @ts-ignore
    spellsCharacterNamesArray,
    // @ts-ignore
    campOutCharacterNamesArray,
    // @ts-ignore
    setCharacterName,
    // @ts-ignore
    activeView,
    // @ts-ignore
    characterClass,
    // @ts-ignore
    yellowTextCharactersArray,
    // @ts-ignore
    setYellowTextCharactersArray,
  } = useItemAndCharacterContext()

  const getCharacterNamesArray = () => {
    switch (activeView) {
      case 'Inventory':
        return itemsCharacterNamesArray
      case 'Spells':
        return spellsCharacterNamesArray
      case 'MissingSpells':
        return spellsCharacterNamesArray
      case 'Camp Out':
        return campOutCharacterNamesArray
      case 'Yellow Text':
        return yellowTextCharactersArray
      default:
        return []
    }
  }

  const handleDropdownChange = async (charName) => {
    setCharacterName(charName)
    switch (activeView) {
      case 'Inventory':
        const itemsResults = await getItems({ charName: charName, charClass: characterClass, itemName: searchBarInput, })
        if (itemsResults) {
          setItemsArray(itemsResults)
        }
        break
      case 'Spells':
        const spellsResults = await getSpells({ charName: charName, charClass: characterClass, spellName: searchBarInput, })
        if (spellsResults) {
          setSpellsArray(spellsResults)
        }
        break
      case 'MissingSpells':
        const missingSpellsResults = await getMissingSpells({ charName: charName, charClass: characterClass, spellName: searchBarInput, })
        if (missingSpellsResults) {
          setMissingSpellsArray(missingSpellsResults)
        }
        break
      case 'Camp Out':
        const campOutResults = await getCampOut({ charName: charName, charClass: characterClass, })
        if (campOutResults) {
          setCampOutArray(campOutResults)
        }
        break
      case 'Yellow Text':
        const yellowTextResults = await getYellowText({ charName: charName })
        if (yellowTextResults) {
          setYellowTextArray(yellowTextResults)
        }
        break
      default:
        break
    }
  }

 

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={getCharacterNamesArray()}
        onChange={(_event, value) => handleDropdownChange(value)}
        sx={{ width: 200, marginRight: '8px' }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="CHARACTER"
            variant="standard"
            InputLabelProps={{
              style: { color: 'white', padding: 0, margin: 0 }
            }}
            sx={{
              input: {
                color: 'white',
                padding: '0',
                fontSize: 'smaller',
                display: 'flex',
                alignItems: 'flex-end'
              }
            }}
          />
        )}
      />
    </div>
  )
}

export default CharactersDropdown
