import { safeFetch } from './wrapFetch';
import { apiStateStore } from './ApiState.store';

global.fetch = vi.fn();

describe('safeFetch', () => {
  beforeEach(() => {
    fetch.mockReset();
    apiStateStore.clearError();
    apiStateStore.stopLoading();
  });

  it('calls fetch with correct URL and options', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    const result = await safeFetch('/api/test', { method: 'GET' });
    expect(fetch).toHaveBeenCalledWith('/api/test', { method: 'GET' });
    expect(result).toEqual({ success: true });
  });

  it('sets loading true and then false', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const promise = safeFetch('/api/test');
    expect(apiStateStore.loading).toBe(true);
    await promise;
    expect(apiStateStore.loading).toBe(false);
  });

  it('sets error when fetch throws', async () => {
    fetch.mockImplementationOnce(() => {
      throw new Error('network fail');
    });

    await expect(safeFetch('/api/fail')).rejects.toThrow('network fail');
    expect(apiStateStore.error).toBe('network fail');
    expect(apiStateStore.loading).toBe(false);
  });

  it('sets error when response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });

    await expect(safeFetch('/api/bad')).rejects.toThrow('Error: HTTP 500');
    expect(apiStateStore.error).toBe('Error: HTTP 500');
    expect(apiStateStore.loading).toBe(false);
  });
});
