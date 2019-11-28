import React from 'react'
import { Switch, Text, Left, Button, Right, Icon } from 'native-base'

interface Props {
  value: boolean
  onPress: () => void
  icon: string
  children: string
  style?: { [key: string]: string | number }
}

const SwitchItem: React.FC<Props> = ({ onPress, value, icon, children, style }) => {
  return (
    <Button style={style} transparent onPress={() => onPress()}>
      <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon type="FontAwesome5" name={icon} />
        <Text style={{ paddingLeft: 10 }}>{children}</Text>
      </Left>
      <Right>
        <Switch value={value} />
      </Right>
    </Button>
  )
}

export default SwitchItem
