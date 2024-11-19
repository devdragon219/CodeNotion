using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.CustomCodeAggregate;

public class CustomCode : EntityBase, IAggregateRoot, IInternallyCoded
{
  [MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; } = default!;
  public Guid DataProvider {get;private set;}
  [MaxLength(StrFieldSizes.NAME), Required]
  public string Group { get; private set; } = default!;
  public CustomCodeFunction Function { get; private set; }
  [MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ExternalCode { get; private set; }
  public DateTime CreationDate { get; private set; } = DateTime.UtcNow;

  public void SetData(string name,
    Guid dataProvider,
    string group,
    CustomCodeFunction function)
  {
    if (string.IsNullOrEmpty(name)) throw new ArgumentNullException(nameof(name));
    Name = name;
    Group = group;
    Function = function;
    DataProvider = dataProvider;
  }

  public void SetCodes(string internalCode, string externalCode)
  {
    InternalCode = internalCode;
    ExternalCode = externalCode;
  }
}
