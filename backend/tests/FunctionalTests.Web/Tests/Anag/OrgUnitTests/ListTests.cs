using System.Linq.Expressions;
using System.Reflection;
using HotChocolate.Execution;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Web.Anag.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.OrgUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<OrgUnit>
{
  protected override string EntityFragment => GraphQLHelper.Anag.OrgUnitFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
