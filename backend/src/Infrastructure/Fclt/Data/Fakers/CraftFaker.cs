using RealGimm.Core.Fclt.CraftAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class CraftFaker : BaseSeededFaker<Craft>
{
  private int _generatedObjectsCount = 0;

  public CraftFaker()
  {
    CustomInstantiator(faker =>
    {
      var craft = new Craft();
      craft.SetName(faker.Lorem.Sentence(wordCount: 2));
      craft.SetInternalCode($"SP{(_generatedObjectsCount + 1).ToString().PadLeft(2, '0')}");
      craft.SetOrdering(_generatedObjectsCount + 1);

      return craft;
    });

    FinishWith((faker, craft) =>
    {
      EnsureValid(craft);
      _generatedObjectsCount++;
    });
  }
}
