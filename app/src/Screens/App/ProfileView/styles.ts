import {StyleSheet} from 'react-native'
import { COLORS } from '@util/styles/colors'

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    intro: {flexDirection: 'row', justifyContent: 'space-around'},
    introCounter: {alignItems: 'center', justifyContent: 'center'},
    introCounterTitle: {fontWeight: 'bold', color: COLORS.PRIMARY},
    descriptionSection: {flexDirection: 'column', paddingTop: 30},
    descriptionUser: {fontWeight: 'bold', paddingBottom: 15},
    description: {paddingBottom: 15, fontSize: 14}
})

export default styles