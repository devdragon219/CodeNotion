using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record QuoteInput
{
  public bool? IsFrameworkAgreement { get; set; }
  public QuoteMasterStatus MasterStatus { get; set; }
  public string? ExternalCode { get; set; }
  public string? Classifications { get; set; }
  public DateOnly InterventionDueDate { get; set; }
  public string? OrderNumber { get; set; }
  public string? Notes { get; private set; }
  public QuoteArticleInput[] Articles { get; private set; } = [];
}
