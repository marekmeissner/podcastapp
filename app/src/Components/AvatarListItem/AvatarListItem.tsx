import React from 'react'
import { ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base'
import { DEFAULT_AUDIO_IMAGE } from '@util/constants/constants'

interface Props {
  author: string
}

const AvatarListItem: React.FC<Props> = ({ author }) => {
  return (
    <ListItem avatar style={{ borderBottomWidth: 0, paddingBottom: 20 }}>
      <Left>
        <Thumbnail style={{ height: 35, width: 35 }} source={{ uri: DEFAULT_AUDIO_IMAGE.uri }} />
      </Left>
      <Body>
        <Text>{author}</Text>
        <Text note>123123123 followers</Text>
      </Body>
      <Right>
        <Button rounded style={{ height: 30 }}>
          <Text style={{ fontSize: 15 }}>Follow</Text>
        </Button>
      </Right>
    </ListItem>
  )
}

export default AvatarListItem
