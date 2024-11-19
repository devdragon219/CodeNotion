using System.Linq.Expressions;
using System.Reflection;
using HotChocolate.Execution;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Web.Prop.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.RegistrationPaymentTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<RegistrationPayment>
{
  protected override string EntityFragment => GraphQLHelper.Prop.RegistrationPaymentFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}

