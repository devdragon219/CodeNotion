namespace RealGimm.Plugin.Import.Prop.Models;

public class ContractTypeDTO
{
  public string Id { get; set; } = default!;
  public string? Description { get; set; }
  public string? InternalCode { get; set; }
  public int? UsageTypeId { get; set; }
  public bool IsActive { get; set; }
  public bool IsRentChargeApplicable { get; set; }
}
