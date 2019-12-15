import React from 'react'
import styles from './styles'
import { View, ActivityIndicator } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { connect } from 'react-redux'
import { registerUser } from '@service/Auth/authReducer'
import { UserSignUpCredentials } from '@service/Auth/types'
import { Container, Item, Input, Button, Text, Form, Label } from 'native-base'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { EMAIL_REGEX, PASSWORD_REGEX } from '@util/constants/constants'
import { InputError } from '@component/index'
import { SCREEN_NAMES } from '@navigation/constants'

interface Props extends NavigationInjectedProps {
  registerUser: (registerData: UserSignUpCredentials) => Promise<void>
}

export const Register: React.FC<Props> = ({ registerUser, navigation }) => {
  const handleSignUp = async (
    newUser: UserSignUpCredentials,
    { setSubmitting, setStatus }: FormikHelpers<UserSignUpCredentials>,
  ) => {
    setSubmitting(true)
    try {
      await registerUser(newUser)
      navigation.navigate(SCREEN_NAMES.APP_TABS)
    } catch ({ message }) {
      setStatus(message)
      setSubmitting(false)
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Required')
      .max(30, 'Must be at most 30 characters'),
    email: Yup.string()
      .matches(EMAIL_REGEX, 'Email address provided is invalid')
      .required('Required'),
    password: Yup.string()
      .matches(PASSWORD_REGEX, 'Password should have at least 1 uppercase & number')
      .required('Required'),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  })

  return (
    <Container>
      <View style={styles.headerView}>
        <Text uppercase style={styles.header}>
          Sign up
        </Text>
      </View>
      <View style={styles.formView}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            passwordRepeat: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ handleChange, handleSubmit, values, setFieldTouched, errors, touched, isSubmitting, status }) => {
            return (
              <Form style={styles.form}>
                <View style={styles.inputView}>
                  <Item floatingLabel error={touched.name && !!errors.name}>
                    <Label>Account name</Label>
                    <Input
                      testID={'name'}
                      onChangeText={handleChange('name')}
                      value={values.name}
                      onBlur={() => setFieldTouched('name')}
                      autoCapitalize="none"
                    />
                  </Item>
                  {errors.name && touched.name && (
                    <InputError style={styles.inputError} testID={'nameError'}>
                      {errors.name}
                    </InputError>
                  )}
                </View>
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
                <View style={styles.inputView}>
                  <Item floatingLabel error={touched.passwordRepeat && !!errors.passwordRepeat}>
                    <Label>Confirm password</Label>
                    <Input
                      testID={'passwordRepeat'}
                      onChangeText={handleChange('passwordRepeat')}
                      value={values.passwordRepeat}
                      textContentType="password"
                      secureTextEntry
                      onBlur={() => setFieldTouched('passwordRepeat')}
                      autoCapitalize="none"
                    />
                  </Item>
                  {errors.passwordRepeat && touched.passwordRepeat && (
                    <InputError style={styles.inputError} testID={'passwordError'}>
                      {errors.passwordRepeat}
                    </InputError>
                  )}
                </View>
                <Button testID={'submit'} rounded large onPress={handleSubmit} style={styles.submitButton}>
                  {isSubmitting ? (
                    <ActivityIndicator testID={'loader'} size="small" color="#ffffff" />
                  ) : (
                    <Text>Sign up</Text>
                  )}
                </Button>
                <InputError style={styles.formError} testID={'formError'}>
                  {status}
                </InputError>
                <View style={styles.navigationView}>
                  <Button
                    testID={'signIn'}
                    transparent
                    small
                    onPress={() => navigation.navigate(SCREEN_NAMES.AUTH_LOGIN)}
                  >
                    <Text>Already have account?</Text>
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

export default connect(null, { registerUser })(Register)
