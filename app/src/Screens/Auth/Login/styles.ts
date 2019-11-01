import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    imageView: {flex: 1.5, justifyContent: 'flex-end', alignItems: 'center'},
    image: {height: 200, width: 200},
    formView: { flex: 2, justifyContent: 'center' },
    form: {padding: 20},
    inputView: {height: 80, paddingTop: 10, marginLeft: -15},
    inputError: {paddingLeft: 15},
    formError: {paddingTop: 10, textAlign: 'center'},
    submitButton: {marginTop: 40},
    navigationView: { flexDirection: 'row', justifyContent: 'center'}
})

export default styles