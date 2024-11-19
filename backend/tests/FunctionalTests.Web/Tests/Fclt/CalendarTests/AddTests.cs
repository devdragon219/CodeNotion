using Ardalis.Specification;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.CalendarAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CalendarTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : BaseAddTests<Calendar, CalendarInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.CalendarFragment();
  public override ISpecification<Calendar>[] AdditionalSpecifications => [new CalendarIncludeAllSpec()];

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override Task<CalendarInput> ArrangeAsync(IServiceProvider scopedServices)
  {
    var faker = new CalendarInputFaker();
    var input = faker.Generate();

    return Task.FromResult(input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    CalendarInput input,
    Calendar addedEntity)
  {
    AssertHelper.Fclt.CalendarEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}
