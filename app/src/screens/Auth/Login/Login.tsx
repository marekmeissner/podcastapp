import React from 'react'
import { View, ActivityIndicator, Image } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { connect } from 'react-redux'
import { loginUser } from '@service/Auth/authReducer'
import { UserCredentials } from '@service/Auth/types'
import { Container, Content, Item, Input, Button, Text, Form, Label } from 'native-base'
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
      <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: '50%', height: '50%', marginBottom: -50 }} source={require('@asset/logo.png')} />
      </View>
      <Content>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            setFieldTouched,
            errors,
            touched,
            isValid,
            isSubmitting,
            status,
          }) => {
            return (
              <Form style={{ padding: 20 }}>
                <Content style={{ height: 80, paddingTop: 10 }}>
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
                    <InputError style={{ paddingTop: 5 }} testID={'emailError'}>
                      {errors.email}
                    </InputError>
                  )}
                </Content>
                <Content style={{ height: 80, paddingTop: 10 }}>
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
                    <InputError style={{ paddingTop: 5 }} testID={'passwordError'}>
                      {errors.password}
                    </InputError>
                  )}
                </Content>

                <Button testID={'submit'} rounded large onPress={handleSubmit} style={{ marginTop: 40 }}>
                  {isSubmitting ? (
                    <ActivityIndicator testID={'loader'} size="small" color="#ffffff" />
                  ) : (
                    <Text>Sign in</Text>
                  )}
                </Button>
                <InputError style={{ paddingTop: 10, textAlign: 'center' }} testID={'formError'}>
                  {status}
                </InputError>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
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
      </Content>
    </Container>
  )
}

export default connect(
  null,
  { loginUser },
)(Login)
