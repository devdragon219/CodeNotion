using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using Ardalis.Result;
using RealGimm.WebCommons;
using RealGimm.Core.Nrgy.ReadingAggregate;
using RealGimm.WebCommons.Mapping;
using RealGimm.Web.Nrgy.Models;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Nrgy.Mutations;

public class ReadingMutations : MutationsBase
{
  [BackOfficePermission(Features.NRGY_SERVICE_BASE, Permission.Create)]
  public async Task<Result<Reading>> Add(
    ReadingInput input,
    [Service] IRepository<Reading> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    Reading? reading;

    try
    {
      reading = await mapper.MapAsync<ReadingInput, Reading>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Reading>.Invalid(exception.ValidationErrors.ToList());
    }

    if (reading is null)
    {
      return Result<Reading>.Error();
    }

    var validationErrors = reading.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Reading>.Invalid(validationErrors);
    }

    await repository.AddAsync(reading, cancellationToken);

    return reading;
  }

  [BackOfficePermission(Features.NRGY_SERVICE_BASE, Permission.Update)]
  public async Task<Result<Reading>> Update(
    int id,
    ReadingInput input,
    [Service] IRepository<Reading> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var reading = await repository.SingleOrDefaultAsync(new GetByIdSpec<Reading>(id), cancellationToken);
    if (reading is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, reading, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Reading>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = reading.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Reading>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(reading, cancellationToken);

    return reading;
  }

  [BackOfficePermission(Features.NRGY_SERVICE_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<Reading> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<Reading>(id), repository, cancellationToken);

  [BackOfficePermission(Features.NRGY_SERVICE_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<Reading> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<Reading>(ids), repository, cancellationToken);
}
