import './App.css'
import Header from './components/Header'
import TableView from './components/TableView'
import { ItemAndCharacterContextProvider } from './context/ItemAndCharacterContext'

function App(): JSX.Element {
  return (
    <>
      <ItemAndCharacterContextProvider>
        <Header />
        <TableView />
      </ItemAndCharacterContextProvider>
    </>
  )
}

export default App
