import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface FilterFns {
    inDateRange: FilterFn<unknown>;
  }
}
