using RealGimm.Web.Asst.Mutations;
using RealGimm.Web.Docs.Mutations;

namespace RealGimm.Web.Docs.Extensions;

[ExtendObjectType(typeof(EstateMutations))]
public class EstateMutationsExtension
{
  public EstateDocumentMutations Document { get; } = new();
}
