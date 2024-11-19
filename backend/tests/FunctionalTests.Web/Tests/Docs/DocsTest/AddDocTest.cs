using HotChocolate.Execution;
using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web.Tests.Docs.DocsTest;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class AddDocTest : SeededDbWebTest
{
  private const string AddDocQuery =
    """
    mutation addDocument {
      subject {
        document {
          addRange(subjectId: 7, inputs: [{
            contentCategory: BLD_ADMIN_CADASTRE,
            contentType: IMAGE,
            issuer: "issuer",
            issuerCode: "ISS01",
            mimeType: "image/png",
            name: "pianta",
            fileName: "pianta.png",
            protocolNumber: "ct-p001"
          }]) {
            isSuccess
          }
        }
      }
    }
    """;
  
  public AddDocTest(SeededDbWebFactory factory) : base(factory)
  {
  }
  
  [Fact]
  public async Task Should_AddDocByQuery()
  {
    // Arrange
    
    var insertDocQuery = QueryRequestBuilder.New()
      .SetQuery(AddDocQuery)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(insertDocQuery);

    // Assert
    await Verify(result);
  }
}

[Collection(nameof(SeededDbWebFactoryCollection))]
public class AddEstateDocTest : SeededDbWebTest
{
  private const string AddDocQuery =
    """
    mutation addDocument {
      estate {
        document {
          addRange(estateId: 1, inputs: [{
            contentCategory: BLD_PLAN,
            contentType: PAPER,
            issuer: "issuer",
            issuerCode: "ISS01",
            mimeType: "application/pdf",
            name: "visura_catastale",
            fileName: "visura_catastale.pdf",
            protocolNumber: "vc001"
          }]) {
            isSuccess
          }
        }
      }
    }
    """;

  public AddEstateDocTest(SeededDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_AddDocByQuery()
  {
    // Arrange

    var insertDocQuery = QueryRequestBuilder.New()
      .SetQuery(AddDocQuery)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(insertDocQuery);

    // Assert
    await Verify(result);
  }
}

[Collection(nameof(SeededDbWebFactoryCollection))]
public class AddEstateUnitDocTest : SeededDbWebTest
{
  private const string AddEstateUnitDocQuery =
    """
    mutation addEstateUnitDocument {
      estateUnit {
        document {
          addRange(estateUnitId: 1, inputs: [{
            contentCategory: BLD_PLAN,
            contentType: PAPER,
            issuer: "issuer",
            issuerCode: "ISS01",
            mimeType: "application/pdf",
            name: "planimetria",
            fileName: "planimetria.pdf",
            protocolNumber: "PLN001"
          }]) {
            isSuccess
          }
        }
      }
    }
    """;

  public AddEstateUnitDocTest(SeededDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_AddDocByQuery()
  {

    var insertDocQuery = QueryRequestBuilder.New()
      .SetQuery(AddEstateUnitDocQuery)
      .SetUser(GetAdminClaims())
      .Create();

    var result = await ExecuteGraphQLQueryAsync(insertDocQuery);

    await Verify(result);
  }
}

[Collection(nameof(SeededDbWebFactoryCollection))]
public class AddCatalogueItemDocTest : SeededDbWebTest
{
  private const string AddCatalogueItemDocQuery =
    """
    mutation addCatalogueItemDocument {
      catalogueItem {
        document {
          addRange(catalogueItemId: 1, inputs: [{
            contentCategory: BLD_ADMIN_GENERIC,
            contentType: PAPER,
            issuer: "issuer",
            issuerCode: "ISS01",
            mimeType: "application/pdf",
            name: "estintore",
            fileName: "estintore.pdf",
            protocolNumber: "OTH001"
          }]) {
            isSuccess
          }
        }
      }
    }
    """;

  public AddCatalogueItemDocTest(SeededDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_AddDocByQuery()
  {

    var insertDocQuery = QueryRequestBuilder.New()
      .SetQuery(AddCatalogueItemDocQuery)
      .SetUser(GetAdminClaims())
      .Create();

    var result = await ExecuteGraphQLQueryAsync(insertDocQuery);

    await Verify(result);
  }
}
