import Input from '@mui/material/Input'
import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'

import { getItems, getSpells, getCampOut } from '../fetches'

export function ItemSearch() {
  const {
    // @ts-ignore
    itemSearchInput,
    // @ts-ignore
    setItemSearchInput,
    // @ts-ignore
    characterName,
    // @ts-ignore
    setItemsArray,
    // @ts-ignore
    setSpellsArray,
    // @ts-ignore
    setCampOutArray,
    // @ts-ignore
    activeView
  } = useItemAndCharacterContext()
  const handleEnter = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (activeView === 'Inventory') {
        const results = await getItems({
          charName: characterName,
          itemName: itemSearchInput
        })
        if (results) {
          setItemsArray(results)
        }
      } else if (activeView === 'Spells') {
        const results = await getSpells({
          charName: characterName
        })
        if (results) {
          setSpellsArray(results)
        }
      } else if (activeView === 'Camp Out') {
        const results = await getCampOut({
          charName: characterName
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
        value={itemSearchInput}
        onChange={(e) => setItemSearchInput(e.target.value)}
        defaultValue="Item Search"
        placeholder="Item Search"
        sx={{ input: { color: 'white', padding: '0' } }}
        onKeyDown={handleEnter}
      />
    </div>
  )
}

export default ItemSearch
