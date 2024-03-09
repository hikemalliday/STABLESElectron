import { Input } from '@mui/material/'
import { useItemAndCharacterContext } from '../context/ItemAndCharacterContext'

export function EqDir() {
  // @ts-ignore

  //const { eqDir, setEqDir } = useItemAndCharacterContext()
  const { eqDir, setEqDir } = useItemAndCharacterContext()

  return (
    <div className="eq-dir">
      <Input
        value={eqDir}
        onChange={(e) => setEqDir(e.target.value)}
        defaultValue="EqDir"
        placeholder="Eq Dir"
        sx={{
          input: {
            color: 'white',
            padding: '0',
            fontSize: 'smaller'
          }
        }}
      />
    </div>
  )
}

export default EqDir
