using ClosedXML.Excel;
using RealGimm.Core.Asst.EstateUnitAggregate;
namespace RealGimm.Core.Fclt.Services;

public sealed partial class EstateUnitGroupExportService
{
  public record Data
  {
    public required string Name { get; init; }
    public required string InternalCode { get; init; }
    public required string ManagementSubjectName { get; init; }
    public required EstateUnit EstateUnit { get; init; }
    public required string EstateUnitManagementSubjectName { get; init; }
  }
}
