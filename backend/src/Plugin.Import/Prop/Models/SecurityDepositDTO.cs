namespace RealGimm.Plugin.Import.Prop.Models;

public class SecurityDepositDTO
{
  public string Id { get; set; } = default!;
  public string ContractId { get; set; } = default!;
  public string DepositType { get; set; } = default!;
  public DateTime? DepositDate { get; set; }
  public decimal? Amount { get; set; }
  public DateTime? ExpirationDate { get; set; }
  public string? BankName { get; set; }
  public DateTime? GivebackDate { get; set; }
  public string? Notes { get; set; }
  public DateTime? InterestStartDate { get; set; }
  public DateTime? InterestEndDate { get; set; }
  public DateTime? InterestCalculationDate { get; set; }
  public DateTime? TakeoverDate { get; set; }
}
