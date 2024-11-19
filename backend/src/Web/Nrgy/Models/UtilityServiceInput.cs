using RealGimm.Core.Common;

namespace RealGimm.Web.Nrgy.Models;

public record UtilityServiceInput
{
  public string InternalCode { get; set; } = default!;
  public int UtilityTypeId { get; set; }
  public int[] EstateIds { get; set; } = Array.Empty<int>();
  public int[] EstateUnitIds { get; set; } = Array.Empty<int>();
  public int ProviderSubjectId { get; set; }
  public int ReferenceSubjectId { get; set; }
  public int OrgUnitId { get; set; }
  public int AccountingItemId { get; set; }
  public string? Description { get; set; }
  public string UtilityUserCode { get; set; } = default!;
  public string UtilityContractCode { get; set; } = default!;
  public string? UtilityMeterSerial { get; set; }
  public string? UtilityDeliveryPointCode { get; set; }
  public bool IsFreeMarket { get; set; }
  public decimal? Deposit { get; set; }
  public EntryStatus Status { get; set; }
  public DateOnly ActivationDate { get; set; }
  public string? ContractPowerMaximum { get; set; }
  public string? ContractPowerNominal { get; set; }
  public string? ContractNominalTension { get; set; }
  public string? Notes { get; set; }
}
