export const scalars = {
  Coordinates: {
    input: "Array<Scalars['Position']['input']>",
    output: "Array<Scalars['Position']['output']>",
  },
  Date: 'string',
  DateTime: 'string',
  Decimal: 'number',
  Geometry: 'unknown',
  Position: 'Array<number>',
  Long: 'number',
  TimeSpan: 'string',
  Upload: 'File',
  UUID: 'string',
};
