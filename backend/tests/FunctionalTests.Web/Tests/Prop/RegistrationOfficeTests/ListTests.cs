using RealGimm.Core.Prop.RegistrationOfficeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.RegistrationOfficeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<RegistrationOffice>
{
  protected override string EntityFragment => GraphQLHelper.Prop.RegistrationOfficeFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
