using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.Web.Anag.Models;

public record HeirInput
{
  public int Id { get; init; }
  public DateOnly? Since { get; init; }
  public string? Notes { get; init; }
}
