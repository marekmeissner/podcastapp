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
import {UserCredentials} from '../types';
import {Formik, FormikActions} from 'formik';
import * as Yup from 'yup';
import {EMAIL_REGEX} from '../../../utils/constants';
import {EmailPasswordSignIn} from '../../../../firebase/auth/signIn';
import InputError from '../../../components/InputError/InputError';

export class Login extends React.Component {
  handleLogin = async (
    {email, password}: UserCredentials,
    {setSubmitting, setStatus}: FormikActions<UserCredentials>,
  ) => {
    try {
      await EmailPasswordSignIn({email, password});
    } catch ({message}) {
      console.warn(message);
    } finally {
      setSubmitting(false);
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
        <View
          style={{height: 300, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{width: '50%', height: '50%', marginBottom: -50}}
            source={require('../../../assets/logo.png')}
          />
        </View>
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
                      <Text>Sign in</Text>
                    )}
                  </Button>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: 15,
                    }}>
                    <Button transparent small>
                      <Text>Forgot password?</Text>
                    </Button>
                    <Button transparent small>
                      <Text>Don't have account?</Text>
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

export default Login;
