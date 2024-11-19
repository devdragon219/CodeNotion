using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record WorkerInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public string FirstName { get; set; } = default!;
  public string LastName { get; set; } = default!;
  public DateOnly Since { get; set; }
  public DateOnly? Until { get; set; }
  public int CraftId { get; set; }
  public int QualificationLevelId { get; set; }
}
