using RealGimm.Core.Nrgy.CostChargeAggregate;

namespace RealGimm.Core.Nrgy.CostChargeAggregate.Services;

public sealed partial class CostChargeExportService
{
  public record Data(CostCharge CostCharge, string[] EstatesInternalCodes, string[] EstateUnitsInternalCodes);
}
