import { StyleSheet } from 'react-native'
import { COLORS } from '@util/styles/colors'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upload: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(22, 27, 34, 0.5)',
    height: 200,
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  icon: {
    color: COLORS.PRIMARY,
    paddingBottom: 30,
  },
})

export default styles
