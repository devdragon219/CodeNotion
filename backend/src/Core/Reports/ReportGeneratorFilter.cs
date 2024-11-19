namespace RealGimm.Core.Reports;

public sealed record ReportGeneratorFilter
(
  string FieldName,
  decimal? NumberValue,
  string? StringValue,
  DateOnly? DateValue
);
