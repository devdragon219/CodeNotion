using RealGimm.Web.Anag.Mutations;

namespace RealGimm.Web.Anag;

[ExtendObjectType(typeof(Mutation))]
public class AnagMutations
{
  public SubjectMutations Subject { get; } = new();
  public OrgUnitMutations OrgUnit { get; } = new();
}
