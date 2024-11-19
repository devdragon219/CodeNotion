using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Common.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Common.Mutations;

public sealed class BillItemTypeMutations : MutationsBase
{
  [BackOfficePermission(Features.COMMON_BILLITEMTYPES, Permission.Create)]
  public async Task<Result<BillItemType>> Add(
    BillItemTypeInput input,
    [Service] IRepository<BillItemType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    BillItemType? billItemType;

    try
    {
      billItemType = await mapper.MapAsync<BillItemTypeInput, BillItemType>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<BillItemType>.Invalid(exception.ValidationErrors.ToList());
    }

    if (billItemType is null)
    {
      return Result<BillItemType>.Error();
    }

    await repository.AddAsync(billItemType, cancellationToken);
    return billItemType;
  }


  [BackOfficePermission(Features.COMMON_BILLITEMTYPES, Permission.Update)]
  public async Task<Result<BillItemType>> Update(
    int id,
    BillItemTypeInput input,
    [Service] IRepository<BillItemType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var billItemType = await repository.SingleOrDefaultAsync(new GetByIdSpec<BillItemType>(id), cancellationToken);
    if (billItemType is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, billItemType, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<BillItemType>.Invalid(exception.ValidationErrors.ToList());
    }

    await repository.UpdateAsync(billItemType, cancellationToken);

    return billItemType;
  }

  [BackOfficePermission(Features.COMMON_BILLITEMTYPES, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<BillItemType> repository,
    [Service] IDeleteRestrictionChecker<BillItemType> deleteRestrictionChecker,
    CancellationToken cancellationToken = default)
    => DeleteAsync(
        new GetByIdSpec<BillItemType>(id),
        repository,
        deleteRestrictionChecker.HasRestrictionsAsync,
        cancellationToken);

  [BackOfficePermission(Features.COMMON_BILLITEMTYPES, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<BillItemType> repository,
    [Service] IDeleteRestrictionChecker<BillItemType> deleteRestrictionChecker,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(
        new GetByIdsSpec<BillItemType>(ids),
        repository,
        deleteRestrictionChecker.HasRestrictionsAsync,
        cancellationToken);
}
