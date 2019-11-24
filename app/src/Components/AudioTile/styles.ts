import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  audioTile: {
    width: '90%',
    height: 80,
    borderRadius: 0,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: 'transparent',
  },
  thumbnail: {
    height: 77.25,
    width: 125,
    borderRadius: 0,
  },
  tileBody: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    fontSize: 15,
    height: '100%',
    paddingLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  author: {
    fontSize: 14,
  },
  metadata: {
    fontSize: 14,
  },
})

export default styles
