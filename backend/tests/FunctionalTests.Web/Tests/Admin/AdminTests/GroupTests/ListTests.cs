namespace RealGimm.FunctionalTests.Web.Tests.Admin.AdminTests.GroupTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<Core.IAM.GroupAggregate.Group>
{
  protected override string ModuleName => "admin";
  protected override string MethodName => "listGroup";
  protected override string EntityFragment => GraphQLHelper.Admin.GroupFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
