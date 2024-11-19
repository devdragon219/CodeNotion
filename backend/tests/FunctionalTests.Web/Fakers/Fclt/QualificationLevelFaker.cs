using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class QualificationLevelInputFaker : BaseSeededFaker<QualificationLevelInput>
{
  private int _generatedObjectsCount = 0;

  public QualificationLevelInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new QualificationLevelInput
      {
        Name = faker.Lorem.Sentence(wordCount: 2),
        InternalCode = $"L{(_generatedObjectsCount + 1).ToString().PadLeft(2, '0')}",
        Ordering = _generatedObjectsCount + 1
      };

      return input;
    });

    FinishWith((_, input) => _generatedObjectsCount++);
  }
}
