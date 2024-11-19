namespace RealGimm.FunctionalTests.Web.Tests.Admin.AdminTests.UserTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<Core.IAM.UserAggregate.User>
{
  protected override string ModuleName => "admin";
  protected override string EntityFragment => GraphQLHelper.Admin.UserFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
