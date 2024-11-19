using System.ComponentModel.DataAnnotations;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Asst.EstateAggregate;

public class Floor : EntityBase
{
  [MaxLength(StrFieldSizes.NAME)]
  public string Name { get; private set; } = default!;

  public float Position { get; private set; }
  public Guid TemplateReference { get; private set; }

  public List<EstateUnit> EstateUnits { get; private set; } = new();
  public List<EstateUnitFloor> EstateUnitFloor { get; private set; } = new();

  public void SetName(string name) => Name = name;

  public void SetPosition(float position) => Position = position;

  public void SetReference(Guid templateReference) => TemplateReference = templateReference;
}
