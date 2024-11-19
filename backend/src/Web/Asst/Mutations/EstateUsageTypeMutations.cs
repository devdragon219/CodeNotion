using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mutations;

public sealed class EstateUsageTypeMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Create)]
  public async Task<Result<EstateUsageType>> Add(
    EstateUsageTypeInput input,
    [Service] IRepository<EstateUsageType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    EstateUsageType? estateUsageType;

    try
    {
      estateUsageType = await mapper.MapAsync<EstateUsageTypeInput, EstateUsageType>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<EstateUsageType>.Invalid(exception.ValidationErrors.ToList());
    }

    if (estateUsageType is null)
    {
      return Result<EstateUsageType>.Error();
    }

    var validationErrors = estateUsageType.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<EstateUsageType>.Invalid(validationErrors);
    }

    await repository.AddAsync(estateUsageType, cancellationToken);
    return estateUsageType;
  }


  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Update)]
  public async Task<Result<EstateUsageType>> Update(
    int id,
    EstateUsageTypeInput input,
    [Service] IRepository<EstateUsageType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var estateUsageType = await repository.SingleOrDefaultAsync(new GetByIdSpec<EstateUsageType>(id), cancellationToken);
    if (estateUsageType is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, estateUsageType, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<EstateUsageType>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = estateUsageType.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<EstateUsageType>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(estateUsageType, cancellationToken);

    return estateUsageType;
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<EstateUsageType> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<EstateUsageType>(id), repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<EstateUsageType> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<EstateUsageType>(ids), repository, cancellationToken);
}
