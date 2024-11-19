using RealGimm.Web.Econ.Queries;

namespace RealGimm.Web.Econ;

[ExtendObjectType(typeof(Query))]
public class EconQueries
{
  public TaxCreditQueries TaxCredit { get; } = new();
}
