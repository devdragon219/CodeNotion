using Bogus;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class BillingPauseFaker : BaseSeededFaker<BillingPause>
{
  private DateOnly _refDate = new(2022, 01, 01);

  public BillingPauseFaker()
  {
    CustomInstantiator(faker =>
    {
      var billingPause = new BillingPause();
      
      var (since, until) = GenerateDateRange(faker, _refDate);
      billingPause.SetSince(since);
      billingPause.SetUntil(until);

      billingPause.SetIsRecoveryArrears(GenerateIsRecoveryArrears(faker));
      billingPause.SetNotes(GenerateNotes(faker));

      return billingPause;
    });

    FinishWith((_, pause) =>
    {
      var validationErrors = pause.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(BillingPause)} entity! Errors: {errorMessages}");
      }

      _refDate = pause.Until!.Value;
    });
  }

  public static bool GenerateIsRecoveryArrears(Faker faker) => faker.Random.Bool();

  public static (DateOnly Since, DateOnly Until) GenerateDateRange(Faker faker, DateOnly refDate)
  {
    var since = faker.Date.SoonDateOnly(days: 35, refDate);
    var until = faker.Date.SoonDateOnly(days: 35, refDate: since);

    return (since, until);
  }

  public static string? GenerateNotes(Faker faker)
    => faker.Random.Bool()
      ? faker.Lorem.Sentence(10, 3)
      : null;
}
