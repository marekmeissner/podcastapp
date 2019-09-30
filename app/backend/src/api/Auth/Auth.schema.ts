import { SCHEMA_FIELDS } from '../../validation/common';

export const SCHEMA_AUTH = {
  LOGIN: {
    required: ['email', 'password'],
    additionalProperties: false,
    properties: {
      email: SCHEMA_FIELDS.EMAIL,
      password: SCHEMA_FIELDS.LOGIN_PASSWORD,
    },
  },
};
