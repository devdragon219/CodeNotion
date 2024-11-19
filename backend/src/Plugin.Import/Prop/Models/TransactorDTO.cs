namespace RealGimm.Plugin.Import.Prop.Models;

public class TransactorDTO
{
  public string Id { get; set; } = default!;
  public string ContractInternalCode { get; set; } = default!;
  public string TransactorId { get; set; } = default!;
  public double? RateFactor { get; set; }
  public string TransactorAddressId { get; set; } = default!;
  public string TransactorAddressType { get; set; } = default!;
  public string TransactorAddressCityName { get; set; } = default!;
  public string TransactorAddressToponymy { get; set; } = default!;
  public string TransactorAddressPostCode { get; set; } = default!;
  public DateTime? StartDate { get; set; }
  public DateTime? EndDate { get; set; }
  public string PaymentTypeCode { get; set; } = default!;
}
