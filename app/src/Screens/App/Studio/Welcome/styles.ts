import { StyleSheet } from 'react-native'
import { COLORS } from '@util/styles/colors'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 25,
    paddingBottom: 20,
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
  },
  brick: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(22, 27, 34, 0.5)',
    height: 200,
    width: '47%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  largeBrick: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(22, 27, 34, 0.5)',
    height: 200,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  icon: {
    color: COLORS.PRIMARY,
    paddingBottom: 30,
  },
  text: {
    color: COLORS.PRIMARY,
  },
})

export default styles
