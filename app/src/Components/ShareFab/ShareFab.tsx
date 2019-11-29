import React from 'react'
import { Button, Icon, Fab } from 'native-base'
import { COLORS } from '@util/styles/colors'

const ShareFab: React.FC = () => {
  const [active, setActive] = React.useState(false)
  return (
    <Fab
      active={active}
      direction="left"
      style={{ backgroundColor: COLORS.PRIMARY, position: 'relative' }}
      onPress={() => setActive(!active)}
    >
      <Icon name="share" />
      <Button style={{ backgroundColor: '#34A34F' }}>
        <Icon name="logo-whatsapp" />
      </Button>
      <Button style={{ backgroundColor: '#3B5998' }}>
        <Icon name="logo-facebook" />
      </Button>
      <Button disabled style={{ backgroundColor: '#DD5144' }}>
        <Icon name="mail" />
      </Button>
    </Fab>
  )
}

export default ShareFab
