using RealGimm.Web.Asst.Mutations;
using RealGimm.Web.Docs.Mutations;

namespace RealGimm.Web.Docs.Extensions;

[ExtendObjectType(typeof(EstateUnitMutations))]
public class EstateUnitMutationsExtension
{
  public EstateUnitDocumentMutations Document { get; } = new();
}
