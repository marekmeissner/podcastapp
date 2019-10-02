import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Container, Content, Item, Input, Button, Text, Form} from 'native-base';
import {UserCredentials} from '../types';
import {Formik, FormikActions} from 'formik';
import * as Yup from 'yup';
import {EMAIL_REGEX} from '../../../utils/constants';
import {
  EmailPasswordSignIn,
  GoogleSignIn,
} from '../../../../firebase/auth/signIn';

class Login extends React.Component {
  handleLogin = async (
    {email, password}: UserCredentials,
    {setSubmitting, setStatus}: FormikActions<UserCredentials>,
  ) => {
    try {
      await EmailPasswordSignIn({email, password});
    } catch ({message}) {
      setStatus(message);
    } finally {
      setSubmitting(false);
    }
  };

  handleGoogleLogin = async () => {
    try {
      await GoogleSignIn();
    } catch ({message}) {
      console.warn(message);
    }
  };

  validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(EMAIL_REGEX, 'Email address provided is invalid')
      .required('Required!'),
    password: Yup.string().required('Required!'),
  });

  render() {
    return (
      <Container>
        <Content>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={this.validationSchema}
            onSubmit={this.handleLogin}>
            {({
              handleChange,
              handleSubmit,
              values,
              setFieldTouched,
              errors,
              touched,
              isValid,
              isSubmitting,
            }) => {
              return (
                <Form>
                  <View>
                    <Item error={touched.email && !!errors.email}>
                      <Input
                        placeholder="EMAIL"
                        testID={'email'}
                        keyboardType="email-address"
                        onChangeText={handleChange('email')}
                        value={values.email}
                        onBlur={() => setFieldTouched('email')}
                        autoCapitalize="none"
                      />
                    </Item>
                    {errors.email && touched.email && (
                      <Text testID={'emailError'}>{errors.email}</Text>
                    )}
                  </View>
                  <View>
                    <Item>
                      <Input
                        placeholder="PASSWORD"
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
                      <Text testID={'passwordError'}>{errors.password}</Text>
                    )}
                  </View>

                  <Button testID={'submit'} rounded onPress={handleSubmit}>
                    {isSubmitting ? (
                      <ActivityIndicator
                        testID={'loader'}
                        size="small"
                        color="#ffffff"
                      />
                    ) : (
                      <Text>Sign in</Text>
                    )}
                  </Button>
                  <Button
                    testID={'button'}
                    rounded
                    onPress={this.handleGoogleLogin}>
                    <Text>Sign in with google</Text>
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Content>
      </Container>
    );
  }
}

export default Login;
