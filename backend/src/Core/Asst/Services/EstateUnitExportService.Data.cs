using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Core.Asst.Services;

public sealed partial class EstateUnitExportService
{
  public record Data(EstateUnit EstateUnit, string? ManagementSubjectName);
}
