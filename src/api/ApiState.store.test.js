import { apiStateStore as store } from './ApiState.store';

describe('ApiStateStore', () => {
  it('should set loading to true on startLoading()', () => {
    store.startLoading();
    expect(store.loading).toBe(true);
  });

  it('should set loading to false on stopLoading()', () => {
    store.startLoading();
    store.stopLoading();
    expect(store.loading).toBe(false);
  });

  it('should set error message with setError()', () => {
    store.setError('Something went wrong');
    expect(store.error).toBe('Something went wrong');
  });

  it('should clear error with clearError()', () => {
    store.setError('Oops');
    store.clearError();
    expect(store.error).toBeNull();
  });
});
