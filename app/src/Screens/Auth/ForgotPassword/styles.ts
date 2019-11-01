import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: { justifyContent: 'center' },
  headerView: { height: 250, justifyContent: 'center', alignItems: 'center' },
  headerText: { fontSize: 30, marginTop: 150, fontWeight: '900' },
  headerDesc: { fontSize: 14, padding: 20, paddingTop: 30, fontStyle: 'italic' },
  form: { padding: 20 },
  inputView: { height: 80, paddingTop: 10, marginLeft: -15 },
  inputError: { paddingLeft: 15 },
  formError: { paddingTop: 10, textAlign: 'center' },
  submitButton: { marginTop: 40 },
  navigationView: { flexDirection: 'row', justifyContent: 'center' },
})

export default styles
