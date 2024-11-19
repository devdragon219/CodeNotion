using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;
using Address = RealGimm.Core.Asst.EstateAggregate.Address;

namespace RealGimm.Core.Asst.Services;

public sealed partial class CadastralUnitExportService : ExportService<CadastralUnit, CadastralUnitExportService.Data, CadastralUnitExportService>
{
  public required IReadRepository<Subject> _subjectRepository { private get; init; }

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<CadastralUnit> entities,
    CancellationToken cancellationToken = default)
  {
    var managementSubjectsNames = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities
        .Select(cadastralUnit => cadastralUnit.EstateUnit!.ManagementSubjectId)
        .Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    return entities
      .Select(cadastralUnit => new Data(cadastralUnit, managementSubjectsNames[cadastralUnit.EstateUnit!.ManagementSubjectId]))
      .ToList();
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(CadastralUnit.InternalCode)] = data
        => data.CadastralUnit.InternalCode,

      [$"{nameof(CadastralUnit.EstateUnit)}"] = data
        => data.CadastralUnit.EstateUnit!.InternalCode,

      [$"{nameof(EstateUnit.Estate)}.{nameof(EstateUnit.InternalCode)}"] = data
        => data.CadastralUnit.EstateUnit!.Estate.InternalCode,

      [nameof(CadastralUnit.Type)] = data
        => LocalizeEnumValue(data.CadastralUnit.Type),

      [nameof(CadastralUnit.Since)] = data
        => data.CadastralUnit.Since?.ToString(),

      [nameof(CadastralUnit.Until)] = data
        => data.CadastralUnit.Until?.ToString(),

      [$"{nameof(CadastralUnit.Address)}.{nameof(Address.Toponymy)}"] = data
        => data.CadastralUnit.Address!.Toponymy,

      [$"{nameof(CadastralUnit.Address)}.{nameof(Address.CityName)}"] = data
        => data.CadastralUnit.Address!.CityName,

      [$"{nameof(CadastralUnit.Address)}.{nameof(Address.CountryName)}"] = data
        => data.CadastralUnit.Address!.CountryName,

      [$"{nameof(CadastralUnit.Address)}.{nameof(Address.CountyName)}"] = data
        => data.CadastralUnit.Address!.CountyName,

      ["ManagementSubject"] = data
        => data.ManagementSubjectName,

      ["CoordinatesData"] = data
        => data.CadastralUnit.Coordinates
          .Select(c => (string.IsNullOrEmpty(c.Level1) && string.IsNullOrEmpty(c.Level2) && string.IsNullOrEmpty(c.Level3) && string.IsNullOrEmpty(c.Level4)) ?
                        "-" : $"Sez. {c.Level1} - Fg. {c.Level2} - Mapp. {c.Level3} - Sub. {c.Level4}")
          .FirstOrDefault(),

      [nameof(CadastralUnit.Status)] = data
        => LocalizeEnumValue(data.CadastralUnit.Status)
    };
}
