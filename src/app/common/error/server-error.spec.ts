import { ServerError } from './server-error';

describe('ServerError', () => {
  it('should create an instance', () => {
    expect(new ServerError()).toBeTruthy();
  });
});
