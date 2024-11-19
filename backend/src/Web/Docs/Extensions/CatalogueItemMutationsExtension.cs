using RealGimm.Web.Asst.Mutations;
using RealGimm.Web.Docs.Mutations;

namespace RealGimm.Web.Docs.Extensions;

[ExtendObjectType(typeof(CatalogueItemMutations))]
public class CatalogueItemMutationsExtension
{
  public CatalogueItemDocumentMutations Document { get; } = new();
}
