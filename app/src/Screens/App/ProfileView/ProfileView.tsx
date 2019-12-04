import React from 'react'
import styles from './styles'
import { Container, Content, View, Text, Thumbnail, Tabs, Tab } from 'native-base'
import { DEFAULT_AUDIO_IMAGE } from '@util/constants/constants'
import { COLORS } from '@util/styles/colors'

const ProfileView: React.FC = () => {
  return (
    <Container style={styles.container}>
      <Content>
        <View style={styles.intro}>
          <Thumbnail source={{ uri: DEFAULT_AUDIO_IMAGE.uri }} large circular />
          <View style={styles.introCounter}>
            <Text style={styles.introCounterTitle}>Followers</Text>
            <Text>50</Text>
          </View>
          <View style={styles.introCounter}>
            <Text style={styles.introCounterTitle}>Following</Text>
            <Text>55</Text>
          </View>
        </View>
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionUser}>Mareczek</Text>
          <Text style={styles.description}>
            description fasdf asdf asdfas dfasdfsafasdfasdf df asd ffdaf afa dfsdafas fdadfa asfdasdfas fasdfa sdfa sdf
            asdfas df
          </Text>
        </View>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: COLORS.PRIMARY }} tabBarActiveTextColor={COLORS.PRIMARY}>
          <Tab
            heading="Audios"
            tabStyle={{ backgroundColor: COLORS.DARK_BLUE }}
            activeTabStyle={{ backgroundColor: COLORS.DARK_BLUE }}
          >
            <Text>Audios</Text>
          </Tab>
        </Tabs>
      </Content>
    </Container>
  )
}

export default ProfileView
