import React from 'react'
import styles from './styles'
import { Image } from 'react-native'
import { Header, Left, Right, Button, Icon, Thumbnail } from 'native-base'
import { NavigationInjectedProps } from 'react-navigation'

import { connect } from 'react-redux'
import { logout, selectUser } from '@service/Auth/authReducer'

import { SCREEN_NAMES } from '@navigation/constants'
import { DEFAULT_AUDIO_IMAGE } from '@util/constants/constants'
import { RootState } from '@service/rootReducer'
import { User } from '@service/Auth/types'

interface Props extends NavigationInjectedProps {
  logout: () => Promise<void>
  user?: User
}

const HeaderBar: React.FC<Props> = ({ logout, navigation, user }) => {
  const logoutPress = () => {
    logout()
    navigation.navigate(SCREEN_NAMES.AUTH_LOGIN)
  }
  const navigatorControl = navigation.router!.getPathAndParamsForState(navigation.state)
  const isProfileView =
    navigatorControl.params &&
    navigatorControl.path.includes(SCREEN_NAMES.APP_PROFILE_VIEW) &&
    !navigatorControl.params.user

  const onAvatarPress = () => {
    if (isProfileView) {
      navigation.navigate(SCREEN_NAMES.AUTH_SETTINGS)
    } else {
      navigation.navigate(SCREEN_NAMES.APP_PROFILE_VIEW, { user: undefined })
    }
  }

  return (
    <Header style={styles.header}>
      <Left>
        <Button transparent onPress={logoutPress}>
          <Image style={styles.image} source={require('@asset/logo.png')} />
        </Button>
      </Left>
      <Right>
        <Button
          transparent
          onPress={() => navigation.navigate(SCREEN_NAMES.APP_STUDIO)}
          active={navigatorControl.path.includes(SCREEN_NAMES.APP_STUDIO)}
        >
          <Icon name="microphone" />
        </Button>
        <Button transparent>
          <Icon name="search" />
        </Button>
        <Button
          transparent
          onPress={onAvatarPress}
          active={isProfileView || navigatorControl.path.includes(SCREEN_NAMES.AUTH_SETTINGS)}
        >
          {isProfileView ? (
            <Icon name="settings" />
          ) : (
            <Thumbnail style={{ height: 30, width: 30 }} source={{ uri: user?.avatar || DEFAULT_AUDIO_IMAGE.uri }} />
          )}
        </Button>
      </Right>
    </Header>
  )
}

export default connect((state: RootState) => ({ user: selectUser(state) }), { logout })(HeaderBar)
