using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record ReminderInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public DateOnly Date { get; set; }
  public string Summary { get; set; } = default!;
}
