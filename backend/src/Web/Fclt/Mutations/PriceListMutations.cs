using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.PriceListAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

public class PriceListMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_PRICE_LIST_BASE, Permission.Create)]
  public async Task<Result<PriceList>> Add(
    PriceListInput input,
    [Service] IRepository<PriceList> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    PriceList? priceList;

    try
    {
      priceList = await mapper.MapAsync<PriceListInput, PriceList>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<PriceList>.Invalid(exception.ValidationErrors.ToList());
    }

    if (priceList is null)
    {
      return Result<PriceList>.Error();
    }

    var validationErrors = priceList.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<PriceList>.Invalid(validationErrors);
    }

    if (await repository.AnyAsync(new GetByInternalCodeSpec<PriceList>(priceList.InternalCode), cancellationToken))
    {
      return Result<PriceList>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(priceList, cancellationToken);

    return priceList;
  }

  [BackOfficePermission(Features.FCLT_PRICE_LIST_BASE, Permission.Update)]
  public async Task<Result<PriceList>> Update(
    int id,
    PriceListInput input,
    [Service] IRepository<PriceList> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var priceList = await repository
      .AsQueryable(new GetByIdSpec<PriceList>(id), new PriceListIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (priceList is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, priceList, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<PriceList>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = priceList.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<PriceList>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<PriceList>(priceList.InternalCode),
        new ExcludeByIdSpec<PriceList>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<PriceList>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(priceList, cancellationToken);

    return priceList;
  }

  [BackOfficePermission(Features.FCLT_PRICE_LIST_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<PriceList> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<PriceList>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_PRICE_LIST_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<PriceList> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<PriceList>(ids), repository, cancellationToken);
}
