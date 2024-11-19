using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.ConfigAggregate;

public class Config : EntityBase, IAggregateRoot
{
  public ConfigFunction Function { get; private set; }
  
  [MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; } = default!;
  
  [MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? Value { get; private set; }

  public DateTime LastUpdated { get; private set; }

  public void SetReferenceData(string name, ConfigFunction function)
  {
    Name = name;
    Function = function;
  }

  public void SetValue(string? value)
  {
    Value = value;
    LastUpdated = DateTime.UtcNow;
  }
}
