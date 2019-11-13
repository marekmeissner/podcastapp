import React from 'react'
import styles from './styles'
import { View, ActivityIndicator } from 'react-native'
import { Container, Item, Input, Button, Text, Form, Label } from 'native-base'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InputError, UploadImage } from '@component'
import { connect } from 'react-redux'
import { selectUser } from '@service/Auth/authReducer'
import { User } from '@service/Auth/types'
import { RootState } from '@service/rootReducer'
import { NavigationInjectedProps } from 'react-navigation'
import DocumentPicker from 'react-native-document-picker'

interface Props extends NavigationInjectedProps {
  user: User | null
}

const UploadAudioForm: React.FC<Props> = ({ navigation }) => {
  const [avatar, setAvatar] = React.useState(
    'http://fioextremadura.es/wp-content/uploads/placeholder-blue-800x600px.png',
  )

  const handleSubmit = () => {
    console.warn(navigation.getParam('audio', undefined))
  }

  const onUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })
      setAvatar(res.uri)
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
              <UploadImage avatar={avatar} onUpload={onUpload} square large style={{ marginTop: 20 }}>
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
  )
}

export default connect((state: RootState) => ({
  user: selectUser(state),
}))(UploadAudioForm)
