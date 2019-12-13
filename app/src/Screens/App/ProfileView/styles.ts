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
  button: { height: 25, flex: 1 },
  buttonText: { fontSize: 14, fontWeight: 'bold' },
})

export default styles
