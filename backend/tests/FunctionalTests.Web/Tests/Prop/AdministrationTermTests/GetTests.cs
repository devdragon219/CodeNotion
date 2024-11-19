using RealGimm.Core.Prop.AdministrationTermAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.AdministrationTermTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<AdministrationTerm>
{
  protected override string EntityFragment { get; } = GraphQLHelper.Prop.AdministrationTermFragment(includeInstallments: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
