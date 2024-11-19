using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.Web.Anag.Models;

public record LegalSubjectInput : BusinessSubjectInput
{
  public LegalSubjectType LegalSubjectType { get; set; }
  public int[] OwnerManagementSubjectIds { get; set; } = [];
}
