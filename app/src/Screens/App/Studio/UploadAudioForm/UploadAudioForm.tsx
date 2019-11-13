import React from 'react'
import styles from './styles'
import { View, ActivityIndicator } from 'react-native'
import { Container, Item, Input, Textarea, Button, Text, Form, Label } from 'native-base'
import { Formik, FormikActions } from 'formik'
import * as Yup from 'yup'
import { InputError } from '@component'
import { connect } from 'react-redux'
import { selectUser } from '@service/Auth/authReducer'
import { User } from '@service/Auth/types'
import { RootState } from '@service/rootReducer'
import { NavigationInjectedProps } from 'react-navigation'

interface Props extends NavigationInjectedProps {
  user: User | null
}

const UploadAudioForm: React.FC<Props> = ({ navigation }) => {
  const handleUpload = () => {
    console.warn(navigation.getParam('audio', undefined))
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
        onSubmit={handleUpload}
      >
        {({ handleChange, handleSubmit, values, setFieldTouched, errors, touched, isSubmitting, status }) => {
          return (
            <Form style={styles.form}>
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
              <View style={styles.inputView}>
                <Item floatingLabel error={touched.description && !!errors.description}>
                  <Label>Description</Label>
                  <Textarea
                    testID={'description'}
                    onChangeText={handleChange('description')}
                    value={values.description}
                    onBlur={() => setFieldTouched('description')}
                    rowSpan={20}
                    bordered={false}
                    underline={false}
                    autoCapitalize="none"
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
                  <Text>Upload</Text>
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
