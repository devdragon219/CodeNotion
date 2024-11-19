using Ardalis.Result;
using RealGimm.Core;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons.Mapping;
using RealGimm.WebCommons;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Web.Asst.Mutations;

public class EstateMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Create)]
  public async Task<Result<Estate>> AddEstate(
    EstateInput estateInput,
    [Service] IRepository<Estate> repository,
    [Service] IMapper mapper,
    [Service] ILogger<EstateMutations> logger,
    CancellationToken cancellationToken = default)
  {
    var estate = await mapper.MapAsync<EstateInput, Estate>(estateInput, cancellationToken);
    if (estate is null)
    {
      return Result<Estate>.Error();
    }

    var errors = estate.Validate().ToList();
    if (errors.Count > 0)
    {
      return Result<Estate>.Invalid(errors);
    }

    if (estate.InternalCode != null &&
      await repository.AnyAsync(new GetByInternalCodeSpec<Estate>(estate.InternalCode), cancellationToken))
    {
      return Result<Estate>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }
    try
    {
      await repository.AddAsync(estate, cancellationToken);
    }
    catch (Exception ex)
    {
      logger.LogError(ex, "Unable to add new Estate");
      return Result<Estate>.Error(ex.Message);
    }
    return estate;
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Update)]
  public async Task<Result<Estate>> UpdateEstate(
    int estateId,
    EstateInput estateInput,
    [Service] IRepository<Estate> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var existingEstate = await repository
      .AsQueryable(new GetByIdSpec<Estate>(estateId), new EstateIncludeAllSpec())
      .FirstOrDefaultAsync(cancellationToken);

    if (existingEstate is null)
    {
      return Result<Estate>.NotFound();
    }

    Estate? estate;
    try
    {
      estate = await mapper.MapAsync(estateInput, existingEstate, cancellationToken);
    }
    catch (MappingException mappingException)
    {
      return Result<Estate>.Invalid(mappingException.ValidationErrors);
    }

    if (estate is null)
    {
      return Result<Estate>.Error();
    }

    var errors = estate.Validate().ToList();
    if (errors.Count > 0)
    {
      return Result<Estate>.Invalid(errors);
    }

    if (estate.InternalCode != null &&
      await repository
        .AsQueryable(new GetByInternalCodeSpec<Estate>(estate.InternalCode), new ExcludeByIdSpec<Estate>(estate.Id))
        .AnyAsync(cancellationToken))
    {
      return Result<Estate>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(estate, cancellationToken);

    return estate;
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Update)]
  public async Task<Result<IReadOnlyDictionary<EstateMarketValueType, decimal>>> CalculateTotalMarketValue(
    int estateId,
    EstateTotalMarketValueInput totalMarketValueInput,
    [Service] IRepository<Estate> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var estate = await repository
      .AsQueryable(new GetByIdSpec<Estate>(estateId), new EstateIncludeAllSpec())
      .FirstOrDefaultAsync(cancellationToken);

    if (estate is null)
    {
      return Result<IReadOnlyDictionary<EstateMarketValueType, decimal>>.NotFound();
    }

    var totalMarketValue = await mapper.MapAsync<EstateTotalMarketValueInput, EstateTotalMarketValue>(totalMarketValueInput, null, cancellationToken);
    if (totalMarketValue is null)
    {
      return Result<IReadOnlyDictionary<EstateMarketValueType, decimal>>.Error();
    }

    var validationErrors = totalMarketValue.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<IReadOnlyDictionary<EstateMarketValueType, decimal>>.Invalid(validationErrors);
    }

    estate.SetTotalMarketValue(totalMarketValue);
    await repository.UpdateAsync(estate, cancellationToken);

    var result = totalMarketValue!.Calculate();

    return Result<IReadOnlyDictionary<EstateMarketValueType, decimal>>.Success(result);
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int estateId,
    [Service] IRepository<Estate> repository,
    CancellationToken cancellationToken = default)
    => SoftDeleteAsync(new GetByIdSpec<Estate>(estateId), repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] estateIds,
    [Service] IRepository<Estate> repository,
    CancellationToken cancellationToken = default)
    => SoftDeleteRangeAsync(new GetByIdsSpec<Estate>(estateIds), repository, cancellationToken);
}
