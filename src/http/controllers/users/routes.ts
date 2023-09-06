import { FastifyInstance } from 'fastify';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verifyJwt } from '../../middlewares/verify-jwt';
import { refresh } from './refresh';

export async function usersRoutes(app: FastifyInstance) {

  app.post('/users', register);

  /**
   * @api {post} /sessions [POST] /sessions 
   * @apiName Authenticate
   * @apiGroup Users
   * 
   * @apiPermission role.meta.platform.employee.financial.cost-centers-guaranteed.list
   *
   * @apiSuccess (204) token
   * 
   * @apiParamExample {json} Request-Example:
   *    {
   *         "email": "user@test.com",
   *         "password": "123456"
   *    }
   * 
   *   
   * @apiSuccessExample {json} Request-Example:
   *    {
   *         "token": "bearer token",
   *    }
   */
  app.post('/sessions', authenticate);


  /**
   * @api {post} /token/refresh [POST] /token/refresh 
   * @apiName Refresh Token
   * @apiGroup Users
   * 
   * @apiPermission role.meta.platform.employee.financial.cost-centers-guaranteed.list
   *
   * @apiSuccess (204) token
   * 
   * @apiParamExample {json} Request-Example:
   *    {
   *         "token": "token",
   *    }
   */
  app.patch('/token/refresh', refresh);

  
  // Authenticated Routes
  app.get('/me', {onRequest: [verifyJwt]}, profile);
}