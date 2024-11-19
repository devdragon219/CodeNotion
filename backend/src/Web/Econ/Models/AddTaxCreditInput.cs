namespace RealGimm.Web.Econ.Models;

public sealed record AddTaxCreditInput
{
  public int ManagementSubjectId { get; set; }
  public string TaxCode { get; set; } = default!;
  public string? Description { get; set; }
  public DateOnly Date { get; set; }
  public decimal Amount { get; set; }
  public string? Notes { get; set; }
}
