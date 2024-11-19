using System.Linq;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractAggregate.Models;

namespace RealGimm.Core.Prop.Services;

public class ContractService
{
  public readonly IReadRepository<Contract> _contractRepository;
  public readonly IReadRepository<Subject> _subjectRepository;
  public readonly IReadRepository<EstateUnit> _estateUnitRepository;
  public readonly IReadRepository<EstateSubUnit> _estateSubUnitRepository;

  public ContractService(
    IReadRepository<Contract> contractRepository,
    IReadRepository<Subject> subjectRepository,
    IReadRepository<EstateUnit> estateUnitRepository,
    IReadRepository<EstateSubUnit> estateSubUnitRepository)
  {
    _contractRepository = contractRepository;
    _subjectRepository = subjectRepository;
    _estateUnitRepository = estateUnitRepository;
    _estateSubUnitRepository = estateSubUnitRepository;
  }

  public async IAsyncEnumerable<ContractListOutput> ToAsyncEnumerable(
    IQueryable<Contract> query,
    [EnumeratorCancellation] CancellationToken cancellationToken)
  {
    var contracts = await query
      .AsNoTracking()
      .Select(contract => new
      {
        contract.Id,
        contract.Type.IsActive,
        contract.InternalCode,
        contract.ExternalCode,
        CounterpartSubjectId = contract.Counterparts
          .Where(counterpart => counterpart.IsMainCounterpart)
          .Select(counterpart => (int?)counterpart.SubjectId)
          .SingleOrDefault(),
        TypeDescription = contract.Type.Description,
        IsSublocated = contract.SublocatedContract != null,
        contract.Status,
        contract.EffectStartDate,
        ExpirationDate = contract.SecondTermExpirationDate,
        contract.LocatedUnits,
        contract.ManagementSubjectId,
        contract.ReleaseReason,
        contract.ReleaseDate,
        contract.IsOccupiedWithoutRight,
        contract.TerminationDate,
        contract.Terminator,
        contract.FirstTermDurationMonths,
        contract.SecondTermDurationMonths,
        contract.FirstTermExpirationDate,
        contract.SecondTermExpirationDate,
        contract.AnytimeTerminationWarningMonths,
        contract.NonRenewalWarningMonths,
        contract.Reason,
        contract.AgreementDate,
        contract.LastRenewalStartDate
      })
      .ToListAsync(cancellationToken);

    var nonNullCounterpartSubjectIds = contracts
      .Where(contract => contract.CounterpartSubjectId != null)
      .Select(contract => contract.CounterpartSubjectId!.Value)
      .Distinct()
      .ToList();

    var allSubjectIds = contracts
      .Select(c => c.ManagementSubjectId)
      .Concat(nonNullCounterpartSubjectIds)
      .Distinct()
      .ToList();

    var subjectNames = await _subjectRepository
      .AsQueryable()
      .AsNoTracking()
      .Where(subject => allSubjectIds.Contains(subject.Id))
      .Select(subject => new { subject.Id, subject.Name })
      .ToDictionaryAsync(subject => subject.Id, subject => subject.Name, cancellationToken);

    var locatedUnits = await MapLocatedUnits(
      contracts
        .SelectMany(contract => contract.LocatedUnits)
        .DistinctBy(locatedUnit => locatedUnit.Id),
      cancellationToken);

    var outputs = contracts
      .Select(contract =>
      {
        var counterpartName = 
          contract.CounterpartSubjectId.HasValue
            && subjectNames.ContainsKey(contract.CounterpartSubjectId.Value)
          ? subjectNames[contract.CounterpartSubjectId.Value]
          : null;

        return new ContractListOutput
        {
          Id = contract.Id,
          IsActive = contract.IsActive,
          InternalCode = contract.InternalCode,
          ExternalCode = contract.ExternalCode,
          CounterpartName = counterpartName,
          ManagementSubjectName = subjectNames[contract.ManagementSubjectId],
          TypeDescription = contract.TypeDescription,
          IsSublocated = contract.IsSublocated,
          Status = contract.Status,
          EffectStartDate = contract.EffectStartDate,
          ExpirationDate = contract.ExpirationDate,
          LocatedUnits = contract.LocatedUnits.Select(locatedUnit => locatedUnits[locatedUnit.Id]).ToArray(),
          ReleaseReason = contract.ReleaseReason,
          ReleaseDate = contract.ReleaseDate,
          IsOccupiedWithoutRight = contract.IsOccupiedWithoutRight,
          TerminationDate = contract.TerminationDate,
          Terminator = contract.Terminator,
          FirstTermDurationMonths = contract.FirstTermDurationMonths,
          SecondTermDurationMonths = contract.SecondTermDurationMonths,
          FirstTermExpirationDate = contract.FirstTermExpirationDate,
          SecondTermExpirationDate = contract.SecondTermExpirationDate,
          AnytimeTerminationWarningMonths = contract.AnytimeTerminationWarningMonths,
          NonRenewalWarningMonths = contract.NonRenewalWarningMonths,
          Reason = contract.Reason,
          AgreementDate = contract.AgreementDate,
          LastRenewalStartDate = contract.LastRenewalStartDate
        };
      });

    foreach (var output in outputs)
    {
      yield return output;
    }
  }

