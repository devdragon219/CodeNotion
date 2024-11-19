using RealGimm.Core.Nrgy.ReadingAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.ReadingTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<Reading>
{
  protected override string EntityFragment => GraphQLHelper.Nrgy.ReadingFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
