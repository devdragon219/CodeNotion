using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

public class WorkTeamMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Create)]
  public async Task<Result<WorkTeam>> Add(
    WorkTeamInput input,
    [Service] IRepository<WorkTeam> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    WorkTeam? workTeam;

    try
    {
      workTeam = await mapper.MapAsync<WorkTeamInput, WorkTeam>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<WorkTeam>.Invalid(exception.ValidationErrors.ToList());
    }

    if (workTeam is null)
    {
      return Result<WorkTeam>.Error();
    }

    var validationErrors = workTeam.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<WorkTeam>.Invalid(validationErrors);
    }

    if (await repository.AnyAsync(new GetByInternalCodeSpec<WorkTeam>(workTeam.InternalCode), cancellationToken))
    {
      return Result<WorkTeam>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(workTeam, cancellationToken);

    return workTeam;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Update)]
  public async Task<Result<WorkTeam>> Update(
    int id,
    WorkTeamInput input,
    [Service] IRepository<WorkTeam> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var workTeam = await repository
      .AsQueryable(new GetByIdSpec<WorkTeam>(id), new WorkTeamIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (workTeam is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, workTeam, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<WorkTeam>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = workTeam.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<WorkTeam>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<WorkTeam>(workTeam.InternalCode),
        new ExcludeByIdSpec<WorkTeam>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<WorkTeam>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(workTeam, cancellationToken);

    return workTeam;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<WorkTeam> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<WorkTeam>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<WorkTeam> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<WorkTeam>(ids), repository, cancellationToken);
}
