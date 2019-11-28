import React from 'react'
import styles from './styles'
import { Modal } from 'react-native'
import { Container, Text } from 'native-base'
import ProgressCircle from 'react-native-progress-circle'
import { COLORS } from '@util/styles/colors'

interface Props {
  progress: number
  title: string
}

class ProgressScreen extends React.PureComponent<Props> {
  render() {
    const { title, progress } = this.props
    const uploadSucceeded = progress === 100
    return (
      <Modal animationType="slide" transparent={false} visible={true}>
        <Container style={styles.container}>
          <Text style={[styles.title, { color: uploadSucceeded ? COLORS.SUCCESS : COLORS.PRIMARY }]}>{title}</Text>
          <ProgressCircle
            percent={progress}
            radius={50}
            borderWidth={10}
            color={uploadSucceeded ? COLORS.SUCCESS : COLORS.PRIMARY}
            bgColor={COLORS.DARK_BLUE}
            shadowColor={COLORS.SPACE}
          >
            <Text style={{ color: uploadSucceeded ? COLORS.SUCCESS : COLORS.PRIMARY }}>{progress + '%'}</Text>
          </ProgressCircle>
        </Container>
      </Modal>
    )
  }
}
export default ProgressScreen
