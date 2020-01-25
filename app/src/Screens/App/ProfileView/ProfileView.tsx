import React from 'react'
import styles from './styles'
import { connect, useSelector } from 'react-redux'
import { Container, Content, View, Text, Button, Input } from 'native-base'
import { DEFAULT_AUDIO_IMAGE, MAX_THUMBNAIL_SIZE } from '@util/constants/constants'
import { COLORS } from '@util/styles/colors'
import { AudioTile, InputError, Avatar, SpinnerLoader } from '@component/index'
import { NavigationInjectedProps } from 'react-navigation'
import { User } from '@service/Auth/types'
import { RootState } from '@service/rootReducer'
import { followingFlow, selectUser, editUser } from '@service/Auth/authReducer'
import { selectUserAudios, getUserAudios } from '@service/Audio/audioReducer'
import { setCurrentAudio, setPlayerTrack } from '@service/Player/playerReducer'
import { Audio } from '@service/Audio/types'
import { SCREEN_NAMES } from '@navigation/constants'
import { useAsyncEffect } from '@hook/useAsyncEffect'
import { Formik, FormikHelpers } from 'formik'
import DocumentPicker from 'react-native-document-picker'
import AudioService from '@service/Audio/audioService'

interface Props extends NavigationInjectedProps {
  setCurrentAudio: (selectedAudio: number) => void
  setPlayerTrack: (playerTrack: Audio[]) => void
  getUserAudios: (uid: string) => Promise<void>
  followingFlow: (user: string, following: string[], isNew: boolean) => Promise<void>
  editUser: (uid: string, user: Partial<User>) => Promise<void>
  authUser?: User
}

