using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.Web.Nrgy.Models;

public sealed class UtilityTypeInput
{
  public UtilityCategory Category { get; set; }
  public string Description { get; set; } = default!;
  public string InternalCode { get; set; } = default!;
  public string? ExternalCode { get; set; }
  public string? ExpenseClass { get; set; }
  public string MeasurementUnit { get; set; } = default!;
  public string MeasurementUnitDescription { get; set; } = default!;
  public int TimeOfUseRateCount { get; set; }
  public MeteringType MeteringType { get; set; }
  public bool HasHeatingAccountingSystem { get; set; }
  public UtilityChargeFieldInput[][]? ChargeFields { get; set; }
}
