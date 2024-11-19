using System.Globalization;
using System.Net.Http.Headers;
using System.Reflection;
using System.Runtime.CompilerServices;
using ClosedXML.Excel;
using HotChocolate.Execution;
using Microsoft.Extensions.Localization;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web.Tests;

public abstract class BaseExportToExcelTests<TEntity, TExportService> : SeededDbWebTest
  where TExportService : IExportService<TEntity>
{
  private readonly VerifySettings _verifySettings;

  public BaseExportToExcelTests(SeededDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory)
  {
    _verifySettings = new VerifySettings();
    _verifySettings.UseDirectory(Path.GetDirectoryName(callerFilePath)!);
    _verifySettings.UseTypeName(GetType().Name);
  }

  protected abstract MethodInfo Method { get; }
  protected virtual string[] HeadersToExcludeTranslationKeys => Array.Empty<string>();
  protected virtual string ClassName => Method.DeclaringType!.Name.Replace("Queries", string.Empty).CamelizeRespectingAcronyms();  
  protected virtual string MethodName => Method!.Name.CamelizeRespectingAcronyms();
  protected virtual Dictionary<string, string> AdditionalArguments => [];
  protected virtual string FilterInputName => $"{typeof(TEntity).Name}FilterInput";
  protected virtual IDictionary<string, object>? Where => null;
  protected string Query => $$"""
    query($where: {{FilterInputName}}) {
      {{ClassName}} {
        {{MethodName}}(where: $where {{string.Join(", ", AdditionalArguments.Select(argument => $"{argument.Key}: {argument.Value}"))}}) {
          {{GraphQLHelper.FileUrlOutputFragment()}}
        }
      }
    }
    """;

  [Fact]
  public async Task Should_ExportToExcel()
  {
    // Arrange
    var exportService = Require<TExportService>();    
    var exportServiceLocalizer = Require<IStringLocalizerFactory>().Create(exportService.GetType());
    var headerTranslationKeys = exportService.GetHeaderTranslationKeys();
    var expectedHeaders = headerTranslationKeys.Select(header => exportServiceLocalizer[header]).ToArray();

    var exportToExcelQuery = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetVariableValue("where", Where)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(exportToExcelQuery);
    AssertSuccessGraphQLQueryResult(result);
        
    var resourceUrl = result.Data!
      .GetDictionaryValue(ClassName)
      .GetDictionaryValue(MethodName)
      .GetValue<string>("resourceUrl");

    var request = new HttpRequestMessage(HttpMethod.Get, resourceUrl);
    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", GetAdminJwt());

    var response = await HttpClient.SendAsync(request);

    // Assert
    var content = await response.Content.ReadAsStreamAsync();
    var workbook = new XLWorkbook(content);
    var worksheet = Assert.Single(workbook.Worksheets);

    var actualHeaders = worksheet
      .Row(1)
      .Cells(1, expectedHeaders.Length)
      .Select(cell => cell.GetValue<string>());

    Assert.Equal(expectedHeaders.Select(header => header.Value), actualHeaders);
    Assert.All(expectedHeaders, header => Assert.False(header.ResourceNotFound));

    var headersToExclude = HeadersToExcludeTranslationKeys
      .Select(header => exportServiceLocalizer[header].Value)
      .ToArray();

    var columnNumbersToExclude = worksheet
      .Row(1)
      .CellsUsed(cell => headersToExclude.Contains(cell.Value.ToString()))
      .Select(cell => cell.Address.ColumnNumber)
      .ToArray();

    var rowsToVerify = worksheet
      .RowsUsed(row => row.RowNumber() > 1)
      .Select(row => row
        .CellsUsed(cell => !columnNumbersToExclude.Contains(cell.Address.ColumnNumber))
        .Select(cell => cell.Value.ToString(CultureInfo.InvariantCulture)));

    await Verify(rowsToVerify, _verifySettings);
  }
}

public abstract class BaseGenericExportToExcelTests<TEntity> : BaseExportToExcelTests<TEntity, IExportService<TEntity>>
{
  public BaseGenericExportToExcelTests(SeededDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory, callerFilePath)
  {
  }
}
