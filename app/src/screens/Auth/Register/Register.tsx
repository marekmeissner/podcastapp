import React from 'react';
import {View, ActivityIndicator, Image} from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Text,
  Form,
  Label,
} from 'native-base';
import {UserSignUpCredentials} from '../types';
import {Formik, FormikActions} from 'formik';
import * as Yup from 'yup';
import {EMAIL_REGEX, PASSWORD_REGEX} from '../../../utils/constants';
import InputError from '../../../components/InputError/InputError';
import NavigatorService from '../../../helpers/navigationService';

export class Register extends React.Component {
  handleSignUp = (
    {email, password}: UserSignUpCredentials,
    {setSubmitting, setStatus}: FormikActions<UserCredentials>,
  ) => null;

  validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(EMAIL_REGEX, 'Email address provided is invalid')
      .required('Required'),
    password: Yup.string()
      .matches(
        PASSWORD_REGEX,
        'Password should have at least 1 uppercase & number',
      )
      .required('Required'),
    passwordRepeat: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match',
    ),
  });

  render() {
    return (
      <Container>
        <View
          style={{height: 250, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            uppercase
            style={{fontSize: 30, marginBottom: -50, fontWeight: '900'}}>
            Sign up
          </Text>
        </View>
        <Content>
          <Formik
            initialValues={{
              email: '',
              password: '',
              passwordRepeat: '',
            }}
            validationSchema={this.validationSchema}
            onSubmit={this.handleSignUp}>
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
                <Form style={{padding: 20}}>
                  <Content style={{height: 80, paddingTop: 10}}>
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
                      <InputError style={{paddingTop: 5}} testID={'emailError'}>
                        {errors.email}
                      </InputError>
                    )}
                  </Content>
                  <Content style={{height: 80, paddingTop: 10}}>
                    <Item
                      floatingLabel
                      error={touched.password && !!errors.password}>
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
                      <InputError
                        style={{paddingTop: 5}}
                        testID={'passwordError'}>
                        {errors.password}
                      </InputError>
                    )}
                  </Content>
                  <Content style={{height: 80, paddingTop: 10}}>
                    <Item
                      floatingLabel
                      error={touched.passwordRepeat && !!errors.passwordRepeat}>
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
                      <InputError
                        style={{paddingTop: 5}}
                        testID={'passwordError'}>
                        {errors.passwordRepeat}
                      </InputError>
                    )}
                  </Content>
                  <Button
                    testID={'submit'}
                    rounded
                    large
                    onPress={handleSubmit}
                    style={{marginTop: 40}}>
                    {isSubmitting ? (
                      <ActivityIndicator
                        testID={'loader'}
                        size="small"
                        color="#ffffff"
                      />
                    ) : (
                      <Text>Sign up</Text>
                    )}
                  </Button>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: 15,
                    }}>
                    <Button
                      transparent
                      small
                      onPress={() => NavigatorService.navigate('Login')}>
                      <Text>Already have account?</Text>
                    </Button>
                  </View>
                </Form>
              );
            }}
          </Formik>
        </Content>
      </Container>
    );
  }
}

export default Register;
