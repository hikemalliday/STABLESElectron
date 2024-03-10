import { Autocomplete, TextField } from '@mui/material'
import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'
import { useEffect } from 'react'
import { getItems } from '../fetches'

export const CharactersDropdown = () => {
  // @ts-ignore
  const { itemSearchInput, setItemsArray, characterNamesArray, setCharacterName } =
    useItemAndCharacterContext()

  const handleDropdownChange = async (charName) => {
    setCharacterName(charName)
    const results = await getItems({ charName: charName, itemName: itemSearchInput })
    if (results) {
      setItemsArray(results)
    }
  }

  useEffect(() => {
    console.log(`characterNamesArray: ${characterNamesArray}`)
  }, [])
  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={characterNamesArray}
        onChange={(_event, value) => handleDropdownChange(value)}
        sx={{ width: 200, marginRight: '8px' }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="CHARACTER"
            variant="standard"
            InputLabelProps={{
              // Specify styles for the label
              style: { color: 'white', padding: 0, margin: 0 } // Change the color to red (replace "red" with your desired color)
            }}
            sx={{
              input: {
                color: 'white',
                padding: '0',
                fontSize: 'smaller',
                display: 'flex',
                alignItems: 'flex-end' // Align text to the bottom
              }
            }}
          />
        )}
      />
    </div>
  )
}

export default CharactersDropdown
