using RealGimm.Core.Prop.AdministrationAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.AdministrationTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<Administration>
{
  protected override string EntityFragment => GraphQLHelper.Prop.AdministrationFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
