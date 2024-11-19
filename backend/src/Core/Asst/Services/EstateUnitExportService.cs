using Ardalis.Specification;
using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;
using Address = RealGimm.Core.Asst.EstateAggregate.Address;

namespace RealGimm.Core.Asst.Services;

public sealed partial class EstateUnitExportService : ExportService<EstateUnit, EstateUnitExportService.Data, EstateUnitExportService>
{
  public required IRepository<Subject> _subjectRepository { private get; init; }

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<EstateUnit> entities,
    CancellationToken cancellationToken = default)
  {
    var managementSubjectsNames = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities.Select(estateUnit => estateUnit.ManagementSubjectId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    return entities
      .Select(estateUnit => new Data(estateUnit, managementSubjectsNames[estateUnit.ManagementSubjectId]))
      .ToList();
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(EstateUnit.InternalCode)] = data
        => data.EstateUnit.InternalCode,

      [nameof(EstateUnit.Type)] = data
        => LocalizeEnumValue(data.EstateUnit.Type),

      [nameof(EstateUnit.Status)] = data
        => LocalizeEnumValue(data.EstateUnit.Status),

      ["ManagementSubject"] = data
        => data.ManagementSubjectName,

      [$"{nameof(EstateUnit.Address)}.{nameof(Address.Toponymy)}"] = data
        => data.EstateUnit.Address?.Toponymy,

      [$"{nameof(EstateUnit.Address)}.{nameof(Address.CityName)}"] = data
        => data.EstateUnit.Address?.CityName,

      [$"{nameof(EstateUnit.Address)}.{nameof(Address.LocalPostCode)}"] = data
        => data.EstateUnit.Address?.LocalPostCode,

      [$"{nameof(EstateUnit.Address)}.{nameof(Address.CountryName)}"] = data
        => data.EstateUnit.Address?.CountryName,

      [$"{nameof(EstateUnit.Address)}.{nameof(Address.CountyName)}"] = data
        => data.EstateUnit.Address?.CountyName,

      [nameof(EstateUnit.SubNumbering)] = data
        => data.EstateUnit.SubNumbering,

      [nameof(EstateUnit.Stair)] = data
        => data.EstateUnit.Stair?.Description,

      [nameof(EstateUnit.ExternalCode)] = data
        => data.EstateUnit.ExternalCode,

      [nameof(EstateUnit.Name)] = data
        => data.EstateUnit.Name,

      [nameof(EstateUnit.NetSurface)] = data
        => data.EstateUnit.NetSurface,

      [nameof(EstateUnit.GrossSurface)] = data
        => data.EstateUnit.GrossSurface,

      [nameof(EstateUnit.Floors)] = data
        => data.EstateUnit.Floors?.Count,

      [$"{nameof(EstateUnit.Estate)}.{nameof(Estate.InternalCode)}"] = data
        => data.EstateUnit.Estate?.InternalCode,

      [$"{nameof(EstateUnit.Estate)}.{nameof(Estate.Name)}"] = data
        => data.EstateUnit.Estate?.Name,

      [$"{nameof(EstateUnit.Estate)}.{nameof(Estate.Type)}"] = data
        => LocalizeEnumValue(data.EstateUnit.Estate!.Type),

      [nameof(EstateUnit.CadastralUnits)] = data
        => data.EstateUnit.CurrentCadastralUnit is null
          ? Blank.Value
          : string.Join(
              Environment.NewLine,
              data.EstateUnit.CurrentCadastralUnit!.Coordinates
                .Select(c => $"{c.Level1} - {c.Level2} - {c.Level3} - {c.Level4} - {c.Level5}")),

      [nameof(EstateUnit.UsageType)] = data
        => data.EstateUnit.UsageType.Name
    };
}
