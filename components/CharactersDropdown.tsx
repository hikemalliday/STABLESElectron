import { Autocomplete, TextField } from '@mui/material'
import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'

import { getItems, getSpells, getCampOut } from '../fetches'

export const CharactersDropdown = () => {
  const {
    // @ts-ignore
    itemSearchInput,
    // @ts-ignore
    setItemsArray,
    // @ts-ignore
    setSpellsArray,
    // @ts-ignore
    setCampOutArray,
    // @ts-ignore
    itemsCharacterNamesArray,
    // @ts-ignore
    spellsCharacterNamesArray,
    // @ts-ignore
    campOutCharacterNamesArray,
    // @ts-ignore
    setCharacterName,
    // @ts-ignore
    activeView
  } = useItemAndCharacterContext()

  const getCharacterNamesArray = () => {
    switch (activeView) {
      case 'Inventory':
        return itemsCharacterNamesArray
      case 'Spells':
        return spellsCharacterNamesArray
      case 'Camp Out':
        return campOutCharacterNamesArray
      default:
        return []
    }
  }

  const handleDropdownChange = async (charName) => {
    setCharacterName(charName)
    switch (activeView) {
      case 'Inventory':
        const itemsResults = await getItems({ charName: charName, itemName: itemSearchInput })
        if (itemsResults) {
          setItemsArray(itemsResults)
        }
        break
      case 'Spells':
        const spellsResults = await getSpells({ charName: charName })
        if (spellsResults) {
          setSpellsArray(spellsResults)
        }
        break
      case 'Camp Out':
        const campOutResults = await getCampOut({ charName: charName })
        if (campOutResults) {
          setCampOutArray(campOutResults)
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
