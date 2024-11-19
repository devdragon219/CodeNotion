using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Core.Asst.Services;

public partial class EstateExportService
{
  public record Data(Estate Estate, string? ManagementSubjectName, int EstateUnitsCount);
}
