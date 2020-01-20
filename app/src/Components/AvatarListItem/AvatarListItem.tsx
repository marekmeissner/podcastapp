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
  followers?: number
}

const AvatarListItem: React.FC<Props> = ({ author, isFollowed, followingFlow, onPress, followers }) => {
  return (
    <ListItem avatar onPress={onPress}>
      <Left>
        <Thumbnail style={styles.thumbnail} source={{ uri: DEFAULT_AUDIO_IMAGE.uri }} />
      </Left>
      <Body>
        <Text>{author}</Text>
        <Text note>{`${followers} follower${followers === 1 ? '' : 's'}`}</Text>
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
