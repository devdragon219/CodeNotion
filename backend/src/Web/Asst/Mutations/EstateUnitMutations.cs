using Ardalis.Result;
using HotChocolate.Language;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Common.OfficialActAggregate;
using RealGimm.Core.Common.OfficialActAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Asst.CadastralUnitAggregate;

namespace RealGimm.Web.Asst.Mutations;

public class EstateUnitMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Create)]
  public async Task<Result<EstateUnit>> Add(
    EstateUnitInput input,
    [Service] IMapper mapper,
    [Service] IRepository<EstateUnit> estateUnitRepository,
    [Service] IRepository<OfficialAct> officialActRepository,
    CancellationToken cancellationToken = default)
  {
    EstateUnit? estateUnit;

    try
    {
      estateUnit = await mapper.MapAsync<EstateUnitInput, EstateUnit>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<EstateUnit>.Invalid(exception.ValidationErrors.ToList());
    }

    if (estateUnit is null)
    {
      return Result<EstateUnit>.Error();
    }

    var validationErrors = estateUnit.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<EstateUnit>.Invalid(validationErrors);
    }

    var officialAct = await mapper.MapAsync<EstateUnitOfficialActInput, OfficialAct>(input.OfficialAct, cancellationToken);
    if (officialAct is not null)
    {
      await officialActRepository.AddAsync(officialAct, cancellationToken);
      estateUnit.SetOfficialActId(officialAct.Id);
    }

    estateUnit = await estateUnitRepository.AddAsync(estateUnit, cancellationToken);

    if (officialAct is not null)
    {
      officialAct.SetEstateUnitData(estateUnit.Id);
      await officialActRepository.UpdateAsync(officialAct, cancellationToken);
    }

    return estateUnit;
  }

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Update)]
  public async Task<Result<EstateUnit>> Update(
    int id,
    EstateUnitInput input,
    [Service] IMapper mapper,
    [Service] IRepository<EstateUnit> estateUnitRepository,
    [Service] IRepository<OfficialAct> officialActRepository,
    CancellationToken cancellationToken = default)
  {
    var existingEstateUnit = await estateUnitRepository
      .AsQueryable(new GetByIdSpec<EstateUnit>(id), new EstateUnitIncludeAllSpec(), new EntityNonDeletedSpec<EstateUnit>())
      .FirstOrDefaultAsync(cancellationToken);

    if (existingEstateUnit is null)
    {
      return Result.NotFound();
    }

    EstateUnit? estateUnit;

    try
    {
      estateUnit = await mapper.MapAsync(input, existingEstateUnit, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<EstateUnit>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = estateUnit!.Validate();
    if (validationErrors.Any())
    {
      return Result<EstateUnit>.Invalid(validationErrors.ToList());
    }

    var oldOfficialActId = await estateUnitRepository
      .AsQueryable(new GetByIdSpec<EstateUnit>(id))
      .Select(x => x.OfficialActId)
      .SingleAsync(cancellationToken);

    var officialAct = oldOfficialActId is null
      ? null
      : await officialActRepository.AsQueryable(new GetByIdSpec<OfficialAct>(oldOfficialActId.Value),
          new OfficialActIncludeAllSpec())
          .FirstOrDefaultAsync(cancellationToken);

    officialAct = await mapper.MapAsync(input.OfficialAct, officialAct, cancellationToken);

    //Let's update also the estateUnit ID
    if (officialAct is not null)
    {
      officialAct.SetEstateUnitData(estateUnit.Id);
    }

    if (!oldOfficialActId.HasValue && officialAct is not null)
    {
      await officialActRepository.AddAsync(officialAct, cancellationToken);
      estateUnit.SetOfficialActId(officialAct.Id);
    }
    else if (oldOfficialActId.HasValue && officialAct is not null)
    {
      officialAct.Id = oldOfficialActId.Value;

      await officialActRepository.UpdateAsync(officialAct, cancellationToken);

      estateUnit.SetOfficialActId(officialAct.Id);
    }
    else if (oldOfficialActId.HasValue)
    {
      //This is executed whe there was an official act but it must be removed
      var oldOfficialAct = await officialActRepository
        .AsQueryable(new GetByIdSpec<OfficialAct>(oldOfficialActId.Value), new OfficialActIncludeAllSpec())
        .SingleAsync(cancellationToken);

      await officialActRepository.DeleteAsync(oldOfficialAct!, cancellationToken);
      estateUnit.SetOfficialActId(null);
    }

    estateUnit.Id = id;

    estateUnitRepository.UpdateSuspend(estateUnit);
    await estateUnitRepository.UpsertCollectionAsync(estateUnit, x => x.Surfaces, cancellationToken);
    await estateUnitRepository.UpsertCollectionAsync(estateUnit, x => x.EstateUnitFloors, cancellationToken);

    await estateUnitRepository.SaveChangesAsync(cancellationToken);

    return estateUnit;
  }

  [BackOfficePermission(Features.ASST_ESTATEUNIT_VARIATION, Permission.Update)]
  public async Task<Result<EstateUnit[]>> Split(
    int id,
    EstateUnitInput[] inputs,
    [Service] IMapper mapper,
    [Service] IRepository<EstateUnit> repository,
    CancellationToken cancellationToken = default)
  {
    var estateUnitToSplit = await repository
      .AsQueryable(
        new GetByIdSpec<EstateUnit>(id),
        new EntityNonDeletedSpec<EstateUnit>(),
        new EstateUnitIncludeCadastralUnitsSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (estateUnitToSplit is null)
    {
      return Result<EstateUnit[]>.NotFound();
    }

    if (inputs is null || inputs.Length < 2 || inputs.Any(input => input is null))
    {
      return Result<EstateUnit[]>.Error();
    }

    if (inputs.Any(input => input.CadastralUnit is null || input.CadastralUnit!.EstateUnitId is not null))
    {
      return Result<EstateUnit[]>.Forbidden();
    }

    IEnumerable<EstateUnit?>? newEstateUnits;

    try
    {
      newEstateUnits = await mapper.MapAsync<EstateUnitInput, EstateUnit>(inputs, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<EstateUnit[]>.Invalid(exception.ValidationErrors.ToList());
    }

    // ReSharper disable PossibleMultipleEnumeration
    foreach (var estateUnit in newEstateUnits!)
    {
      var validationErrors = estateUnit!.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        return Result<EstateUnit[]>.Invalid(validationErrors);
      }

      estateUnit.AddHistoryTags(estateUnitToSplit.HistoryTags);
    }

    estateUnitToSplit.SetStatus(EstateUnitStatus.DiscontinuedSplit);
    estateUnitToSplit.SetDisusedDate(DateOnly.FromDateTime(DateTime.UtcNow));

    var cadastralUnitToSplit = estateUnitToSplit.CurrentCadastralUnit;
    if (cadastralUnitToSplit is not null)
    {
      cadastralUnitToSplit.SetStatus(CadastralUnitStatus.DiscontinuedSplit);

      cadastralUnitToSplit.SetDates(
        since: cadastralUnitToSplit.Since,
        until: newEstateUnits
          .Select(x => x!.CurrentCadastralUnit)
          .Min(x => x!.Since)!
          .Value
          .AddDays(-1));

      foreach (var newEstateUnit in newEstateUnits!)
      {
        newEstateUnit!.CurrentCadastralUnit!.AddHistoryTags(cadastralUnitToSplit.HistoryTags);
      }
    }

    await repository.UpdateAsync(estateUnitToSplit, cancellationToken);
    await repository.AddRangeAsync(newEstateUnits!, cancellationToken);

    return newEstateUnits.ToArray()!;
  }

  [BackOfficePermission(Features.ASST_ESTATEUNIT_VARIATION, Permission.Update)]
  public async Task<Result<EstateUnit>> Transform(
    int id,
    EstateUnitInput input,
    [Service] IMapper mapper,
    [Service] IRepository<EstateUnit> repository,
    CancellationToken cancellationToken = default)
  {
    var estateUnitToTransform = await repository
      .AsQueryable(
        new GetByIdSpec<EstateUnit>(id),
        new EntityNonDeletedSpec<EstateUnit>(),
        new EstateUnitIncludeCadastralUnitsSpec())
      .FirstOrDefaultAsync(cancellationToken);

    if (estateUnitToTransform is null)
    {
      return Result.NotFound();
    }

    EstateUnit? newEstateUnit;

    try
    {
      newEstateUnit = await mapper.MapAsync<EstateUnitInput, EstateUnit>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<EstateUnit>.Invalid(exception.ValidationErrors.ToList());
    }

    if (newEstateUnit!.CurrentCadastralUnit is null ||
      newEstateUnit.Type == estateUnitToTransform.Type &&
      newEstateUnit.UsageType == estateUnitToTransform.UsageType)
    {
      return Result<EstateUnit>.Invalid(ErrorCode.TransformTypeAndUseTypeMustBeDifferent.ToValidationError());
    }

    newEstateUnit.AddHistoryTags(estateUnitToTransform.HistoryTags);

    var validationErrors = newEstateUnit.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<EstateUnit>.Invalid(validationErrors);
    }

    estateUnitToTransform.SetStatus(EstateUnitStatus.Transformed);
    estateUnitToTransform.SetDisusedDate(DateOnly.FromDateTime(DateTime.UtcNow));

    var cadastralUnitToTranform = estateUnitToTransform.CurrentCadastralUnit;
    if (cadastralUnitToTranform is not null)
    {
      cadastralUnitToTranform.SetStatus(CadastralUnitStatus.Transformed);

      cadastralUnitToTranform.SetDates(
        cadastralUnitToTranform.Since,
        newEstateUnit.CurrentCadastralUnit!.Since!.Value.AddDays(-1));

      newEstateUnit.CurrentCadastralUnit.AddHistoryTags(cadastralUnitToTranform.HistoryTags);
    }

    await repository.UpdateAsync(estateUnitToTransform, cancellationToken);
    await repository.AddAsync(newEstateUnit, cancellationToken);

    return newEstateUnit;
  }

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<EstateUnit> repository,
    CancellationToken cancellationToken = default)
    => SoftDeleteAsync(new GetByIdSpec<EstateUnit>(id), repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<EstateUnit> repository,
    CancellationToken cancellationToken = default)
    => SoftDeleteRangeAsync(new GetByIdsSpec<EstateUnit>(ids), repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATEUNIT_VARIATION, Permission.Create)]
  public async Task<Result<EstateUnit>> Merge(
    int[] ids,
    EstateUnitInput input,
    [Service] IMapper mapper,
    [Service] IRepository<EstateUnit> repository,
    CancellationToken cancellationToken = default)
  {
    var estateUnitsToMerge = await repository
      .AsQueryable(
        new EstateUnitIncludeAllSpec(),
        new GetByIdsSpec<EstateUnit>(ids),
        new EntityNonDeletedSpec<EstateUnit>(),
        new EstateUnitExcludeByStatus(EstateUnitStatus.DiscontinuedMerge))
      .ToListAsync(cancellationToken);

    if (!estateUnitsToMerge.Any() || estateUnitsToMerge.Count != ids.Length)
    {
      return Result<EstateUnit>.Error();
    }

    // Merge estate units in different cities is not possibile
    if (estateUnitsToMerge.Select(estate => estate.Address.CityName).Distinct().Count() > 1)
    {
      return Result<EstateUnit>.Invalid(ErrorCode.DifferentCityNames.ToValidationError());
    }

    EstateUnit? mergedEstateUnit;

    try
    {
      mergedEstateUnit = await mapper.MapAsync<EstateUnitInput, EstateUnit>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<EstateUnit>.Invalid(exception.ValidationErrors.ToList());
    }

    if (mergedEstateUnit is null)
    {
      return Result<EstateUnit>.Error();
    }

    await repository.AddAsync(mergedEstateUnit, cancellationToken);

    // Invalidate estate unit merged
    foreach (var estateUnitToMerge in estateUnitsToMerge)
    {
      estateUnitToMerge.SetStatus(EstateUnitStatus.DiscontinuedMerge);
      mergedEstateUnit.AddHistoryTags(estateUnitToMerge.HistoryTags);

      var cadastralUnitToMerge = estateUnitToMerge.CurrentCadastralUnit;
      if (cadastralUnitToMerge is not null)
      {
        cadastralUnitToMerge.SetStatus(CadastralUnitStatus.DiscontinuedMerge);

        cadastralUnitToMerge.SetDates(
          since: cadastralUnitToMerge.Since,
          until: mergedEstateUnit.CurrentCadastralUnit!.Since!.Value.AddDays(-1));

        mergedEstateUnit.CurrentCadastralUnit.AddHistoryTags(cadastralUnitToMerge.HistoryTags);
      }
    }

    await repository.UpdateRangeAsync(estateUnitsToMerge, cancellationToken);

    return mergedEstateUnit;
  }
}
