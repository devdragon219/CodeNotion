using RealGimm.Core.Fclt.InterventionTypeAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class InterventionTypeFaker : BaseSeededFaker<InterventionType>
{
  private int _generatedObjectsCount = 0;

  public InterventionTypeFaker()
  {
    CustomInstantiator(faker =>
    {
      var interventionType = new InterventionType();
      interventionType.SetName(faker.Lorem.Sentence(wordCount: 2));
      interventionType.SetInternalCode($"TI{(_generatedObjectsCount + 1).ToString().PadLeft(2, '0')}");

      return interventionType;
    });

    FinishWith((faker, interventionType) =>
    {
      EnsureValid(interventionType);
      _generatedObjectsCount++;
    });
  }
}
