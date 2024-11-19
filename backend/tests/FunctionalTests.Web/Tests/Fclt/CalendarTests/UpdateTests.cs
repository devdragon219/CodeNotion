using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.CalendarAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CalendarTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : BaseUpdateWithIdParameterTests<Calendar, CalendarInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.CalendarFragment();
  public override ISpecification<Calendar>[] AdditionalSpecifications => [new CalendarIncludeAllSpec()];

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<(Calendar EntityToUpdate, CalendarInput Input)> ArrangeAsync(
    IServiceProvider scopedServices)
  {
    var repository = scopedServices.GetRequiredService<IRepository<Calendar>>();

    var calendarFaker = new CalendarFaker();
    var calendarToUpdate = calendarFaker.Generate();
    await repository.AddAsync(calendarToUpdate);

    var inputFaker = new CalendarInputFaker();
    var input = inputFaker.Generate();

    return (calendarToUpdate, input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    CalendarInput input,
    Calendar updatedEntity)
  {
    AssertHelper.Fclt.CalendarEqual(input, updatedEntity);
    return Task.CompletedTask;
  }
}
