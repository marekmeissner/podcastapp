import React from 'react'
import styles from './styles'
import { Button, Thumbnail, Text, View } from 'native-base'
import { useAsyncEffect } from '@hook/useAsyncEffect'
import { DEFAULT_AUDIO_IMAGE } from '@util/constants/constants'
import moment from 'moment'
import AudioService from '@service/Audio/audioService'
import { Audio } from '@service/Audio/types'
import { capitalizeFirstWord } from '@util/helpers/methods'

interface Props extends Omit<Audio, 'id' | 'uid' | 'details'> {
  onPress: () => void
  style?: { [key: string]: string | number }
}

const AudioTile: React.FC<Props> = ({ thumbnail, title, views, name, created, onPress, style }) => {
  const [audioThumbnail, setAudioThumbnail] = React.useState(DEFAULT_AUDIO_IMAGE.uri)

  useAsyncEffect(async () => {
    if (!thumbnail.includes('http')) {
      const url = await AudioService.getDownloadUrl(thumbnail)
      setAudioThumbnail(url)
    }
  }, [thumbnail])

  return (
    <Button style={[styles.audioTile, style]} onPress={onPress}>
      <View>
        <Thumbnail style={styles.thumbnail} source={{ uri: audioThumbnail }} />
      </View>
      <View style={styles.tileBody}>
        <View>
          <Text style={styles.title}>{capitalizeFirstWord(title)}</Text>
        </View>
        <View>
          <Text style={styles.author}>{name}</Text>
          <Text style={styles.metadata}>{`${views} • ${moment(created)
            .startOf('minute')
            .fromNow()}`}</Text>
        </View>
      </View>
    </Button>
  )
}

export default AudioTile
