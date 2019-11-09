import React from 'react'
import Welcome from './Welcome/Welcome'

const Studio: React.FC = () => {
  const [selected, setSelected] = React.useState()
  return <>{!selected ? <Welcome setSelected={setSelected} /> : null}</>
}

export default Studio
