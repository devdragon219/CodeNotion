using System.ComponentModel.DataAnnotations;
using RealGimm.Core.Fclt.TicketAggregate.QuoteHistory;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Fclt.TicketAggregate;

public class Quote : EntityBase
{
  public QuoteMasterStatus MasterStatus { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ExternalCode { get; private set; }

  public bool? IsFrameworkAgreement { get; private set; }
  
  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? Classifications { get; private set; }
  
  public decimal Amount
  {
    get
    {
      if (Articles.Count == 0)
      {
        return 0;
      }

      return Articles.Sum(article => article.Quantity * article.UnitPrice);
    }
  }
  public decimal ApprovedAmount
  {
    get
    {
      if (Articles.Count == 0)
      {
        return 0;
      }

      return Articles
        .Where(article => !article.IsExcluded)
        .Sum(article => article.Quantity * article.UnitPrice);
    }
  }
  public DateOnly? InterventionDueDate { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? OrderNumber { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public NullSafeCollection<QuoteHistoryEntry> History { get; private set; } = [];
  public NullSafeCollection<QuoteArticle> Articles { get; private set; } = [];

  public void SetMasterStatus(QuoteMasterStatus masterStatus) => MasterStatus = masterStatus;

  public void SetExternalCode(string? externalCode) => ExternalCode = externalCode;

  public void SetIsFrameworkAgreement(bool? isframeworkAgreement) => IsFrameworkAgreement = isframeworkAgreement;

  public void SetClassifications(string? classifications) => Classifications = classifications;

  public void SetInterventionDueDate(DateOnly interventionDueDate) => InterventionDueDate = interventionDueDate;

  public void SetOrderNumber(string? orderNumber) => OrderNumber = orderNumber;

  public void SetNotes(string? notes) => Notes = notes;
}
