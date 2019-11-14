import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { View, ActivityIndicator } from 'react-native'
import { UploadTaskSnapshot } from 'react-native-firebase/storage'
import { Container, Item, Input, Button, Text, Form, Label } from 'native-base'
import { Formik, FormikActions } from 'formik'
import * as Yup from 'yup'
import { InputError, UploadImage, ProgressScreen } from '@component'
import { useSelector } from 'react-redux'
import { selectUser } from '@service/Auth/authReducer'
import { addAudio } from '@service/Audio/audioReducer'
import { NavigationInjectedProps, NavigationActions } from 'react-navigation'
import DocumentPicker from 'react-native-document-picker'
import AudioService from '@service/Audio/audioService'
import { DEFAULT_AUDIO_IMAGE } from '@util/constants/constants'
import { Audio } from '@service/Audio/types'
import { SCREEN_NAMES } from '@navigation/constants'

interface Props extends NavigationInjectedProps {
  addAudio: (uid: string, data: Audio) => Promise<void>
}

const UploadAudioForm: React.FC<Props> = ({ navigation, addAudio }) => {
  const [avatar, setAvatar] = React.useState(DEFAULT_AUDIO_IMAGE)
  const [percentage, setPercentage] = React.useState(0)
  const [loader, setLoader] = React.useState(false)

  const user = useSelector(selectUser)

  const uploadProgress = (snapshot: UploadTaskSnapshot) => {
    const percentage = (snapshot.bytesTransferred * 100) / snapshot.totalBytes
    setPercentage(Math.ceil(percentage) - 1)
  }

  const handleSubmit = async (
    values: { title: string; description: string },
    { setSubmitting, setStatus }: FormikActions<{ title: string; description: string }>,
  ) => {
    try {
      setLoader(true)
      const thumbnail = await AudioService.saveFile(user.uid, avatar)
      const audio = await AudioService.saveFile(user.uid, navigation.getParam('audio', undefined), uploadProgress)
      const data: Audio = {
        id: audio.metadata.generation,
        title: values.title,
        thumbnail: thumbnail.downloadURL,
        author: user.accountName,
        views: 0,
        details: {
          audio: audio.downloadURL,
          ratings: true,
          description: values.description,
          created: audio.metadata.timeCreated,
        },
      }

      await addAudio(user.uid, data)
      setPercentage(100)
    } catch ({ message }) {
      setStatus(message)
    } finally {
      setTimeout(() => {
        setLoader(false)
      }, 1000)
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

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string(),
  })

  return (
    <>
      <Container>
        <Formik
          initialValues={{
            title: '',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, setFieldTouched, errors, touched, isSubmitting, status }) => {
            return (
              <Form style={styles.form}>
                <UploadImage avatar={avatar.uri} onUpload={onUpload} square large style={{ marginTop: 20 }}>
                  Upload audio thumbnail
                </UploadImage>
                <View style={styles.inputView}>
                  <Item floatingLabel error={touched.title && !!errors.title}>
                    <Label>Title</Label>
                    <Input
                      testID={'title'}
                      onChangeText={handleChange('title')}
                      value={values.title}
                      onBlur={() => setFieldTouched('title')}
                      autoCapitalize="none"
                    />
                  </Item>
                  {errors.title && touched.title && (
                    <InputError style={styles.inputError} testID={'accountNameError'}>
                      {errors.title}
                    </InputError>
                  )}
                </View>
                <View style={styles.textareaView}>
                  <Item floatingLabel style={{ height: '100%' }} error={touched.description && !!errors.description}>
                    <Label>Description</Label>
                    <Input
                      testID={'description'}
                      onChangeText={handleChange('description')}
                      value={values.description}
                      onBlur={() => setFieldTouched('description')}
                      autoCapitalize="none"
                      multiline
                      numberOfLines={5}
                      style={{ height: 120 }}
                    />
                  </Item>
                  {errors.description && touched.description && (
                    <InputError style={styles.inputError} testID={'emailError'}>
                      {errors.description}
                    </InputError>
                  )}
                </View>
                <Button testID={'submit'} rounded large onPress={handleSubmit} style={styles.submitButton}>
                  {isSubmitting ? (
                    <ActivityIndicator testID={'loader'} size="small" color="#ffffff" />
                  ) : (
                    <Text>Add audio</Text>
                  )}
                </Button>
                <InputError style={styles.formError} testID={'formError'}>
                  {status}
                </InputError>
              </Form>
            )
          }}
        </Formik>
      </Container>
      {loader && (
        <ProgressScreen progress={percentage} title={percentage === 100 ? 'Upload succeeded!' : 'Uploading...'} />
      )}
    </>
  )
}

export default connect(
  null,
  { addAudio },
)(UploadAudioForm)
