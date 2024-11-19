namespace RealGimm.Web.Econ.Models;

public sealed record OperationInput
{
  public DateOnly Date { get; set; }
  public decimal Amount { get; set; }
  public string? Notes { get; set; }
}
