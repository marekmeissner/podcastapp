export const RES_STATUS = Symbol('response_status');
export const RES_BODY = Symbol('response_body');

export enum HttpStatus {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalError = 500,
}

export enum HttpResponse {
  BadRequest = 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
  Unauthorized = 'The request has not been applied because it lacks valid authentication credentials for the target resource.',
  Forbidden = 'The server understood the request but refuses to authorize it.',
  NotFound = 'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
  Conflict = 'The request could not be completed due to a conflict with the current state of the target resource. This code is used in situations where the user might be able to resolve the conflict and resubmit the request.',
  InternalError = 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
}

export enum NODE_ENV {
  Production = 'production',
  Development = 'development',
  Test = 'test',
}

export enum Auth {
  UserLogin = 'AUTH_LOGIN_USER',
  UserToken = 'AUTH_TOKEN_USER',
}

export enum Common {
  AuthHeader = 'authorization',
}

export enum DBCollection {
  User = 'users'
}
