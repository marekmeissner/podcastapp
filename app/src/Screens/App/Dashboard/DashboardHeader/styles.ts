import { StyleSheet } from 'react-native'
import { COLORS } from '@util/styles/colors'

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.SPACE,
    borderBottomWidth: 1,
    borderRadius: 2,
    borderBottomWidth: 0,
    shadowColor: COLORS.SPACE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  image: {
    width: 35,
    height: 35,
  },
})

export default styles
