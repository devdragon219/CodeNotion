using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.CraftAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

public class CraftMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Create)]
  public async Task<Result<Craft>> Add(
    CraftInput input,
    [Service] IRepository<Craft> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    Craft? craft;

    try
    {
      craft = await mapper.MapAsync<CraftInput, Craft>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Craft>.Invalid(exception.ValidationErrors.ToList());
    }

    if (craft is null)
    {
      return Result<Craft>.Error();
    }

    var validationErrors = craft.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Craft>.Invalid(validationErrors);
    }

    if (await repository.AnyAsync(new GetByInternalCodeSpec<Craft>(craft.InternalCode), cancellationToken))
    {
      return Result<Craft>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(craft, cancellationToken);

    return craft;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Update)]
  public async Task<Result<Craft>> Update(
    int id,
    CraftInput input,
    [Service] IRepository<Craft> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var craft = await repository
      .AsQueryable(new GetByIdSpec<Craft>(id), new CraftIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (craft is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, craft, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Craft>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = craft.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Craft>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<Craft>(craft.InternalCode),
        new ExcludeByIdSpec<Craft>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<Craft>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(craft, cancellationToken);

    return craft;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<Craft> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<Craft>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<Craft> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<Craft>(ids), repository, cancellationToken);
}
