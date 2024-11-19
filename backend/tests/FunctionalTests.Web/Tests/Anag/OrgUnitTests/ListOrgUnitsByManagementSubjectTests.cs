using HotChocolate.Execution;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.OrgUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListOrgUnitsByManagementSubjectTests : SeededDbWebTest
{
  public ListOrgUnitsByManagementSubjectTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_ListByManagementSubject()
  {
    // Arrange
    var listSubjectsQuery = QueryRequestBuilder.New()
      .SetQuery("""
      query {
        orgUnit {
          listOrgUnitsByManagementSubject(managementSubjectIds: [7]) {
            id
            name
            parentSubjectId
          }
        }
      }
      """)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(listSubjectsQuery);

    // Assert
    await Verify(result);
  }
}
