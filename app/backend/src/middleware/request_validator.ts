import ajv, { ValidateFunction } from 'ajv';
import { NextFunction, Request, RequestHandler } from 'express';
import { ENV } from '../server/env/env';
import { APIResponse } from '../typings';
import { NODE_ENV } from '../util/constants';
import { BadRequestError } from '../util/http_error';
import { logger } from '../util/logger';

interface ResponseLocalData {
  body?: object;
  params?: object;
  query?: object;
}

interface RequestValidationSchemas {
  body?: ValidateFunction;
  params?: ValidateFunction;
  query?: ValidateFunction;
}

function addRegexpKeyword(ajvInstance: ajv.Ajv): void {
  ajvInstance.addKeyword('regexp', {
    compile(schema: RegExp): ValidateFunction {
      return function(data: string): boolean {
        return schema.test(data);
      };
    },
  });
}

function compileSchemas(schemas: ResponseLocalData): RequestValidationSchemas {
  const AJV = new ajv({ $data: true, allErrors: true });
  addRegexpKeyword(AJV);

  const validators: RequestValidationSchemas = {};
  if (schemas.body) validators.body = AJV.compile(schemas.body);
  if (schemas.params) validators.params = AJV.compile(schemas.params);
  if (schemas.query) validators.query = AJV.compile(schemas.query);
  return validators;
}

function handleInvalid(validator: ValidateFunction, req: Request, next: NextFunction): void {
  if (ENV.NODE_ENV === NODE_ENV.Development) {
    logger.trace({ errors: validator.errors, body: req.body }, req.path);
  }
  return next(BadRequestError());
}

function requestValidatorWrapper(schemas: ResponseLocalData): RequestHandler {
  const validator = compileSchemas(schemas);
  return function requestValidatorMiddleware(
    req: Request,
    res: APIResponse,
    next: NextFunction,
  ): void {
    res.locals = {};
    if (validator.body) {
      const isBodyValid = validator.body(req.body);
      if (!isBodyValid) handleInvalid(validator.body, req, next);
      res.locals.body = req.body;
    }
    if (validator.params) {
      const areParamsValid = validator.params(req.params);
      if (!areParamsValid) handleInvalid(validator.params, req, next);
      res.locals.params = req.params;
    }
    next();
  } as RequestHandler;
}

export const requestValidator = requestValidatorWrapper;
