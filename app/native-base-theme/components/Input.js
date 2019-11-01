// @flow

import variable from './../variables/platform';

export default (variables /* : * */ = variable) => {
  const inputTheme = {
    '.multiline': {
      height: null
    },
    height: variables.inputHeightBase,
    color: variables.inputColor,
    fontSize: variables.inputFontSize
  };

  return inputTheme;
};
