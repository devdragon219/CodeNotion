using RealGimm.Web.Asst.Queries;
using RealGimm.Web.Docs.Queries;

namespace RealGimm.Web.Docs.Extensions;

[ExtendObjectType(typeof(CatalogueQueries))]
public class CatalogueQueriesExtension
{
  public CatalogueDocumentQueries Documents { get; } = new();
}
