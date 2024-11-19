using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

public class PenaltyMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_PENALTY_BASE, Permission.Create)]
  public async Task<Result<Penalty[]>> AddRange(
    PenaltyInput[] inputs,
    [Service] IRepository<Penalty> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var penalties = new List<Penalty>();

    foreach (var input in inputs)
    {
      Penalty? penalty;

      try
      {
        penalty = await mapper.MapAsync<PenaltyInput, Penalty>(input, cancellationToken);
      }
      catch (MappingException exception)
      {
        return Result<Penalty[]>.Invalid(exception.ValidationErrors.ToList());
      }

      if (penalty is null)
      {
        return Result<Penalty[]>.Error();
      }

      var validationErrors = penalty.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        return Result<Penalty[]>.Invalid(validationErrors);
      }

      if (await repository
        .AsQueryable(
          new GetByInternalCodeSpec<Penalty>(penalty.InternalCode),
          new PenaltyExcludeContractBoundSpec()
        )
        .AnyAsync(cancellationToken))
      {
        return Result<Penalty[]>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
      }

      penalties.Add(penalty);
    }

    await repository.AddRangeAsync(penalties, cancellationToken);

    return penalties.ToArray();
  }

  [BackOfficePermission(Features.FCLT_PENALTY_BASE, Permission.Update)]
  public async Task<Result<Penalty>> Update(
    int id,
    PenaltyInput input,
    [Service] IRepository<Penalty> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var penalty = await repository
      .AsQueryable(new GetByIdSpec<Penalty>(id), new PenaltyIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (penalty is null)
    {
      return Result.NotFound();
    }

    await repository.LoadNavigationsAsync(penalty.IfCondition, cancellationToken);

    try
    {
      await mapper.MapAsync(input, penalty, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Penalty>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = penalty.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Penalty>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<Penalty>(penalty.InternalCode),
        new ExcludeByIdSpec<Penalty>(id),
        new PenaltyExcludeContractBoundSpec())
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<Penalty>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(penalty, cancellationToken);

    return penalty;
  }

  [BackOfficePermission(Features.FCLT_PENALTY_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<Penalty> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<Penalty>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_PENALTY_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<Penalty> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<Penalty>(ids), repository, cancellationToken);
}
