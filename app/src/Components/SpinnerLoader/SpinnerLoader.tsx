import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Spinner } from 'native-base'
import { COLORS } from '@util/styles/colors'
interface Props {
  style?: { [key: string]: number | string }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
})

const SpinnerLoader: React.FC<Props> = ({ style }) => {
  return (
    <Container style={[styles.spinnerContainer, style]}>
      <Spinner color={COLORS.PRIMARY} />
    </Container>
  )
}

export default SpinnerLoader
