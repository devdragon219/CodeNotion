using RealGimm.Core.Fclt.CalendarAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CalendarTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<Calendar>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.CalendarFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
