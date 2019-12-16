import { StyleSheet } from 'react-native'
import { COLORS } from '@util/styles/colors'

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.SPACE,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    shadowColor: COLORS.SPACE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    flex: 1,
  },
  image: {
    width: 35,
    height: 35,
  },
  searchInput: {
    height: 35,
    width: '100%',
  },
  searchIcon: {
    fontSize: 20,
  },
  closeIcon: {
    fontSize: 30,
    paddingLeft: 2,
  },
  audiosList: {
    minHeight: 150,
    height: 'auto',
    width: '100%',
    backgroundColor: 'rgba(22,27,34, 0.9)',    
    position: 'absolute',
    top: 88,
    zIndex: 500
  }
})

export default styles
