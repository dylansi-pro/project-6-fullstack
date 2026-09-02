import { User } from '../common/user';

describe('User model', () => {
  it('should be created', () => {
    expect(new User()).toBeTruthy();
  });
});
