using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.FloorTemplateAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Fakers;

public sealed class FloorFaker : BaseSeededFaker<Floor>
{
  private int _generatedFloorsCount = 0;

  public required IEnumerable<FloorTemplate> FloorTemplates { get; init; }

  public FloorFaker()
  {
    CustomInstantiator(faker =>
    {
      var template = FloorTemplates!
        .OrderBy(template => template.Position)
        .ElementAt(_generatedFloorsCount);

      var floor = new Floor();
      floor.SetName(template.Name);
      floor.SetPosition(template.Position);
      floor.SetReference(template.Guid);

      return floor;
    });

    FinishWith((_, _) => _generatedFloorsCount++);
  }
}
