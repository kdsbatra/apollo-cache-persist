import MockStorage from '../__mocks__/MockStorage';
import MockCache from '../__mocks__/MockCache';
import Persistor from '../Persistor';
import Storage from '../Storage';
import Log from '../Log';
import { ApolloClient, InMemoryCache } from '@apollo/client';

describe('Persistor', () => {
  const client = new ApolloClient<any>({
    cache: new InMemoryCache()
  });
  const storage = new Storage({
    cache: client.cache,
    storage: new MockStorage()
  });

  const cache = new MockCache({
    serialize: false,
    cache: client.cache,
    storage: storage.storage
  });

  jest.spyOn(storage, 'write');
  const persistor = new Persistor<string>(
    {
      log: new Log({ debug: false }),
      storage,
      cache
    },
    { maxSize: 100 }
  );

  it('should not write more than maxSize', async () => {
    cache.restore('0'.repeat(101));
    await persistor.persist();
    expect(storage.write).not.toHaveBeenCalled();
  });

  it('should not commit writes after pause', async () => {
    cache.restore('0'.repeat(101));
    persistor.persist();
    expect(storage.write).not.toHaveBeenCalled();
  });
});
