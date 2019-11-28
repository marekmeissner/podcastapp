import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Container, Content } from 'native-base'
import { AudioTile, SpinnerLoader } from '@component/index'
import { NavigationInjectedProps } from 'react-navigation'
import { getSubscribedAudios, sortAudiosByTimeOfCreation } from '@service/Subscribe/subscribeReducer'
import { RootState } from '@service/rootReducer'
import { AudioSmall } from '@service/Audio/types'
import { SCREEN_NAMES } from '@navigation/constants'

interface Props extends NavigationInjectedProps {
  audios: AudioSmall[]
  getSubscribedAudios: (uids: string[]) => Promise<void>
}

interface State {
  loading: boolean
}

class Home extends React.Component<Props> {
  state: State = {
    loading: false,
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true })
      await this.props.getSubscribedAudios([
        'a5zpRQgdsvVqowtMQW5BArjFxDo2',
        '9LcNRpay6BhqlujLO7UIKDA9MF63',
        'KiqT1I0CKFYLJwkCfpovMHjXCcx1',
      ])
      this.setState({ loading: false })
    } catch (e) {}
  }
  render() {
    const { audios } = this.props
    const { loading } = this.state
    return (
      <Container>
        {audios && !loading ? (
          <Content style={styles.content}>
            {audios.map(audio => {
              return (
                <AudioTile
                  key={audio.id}
                  onPress={() =>
                    this.props.navigation.navigate(SCREEN_NAMES.APP_PLAYER, { audios, audio: audios.indexOf(audio) })
                  }
                  thumbnail={audio.thumbnail}
                  title={audio.title}
                  views={audio.views}
                  author={audio.author}
                  created={audio.created}
                />
              )
            })}
          </Content>
        ) : (
          <SpinnerLoader />
        )}
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