const ProfileView: React.FC<Props> = ({
  navigation,
  setCurrentAudio,
  setPlayerTrack,
  getUserAudios,
  authUser,
  followingFlow,
  editUser,
}) => {
  const [editMode, setEditMode] = React.useState(false)
  const user = navigation.getParam('user') as User
  const [avatar, setAvatar] = React.useState()
  const uid = authUser && !user ? authUser.uid : user.uid
  const isFollowed = authUser && authUser.following.find(id => id === uid)
  const isCurrentUser = authUser && authUser.uid === uid

  useAsyncEffect(async () => {
    await getUserAudios(uid)
  }, [uid])

  const userAudios = useSelector((state: RootState) => selectUserAudios(state, uid))

  const runPlayer = (currentAudio: number) => {
    setCurrentAudio(currentAudio)
    setPlayerTrack(userAudios)
    navigation.navigate(SCREEN_NAMES.APP_PLAYER)
  }

  const onFollowPress = async () => {
    if (isFollowed && authUser) {
      await followingFlow(
        authUser.uid,
        authUser.following.filter(uid => uid !== user.uid),
        false,
      )
    } else if (authUser) {
      authUser.following.push(user.uid)
      await followingFlow(user.uid, authUser.following, true)
    }
  }

  const handleEdit = async (
    values: { avatar: string; description: string },
    { setSubmitting, setStatus }: FormikHelpers<{ avatar: string; description: string }>,
  ) => {
    try {
      if (avatar && avatar.size > MAX_THUMBNAIL_SIZE) {
        setAvatar(undefined)
        return setStatus('Avatar size must be up to 2MB!')
      }
      if (avatar) {
        const audio = await AudioService.saveFile(uid, avatar)
        values.avatar = await AudioService.getDownloadUrl(audio.metadata.fullPath)
      }
      setSubmitting(true)
      await editUser(uid, values)
      setEditMode(false)
    } catch ({ message }) {
      setStatus(message)
    } finally {
      setSubmitting(false)
    }
  }

  const onUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })
      setAvatar(res)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
  }

  const onEditClick = () => setEditMode(true)

  return (
    <Container style={styles.container}>
      <Content style={styles.content}>
        <Formik
          initialValues={{
            avatar: (authUser && !user ? authUser.avatar : user.avatar) || DEFAULT_AUDIO_IMAGE.uri,
            description: (authUser && isCurrentUser ? authUser.description : user.description) || '',
          }}
          onSubmit={handleEdit}
        >
          {({ handleChange, handleSubmit, values, setFieldTouched, isSubmitting, status }) => {
            return (
              <>
                <View style={styles.intro}>
                  <Avatar
                    uri={
                      (avatar && avatar.uri) ||
                      (authUser && !user ? authUser.avatar : user.avatar) ||
                      DEFAULT_AUDIO_IMAGE.uri
                    }
                    editMode={editMode}
                    large
                    circular
                    onUpload={onUpload}
                  />
                  <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.introCounter}>
                        <Text style={styles.introCounterTitle}>Followers</Text>
                        <Text>{authUser && !user ? authUser.followers : user.followers}</Text>
                      </View>
                      <View style={[styles.introCounter, { paddingLeft: 20 }]}>
                        <Text style={styles.introCounterTitle}>Following</Text>
                        <Text>{authUser && !user ? authUser.following.length : user.following.length || 0}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      {!isCurrentUser && (
                        <Button
                          onPress={onFollowPress}
                          style={[styles.button, , { backgroundColor: isFollowed ? COLORS.SPACE : COLORS.PRIMARY }]}
                        >
                          <Text style={styles.buttonText}>{isFollowed ? 'Unfollow' : 'Follow'}</Text>
                        </Button>
                      )}
                      {isCurrentUser && !editMode && (
                        <Button style={styles.button} onPress={onEditClick}>
                          <Text style={styles.buttonText}>Edit</Text>
                        </Button>
                      )}
                      {isCurrentUser && editMode && (
                        <Button style={[styles.editButton, isSubmitting && { borderWidth: 0 }]} onPress={handleSubmit}>
                          {!isSubmitting ? (
                            <Text style={styles.buttonText}>Save changes</Text>
                          ) : (
                            <SpinnerLoader spinerColor={COLORS.SUCCESS} />
                          )}
                        </Button>
                      )}
                    </View>
                    {isCurrentUser && editMode && <InputError style={{ marginBottom: -27 }}>{status}</InputError>}
                  </View>
                </View>
                <View style={styles.descriptionSection}>
                  <Text style={styles.descriptionUser}>
                    {authUser && isCurrentUser ? authUser.accountName : user.accountName}
                  </Text>
                  {!editMode ? (
                    <Text style={styles.description}>
                      {authUser && isCurrentUser ? authUser.description : user.description}
                    </Text>
                  ) : (
                    <Input
                      testID={'description'}
                      placeholder={'Edit description'}
                      onChangeText={handleChange('description')}
                      value={values.description}
                      onBlur={() => setFieldTouched('description')}
                      autoCapitalize="none"
                      multiline
                      numberOfLines={4}
                      style={styles.descriptionEdit}
                    />
                  )}
                </View>
              </>
            )
          }}
        </Formik>
        <View style={{ backgroundColor: COLORS.DARK_BLU, marginBottom: 20 }}>
          {userAudios.length > 0 ? (
            userAudios.map(audio => (
              <AudioTile
                key={audio.id}
                onPress={() => runPlayer(userAudios.indexOf(audio))}
                thumbnail={audio.thumbnail || DEFAULT_AUDIO_IMAGE.uri}
                title={audio.title}
                views={audio.views}
                name={audio.name}
                created={audio.created}
                style={{ width: '100%' }}
              />
            ))
          ) : (
            <Button style={styles.addAudioButton} onPress={() => navigation.navigate(SCREEN_NAMES.APP_STUDIO)}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Add your first audio!</Text>
            </Button>
          )}
        </View>
      </Content>
    </Container>
  )
}

export default connect((state: RootState) => ({ authUser: selectUser(state) }), {
  setCurrentAudio,
  setPlayerTrack,
  getUserAudios,
  followingFlow,
  editUser,
})(ProfileView)
