using RealGimm.Core.Prop.ContractTypeAggregate;

namespace RealGimm.Core.Prop.Services;

public partial class ContractTypeExportService
{
  public record Data(ContractType ContractType, string? UsageTypeName);
}
