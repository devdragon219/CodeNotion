namespace RealGimm.Web.Prop.Models;

public record RegistryCommunicationAnomalyOutput(string? ContractInternalCode, string Description)
{
  public Guid Guid { get; } = Guid.NewGuid();
}
