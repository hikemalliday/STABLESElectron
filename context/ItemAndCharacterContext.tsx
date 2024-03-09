import React, { createContext, useState, useContext, FC, ReactNode } from 'react'

export interface ItemAndCharacterContextContextValue {
  itemsArray: object[]
  setItemsArray: React.Dispatch<React.SetStateAction<object[]>>
  characterName: string
  setCharacterName: React.Dispatch<React.SetStateAction<string>>
  characterNamesArray: string[]
  setCharacterNamesArray: React.Dispatch<React.SetStateAction<string[]>>
  eqDir: string
  setEqDir: React.Dispatch<React.SetStateAction<string>>
  itemSearchInput: string
  setItemSearchInput: React.Dispatch<React.SetStateAction<string>>
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
  const [characterNamesArray, setCharacterNamesArray] = useState<string[]>(['ALL'])
  const [characterName, setCharacterName] = useState('ALL')
  const [eqDir, setEqDir] = useState<string>('')
  const [itemSearchInput, setItemSearchInput] = useState<string>('')
  return (
    <ItemAndCharacterContext.Provider
      value={{
        itemsArray,
        setItemsArray,
        characterName,
        setCharacterName,
        characterNamesArray,
        setCharacterNamesArray,
        eqDir,
        setEqDir,
        itemSearchInput,
        setItemSearchInput
      }}
    >
      {children}
    </ItemAndCharacterContext.Provider>
  )
}

export const useItemAndCharacterContext = (): ItemAndCharacterContextContextValue | undefined => {
  return useContext(ItemAndCharacterContext)
}
