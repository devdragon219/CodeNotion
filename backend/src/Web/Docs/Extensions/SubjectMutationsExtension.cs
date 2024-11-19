using RealGimm.Web.Anag.Mutations;
using RealGimm.Web.Docs.Mutations;

namespace RealGimm.Web.Docs.Extensions;

[ExtendObjectType(typeof(SubjectMutations))]
public class SubjectMutationsExtension
{
  public SubjectDocumentMutations Document { get; } = new();
}
