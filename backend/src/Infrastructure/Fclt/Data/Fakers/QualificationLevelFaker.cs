using RealGimm.Core.Fclt.QualificationLevelAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class QualificationLevelFaker : BaseSeededFaker<QualificationLevel>
{
  private int _generatedObjectsCount = 0;

  public QualificationLevelFaker()
  {
    CustomInstantiator(faker =>
    {
      var qualificationLevel = new QualificationLevel();
      qualificationLevel.SetName(faker.Lorem.Sentence(wordCount: 2));
      qualificationLevel.SetInternalCode($"L{(_generatedObjectsCount + 1).ToString().PadLeft(2, '0')}");
      qualificationLevel.SetOrdering(_generatedObjectsCount + 1);

      return qualificationLevel;
    });

    FinishWith((faker, qualificationLevel) =>
    {
      EnsureValid(qualificationLevel);
      _generatedObjectsCount++;
    });
  }
}
