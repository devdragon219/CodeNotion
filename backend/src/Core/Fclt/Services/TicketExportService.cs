using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Fclt.Services;

public sealed class TicketExportService : ExportService<Ticket, TicketExportService.Data, TicketExportService>
{
  private readonly IReadRepository<Subject> _subjectRepository;

  public TicketExportService(IReadRepository<Subject> subjectRepository)
  {
    _subjectRepository = subjectRepository;
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(Data.InternalCode)] = data => data.InternalCode,
      [nameof(Data.WorkOrderReference)] = data => data.WorkOrderReference,
      [nameof(Data.MainType)] = data => data.MainType,
      [nameof(Data.Description)] = data => data.Description,
      [nameof(Data.TicketMasterStatus)] = data => data.TicketMasterStatus,
      [nameof(Data.Supplier)] = data => data.Supplier,
      [nameof(Data.Requestor)] = data => data.Requestor,
      [nameof(Data.IsExcludedFromMaintenanceContract)] = data => data.IsExcludedFromMaintenanceContract
    };

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<Ticket> tickets,
    CancellationToken cancellationToken = default)
  {
    var supplierSubjects = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(tickets.Select(ticket => ticket.SupplierSubjectId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, cancellationToken);

    return tickets
      .Select(ticket => new Data
      {
        InternalCode = ticket.InternalCode,
        WorkOrderReference = ticket.WorkOrderReference,
        MainType = LocalizeEnumValue(ticket.MainType),
        Description = ticket.Description,
        TicketMasterStatus = LocalizeEnumValue(ticket.MasterStatus),
        Supplier = supplierSubjects[ticket.SupplierSubjectId].Name,
        Requestor = ticket.Requestor,
        IsExcludedFromMaintenanceContract = LocalizeBool(ticket.IsExcludedFromMaintenanceContract),
      })
      .ToList();
  }

  public record Data
  {
    public required XLCellValue InternalCode { get; init; }
    public required XLCellValue WorkOrderReference { get; init; }
    public required XLCellValue MainType { get; init; }
    public required XLCellValue Description { get; init; }
    public required XLCellValue TicketMasterStatus { get; init; }
    public required XLCellValue Supplier { get; init; }
    public required XLCellValue Requestor { get; init; }
    public required XLCellValue IsExcludedFromMaintenanceContract { get; init; }
  }
}
