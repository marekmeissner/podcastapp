import React from 'react'
import { ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base'
import { DEFAULT_AUDIO_IMAGE } from '@util/constants/constants'
import { useSelector } from 'react-redux'
import { RootState } from '@service/rootReducer'
import { selectUserFollowing } from '@service/Auth/authReducer'
import { COLORS } from '@util/styles/colors'

interface Props {
  author: { name: string; uid: string }
}

const AvatarListItem: React.FC<Props> = ({ author }) => {
  const followingIds = useSelector((state: RootState) => selectUserFollowing(state))
  const isFollowed = followingIds.includes(author.uid)
  return (
    <ListItem avatar style={{ borderBottomWidth: 0, paddingBottom: 20 }}>
      <Left>
        <Thumbnail style={{ height: 35, width: 35 }} source={{ uri: DEFAULT_AUDIO_IMAGE.uri }} />
      </Left>
      <Body>
        <Text>{author.name}</Text>
        <Text note>123123123 followers</Text>
      </Body>
      <Right>
        <Button rounded style={{ height: 30, backgroundColor: isFollowed ? COLORS.SPACE : COLORS.PRIMARY }}>
          <Text style={{ fontSize: 15 }}>{isFollowed ? 'Unfollow' : 'Follow'}</Text>
        </Button>
      </Right>
    </ListItem>
  )
}

export default AvatarListItem
