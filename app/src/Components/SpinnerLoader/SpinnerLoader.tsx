import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Spinner } from 'native-base'
import { COLORS } from '@util/styles/colors'

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
})

const SpinnerLoader = () => {
  return (
    <Container style={styles.spinnerContainer}>
      <Spinner color={COLORS.PRIMARY} />
    </Container>
  )
}

export default SpinnerLoader
