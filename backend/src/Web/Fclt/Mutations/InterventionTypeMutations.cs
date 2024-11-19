using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

public class InterventionTypeMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Create)]
  public async Task<Result<InterventionType>> Add(
    InterventionTypeInput input,
    [Service] IRepository<InterventionType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    InterventionType? interventionType;

    try
    {
      interventionType = await mapper.MapAsync<InterventionTypeInput, InterventionType>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<InterventionType>.Invalid(exception.ValidationErrors.ToList());
    }

    if (interventionType is null)
    {
      return Result<InterventionType>.Error();
    }

    var validationErrors = interventionType.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<InterventionType>.Invalid(validationErrors);
    }

    if (await repository.AnyAsync(new GetByInternalCodeSpec<InterventionType>(interventionType.InternalCode), cancellationToken))
    {
      return Result<InterventionType>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(interventionType, cancellationToken);

    return interventionType;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Update)]
  public async Task<Result<InterventionType>> Update(
    int id,
    InterventionTypeInput input,
    [Service] IRepository<InterventionType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var interventionType = await repository
      .AsQueryable(new GetByIdSpec<InterventionType>(id), new InterventionTypeIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (interventionType is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, interventionType, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<InterventionType>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = interventionType.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<InterventionType>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<InterventionType>(interventionType.InternalCode),
        new ExcludeByIdSpec<InterventionType>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<InterventionType>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(interventionType, cancellationToken);

    return interventionType;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<InterventionType> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<InterventionType>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<InterventionType> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<InterventionType>(ids), repository, cancellationToken);
}
