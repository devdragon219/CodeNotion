using RealGimm.SharedKernel;

namespace RealGimm.Core.Reports.Interfaces;

public interface IReportGenerator
{
  public Guid Id { get; }
  public string Name { get; }
  public ReportFormat[] SupportedFormats { get; }
  public ReportGeneratorFilterField[][] FilterFields { get; }

  public Task InitializeFiltersAsync();
  public Task<FileCacheEntry> GenerateReportAsync(ReportFormat reportFormat, ReportGeneratorFilter[] filters); 
}
