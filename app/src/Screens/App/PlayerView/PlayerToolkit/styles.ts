import { StyleSheet } from 'react-native'
import { COLORS } from '@util/styles/colors'

const styles = StyleSheet.create({
  playerToolkit: {
    flex: 1.4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  headerDesc: {
    flexDirection: 'column',
  },
  description: {
    fontStyle: 'italic',
    fontSize: 15,
    marginTop: 20,
  },
  icon: { fontSize: 18 },
  audioTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  titleMetatext: {
    fontSize: 14,
  },
  button: {
    width: 50,
    height: 50,
  },
  buttonIcon: {
    fontSize: 20,
  },
})

export default styles
