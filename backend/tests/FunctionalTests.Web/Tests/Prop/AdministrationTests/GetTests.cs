using RealGimm.Core.Prop.AdministrationAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.AdministrationTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<Administration>
{
  protected override string EntityFragment { get; } = GraphQLHelper.Prop.AdministrationFragment(includeTerms: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
