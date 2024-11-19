using RealGimm.Web.Econ.Mutations;

namespace RealGimm.Web.Econ;

[ExtendObjectType(typeof(Mutation))]
public class EconMutations
{
  public TaxCreditMutations TaxCredit { get; } = new();
}
