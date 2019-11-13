import { StyleSheet } from 'react-native'
import { COLORS } from '@util/styles/colors'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  title: {
    paddingBottom: 20,
    fontSize: 20,
  },
  counter: {
    color: COLORS.PRIMARY,
  },
})

export default styles
