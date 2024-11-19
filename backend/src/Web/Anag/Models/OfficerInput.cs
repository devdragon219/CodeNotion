using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.Web.Anag.Models;

public record OfficerInput
{
  public int OfficerId { get; init; }
  public OfficerType OfficerType { get; init; }
  public DateOnly? Since { get; init; }
  public DateOnly? Until { get; init; }
  public string? Notes { get; init; }
}
