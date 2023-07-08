import { RestHandler } from 'msw';
import { setupServer } from 'msw/node';

export default function createMockServer(handlers: RestHandler[]) {
  return setupServer(...handlers);
}