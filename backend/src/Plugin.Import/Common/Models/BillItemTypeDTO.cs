namespace RealGimm.Plugin.Import.Common.Models;

public class BillItemTypeDTO
{
  public string Id { get; set; } = default!;
  public string InternalCode { get; set; } = default!;
  public bool IsPositive { get; set; }
  public string? Description { get; set; }
  public bool IsForContractFee { get; set; }
  public bool IsForContractCosts { get; set; }
  public bool IsForAdministration { get; set; }
  public string? ActiveSubjectVR { get; set; }
  public string? ActiveExemptVR { get; set; }
  public string? ActiveNonTaxableVR { get; set; }
  public string? PassiveSubjectVR { get; set; }
  public string? PassiveExemptVR { get; set; }
  public string? PassiveNonTaxableVR { get; set; }
}
