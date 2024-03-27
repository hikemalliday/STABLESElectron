import React, { createContext, useState, useContext, FC, ReactNode } from 'react'

export interface ItemAndCharacterContextContextValue {
  itemsArray: object[]
  setItemsArray: React.Dispatch<React.SetStateAction<object[]>>
  missingSpellsArray: object[]
  setMissingSpellsArray: React.Dispatch<React.SetStateAction<object[]>>
  campOutArray: object[]
  setCampOutArray: React.Dispatch<React.SetStateAction<object[]>>
  characterName: string
  setCharacterName: React.Dispatch<React.SetStateAction<string>>
  characterClass: string
  setCharacterClass: React.Dispatch<React.SetStateAction<string>>
  itemsCharacterNamesArray: string[]
  setItemsCharacterNamesArray: React.Dispatch<React.SetStateAction<string[]>>
  spellsCharacterNamesArray: string[]
  setSpellsCharacterNamesArray: React.Dispatch<React.SetStateAction<string[]>>
  spellsCharacterClassesArray: string[]
  setSpellsCharacterClassesArray: React.Dispatch<React.SetStateAction<string[]>>
  campOutCharacterNamesArray: string[]
  setCampOutCharacterNamesArray: React.Dispatch<React.SetStateAction<string[]>>
  itemsCharacterClassesArray: string[]
  setItemsCharacterClassesArray: React.Dispatch<React.SetStateAction<string[]>>
  campOutCharacterClassesArray: string[]
  setCampOutCharacterClassesArray: React.Dispatch<React.SetStateAction<string[]>>
  eqDir: string
  setEqDir: React.Dispatch<React.SetStateAction<string>>
  searchBarInput: string
  setSearchBarInput: React.Dispatch<React.SetStateAction<string>>
  activeView: string
  setActiveView: React.Dispatch<React.SetStateAction<string>>
}

export const ItemAndCharacterContext = createContext<
  ItemAndCharacterContextContextValue | undefined
>(undefined)

interface ItemAndCharacterContextProviderProps {
  children: ReactNode
}

export const ItemAndCharacterContextProvider: FC<ItemAndCharacterContextProviderProps> = ({
  children
}) => {
  const [itemsArray, setItemsArray] = useState<object[]>([
    {
      itemName: 'test',
      itemLocation: 'test',
      charName: 'test',
      itemId: 'test',
      itemCount: 'test',
      timeStamp: 'test'
    }
  ])
  const [missingSpellsArray, setMissingSpellsArray] = useState<object[]>([{}])
  const [campOutArray, setCampOutArray] = useState<object[]>([{}])
  const [itemsCharacterNamesArray, setItemsCharacterNamesArray] = useState<string[]>(['ALL'])
  const [spellsCharacterNamesArray, setSpellsCharacterNamesArray] = useState<string[]>(['ALL'])
  const [campOutCharacterNamesArray, setCampOutCharacterNamesArray] = useState<string[]>(['ALL'])
  const [itemsCharacterClassesArray, setItemsCharacterClassesArray] = useState<string[]>(['ALL'])
  const [spellsCharacterClassesArray, setSpellsCharacterClassesArray] = useState<string[]>(['ALL'])
  const [campOutCharacterClassesArray, setCampOutCharacterClassesArray] = useState<string[]>(['ALL'])
  const [characterName, setCharacterName] = useState('ALL')
  const [characterClass, setCharacterClass] = useState('ALL')
  const [eqDir, setEqDir] = useState<string>('')
  const [searchBarInput, setSearchBarInput] = useState<string>('')
  const [activeView, setActiveView] = useState('Inventory')
  return (
    <ItemAndCharacterContext.Provider
      value={{
        itemsArray,
        setItemsArray,
        missingSpellsArray,
        setMissingSpellsArray,
        campOutArray,
        setCampOutArray,
        characterName,
        setCharacterName,
        itemsCharacterNamesArray,
        setItemsCharacterNamesArray,
        spellsCharacterNamesArray,
        setSpellsCharacterNamesArray,
        campOutCharacterNamesArray,
        setCampOutCharacterNamesArray,
        characterClass,
        setCharacterClass,
        itemsCharacterClassesArray,
        setItemsCharacterClassesArray,
        spellsCharacterClassesArray,
        setSpellsCharacterClassesArray,
        campOutCharacterClassesArray,
        setCampOutCharacterClassesArray,
        eqDir,
        setEqDir,
        searchBarInput,
        setSearchBarInput,
        activeView,
        setActiveView
      }}
    >
      {children}
    </ItemAndCharacterContext.Provider>
  )
}

export const useItemAndCharacterContext = (): ItemAndCharacterContextContextValue | undefined => {
  return useContext(ItemAndCharacterContext)
}
