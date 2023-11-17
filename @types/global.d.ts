declare global {
  type Dictionary<T> = Record<string, T>;

  type Entries<T> = {
    [K in keyof T]: [K, T[K]];
  }[keyof T][];

  type ValueOf<T> = T[keyof T];
}

export {};
