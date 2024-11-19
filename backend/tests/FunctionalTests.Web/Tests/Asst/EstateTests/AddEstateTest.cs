using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public class AddEstateTest : EmptyDbWebTest
{
  private const string AddEstateQuery =
    """
    mutation {
      estate {
        addEstate(estateInput: {
          addresses: [
            {
              addressType: PRIMARY,
              cityId: null,
              cityName: "test",
              countryISO: "afg",
              countyName: "",
              localPostCode: "1",
              notes: "",
              numbering: "1",
              toponymy: "test"
            }
          ],
          buildYear: null,
          internalCode: "jbhqh2o9zc",
          externalCode: "",
          floors: [
            {
              id: null,
              name: "Primo Piano",
              position: 1,
              templateReference: "bb3f98b8-973c-42bb-b587-b795aa06a5f0"
            }
          ],
          mainUsageTypeId: $ESTATE_MAIN_USAGE_TYPE_ID,
          managementSubjectId: 1,
          marketValue: null,
          name: "",
          notes: "",
          ownership: EASEMENT,
          stairs: [],
          status: DECOMMISSIONED,
          surfaceAreaSqM: null,
          type: BUILDING,
          usageTypeId: $ESTATE_USAGE_TYPE_ID,
          valuations: [],
          refactorings: []
        }) {
          isSuccess
          validationErrors {
            ...ValidationErrorFragment
          }
        }
      }
    }

    fragment ValidationErrorFragment on ValidationError {
      identifier
      errorMessage
      errorCode
      severity
    }


    """;
  
  public AddEstateTest(EmptyDbWebFactory factory) : base(factory)
  {
  }
  
  [Fact]
  public async Task Should_AddEstateByQuery()
  {
    // Arrange
    
    //Prepare estate usage types for IDs
    var usageTypeRepo = Provider
      .GetRequiredService<IRepository<EstateUsageType>>();
    var mainUsageTypeRepo = Provider
      .GetRequiredService<IRepository<EstateMainUsageType>>();
    
    var estateUsageType = new EstateUsageTypeFaker().Generate();
    estateUsageType = await usageTypeRepo.AddAsync(estateUsageType);

    var mainEstateUsageType = new EstateMainUsageTypeFaker().Generate();
    mainEstateUsageType = await mainUsageTypeRepo.AddAsync(mainEstateUsageType);

    var addEstateQuery = QueryRequestBuilder.New()
      .SetQuery(AddEstateQuery
        .Replace("$ESTATE_MAIN_USAGE_TYPE_ID", mainEstateUsageType.Id.ToString())
        .Replace("$ESTATE_USAGE_TYPE_ID", estateUsageType.Id.ToString())
        )
      .SetUser(GetAdminClaims())
      .Create();

    
    // Act
    var result = await ExecuteGraphQLQueryAsync(addEstateQuery);

    // Assert
    await Verify(result);
  }
}
