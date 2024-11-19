using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.SLAAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

public class SLAMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_SLA_BASE, Permission.Create)]
  public async Task<Result<SLA[]>> AddRange(
    SLAInput[] inputs,
    [Service] IRepository<SLA> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var slas = new List<SLA>();

    foreach (var input in inputs)
    {
      SLA? sla;

      try
      {
        sla = await mapper.MapAsync<SLAInput, SLA>(input, null, cancellationToken);
      }
      catch (MappingException exception)
      {
        return Result<SLA[]>.Invalid(exception.ValidationErrors.ToList());
      }

      if (sla is null)
      {
        return Result<SLA[]>.Error();
      }

      var validationErrors = sla.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        return Result<SLA[]>.Invalid(validationErrors);
      }

      if (await repository
        .AsQueryable(
          new GetByInternalCodeSpec<SLA>(sla.InternalCode),
          new SLAExcludeContractBound())
        .AnyAsync(cancellationToken))
      {
        return Result<SLA[]>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
      }

      slas.Add(sla);
    }

    await repository.AddRangeAsync(slas, cancellationToken);

    return slas.ToArray();
  }

  [BackOfficePermission(Features.FCLT_SLA_BASE, Permission.Update)]
  public async Task<Result<SLA>> Update(
    int id,
    SLAInput input,
    [Service] IRepository<SLA> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var sla = await repository
      .AsQueryable(new GetByIdSpec<SLA>(id), new SLAIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (sla is null)
    {
      return Result.NotFound();
    }

    await repository.LoadNavigationsAsync(sla.IfCondition, cancellationToken);
    await repository.LoadNavigationsAsync(sla.ThenCondition, cancellationToken);

    try
    {
      await mapper.MapAsync(input, sla, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<SLA>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = sla.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<SLA>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<SLA>(sla.InternalCode),
        new ExcludeByIdSpec<SLA>(id),
        new SLAExcludeContractBound())
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<SLA>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(sla, cancellationToken);

    return sla;
  }

  [BackOfficePermission(Features.FCLT_SLA_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<SLA> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<SLA>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_SLA_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<SLA> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<SLA>(ids), repository, cancellationToken);
}
