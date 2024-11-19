using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Asst.EstateAggregate;

public class Stair : EntityBase
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string Description { get; private set; } = default!;

  public void SetDescription(string description) => Description = description;
}
