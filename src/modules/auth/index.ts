import Container from 'typedi'
import { routeMapper } from './routeMapper'
import { UsersController } from './users.controller'

const usersController = Container.get(UsersController);

export {
  usersController,
  routeMapper
}