using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

public class EstateUnitGroupMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_ESTATE_UNIT_GROUP_BASE, Permission.Create)]
  public async Task<Result<EstateUnitGroup>> Add(
    EstateUnitGroupInput input,
    [Service] IRepository<EstateUnitGroup> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    EstateUnitGroup? estateUnitGroup;

    try
    {
      estateUnitGroup = await mapper.MapAsync<EstateUnitGroupInput, EstateUnitGroup>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<EstateUnitGroup>.Invalid(exception.ValidationErrors.ToList());
    }

    if (estateUnitGroup is null)
    {
      return Result<EstateUnitGroup>.Error();
    }

    var validationErrors = estateUnitGroup.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<EstateUnitGroup>.Invalid(validationErrors);
    }

    if (await repository.AnyAsync(new GetByInternalCodeSpec<EstateUnitGroup>(estateUnitGroup.InternalCode), cancellationToken))
    {
      return Result<EstateUnitGroup>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(estateUnitGroup, cancellationToken);

    return estateUnitGroup;
  }

  [BackOfficePermission(Features.FCLT_ESTATE_UNIT_GROUP_BASE, Permission.Update)]
  public async Task<Result<EstateUnitGroup>> Update(
    int id,
    EstateUnitGroupInput input,
    [Service] IRepository<EstateUnitGroup> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var estateUnitGroup = await repository.SingleOrDefaultAsync(new GetByIdSpec<EstateUnitGroup>(id), cancellationToken);
    if (estateUnitGroup is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, estateUnitGroup, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<EstateUnitGroup>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = estateUnitGroup.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<EstateUnitGroup>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<EstateUnitGroup>(estateUnitGroup.InternalCode),
        new ExcludeByIdSpec<EstateUnitGroup>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<EstateUnitGroup>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(estateUnitGroup, cancellationToken);

    return estateUnitGroup;
  }

  [BackOfficePermission(Features.FCLT_ESTATE_UNIT_GROUP_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<EstateUnitGroup> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<EstateUnitGroup>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_ESTATE_UNIT_GROUP_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<EstateUnitGroup> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<EstateUnitGroup>(ids), repository, cancellationToken);
}
