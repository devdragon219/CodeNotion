namespace RealGimm.Web.Econ.Models;

public sealed record OperationGroupOutput
{
  public int[] Ids { get; set; } = [];
  public DateOnly Date { get; set; }
  public decimal Amount { get; set; }
  public string? Notes { get; set; }
}
