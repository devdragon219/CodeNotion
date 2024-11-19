namespace RealGimm.Web.Prop.Models;

public record RegistrationOfficeInput
{
  public int? Id { get; set; }
  public string? Description { get; set; }
  public string? ExternalCode { get; set; }
  public int? CityId { get; set; }
}
