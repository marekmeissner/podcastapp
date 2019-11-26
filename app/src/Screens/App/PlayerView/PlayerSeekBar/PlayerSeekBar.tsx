import React, { Component } from 'react'
import styles from './styles'
import { View, Text } from 'react-native'
import Slider from '@react-native-community/slider'
import { getMinutesAndSeconds } from '@util/helpers/methods'
import { COLORS } from '@util/styles/colors'

interface Props {
  trackLength: number
  currentPosition: number
  onSeek: () => void
  onSlidingStart: () => void
}

const PlayerSeekBar: React.FC<Props> = ({ trackLength, currentPosition, onSeek, onSlidingStart }) => {
  const elapsed = getMinutesAndSeconds(currentPosition)
  const remaining = getMinutesAndSeconds(trackLength - currentPosition)
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.text, { color: COLORS.PRIMARY }]}>{elapsed[0] + ':' + elapsed[1]}</Text>
        <View style={{ flex: 1 }} />
        <Text style={[styles.text, { width: 40, color: COLORS.PRIMARY }]}>
          {trackLength > 1 && '-' + remaining[0] + ':' + remaining[1]}
        </Text>
      </View>
      <Slider
        style={styles.slider}
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        minimumTrackTintColor={COLORS.PRIMARY}
        maximumTrackTintColor={COLORS.WHITE}
        thumbTintColor={COLORS.PRIMARY}
      />
    </View>
  )
}

export default PlayerSeekBar
