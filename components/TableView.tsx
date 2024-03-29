import { InventoryView } from './InventoryView'
import { SpellsView } from './SpellsView'
import { MissingSpellsView } from './MissingSpellsView'
import { CampOutView } from './CampOutView'
import { useItemAndCharacterContext } from '@renderer/context/ItemAndCharacterContext'

export const TableView = () => {
  // @ts-ignore
  const { activeView } = useItemAndCharacterContext()
  return (
    <>
      <div className={`view-component${activeView === 'Inventory' ? 'active' : ''}`}>
        <InventoryView />
      </div>
      <div className={`view-component${activeView === 'Spells' ? 'active' : ''}`}>
        <SpellsView />
      </div>
      <div className={`view-component${activeView === 'MissingSpells' ? 'active' : ''}`}>
        <MissingSpellsView />
      </div>
      <div className={`view-component${activeView === 'Camp Out' ? 'active' : ''}`}>
        <CampOutView />
      </div>
    </>
  )
}
