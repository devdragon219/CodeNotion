using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Mutations;

public class TicketChecklistMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Create)]
  public async Task<Result<IEnumerable<TicketChecklist>>> AddRange(
    int contractId,
    TicketChecklistTemplatesPerEstateUnitInput[] inputs,
    [Service] IRepository<TicketChecklist> repository,
    [Service] ICodeSuggestor<TicketChecklist> codeSuggestor,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var ticketChecklists = new List<TicketChecklist>();

    foreach (var input in inputs)
    {
      foreach (var templateId in input.TemplateIds)
      {
        var internalCode = await codeSuggestor.SuggestNextCode(
          parentId: contractId,
          additionallyOccupiedCodes: ticketChecklists.Select(checklist => checklist.InternalCode).ToArray());

        var internalInput = new AddTicketChecklistInput
        {
          InternalCode = internalCode!,
          ContractId = contractId,
          EstateUnitId = input.EstateUnitId,
          TicketChecklistTemplateId = templateId
        };

        TicketChecklist? ticketChecklist;

        try
        {
          ticketChecklist = await mapper.MapAsync<AddTicketChecklistInput, TicketChecklist>(internalInput, cancellationToken);
        }
        catch (MappingException exception)
        {
          return Result<IEnumerable<TicketChecklist>>.Invalid(exception.ValidationErrors.ToList());
        }

        if (ticketChecklist is null)
        {
          return Result<IEnumerable<TicketChecklist>>.Error();
        }

        var validationErrors = ticketChecklist.Validate().ToList();
        if (validationErrors.Count > 0)
        {
          return Result<IEnumerable<TicketChecklist>>.Invalid(validationErrors);
        }

        ticketChecklists.Add(ticketChecklist);
      }
    }
   
    await repository.AddRangeAsync(ticketChecklists, cancellationToken);

    return ticketChecklists;
  }

  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Update)]
  public async Task<Result<TicketChecklist>> Update(
    int id,
    UpdateTicketChecklistInput input,
    [Service] IRepository<TicketChecklist> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var ticketChecklist = await repository
      .AsQueryable(new GetByIdSpec<TicketChecklist>(id), new TicketChecklistIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (ticketChecklist is null)
    {
      return Result.NotFound();
    }

    try
    {
      await mapper.MapAsync(input, ticketChecklist, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<TicketChecklist>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = ticketChecklist.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<TicketChecklist>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await repository
      .AsQueryable(
        new GetByInternalCodeSpec<TicketChecklist>(ticketChecklist.InternalCode),
        new ExcludeByIdSpec<TicketChecklist>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<TicketChecklist>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await repository.UpdateAsync(ticketChecklist, cancellationToken);

    return ticketChecklist;
  }

  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<TicketChecklist> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<TicketChecklist>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<TicketChecklist> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<TicketChecklist>(ids), repository, cancellationToken);
}
