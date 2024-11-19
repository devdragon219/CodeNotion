using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class InterventionTypeInputFaker : BaseSeededFaker<InterventionTypeInput>
{
  private int _generatedObjectsCount = 0;

  public InterventionTypeInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new InterventionTypeInput
      {
        Name = faker.Lorem.Sentence(wordCount: 2),
        InternalCode = $"TI{(_generatedObjectsCount + 1).ToString().PadLeft(2, '0')}"
      };

      return input;
    });

    FinishWith((_, input) => _generatedObjectsCount++);
  }
}
