namespace RealGimm.Web.Common.Models;

public record AccountingItemInput
{
  public int? Id { get; set; }
  public string Description { get; set; } = default!;
  public string ExternalCode { get; set; } = default!;
  public string InternalCode { get; set; } = default!;
}
