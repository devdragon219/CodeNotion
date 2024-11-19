using RealGimm.Core.Econ.TaxCreditAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Econ.TaxCreditTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<TaxCredit>
{
  protected override string EntityFragment => GraphQLHelper.Econ.TaxCreditFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
