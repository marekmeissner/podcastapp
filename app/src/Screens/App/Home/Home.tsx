import React from 'react'
import styles from './styles'
import { Container, Content } from 'native-base'
import { AudioTile } from '@component/index'
import { NavigationInjectedProps } from 'react-navigation'
import { DEFAULT_AUDIO_IMAGE } from '@util/constants/constants'

const Home: React.FC<NavigationInjectedProps> = () => {
  return (
    <Container>
      <Content style={styles.content}>
        <AudioTile thumbnail={DEFAULT_AUDIO_IMAGE.uri} title={'title'} views={0} author={'Marek Meissner'} />
        <AudioTile thumbnail={DEFAULT_AUDIO_IMAGE.uri} title={'title'} views={0} author={'Marek Meissner'} />

        <AudioTile thumbnail={DEFAULT_AUDIO_IMAGE.uri} title={'title'} views={0} author={'Marek Meissner'} />

        <AudioTile thumbnail={DEFAULT_AUDIO_IMAGE.uri} title={'title'} views={0} author={'Marek Meissner'} />
        <AudioTile thumbnail={DEFAULT_AUDIO_IMAGE.uri} title={'title'} views={0} author={'Marek Meissner'} />
        <AudioTile thumbnail={DEFAULT_AUDIO_IMAGE.uri} title={'title'} views={0} author={'Marek Meissner'} />
        <AudioTile thumbnail={DEFAULT_AUDIO_IMAGE.uri} title={'title'} views={0} author={'Marek Meissner'} />
        <AudioTile thumbnail={DEFAULT_AUDIO_IMAGE.uri} title={'title'} views={0} author={'Marek Meissner'} />

        <AudioTile thumbnail={DEFAULT_AUDIO_IMAGE.uri} title={'title'} views={0} author={'Marek Meissner'} />
      </Content>
    </Container>
  )
}

export default Home
