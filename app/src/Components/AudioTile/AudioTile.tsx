import React from 'react'
import styles from './styles'
import { Button, Left, Body, Thumbnail, Text, View } from 'native-base'
import { AudioSmall } from '@service/Audio/types'

const AudioTile: React.FC<Omit<AudioSmall, 'id'>> = ({ thumbnail, title, views, author, created }) => {
  return (
    <Button style={styles.audioTile}>
      <View>
        <Thumbnail source={{ uri: thumbnail }} square large />
      </View>
      <View style={styles.tileBody}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.metadata}>{`${views} • ${created}`}</Text>
        </View>
      </View>
    </Button>
  )
}

export default AudioTile
