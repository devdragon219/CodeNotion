using System.Net.Http.Headers;
using ClosedXML.Excel;
using HotChocolate.Execution;
using Microsoft.Extensions.Localization;
using RealGimm.Core.Asst.Interfaces;
using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ExportToExcelTests : SeededDbWebTest
{
  public const string Query = """
    query {
      catalogue {
        exportToExcel {
          resourceUrl
        }
      }
    }
    """;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public virtual async Task Should_ExportToExcel()
  {
    // Arrange
    var service = Require<ICatalogueService>();
    var exportServiceLocalizer = Require<IStringLocalizerFactory>().Create(service.GetType());
    var expectedHeaders = service.GetExcelHeaders().Select(header => exportServiceLocalizer[header].Value);

    var exportToExcelQuery = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(exportToExcelQuery);
    AssertSuccessGraphQLQueryResult(result);

    var resourceUrl = result.Data!
      .GetDictionaryValue("catalogue")
      .GetDictionaryValue("exportToExcel")
      .GetValue<string>("resourceUrl");

    var request = new HttpRequestMessage(HttpMethod.Get, resourceUrl);
    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", GetAdminJwt());

    var response = await HttpClient.SendAsync(request);

    // Assert
    var content = await response.Content.ReadAsStreamAsync();
    var workbook = new XLWorkbook(content);
    var worksheet = Assert.Single(workbook.Worksheets);

    Assert.Equal(expectedHeaders, worksheet.Row(1).CellsUsed().Select(cell => cell.GetValue<string>()));

    var rowsToVerify = worksheet
      .RowsUsed(row => row.RowNumber() > 1)
      .Select(row => row.CellsUsed().Select(cell => cell.Value.ToString()));

    await Verify(rowsToVerify);
  }
}
