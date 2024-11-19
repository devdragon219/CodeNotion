using System.Linq.Expressions;
using System.Reflection;
using HotChocolate.Execution;
using RealGimm.Core.Prop.BillAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.BillTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<Bill>
{
  protected override string EntityFragment => GraphQLHelper.Prop.BillFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
