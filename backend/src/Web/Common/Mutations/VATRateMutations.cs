using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Common.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Common.Mutations;

public sealed class VATRateMutations : MutationsBase
{
  [BackOfficePermission(Features.COMMON_VATRATES, Permission.Create)]
  public async Task<Result<VATRate>> Add(
    VATRateInput input,
    [Service] IRepository<VATRate> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    VATRate? vatRate;

    try
    {
      vatRate = await mapper.MapAsync<VATRateInput, VATRate>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<VATRate>.Invalid(exception.ValidationErrors.ToList());
    }

    if (vatRate is null)
    {
      return Result<VATRate>.Error();
    }

    var validationErrors = vatRate.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<VATRate>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository.AnyAsync(
      new GetByInternalCodeSpec<VATRate>(vatRate.InternalCode!),
      cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<VATRate>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(vatRate, cancellationToken);

    return vatRate;
  }

  [BackOfficePermission(Features.COMMON_VATRATES, Permission.Update)]
  public async Task<Result<VATRate>> Update(
    int id,
    VATRateInput input,
    [Service] IRepository<VATRate> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var vatRate = await repository.SingleOrDefaultAsync(new GetByIdSpec<VATRate>(id), cancellationToken);
    if (vatRate is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, vatRate, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<VATRate>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = vatRate.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<VATRate>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(vatRate, cancellationToken);

    return vatRate;
  }

  [BackOfficePermission(Features.COMMON_VATRATES, Permission.Delete)]
  public async Task<Result> Delete(
    int id,
    [Service] IRepository<VATRate> repository,
    [Service] IDeleteRestrictionChecker<VATRate> deleteRestrictionChecker,
    CancellationToken cancellationToken = default)
    => await DeleteAsync(
        new GetByIdSpec<VATRate>(id),
        repository,
        deleteRestrictionChecker.HasRestrictionsAsync,
        cancellationToken);

  [BackOfficePermission(Features.COMMON_VATRATES, Permission.Delete)]
  public async Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<VATRate> repository,
    [Service] IDeleteRestrictionChecker<VATRate> deleteRestrictionChecker,
    CancellationToken cancellationToken = default)
    => await DeleteRangeAsync(
        new GetByIdsSpec<VATRate>(ids),
        repository,
        deleteRestrictionChecker.HasRestrictionsAsync,
        cancellationToken);
}
