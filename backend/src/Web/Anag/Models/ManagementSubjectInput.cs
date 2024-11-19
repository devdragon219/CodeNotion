namespace RealGimm.Web.Anag.Models;

public record ManagementSubjectInput : BusinessSubjectInput
{
  public string? ManagementCode { get; set; }
}
