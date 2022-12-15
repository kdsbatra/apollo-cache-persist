import { PersistentStorage } from '../types';

export default class MockStorage<T> implements PersistentStorage<T> {
  storage: Map<string, T>;

  constructor() {
    this.storage = new Map<string, T>();
  }

  setItem(key: string, data: T): Promise<void> {
    return new Promise(resolve => {
      this.storage.set(key, data);
      resolve();
    });
  }

  removeItem(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storage.delete(key);
      resolve();
    });
  }

  getItem(key: string): Promise<T | undefined | null> {
    return new Promise((resolve, reject) => {
      resolve(this.storage.get(key));
    });
  }
}
