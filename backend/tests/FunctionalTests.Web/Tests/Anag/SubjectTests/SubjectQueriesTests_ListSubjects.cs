using HotChocolate.Execution;
using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.SubjectTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class SubjectQueriesTests_ListSubjects : SeededDbWebTest
{
  private const string BaseQuery = """
      query (
        $first: Int
        $after: String
        $last: Int
        $before: String
        $where: SubjectFilterInput
        $order: [SubjectSortInput!]
      ) {
        subject {
          listSubjects(
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
              ...SubjectFragment
            }
            totalCount
          }
        }
      }
      fragment SubjectFragment on ISubject {
        __typename
        id
        name
        personType
        internalCode
        externalSourceCode
        entryStatus
        closureDate
        addresses {
          ...AddressFragment
        }
        bankAccounts {
          bankAccountType
          referenceCode
          referenceCodeType
          notes
          accountHolder
          id
        }
        contacts {
          ...ContactFragment
        }
        categories {
          name
          id
          function {
            isCompanyGroup
          }
        }
        officers {
          ...OfficerFragment
        }
        owningMgmtSubjects {
          main {
            name
            id
          }
          id
        }
        taxStatuses {
          taxStatusType
          since
          until
          id
        }
        ... on LegalSubject {
          shorthandDescription
          fullName
          baseCountryTaxIdCode
          additionalTaxIdCode
          additionalGovIdCode
          bankingId1
          bankingId2
          businessStart
          companiesHouseIdCode
          shareCapital
          interGroupSignature
          legalSubjectType
          companyGroupParent {
            main {
              name
              id
            }
            groupRelationType
            id
          }
        }
        ... on ManagementSubject {
          shorthandDescription
          fullName
          baseCountryTaxIdCode
          additionalTaxIdCode
          additionalGovIdCode
          bankingId1
          bankingId2
          businessStart
          managementCode
          companiesHouseIdCode
          shareCapital
          interGroupSignature
          companyGroupParent {
            main {
              name
              id
            }
            groupRelationType
            id
          }
        }
        ... on PhysicalSubject {
          firstName
          lastName
          birthCountryTaxIdCode
          professionalTaxIdCode
          birthDate
          birthLocation {
            ...AddressFragment
          }
          customGender
        }
      }
      fragment AddressFragment on Address {
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
      }
      fragment CityFragment on City {
        id
        name
        countyName
        countryName
        countryISO
      }
      fragment ContactFragment on Contact {
        id
        contactInfo
        contactInfoType
        contactType
      }
      fragment OfficerFragment on SubjectRelation {
        subordinate {
          name
          id
        }
        since
        until
        officerRelationType
        id
      }
      
      """;

  public SubjectQueriesTests_ListSubjects(SeededDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_List1Subject()
  {
    // Arrange
    var listSubjectsQuery = QueryRequestBuilder.New()
      .SetQuery(BaseQuery)
      .AddVariableValue("first", 1)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(listSubjectsQuery);

    // Assert
    AssertSuccessGraphQLQueryResult(result);

    var listSubjectsResult = result.Data!
      .GetDictionaryValue("subject")
      .GetDictionaryValue("listSubjects");

    Assert.True(listSubjectsResult.GetValue<int>("totalCount") >= 1);

    var nodesResult = listSubjectsResult.GetListValue("nodes");
    Assert.Single(nodesResult);

    var subjectResult = nodesResult.GetDictionaryValue(0);

    await Verify(subjectResult);
  }

  [Fact]
  public async Task Should_List10SubjectsWithSpecificManagementOwner()
  {
    var managementOwnerNameFilter = "a";

    var subjectFilter = new Dictionary<string, object?>()
    {
      ["and"] = new[]
      {
        new Dictionary<string, object?>()
        {
          ["relationSubordinates"] = new Dictionary<string, object?>()
          {
            ["some"] = new Dictionary<string, object?>()
            {
              ["main"] = new Dictionary<string, object?>()
              {
                ["name"] = new Dictionary<string, object?>()
                {
                  ["contains"] = managementOwnerNameFilter
                }
              },
              ["relationType"] = new Dictionary<string, object?>()
              {
                ["eq"] = "MANAGEMENT_ENTITY_OWNED"
              }
            }
          }
        }
      }
    };


    var listSubjectsQuery = QueryRequestBuilder.New()
      .SetQuery(BaseQuery)
      .AddVariableValue("first", 10)
      .AddVariableValue("where", subjectFilter)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(listSubjectsQuery);

    // Assert
    await Verify(result);
  }
}
