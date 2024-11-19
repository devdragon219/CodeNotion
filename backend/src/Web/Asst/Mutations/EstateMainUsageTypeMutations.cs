using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mutations;

public sealed class EstateMainUsageTypeMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Create)]
  public async Task<Result<EstateMainUsageType>> Add(
    EstateMainUsageTypeInput input,
    [Service] IRepository<EstateMainUsageType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    EstateMainUsageType? estateMainUsageType;

    try
    {
      estateMainUsageType = await mapper.MapAsync<EstateMainUsageTypeInput, EstateMainUsageType>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<EstateMainUsageType>.Invalid(exception.ValidationErrors.ToList());
    }

    if (estateMainUsageType is null)
    {
      return Result<EstateMainUsageType>.Error();
    }

    var validationErrors = estateMainUsageType.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<EstateMainUsageType>.Invalid(validationErrors);
    }

    await repository.AddAsync(estateMainUsageType, cancellationToken);
    return estateMainUsageType;
  }


  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Update)]
  public async Task<Result<EstateMainUsageType>> Update(
    int id,
    EstateMainUsageTypeInput input,
    [Service] IRepository<EstateMainUsageType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var estateMainUsageType = await repository.SingleOrDefaultAsync(new GetByIdSpec<EstateMainUsageType>(id), cancellationToken);
    if (estateMainUsageType is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, estateMainUsageType, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<EstateMainUsageType>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = estateMainUsageType.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<EstateMainUsageType>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(estateMainUsageType, cancellationToken);

    return estateMainUsageType;
  }


  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<EstateMainUsageType> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<EstateMainUsageType>(id), repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<EstateMainUsageType> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<EstateMainUsageType>(ids), repository, cancellationToken);
}
