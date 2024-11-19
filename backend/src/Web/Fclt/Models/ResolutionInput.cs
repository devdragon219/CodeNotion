namespace RealGimm.Web.Fclt.Models;

public record ResolutionInput
{
  public DateTime? InterventionStart { get; set; }
  public DateTime? InterventionEnd { get; set; }
  public DateTime? Closure { get; set; }
  public string? OperationsPerformed { get; set; }
  public string? Diagnosis { get; set; }
  public string? ResolutionNotes { get; set; }
  public string? PartsAndSupplies { get; set; }
}
