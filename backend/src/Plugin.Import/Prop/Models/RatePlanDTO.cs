namespace RealGimm.Plugin.Import.Prop.Models;

public class RatePlanDTO
{
  public string Id { get; set; } = default!;
  public string ContractId { get; set; } = default!;
  public DateTime? Since { get; set; }
  public decimal? NewAmount { get; set; }
  public bool IsDeclarationExpected { get; set; }
  public bool IsDeclared { get; set; }
}
