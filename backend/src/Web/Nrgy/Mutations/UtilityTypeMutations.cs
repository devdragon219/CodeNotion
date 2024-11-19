using RealGimm.Core.IAM;
using RealGimm.Core;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;
using Ardalis.Result;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Web.Nrgy.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Web.Nrgy.Mutations;

public class UtilityTypeMutations : MutationsBase
{
  [BackOfficePermission(Features.NRGY_TYPE_BASE, Permission.Create)]
  public async Task<Result<UtilityType>> Add(
    UtilityTypeInput input,
    [Service] IRepository<UtilityType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    UtilityType? utilityType;

    try
    {
      utilityType = await mapper.MapAsync<UtilityTypeInput, UtilityType>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<UtilityType>.Invalid(exception.ValidationErrors.ToList());
    }

    if (utilityType is null)
    {
      return Result<UtilityType>.Error();
    }

    var validationErrors = utilityType.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<UtilityType>.Invalid(validationErrors);
    }

    await repository.AddAsync(utilityType, cancellationToken);
    return utilityType;
  }

  [BackOfficePermission(Features.NRGY_TYPE_BASE, Permission.Update)]
  public async Task<Result<UtilityType>> Update(
    int id,
    UtilityTypeInput input,
    [Service] IRepository<UtilityType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var UtilityType = await repository.SingleOrDefaultAsync(new GetByIdSpec<UtilityType>(id), cancellationToken);
    if (UtilityType is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, UtilityType, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<UtilityType>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = UtilityType.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<UtilityType>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(UtilityType, cancellationToken);

    return UtilityType;
  }

  [BackOfficePermission(Features.NRGY_TYPE_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<UtilityType> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<UtilityType>(id), repository, cancellationToken);


  [BackOfficePermission(Features.NRGY_TYPE_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<UtilityType> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<UtilityType>(ids), repository, cancellationToken);
}
