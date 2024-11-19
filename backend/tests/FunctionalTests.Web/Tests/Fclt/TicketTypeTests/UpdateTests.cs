using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : BaseUpdateWithIdParameterTests<TicketType, TicketTypeInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.TicketTypeFragment();
  public override ISpecification<TicketType>[] AdditionalSpecifications => [new TicketTypeIncludeAllSpec()];

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<(TicketType EntityToUpdate, TicketTypeInput Input)> ArrangeAsync(
    IServiceProvider scopedServices)
  {
    var repository = scopedServices.GetRequiredService<IRepository<TicketType>>();

    var ticketTypeFaker = new TicketTypeFaker();
    var ticketTypeToUpdate = ticketTypeFaker.Generate();
    await repository.AddAsync(ticketTypeToUpdate);

    var inputFaker = new TicketTypeInputFaker();
    var input = inputFaker.Generate();

    return (ticketTypeToUpdate, input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    TicketTypeInput input,
    TicketType updatedEntity)
  {
    AssertHelper.Fclt.TicketTypeEqual(input, updatedEntity);
    return Task.CompletedTask;
  }
}
