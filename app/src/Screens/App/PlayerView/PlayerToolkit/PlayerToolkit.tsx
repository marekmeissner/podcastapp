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
import { capitalizeFirstWord } from '@util/helpers/methods'

interface Props {
  audio: Audio
  followingFlow: (user: string, following: string[]) => Promise<void>
  savedFlow: (user: string, saved: SavedAudio[]) => Promise<void>
  user?: User
  navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>
  loadUser: (uid: string) => Promise<User>
}

const PlayerToolkit: React.FC<Props> = ({ audio, followingFlow, user, savedFlow, navigation, loadUser }) => {
  const isFollowed = (user && user.following.includes(audio.uid)) || false
  const isSaved = user && user.saved.find(saved => saved.id === audio.id)
  const onFollowPress = async () => {
    if (isFollowed && user) {
      await followingFlow(
        user.uid,
        user.following.filter(uid => uid !== audio.uid),
      )
    } else if (user) {
      user.following.push(audio.uid)
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
      user.saved.push({ uid: audio.uid, id: audio.id, time: moment().format() })
      await savedFlow(user.uid, user.saved)
    }
  }

  const onAvatarListItemPress = async () => {
    const userData = await loadUser(audio.uid)
    navigation.navigate(SCREEN_NAMES.APP_PROFILE_VIEW, { user: userData })
  }

  return (
    <View style={styles.playerToolkit}>
      <Content padder>
        <View style={styles.header}>
          <View style={styles.headerDesc}>
            <Text style={styles.audioTitle}>{capitalizeFirstWord(audio.title)}</Text>
            <Text style={styles.titleMetatext}>{`${audio.views + ' views'} • ${moment(audio.created).format(
              'DD.MM.YYYY',
            )}`}</Text>
          </View>
          <View style={{ alignSelf: 'flex-end' }}>
            <Button style={[styles.button, { alignSelf: 'flex-start' }]} onPress={onSavePress} transparent>
              <Icon style={styles.buttonIcon} type={isSaved ? 'FontAwesome' : 'FontAwesome5'} name="bookmark" />
            </Button>
          </View>
        </View>
        <AvatarListItem
          onPress={onAvatarListItemPress}
          author={audio.name}
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
