using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

public class TicketTypeMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Create)]
  public async Task<Result<TicketType>> Add(
    TicketTypeInput input,
    [Service] IRepository<TicketType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    TicketType? ticketType;

    try
    {
      ticketType = await mapper.MapAsync<TicketTypeInput, TicketType>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<TicketType>.Invalid(exception.ValidationErrors.ToList());
    }

    if (ticketType is null)
    {
      return Result<TicketType>.Error();
    }

    var validationErrors = ticketType.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<TicketType>.Invalid(validationErrors);
    }

    if (await repository.AnyAsync(new GetByInternalCodeSpec<TicketType>(ticketType.InternalCode), cancellationToken))
    {
      return Result<TicketType>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(ticketType, cancellationToken);

    return ticketType;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Update)]
  public async Task<Result<TicketType>> Update(
    int id,
    TicketTypeInput input,
    [Service] IRepository<TicketType> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var ticketType = await repository
      .AsQueryable(new GetByIdSpec<TicketType>(id), new TicketTypeIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (ticketType is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, ticketType, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<TicketType>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = ticketType.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<TicketType>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<TicketType>(ticketType.InternalCode),
        new ExcludeByIdSpec<TicketType>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<TicketType>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(ticketType, cancellationToken);

    return ticketType;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<TicketType> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<TicketType>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<TicketType> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<TicketType>(ids), repository, cancellationToken);
}
