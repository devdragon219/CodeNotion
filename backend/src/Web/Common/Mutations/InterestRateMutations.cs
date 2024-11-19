using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Common.Models;
using RealGimm.WebCommons.Extensions;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Common.Mutations;

public sealed class InterestRateMutations : MutationsBase
{
  [BackOfficePermission(Features.COMMON_INTERESTRATES, Permission.Create)]
  public async Task<Result<InterestRate>> Add(
    InterestRateInput input,
    [Service] IRepository<InterestRate> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    InterestRate? interestRate;

    try
    {
      interestRate = await mapper.MapAsync<InterestRateInput, InterestRate>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<InterestRate>.Invalid(exception.ValidationErrors.ToList());
    }

    if (interestRate is null)
    {
      return Result<InterestRate>.Error();
    }

    var validationErrors = interestRate.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<InterestRate>.Invalid(validationErrors);
    }

    await repository.AddAsync(interestRate, cancellationToken);
    return interestRate;
  }


  [BackOfficePermission(Features.COMMON_INTERESTRATES, Permission.Update)]
  public async Task<Result<InterestRate>> Update(
    int id,
    InterestRateInput input,
    [Service] IRepository<InterestRate> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var interestRate = await repository.SingleOrDefaultAsync(new GetByIdSpec<InterestRate>(id), cancellationToken);
    if (interestRate is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, interestRate, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<InterestRate>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = interestRate.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<InterestRate>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(interestRate, cancellationToken);

    return interestRate;
  }


  [BackOfficePermission(Features.COMMON_INTERESTRATES, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<InterestRate> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<InterestRate>(id), repository, cancellationToken);

  [BackOfficePermission(Features.COMMON_INTERESTRATES, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<InterestRate> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<InterestRate>(ids), repository, cancellationToken);
}
