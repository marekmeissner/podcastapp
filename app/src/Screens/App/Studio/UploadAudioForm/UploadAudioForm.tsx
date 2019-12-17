import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { View, ActivityIndicator } from 'react-native'
import { Container, Content, Item, Input, Button, Text, Form, Label } from 'native-base'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { InputError, UploadImage, ProgressScreen, SwitchItem } from '@component/index'
import { useSelector } from 'react-redux'
import { selectUser } from '@service/Auth/authReducer'
import { addAudio } from '@service/Audio/audioReducer'
import { NavigationInjectedProps } from 'react-navigation'
import DocumentPicker from 'react-native-document-picker'
import AudioService from '@service/Audio/audioService'
import { DEFAULT_AUDIO_IMAGE, MAX_THUMBNAIL_SIZE } from '@util/constants/constants'
import { Audio, AddNewAudio } from '@service/Audio/types'
import { SCREEN_NAMES } from '@navigation/constants'

interface Props extends NavigationInjectedProps {
  addAudio: (data: Audio) => Promise<void>
}

const UploadAudioForm: React.FC<Props> = ({ navigation, addAudio }) => {
  const [thumbnail, setThumbnail] = React.useState(DEFAULT_AUDIO_IMAGE)
  const [percentage, setPercentage] = React.useState(0)
  const [loader, setLoader] = React.useState(false)

  const user = useSelector(selectUser)

  const uploadProgress = (snapshot: any) => {
    const percentage = (snapshot.bytesTransferred * 100) / snapshot.totalBytes
    setPercentage(percentage > 0 ? Math.ceil(percentage) - 1 : 0)
  }

  const handleSubmit = async (values: AddNewAudio, { setSubmitting, setStatus }: FormikHelpers<AddNewAudio>) => {
    try {
      if (!thumbnail.size) {
        return setStatus('You must pick thumbnail!')
      } else if (thumbnail.size > MAX_THUMBNAIL_SIZE) {
        return setStatus('Thumbnail size must be up to 2MB!')
      }
      if (user) {
        setLoader(true)
        const audio = await AudioService.saveFile(user.uid, navigation.getParam('audio', undefined), uploadProgress)
        const audioImage = await AudioService.saveFile(user.uid, thumbnail)
        const data: Audio = {
          id: audio.metadata.generation,
          title: values.title.toLowerCase(),
          thumbnail: audioImage.metadata.fullPath,
          name: user.name,
          uid: user.uid,
          views: 0,
          created: audio.metadata.timeCreated,
          details: {
            audio: audio.metadata.fullPath,
            ratings: values.ratings,
            donations: values.donations,
            description: values.description,
          },
        }

        await addAudio(data)
        setPercentage(100)
        setTimeout(() => {
          setLoader(false)
          navigation.navigate(SCREEN_NAMES.APP_TABS)
        }, 1000)
      } else {
        setStatus('Something went wrong, try again!')
      }
    } catch (e) {
      setStatus(e.message)
      setLoader(false)
    } finally {
      setSubmitting(false)
    }
  }

  const onUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })
      setThumbnail(res)
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
        <Content>
          <Formik
            initialValues={{
              thumbnail: {
                size: 0,
                uri: '',
              },
              title: '',
              description: '',
              ratings: true,
              donations: true,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              setFieldTouched,
              errors,
              touched,
              isSubmitting,
              status,
              setFieldValue,
            }) => {
              return (
                <Form style={styles.form}>
                  <UploadImage
                    testID={'thumbnail'}
                    avatar={thumbnail.uri}
                    onChange={handleChange}
                    onUpload={onUpload}
                    square
                    large
                  >
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
                  <SwitchItem
                    style={{ marginTop: 35 }}
                    icon={'heart'}
                    value={values.ratings}
                    onPress={() => setFieldValue('ratings', !values.ratings)}
                  >
                    Ratings
                  </SwitchItem>
                  <SwitchItem
                    style={{ marginTop: 10 }}
                    icon={'donate'}
                    value={values.donations}
                    onPress={() => setFieldValue('donations', !values.donations)}
                  >
                    Donations
                  </SwitchItem>
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
        </Content>
      </Container>
      {loader && (
        <ProgressScreen progress={percentage} title={percentage === 100 ? 'Upload succeeded!' : 'Uploading...'} />
      )}
    </>
  )
}

export default connect(null, { addAudio })(UploadAudioForm)
