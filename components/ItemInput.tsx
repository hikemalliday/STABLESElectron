import Input from '@mui/material/Input'
import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'

import { getItems } from '../fetches'

export function ItemSearch() {
  // @ts-ignore
  const { itemSearchInput, setItemSearchInput, characterName, setItemsArray } =
    useItemAndCharacterContext()
  const handleEnter = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const results = await getItems({
        charName: characterName,
        itemName: itemSearchInput
      })
      if (results) {
        setItemsArray(results)
      }
    }
  }

  return (
    <div className="item-input">
      <Input
        fullWidth
        value={itemSearchInput}
        onChange={(e) => setItemSearchInput(e.target.value)}
        defaultValue="Item Seaqrch"
        placeholder="Item Search"
        sx={{ input: { color: 'white', padding: '0' } }}
        onKeyDown={handleEnter}
      />
    </div>
  )
}

export default ItemSearch
