using RealGimm.Core.Prop.RegistrationOfficeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.RegistrationOfficeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<RegistrationOffice>
{
  protected override string EntityFragment { get; } = GraphQLHelper.Prop.RegistrationOfficeFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
