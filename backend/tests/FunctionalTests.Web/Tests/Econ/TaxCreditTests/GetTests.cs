using RealGimm.Core.Econ.TaxCreditAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Econ.TaxCreditTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<TaxCredit>
{
  protected override string EntityFragment { get; } = GraphQLHelper.Econ.TaxCreditFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
