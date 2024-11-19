namespace RealGimm.Web.Common.Models;

public record BillItemTypeInput
{
  public int? Id { get; set; }
  public string Description { get; set; } = default!;
  public string InternalCode { get; set; } = default!;
  public bool IsForContractFee { get; set; }
  public bool IsForContractCosts { get; set; }
  public bool IsForAdministration { get; set; }
  public bool IsPositive { get; set; }
  public bool IsForTax { get; set; }
  public int? DefaultAccountingItemId { get; set; }
  public int ActiveSubjectVRId { get; set; }
  public int ActiveExemptVRId { get; set; }
  public int ActiveNonTaxableVRId { get; set; }
  public int PassiveSubjectVRId { get; set; }
  public int PassiveExemptVRId { get; set; }
  public int PassiveNonTaxableVRId { get; set; }
  public int AdministrationVRId { get; set; }
}
