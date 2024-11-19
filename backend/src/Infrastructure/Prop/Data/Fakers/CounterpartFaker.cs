using Bogus;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class CounterpartFaker : BaseSeededFaker<Counterpart>
{
  public IEnumerable<int> SubjectsIds { get; private set; } = Enumerable.Empty<int>();

  public CounterpartFaker()
  {
    CustomInstantiator(faker =>
    {
      var counterpart = new Counterpart();
      counterpart.SetSubjectId(PickSubjectId(faker, SubjectsIds));

      var (since, until) = GenerateDateRange(faker);
      counterpart.SetSince(since);
      counterpart.SetUntil(until);

      counterpart.SetContractSharePercent(GenerateContractSharePercent(faker));
      counterpart.SetType(PickType(faker));

      return counterpart;
    });

    FinishWith((_, counterpart) =>
    {
      var validationErrors = counterpart.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(Counterpart)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static int PickSubjectId(Faker faker, IEnumerable<int> subjectsIds)
    => faker.PickRandom(subjectsIds);
  
  public static (DateOnly Since, DateOnly? Until) GenerateDateRange(Faker faker)
  {
    var since = faker.Date.PastDateOnly(refDate: new DateOnly(2024, 03, 01));

    return (since, null);
  }

  public static double GenerateContractSharePercent(Faker faker) =>
    double.Round(faker.Random.Double(5, 10), 2);

  public static CounterpartType PickType(Faker faker) => faker.PickRandom<CounterpartType>();

  public CounterpartFaker UseSubjectsIds(IEnumerable<int> subjectsIds)
  {
    SubjectsIds = subjectsIds ?? throw new ArgumentNullException(nameof(subjectsIds));
   
    return this;
  }
}
