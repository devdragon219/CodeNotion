using RealGimm.Core.Reports;

namespace RealGimm.Web.Common.Models;

public sealed record ReportGeneratorOutput(
  Guid Id,
  string Name,
  ReportFormat[] SupportedFormats,
  ReportGeneratorFilterField[][] FilterFields);
