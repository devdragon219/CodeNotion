using HotChocolate.Execution;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class OldListTests : SeededDbWebTest
{
  public OldListTests(SeededDbWebFactory factory) : base(factory)
  {    
  }

  public const string ListEstatesQuery = """
    query getEstates(
      $first: Int
      $after: String
      $last: Int
      $before: String
      $where: EstateFilterInput
      $order: [EstateSortInput!]
    ) {
      estate {
        listEstates(
          first: $first
          after: $after
          last: $last
          before: $before
          where: $where
          order: $order
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          nodes {
            ...EstateFragment
          }
          totalCount
        }
      }
    }
    fragment EstateFragment on Estate {
      id
      name
      internalCode
      type
      status
      managementOrgUnit {
        id
        name
      }
      managementSubject {
        id
        name
      }
      addresses {
        ...AsstAddressFragment
      }
      externalCode
      surfaceAreaSqM
      floors {
        ...FloorFragment
      }
      mainUsageType {
        name
        internalCode
      }
      usageType {
        name
        internalCode
      }
      ownership
      buildYear
      notes
      stairs {
        ...StairFragment
      }
      totalMarketValue {
        ...EstateTotalMarketValueFragment
      }
      estateUnits {
        id
        name
      }
      valuations {
        ...ValuationFragment
      }
    }
    fragment AsstAddressFragment on AsstAddress {
      id
      addressType
      city {
        ...CityFragment
      }
      cityName
      countryISO
      countyName
      localPostCode
      notes
      numbering
      toponymy
      locationLatLon {
        coordinates
      }
    }
    fragment CityFragment on City {
      id
      name
      countyName
      countryName
      countryISO
      cadastralCode
    }
    fragment FloorFragment on Floor {
      id
      name
      position
      templateReference
    }
    fragment StairFragment on Stair {
      id
      description
    }
    fragment EstateTotalMarketValueFragment on EstateTotalMarketValue {
      totalSurfaceAreaSqM
      notes
      coefficients {
        id
        type
        value
      }
      marketValues {
        id
        type
        value
      }
    }
    fragment ValuationFragment on Valuation {
      referenceYear
      iasValue
      rbaValue
      mortgageAmount
      transferYear
      revampOperations
      id
    }
    """;

  [Fact]
  public async Task Should_List10Estates()
  {
    // Arrange
    var listEstatesQuery = QueryRequestBuilder.New()
      .SetQuery(ListEstatesQuery)
      .SetVariableValue("first", 10)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(listEstatesQuery);

    // Assert
    await Verify(result);
  }
}
