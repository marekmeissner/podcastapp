import { Response } from 'express';
import { Types } from 'mongoose';
import { RES_BODY, RES_STATUS } from './util/constants';
import { HttpError } from './util/http_error';

interface ResponseLocals {
  body?: { [k: string]: unknown };
  params?: unknown;
  query?: unknown;
}

export interface APIResponse extends Response {
  /** Data assigned to response object by request validator. */
  locals: ResponseLocals;
  [RES_STATUS]: number;
  [RES_BODY]: object | string;
}

export interface Callback {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): any;
}

export type APIResult<T = undefined> = Promise<T | HttpError>;

export interface Credentials {
  _id: Types.ObjectId;
  email: string;
  password: string;
}

type OmitKeysThatExtend<T, P> = { [K in keyof T]: T[K] extends P ? never : K }[keyof T];

interface Constructor {
  new (...args: unknown[]): unknown;
}

export type ExtractClassShape<T extends object> = Pick<
  { [K in keyof T]: T[K] extends Constructor ? ExtractClassShape<T[K]> : T[K] },
  OmitKeysThatExtend<T, Function>
> & { _id: Types.ObjectId };

export interface MongoDBRawDelete {
  n?: number;
  ok?: number;
}
