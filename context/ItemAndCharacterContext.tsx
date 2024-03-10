import React, { createContext, useState, useContext, FC, ReactNode } from 'react'

export interface ItemAndCharacterContextContextValue {
  itemsArray: object[]
  setItemsArray: React.Dispatch<React.SetStateAction<object[]>>
  spellsArray: object[]
  setSpellsArray: React.Dispatch<React.SetStateAction<object[]>>
  campOutArray: object[]
  setCampOutArray: React.Dispatch<React.SetStateAction<object[]>>
  characterName: string
  setCharacterName: React.Dispatch<React.SetStateAction<string>>
  itemsCharacterNamesArray: string[]
  setItemsCharacterNamesArray: React.Dispatch<React.SetStateAction<string[]>>
  spellsCharacterNamesArray: string[]
  setSpellsCharacterNamesArray: React.Dispatch<React.SetStateAction<string[]>>
  campOutCharacterNamesArray: string[]
  setCampOutCharacterNamesArray: React.Dispatch<React.SetStateAction<string[]>>
  eqDir: string
  setEqDir: React.Dispatch<React.SetStateAction<string>>
  itemSearchInput: string
  setItemSearchInput: React.Dispatch<React.SetStateAction<string>>
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
  const [itemsArray, setItemsArray] = useState<object[]>([{}])
  const [spellsArray, setSpellsArray] = useState<object[]>([{}])
  const [campOutArray, setCampOutArray] = useState<object[]>([{}])
  const [itemsCharacterNamesArray, setItemsCharacterNamesArray] = useState<string[]>(['ALL'])
  const [spellsCharacterNamesArray, setSpellsCharacterNamesArray] = useState<string[]>(['ALL'])
  const [campOutCharacterNamesArray, setCampOutCharacterNamesArray] = useState<string[]>(['ALL'])
  const [characterName, setCharacterName] = useState('ALL')
  const [eqDir, setEqDir] = useState<string>('')
  const [itemSearchInput, setItemSearchInput] = useState<string>('')
  const [activeView, setActiveView] = useState('Inventory')
  return (
    <ItemAndCharacterContext.Provider
      value={{
        itemsArray,
        setItemsArray,
        spellsArray,
        setSpellsArray,
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
        eqDir,
        setEqDir,
        itemSearchInput,
        setItemSearchInput,
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
