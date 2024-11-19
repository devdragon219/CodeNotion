using RealGimm.Web.Asst.Queries;
using RealGimm.Web.Docs.Queries;

namespace RealGimm.Web.Docs.Extensions;

[ExtendObjectType(typeof(EstateUnitQueries))]
public class EstateUnitQueriesExtension
{
  public EstateUnitDocumentQueries Documents { get; } = new();
}
