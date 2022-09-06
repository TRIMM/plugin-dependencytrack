import { dependencytrackPlugin } from './plugin';

describe('dependencytrack', () => {
  it('should export plugin', () => {
    expect(dependencytrackPlugin).toBeDefined();
  });
});
