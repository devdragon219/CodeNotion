using Ardalis.Specification;
using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;

namespace RealGimm.Core.Fclt.TicketAggregate.Specifications;

public class TicketIncludeAllSpec : Specification<Ticket>
{
  public TicketIncludeAllSpec()
  {
    Query
      .Include(ticket => ticket.CustomType)
      .Include(ticket => ticket.PlannedTeam)
      .Include(ticket => ticket.PerformedActivities)
      .Include(ticket => ticket.Contract)
        .ThenInclude(contract => contract!.Type)
      .Include(ticket => ticket.Replies)
      .Include(ticket => ticket.Checklist)
      .Include(ticket => ticket.History)
        .ThenInclude(entry => ((NewReplyTicketHistoryEntry)entry)!.Reply)
      .Include(ticket => ticket.Workers)
        .ThenInclude(worker => worker.Craft)
      .Include(ticket => ticket.Workers)
        .ThenInclude(worker => worker.QualificationLevel)
      .Include(ticket => ticket.Quote)
        .ThenInclude(quote => quote!.Articles)
          .ThenInclude(article => article.SourceArticle)
      .Include(ticket => ticket.Quote)
        .ThenInclude(quote => quote!.Articles)
          .ThenInclude(article => article.MeasurementUnit)
      .Include(ticket => ticket.Quote)
        .ThenInclude(quote => quote!.History)
      .AsSplitQuery();
  }
}
