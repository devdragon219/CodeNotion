using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mutations;

public class TicketChecklistTemplateMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Create)]
  public async Task<Result<TicketChecklistTemplate>> Add(
    TicketChecklistTemplateInput input,
    [Service] IRepository<TicketChecklistTemplate> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    TicketChecklistTemplate? ticketChecklistTemplate;

    try
    {
      ticketChecklistTemplate = await mapper.MapAsync<TicketChecklistTemplateInput, TicketChecklistTemplate>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<TicketChecklistTemplate>.Invalid(exception.ValidationErrors.ToList());
    }

    if (ticketChecklistTemplate is null)
    {
      return Result<TicketChecklistTemplate>.Error();
    }

    var validationErrors = ticketChecklistTemplate.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<TicketChecklistTemplate>.Invalid(validationErrors);
    }

    if (await repository.AnyAsync(new GetByInternalCodeSpec<TicketChecklistTemplate>(ticketChecklistTemplate.InternalCode), cancellationToken))
    {
      return Result<TicketChecklistTemplate>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.AddAsync(ticketChecklistTemplate, cancellationToken);

    return ticketChecklistTemplate;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Update)]
  public async Task<Result<TicketChecklistTemplate>> Update(
    int id,
    TicketChecklistTemplateInput input,
    [Service] IRepository<TicketChecklistTemplate> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var ticketChecklistTemplate = await repository
      .AsQueryable(new GetByIdSpec<TicketChecklistTemplate>(id), new TicketChecklistTemplateIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (ticketChecklistTemplate is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, ticketChecklistTemplate, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<TicketChecklistTemplate>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = ticketChecklistTemplate.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<TicketChecklistTemplate>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<TicketChecklistTemplate>(ticketChecklistTemplate.InternalCode),
        new ExcludeByIdSpec<TicketChecklistTemplate>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<TicketChecklistTemplate>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(ticketChecklistTemplate, cancellationToken);

    return ticketChecklistTemplate;
  }

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<TicketChecklistTemplate> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<TicketChecklistTemplate>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONFIG, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<TicketChecklistTemplate> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<TicketChecklistTemplate>(ids), repository, cancellationToken);
}
