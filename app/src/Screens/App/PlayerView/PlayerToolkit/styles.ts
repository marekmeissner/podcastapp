import { StyleSheet } from 'react-native'
import { COLORS } from '@util/styles/colors'

const styles = StyleSheet.create({
  playerToolkit: {
    flex: 1.4,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  description: {
    fontStyle: 'italic',
    fontSize: 15,
    marginTop: 20
  },
  icon: { fontSize: 18 },
  audioTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  titleMetatext: {
    fontSize: 14,
  },
  actionButtons: {
    height: 50,
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.PRIMARY,
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ratings: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: 'auto',
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
