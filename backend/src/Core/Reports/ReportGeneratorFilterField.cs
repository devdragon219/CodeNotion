using RealGimm.Core.CrossModule;

namespace RealGimm.Core.Reports;

public sealed record ReportGeneratorFilterField(
  string Name,
  string Label,
  bool IsMandatory,
  CustomFieldType Type,
  Dictionary<string, string>? ValidValues = null);
