using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;
using Address = RealGimm.Core.Asst.EstateAggregate.Address;

namespace RealGimm.Core.Fclt.Services;

public sealed partial class EstateUnitGroupExportService : ExportService<EstateUnitGroup, EstateUnitGroupExportService.Data, EstateUnitGroupExportService>
{
  private readonly IRepository<Subject> _subjectRepository;
  private readonly IRepository<EstateUnit> _estateUnitRepository;

  public EstateUnitGroupExportService(
    IRepository<Subject> subjectRepository,
    IRepository<EstateUnit> estateUnitRepository)
  {
    _subjectRepository = subjectRepository;
    _estateUnitRepository = estateUnitRepository;
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new Dictionary<string, Func<Data, XLCellValue>>()
    {
      [nameof(Data.InternalCode)] = data
        => data.InternalCode,

      [nameof(Data.Name)] = data
        => data.Name,

      [nameof(Data.ManagementSubjectName)] = data
        => data.ManagementSubjectName,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.InternalCode)}"] = data
        => data.EstateUnit.InternalCode,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.Type)}"] = data
        => LocalizeEnumValue(data.EstateUnit.Type),

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.Status)}"] = data
        => LocalizeEnumValue(data.EstateUnit.Status),

      [$"{nameof(Data.EstateUnit)}.ManagementSubject"] = data
        => data.EstateUnitManagementSubjectName,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.Address)}.{nameof(Address.Toponymy)}"] = data
        => data.EstateUnit.Address?.Toponymy,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.Address)}.{nameof(Address.CityName)}"] = data
        => data.EstateUnit.Address?.CityName,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.Address)}.{nameof(Address.LocalPostCode)}"] = data
        => data.EstateUnit.Address?.LocalPostCode,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.Address)}.{nameof(Address.CountryName)}"] = data
        => data.EstateUnit.Address?.CountryName,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.Address)}.{nameof(Address.CountyName)}"] = data
        => data.EstateUnit.Address?.CountyName,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.SubNumbering)}"] = data
        => data.EstateUnit.SubNumbering,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.Stair)}"] = data
        => data.EstateUnit.Stair?.Description,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.ExternalCode)}"] = data
        => data.EstateUnit.ExternalCode,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.Name)}"] = data
        => data.EstateUnit.Name,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.NetSurface)}"] = data
        => data.EstateUnit.NetSurface,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.GrossSurface)}"] = data
        => data.EstateUnit.GrossSurface,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.Floors)}"] = data
        => data.EstateUnit.Floors?.Count,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.Estate)}.{nameof(Estate.InternalCode)}"] = data
        => data.EstateUnit.Estate?.InternalCode,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.Estate)}.{nameof(Estate.Name)}"] = data
        => data.EstateUnit.Estate?.Name,

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.Estate)}.{nameof(Estate.Type)}"] = data
        => LocalizeEnumValue(data.EstateUnit.Estate!.Type),

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.CadastralUnits)}"] = data
        => data.EstateUnit.CurrentCadastralUnit is null
          ? Blank.Value
          : string.Join(
              Environment.NewLine,
              data.EstateUnit.CurrentCadastralUnit!.Coordinates
                .Select(c => $"{c.Level1} - {c.Level2} - {c.Level3} - {c.Level4} - {c.Level5}")),

      [$"{nameof(Data.EstateUnit)}.{nameof(EstateUnit.UsageType)}"] = data
        => data.EstateUnit.UsageType.Name
    };

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<EstateUnitGroup> estateUnitGroups,
    CancellationToken cancellationToken = default)
  {
    var estateUnits = await _estateUnitRepository
      .AsQueryable(
        new GetByIdsSpec<EstateUnit>(estateUnitGroups.SelectMany(estateUnitGroup => estateUnitGroup.EstateUnitIds).Distinct()),
        new EntityNonDeletedSpec<EstateUnit>(),
        new EstateUnitIncludeForListSpec())
      .ToDictionaryAsync(estateUnit => estateUnit.Id, cancellationToken);

    var managementSubjectsNamesPerEstateUnit = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(estateUnits.Values.Select(estateUnit => estateUnit.ManagementSubjectId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    var managementSubjectsNamesPerEstateUnitGroup = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(estateUnitGroups.Select(estateUnit => estateUnit.ManagementSubjectId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    return estateUnitGroups
      .SelectMany(estateUnitGroup =>
        estateUnitGroup.EstateUnitIds.Select(estateUnitId => new Data
        {
          Name = estateUnitGroup.Name,
          InternalCode = estateUnitGroup.InternalCode,
          ManagementSubjectName = managementSubjectsNamesPerEstateUnitGroup[estateUnitGroup.ManagementSubjectId],
          EstateUnit = estateUnits[estateUnitId],
          EstateUnitManagementSubjectName = managementSubjectsNamesPerEstateUnit[estateUnits[estateUnitId].ManagementSubjectId]
        }))
      .ToList();
  }
}
