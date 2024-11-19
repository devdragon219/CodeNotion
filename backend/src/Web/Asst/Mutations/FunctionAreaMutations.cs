using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons;
using Ardalis.Result;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.WebCommons.Extensions;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core;

namespace RealGimm.Web.Asst.Mutations;

public class FunctionAreaMutations : MutationsBase
{
  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Create)]
  public async Task<Result<FunctionArea>> Add(
    FunctionAreaInput input,
    [Service] IRepository<FunctionArea> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    FunctionArea? functionArea;

    try
    {
      functionArea = await mapper.MapAsync<FunctionAreaInput, FunctionArea>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<FunctionArea>.Invalid(exception.ValidationErrors.ToList());
    }

    if (functionArea is null)
    {
      return Result<FunctionArea>.Error();
    }

    var validationErrors = functionArea.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<FunctionArea>.Invalid(validationErrors);
    }

    if (functionArea.InternalCode is not null &&
      await repository.AnyAsync(new GetByInternalCodeSpec<FunctionArea>(functionArea.InternalCode), cancellationToken))
    {
      return Result<FunctionArea>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(functionArea, cancellationToken);

    return functionArea;
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Create)]
  public async Task<Result<FunctionArea[]>> AddRange(
    FunctionAreaInput[] inputs,
    [Service] IRepository<FunctionArea> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    IEnumerable<FunctionArea?>? functionAreas;

    try
    {
      functionAreas = await mapper.MapAsync<FunctionAreaInput, FunctionArea>(inputs, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<FunctionArea[]>.Invalid(exception.ValidationErrors.ToList());
    }

    if (functionAreas is null || functionAreas.Any(functionArea => functionArea is null))
    {
      return Result<FunctionArea[]>.Error();
    }

    foreach (var functionArea in functionAreas)
    {
      var validationErrors = functionArea!.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        return Result<FunctionArea[]>.Invalid(validationErrors);
      }

      if (functionArea.InternalCode is not null &&
        await repository.AnyAsync(new GetByInternalCodeSpec<FunctionArea>(functionArea.InternalCode), cancellationToken))
      {
        return Result<FunctionArea[]>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
      }
    }

    await repository.AddRangeAsync(functionAreas!, cancellationToken);

    return functionAreas.ToArray()!;
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Update)]
  public async Task<Result<FunctionArea>> Update(
    int id,
    FunctionAreaInput input,
    [Service] IRepository<FunctionArea> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var functionArea = await repository.SingleOrDefaultAsync(new GetByIdSpec<FunctionArea>(id), cancellationToken);
    if (functionArea is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, functionArea, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<FunctionArea>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = functionArea.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<FunctionArea>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(functionArea, cancellationToken);

    return functionArea;
  }

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<FunctionArea> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<FunctionArea>(id), repository, cancellationToken);

  [BackOfficePermission(Features.ASST_ESTATE_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<FunctionArea> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<FunctionArea>(ids), repository, cancellationToken);
}
