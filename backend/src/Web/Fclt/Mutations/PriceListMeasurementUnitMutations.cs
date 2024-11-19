using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

public class PriceListMeasurementUnitMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Create)]
  public async Task<Result<PriceListMeasurementUnit>> Add(
    PriceListMeasurementUnitInput input,
    [Service] IRepository<PriceListMeasurementUnit> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    PriceListMeasurementUnit? priceListMeasurementUnit;

    try
    {
      priceListMeasurementUnit = await mapper.MapAsync<PriceListMeasurementUnitInput, PriceListMeasurementUnit>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<PriceListMeasurementUnit>.Invalid(exception.ValidationErrors.ToList());
    }

    if (priceListMeasurementUnit is null)
    {
      return Result<PriceListMeasurementUnit>.Error();
    }

    var validationErrors = priceListMeasurementUnit.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<PriceListMeasurementUnit>.Invalid(validationErrors);
    }

    if (await repository.AnyAsync(new GetByInternalCodeSpec<PriceListMeasurementUnit>(priceListMeasurementUnit.InternalCode), cancellationToken))
    {
      return Result<PriceListMeasurementUnit>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(priceListMeasurementUnit, cancellationToken);

    return priceListMeasurementUnit;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Update)]
  public async Task<Result<PriceListMeasurementUnit>> Update(
    int id,
    PriceListMeasurementUnitInput input,
    [Service] IRepository<PriceListMeasurementUnit> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var priceListMeasurementUnit = await repository
      .AsQueryable(new GetByIdSpec<PriceListMeasurementUnit>(id), new PriceListMeasurementUnitIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (priceListMeasurementUnit is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, priceListMeasurementUnit, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<PriceListMeasurementUnit>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = priceListMeasurementUnit.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<PriceListMeasurementUnit>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<PriceListMeasurementUnit>(priceListMeasurementUnit.InternalCode),
        new ExcludeByIdSpec<PriceListMeasurementUnit>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<PriceListMeasurementUnit>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(priceListMeasurementUnit, cancellationToken);

    return priceListMeasurementUnit;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<PriceListMeasurementUnit> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<PriceListMeasurementUnit>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<PriceListMeasurementUnit> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<PriceListMeasurementUnit>(ids), repository, cancellationToken);
}
