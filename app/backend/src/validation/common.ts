const EMAIL = {
  type: 'string',
  regexp: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i,
};

const LOGIN_PASSWORD = {
  type: 'string',
};

const PASSWORD = {
  type: 'string',
  regexp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
};

export const SCHEMA_FIELDS = {
  EMAIL,
  PASSWORD,
  LOGIN_PASSWORD
};
