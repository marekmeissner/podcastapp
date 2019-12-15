import React from 'react'
import styles from './styles'
import { Content, Icon, Text, View, Button } from 'native-base'
import moment from 'moment'
import { ShareFab, AvatarListItem } from '@component/index'
import { Audio } from '@service/Audio/types'
import { connect } from 'react-redux'
import { RootState } from '@service/rootReducer'
import { selectUser, followingFlow, savedFlow, loadUser } from '@service/Auth/authReducer'
import { User, SavedAudio } from '@service/Auth/types'
import { SCREEN_NAMES } from '@navigation/constants'
import { NavigationScreenProp, NavigationRoute, NavigationParams } from 'react-navigation'

interface Props {
  audio: Audio
  followingFlow: (user: string, following: string[]) => Promise<void>
  savedFlow: (user: string, saved: SavedAudio[]) => Promise<void>
  user?: User
  navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>
  loadUser: (uid: string) => Promise<User>
}

const PlayerToolkit: React.FC<Props> = ({ audio, followingFlow, user, savedFlow, navigation, loadUser }) => {
  const isFollowed = (user && user.following.includes(audio.author.uid)) || false
  const isSaved = user && user.saved.find(saved => saved.id === audio.id)
  const onFollowPress = async () => {
    if (isFollowed && user) {
      await followingFlow(
        user.uid,
        user.following.filter(uid => uid !== audio.author.uid),
      )
    } else if (user) {
      user.following.push(audio.author.uid)
      await followingFlow(user.uid, user.following)
    }
  }

  const onSavePress = async () => {
    if (isSaved && user) {
      await savedFlow(
        user.uid,
        user.saved.filter(saved => saved.id !== audio.id),
      )
    } else if (user) {
      user.saved.push({ uid: audio.author.uid, id: audio.id, time: moment().format() })
      await savedFlow(user.uid, user.saved)
    }
  }

  const onAvatarListItemPress = async () => {
    const userData = await loadUser(audio.author.uid)
    navigation.navigate(SCREEN_NAMES.APP_PROFILE_VIEW, { user: userData })
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
            <Button style={[styles.button, { alignSelf: 'flex-start' }]} onPress={onSavePress} transparent>
              <Icon style={styles.buttonIcon} type={isSaved ? 'FontAwesome' : 'FontAwesome5'} name="bookmark" />
            </Button>
          </View>
        </View>
        <AvatarListItem
          onPress={onAvatarListItemPress}
          author={audio.author}
          isFollowed={isFollowed}
          followingFlow={onFollowPress}
        />
        <Text style={styles.description}>{audio.details.description}</Text>
      </Content>
      <ShareFab />
    </View>
  )
}

export default connect(
  (state: RootState) => ({
    user: selectUser(state),
  }),
  { followingFlow, savedFlow, loadUser },
)(PlayerToolkit)
