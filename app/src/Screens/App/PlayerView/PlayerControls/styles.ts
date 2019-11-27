import { StyleSheet } from 'react-native'
import { COLORS } from '@util/styles/colors'

const styles = StyleSheet.create({
  controlsView: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(30,36,46, .6)',
    display: 'none',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  mainButton: {
      width: 70,
      height: 70,
      borderWidth: 2,
      borderColor: COLORS.WHITE,
      borderRadius: 50
  },
  mainIcon: {
      fontSize: 35,
      color: COLORS.WHITE
  },
  moveButton: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    borderRadius: 50
  },
  moveIcon: {
    fontSize: 25,
    color: COLORS.WHITE
  }
})

export default styles
