using RealGimm.Core.Asst.CadastralUnitAggregate;

namespace RealGimm.Core.Asst.Services;

public sealed partial class CadastralUnitExportService
{
  public record Data(CadastralUnit CadastralUnit, string? ManagementSubjectName);
}
