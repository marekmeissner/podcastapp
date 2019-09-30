import { HttpStatus, HttpResponse, RES_BODY, RES_STATUS } from './constants';

export class HttpError extends Error {
  public [RES_BODY]: string;
  public [RES_STATUS]: number;

  public constructor(status: number, message: string) {
    super(message);
    this[RES_STATUS] = status;
    this[RES_BODY] = message;
  }
}

export function BadRequestError(msg: string = HttpResponse.BadRequest): HttpError {
  return new HttpError(HttpStatus.BadRequest, msg);
}

export function UnauthrorizedError(msg: string = HttpResponse.Unauthorized): HttpError {
  return new HttpError(HttpStatus.Unauthorized, msg);
}

export function ForbiddenError(msg: string = HttpResponse.Forbidden): HttpError {
  return new HttpError(HttpStatus.Forbidden, msg);
}

export function NotFoundError(msg: string = HttpResponse.NotFound): HttpError {
  return new HttpError(HttpStatus.NotFound, msg);
}

export function ConflictError(msg: string = HttpResponse.Conflict): HttpError {
  return new HttpError(HttpStatus.Conflict, msg);
}

export function InternalServerError(msg: string = HttpResponse.InternalError): HttpError {
  return new HttpError(HttpStatus.InternalError, msg);
}

export enum HttpErrors {
  UserNotFound = 'USER_NOT_FOUND',
  WrongPassword = 'WRONG_PASSWORD'
}
