using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using ClosedXML.Excel;
using RealGimm.Core.Reports;
using PdfSharp.Pdf.IO;
using HotChocolate.Execution;
using RealGimm.FunctionalTests.Web.Extensions;
using System.Globalization;
using System.Text;
using PdfSharp.Pdf;
using PdfSharp.Pdf.Content;
using PdfSharp.Pdf.Content.Objects;

namespace RealGimm.FunctionalTests.Web.Tests.Report.ReportTests;

public abstract class BaseReportTests : SeededDbWebTest
{
  private readonly VerifySettings _verifySettings;

  public abstract Guid ReportId { get; }
  public abstract ReportGeneratorFilter[] Filters { get; }

  public string Mutation => $$"""
    mutation($reportGeneratorId: UUID!, $targetReportFormats: [ReportFormat!]!, $filters: [ReportGeneratorFilterInput!]!) {
      reportGenerator {
        generateReports(reportGeneratorId: $reportGeneratorId, targetReportFormats: $targetReportFormats, filters: $filters) {
          {{GraphQLHelper.ResultFragment(GraphQLHelper.FileUrlOutputFragment())}}
        }
      }
    }
    """;

  public BaseReportTests(SeededDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory)
  {
    _verifySettings = new VerifySettings();
    _verifySettings.UseDirectory(Path.GetDirectoryName(callerFilePath)!);
    _verifySettings.UseTypeName(GetType().Name);
  }

  [Fact]
  public virtual async Task Should_ExportExcel()
  {
    // Act
    var resourceUrl = await GenerateReport(ReportFormat.Excel);

    var request = new HttpRequestMessage(HttpMethod.Get, resourceUrl);
    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", GetAdminJwt());

    var response = await HttpClient.SendAsync(request);

    // Assert
    var content = await response.Content.ReadAsStreamAsync();
    Assert.NotNull(content);

    var workbook = new XLWorkbook(content);
    var worksheet = Assert.Single(workbook.Worksheets);

    var rowsToVerify = worksheet
      .RowsUsed()
      .Select(row => row.CellsUsed().Select(cell => cell.Value.ToString(CultureInfo.InvariantCulture)));

    await Verify(rowsToVerify, _verifySettings);
  }

  [Fact]
  public virtual async Task Should_ExportPdf()
  {
    var resourceUrl = await GenerateReport(ReportFormat.Pdf);

    var request = new HttpRequestMessage(HttpMethod.Get, resourceUrl);
    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", GetAdminJwt());

    var response = await HttpClient.SendAsync(request);

    // Assert
    var content = await response.Content.ReadAsStreamAsync();
    Assert.NotNull(content);

    using var pdfDocument = PdfReader.Open(content, PdfDocumentOpenMode.ReadOnly);
    Assert.NotNull(pdfDocument);

    // theare some problems with text encoding with the extracting text from pdf
    // so it's unreadble unfortunately, but we still be able to verify the pdf content
    // by comparing it with the snapshot
    await Verify(pdfDocument.ExtractText(), _verifySettings);
  }

  public virtual async Task<string> GenerateReport(ReportFormat format)
  {
    var reportFormatInput = new ReportFormat[] { format };

    var generateReportMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("reportGeneratorId", ReportId)
      .SetVariableValue("targetReportFormats", reportFormatInput)
      .SetVariableValue("filters", Filters)
      .SetUser(GetAdminClaims())
      .Create();

    var result = await ExecuteGraphQLQueryAsync(generateReportMutation);
    AssertSuccessGraphQLQueryResult(result);

    return result.Data!
      .GetDictionaryValue("reportGenerator")
      .GetDictionaryValue("generateReports")
      .GetListOfDictionariesValue("value").First()
      .GetValue<string>("resourceUrl");
  }

}
