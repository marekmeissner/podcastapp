import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import {connect} from 'react-redux';
import {registerUser} from '@service/Auth/authReducer';
import {UserSignUpCredentials} from '@service/Auth/types';
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
import {Formik, FormikActions} from 'formik';
import * as Yup from 'yup';
import {EMAIL_REGEX, PASSWORD_REGEX} from '@util/constants/constants';
import {InputError} from '@component';

interface Props extends NavigationInjectedProps {
  registerUser: (registerData: UserSignUpCredentials) => Promise<void>;
}

export const Register: React.FC<Props> = ({registerUser, navigation}) => {
  const handleSignUp = async (
    newUser: UserSignUpCredentials,
    {setSubmitting, setStatus}: FormikActions<UserSignUpCredentials>,
  ) => {
    setSubmitting(true);
    try {
      await registerUser(newUser);
    } catch ({message}) {
      setStatus(message);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    accountName: Yup.string().required('Required'),
    email: Yup.string()
      .matches(EMAIL_REGEX, 'Email address provided is invalid')
      .required('Required'),
    password: Yup.string()
      .matches(
        PASSWORD_REGEX,
        'Password should have at least 1 uppercase & number',
      )
      .required('Required'),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  return (
    <Container>
      <View
        style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          uppercase
          style={{fontSize: 30, marginBottom: -50, fontWeight: '900'}}>
          Sign up
        </Text>
      </View>
      <Content>
        <Formik
          initialValues={{
            accountName: '',
            email: '',
            password: '',
            passwordRepeat: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}>
          {({
            handleChange,
            handleSubmit,
            values,
            setFieldTouched,
            errors,
            touched,
            isSubmitting,
            status,
          }) => {
            return (
              <Form style={{padding: 20}}>
                <Content style={{height: 80, paddingTop: 10}}>
                  <Item
                    floatingLabel
                    error={touched.accountName && !!errors.accountName}>
                    <Label>Account name</Label>
                    <Input
                      testID={'accountName'}
                      onChangeText={handleChange('accountName')}
                      value={values.accountName}
                      onBlur={() => setFieldTouched('accountName')}
                      autoCapitalize="none"
                    />
                  </Item>
                  {errors.accountName && touched.accountName && (
                    <InputError
                      style={{paddingTop: 5}}
                      testID={'accountNameError'}>
                      {errors.accountName}
                    </InputError>
                  )}
                </Content>
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
                <InputError
                  style={{paddingTop: 10, textAlign: 'center'}}
                  testID={'formError'}>
                  {status}
                </InputError>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    transparent
                    small
                    onPress={() => navigation.navigate('Login')}>
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
};

export default connect(
  null,
  {registerUser},
)(Register);
