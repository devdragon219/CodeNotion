using RealGimm.Core.Fclt.CalendarAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CalendarTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class FullListTests : BaseFullListTests<Calendar>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.CalendarFragment();

  public FullListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
