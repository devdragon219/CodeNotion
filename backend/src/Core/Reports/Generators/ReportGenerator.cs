using ClosedXML.Excel;
using Microsoft.Extensions.Configuration;
using PdfSharp.Pdf;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Reports.Interfaces;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Reports.Generators;

public abstract class ReportGenerator : IReportGenerator
{
  private readonly IConfiguration _configuration;

  public abstract Guid Id { get; }
  public abstract string Name { get; }
  public abstract ReportFormat[] SupportedFormats { get; }
  public abstract ReportGeneratorFilterField[][] FilterFields { get; }

  public ReportGenerator(IConfiguration configuration)
  {
    _configuration = configuration;
  }

  public virtual Task InitializeFiltersAsync() => Task.CompletedTask;

  public async Task<FileCacheEntry> GenerateReportAsync(ReportFormat reportFormat, ReportGeneratorFilter[] filters)
  {
    if (!CheckConfigValuesMatchFields(filters))
    {
      throw new ArgumentException("Filters are invalid.", nameof(filters));
    }

    var filtersDictionary = filters.ToDictionary(value => value.FieldName);

    var sharedCacheFileName = Guid.NewGuid().ToString();
    using var stream = File.OpenWrite(Path.Combine(_configuration.CachePath(), sharedCacheFileName));

    switch (reportFormat.Name)
    {
      case nameof(ReportFormat.Excel):
        (await GenerateExcelReportAsync(filtersDictionary)).SaveAs(stream);
        break;

      case nameof(ReportFormat.Pdf):
        (await GeneratePdfReportAsync(filtersDictionary)).Save(stream);
        break;

      default:
        throw new NotImplementedException();
    }

    var fileName = $"{GetReportFileNameWithoutExtension()}.{reportFormat.FileExtension}";

    return new FileCacheEntry(fileName, reportFormat.MimeType, sharedCacheFileName);
  }

  protected static string CreateNotExistingFiltertExceptionMessage(string filter) => $"Not existing filter {filter}!";

  protected abstract string GetReportFileNameWithoutExtension();

  protected virtual Task<XLWorkbook> GenerateExcelReportAsync(Dictionary<string, ReportGeneratorFilter> filters)
    => throw new NotSupportedException();

  protected virtual Task<PdfDocument> GeneratePdfReportAsync(Dictionary<string, ReportGeneratorFilter> filters)
    => throw new NotSupportedException();

  protected static Exception CreateFilterFormatException(string filterName)
    => new FormatException($"Invalid value in {filterName}");

  private bool CheckConfigValuesMatchFields(ReportGeneratorFilter[] filters)
  {
    // check if there are more than one filtr binded to the same field
    if (filters.DistinctBy(filter => filter.FieldName).Count() != filters.Length)
    {
      return false;
    }

    var filtersDictionary = filters.ToDictionary(value => value.FieldName);
    var fieldsDictionary = FilterFields.SelectMany(field => field).ToDictionary(field => field.Name);

    // check if there are filters that are binded to non-existing fields
    if (filtersDictionary.Keys.Except(fieldsDictionary.Keys).Any())
    {
      return false;
    }

    foreach (var field in fieldsDictionary.Values)
    {
      // check if mandatory filter is missing
      if (!filtersDictionary.TryGetValue(field.Name, out var filter) && field.IsMandatory)
      {
        return false;
      }

      if (filter is null)
      {
        continue;
      }

      switch (field.Type)
      {
        case CustomFieldType.SimpleText when filter.StringValue is null:
        case CustomFieldType.SimpleNumber when filter.NumberValue is null:
        case CustomFieldType.Date when filter.DateValue is null:
        case CustomFieldType.SingleItemFromList when filter.StringValue is null || (field.ValidValues!.Any() && !field.ValidValues!.ContainsKey(filter.StringValue)):
          return false;

        default:
          continue;
      }
    }

    return true;
  }
}
