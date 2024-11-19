using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate;

public class RegistryCommunicationAnomaly
{
  [MaxLength(StrFieldSizes.NOTES)]
  public string Description { get; private set; } = default!;

  public void SetDescription(string description) => Description = description;
}
