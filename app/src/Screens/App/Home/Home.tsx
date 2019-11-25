import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Container, Content, Root } from 'native-base'
import { AudioTile } from '@component/index'
import { NavigationInjectedProps } from 'react-navigation'
import { getSubscribedAudios, sortAudiosByTimeOfCreation } from '@service/Subscribe/subscribeReducer'
import { RootState } from '@service/rootReducer'
import { AudioSmall } from '@service/Audio/types'
import { SCREEN_NAMES } from '@navigation/constants'

interface Props extends NavigationInjectedProps {
  audios: AudioSmall[]
  getSubscribedAudios: (uids: string[]) => Promise<void>
}

class Home extends React.Component<Props> {
  async componentDidMount() {
    await this.props.getSubscribedAudios([
      'a5zpRQgdsvVqowtMQW5BArjFxDo2',
      '9LcNRpay6BhqlujLO7UIKDA9MF63',
      'KiqT1I0CKFYLJwkCfpovMHjXCcx1',
    ])
  }
  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <>
            {this.props.audios.map(audio => {
              return (
                <React.Fragment key={audio.id}>
                  <AudioTile
                    onPress={() => this.props.navigation.navigate(SCREEN_NAMES.APP_PLAYER, { audio })}
                    thumbnail={audio.thumbnail}
                    title={audio.title}
                    views={audio.views}
                    author={audio.author}
                    created={audio.created}
                  />
                </React.Fragment>
              )
            })}
          </>
        </Content>
      </Container>
    )
  }
}

export default connect(
  (state: RootState) => ({
    audios: sortAudiosByTimeOfCreation(state),
  }),
  { getSubscribedAudios },
)(Home)
