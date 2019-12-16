import { StyleSheet } from 'react-native'
import { COLORS } from '@util/styles/colors'

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  intro: { flexDirection: 'row', justifyContent: 'space-around' },
  introCounter: { alignItems: 'center', justifyContent: 'center' },
  introCounterTitle: { fontWeight: 'bold', color: COLORS.PRIMARY },
  descriptionSection: { flexDirection: 'column', paddingTop: 30 },
  descriptionUser: { fontWeight: 'bold', paddingBottom: 15 },
  description: { paddingBottom: 15, fontSize: 14 },
  descriptionEdit: { height: 70, fontSize: 14, borderBottomWidth: 1, borderBottomColor: COLORS.SUCCESS },
  button: { height: 25, flex: 1 },
  buttonText: { fontSize: 14, fontWeight: 'bold', position: 'absolute' },
  editButton: { backgroundColor: 'transparent', height: 25, flex: 1, borderWidth: 1, borderColor: COLORS.SUCCESS },
  addAudioButton: {height: 30, marginTop: 20}
})

export default styles
