import React from 'react'
import styles from './styles'
import { Container, Text } from 'native-base'
import ProgressCircle from 'react-native-progress-circle'
import { COLORS } from '@util/styles/colors'

interface Props {
  progress: number
  title: string
}

const ProgressScreen: React.FC<Props> = ({ title, progress = 0 }) => {
  return (
    <Container style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ProgressCircle
        percent={progress}
        radius={50}
        borderWidth={10}
        color={COLORS.PRIMARY}
        bgColor={COLORS.DARK_BLUE}
        shadowColor={COLORS.SPACE}
      >
        <Text style={styles.counter}>{progress + '%'}</Text>
      </ProgressCircle>
    </Container>
  )
}

export default ProgressScreen
