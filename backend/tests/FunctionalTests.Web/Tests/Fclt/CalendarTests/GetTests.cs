using RealGimm.Core.Fclt.CalendarAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CalendarTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<Calendar>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.CalendarFragment(includeDays: true, includeHolidays: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
