import { Router } from 'express';
import { AuthController } from '../../api/Auth/Auth.controller';
import { authorize } from '../../middleware/authorize';
import { controllerHandler } from '../../middleware/controller_handler';
import { requestValidator } from '../../middleware/request_validator';
import { Auth, HttpStatus } from '../../util/constants';
import { ROUTE_ROOT } from '../route_constants';
import { SCHEMA } from '../../validation/main';

export const authRouter = Router();

authRouter.get(ROUTE_ROOT, authorize(Auth.UserToken), controllerHandler(AuthController.login));

authRouter.post(
  ROUTE_ROOT,
  requestValidator({ body: SCHEMA.AUTH.LOGIN }),
  authorize(Auth.UserLogin),
  controllerHandler(AuthController.login, HttpStatus.Created),
);
