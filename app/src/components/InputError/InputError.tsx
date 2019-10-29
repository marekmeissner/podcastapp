import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'native-base';
import {COLORS} from '../../Utils/styles/colors';

interface Props {
  children: string;
  style?: {[key: string]: string | number};
  testID?: string;
}

const styles = StyleSheet.create({
  error: {
    color: COLORS.RED,
    fontSize: 12,
  },
});

const InputError: React.FC<Props> = ({children, style, testID}) => {
  return (
    <Text style={[styles.error, {...style}]} testID={testID}>
      {children}
    </Text>
  );
};

export default InputError;
