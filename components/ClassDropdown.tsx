import { Autocomplete, TextField } from '@mui/material'
import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'

import { getItems, getSpells, getCampOut } from '../fetches'

export const ClassDropdown = () => {
  const {
    // @ts-ignore
    characterName,
    // @ts-ignore
    searchBarInput,
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
    itemsCharacterClassesArray,
    // @ts-ignore
    spellsCharacterClassesArray,
    // @ts-ignore
    campOutCharacterClassesArray,
    // @ts-ignore
    setCharacterName,
    // @ts-ignore
    setCharacterClass,
    // @ts-ignore
    className,
    // @ts-ignore
    activeView
  } = useItemAndCharacterContext()

  const getCharacterClassesArray = () => {
    switch (activeView) {
      case 'Inventory':
        return itemsCharacterClassesArray
      case 'Spells':
        return spellsCharacterClassesArray
      case 'Camp Out':
        return campOutCharacterClassesArray
      default:
        return []
    }
  }

  const handleDropdownChange = async (className) => {
    setCharacterClass(className)
    switch (activeView) {
      case 'Inventory':
        const itemsResults = await getItems({ charName: characterName, charClass: className, itemName: searchBarInput, })
        if (itemsResults) {
          setItemsArray(itemsResults)
        }
        break
      case 'Spells':
        const spellsResults = await getSpells({ charName: characterName, charClass: className, spellName: searchBarInput, })
        if (spellsResults) {
          setSpellsArray(spellsResults)
        }
        break
      case 'Camp Out':
        const campOutResults = await getCampOut({ charName: characterName, charClass: className, })
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
        options={getCharacterClassesArray()}
        onChange={(_event, value) => handleDropdownChange(value as string)}
        sx={{ width: 200, marginRight: '8px' }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="CLASS"
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

export default ClassDropdown
