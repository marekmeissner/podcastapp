import React from 'react'
import styles from './styles'
import { Content, Icon, Text, View, Button } from 'native-base'
import moment from 'moment'
import { ShareFab, AvatarListItem } from '@component/index'
import { Audio } from '@service/Audio/types'
import { connect } from 'react-redux'
import { RootState } from '@service/rootReducer'
import { selectUser, selectUserFollowing, followingFlow } from '@service/Auth/authReducer'
import { User } from '@service/Auth/types'

interface Props {
  audio: Audio
  followingIds: string[]
  followingFlow: (user: string, following: string[]) => Promise<void>
  user: User
}

const PlayerToolkit: React.FC<Props> = ({ audio, followingIds, followingFlow, user }) => {
  const onFollowButtonPress = async () => {
    if (followingIds.includes(audio.author.uid)) {
      await followingFlow(
        user.uid,
        followingIds.filter(uid => uid !== audio.author.uid),
      )
    } else {
      await followingFlow(user.uid, followingIds.push(audio.author.uid))
    }
  }
  return (
    <View style={styles.playerToolkit}>
      <Content padder>
        <View style={styles.header}>
          <Text style={styles.audioTitle}>{audio.title}</Text>
          <Text style={styles.titleMetatext}>{`${audio.views + ' views'} • ${moment(audio.created).format(
            'DD.MM.YYYY',
          )}`}</Text>
        </View>
        <View style={styles.actionButtons}>
          <View style={styles.ratings}>
            <Button style={styles.button} transparent>
              <Icon style={styles.buttonIcon} type="FontAwesome" name="thumbs-up" />
            </Button>
            <Button style={styles.button} transparent>
              <Icon style={styles.buttonIcon} type="FontAwesome5" name="thumbs-down" />
            </Button>
          </View>
          <View>
            <Button style={[styles.button, { alignSelf: 'flex-start' }]} transparent>
              <Icon style={styles.buttonIcon} type="FontAwesome" name="bookmark" />
            </Button>
          </View>
        </View>
        <AvatarListItem author={audio.author} followingIds={followingIds} followingFlow={onFollowButtonPress} />
        <Text style={styles.description}>{audio.details.description}</Text>
      </Content>
      <ShareFab />
    </View>
  )
}

export default connect(
  (state: RootState) => ({
    user: selectUser(state),
    followingIds: selectUserFollowing(state),
  }),
  { followingFlow },
)(PlayerToolkit)
