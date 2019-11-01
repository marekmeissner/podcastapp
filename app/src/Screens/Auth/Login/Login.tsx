import React from 'react'
import styles from './styles.ts'
import { View, ActivityIndicator, Image } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { connect } from 'react-redux'
import { loginUser } from '@service/Auth/authReducer'
import { UserCredentials } from '@service/Auth/types'
import { Container, Item, Input, Button, Text, Form, Label } from 'native-base'
import { Formik, FormikActions } from 'formik'
import * as Yup from 'yup'
import { EMAIL_REGEX } from '@util/constants/constants'
import { InputError } from '@component'
import { SCREEN_NAMES } from '@navigation/constants'

interface Props extends NavigationInjectedProps {
  loginUser: (credentials: UserCredentials) => Promise<void>
}
export const Login: React.FC<Props> = ({ loginUser, navigation }) => {
  const handleLogin = async (
    credentials: UserCredentials,
    { setSubmitting, setStatus }: FormikActions<UserCredentials>,
  ) => {
    try {
      await loginUser(credentials)
      navigation.navigate('Home')
    } catch ({ message }) {
      setStatus(message)
    } finally {
      setSubmitting(false)
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(EMAIL_REGEX, 'Email address provided is invalid')
      .required('Required!'),
    password: Yup.string().required('Required!'),
  })

  return (
    <Container>
      <View style={styles.imageView}>
        <Image style={styles.image} source={require('@asset/logo.png')} />
      </View>
      <View style={styles.formView}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleSubmit, values, setFieldTouched, errors, touched, isSubmitting, status }) => {
            return (
              <Form style={styles.form}>
                <View style={styles.inputView}>
                  <Item floatingLabel error={touched.email && !!errors.email}>
                    <Label>Email</Label>
                    <Input
                      testID={'email'}
                      keyboardType="email-address"
                      onChangeText={handleChange('email')}
                      value={values.email}
                      onBlur={() => setFieldTouched('email')}
                      autoCapitalize="none"
                    />
                  </Item>
                  {errors.email && touched.email && (
                    <InputError style={styles.inputError} testID={'emailError'}>
                      {errors.email}
                    </InputError>
                  )}
                </View>
                <View style={styles.inputView}>
                  <Item floatingLabel error={touched.password && !!errors.password}>
                    <Label>Password</Label>
                    <Input
                      testID={'password'}
                      onChangeText={handleChange('password')}
                      value={values.password}
                      textContentType="password"
                      secureTextEntry
                      onBlur={() => setFieldTouched('password')}
                      autoCapitalize="none"
                    />
                  </Item>
                  {errors.password && touched.password && (
                    <InputError style={styles.inputError} testID={'passwordError'}>
                      {errors.password}
                    </InputError>
                  )}
                </View>

                <Button testID={'submit'} rounded large onPress={handleSubmit} style={styles.submitButton}>
                  {isSubmitting ? (
                    <ActivityIndicator testID={'loader'} size="small" color="#ffffff" />
                  ) : (
                    <Text>Sign in</Text>
                  )}
                </Button>
                <InputError style={styles.formError} testID={'formError'}>
                  {status}
                </InputError>
                <View style={styles.navigationView}>
                  <Button transparent small onPress={() => navigation.navigate(SCREEN_NAMES.AUTH_FORGOT_PASSWORD)}>
                    <Text>Forgot password?</Text>
                  </Button>
                  <Button transparent small onPress={() => navigation.navigate(SCREEN_NAMES.AUTH_REGISTER)}>
                    <Text>Don't have account?</Text>
                  </Button>
                </View>
              </Form>
            )
          }}
        </Formik>
      </View>
    </Container>
  )
}

export default connect(
  null,
  { loginUser },
)(Login)
