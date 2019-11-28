import React from 'react'
import styles from './styles'
import { Animated } from 'react-native'
import { Button, Icon } from 'native-base'

interface Props {
  display: boolean
  paused: boolean
  onPressPlay: () => void
  onPressPause: () => void
  onPressBackward: () => void
  onPressForward: () => void
}

const PlayerControls: React.FC<Props> = ({
  display,
  paused,
  onPressPause,
  onPressPlay,
  onPressBackward,
  onPressForward,
}) => {
  const [fadeOpacity] = React.useState(new Animated.Value(0))
  const [displayPanel, setDisplayPanel] = React.useState('none')

  React.useEffect(() => {
    if (display) {
      setDisplayPanel('flex')
      Animated.timing(fadeOpacity, {
        toValue: 1,
        duration: 1000,
      }).start()
    } else if (!display && !paused) {
      Animated.timing(fadeOpacity, {
        toValue: 0,
        duration: 500,
      }).start(function onComplete() {
        setDisplayPanel('none')
      })
    }
  }, [display, paused])

  return (
    <Animated.View style={[styles.controlsView, { opacity: fadeOpacity, display: displayPanel }]}>
      <Button style={[styles.moveButton, { marginRight: -50 }]} transparent onPress={onPressBackward}>
        <Icon name={'skip-backward'} style={styles.moveIcon} />
      </Button>
      <Button style={styles.mainButton} transparent onPress={paused ? onPressPlay : onPressPause}>
        {paused ? <Icon name={'play'} style={styles.mainIcon} /> : <Icon name={'pause'} style={styles.mainIcon} />}
      </Button>
      <Button style={[styles.moveButton, { marginLeft: -50 }]} transparent onPress={onPressForward}>
        <Icon name={'skip-forward'} style={styles.moveIcon} />
      </Button>
    </Animated.View>
  )
}

export default PlayerControls
