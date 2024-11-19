using Ardalis.SmartEnum;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Reports;

public sealed class ReportFormat : SmartEnum<ReportFormat, string>
{
  public static readonly ReportFormat Excel = new(nameof(Excel), "xlsx", MimeTypes.OO_SPREADSHEET);
  public static readonly ReportFormat Pdf = new(nameof(Pdf), "pdf", MimeTypes.PDF);

  public string FileExtension { get; }
  public string MimeType { get; }

  public ReportFormat(string name, string fileExtension, string mimeType)
    : base(name, name)
  {
    FileExtension = fileExtension;
    MimeType = mimeType;
  }
}