  private async Task<IReadOnlyDictionary<int, ContractListLocatedUnitOutput>> MapLocatedUnits(
    IEnumerable<LocatedUnit> locatedUnits,
    CancellationToken cancellationToken)
  {
    var estateUnitIds = locatedUnits
      .Select(locatedUnit => locatedUnit.EstateUnitId)
      .ToList();

    var estateUnits = await _estateUnitRepository
      .AsQueryable()
      .AsNoTracking()
      .Where(estateUnit => estateUnitIds.Contains(estateUnit.Id))
      .Select(esateUnit => new
      {
        esateUnit.Id,
        esateUnit.InternalCode,
        esateUnit.Name,
        esateUnit.Address,
      })
      .ToDictionaryAsync(estateUnit => estateUnit.Id, estateUnit => estateUnit, cancellationToken);

    var estateSubUnitIds = locatedUnits
      .Where(locatedUnit => locatedUnit.EstateSubUnitId.HasValue)
      .Select(locatedUnit => locatedUnit.EstateSubUnitId)
      .ToList();

    var estateSubUnits = await _estateSubUnitRepository
      .AsQueryable()
      .AsNoTracking()
      .Where(estateSubUnit => estateSubUnitIds.Contains(estateSubUnit.Id))
      .Select(estateSubUnit => new
      {
        estateSubUnit.Id,
        estateSubUnit.InternalCode,
        estateSubUnit.EstateUnit.Name,
        estateSubUnit.EstateUnit.Address
      })
      .ToDictionaryAsync(estateSubUnit => estateSubUnit.Id, estateSubUnit => estateSubUnit, cancellationToken);

    return locatedUnits.ToDictionary(
      locatedUnit => locatedUnit.Id,
      locatedUnit =>
      {
        var estateUnit = estateUnits.ContainsKey(locatedUnit.EstateUnitId)
          ? estateUnits[locatedUnit.EstateUnitId]
          : null;

        var estateSubUnit = locatedUnit.EstateSubUnitId.HasValue && estateSubUnits.ContainsKey(locatedUnit.EstateSubUnitId.Value)
          ? estateSubUnits[locatedUnit.EstateSubUnitId.Value]
          : null;

        return new ContractListLocatedUnitOutput
        {
          EstateUnitOrSubUnitInternalCode = estateSubUnit?.InternalCode ?? estateUnit?.InternalCode,
          EstateUnitName = estateSubUnit?.Name ?? estateUnit?.Name,
          EstateUnitAddress = estateSubUnit?.Address ?? estateUnit?.Address,
          IsMainUnit = locatedUnit.IsMainUnit,
          IsRegistryUpdateEnabled = locatedUnit.IsRegistryUpdateEnabled,
          IsPartialLocation = locatedUnit.IsPartialLocation,
          SurfaceSqM = locatedUnit.SurfaceSqM
        };
      });
  }
}
