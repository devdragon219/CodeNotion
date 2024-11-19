using HotChocolate.Execution;
using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.SubjectTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
[TestCaseOrderer(
  ordererTypeName: "RealGimm.FunctionalTests.Web.PriorityOrderer",
  ordererAssemblyName: "RealGimm.FunctionalTests.Web")]
public class ManagementSubjectQueriesTests_Creation : SeededDbWebTest
{
  private static int _subjectId;
  private const string BaseQuery =
    """
    mutation {
      subject {
        addManagementSubject(
          input: {
            additionalGovIdCode: null
            additionalTaxIdCode: null
            addresses: [
              {
                addressType: LEGAL_RESIDENTIAL
                cityId: null
                cityName: ""
                countryISO: null
                countyName: ""
                localPostCode: ""
                notes: ""
                numbering: ""
                toponymy: ""
              }
            ]
            bankAccounts: []
            bankingId1: null
            bankingId2: null
            baseCountryTaxIdCode: null
            businessStart: null
            categoriesIds: []
            companiesHouseIdCode: null
            contacts: []
            entryStatus: INCOMPLETE_DRAFT
            externalSourceCode: "21"
            interGroupSignature: null
            internalCode: "123"
            managementCode: "213"
            fullName: "21312"
            officers: []
            shareCapital: null
            shorthandDescription: "123"
            taxStatuses: []
          }
        ) {
          isSuccess
          errors
          value{
            id
          }
        }
      }
    }

    """;

  public ManagementSubjectQueriesTests_Creation(SeededDbWebFactory factory) : base(factory)
  {
  }

  [Fact, TestPriority(0)]
  public async Task Should_CreateManagementSubject_WithBasicInput()
  {
    // Arrange
    var canBeGroupLeaderQuery = QueryRequestBuilder.New()
      .SetQuery(BaseQuery)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(canBeGroupLeaderQuery);
    _subjectId = result!.Data!
      .GetDictionaryValue("subject")
      .GetDictionaryValue("addManagementSubject")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    // Assert
    await Verify(result);
  }

  [Fact, TestPriority(1)]
  public async Task Should_ReturnTrue_OnJustCreatedSubject()
  {
    // Arrange
    var canBeGroupLeaderQuery = QueryRequestBuilder.New()
      .SetQuery(
        """
        query ($subjectId: Int!) {
          subject {
            canBeGroupLeader(managementSubjectId: $subjectId)
          }
        }
        """)
      .AddVariableValue("subjectId", _subjectId)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(canBeGroupLeaderQuery);

    // Assert
    await Verify(result);
  }
}
