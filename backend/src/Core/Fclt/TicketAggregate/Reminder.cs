using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Fclt.TicketAggregate;

public class Reminder : EntityBase
{
  public DateOnly Date { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string Summary { get; private set; } = default!;

  public void SetData(DateOnly date, string summary)
  {
    Date = date;
    Summary = summary;
  }
}
