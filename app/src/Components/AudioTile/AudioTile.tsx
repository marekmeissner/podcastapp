import React from 'react'
import styles from './styles'
import storage from '@react-native-firebase/storage'
import { Button, Thumbnail, Text, View } from 'native-base'
import { AudioSmall } from '@service/Audio/types'
import { useAsyncEffect } from '@hook/useAsyncEffect'
import { DEFAULT_AUDIO_IMAGE } from '@util/constants/constants'
import moment from 'moment'

const AudioTile: React.FC<Omit<AudioSmall, 'id'>> = ({ thumbnail, title, views, author, created }) => {
  const [audioThumbnail, setAudioThumbnail] = React.useState(DEFAULT_AUDIO_IMAGE.uri)

  useAsyncEffect(async () => {
    const ref = storage().ref(thumbnail)
    const url = await ref.getDownloadURL()
    setAudioThumbnail(url)
  }, [thumbnail])

  return (
    <Button style={styles.audioTile}>
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
