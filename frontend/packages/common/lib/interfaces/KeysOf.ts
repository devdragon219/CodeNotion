export type KeysOf<T> = T extends T ? keyof T : never;
