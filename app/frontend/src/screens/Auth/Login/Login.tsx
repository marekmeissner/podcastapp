import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Container, Content, Item, Input, Button, Text, Form} from 'native-base';
import {UserCredentials} from '../types';
import {Formik, FormikActions} from 'formik';
import * as Yup from 'yup';
import {EMAIL_REGEX} from '../../../utils/constants';

class Login extends React.Component {
  handleLogin = (
    {email, password}: UserCredentials,
    {setSubmitting, setStatus}: FormikActions<UserCredentials>,
  ) => setSubmitting(false);

  validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(EMAIL_REGEX, 'Email address provided is invalid')
      .required('Required'),
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
                    {errors.email && (
                      <Text testID={'emailError'}>{errors.email}</Text>
                    )}
                  </View>

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
                  <Button
                    testID={'submit'}
                    rounded
                    onPress={handleSubmit}
                    disabled={!isValid}>
                    {isSubmitting ? (
                      <ActivityIndicator
                        testID={'loader'}
                        size="small"
                        color="#ffffff"
                      />
                    ) : (
                      <Text>Logiiin</Text>
                    )}
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
