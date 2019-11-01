import React from 'react'
import styles from './styles'
import { View, ActivityIndicator } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { connect } from 'react-redux'
import { forgotPassword } from '@service/Auth/authReducer'
import { Container, Item, Input, Button, Text, Form, Label } from 'native-base'
import { Formik, FormikActions } from 'formik'
import * as Yup from 'yup'
import { InputError } from '@component'
import { EMAIL_REGEX } from '@util/constants/constants'
import { SCREEN_NAMES } from '@navigation/constants'

interface Props extends NavigationInjectedProps {
  forgotPassword: (email: string) => Promise<void>
}
export const ForgotPassword: React.FC<Props> = ({ forgotPassword, navigation }) => {
  const handleForgotPassword = async (
    { email }: { email: string },
    { setSubmitting, setStatus }: FormikActions<{ email: string }>,
  ) => {
    setSubmitting(true)
    try {
      await forgotPassword(email)
      setStatus(<Text style={{ color: '#32CD32', fontSize: 13 }}>Email has been sent!</Text>)
    } catch ({ message }) {
      setStatus(message)
    } finally {
      setSubmitting(false)
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(EMAIL_REGEX, 'Email address provided is invalid')
      .required('Required'),
  })

  return (
    <Container style={styles.container}>
      <View style={styles.headerView}>
        <Text uppercase style={styles.headerText}>
          Reset password
        </Text>

        <Text style={styles.headerDesc}>
          In order to change lost password, type in your account's email. After a while - if email is connected to out
          app - you'll receive email with link to change your password
        </Text>
      </View>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleForgotPassword}
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
              <Button testID={'submit'} rounded large onPress={handleSubmit} style={styles.submitButton}>
                {isSubmitting ? (
                  <ActivityIndicator testID={'loader'} size="small" color="#ffffff" />
                ) : (
                  <Text>Send</Text>
                )}
              </Button>
              <InputError style={styles.formError} testID={'formError'}>
                {status}
              </InputError>
              <View style={styles.navigationView}>
                <Button transparent small onPress={() => navigation.navigate(SCREEN_NAMES.AUTH_LOGIN)}>
                  <Text>Wanna sign in?</Text>
                </Button>
              </View>
            </Form>
          )
        }}
      </Formik>
    </Container>
  )
}

export default connect(
  null,
  { forgotPassword },
)(ForgotPassword)
