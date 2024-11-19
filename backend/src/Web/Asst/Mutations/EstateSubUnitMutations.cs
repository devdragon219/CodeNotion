using RealGimm.Web.Asst.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using Ardalis.Result;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateSubUnitAggregate.Specifications;
using RealGimm.WebCommons;
using RealGimm.Core.IAM;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.Web.Asst.Mutations;

public class EstateSubUnitMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Create)]
  public async Task<Result<EstateSubUnit>> Add(
    EstateSubUnitInput subInput,
    [Service] IRepository<EstateUnit> estateUnitRepsitory,
    [Service] IRepository<EstateSubUnit> estateSubUnitRepository,
    [Service] IRepository<EstateUsageType> estateUsageTypeRepository,
    [Service] IRepository<OrgUnit> orgUnitRepository,
    CancellationToken cancellationToken = default)
  {
    var existingEstateUnit = await estateUnitRepsitory
      .AsQueryable(
        new GetByIdSpec<EstateUnit>(subInput.EstateUnitId),
        new EstateUnitIncludeAllSpec(),
        new EntityNonDeletedSpec<EstateUnit>())
      .SingleOrDefaultAsync(cancellationToken);

    if (existingEstateUnit is null)
    {
      throw new ArgumentException($"Estate unit with Id {subInput.EstateUnitId} does not exists!");
    }

    var newSubUnit = new EstateSubUnit(subInput.InternalCode);
    newSubUnit.SetUsageType(
      subInput.UsageTypeId is null
      ? null
      : await estateUsageTypeRepository.GetByIdAsync(
          subInput.UsageTypeId.Value,
          cancellationToken));

    newSubUnit.SetSurface(subInput.SurfaceSqM);

    if (subInput.OrgUnitId is not null)
    {
      var orgUnitExists = await orgUnitRepository
        .AsQueryable(new GetByIdSpec<OrgUnit>((int)subInput.OrgUnitId), new OrgUnitIncludeAllSpec(), new EntityNonDeletedSpec<OrgUnit>())
        .AnyAsync(cancellationToken);

      if (!orgUnitExists)
      {
        throw new ArgumentException($"Organization Unit with Id {subInput.OrgUnitId} does not exists!");
      }
    }

    newSubUnit.SetOrgUnitId(subInput.OrgUnitId);
    newSubUnit.SetOccupancyDates(subInput.Since, subInput.Until);
    newSubUnit.SetOccupancy(subInput.OccupantType, subInput.OccupantId, subInput.OccupancyPercent);
    newSubUnit.SetNotes(subInput.Note);

    existingEstateUnit.AddSubUnit(newSubUnit);

    await estateSubUnitRepository.AddAsync(newSubUnit, cancellationToken);
    return newSubUnit;
  }

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Update)]
  public async Task<Result<EstateSubUnit>> Update(EstateSubUnitInput subInput,
    [Service] IRepository<EstateUnit> estateUnitRepository,
    [Service] IRepository<EstateSubUnit> estateSubUnitRepository,
    [Service] IRepository<EstateUsageType> estateUsageTypeRepository,
    [Service] IRepository<OrgUnit> orgUnitRepository,
    CancellationToken cancellationToken = default)
  {
    if (!subInput.Id.HasValue)
    {
      return Result<EstateSubUnit>.Forbidden();
    }

    var existingEstateSubUnit = await estateSubUnitRepository
      .AsQueryable(new GetByIdSpec<EstateSubUnit>(subInput.Id.Value), new EstateSubUnitIncludeAllSpec())
      .FirstOrDefaultAsync(cancellationToken);

    if (existingEstateSubUnit is null)
    {
      return Result<EstateSubUnit>.NotFound();
    }

    if (subInput.EstateUnitId != existingEstateSubUnit.EstateUnit.Id)
    {
      var newEstateUnit = await estateUnitRepository
        .AsQueryable(new GetByIdSpec<EstateUnit>(subInput.EstateUnitId), new EntityNonDeletedSpec<EstateUnit>())
        .SingleOrDefaultAsync(cancellationToken);

      if (newEstateUnit is null)
      {
        throw new ArgumentException($"Estate unit with Id {subInput.EstateUnitId} does not exists!");
      }

      var existingEstateUnit = await estateUnitRepository
        .AsQueryable(new GetByIdSpec<EstateUnit>(existingEstateSubUnit.EstateUnit.Id), new EntityNonDeletedSpec<EstateUnit>())
        .Include(estateUnit => estateUnit.EstateSubUnits)
        .SingleAsync(cancellationToken);

      existingEstateUnit.RemoveSubUnit(existingEstateSubUnit);

      newEstateUnit.AddSubUnit(existingEstateSubUnit);
    }

    existingEstateSubUnit.SetUsageType(
      subInput.UsageTypeId is null
      ? null
      : await estateUsageTypeRepository.GetByIdAsync(
          subInput.UsageTypeId.Value,
          cancellationToken));
    existingEstateSubUnit.SetSurface(subInput.SurfaceSqM);

    if (subInput.OrgUnitId.HasValue)
    {
      var newOrgUnitExists = await orgUnitRepository
        .AsQueryable(new GetByIdSpec<OrgUnit>(subInput.OrgUnitId.Value), new OrgUnitIncludeAllSpec(), new EntityNonDeletedSpec<OrgUnit>())
        .AnyAsync(cancellationToken: cancellationToken);

      if (!newOrgUnitExists)
      {
        throw new ArgumentException($"Organization Unit with Id {subInput.OrgUnitId} does not exists!");
      }
    }

    existingEstateSubUnit.SetOrgUnitId(subInput.OrgUnitId);
    existingEstateSubUnit.SetOccupancyDates(subInput.Since, subInput.Until);
    existingEstateSubUnit.SetOccupancy(subInput.OccupantType, subInput.OccupantId, subInput.OccupancyPercent);
    existingEstateSubUnit.SetNotes(subInput.Note);

    await estateSubUnitRepository.UpdateAsync(existingEstateSubUnit, cancellationToken);
    return existingEstateSubUnit;
  }

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<EstateSubUnit> repository,
    CancellationToken cancellationToken = default)
    => SoftDeleteAsync(new GetByIdSpec<EstateSubUnit>(id), repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATEUNIT_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<EstateSubUnit> repository,
    CancellationToken cancellationToken = default)
    => SoftDeleteRangeAsync(new GetByIdsSpec<EstateSubUnit>(ids), repository, cancellationToken);
}
