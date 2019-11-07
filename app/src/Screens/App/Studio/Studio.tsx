import React from 'react'
import Welcome from './Welcome/Welcome'

const Studio: React.FC = () => {
  const [selected, setSelected] = React.useState()
  return <>{!selected ? <Welcome /> : null}</>
}

export default Studio
