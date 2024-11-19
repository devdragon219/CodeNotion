namespace RealGimm.Web.Asst.Models;

public record DocumentDetailsInput
{
  public string? Number { get; init; }
  public DateTime? Date { get; init; }
  public string? CityOfIssue { get; init; }
}
