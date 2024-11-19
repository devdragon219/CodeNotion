namespace RealGimm.Plugin.Import.Prop.Models;

public class TakeoverDTO
{
  public string Id { get; set; } = default!;
  public string ContractId { get; set; } = default!;
  public string? LeavingSubjectId { get; set; }
  public string? NewSubjectId { get; set; }
  public DateTime? ReferenceDate { get; set; }
  public string TakeoverType { get; set; } = default!;
  public string? DeclaringSubjectId { get; set; }
}
