using Ardalis.Specification;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : BaseAddTests<TicketType, TicketTypeInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.TicketTypeFragment();
  public override ISpecification<TicketType>[] AdditionalSpecifications => [new TicketTypeIncludeAllSpec()];

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override Task<TicketTypeInput> ArrangeAsync(IServiceProvider scopedServices)
  {
    var faker = new TicketTypeInputFaker();
    var input = faker.Generate();

    return Task.FromResult(input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    TicketTypeInput input,
    TicketType addedEntity)
  {
    AssertHelper.Fclt.TicketTypeEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}
