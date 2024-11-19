using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<Estate>
{
  protected override string MethodName => "estate";
  protected override string IdParameterName => "estateId";
  protected override string EntityFragment
  {
    get
    {
      return GraphQLHelper.Asst.EstateFragment(
        includeMainUsageType: true,
        includeUsageType: true,
        includeAddresses: true,
        includeStairs: true,
        includeFloors: true,
        includeValuations: true,
        includeEstateUnits: true,
        includeRefactorings: true,
        includeCatalogueItems: true);
    }
  }

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
