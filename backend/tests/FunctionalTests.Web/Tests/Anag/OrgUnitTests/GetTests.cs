using RealGimm.Core.Anag.OrgUnitAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.OrgUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<OrgUnit>
{
  protected override string MethodName => "orgUnit";
  protected override string IdParameterName => "orgUnitId";
  protected override string EntityFragment => GraphQLHelper.Anag.OrgUnitFragment(includeParentSubject: true, includeParentOrgUnit: true, includeChildren: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
