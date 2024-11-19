type Where = Record<string, unknown> & {
  and?: Where[] | null;
  or?: Where[] | null;
};

export type QueryVariables = Record<string, unknown> & {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  where?: Where | null;
  order?: Record<string, unknown> | Record<string, unknown>[] | null;
};
