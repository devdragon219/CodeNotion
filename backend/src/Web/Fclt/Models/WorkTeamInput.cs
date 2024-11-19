namespace RealGimm.Web.Fclt.Models;

public record WorkTeamInput
{
  public string InternalCode { get; set; } = default!;
  public string Description { get; set; } = default!;
  public int ProviderSubjectId { get; set; }
  public int LeaderUserId { get; set; }
  public DateOnly InsertionDate { get; set; }
  public WorkerInput[] Workers { get; set; } = [];
}
