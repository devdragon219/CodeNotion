namespace RealGimm.FunctionalTests.Web.Tests.Admin.AdminTests.UserTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<Core.IAM.UserAggregate.User>
{
  protected override string ModuleName => "admin";
  protected override string MethodName => "user";
  protected override string IdParameterName => "userId";
  protected override string EntityFragment => GraphQLHelper.Admin.UserFragment(includeWidgetConfig: true, includeContacts: true, includeSessions: true, includeGroups: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
