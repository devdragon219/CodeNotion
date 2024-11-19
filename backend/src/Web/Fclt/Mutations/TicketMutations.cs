using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Fclt.TicketAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.Docs.Models;
using RealGimm.Web.Docs.Helpers;
using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;

namespace RealGimm.Web.Fclt.Mutations;

public class TicketMutations : MutationsBase
{
  [BackOfficePermission(Features.FCLT_TICKET, Permission.Create)]
  public async Task<Result<Ticket>> AddIssue(
    TicketInput input,
    [Service] IRepository<Ticket> ticketRepository,
    [Service] IReadRepository<User> userRepository,
    [Service] IUserDataProvider userDataProvider,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    if (input.Quote is not null)
    {
      return Result.Forbidden();
    }

    Ticket? ticket;

    try
    {
      ticket = await mapper.MapAsync<TicketInput, Ticket>(input, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<Ticket>.Invalid(exception.ValidationErrors.ToList());
    }

    if (ticket is null)
    {
      return Result<Ticket>.Error();
    }

    ticket.SetMainType(TicketMainType.Issue);

    var userId = await userRepository
      .AsQueryable(new UserByUsernameSpec(userDataProvider.Username))
      .Select(user => user.Id)
      .SingleAsync(cancellationToken);

    var initialStatusHistoryEntry = new MasterStatusUpdatedTicketHistoryEntry();
    initialStatusHistoryEntry.SetTimestamp(DateTime.UtcNow);
    initialStatusHistoryEntry.SetUserId(userId);
    initialStatusHistoryEntry.SetNewMasterStatus(ticket.MasterStatus);

    ticket.History.Add(initialStatusHistoryEntry);

    var validationErrors = ticket.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Ticket>.Invalid(validationErrors);
    }

    if (await ticketRepository.AnyAsync(new GetByInternalCodeSpec<Ticket>(ticket.InternalCode), cancellationToken))
    {
      return Result<Ticket>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await ticketRepository.AddAsync(ticket, cancellationToken);

    return ticket;
  }
  
  [BackOfficePermission(Features.FCLT_TICKET, Permission.Create)]
  public async Task<Result<IEnumerable<Ticket>>> AddOnTriggerChecklistTicketRange(
    AddOnTriggerChecklistTicketRangeInput input,
    [Service] IRepository<Ticket> ticketRepository,
    [Service] IReadRepository<User> userRepository,
    [Service] IUserDataProvider userDataProvider,
    [Service] ICodeSuggestor<Ticket> codeSuggestor,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var userId = await userRepository
      .AsQueryable(new UserByUsernameSpec(userDataProvider.Username))
      .Select(user => user.Id)
      .SingleAsync(cancellationToken);

    var tickets = new List<Ticket>();

    foreach (var catalogueItemId in input.CatalogueItemIds)
    {
      Ticket? ticket;

      var internalInput = new AddOnTriggerChecklistTicketInput
      {
        ContractId = input.ContractId,
        TicketChecklistId = input.TicketChecklistId,
        CatalogueItemId = catalogueItemId
      };

      try
      {
        ticket = await mapper.MapAsync<AddOnTriggerChecklistTicketInput, Ticket>(internalInput, cancellationToken);
      }
      catch (MappingException exception)
      {
        return Result<IEnumerable<Ticket>>.Invalid(exception.ValidationErrors.ToList());
      }

      if (ticket is null)
      {
        return Result<IEnumerable<Ticket>>.Error();
      }

      ticket.SetMainType(TicketMainType.ChecklistOnTriggerCondition);
      ticket.SetMasterStatus(TicketMasterStatus.New);
      ticket.SetPriority(Priority.Normal);
      ticket.SetRequestDateTime(DateTime.UtcNow);
      ticket.SetDueDate(DateOnly.FromDateTime(DateTime.UtcNow));

      var internalCode = await codeSuggestor.SuggestNextCode(
        partialEntity: ticket,
        additionallyOccupiedCodes: tickets.Select(ticket => ticket.InternalCode).ToArray());

      ticket.SetInternalCode(internalCode!);

      var initialStatusHistoryEntry = new MasterStatusUpdatedTicketHistoryEntry();
      initialStatusHistoryEntry.SetTimestamp(DateTime.UtcNow);
      initialStatusHistoryEntry.SetUserId(userId);
      initialStatusHistoryEntry.SetNewMasterStatus(ticket.MasterStatus);

      ticket.History.Add(initialStatusHistoryEntry);

      var validationErrors = ticket.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        return Result<IEnumerable<Ticket>>.Invalid(validationErrors);
      }
      
      tickets.Add(ticket);
    }

    await ticketRepository.AddRangeAsync(tickets, cancellationToken);

    return tickets;
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Update)]
  public async Task<Result<Ticket>> Update(
    int id,
    TicketInput input,
    [Service] IRepository<Ticket> ticketRepository,
    [Service] IReadRepository<User> userRepository,
    [Service] IUserDataProvider userDataProvider,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var ticket = await ticketRepository
      .AsQueryable(new GetByIdSpec<Ticket>(id), new TicketIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (ticket is null)
    {
      return Result.NotFound();
    }

    var userId = await userRepository
      .AsQueryable(new UserByUsernameSpec(userDataProvider.Username))
      .Select(user => user.Id)
      .SingleAsync(cancellationToken);

    try
    {
      using (new TicketHistoryTrackingContext(ticket, userId))
      {
        await mapper.MapAsync(input, ticket, cancellationToken);
      }
    }
    catch (MappingException exception)
    {
      return Result<Ticket>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = ticket.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Ticket>.Invalid(validationErrors);
    }

    var isDuplicateInternalCode = await ticketRepository
      .AsQueryable(
        new GetByInternalCodeSpec<Ticket>(ticket.InternalCode),
        new ExcludeByIdSpec<Ticket>(id))
      .AnyAsync(cancellationToken);

    if (isDuplicateInternalCode)
    {
      return Result<Ticket>.Invalid(ErrorCode.DuplicateInternalCode.ToValidationError());
    }

    await ticketRepository.UpdateAsync(ticket, cancellationToken);

    return ticket;
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Update)]
  public async Task<Result<Ticket>> ConvertToExcludedFromMaintenanceContract(
    int ticketId,
    [Service] IRepository<Ticket> ticketRepository,
    [Service] IReadRepository<User> userRepository,
    [Service] IDocumentMapper<Reply> mapper,
    [Service] IUserDataProvider userDataProvider,
    CancellationToken cancellationToken = default)
  {
    var ticket = await ticketRepository
      .AsQueryable(new GetByIdSpec<Ticket>(ticketId), new TicketIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (ticket is null)
    {
      return Result.NotFound();
    }

    if (ticket.IsExcludedFromMaintenanceContract)
    {
      return Result.Forbidden();
    }

    var userId = await userRepository
      .AsQueryable(new UserByUsernameSpec(userDataProvider.Username))
      .Select(user => user.Id)
      .SingleAsync(cancellationToken);

    using (new TicketHistoryTrackingContext(ticket, userId))
    {
      ticket.SetIsExcludedFromMaintenanceContract(true);
      ticket.SetQuote(new());
    }

    var validationErrors = ticket.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Ticket>.Invalid(validationErrors);
    }

    await ticketRepository.UpdateAsync(ticket, cancellationToken);

    return ticket;
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Update)]
  public async Task<Result<Ticket>> SendReply(
    int ticketId,
    string? comment,
    DocumentInput[] documentInputs,
    [Service] IRepository<Ticket> ticketRepository,
    [Service] IReadRepository<User> userRepository,
    [Service] IRepository<Document> documentRepository,
    [Service] IDocumentMapper<Reply> mapper,
    [Service] IUserDataProvider userDataProvider,
    CancellationToken cancellationToken = default)
  {
    var ticket = await ticketRepository
      .AsQueryable(new GetByIdSpec<Ticket>(ticketId), new TicketIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (ticket is null)
    {
      return Result.NotFound();
    }

    var user = await userRepository
      .AsQueryable(new UserByUsernameSpec(userDataProvider.Username))
      .Select(user => new
      {
        user.Id,
        user.Type
      })
      .SingleAsync(cancellationToken);

    var reply = new Reply();
    reply.SetTimestamp(DateTime.UtcNow);
    reply.SetComment(comment);
    reply.SetIsOperator(user.Type is UserType.Internal);
    reply.SetUserId(user.Id);

    using (new TicketHistoryTrackingContext(ticket, user.Id))
    {
      ticket.Replies.Add(reply);
    }

    var validationErrors = ticket.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<Ticket>.Invalid(validationErrors);
    }

    await ticketRepository.UpdateAsync(ticket, cancellationToken);
    await DocumentMutationsHelper.AddRangeAsync(reply.Id, documentInputs, documentRepository, mapper, cancellationToken);

    return ticket;
  }

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<Ticket> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<Ticket>(id), repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<Ticket> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<Ticket>(ids), repository, cancellationToken);
}
