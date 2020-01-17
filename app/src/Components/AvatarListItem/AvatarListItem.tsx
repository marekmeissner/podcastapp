import React from 'react'
import styles from './styles'
import { ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base'
import { DEFAULT_AUDIO_IMAGE } from '@util/constants/constants'
import { COLORS } from '@util/styles/colors'

interface Props {
  author: string
  followingFlow: () => Promise<void>
  isFollowed: boolean
  onPress: () => void
}

const AvatarListItem: React.FC<Props> = ({ author, isFollowed, followingFlow, onPress }) => {
  return (
    <ListItem avatar onPress={onPress}>
      <Left>
        <Thumbnail style={styles.thumbnail} source={{ uri: DEFAULT_AUDIO_IMAGE.uri }} />
      </Left>
      <Body>
        <Text>{author}</Text>
        <Text note>123123123 followers</Text>
      </Body>
      <Right>
        <Button
          rounded
          onPress={followingFlow}
          style={{ height: 30, marginTop: 5, backgroundColor: isFollowed ? COLORS.SPACE : COLORS.PRIMARY }}
        >
          <Text style={styles.buttonText}>{isFollowed ? 'Unfollow' : 'Follow'}</Text>
        </Button>
      </Right>
    </ListItem>
  )
}

export default AvatarListItem
