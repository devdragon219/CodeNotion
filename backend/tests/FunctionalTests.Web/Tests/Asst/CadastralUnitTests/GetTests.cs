using RealGimm.Core.Asst.CadastralUnitAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<CadastralUnit>
{
  protected override string MethodName => "cadastralUnit";
  protected override string EntityFragment
  {
    get
    {
      return GraphQLHelper.Asst.CadastralUnitFragment(
        includeEstateUnit: true,
        includeAddress: true,
        includeUnavailabilities: true,
        includeCoordinates: true,
        includeExpenses: true,
        includeTaxConfig: true,
        includeTaxPayments: true,
        includeIncome: true,
        includeInspection: true);
    }
  }

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
