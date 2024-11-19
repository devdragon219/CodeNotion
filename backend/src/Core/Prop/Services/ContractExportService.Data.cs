using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Core.Prop.Services;

public sealed partial class ContractExportService
{
  public record Data(Contract Contract, string ManagementSubjectName, string MainCountepartName, string MainLocatedUnitInternalCode);
}
