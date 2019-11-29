import React from 'react'
import styles from './styles'
import { Container, Header, Content, Icon, Accordion, Text, View, Button } from 'native-base'
import moment from 'moment'
import { ShareFab, AvatarListItem } from '@component/index'
import { Audio } from '@service/Audio/types'
interface Props {
  audio: Audio
}

const PlayerToolkit: React.FC<Props> = ({ audio }) => {
  return (
    <View style={styles.playerToolkit}>
      <Content padder>
        <View style={styles.header}>
          <Text style={styles.audioTitle}>{audio.title}</Text>
          <Text style={styles.titleMetatext}>{`${audio.views + ' views'} • ${moment(audio.created).format(
            'DD.MM.YYYY',
          )}`}</Text>
        </View>
        <View style={styles.actionButtons}>
          <View style={styles.ratings}>
            <Button style={styles.button} transparent>
              <Icon style={styles.buttonIcon} type="FontAwesome" name="thumbs-up" />
            </Button>
            <Button style={styles.button} transparent>
              <Icon style={styles.buttonIcon} type="FontAwesome5" name="thumbs-down" />
            </Button>
          </View>
          <View>
            <Button style={[styles.button, { alignSelf: 'flex-start' }]} transparent>
              <Icon style={styles.buttonIcon} type="FontAwesome" name="bookmark" />
            </Button>
          </View>
        </View>
        <AvatarListItem author={audio.author.name} />
        <Text style={styles.description}>{audio.details.description}</Text>
      </Content>
      <ShareFab />
    </View>
  )
}

export default PlayerToolkit
