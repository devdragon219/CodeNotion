namespace RealGimm.Web.Asst.Models;

public record CadastralUnitInspectionInput
{
  public string? MacroZone { get; init; }
  public string? MicroZone { get; init; }
  public bool IsHistoricalEstate { get; init; }
  public bool IsDirectRestriction { get; init; }
  public DateOnly? ProtocolDate { get; init; }
  public DateOnly? Date { get; init; }
  public string? ProtocolNumber { get; init; }
  public string? Heading { get; init; }
}
