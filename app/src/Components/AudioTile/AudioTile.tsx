import React from 'react'
import styles from './styles'
import { Button, Thumbnail, Text, View } from 'native-base'
import { AudioSmall } from '@service/Audio/types'
import { useAsyncEffect } from '@hook/useAsyncEffect'
import { DEFAULT_AUDIO_IMAGE } from '@util/constants/constants'
import moment from 'moment'
import AudioService from '@service/Audio/audioService'

interface Props extends Omit<AudioSmall, 'id'> {
  onPress: () => void
}

const AudioTile: React.FC<Props> = ({ thumbnail, title, views, author, created, onPress }) => {
  const [audioThumbnail, setAudioThumbnail] = React.useState(DEFAULT_AUDIO_IMAGE.uri)

  useAsyncEffect(async () => {
    const url = await AudioService.getDownloadUrl(thumbnail)
    setAudioThumbnail(url)
  }, [thumbnail])

  return (
    <Button style={styles.audioTile} onPress={onPress}>
      <View>
        <Thumbnail style={styles.thumbnail} source={{ uri: audioThumbnail }} />
      </View>
      <View style={styles.tileBody}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <Text style={styles.author}>{author.name}</Text>
          <Text style={styles.metadata}>{`${views} • ${moment(created)
            .startOf('minute')
            .fromNow()}`}</Text>
        </View>
      </View>
    </Button>
  )
}

export default AudioTile
