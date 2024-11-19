using RealGimm.Core.IAM.GroupAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Admin.AdminTests.GroupTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<Group>
{
  protected override string ModuleName => "admin";
  protected override string MethodName => "group";
  protected override string IdParameterName => "groupId";
  protected override string EntityFragment => GraphQLHelper.Admin.GroupFragment(includeFeatures: true, includeUsers: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
