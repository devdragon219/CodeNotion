using RealGimm.Web.Asst.Mutations;
using RealGimm.Web.Docs.Mutations;

namespace RealGimm.Web.Docs.Extensions;

[ExtendObjectType(typeof(CatalogueMutations))]
public class CatalogueMutationsExtension
{
  public CatalogueDocumentMutations Document { get; } = new();
}
