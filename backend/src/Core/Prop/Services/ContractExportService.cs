using ClosedXML.Excel;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Core.Prop.Services;

public sealed partial class ContractExportService : ExportService<Contract, ContractExportService.Data, ContractExportService>
{
  public required IReadRepository<Subject> _subjectRepository { private get; init; }
  public required IReadRepository<EstateUnit> _estateUnitRepository { private get; init; }
  public required IReadRepository<EstateSubUnit> _estateSubUnitRepository { private get; init; }

  protected override async Task<IList<Data>> SelectItemsAsync(
    IEnumerable<Contract> entities,
    CancellationToken cancellationToken = default)
  {
    var managementSubjectsNames = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities.Select(contract => contract.ManagementSubjectId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    var mainCounterpartSubjectsNames = await _subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(entities.Select(GetMainCounterpartId).Distinct()))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    var mainLocatedUnits = entities.Select(GetMainLocatedUnit).ToArray();

    var estateSubUnitsInternalCodes = await _estateSubUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateSubUnit>(mainLocatedUnits
        .Where(locatedUnit => locatedUnit.EstateSubUnitId.HasValue)
        .Select(locatedUnit => locatedUnit.EstateSubUnitId!.Value)
        .Distinct()))
      .Select(estateSubUnit => new { estateSubUnit.Id, estateSubUnit.InternalCode })
      .ToDictionaryAsync(estateSubUnit => estateSubUnit.Id, estateSubUnit => estateSubUnit.InternalCode, cancellationToken);

    var estateUnitsInternalCodes = await _estateUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateUnit>(mainLocatedUnits
        .Where(locatedUnit => locatedUnit.EstateSubUnitId == null)
        .Select(locatedUnit => locatedUnit.EstateUnitId)
        .Distinct()))
      .Select(estateUnit => new { estateUnit.Id, estateUnit.InternalCode })
      .ToDictionaryAsync(estateUnit => estateUnit.Id, estateUnit => estateUnit.InternalCode, cancellationToken);

    return entities
      .Select(contract =>
      {
        var currentMainLocatedUnit = GetMainLocatedUnit(contract);

        var currentMainLocatedUnitInternalCode = currentMainLocatedUnit.EstateSubUnitId.HasValue
          ? estateSubUnitsInternalCodes[currentMainLocatedUnit.EstateSubUnitId!.Value]
          : estateUnitsInternalCodes[currentMainLocatedUnit.EstateUnitId];

        return new Data(
          contract,
          managementSubjectsNames[contract.ManagementSubjectId],
          mainCounterpartSubjectsNames[GetMainCounterpartId(contract)],
          currentMainLocatedUnitInternalCode);
      })
      .ToList();
  }

  protected override Dictionary<string, Func<Data, XLCellValue>> CreateExcelDataSelector()
    => new()
    {
      [nameof(Contract.InternalCode)] = data
        => data.Contract.InternalCode,

      [nameof(Contract.ExternalCode)] = data
        => data.Contract.ExternalCode,

      [nameof(Contract.Counterparts)] = data
        => data.MainCountepartName,

      [nameof(Contract.Type)] = data
        => data.Contract?.Type?.Description,

      [nameof(Contract.SublocatedContract)] = data
        => LocalizeBool(data.Contract.SublocatedContract is not null),

      [nameof(Contract.Status)] = data
        => LocalizeEnumValue(data.Contract.Status),

      [nameof(Contract.EffectStartDate)] = data
        => data.Contract.EffectStartDate.ToString(),

      [nameof(Contract.SecondTermExpirationDate)] = data
        => data.Contract.SecondTermExpirationDate.ToString(),

      ["ExpiringDays"] = data
        => data.Contract.SecondTermExpirationDate.HasValue
          ? data.Contract.SecondTermExpirationDate.Value.DayNumber - DateOnly.FromDateTime(DateTime.Now).DayNumber
          : Blank.Value,

      [nameof(Data.MainLocatedUnitInternalCode)] = data => data.MainLocatedUnitInternalCode,

      [nameof(Contract.ManagementSubjectId)] = data => data.ManagementSubjectName,

      [nameof(Contract.ReleaseDate)] = data
        => data.Contract.ReleaseDate.ToString(),

      [nameof(Contract.ReleaseReason)] = data
        => LocalizeEnumValue(data.Contract.ReleaseReason),

      [nameof(Contract.TerminationDate)] = data
        => data.Contract.TerminationDate.ToString(),

      [nameof(Contract.Terminator)] = data
        => LocalizeEnumValue(data.Contract.Terminator),

      [nameof(Contract.IsOccupiedWithoutRight)] = data
        => data.Contract.IsOccupiedWithoutRight.HasValue
          ? LocalizeBool(data.Contract.IsOccupiedWithoutRight.Value)
          : Blank.Value,
    };

  private static int GetMainCounterpartId(Contract contract)
    => contract.Counterparts.Where(counterpart => counterpart.IsMainCounterpart).Single().SubjectId;

  private static LocatedUnit GetMainLocatedUnit(Contract contract)
  => contract.LocatedUnits.Where(locatedUnit => locatedUnit.IsMainUnit).Single();
}
