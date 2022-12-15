import { PersistentStorage } from '../types';

export default class MockStorage implements PersistentStorage<string> {
  storage: Map<string, string>;

  constructor() {
    this.storage = new Map<string, string>();
  }

  setItem(key: string, data: string): Promise<void> {
    return new Promise(resolve => {
      this.storage.set(key, data);
      resolve();
    });
  }

  removeItem(key: string): Promise<void> {
    return new Promise(resolve => {
      this.storage.delete(key);
      resolve();
    });
  }

  getItem(key: string): Promise<string | undefined> {
    return new Promise(resolve => {
      resolve(this.storage.get(key));
    });
  }
}
