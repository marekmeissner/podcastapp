import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    headerView: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
    header: {fontSize: 30, fontWeight: '900'},
    formView: {flex: 5, justifyContent: 'center'},
    form: {padding: 20},
    inputView: {height: 80, paddingTop: 10, marginLeft: -15},
    inputError: {paddingLeft: 15},
    formError: {paddingTop: 10, textAlign: 'center'},
    submitButton: {marginTop: 40},
    navigationView: { flexDirection: 'row', justifyContent: 'center'}
})

export default styles