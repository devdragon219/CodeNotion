using RealGimm.Web.Asst.Queries;
using RealGimm.Web.Docs.Queries;

namespace RealGimm.Web.Docs.Extensions;

[ExtendObjectType(typeof(EstateQueries))]
public class EstateQueriesExtension
{
  public EstateDocumentQueries Documents { get; } = new();
}
