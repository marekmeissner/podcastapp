import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {forgotPassword} from '../../../redux/reducers/auth/authReducer';
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
import {EMAIL_REGEX} from '../../../utils/constants';
import InputError from '../../../components/InputError/InputError';
import NavigatorService from '../../../helpers/navigationService';

interface Props {
  forgotPassword: (email: string) => Promise<void>;
}
export const ForgotPassword: React.FC<Props> = ({forgotPassword}) => {
  const handleForgotPassword = async (
    {email}: {email: string},
    {setSubmitting, setStatus}: FormikActions<{email: string}>,
  ) => {
    setSubmitting(true);
    try {
      await forgotPassword(email);
      setStatus('Email has been sent!');
    } catch ({message}) {
      console.warn(message);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(EMAIL_REGEX, 'Email address provided is invalid')
      .required('Required'),
  });

  return (
    <Container>
      <View
        style={{height: 300, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          uppercase
          style={{fontSize: 30, marginTop: 150, fontWeight: '900'}}>
          Reset password
        </Text>

        <Text
          style={{
            fontSize: 14,
            padding: 20,
            paddingTop: 30,
            fontStyle: 'italic',
          }}>
          In order to change lost password, type in your account's email. After
          a while - if email is connected to out app - you'll receive email with
          link to change your password
        </Text>
      </View>
      <Content>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}>
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
                    <Text>Send</Text>
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
                    <Text>Wanna sign in?</Text>
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
  {forgotPassword},
)(ForgotPassword);
