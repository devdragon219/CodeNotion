using Bogus;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class TakeoverFaker : BaseSeededFaker<Takeover>
{
  public IEnumerable<int> SubjectsIds { get; private set; } = Enumerable.Empty<int>();

  public TakeoverFaker()
  {
    CustomInstantiator(faker =>
    {
      var takeover = new Takeover();

      var (originalSubjectId, newSubjectId) = PickSubjects(faker, SubjectsIds);
      takeover.SetOriginalSubjectId(originalSubjectId);
      takeover.SetNewSubjectId(newSubjectId);

      takeover.SetLegalRepresentativeSubjectId(PickLegalRepresentativeSubjectId(faker, SubjectsIds));
      
      var (takeoverDate, effectiveDate) = GenerateDates(faker);
      takeover.SetTakeoverDate(takeoverDate);
      takeover.SetEffectiveDate(effectiveDate);

      takeover.SetType(GenerateTakeoverType(faker));

      return takeover;
    });
  }

  public static (int OriginalSubjectId, int NewSubjectId) PickSubjects(Faker faker, IEnumerable<int> subjectsIds)
  {
    var originalSubjectId = faker.PickRandom(subjectsIds);
    var newSubjectId = faker.PickRandom(subjectsIds.Except(new[] { originalSubjectId }));

    return (originalSubjectId, newSubjectId);
  }

  public static int PickLegalRepresentativeSubjectId(Faker faker, IEnumerable<int> subjectsIds)
    => faker.PickRandom(subjectsIds);

  public static (DateOnly TakeoverDate, DateOnly EffectiveDate) GenerateDates(Faker faker)
  {
    var takeoverDate = faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));
    var effectiveDate = faker.Date.FutureDateOnly(refDate: takeoverDate);

    return (takeoverDate, effectiveDate);
  }

  public static TakeoverType GenerateTakeoverType(Faker faker)
    => faker.PickRandom<TakeoverType>();

  public TakeoverFaker UseSubjectsIds(IEnumerable<int> subjectsIds)
  {
    SubjectsIds = subjectsIds ?? throw new ArgumentNullException(nameof(subjectsIds));

    return this;
  }
}
