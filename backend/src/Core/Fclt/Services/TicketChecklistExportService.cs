using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Fclt.Services;

public sealed partial class TicketChecklistExportService : ExportService<TicketChecklist, TicketChecklistExportService.Data, TicketChecklistExportService>
{
  private readonly IRepository<CatalogueType> _catalogueTypeRepository;

  public TicketChecklistExportService(IRepository<CatalogueType> catalogueTypeRepository)
  {
    _catalogueTypeRepository = catalogueTypeRepository;
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<Data, XLCellValue>>()
    {
      [nameof(Data.InternalCode)] = data
        => data.InternalCode,

      [nameof(Data.Name)] = data
        => data.Name,

      [nameof(Data.Category)] = data
        => data.Category,

      [nameof(Data.SubCategory)] = data
        => data.SubCategory,

      [nameof(Data.Type)] = data
        => data.Type,
    };

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<TicketChecklist> ticketChecklists,
    CancellationToken cancellationToken = default)
  {
    var catalogueTypes = await _catalogueTypeRepository
      .AsQueryable(
        new GetByIdsSpec<CatalogueType>(ticketChecklists.Select(template => template.CatalogueTypeId).Distinct()))
      .Select(type => new
      {
        type.Id,
        CategoryName = type.Category.Name,
        SubCategoryName = type.SubCategory!.Name
      })
      .ToDictionaryAsync(type => type.Id, cancellationToken);

    return ticketChecklists
      .Select(template => new Data
      {
        InternalCode = template.InternalCode,
        Name = template.Name,
        Category = catalogueTypes[template.CatalogueTypeId].CategoryName,
        SubCategory = catalogueTypes[template.CatalogueTypeId].SubCategoryName,
        Type = LocalizeEnumValue(template.Type)
      })
      .ToList();
  }

  public record Data
  {
    public required XLCellValue InternalCode { get; init; }
    public required XLCellValue Name { get; init; }
    public required XLCellValue Category { get; init; }
    public required XLCellValue SubCategory { get; init; }
    public required XLCellValue Type { get; init; }
  }
}
