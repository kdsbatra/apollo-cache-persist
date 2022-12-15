import { ApolloCache } from '@apollo/client/core';

export type LogLevel = 'log' | 'warn' | 'error';

export type LogLine = [LogLevel, any[]];

export type TriggerUninstallFunction = () => void;

export type TriggerFunction = (persist: () => void) => TriggerUninstallFunction;

export type PersistenceMapperFunction = (data: any) => Promise<any>;

export type PersistedData<T> = T | string | null;

export interface PersistentStorage<T> {
  getItem: (
    key: string
  ) => Promise<T | null | undefined> | T | null | undefined;
  setItem: (key: string, value: T) => Promise<T | void> | void | T;
  removeItem: (key: string) => Promise<T | void> | void;
}

type StorageType<T, TSerialize extends boolean> = TSerialize extends boolean
  ? PersistentStorage<string>
  : PersistentStorage<T>;

export interface ApolloPersistOptions<
  TSerialized,
  TSerialize extends boolean = boolean
> {
  cache: ApolloCache<TSerialized>;
  storage: StorageType<PersistedData<TSerialized>, TSerialize>;
  trigger?: 'write' | 'background' | TriggerFunction | false;
  debounce?: number;
  key?: string;
  serialize?: TSerialize;
  maxSize?: number | false;
  persistenceMapper?: PersistenceMapperFunction;
  debug?: boolean;
}
