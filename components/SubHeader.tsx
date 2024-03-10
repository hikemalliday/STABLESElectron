import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'

export const SubHeader = () => {
  const setInventoryView = () => {
    console.log('Set Inventory View')
  }
  const setCampoutView = () => {
    console.log('Set Campout View')
  }
  const setSpellsView = () => {
    console.log('Set Spells View')
  }
  return (
    <div className="sub-header">
      <div className="views-select">
        <div className="view-option">INVENTORY</div>
        <div className="view-option">SPELLS</div>
        <div className="view-option">CAMP OUT</div>
      </div>
    </div>
  )
}
