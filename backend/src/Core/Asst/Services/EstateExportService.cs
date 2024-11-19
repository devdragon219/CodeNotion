using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Extensions;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;
using Address = RealGimm.Core.Asst.EstateAggregate.Address;

namespace RealGimm.Core.Asst.Services;

public partial class EstateExportService : ExportService<Estate, EstateExportService.Data, EstateExportService>
{
  public required IRepository<Subject> _subjectRepository { private get; init; }
  public required IRepository<Estate> _estateRepository { private get; init; }

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<Estate> entities,
    CancellationToken cancellationToken = default)
  {
    var managementSubjectsNames = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities.Select(estate => estate.ManagementSubjectId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    var estateUnitsCount = await _estateRepository
      .AsQueryable(new GetByIdsSpec<Estate>(entities.Select(estate => estate.Id)))
      .Select(estate => new
      {
        estate.Id,
        EstateUnitsCount = estate.EstateUnits.Count(estateUnit => estateUnit.DeletionDate == null)
      })
      .ToDictionaryAsync(estate => estate.Id, estate => estate.EstateUnitsCount, cancellationToken);

    return entities
      .Select(estate => new Data(estate, managementSubjectsNames[estate.ManagementSubjectId], estateUnitsCount[estate.Id]))
      .ToList();
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<Data, XLCellValue>>()
    {
      [nameof(Estate.InternalCode)] = data
        => data.Estate.InternalCode,

      [nameof(Estate.Name)] = data
        => data.Estate.Name,

      [nameof(Estate.Type)] = data
        => LocalizeEnumValue(data.Estate.Type),

      [nameof(Estate.Status)] = data
        => LocalizeEnumValue(data.Estate.Status),

      ["ManagementSubject"] = data
        => data.ManagementSubjectName,

      [$"{nameof(Estate.PrimaryAddress)}.{nameof(Address.Toponymy)}"] = data
        => data.Estate.PrimaryAddress is null
            ? null
            : $"{data.Estate.PrimaryAddress.Toponymy}, {data.Estate.PrimaryAddress.Numbering}",

      [$"{nameof(Estate.PrimaryAddress)}.{nameof(Address.CityName)}"] = data
        => data.Estate.PrimaryAddress?.CityName,

      [$"{nameof(Estate.PrimaryAddress)}.{nameof(Address.LocalPostCode)}"] = data
        => data.Estate.PrimaryAddress?.LocalPostCode,

      [$"{nameof(Estate.PrimaryAddress)}.{nameof(Address.CountryName)}"] = data
        => data.Estate.PrimaryAddress?.CountryISO is null
            ? null
            : SharedLocalizer.LocalizeCountry(data.Estate.PrimaryAddress.CountryISO!).Value,

      [nameof(Estate.ExternalCode)] = data
        => data.Estate.ExternalCode,

      [nameof(Estate.SurfaceAreaSqM)] = data
        => data.Estate.SurfaceAreaSqM,

      [nameof(Data.EstateUnitsCount)] = data
        => data.EstateUnitsCount,

      [$"{nameof(Estate.Floors)}{nameof(Estate.Floors.Count)}"] = data
        => data.Estate.Floors.Count,

      [nameof(Estate.MainUsageType)] = data
        => data.Estate.MainUsageType?.Name,

      [nameof(Estate.UsageType)] = data
        => data.Estate.UsageType?.Name,

      [nameof(Estate.Ownership)] = data
        => LocalizeEnumValue(data.Estate.Ownership),

      [nameof(Estate.BuildYear)] = data
        => data.Estate.BuildYear,

      [$"{nameof(Estate.PrimaryAddress)}.{nameof(Address.CountyName)}"] = data
        => data.Estate.PrimaryAddress?.CountyName,
    };
}
