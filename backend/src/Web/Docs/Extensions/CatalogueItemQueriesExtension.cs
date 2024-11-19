using RealGimm.Web.Asst.Queries;
using RealGimm.Web.Docs.Queries;

namespace RealGimm.Web.Docs.Extensions;

[ExtendObjectType(typeof(CatalogueItemQueries))]
public class CatalogueItemQueriesExtension
{
  public CatalogueItemDocumentQueries Documents { get; } = new();
}
