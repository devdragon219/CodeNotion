using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using Ardalis.Result;
using RealGimm.WebCommons;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Nrgy.UtilityServiceAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Web.Nrgy.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.Core.Fclt.InterventionTypeAggregate;

namespace RealGimm.Web.Nrgy.Mutations;

public class UtilityServiceMutations : MutationsBase
{
  [BackOfficePermission(Features.NRGY_SERVICE_BASE, Permission.Create)]
  public async Task<Result<UtilityService>> Add(
    UtilityServiceInput input,
    [Service] IRepository<UtilityService> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    UtilityService? utilityService;

    try
    {
      utilityService = await mapper.MapAsync<UtilityServiceInput, UtilityService>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<UtilityService>.Invalid(exception.ValidationErrors.ToList());
    }

    if (utilityService is null)
    {
      return Result<UtilityService>.Error();
    }

    var validationErrors = utilityService.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<UtilityService>.Invalid(validationErrors);
    }

    if (await repository.AnyAsync(new GetByInternalCodeSpec<UtilityService>(utilityService.InternalCode), cancellationToken))
    {
      return Result<UtilityService>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(utilityService, cancellationToken);
    return utilityService;
  }

  [BackOfficePermission(Features.NRGY_SERVICE_BASE, Permission.Update)]
  public async Task<Result<UtilityService>> Update(
    int id,
    UtilityServiceInput input,
    [Service] IRepository<UtilityService> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var utilityService = await repository
      .AsQueryable(new GetByIdSpec<UtilityService>(id), new UtilityServiceIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (utilityService is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, utilityService, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<UtilityService>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = utilityService.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<UtilityService>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<UtilityService>(utilityService.InternalCode),
        new ExcludeByIdSpec<UtilityService>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<UtilityService>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(utilityService, cancellationToken);

    return utilityService;
  }

  [BackOfficePermission(Features.NRGY_SERVICE_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<UtilityService> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<UtilityService>(id), repository, cancellationToken);

  [BackOfficePermission(Features.NRGY_SERVICE_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<UtilityService> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<UtilityService>(ids), repository, cancellationToken);
}
