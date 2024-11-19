using RealGimm.Core.Prop.RegistrationPaymentAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.RegistrationPaymentTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<RegistrationPayment>
{
  protected override string EntityFragment { get; } = GraphQLHelper.Prop.RegistrationPaymentFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
